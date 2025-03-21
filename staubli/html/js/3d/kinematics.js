/**
 * This file owns all staubli <-> three coordinate transforms
 * As well as inverse kinematics
 *
 * === Tech debt ===
 * - Opportunity to eliminate allocation of Vector3 and Quaternion by reorganizing "apply" code to copy into destinations
 * - This class... entirely overlaps RobotControl. Except in the accumulation sense...
 */

import {
  Goal,
  IKRootsHelper,
  setIKFromUrdf,
  setUrdfFromIK,
  SOLVE_STATUS,
  Solver,
  urdfRobotToIKRoot,
} from "closed-chain-ik-js";
import {
  jogState,
  patchCommand,
  program,
  programmerState,
} from "../program/state.js";
import { MathUtils, Quaternion, Vector3 } from "three";

/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import {Object3D} from 'three' */
/** @import {EffectorPosition, JointPosition} from '../robot-types' */
/** @import {RobotControl} from './robot.js' */
/** @import {Joint} from 'closed-chain-ik-js' */

const mmToM = 1 / 1000;
const jointOffset = [-1, 0, -90, 90, 0, 0, 0];

export class Kinematics {
  /**
   *
   * @param {URDFRobot} urdfRoot
   */
  constructor(urdfRoot) {
    this.urdfRoot = urdfRoot;
    this.baseOffset = urdfRoot.joints["base_link-base"].position;
  }

  /**
   * @param {RobotControl} predecessor
   * @param {EffectorPosition} effectorPosition
   * @param {RobotControl} renderTarget
   */
  applyJointsFromEffectorPosition(predecessor, effectorPosition, renderTarget) {
    const { x, y, z, yaw, pitch, roll } = effectorPosition;

    const position = new Vector3(
      x * mmToM + this.baseOffset.x,
      y * mmToM + this.baseOffset.y,
      z * mmToM + this.baseOffset.z
    );
    const quaternion = createZYZQuaternion(yaw, pitch, roll);

    const solvedIKRoot = this.#solveIK(predecessor, position, quaternion);

    setUrdfFromIK(renderTarget.robot, solvedIKRoot);
  }

  /**
   * @param {RobotControl} predecessor
   * @param {RobotControl} renderTarget
   */
  applyJointsFromTool(predecessor, renderTarget) {
    const solvedIKRoot = this.#solveIK(
      predecessor,
      renderTarget.tool.position,
      renderTarget.tool.quaternion
    );

    setUrdfFromIK(renderTarget.robot, solvedIKRoot);
  }

  /**
   *
   * @param {JointPosition} jointPosition
   * @param {RobotControl} renderTarget
   */
  applyJointPosition(jointPosition, renderTarget) {
    /** @type {Record<string, URDFJoint>} */
    const robotJoints = /** @type{any} */ (renderTarget.robot.joints);
    for (let i = 1; i <= 6; i++) {
      const joint = robotJoints[`joint_${i}`];
      const jointPositionAngle = jointPosition[`j${i}`];
      joint.setJointValue(
        MathUtils.degToRad(jointPositionAngle - jointOffset[i])
      );
    }

    renderTarget.robot.updateMatrixWorld(true);
  }

  /**
   *
   * @param {EffectorPosition} effectorPosition
   * @param {RobotControl} renderTarget
   */
  applyEffectorPosition(effectorPosition, renderTarget) {
    setObjectEffectorPosition(
      renderTarget.tool,
      effectorPosition,
      this.baseOffset,
      mmToM
    );
  }

  /**
   *
   * @param {RobotControl} renderTarget
   */
  applyEffectorFromJointPosition(renderTarget) {
    renderTarget.robot.traverse((obj) => {
      if (obj.name === "tool0") {
        renderTarget.tool.position.setFromMatrixPosition(obj.matrixWorld);
        renderTarget.tool.quaternion.setFromRotationMatrix(obj.matrixWorld);
      }
    });
  }

  /**
   *
   * @param {RobotControl} renderSource
   * @returns {EffectorPosition}
   */
  determineEffectorPosition(renderSource) {
    let effectorPosition;

    renderSource.robot.traverse((obj) => {
      if (obj.name === "tool0") {
        effectorPosition = getObjectEffectorWorldPosition(
          obj,
          this.baseOffset,
          mmToM
        );
      }
    });

    return effectorPosition;
  }

  /**
   *
   * @param {RobotControl} renderSource
   */
  updateEffectorPositionCommand(renderSource) {
    const effector = this.determineEffectorPosition(renderSource);

    patchCommand({ type: "effector", data: effector });
  }

  /**
   * @param {RobotControl} renderSource
   * @returns {JointPosition}
   */
  determineJointPosition(renderSource) {
    const jointPosition = /** @type JointPosition */ ({});

    for (let i = 1; i <= 6; i++) {
      const robotJointName = `joint_${i}`;
      const positionJointName = `j${i}`;

      const angle = renderSource.robot.joints[robotJointName].angle;
      jointPosition[positionJointName] =
        MathUtils.radToDeg(angle) + jointOffset[i];
    }

    return jointPosition;
  }

  updateJointPositionCommand(renderSource) {
    const joints = this.determineJointPosition(renderSource);

    patchCommand({ type: 'joints', data: joints });
  }

  drawHelper(scene) {
    if (this.helper) {
      scene.remove(this.helper);
      delete this.helper;
    }

    this.helper = new IKRootsHelper([this.#ikRoot()]);
    scene.add(this.helper);
  }

  #ikRoot() {
    if (!this._ikRoot) {
      this._ikRoot = urdfRobotToIKRoot(this.urdfRoot);
      /** @type {Joint} */(this._ikRoot).setDoF(); // Lock the base
    }
    return this._ikRoot;
  }

  #solveIK(predecessor, position, quaternion) {
    const ikRoot = this.#ikRoot();
    setIKFromUrdf(ikRoot, predecessor.robot);

    if (!this._goal) {
      this._goal = new Goal();
      const effectorLink = ikRoot.find(
        (potentialLink) => potentialLink.name === "tool0"
      );
      this._goal.makeClosure(effectorLink);
    }
    const goal = this._goal;
    goal.setPosition(position.x, position.y, position.z);
    goal.setQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);

    if (!this._solver) {
      this._solver = new Solver([ikRoot]);
    }
    const solver = this._solver;

    const settleIterations = 5;
    let isConverged = false;
    for (let i = 0; i < settleIterations; i++) {
      // update drive goals from the new location
      ikRoot.updateMatrixWorld(true);

      // update store results
      //   const startTime = window.performance.now();
      const results = solver.solve();
      //   const delta = window.performance.now() - startTime;
      //   totalTime += delta;

      isConverged =
        results.filter((r) => r === SOLVE_STATUS.CONVERGED).length ===
        results.length;
      const isAllDiverged =
        results.filter((r) => r === SOLVE_STATUS.DIVERGED).length ===
        results.length;
      const isAllStalled =
        results.filter((r) => r === SOLVE_STATUS.STALLED).length ===
        results.length;

      if (isConverged || isAllDiverged || isAllStalled) {
        break;
      }
    }

    return ikRoot;
  }
}

// https://chatgpt.com/c/67cd432e-cb74-800c-b5f7-4cb90809cbfa

/**
 *
 * @param {number} yawDeg
 * @param {number} pitchDeg
 * @param {number} rollDeg
 */
export function createZYZQuaternion(yawDeg, pitchDeg, rollDeg) {
  const qYaw = new Quaternion().setFromAxisAngle(
    new Vector3(0, 0, 1),
    MathUtils.degToRad(yawDeg)
  );
  const qPitch = new Quaternion().setFromAxisAngle(
    new Vector3(0, 1, 0),
    MathUtils.degToRad(pitchDeg)
  );
  const qRoll = new Quaternion().setFromAxisAngle(
    new Vector3(0, 0, 1),
    MathUtils.degToRad(rollDeg)
  );

  // Combine the rotations in the correct order: Yaw → Pitch → Roll
  const qFinal = new Quaternion();
  qFinal.multiplyQuaternions(qYaw, qPitch);
  qFinal.multiply(qRoll);

  return qFinal;
}

// https://amu.hal.science/hal-03848730/document
// 3.3 Example of a proper sequence: the sequence ZYZ
// fig (46)

/**
 *
 * @param {Quaternion} q
 * @returns
 */
export function quaternionToZYZ(q) {
  const qr = q.w,
    qz = q.z,
    qy = q.y,
    qx = q.x;

  const roll = Math.atan2(qz, qr) - Math.atan2(-qx, qy);
  const pitch = Math.acos(2 * (qr * qr + qz * qz) - 1);
  const yaw = Math.atan2(qz, qr) + Math.atan2(-qx, qy);

  return {
    yaw: MathUtils.radToDeg(yaw),
    pitch: MathUtils.radToDeg(pitch),
    roll: MathUtils.radToDeg(roll),
  };
}

/**
 * @param {Object3D} object
 * @param {Vector3} offset
 * @param {number} scale
 * @returns {EffectorPosition}
 */
export function getObjectEffectorPosition(object, offset, scale) {
  return {
    x: (object.position.x - offset.x) / scale,
    y: (object.position.y - offset.y) / scale,
    z: (object.position.z - offset.z) / scale,
    ...quaternionToZYZ(object.quaternion),
  };
}

/**
 * @param {Object3D} object
 * @param {Vector3} offset
 * @param {number} scale
 * @returns {EffectorPosition}
 */
export function getObjectEffectorWorldPosition(object, offset, scale) {
  const worldPosition = new Vector3();
  const worldQuaternion = new Quaternion();

  object.getWorldPosition(worldPosition);
  object.getWorldQuaternion(worldQuaternion);
  return {
    x: (worldPosition.x - offset.x) / scale,
    y: (worldPosition.y - offset.y) / scale,
    z: (worldPosition.z - offset.z) / scale,
    ...quaternionToZYZ(worldQuaternion),
  };
}

/**
 *
 * @param {Object3D} object
 * @param {EffectorPosition} effectorPosition
 * @param {Vector3} offset
 * @param {number} scale
 */
export function setObjectEffectorPosition(
  object,
  effectorPosition,
  offset,
  scale
) {
  const { x, y, z, yaw, pitch, roll } = effectorPosition;
  object.position.x = x * scale + offset.x;
  object.position.y = y * scale + offset.y;
  object.position.z = z * scale + offset.z;

  object.setRotationFromQuaternion(createZYZQuaternion(yaw, pitch, roll));
  object.updateMatrixWorld(true);
}

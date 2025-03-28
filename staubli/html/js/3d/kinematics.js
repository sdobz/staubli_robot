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
import { patchCommand, program, programmerState } from "../program/state.js";
import { MathUtils, Quaternion, Vector3 } from "three";

/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import {Object3D} from 'three' */
/** @import {EffectorPosition, JointPosition} from '../robot-types' */
/** @import {RobotControl} from './robot.js' */
/** @import {Joint} from 'closed-chain-ik-js' */

const mmToM = 1 / 1000;
const jointOffset = [-1, 0, -90, 90, 0, 0, 0];
const zeroOffset = new Vector3(0, 0, 0);

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
   * @param {EffectorPosition} toolOffset
   * @param {RobotControl} renderTarget
   */
  applyJointsFromEffectorPosition(
    predecessor,
    effectorPosition,
    toolOffset,
    renderTarget
  ) {
    const toolPosition = effectorToThree(
      effectorPosition,
      mmToM,
      this.baseOffset,
      newThreePosition()
    );
    const toolOffsetThree = effectorToThree(
      toolOffset,
      mmToM,
      zeroOffset,
      newThreePosition()
    );
    const flangePosition = subtractToolOffset(
      toolPosition,
      toolOffsetThree,
      newThreePosition()
    );

    const solvedIKRoot = this.#solveIK(predecessor, flangePosition);

    setUrdfFromIK(renderTarget.robot, solvedIKRoot);
  }

  /**
   * @param {RobotControl} predecessor
   * @param {EffectorPosition} toolOffset
   * @param {RobotControl} renderTarget
   */
  applyJointsFromTool(predecessor, toolOffset, renderTarget) {
    const toolPosition = threePositionFromObjectPosition(renderTarget.tool);
    const toolOffsetThree = effectorToThree(
      toolOffset,
      mmToM,
      zeroOffset,
      newThreePosition()
    );
    const flangePosition = subtractToolOffset(
      toolPosition,
      toolOffsetThree,
      newThreePosition()
    );

    const solvedIKRoot = this.#solveIK(predecessor, flangePosition);

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
    const toolPosition = threePositionFromObjectPosition(renderTarget.tool);
    effectorToThree(effectorPosition, mmToM, this.baseOffset, toolPosition);
    renderTarget.tool.updateMatrixWorld(true);
  }

  /**
   *
   * @param {RobotControl} renderTarget
   * @param {EffectorPosition} toolOffset
   */
  applyEffectorFromJointPosition(renderTarget, toolOffset) {
    const flangePosition = threePositionFromObjectWorldPosition(
      renderTarget.attachmentPoint()
    );
    const toolOffsetThree = effectorToThree(
      toolOffset,
      mmToM,
      zeroOffset,
      newThreePosition()
    );

    const toolPosition = threePositionFromObjectPosition(renderTarget.tool);
    addToolOffset(flangePosition, toolOffsetThree, toolPosition);

    renderTarget.tool.updateMatrixWorld(true);
  }

  /**
   *
   * @param {RobotControl} renderSource
   * @returns {EffectorPosition}
   */
  determineEffectorPosition(renderSource) {
    const effectorPosition = newEffectorPosition();
    const toolPosition = threePositionFromObjectPosition(renderSource.tool);

    return threeToEffector(
      toolPosition,
      mmToM,
      this.baseOffset,
      effectorPosition
    );
  }

  /**
   *
   * @param {RobotControl} renderSource
   * @returns {EffectorPosition}
   */
  determineToolOffset(renderSource) {
    const toolPosition = threePositionFromObjectPosition(renderSource.tool);
    const flangePosition = threePositionFromObjectWorldPosition(
      renderSource.attachmentPoint()
    );

    const toolOffsetThree = subtractThreePositions(
      flangePosition,
      toolPosition,
      newThreePosition()
    );
    return threeToEffector(
      toolOffsetThree,
      mmToM,
      zeroOffset,
      newEffectorPosition()
    );
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

  /**
   * @param {RobotControl} renderSource
   */
  updateCommand(renderSource) {
    const currentProgrammerState = programmerState();
    const currentProgram = program();
    const currentCommandType =
      currentProgram.commands[currentProgrammerState.selectedIndex]?.type;
    if (!currentCommandType) {
      return;
    }

    if (currentCommandType === "joints") {
      const joints = this.determineJointPosition(renderSource);
      patchCommand({ type: "joints", data: joints });
    } else if (currentCommandType === "effector") {
      const effector = this.determineEffectorPosition(renderSource);
      patchCommand({ type: "effector", data: effector });
    } else if (currentCommandType === "tool") {
      const toolOffset = this.determineToolOffset(renderSource);
      patchCommand({ type: "tool", data: toolOffset });
    }
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
      /** @type {Joint} */ (this._ikRoot).setDoF(); // Lock the base
    }
    return this._ikRoot;
  }

  #solveIK(predecessor, flangePosition) {
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
    const { position, rotation } = flangePosition;
    goal.setPosition(position.x, position.y, position.z);
    goal.setQuaternion(rotation.x, rotation.y, rotation.z, rotation.w);

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

const ZVEC = new Vector3(0, 0, 1);
const YVEC = new Vector3(0, 1, 0);
const XVEC = new Vector3(0, 0, 1);
const qYaw = new Quaternion();
const qPitch = new Quaternion();
const qRoll = new Quaternion();

/**
 *
 * @param {number} yawDeg
 * @param {number} pitchDeg
 * @param {number} rollDeg
 * @param {Quaternion} target
 */
export function zyzToQuaternion(yawDeg, pitchDeg, rollDeg, target) {
  qYaw.setFromAxisAngle(ZVEC, MathUtils.degToRad(yawDeg));
  qPitch.setFromAxisAngle(YVEC, MathUtils.degToRad(pitchDeg));
  qRoll.setFromAxisAngle(XVEC, MathUtils.degToRad(rollDeg));

  // Combine the rotations in the correct order: Yaw → Pitch → Roll

  target.multiplyQuaternions(qYaw, qPitch);
  target.multiply(qRoll);

  return target;
}

// https://amu.hal.science/hal-03848730/document
// 3.3 Example of a proper sequence: the sequence ZYZ
// fig (46)

/**
 *
 * @param {Quaternion} q
 * @param {EffectorPosition} target
 * @returns
 */
export function quaternionToZYZ(q, target) {
  const qr = q.w,
    qz = q.z,
    qy = q.y,
    qx = q.x;

  const roll = Math.atan2(qz, qr) - Math.atan2(-qx, qy);
  const pitch = Math.acos(2 * (qr * qr + qz * qz) - 1);
  const yaw = Math.atan2(qz, qr) + Math.atan2(-qx, qy);

  target.yaw = MathUtils.radToDeg(yaw);
  target.pitch = MathUtils.radToDeg(pitch);
  target.roll = MathUtils.radToDeg(roll);
  return target;
}

/**
 * @typedef {Object} ThreePosition
 * @prop {Vector3} position
 * @prop {Quaternion} rotation
 */

/**
 * @returns {EffectorPosition}
 */
function newEffectorPosition() {
  return {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    roll: 0,
  };
}

/**
 * @returns {ThreePosition}
 */
function newThreePosition() {
  return {
    position: new Vector3(),
    rotation: new Quaternion(),
  };
}

/**
 *
 * @param {Object3D} object
 * @returns {ThreePosition}
 */
function threePositionFromObjectPosition(object) {
  return {
    position: object.position,
    rotation: object.quaternion,
  };
}

/**
 *
 * @param {Object3D} object
 * @returns {ThreePosition}
 */
function threePositionFromObjectWorldPosition(object) {
  const threePosition = newThreePosition();
  object.getWorldPosition(threePosition.position);
  object.getWorldQuaternion(threePosition.rotation);
  return threePosition;
}

/**
 * @param {ThreePosition} threePosition
 * @param {number} scale
 * @param {Vector3} offset
 * @param {EffectorPosition} target
 * @returns {EffectorPosition}
 */
function threeToEffector(threePosition, scale, offset, target) {
  const { position, rotation } = threePosition;

  target.x = (position.x - offset.x) / scale;
  target.y = (position.y - offset.y) / scale;
  target.z = (position.z - offset.z) / scale;

  quaternionToZYZ(rotation, target);
  return target;
}

/**
 * @param {EffectorPosition} effectorPosition
 * @param {number} scale
 * @param {Vector3} offset
 * @param {ThreePosition} target
 * @returns {ThreePosition}
 */
function effectorToThree(effectorPosition, scale, offset, target) {
  const { position, rotation } = target;
  position.x = effectorPosition.x * scale + offset.x;
  position.y = effectorPosition.y * scale + offset.y;
  position.z = effectorPosition.z * scale + offset.z;

  zyzToQuaternion(
    effectorPosition.yaw,
    effectorPosition.pitch,
    effectorPosition.roll,
    rotation
  );
  return target;
}

// https://chatgpt.com/c/67e7012d-3e74-800c-aaef-9596397372cd

/**
 * Combines a flange transform with a tool offset to compute the tool transform.
 * @param {ThreePosition} flange - The position of the flange.
 * @param {ThreePosition} toolOffset - The position offset of the tool relative to the flange.
 * @param {ThreePosition} target
 * @returns {ThreePosition} The computed tool transform.
 */
export function addToolOffset(flange, toolOffset, target) {
  target.position
    .copy(toolOffset.position)
    .applyQuaternion(flange.rotation)
    .add(flange.position);
  target.rotation.copy(flange.rotation).multiply(toolOffset.rotation);

  return target;
}

/**
 * Computes the flange transform given a tool transform and tool offset.
 * @param {Vector3} toolPosition - The position of the tool.
 * @param {Quaternion} toolRotation - The orientation of the tool.
 * @param {Vector3} toolOffsetPosition - The position offset of the tool relative to the flange.
 * @param {Quaternion} toolOffsetRotation - The orientation offset of the tool relative to the flange.
 * @returns {{position: Vector3, orientation: Quaternion}} The computed flange transform.
 */
function computeFlangeFromTool(
  toolPosition,
  toolRotation,
  toolOffsetPosition,
  toolOffsetRotation
) {
  // Compute the inverse of the tool orientation
  const inverseToolRotation = toolOffsetRotation.clone().invert();

  // Compute the flange orientation by reversing the tool transformation
  const targetRotation = toolRotation.clone().multiply(inverseToolRotation);

  // Compute the inverse rotated tool offset
  const inverseRotatedToolOffset = toolOffsetPosition
    .clone()
    .applyQuaternion(targetRotation.clone().invert());

  // Compute the flange position by subtracting the transformed tool offset
  const targetPosition = toolPosition.clone().sub(inverseRotatedToolOffset);

  return { position: targetPosition, orientation: targetRotation };
}

const inverseToolRotation = new Quaternion();
const inverseTargetRotation = new Quaternion();
const inverseRotatedToolOffset = new Vector3();

/**
 * Combines a flange transform with a tool offset to compute the tool transform.
 * @param {ThreePosition} tool - The position of the flange.
 * @param {ThreePosition} toolOffset - The position offset of the tool relative to the flange.
 * @param {ThreePosition} target
 * @returns {ThreePosition} The computed tool transform.
 */
function subtractToolOffset(tool, toolOffset, target) {
  inverseToolRotation.copy(toolOffset.rotation).invert();

  target.rotation.copy(tool.rotation).multiply(inverseToolRotation);

  inverseTargetRotation.copy(target.rotation).invert();

  inverseRotatedToolOffset
    .copy(toolOffset.position)
    .applyQuaternion(target.rotation);
  // .applyQuaternion(inverseTargetRotation);

  // Compute the flange position by subtracting the transformed tool offset
  target.position.copy(tool.position).sub(inverseRotatedToolOffset);

  return target;
}

const inversePos1Rotation = new Quaternion();

// https://chatgpt.com/c/67e70dc3-6574-800c-b13f-1b7c90fad2c6
/**
 *
 * @param {ThreePosition} pos1
 * @param {ThreePosition} pos2
 * @param {ThreePosition} target
 */
function subtractThreePositions(pos1, pos2, target) {
  target.position.copy(pos2.position).sub(pos1.position);
  inversePos1Rotation.copy(pos1.rotation).invert();

  target.rotation.copy(pos2.rotation).multiply(inversePos1Rotation);
  target.rotation.normalize();
  return target;
}

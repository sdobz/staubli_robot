/**
 * This file owns all staubli <-> three coordinate transforms
 * As well as inverse kinematics
 */

import {
  Goal,
  setIKFromUrdf,
  setUrdfFromIK,
  SOLVE_STATUS,
  Solver,
  urdfRobotToIKRoot,
} from "closed-chain-ik-js";
import { MathUtils, Quaternion, Vector3 } from "three";

/** @import { URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import {Object3D} from 'three' */
/** @import {Position, EffectorPosition, JointPosition} from '../robot.js' */

const mmToM = 1 / 1000;
const jointOffset = [-1, 0, -90, 90, 0, 0, 0];

export class Kinematics {
  /**
   *
   * @param {URDFRobot} urdfRoot
   * @param {URDFRobot} target
   * @param {Object3D} tool
   */
  constructor(urdfRoot, target, tool) {
    this.urdfRoot = urdfRoot;
    this.baseOffset = urdfRoot.joints["base_link-base"].position;
    this.target = target || urdfRoot.clone(true);
    this.tool = tool;
  }

  /**
   * 
   * @param {Position} position 
   */
  setPosition(position) {
    if ()
  }

  #ikRoot() {
    if (!this._ikRoot) {
      this._ikRoot = urdfRobotToIKRoot(this.urdfRoot);
      this._ikRoot.setDoF(); // Lock the base
    }
    return this._ikRoot;
  }

  /**
   *
   * @param {URDFRobot} urdf
   */
  setPredecessor(urdf) {
    setIKFromUrdf(this.#ikRoot(), urdf);
  }

  solveEffectorPosition(effectorPosition) {
    const { x, y, z, yaw, pitch, roll } = effectorPosition;

    const position = new Vector3(
      x * mmToM + this.baseOffset.x,
      y * mmToM + this.baseOffset.y,
      z * mmToM + this.baseOffset.z
    );
    const quaternion = createZYZQuaternion(yaw, pitch, roll);

    this.#solve(position, quaternion);
  }
  solveObject(object) {
    this.#solve(object.position, object.quaternion);
  }

  #solve(position, quaternion) {
    const ikRoot = this.#ikRoot();

    if (!this._goal) {
      this._goal = new Goal();
      const effectorLink = ikRoot.find(
        (potentialLink) => potentialLink.name === "tool0"
      );
      this._goal.makeClosure(effectorLink);
    }
    const goal = this._goal;
    goal.setPosition(position);
    goal.setQuaternion(quaternion);

    if (!this._solver) {
      this._solver = new Solver([ikRoot]);
    }
    const solver = this._solver;

    const settleIterations = 5;
    let totalTime = 0;
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

    setUrdfFromIK(this.target, ikRoot);
  }

  deriveEffectorPosition() {
    /** @type {EffectorPosition} */
    let effectorPosition;
    this.target.traverse((obj) => {
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

  deriveJoints() {}
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

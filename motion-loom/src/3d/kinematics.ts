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
  Joint,
  Link,
  setIKFromUrdf,
  setUrdfFromIK,
  SOLVE_STATUS,
  Solver,
  urdfRobotToIKRoot,
} from "closed-chain-ik-js";
import { patchCommand, program, programmerState } from "../program/old/state";
import { MathUtils, Object3D, Quaternion, Vector3 } from "three";
import { URDFJoint, URDFRobot } from "urdf-loader";
import { EffectorPosition, JointPosition } from "../robot-types";
import { RobotControl } from "./robot";

const mmToM = 1 / 1000;
const jointOffset = [-1, 0, -90, 90, 0, 0, 0];
const zeroOffset = new Vector3(0, 0, 0);

export class Kinematics {
  urdfRoot: URDFRobot;
  baseOffset: Vector3;
  helper: IKRootsHelper;
  _ikRoot: Link;
  _goal: Goal;
  _solver: Solver;

  constructor(urdfRoot: URDFRobot) {
    this.urdfRoot = urdfRoot;
    this.baseOffset = urdfRoot.joints["base_link-base"].position;
  }

  applyJointsFromEffectorPosition(
    predecessor: RobotControl,
    effectorPosition: EffectorPosition,
    toolOffset: EffectorPosition,
    renderTarget: RobotControl
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

  applyJointsFromTool(
    predecessor: RobotControl,
    toolOffset: EffectorPosition,
    renderTarget: RobotControl
  ) {
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

  applyJointPosition(jointPosition: JointPosition, renderTarget: RobotControl) {
    const robotJoints: Record<string, URDFJoint> = renderTarget.robot.joints;
    for (let i = 1; i <= 6; i++) {
      const joint = robotJoints[`joint_${i}`];
      const jointPositionAngle = jointPosition[`j${i}`];
      joint.setJointValue(
        MathUtils.degToRad(jointPositionAngle - jointOffset[i])
      );
    }

    renderTarget.robot.updateMatrixWorld(true);
  }

  applyEffectorPosition(
    effectorPosition: EffectorPosition,
    renderTarget: RobotControl
  ) {
    const toolPosition = threePositionFromObjectPosition(renderTarget.tool);
    effectorToThree(effectorPosition, mmToM, this.baseOffset, toolPosition);
    renderTarget.tool.updateMatrixWorld(true);
  }

  applyEffectorFromJointPosition(
    renderTarget: RobotControl,
    toolOffset: EffectorPosition
  ) {
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

  determineEffectorPosition(renderSource: RobotControl): EffectorPosition {
    const effectorPosition = newEffectorPosition();
    const toolPosition = threePositionFromObjectPosition(renderSource.tool);

    return threeToEffector(
      toolPosition,
      mmToM,
      this.baseOffset,
      effectorPosition
    );
  }

  determineToolOffset(renderSource: RobotControl): EffectorPosition {
    // https://chatgpt.com/c/67e9861b-0920-800c-9f3a-84b648c0d9bb
    const toolPosition = threePositionFromObjectPosition(renderSource.tool);
    toolPosition.position = toolPosition.position.clone(); // worldToLocal mutates this value
    toolPosition.rotation = toolPosition.rotation.clone(); // premultiply mutates this value

    const flange = renderSource.attachmentPoint();
    const flangeRotation = new Quaternion();
    flange.getWorldQuaternion(flangeRotation);
    const inverseFlangeRotation = flangeRotation.invert();

    flange.worldToLocal(toolPosition.position);
    toolPosition.rotation = toolPosition.rotation.premultiply(
      inverseFlangeRotation
    );

    const toolOffsetThree = toolPosition;
    return threeToEffector(
      toolOffsetThree,
      mmToM,
      zeroOffset,
      newEffectorPosition()
    );
  }

  determineJointPosition(renderSource: RobotControl): JointPosition {
    const jointPosition: JointPosition = {} as JointPosition;

    for (let i = 1; i <= 6; i++) {
      const robotJointName = `joint_${i}`;
      const positionJointName = `j${i}`;

      const angle = renderSource.robot.joints[robotJointName].angle;
      jointPosition[positionJointName] =
        MathUtils.radToDeg(angle) + jointOffset[i];
    }

    return jointPosition;
  }

  updateCommand(renderSource: RobotControl) {
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
      this._ikRoot = urdfRobotToIKRoot(this.urdfRoot, false);
      (this._ikRoot as any as Joint).setDoF(); // Lock the base
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
      this._goal.makeClosure(effectorLink as Link);
    }
    const goal = this._goal;
    const { position, rotation } = flangePosition;
    goal.setPosition(position.x, position.y, position.z);
    goal.setQuaternion(rotation.x, rotation.y, rotation.z, rotation.w);

    if (!this._solver) {
      this._solver = new Solver([ikRoot]);
    }
    const solver = this._solver;

    const settleIterations = 10;
    let isConverged = false;
    for (let i = 0; i < settleIterations; i++) {
      // update drive goals from the new location
      // @ts-ignore
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

export function zyzToQuaternion(
  yawDeg: number,
  pitchDeg: number,
  rollDeg: number,
  target: Quaternion
) {
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

export function quaternionToZYZ(q: Quaternion, target: EffectorPosition) {
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

interface ThreePosition {
  position: Vector3;
  rotation: Quaternion;
}

function newEffectorPosition(): EffectorPosition {
  return {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    roll: 0,
  };
}

function newThreePosition(): ThreePosition {
  return {
    position: new Vector3(),
    rotation: new Quaternion(),
  };
}

function threePositionFromObjectPosition(object: Object3D): ThreePosition {
  return {
    position: object.position,
    rotation: object.quaternion,
  };
}

function threePositionFromObjectWorldPosition(object: Object3D): ThreePosition {
  const threePosition = newThreePosition();
  object.getWorldPosition(threePosition.position);
  object.getWorldQuaternion(threePosition.rotation);
  return threePosition;
}

function threeToEffector(
  threePosition: ThreePosition,
  scale: number,
  offset: Vector3,
  target: EffectorPosition
): EffectorPosition {
  const { position, rotation } = threePosition;

  target.x = (position.x - offset.x) / scale;
  target.y = (position.y - offset.y) / scale;
  target.z = (position.z - offset.z) / scale;

  quaternionToZYZ(rotation, target);
  return target;
}

function effectorToThree(
  effectorPosition: EffectorPosition,
  scale: number,
  offset: Vector3,
  target: ThreePosition
): ThreePosition {
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
export function addToolOffset(
  flange: ThreePosition,
  toolOffset: ThreePosition,
  target: ThreePosition
): ThreePosition {
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
  toolPosition: Vector3,
  toolRotation: Quaternion,
  toolOffsetPosition: Vector3,
  toolOffsetRotation: Quaternion
): { position: Vector3; orientation: Quaternion } {
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
function subtractToolOffset(
  tool: ThreePosition,
  toolOffset: ThreePosition,
  target: ThreePosition
): ThreePosition {
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

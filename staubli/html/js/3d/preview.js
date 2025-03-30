/** @import { RobotControl } from "./robot.js" */

/** @import { Command, EffectorPosition, JointPosition, RobotInterface, RobotState } from '../robot-types' */
/** @import { MotionConstraint } from '../lib/motion-plan.js' */

import { MotionPlan } from "../lib/motion-plan.js";
import { createSignal } from "../lib/state.js";

/**
 * @implements {RobotInterface}
 */
export class RobotPreview {
  /**
   *
   * @param {RobotControl} control
   * @param {RobotState} initialState
   */
  constructor(control, initialState) {
    this.control = control;
    /** @type readonly [() => RobotState, (newState: RobotState) => void] */
    const [state, setState] = createSignal(initialState);
    this.state = state;
    this.setState = setState;
    this.name = "preview";
  }
  /**
   *
   * @param {Command} command
   */
  async execute(command) {
    switch (command.type) {
      case "joints":
        await this.#accelJoints(command.data);
        break;
      case "effector":
        await this.#accelEffector(command.data);
        break;
      case "tool":
        this.setState({
          ...this.state(),
          tool_offset: command.data
        })
    }
  }

  /**
   *
   * @param {JointPosition} jointPosition
   */
  async #accelJoints(jointPosition) {
    const initialState = this.state();
    const initialJoints = initialState.position.joints;

    const constraints = {
      maxAcceleration: 10,
      maxVelocity: 100,
    };
    const starts = jointPositionToArray(initialJoints);
    const stops = jointPositionToArray(jointPosition);
    await this.#animatePlans(constraints, starts, stops, (positions) => {
      const currentJoints = jointPositionFromArray(positions);
      this.control.kinematics.applyJointPosition(currentJoints, this.control);
      this.control.kinematics.applyEffectorFromJointPosition(this.control, initialState.tool_offset);
      this.control.world.render();
    });

    this.setState({
      ...initialState,
      position: {
        effector: this.control.kinematics.determineEffectorPosition(
          this.control
        ),
        joints: jointPosition,
      },
    });
  }

  /**
   *
   * @param {EffectorPosition} effectorPosition
   */
  async #accelEffector(effectorPosition) {
    const initialState = this.state();
    const initialEffector = initialState.position.effector;

    const constraints = {
      maxAcceleration: 50,
      maxVelocity: 500,
    };
    const starts = effectorPositionToArray(initialEffector);
    const stops = effectorPositionToArray(effectorPosition);
    await this.#animatePlans(constraints, starts, stops, (positions) => {
      const currentEffector = effectorPositionFromArray(positions);
      this.control.kinematics.applyEffectorPosition(
        currentEffector,
        this.control
      );
      this.control.kinematics.applyJointsFromEffectorPosition(
        this.control,
        currentEffector,
        initialState.tool_offset,
        this.control
      );
      this.control.world.render();
    });

    this.setState({
      ...initialState,
      position: {
        joints: this.control.kinematics.determineJointPosition(this.control),
        effector: effectorPosition,
      },
    });
  }

  /**
   *
   * @param {MotionConstraint} constraints
   * @param {number[]} starts
   * @param {number[]} stops
   * @param {(positions: number[]) => void} callback
   * @returns
   */
  #animatePlans(constraints, starts, stops, callback) {
    const plans = MotionPlan.planSync(constraints, starts, stops);
    const duration = plans[0].totalTime();

    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const finishTime = startTime + duration * 1000
      /**
       * @param {DOMHighResTimeStamp} currentTime
       */
      function animate(currentTime) {
        const planTime = (currentTime - startTime) / 1000;
        const positions = plans.map((plan) => plan.position(planTime));
        callback(positions);

        if (currentTime < finishTime) {
          requestAnimationFrame(animate);
        } else {
          callback(stops);
          resolve();
        }
      }

      animate(startTime);
    });
  }
}

/**
 * @param {JointPosition} jointPosition
 */
function jointPositionToArray(jointPosition) {
  return [
    jointPosition.j1,
    jointPosition.j2,
    jointPosition.j3,
    jointPosition.j4,
    jointPosition.j5,
    jointPosition.j6,
  ];
}

/**
 *
 * @param {number[]} joints
 * @returns {JointPosition}
 */
function jointPositionFromArray(joints) {
  return {
    j1: joints[0],
    j2: joints[1],
    j3: joints[2],
    j4: joints[3],
    j5: joints[4],
    j6: joints[5],
  };
}

/**
 * @param {EffectorPosition} effectorPosition
 */
function effectorPositionToArray(effectorPosition) {
  return [
    effectorPosition.x,
    effectorPosition.y,
    effectorPosition.z,
    effectorPosition.yaw,
    effectorPosition.pitch,
    effectorPosition.roll,
  ];
}

/**
 *
 * @param {number[]} effector
 * @returns {EffectorPosition}
 */
function effectorPositionFromArray(effector) {
  return {
    x: effector[0],
    y: effector[1],
    z: effector[2],
    yaw: effector[3],
    pitch: effector[4],
    roll: effector[5],
  };
}

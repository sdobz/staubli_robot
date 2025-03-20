import { createSignal } from "./lib/state.js";

async function get(url) {
  return await (await fetch(url)).json();
}
async function put(url, data) {
  return await (await fetch(url, { method: "PUT", body: data !== undefined ? JSON.stringify(data) : undefined })).json();
}

/**
 * @typedef {Object} Position
 * @property {EffectorPosition} [effector] - The position and orientation of the end effector.
 * @property {JointPosition} [joints] - The joint angles.
 */

/**
 * @typedef {"joints" | "effector"} PositionType
 */

/**
 * 
 * @param {Position} position 
 * @returns {PositionType}
 */
export function positionType(position) {
  if (position.effector) {
    return "effector"
  }
  if (position.joints) {
    return "joints"
  }

  throw new Error("Invalid position")
}

/**
 * @typedef {Object} StoredPosition
 * @property {string} name - The name of the position
 * @property {EffectorPosition} position - The position and orientation of the end effector.
 */

/**
 * @typedef {Object} EffectorPosition
 * @property {number} x - X coordinate.
 * @property {number} y - Y coordinate.
 * @property {number} z - Z coordinate.
 * @property {number} pitch - Pitch angle.
 * @property {number} yaw - Yaw angle.
 * @property {number} roll - Roll angle.
 */

/**
 * @typedef {Object} JointPosition
 * @property {number} j1 - Joint 1 angle.
 * @property {number} j2 - Joint 2 angle.
 * @property {number} j3 - Joint 3 angle.
 * @property {number} j4 - Joint 4 angle.
 * @property {number} j5 - Joint 5 angle.
 * @property {number} j6 - Joint 6 angle.
 */

/**
 * @typedef {Object} RobotState
 * @property {Position} position - The position data.
 * @property {number} distance - The distance value.
 * @property {number} angle_step - The step size for angle increments.
 * @property {"above" | "below"} elbow - The elbow position or angle.
 * @property {StoredPosition[]} positions - The number of stored positions.
 * @property {number} positions_index - The index of the current position.
 */

/** @type {any} */
const initialRobotState = undefined;
/** @type readonly [() => RobotState | undefined, (newState: RobotState) => void] */
const [robotState, setRobotState] = createSignal(initialRobotState);

function loadRobot() {
  get("/api/robot").then(setRobotState);
}

// Only way to mutate robot state
class Robot {
  async withRobot(p) {
    setRobot(null);
    await p;
    setRobot(this);
  }

  /**
   * @param {Promise<RobotState>} p
   */
  async withRobotState(p) {
    setRobot(null);
    const newState = await p;
    setRobotState({
      ...robotState(),
      ...newState,
    });
    setRobot(this);
  }

  /** @type {(effectorPosition: EffectorPosition) => Promise<void>} */
  async effector(effectorPosition) {
    await this.withRobotState(put("/api/effector", effectorPosition))
  }

  /** @type {(jointPosition: JointPosition) => Promise<void>} */
  async joints(jointPosition) {
    await this.withRobotState(put("/api/joints", jointPosition))
  }

  async elbow() {
    await this.withRobotState(put("/api/elbow"));
  }

  async flail() {
    await this.withRobot(put("/api/flail"));
  }

  async reset() {
    await this.withRobot(put("/api/reset"));
  }
}

/** @type {any} */
const robotInstance = new Robot();
/** @type {readonly [() => (Robot | null), (robot: Robot | null) => void]} */
const [robot, setRobot] = createSignal(robotInstance);

export { robot, robotState, loadRobot };

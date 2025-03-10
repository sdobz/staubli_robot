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
  /** @type {number | undefined} */
  positionTimeout = undefined;
  getPositionEventually() {
    if (this.positionTimeout) {
      clearTimeout(this.positionTimeout);
    }
    this.positionTimeout = setTimeout(loadRobot, 1000);
  }

  async withRobot(p) {
    setRobot(null);
    await p;
    setRobot(this);
  }

  async withRobotPosition(p) {
    await this.withRobot(p);
    this.getPositionEventually();
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

  /** @type {(position: Position) => Promise<void>} */
  async jog(position) {
    await this.withRobotState(put("/api/jog", position))
  }

  async up() {
    await this.withRobotPosition(put("/api/up"));
  }

  async down() {
    await this.withRobotPosition(put("/api/down"));
  }

  async left() {
    await this.withRobotPosition(put("/api/left"));
  }

  async right() {
    await this.withRobotPosition(put("/api/right"));
  }

  async forward() {
    await this.withRobotPosition(put("/api/forward"));
  }

  async back() {
    await this.withRobotPosition(put("/api/back"));
  }

  async yaw_left() {
    await this.withRobotPosition(put("/api/yaw_left"));
  }

  async yaw_right() {
    await this.withRobotPosition(put("/api/yaw_right"));
  }

  async pitch_up() {
    await this.withRobotPosition(put("/api/pitch_up"));
  }

  async pitch_down() {
    await this.withRobotPosition(put("/api/pitch_down"));
  }

  async roll_left() {
    await this.withRobotPosition(put("/api/roll_left"));
  }

  async roll_right() {
    await this.withRobotPosition(put("/api/roll_right"));
  }

  async minus() {
    await this.withRobotState(put("/api/minus"));
  }

  async plus() {
    await this.withRobotState(put("/api/plus"));
  }

  async angle_minus() {
    await this.withRobotState(put("/api/angle_minus"));
  }

  async angle_plus() {
    await this.withRobotState(put("/api/angle_plus"));
  }

  async elbow() {
    await this.withRobotState(put("/api/elbow"));
  }

  async flail() {
    await this.withRobot(put("/api/flail"));
  }

  async print_position() {
    await this.withRobotState(put("/api/print_position"));
  }

  async next_position() {
    await this.withRobotState(put("/api/next_position"));
  }

  async previous_position() {
    await this.withRobotState(put("/api/previous_position"));
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

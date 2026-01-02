import { createSignal } from "./lib/state.js";

/** @import { EffectorPosition, JointPosition, RobotInterface, RobotState } from './robot-types' */

async function get(url) {
  return await (await fetch(url)).json();
}
async function put(url, data) {
  return await (await fetch(url, { method: "PUT", body: data !== undefined ? JSON.stringify(data) : undefined })).json();
}

// Only way to mutate robot state
/**
 * @implements {RobotInterface}
 */
class RobotApi {
  constructor () {
    /** @type readonly [() => RobotState | undefined, (newState: RobotState) => void] */
    const [state, setState] = createSignal(undefined)
    this.state = state
    this.setState = setState
    this.name = "api"
  }

  load() {
    this.#withRobotState(get("/api/robot"));
  }

  async #withRobot(p) {
    // setRobot(undefined);
    await p;
    // setRobot(this);
  }

  /**
   * @param {Promise<RobotState>} p
   */
  async #withRobotState(p) {
    // setRobot(undefined);
    const newState = await p;
    this.setState({
      ...this.state(),
      ...newState,
    });
    // setRobot(this);
  }

  async execute(command) {
    await this.#withRobotState(put(`/api/${command.type}`, command.data))
  }

  async elbow() {
    await this.#withRobotState(put("/api/elbow"));
  }

  async flail() {
    await this.#withRobot(put("/api/flail"));
  }

  async reset() {
    await this.#withRobot(put("/api/reset"));
  }
}

/** @type {any} */
export const robotApi = new RobotApi();
/** @type {readonly [() => (RobotInterface | null), (robot: RobotInterface | null) => void]} */
const [robot, setRobot] = createSignal(robotApi);
export { robot, setRobot };

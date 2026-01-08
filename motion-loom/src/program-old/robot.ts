import { createSignal } from "../lib/state";
import {
  EffectorPosition,
  JointPosition,
  RobotInterface,
  RobotState,
} from "../staubli/robot-types";

async function get(url: string) {
  return await (await fetch(url)).json();
}
async function put(url: string, data?: any) {
  return await (
    await fetch(url, {
      method: "PUT",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    })
  ).json();
}

// Only way to mutate robot state
class RobotApi implements RobotInterface {
  state: () => RobotState;
  setState: (newState: RobotState) => void;
  name: string;

  constructor() {
    const [state, setState] = createSignal(undefined);
    this.state = state;
    this.setState = setState;
    this.name = "api";
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
  async #withRobotState(p: Promise<RobotState>) {
    // setRobot(undefined);
    const newState = await p;
    this.setState({
      ...this.state(),
      ...newState,
    });
    // setRobot(this);
  }

  async execute(command) {
    await this.#withRobotState(put(`/api/${command.type}`, command.data));
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

export const robotApi = new RobotApi();
const [robot, setRobot] = createSignal<RobotInterface | null>(robotApi);
export { robot, setRobot };

import { createSignal, createResource } from "solid-js";
import { RobotInterface, RobotState } from "./robot-types";

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

export class RobotApi implements RobotInterface {
  name: string;
  state: () => RobotState | undefined;

  constructor() {
    const [resource, { mutate, refetch }] = createResource<RobotState>(
      async () => get("/api/robot")
    );
    this.name = "api";
    this.state = resource;

    this.mutate = mutate;
    this.refetch = refetch;
  }

  private mutate: (newState: RobotState) => void;
  private refetch: () =>
    | RobotState
    | Promise<RobotState | undefined>
    | undefined
    | null;

  async execute(command: { type: string; data?: any }) {
    const newState = await put(`/api/${command.type}`, command.data);
    this.mutate({
      ...this.state(),
      ...newState,
    });
  }

  async elbow() {
    const newState = await put("/api/elbow");
    this.mutate({
      ...this.state(),
      ...newState,
    });
  }

  async flail() {
    await put("/api/flail");
    // optional: refetch full state if needed
    await this.refetch();
  }

  async reset() {
    await put("/api/reset");
    await this.refetch();
  }
}

export const robotApi = new RobotApi();

const [robot, setRobot] = createSignal<RobotInterface | null>(robotApi);
export { robot, setRobot };

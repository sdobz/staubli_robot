interface CommandMeta {
  name: string;
  _derivedState?: RobotState;
}

export interface EffectorPosition {
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  roll: number;
}
export interface EffectorCommand extends CommandMeta {
  type: "effector";
  data: EffectorPosition;
}

export interface JointPosition {
  j1: number;
  j2: number;
  j3: number;
  j4: number;
  j5: number;
  j6: number;
}
export interface JointsCommand extends CommandMeta {
  type: "joints";
  data: JointPosition;
}

export interface ToolCommand extends CommandMeta {
  type: "tool";
  data: EffectorPosition;
}

export interface SerialCommand extends CommandMeta {
  type: "serial";
  data: { command: string };
}

export type Command =
  | EffectorCommand
  | JointsCommand
  | ToolCommand
  | SerialCommand;
export type CommandType = Command["type"];

export interface Position {
  effector: EffectorPosition;
  joints: JointPosition;
}

export type ElbowEnum = "above" | "below";

export interface RobotState {
  position: Position;
  elbow: ElbowEnum;
  speed: number;
  tool_offset: EffectorPosition;
}

export interface RobotInterface {
  state: () => RobotState;
  name: string;
  execute: (command: Command) => Promise<void>;
}

import {
  jogState,
  setJogState,
  patchCommand,
  program,
  programmerState,
  JogMode,
  JogSpace,
} from "./state";
import { setToolProperties, STOCK_TOOLS } from "../3d/robot";
import { derivedState } from "../3d/viewport";
import { EffectorPosition, JointPosition } from "../staubli/robot-types";

export function JogModeEditor() {
  function setMode(mode: JogMode) {
    setJogState("mode", mode);
  }

  function setSpace(space: JogSpace) {
    setJogState("space", space);
  }

  const currentCommand = program.commands[programmerState.selectedIndex];

  return (
    <article class="vertical-stack">
      <h4>Viewport Jog Mode</h4>
      <div role="group">
        <button
          data-mode="translate-effector"
          onClick={() => setMode("translate-effector")}
          aria-current={
            jogState.mode === "translate-effector" ? "true" : undefined
          }
        >
          Translate
        </button>
        <button
          data-mode="rotate-effector"
          onClick={() => setMode("rotate-effector")}
          aria-current={
            jogState.mode === "rotate-effector" ? "true" : undefined
          }
        >
          Rotate
        </button>
        <button
          data-mode="drag-joint"
          onClick={() => setMode("drag-joint")}
          aria-current={jogState.mode === "drag-joint" ? "true" : undefined}
          disabled={currentCommand?.type === "tool"}
        >
          Joint
        </button>
      </div>
      <h4>Coordinate Space</h4>
      <div role="group">
        <button
          data-space="local"
          onClick={() => setSpace("local")}
          aria-current={jogState.space === "local" ? "true" : undefined}
        >
          Tool
        </button>
        <button
          data-space="world"
          onClick={() => setSpace("world")}
          aria-current={jogState.space === "world" ? "true" : undefined}
        >
          World
        </button>
      </div>
    </article>
  );
}

export function EffectorPositionEditor(props: {
  position: EffectorPosition;
  onChange: (position: EffectorPosition) => void;
}) {
  function handleChange(field: string, value: string) {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) return;
    props.onChange({
      ...props.position,
      [field]: floatValue,
    } as EffectorPosition);
  }

  return (
    <div class="vertical-stack">
      <div class="horizontal-stack">
        <label class="horizontal-label">
          X
          <input
            class="effector-position-editor-x"
            value={props.position.x.toFixed(3)}
            onChange={(e) => handleChange("x", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          Y
          <input
            class="effector-position-editor-y"
            value={props.position.y.toFixed(3)}
            onChange={(e) => handleChange("y", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          Z
          <input
            class="effector-position-editor-z"
            value={props.position.z.toFixed(3)}
            onChange={(e) => handleChange("z", e.currentTarget.value)}
          />
        </label>
      </div>
      <div class="horizontal-stack">
        <label class="horizontal-label">
          Y
          <input
            class="effector-position-editor-yaw"
            value={props.position.yaw.toFixed(3)}
            onChange={(e) => handleChange("yaw", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          P
          <input
            class="effector-position-editor-pitch"
            value={props.position.pitch.toFixed(3)}
            onChange={(e) => handleChange("pitch", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          R
          <input
            class="effector-position-editor-roll"
            value={props.position.roll.toFixed(3)}
            onChange={(e) => handleChange("roll", e.currentTarget.value)}
          />
        </label>
      </div>
    </div>
  );
}

export function JointPositionEditor(props: {
  position: JointPosition;
  onChange: (position: JointPosition) => void;
}) {
  function handleChange(field: string, value: string) {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) return;
    props.onChange({
      ...props.position,
      [field]: floatValue,
    } as JointPosition);
  }

  return (
    <div class="vertical-stack">
      <div class="horizontal-stack">
        <label class="horizontal-label">
          J1
          <input
            class="joint-position-editor-j1"
            value={props.position.j1.toFixed(3)}
            onChange={(e) => handleChange("j1", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          J2
          <input
            class="joint-position-editor-j2"
            value={props.position.j2.toFixed(3)}
            onChange={(e) => handleChange("j2", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          J3
          <input
            class="joint-position-editor-j3"
            value={props.position.j3.toFixed(3)}
            onChange={(e) => handleChange("j3", e.currentTarget.value)}
          />
        </label>
      </div>
      <div class="horizontal-stack">
        <label class="horizontal-label">
          J4
          <input
            class="joint-position-editor-j4"
            value={props.position.j4.toFixed(3)}
            onChange={(e) => handleChange("j4", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          J5
          <input
            class="joint-position-editor-j5"
            value={props.position.j5.toFixed(3)}
            onChange={(e) => handleChange("j5", e.currentTarget.value)}
          />
        </label>
        <label class="horizontal-label">
          J6
          <input
            class="joint-position-editor-j6"
            value={props.position.j6.toFixed(3)}
            onChange={(e) => handleChange("j6", e.currentTarget.value)}
          />
        </label>
      </div>
    </div>
  );
}

export function RobotPositionEditor() {
  const state = programmerState;
  const derived = derivedState()[state.selectedIndex];
  if (!derived) return <div />;

  const effectorPosition = derived.state.position.effector;
  const jointPosition = derived.state.position.joints;
  const robotObj = derived.robot;

  function onChangeEffectorPosition(newEffectorPosition: EffectorPosition) {
    robotObj.kinematics.applyEffectorPosition(newEffectorPosition, robotObj);
    robotObj.kinematics.applyJointsFromEffectorPosition(
      robotObj,
      newEffectorPosition,
      derived.state.tool_offset,
      robotObj
    );
    robotObj.kinematics.updateCommand(robotObj);
  }

  function onChangeJointPosition(newJointPosition: JointPosition) {
    robotObj.kinematics.applyJointPosition(newJointPosition, robotObj);
    robotObj.kinematics.applyEffectorFromJointPosition(
      robotObj,
      derived.state.tool_offset
    );
    robotObj.kinematics.updateCommand(robotObj);
  }

  return (
    <article class="vertical-stack">
      <h2>Robot Position Editor</h2>
      <JogModeEditor />
      <EffectorPositionEditor
        position={effectorPosition}
        onChange={onChangeEffectorPosition}
      />
      <JointPositionEditor
        position={jointPosition}
        onChange={onChangeJointPosition}
      />
    </article>
  );
}

export function ToolOffsetEditor() {
  const state = programmerState;
  const prog = program;
  const currentCommand = prog.commands[state.selectedIndex];
  if (currentCommand?.type !== "tool") return <div />;
  const toolOffset = currentCommand.data;

  function onChangeToolOffset(newToolOffset: EffectorPosition) {
    patchCommand({ type: "tool", data: newToolOffset });
  }

  function onSelectToolDisplay(e: any) {
    setToolProperties(STOCK_TOOLS[e.target.value]);
  }

  return (
    <article class="vertical-stack">
      <h2>Tool Offset Editor</h2>
      <JogModeEditor />
      <select
        class="tool-display"
        aria-label="Tool Display"
        required
        onChange={onSelectToolDisplay}
      >
        {STOCK_TOOLS.map((tool, i) => (
          <option value={i} selected={i === 0}>
            {tool.name}
          </option>
        ))}
      </select>
      <EffectorPositionEditor
        position={toolOffset}
        onChange={onChangeToolOffset}
      />
    </article>
  );
}

export function SpeedEditor() {
  const state = programmerState;
  const prog = program;
  const currentCommand = prog.commands[state.selectedIndex];
  if (!currentCommand || currentCommand.type !== "speed") return <div />;

  function onChange(e: any) {
    const value = e.target.value;
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) return;
    patchCommand({ type: "speed", data: { speed: floatValue } });
  }

  return (
    <article>
      <h2>Speed Editor</h2>
      <label class="horizontal-label">
        Speed
        <input
          class="speed-editor-input"
          value={String(currentCommand.data.speed)}
          onChange={onChange}
        />
      </label>
    </article>
  );
}

export function CommandEditor() {
  const state = programmerState;
  const prog = program;
  const currentCommandType = prog.commands[state.selectedIndex]?.type;

  switch (currentCommandType) {
    case "effector":
    case "joints":
      return <RobotPositionEditor />;
    case "tool":
      return <ToolOffsetEditor />;
    case "speed":
      return <SpeedEditor />;
    default:
      return (
        <article class="vertical-stack">
          <h2>Select Command</h2>
        </article>
      );
  }
}

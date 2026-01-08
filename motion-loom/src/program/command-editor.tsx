import {
  jogState,
  setJogState,
  patchCommand,
  program,
  programmerState,
  JogMode,
  JogSpace,
} from "./state";
import { setToolProperties, STOCK_TOOLS } from "../3d-old/robot";
import { derivedState } from "../3d-old/viewport";

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

export function RobotPositionEditor() {
  const state = programmerState;
  const derived = derivedState()[state.selectedIndex];
  if (!derived) return <div />;

  const effectorPosition = derived.state.position.effector;
  const jointPosition = derived.state.position.joints;
  const robotObj = derived.robot;

  function onChangeEffectorPosition(e: any) {
    const newEffectorPosition = e.detail || e.target.value;
    robotObj.kinematics.applyEffectorPosition(newEffectorPosition, robotObj);
    robotObj.kinematics.applyJointsFromEffectorPosition(
      robotObj,
      newEffectorPosition,
      derived.state.tool_offset,
      robotObj
    );
    robotObj.kinematics.updateCommand(robotObj);
  }

  function onChangeJointPosition(e: any) {
    const newJointPosition = e.detail || e.target.value;
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
      <div class="effector-editor">
        {/* simplified: show effector fields */}
        <div>X: {effectorPosition.x.toFixed(3)}</div>
        <div>Y: {effectorPosition.y.toFixed(3)}</div>
        <div>Z: {effectorPosition.z.toFixed(3)}</div>
      </div>
      <div class="joint-editor">
        <div>J1: {jointPosition.j1.toFixed(3)}</div>
        <div>J2: {jointPosition.j2.toFixed(3)}</div>
        <div>J3: {jointPosition.j3.toFixed(3)}</div>
      </div>
    </article>
  );
}

export function ToolOffsetEditor() {
  const state = programmerState;
  const prog = program;
  const currentCommand = prog.commands[state.selectedIndex];
  if (currentCommand?.type !== "tool") return <div />;
  const toolOffset = currentCommand.data;

  function onChangeToolOffset(e: any) {
    const data = e.detail || e.target.value;
    patchCommand({ type: "tool", data });
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
      <div>
        X: {toolOffset.x.toFixed(3)} Y: {toolOffset.y.toFixed(3)} Z:{" "}
        {toolOffset.z.toFixed(3)}
      </div>
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

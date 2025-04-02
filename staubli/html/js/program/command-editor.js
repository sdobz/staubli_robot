import { createSignal } from "../lib/state.js";
import { createComponent, html } from "../lib/component.js";
import {
  jogState,
  patchCommand,
  program,
  programmerState,
  setJogState,
} from "./state.js";
import { setToolProperties, STOCK_TOOLS } from "../3d/robot.js";
import { derivedState } from "../3d/viewport.js";

/** @import { JogMode, JogSpace } from './state.js' */
/** @import { EffectorPosition, JointPosition } from '../robot-types' */

createComponent({
  tag: "jog-mode-editor",
  template: html`
    <article class="vertical-stack">
      <h4>Viewport Jog Mode</h4>
      <div role="group">
        <button data-mode="translate-effector">Translate</button>
        <button data-mode="rotate-effector">Rotate</button>
        <button data-mode="drag-joint">Joint</button>
      </div>
      <h4>Coordinate Space</h4>
      <div role="group">
        <button data-space="local">Tool</button>
        <button data-space="world">World</button>
      </div>
    </article>
  `,
  attrsFn: (_state, attrs) => {
    const currentJogState = jogState();
    const currentState = programmerState();
    const currentProgran = program();
    const currentCommand = currentProgran.commands[currentState.selectedIndex];

    /**
     * @param {JogMode} mode
     */
    function setMode(mode) {
      setJogState({
        ...currentJogState,
        mode,
      });
    }

    /**
     * @param {JogMode} checkMode
     */
    function ariaCurrentMode(checkMode) {
      return currentJogState.mode === checkMode ? "true" : undefined;
    }

    /**
     * @param {JogMode} forMode
     */
    function buildModeAttrs(forMode) {
      return {
        [`[data-mode='${forMode}']`]: {
          eventListeners: {
            click: () => setMode(forMode),
          },
          attributes: {
            "aria-current": ariaCurrentMode(forMode),
            // ugh, tech debt
            disabled:
              forMode === "drag-joint" && currentCommand?.type === "tool"
                ? "true"
                : undefined,
          },
        },
      };
    }

    /**
     * @param {JogSpace} space
     */
    function setSpace(space) {
      setJogState({
        ...currentJogState,
        space,
      });
    }

    /**
     * @param {JogSpace} checkSpace
     */
    function ariaCurrentSpace(checkSpace) {
      return currentJogState.space === checkSpace ? "true" : undefined;
    }

    /**
     * @param {JogSpace} forSpace
     */
    function buildSpaceAttrs(forSpace) {
      return {
        [`[data-space='${forSpace}']`]: {
          eventListeners: {
            click: () => setSpace(forSpace),
          },
          attributes: {
            "aria-current": ariaCurrentSpace(forSpace),
          },
        },
      };
    }

    return {
      ...buildModeAttrs("translate-effector"),
      ...buildModeAttrs("rotate-effector"),
      ...buildModeAttrs("drag-joint"),
      ...buildSpaceAttrs("local"),
      ...buildSpaceAttrs("world"),
    };
  },
});

createComponent({
  tag: "effector-position-editor",
  observedAttributes: ["x", "y", "z", "yaw", "pitch", "roll"],
  template: html`
    <div class="vertical-stack">
      <div class="horizontal-stack">
        <label class="horizontal-label">
          X
          <input class="effector-position-editor-x" />
        </label>
        <label class="horizontal-label">
          Y
          <input class="effector-position-editor-y" />
        </label>
        <label class="horizontal-label">
          Z
          <input class="effector-position-editor-z" />
        </label>
      </div>
      <div class="horizontal-stack">
        <label class="horizontal-label">
          Y
          <input class="effector-position-editor-yaw" />
        </label>
        <label class="horizontal-label">
          P
          <input class="effector-position-editor-pitch" />
        </label>
        <label class="horizontal-label">
          R
          <input class="effector-position-editor-roll" />
        </label>
      </div>
    </div>
  `,
  attrsFn: (_state, attrs, element) => {
    // @ts-ignore
    element.value = {
      x: parseFloat(attrs.x),
      y: parseFloat(attrs.y),
      z: parseFloat(attrs.z),
      yaw: parseFloat(attrs.yaw),
      pitch: parseFloat(attrs.pitch),
      roll: parseFloat(attrs.roll),
    };

    function makeHandler(field) {
      return {
        [`.effector-position-editor-${field}`]: {
          properties: {
            // @ts-ignore
            value: element.value[field],
          },
          eventListeners: {
            change: (e) => {
              // @ts-ignore
              element.value[field] = parseFloat(e.target.value);
              e.stopPropagation();
              element.dispatchEvent(new Event("change"));
            },
          },
        },
      };
    }

    return {
      ...makeHandler("x"),
      ...makeHandler("y"),
      ...makeHandler("z"),
      ...makeHandler("yaw"),
      ...makeHandler("pitch"),
      ...makeHandler("roll"),
    };
  },
});

createComponent({
  tag: "joint-position-editor",
  observedAttributes: ["j1", "j2", "j3", "j4", "j5", "j6"],
  template: html`
    <div class="vertical-stack">
      <div class="horizontal-stack">
        <label class="horizontal-label">
          J1
          <input class="joint-position-editor-j1" />
        </label>
        <label class="horizontal-label">
          J2
          <input class="joint-position-editor-j2" />
        </label>
        <label class="horizontal-label">
          J3
          <input class="joint-position-editor-j3" />
        </label>
      </div>
      <div class="horizontal-stack">
        <label class="horizontal-label">
          J4
          <input class="joint-position-editor-j4" />
        </label>
        <label class="horizontal-label">
          J5
          <input class="joint-position-editor-j5" />
        </label>
        <label class="horizontal-label">
          J6
          <input class="joint-position-editor-j6" />
        </label>
      </div>
    </div>
  `,
  attrsFn: (_state, attrs, element) => {
    // @ts-ignore
    element.value = {
      j1: parseFloat(attrs.j1),
      j2: parseFloat(attrs.j2),
      j3: parseFloat(attrs.j3),
      j4: parseFloat(attrs.j4),
      j5: parseFloat(attrs.j5),
      j6: parseFloat(attrs.j6),
    };

    function makeHandler(field) {
      return {
        [`.joint-position-editor-${field}`]: {
          properties: {
            // @ts-ignore
            value: element.value[field],
          },
          eventListeners: {
            change: (e) => {
              // @ts-ignore
              element.value[field] = parseFloat(e.target.value);
              e.stopPropagation();
              element.dispatchEvent(new Event("change"));
            },
          },
        },
      };
    }

    return {
      ...makeHandler("j1"),
      ...makeHandler("j2"),
      ...makeHandler("j3"),
      ...makeHandler("j4"),
      ...makeHandler("j5"),
      ...makeHandler("j6"),
    };
  },
});

createComponent({
  tag: "robot-position-editor",
  template: html`
    <article class="vertical-stack">
      <h2>Robot Position Editor</h2>
      <jog-mode-editor></jog-mode-editor>
      <effector-position-editor></effector-position-editor>
      <joint-position-editor></joint-position-editor>
    </article>
  `,
  attrsFn: (state, attrs) => {
    const currentProgrammerState = programmerState();
    const derived = derivedState()[currentProgrammerState.selectedIndex];
    if (!derived) {
      return {};
    }
    const effectorPosition = derived.state.position.effector;
    const jointPosition = derived.state.position.joints;
    const robot = derived.robot;

    function onChangeEffectorPosition(e) {
      /** @type {EffectorPosition} */
      const newEffectorPosition = e.target.value;

      robot.kinematics.applyEffectorPosition(newEffectorPosition, robot);
      robot.kinematics.applyJointsFromEffectorPosition(
        robot,
        newEffectorPosition,
        derived.state.tool_offset,
        robot
      );
      robot.kinematics.updateCommand(robot);
    }

    function onChangeJointPosition(e) {
      /** @type {JointPosition} */
      const newJointPosition = e.target.value;

      robot.kinematics.applyJointPosition(newJointPosition, robot);
      robot.kinematics.applyEffectorFromJointPosition(
        robot,
        derived.state.tool_offset
      );
      robot.kinematics.updateCommand(robot);
    }

    return {
      "effector-position-editor": {
        attributes: {
          x: effectorPosition.x.toFixed(3),
          y: effectorPosition.y.toFixed(3),
          z: effectorPosition.z.toFixed(3),
          yaw: effectorPosition.yaw.toFixed(3),
          pitch: effectorPosition.pitch.toFixed(3),
          roll: effectorPosition.roll.toFixed(3),
        },
        eventListeners: {
          change: onChangeEffectorPosition,
        },
      },
      "joint-position-editor": {
        attributes: {
          j1: jointPosition.j1.toFixed(3),
          j2: jointPosition.j2.toFixed(3),
          j3: jointPosition.j3.toFixed(3),
          j4: jointPosition.j4.toFixed(3),
          j5: jointPosition.j5.toFixed(3),
          j6: jointPosition.j6.toFixed(3),
        },
        eventListeners: {
          change: onChangeJointPosition,
        },
      },
    };
  },
});

createComponent({
  tag: "tool-offset-editor",
  template: html`
    <article class="vertical-stack">
      <h2>Tool Offset Editor</h2>
      <jog-mode-editor></jog-mode-editor>
      <select class="tool-display" aria-label="Tool Display" required></select>
      <effector-position-editor></effector-position-editor>
    </article>
  `,
  stateFn: () => {
    const [selectedDisplayIndex, setSelectedDisplayIndex] = createSignal(0);

    return {
      selectedDisplayIndex,
      setSelectedDisplayIndex,
    };
  },
  attrsFn: (state, attrs) => {
    const currentProgrammerState = programmerState();
    const currentProgram = program();
    const currentCommand =
      currentProgram.commands[currentProgrammerState.selectedIndex];
    if (currentCommand?.type !== "tool") {
      return {};
    }
    const toolOffset = currentCommand.data;

    function onChangeToolOffset(e) {
      /** @type {EffectorPosition} */
      const data = e.target.value;

      patchCommand({ type: "tool", data });
    }

    function onSelectToolDisplay(e) {
      setToolProperties(STOCK_TOOLS[e.target.value]);
    }
    const displayIndex = state.selectedDisplayIndex();

    const toolDisplayChildren = STOCK_TOOLS.map(
      (tool, i) => `
      <option ${i === displayIndex ? "selected" : ""} value="${i}">${
        tool.name
      }</option>
    `
    ).join("\n");

    return {
      ".tool-display": {
        properties: {
          innerHTML: toolDisplayChildren,
        },
        eventListeners: {
          change: onSelectToolDisplay,
        },
      },
      "effector-position-editor": {
        attributes: {
          x: toolOffset.x.toFixed(3),
          y: toolOffset.y.toFixed(3),
          z: toolOffset.z.toFixed(3),
          yaw: toolOffset.yaw.toFixed(3),
          pitch: toolOffset.pitch.toFixed(3),
          roll: toolOffset.roll.toFixed(3),
        },
        eventListeners: {
          change: onChangeToolOffset,
        },
      },
    };
  },
});

createComponent({
  tag: "speed-editor",
  template: html`
    <article>
      <h2>Speed Editor</h2>
      <label class="horizontal-label">
        Speed
        <input class="speed-editor-input" />
      </label>
    </article>
  `,
  attrsFn: (_state, _attrs, _element) => {
    const currentProgrammerState = programmerState();
    const currentProgram = program();
    const currentCommand =
      currentProgram.commands[currentProgrammerState.selectedIndex];
    if (!currentCommand || currentCommand.type !== "speed") {
      return {};
    }
    return {
      ".speed-editor-input": {
        properties: {
          value: currentCommand.data.speed.toString(),
        },
        eventListeners: {
          change: (e) => {
            // @ts-ignore
            const value = e.target.value;
            const floatValue = parseFloat(value);
            if (isNaN(value)) {
              return;
            }
            patchCommand({
              type: "speed",
              data: {
                speed: floatValue,
              },
            });
          },
        },
      },
    };
  },
});

createComponent({
  tag: "command-editor",
  template: html` <div class="command-editor"></div> `,
  attrsFn: (_state, attrs) => {
    let editor;
    const currentProgrammerState = programmerState();
    const currentProgram = program();
    const currentCommandType =
      currentProgram.commands[currentProgrammerState.selectedIndex]?.type;

    switch (currentCommandType) {
      case "effector":
      case "joints":
        editor = "<robot-position-editor></robot-position-editor>";
        break;
      case "tool":
        editor = "<tool-offset-editor></tool-offset-editor>";
        break;
      case "speed":
        editor = "<speed-editor></speed-editor>";
        break;
      default:
        editor =
          "<article class='vertical-stack'><h2>Select Command</h2></article>";
        break;
    }

    return {
      ".command-editor": {
        properties: {
          innerHTML: editor,
        },
      },
    };
  },
});

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

/** @import { JogMode, JogSpace } from './state.js' */
/** @import { EffectorPosition } from '../robot-types' */

createComponent({
  tag: "robot-position-editor",
  template: html`
    <article class="vertical-stack">
      <h3>Viewport Jog Mode</h3>
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
  observedAttributes: ["x"],
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
  tag: "tool-offset-editor",
  template: html`
    <article class="vertical-stack">
      <h2>Tool Offset Editor</h2>
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
      setToolProperties(STOCK_TOOLS[e.target.value])
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

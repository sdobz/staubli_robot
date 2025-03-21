import { createComponent, html } from "../lib/component.js";
import { jogState, program, programmerState, setJogState } from "./state.js";

/** @import { JogMode, JogSpace } from './state.js' */

createComponent({
  tag: "tool-position-editor",
  template: html`
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
  tag: "command-editor",
  template: html` <article class="vertical-stack command-editor"></article> `,
  attrsFn: (_state, attrs) => {
    let editor;
    const currentProgrammerState = programmerState();
    const currentProgram = program();
    const currentCommandType =
      currentProgram.commands[currentProgrammerState.selectedIndex]?.type;

    switch (currentCommandType) {
      case "effector":
      case "joints":
        editor = "<tool-position-editor></tool-position-editor>";
        break;
      default:
        editor = "<h2>Select Command</h2>";
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

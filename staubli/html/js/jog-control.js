/**
 * @typedef {"translate-effector" | "rotate-effector" | "drag-joint"} JogMode
 */

/**
 * @typedef {"local" | "world"} JogSpace
 */

import { createComponent, html } from "./lib/component.js";
import { createSignal } from "./lib/state.js";

/**
 * @typedef {Object} JogState
 * @property {JogMode} mode - Currently selected translation mode
 * @property {JogSpace} space
 */

const [jogState, setJogState] = createSignal({
  mode: /** @type {JogMode} */ ("drag-joint"),
  space: /** @type {JogSpace} */ ("world"),
});
export { jogState };

createComponent({
  tag: "jog-control",
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

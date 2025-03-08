/**
 * @typedef {"translate-effector" | "rotate-effector" | "drag-joint"} JogMode
 */

import { createComponent, html } from "../lib/component.js";
import { createEffect, createSignal } from "../lib/state.js";

/**
 * @typedef {Object} JogState
 * @property {JogMode} mode - Currently selected translation mode
 */

const [jogState, setJogState] = createSignal({
  mode: /** @type {JogMode} */ ("drag-joint"),
});
export { jogState };

createComponent({
  tag: "jog-control",
  template: html`
    <div role="group">
      <button data-mode="translate-effector">Translate</button>
      <button data-mode="rotate-effector">Rotate</button>
      <button data-mode="drag-joint">Joint</button>
    </div>
  `,
  attrsFn: (_state, attrs) => {
    const currentJogState = jogState();
    /**
     *
     * @param {JogMode} mode
     */
    function setMode(mode) {
      setJogState({
        ...currentJogState,
        mode,
      });
    }

    /**
     *
     * @param {JogMode} checkMode
     */
    function ariaCurrent(checkMode) {
      return currentJogState.mode === checkMode ? "true" : undefined;
    }

    /**
     *
     * @param {JogMode} forMode
     */
    function buildAttrs(forMode) {
      return {
        [`[data-mode='${forMode}']`]: {
          eventListeners: {
            click: () => setMode(forMode),
          },
          attributes: {
            "aria-current": ariaCurrent(forMode),
          },
        },
      };
    }

    return {
      ...buildAttrs("translate-effector"),
      ...buildAttrs("rotate-effector"),
      ...buildAttrs("drag-joint"),
    };
  },
});

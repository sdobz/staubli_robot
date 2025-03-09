import { html, createComponent } from "./lib/component.js";
import { createEffect, createSignal } from "./lib/state.js";
import { robot } from "./robot.js";

/** @import { Position } from './robot.js' */

const [sequenceState, setSequenceState] = createSignal({
  index: 0,
  active: false,
  pending: false,
});
export { sequenceState };

/**
 * @typedef {Object} JogItem
 * @property {string} [name]
 * @property {Position} position
 * @property {boolean} [hide]
 */

/** @type {JogItem[]} */
const initialJogSequence = [];
const [jogSequence, _setJogSequence] = createSignal(initialJogSequence);

/** @type {(sequence: JogItem[]) => void} */
function setJogSequence(newJogSequence) {
  const currentState = sequenceState();
  if (currentState.active) {
    setSequenceState({
      ...currentState,
      active: false,
    });
  }

  _setJogSequence(newJogSequence);
}
export { jogSequence, setJogSequence };

createEffect(() => {
  const currentSequence = jogSequence();
  const currentState = sequenceState();
  const currentRobot = robot();

  if (!currentRobot) {
    return;
  }

  if (currentState.pending) {
    return;
  }

  if (!currentState.active) {
    return;
  }

  if (currentSequence.length === 0) {
    return;
  }

  setSequenceState({
    ...currentState,
    pending: true,
  });

  const nextPosition = currentSequence[0];
  currentRobot.jog(nextPosition.position).then(() => {
    const newSequence = jogSequence().slice(1);
    const newState = sequenceState();

    const newActive = newState.active && newSequence.length > 0;

    _setJogSequence(newSequence);
    setSequenceState({
      ...newState,
      active: newActive,
      pending: false,
    });
  });
});

createComponent({
  tag: "jog-sequence-control",
  template: html`
    <div class="vertical-stack">
      <div role="group">
        <button class="sequence-purge">X</button>
        <button class="sequence-active">&amp;</button>
      </div>
      <table class="effector">
        <thead>
          <tr>
            <th scope="col">go</th>
            <th scope="col">show</th>
            <th scope="col">name</th>
            <th scope="col">type</th>
            <th scope="col">dist</th>
          </tr>
        </thead>
        <tbody class="positions"></tbody>
      </table>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = sequenceState();
    const currentSequence = jogSequence();

    const isActive = currentState.active;
    const isEmpty = currentSequence.length === 0;

    function purgeSequence() {
      if (isActive) {
        toggleActive();
      }
      setJogSequence([]);
    }

    function toggleActive() {
      setSequenceState({
        ...currentState,
        active: !isActive,
      });
    }

    function toggleHide() {
      const index = findIndex(this);

      if (index === undefined || isNaN(index)) {
        return;
      }

      currentSequence[index].hide = !currentSequence[index].hide;
      setJogSequence(currentSequence);
    }

    const children = currentSequence
      .map(
        (item, index) => `
      <tr data-index="${index}">
        <td ${
          index === 0 && currentState.pending ? "aria-loading=true" : ""
        }></td>
        <td><input class="toggle-hide" type="checkbox" ${
          item.hide ? "" : "checked"
        }/></td>
        <th scope="row">${item.name}</th>
        <td>${!!item.position.effector ? "tool" : ""} ${
          !!item.position.joints ? "joint" : ""
        }</td>
        <td>123mm</td>
      </tr>
    `
      )
      .join("\n");

    return {
      ".sequence-purge": {
        attributes: {
          disabled: isEmpty ? "true" : undefined,
        },
        eventListeners: {
          click: purgeSequence,
        },
      },
      ".sequence-active": {
        properties: {
          innerHTML: isActive ? "||" : ">",
        },
        attributes: {
          disabled: isEmpty ? "true" : undefined,
        },
        eventListeners: {
          click: toggleActive,
        },
      },
      ".positions": {
        properties: { innerHTML: children },
      },
      ".toggle-hide": {
        eventListeners: {
          click: toggleHide,
        },
      },
    };
  },
});

/**
 *
 * @param {HTMLElement} el
 */
function findIndex(el) {
  if (el.hasAttribute("data-index")) {
    return parseInt(el.getAttribute("data-index") || "");
  }
  if (el.parentElement) {
    return findIndex(el.parentElement);
  }
  return;
}

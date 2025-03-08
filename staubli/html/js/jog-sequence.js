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
  tag: "jog-sequence-position",
  observedAttributes: ["index"],
  template: html`
    <article class="vertical-stack">
      <input class="name" value="" />
      <button class="remove">X</button>
      <table class="effector">
        <thead>
          <tr>
            <th scope="col">X</th>
            <th scope="col">Y</th>
            <th scope="col">Z</th>
            <th scope="col">Y</th>
            <th scope="col">P</th>
            <th scope="col">R</th>
          </tr>
        </thead>
      </table>
      <table class="joints">
        <thead>
          <tr>
            <th scope="col">J1</th>
            <th scope="col">J2</th>
            <th scope="col">J3</th>
            <th scope="col">J4</th>
            <th scope="col">J5</th>
            <th scope="col">J6</th>
          </tr>
        </thead>
      </table>
    </article>
  `,
  attrsFn: (_state, attrs) => {
    const currentSequence = jogSequence();
    const currentState = sequenceState();
    
    const index = parseInt(attrs.index);
    const thisItem = currentSequence[index];

    const isDisabled = currentState.pending || currentState.active;
    const isPending = index === 0 && currentState.pending;

    function removeItem() {
      const newSequence = [...currentSequence];
      newSequence.splice(index, 1);
      setJogSequence(newSequence);
    }

    /**
     *
     * @param {Event} e
     */
    function changeName(e) {
      const newName = /** @type {HTMLInputElement} */ (e.target).value;

      // This is a mutation. Does this matter?
      currentSequence[index].name = newName;
      setJogSequence(currentSequence);
    }

    return {
      ".loading": {
        attributes: { style: isPending ? "" : "display: none" },
      },
      ".remove": {
        attributes: {
          disabled: isDisabled ? "true" : undefined,
        },
        eventListeners: {
          click: removeItem,
        },
      },
      ".name": {
        attributes: {
          value: thisItem?.name,
        },
        eventListeners: {
          change: changeName,
        },
      },
      ".effector": {
        attributes: {
          style: thisItem?.position.effector ? undefined : "display: none;",
        },
      },
      ".joints": {
        attributes: {
          style: thisItem?.position.joints ? undefined : "display: none;",
        },
      },
    };
  },
});

createComponent({
  tag: "jog-sequence-control",
  template: html`
    <div class="vertical-stack">
      <div role="group">
        <button class="sequence-purge">X</button>
        <button class="sequence-active">&amp;</button>
      </div>
      <div class="positions"></div>
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

    const children = currentSequence
      .map(
        (_, index) =>
          `<jog-sequence-position index="${index}"></jog-sequence-position>`
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
    };
  },
});

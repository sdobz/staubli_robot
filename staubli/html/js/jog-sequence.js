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

/** @type {Position[]} */
const initialJogSequence = [];
const [jogSequence, _setJogSequence] = createSignal(initialJogSequence);

/** @type {(positions: Position[]) => void} */
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
  currentRobot.jog(nextPosition).then(() => {
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
    <div class="horizontal-stack">
      <div class="loading" style="display: none">...</div>
      <pre class="point"></pre>
      <button class="remove">X</button>
    </div>
  `,
  attrsFn: (_state, attrs) => {
    const currentSequence = jogSequence();
    const currentState = sequenceState();
    const index = parseInt(attrs.index);
    const thisPosition = currentSequence[index];

    const isDisabled = currentState.pending || currentState.active;
    const isPending = index === 0 && currentState.pending;
    const point = JSON.stringify(thisPosition);

    function removeItem() {
        const newSequence = [...currentSequence]
        newSequence.splice(index, 1)
        setJogSequence(newSequence)
    }

    return {
      ".loading": {
        attributes: { style: isPending ? "" : "display: none" },
      },
      ".point": {
        properties: { innerHTML: point },
      },
      ".remove": {
        attributes: {
          disabled: isDisabled ? "true" : undefined,
        },
        eventListeners: {
          click: removeItem
        },
      },
    };
  },
});

createComponent({
  tag: "jog-sequence-control",
  template: html`
    <div class="vertical-stack">
      <div class="grid">
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
    const isEmpty = currentSequence.length === 0

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
            disabled: isEmpty ? "true" : undefined
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
            disabled: isEmpty ? "true" : undefined
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

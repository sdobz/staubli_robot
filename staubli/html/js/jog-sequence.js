import { html, createComponent } from "./lib/component.js";
import { createEffect, createSignal } from "./lib/state.js";
import { robot } from "./robot.js";

const notesSequence = [
  {
    name: "jogged j2",
    position: {
      effector: { x: 258.112, y: 0, z: 950.58, roll: 0, pitch: 15.191, yaw: 0 },
      joints: { j1: 0, j2: -74.809, j3: 90, j4: 0, j5: 0, j6: 0 },
    },
  },
  {
    name: "jogged j1",
    position: {
      effector: {
        x: 240.16,
        y: 94.58,
        z: 950.58,
        roll: 0,
        pitch: 15.191,
        yaw: 21.496,
      },
      joints: { j1: 21.496, j2: -74.809, j3: 90, j4: 0, j5: 0, j6: 0 },
    },
  },
  {
    name: "jogged j3",
    position: {
      effector: {
        x: 495.824,
        y: 195.266,
        z: 771.953,
        roll: 0,
        pitch: 50.863,
        yaw: 21.496,
      },
      joints: { j1: 21.496, j2: -74.809, j3: 125.672, j4: 0, j5: 0, j6: 0 },
    },
  },
  {
    name: "jogged j4",
    position: {
      effector: {
        x: 495.82,
        y: 195.264,
        z: 771.958,
        roll: 43.388,
        pitch: 50.862,
        yaw: 21.496,
      },
      joints: {
        j1: 21.496,
        j2: -74.809,
        j3: 125.671,
        j4: 43.388,
        j5: 0,
        j6: 0,
      },
    },
  },
  {
    name: "jogged j5",
    position: {
      effector: {
        x: 488.137,
        y: 236.928,
        z: 721.86,
        roll: 32.223,
        pitch: 87.608,
        yaw: 50.81,
      },
      joints: {
        j1: 21.496,
        j2: -74.809,
        j3: 125.67,
        j4: 43.388,
        j5: 45.408,
        j6: -0.004,
      },
    },
  },
  {
    name: "jogged j6",
    position: {
      effector: {
        x: 488.137,
        y: 236.928,
        z: 721.86,
        roll: -130.227,
        pitch: 87.608,
        yaw: 50.81,
      },
      joints: {
        j1: 21.496,
        j2: -74.809,
        j3: 125.67,
        j4: 43.388,
        j5: 45.408,
        j6: 197.547,
      },
    },
  },
];

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
const initialJogSequence = notesSequence;
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
      const index = findIndex(this)

      if (index === undefined || isNaN(index)) {
        return
      }

      currentSequence[index].hide = !currentSequence[index].hide
      setJogSequence(currentSequence)
    }

    const children = currentSequence
      .map(
        (item, index) => `
      <tr data-index="${index}">
        <td ${index===0 && currentState.pending ? 'aria-loading=true' : ''}></td>
        <td><input class="toggle-hide" type="checkbox" ${item.hide ? "" : "checked"}/></td>
        <th scope="row">${item.name}</th>
        <td>${!!item.position.effector ? "tool" : ""} ${!!item.position.joints ? "joint" : ""}</td>
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
          click: toggleHide
        }
      }
    };
  },
});

/**
 * 
 * @param {HTMLElement} el 
 */
function findIndex(el) {
  if (el.hasAttribute("data-index")) {
    return parseInt(el.getAttribute("data-index") || "")
  }
  if (el.parentElement) {
    return findIndex(el.parentElement)
  }
  return
}

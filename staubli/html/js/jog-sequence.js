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
const initialJogSequence = [
  {
    name: "using effector 1",
    position: {
      effector: {
        x: 670.835,
        y: 277.027,
        z: 541.06,
        roll: 39.199,
        pitch: 39.112,
        yaw: 58.668,
      },
      joints: {
        j1: 19.78,
        j2: -57.192,
        j3: 134.759,
        j4: 148.725,
        j5: 49.717,
        j6: -87.32,
      },
    },
  },
  {
    name: "using effector 2",
    position: {
      effector: {
        x: 608.873,
        y: 277.019,
        z: 541.083,
        roll: 39.197,
        pitch: 58.666,
        yaw: 39.112,
      },
      joints: {
        j1: 22.708,
        j2: -69.828,
        j3: 150.301,
        j4: 147.402,
        j5: 26.6,
        j6: -102.337,
      },
    },
  },
  {
    name: "using effector 3",
    position: {
      effector: {
        x: 608.871,
        y: 277.031,
        z: 541.084,
        roll: -129.804,
        pitch: 20.048,
        yaw: -43.78,
      },
      joints: {
        j1: 26.82,
        j2: -61.689,
        j3: 143.376,
        j4: 199.501,
        j5: 75.612,
        j6: -24.284,
      },
    },
  },
  {
    name: "using effector 4",
    position: {
      effector: {
        x: 682.035,
        y: 421.553,
        z: 423.287,
        roll: 49.281,
        pitch: 28.47,
        yaw: 81.312,
      },
      joints: {
        j1: 29.441,
        j2: -43.213,
        j3: 128.056,
        j4: 156.172,
        j5: 68.152,
        j6: -73.148,
      },
    },
  },
  {
    name: "using effector 5",
    position: {
      effector: {
        x: 539.257,
        y: 584.836,
        z: 358.706,
        roll: -31.386,
        pitch: 98.682,
        yaw: 81.495,
      },
      joints: {
        j1: 43.602,
        j2: -51.868,
        j3: 139.63,
        j4: 73.374,
        j5: 39.319,
        j6: -106.981,
      },
    },
  },
  {
    name: "using effector 6",
    position: {
      effector: {
        x: 539.26,
        y: 584.843,
        z: 358.692,
        roll: -116.323,
        pitch: 119.9,
        yaw: 104.759,
      },
      joints: {
        j1: 42.625,
        j2: -45.461,
        j3: 125.18,
        j4: 53.707,
        j5: 71.958,
        j6: 177.495,
      },
    },
  },
];

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

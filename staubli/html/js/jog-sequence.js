import { html, createComponent } from "./lib/component.js";
import { createEffect, createSignal } from "./lib/state.js";
import { robot, robotState, positionType } from "./robot.js";
import { getItem, listItems, removeItem, setItem } from "./lib/storage.js";

/** @import { Position, JointPosition, EffectorPosition } from './robot.js' */

/** @typedef {"stopped" | "play" | "preview" | "jog" } PlaybackEnum */
/** @typedef {"none" | "sequence" | "item" } EditingEnum */

/**
 * @typedef {Object} SequenceState
 * @property {number} selectedIndex
 * @property {boolean} updateSelected
 * @property {PlaybackEnum} playback
 * @property {EditingEnum} editing
 * @property {boolean} loop
 * @property {boolean} busy
 */

/** @type {SequenceState} */
const initialSequenceState = {
  selectedIndex: 0,
  updateSelected: false,
  editing: "none",
  playback: "stopped",
  loop: false,
  busy: false,
};
const [sequenceState, setSequenceState] = createSignal(initialSequenceState);
export { sequenceState };

/**
 * @typedef {Object} JogItem
 * @property {string} name
 * @property {Position} position
 * @property {number} [speed]
 */

/**
 * @typedef {Object} JogSequence
 * @property {string} [name]
 * @property {string} [id]
 * @property {number} [speed]
 * @property {JogItem[]} items
 */

/** @type {JogSequence} */
const initialJogSequence = {
  items: [],
};
const [jogSequence, _setJogSequence] = createSignal(initialJogSequence);

/**
 * @typedef {Object} JogSequenceIndex
 * @property {string} name
 * @property {string} id
 */

/** @type {JogSequenceIndex[]} */
const initialJogSequenceIndex = listItems("sequence");
const [sequences, setSequences] = createSignal(initialJogSequenceIndex);

/**
 * @param {JogSequence} jogSequence
 */
function isPopulated(jogSequence) {
  return !!jogSequence.name || jogSequence.items.length > 0;
}

function reduceJogSequence({ id, name }) {
  return { id, name };
}

function sortJogSequence({ name: nameA }, { name: nameB }) {
  return nameA < nameB ? -1 : 1;
}

/**
 *
 * @param {JogSequence} newJogSequence
 */
function setJogSequence(newJogSequence) {
  const currentState = sequenceState();
  if (currentState.busy) {
    setSequenceState({
      ...currentState,
      playback: "stopped",
    });
  }

  if (isPopulated(newJogSequence)) {
    if (!newJogSequence.id) {
      newJogSequence = {
        ...newJogSequence,
        name: newJogSequence.name || new Date().toISOString(),
        id: Math.random().toString(36).slice(2),
      };
    }

    setItem(
      "sequence",
      /** @type {Required<JogSequence>} */ (newJogSequence),
      reduceJogSequence,
      sortJogSequence
    );
    setSequences(listItems("sequence"));
  }

  _setJogSequence(newJogSequence);
}

/**
 * @param {{joints?: Partial<JointPosition>, effector?: EffectorPosition}} partialPosition
 */
export function updatePosition(partialPosition) {
  const currentJogSequence = jogSequence();
  const currentSequenceState = sequenceState();
  const currentRobotState = robotState();
  const currentIndex = currentSequenceState.selectedIndex;
  const currentItem = currentJogSequence.items[currentIndex];

  /** @type {Position} */
  let position;

  if (partialPosition.joints) {
    // Joints always "append" - preserve order
    let lastJoints = currentRobotState.position.joints;

    for (let i = currentIndex - 1; i >= 0; i -= 1) {
      const testJoints = currentJogSequence.items[i]?.position.joints;
      if (!testJoints) {
        continue;
      }

      lastJoints = testJoints;
      break;
    }

    if (!lastJoints) {
      throw new Error(
        "Unable to discover previous joints while inserting joint based position"
      );
    }

    position = {
      joints: {
        ...lastJoints,
        ...partialPosition.joints,
      },
    };
  } else if (partialPosition.effector) {
    position = { effector: partialPosition.effector };
  } else {
    throw new Error("Invalid position supplied to updatePosition");
  }

  const shouldUpdate =
    currentSequenceState.updateSelected &&
    currentItem &&
    positionType(position) === positionType(currentItem.position);

  const oldItems = currentJogSequence.items;

  /** @type {JogItem[]} */
  const newItems = shouldUpdate
    ? [
        ...oldItems.slice(0, currentIndex),
        { ...currentItem, position },
        ...oldItems.slice(currentIndex),
      ]
    : [...oldItems, { name: new Date().toISOString(), position }];

  setJogSequence({
    ...currentJogSequence,
    items: newItems,
  });
}

export function loadJogSequence(id) {
  /** @type {JogSequence | null} */
  const item = getItem("sequence", id);
  if (!item) {
    return;
  }

  setJogSequence(item);
  setSequenceState(initialSequenceState);
}
export { jogSequence, setJogSequence };

createEffect(() => {
  const initialSequence = jogSequence();
  const initialState = sequenceState();
  const currentRobot = robot();

  if (initialState.playback !== "play" && initialState.playback !== "jog") {
    return;
  }

  if (initialState.busy) {
    return;
  }

  if (!currentRobot) {
    return;
  }

  if (initialSequence.items.length === 0) {
    return;
  }

  const nextIndex = initialState.selectedIndex;
  const nextItem = initialSequence.items[nextIndex];

  if (!nextItem) {
    setSequenceState({
      ...initialState,
      playback: "stopped",
    });
    return;
  }

  /** @type {SequenceState} */
  const busyState = {
    ...initialState,
    busy: true,
  };
  setSequenceState(busyState);

  currentRobot.jog(nextItem.position).then(() => {
    const newSequence = jogSequence();
    const newState = sequenceState();

    const stateChangedWhileWaiting =
      newSequence !== initialSequence || newState !== busyState;
    const isJog = newState.playback === "jog";
    const loopOver = nextIndex >= newSequence.items.length - 1;

    if (stateChangedWhileWaiting || isJog || loopOver) {
      setSequenceState({
        ...newState,
        playback: "stopped",
        busy: false,
      });
    } else {
      const loopedIndex = (nextIndex + 1) % newSequence.items.length;
      setSequenceState({
        ...newState,
        selectedIndex: loopedIndex,
      });
    }
  });
});

createComponent({
  tag: "jog-sequence-control",
  template: html`
    <article class="vertical-stack">
      <h4>Jog Sequence</h4>
      <select
        class="select-jog-sequence"
        aria-label="Load Jog Sequence"
        required
      >
        <option selected value="">New</option>
      </select>
      <div role="group">
        <button class="sequence-edit">Edit</button>
        <button class="sequence-delete">Delete</button>
      </div>
      <h4>Playback (CAUSES MOVEMENT)</h4>
      <div role="group">
        <button class="sequence-preview">preview</button>
        <button class="sequence-jog">jog</button>
        <button class="sequence-play">play</button>
        <button class="sequence-stop">stop</button>
      </div>
      <h4>Current Point</h4>
      <fieldset>
        <label>
          <input class="sequence-update" type="checkbox" role="switch" />
          Update Selected
        </label>
        <button class="item-edit">Edit Selected</button>
      </fieldset>
      <table class="effector">
        <thead>
          <tr>
            <th scope="col">select</th>
            <th scope="col">name</th>
            <th scope="col">type</th>
            <th scope="col">speed</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody class="positions"></tbody>
      </table>
    </article>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = sequenceState();
    const currentSequence = jogSequence();

    const isEmpty = currentSequence.items.length === 0;
    const isBusy = currentState.busy;

    function onSelectJogSequence(e) {
      if (isBusy) return;
      const selectedJogSequenceId = e.target.value;

      if (!selectedJogSequenceId) {
        setJogSequence(initialJogSequence);
        return;
      }

      loadJogSequence(selectedJogSequenceId);
    }

    function doDeleteSequence() {
      if (isBusy) return;

      if (currentSequence.id) {
        removeItem("sequence", /** @type{{id: string}} */ (currentSequence));
        setSequences(listItems("sequence"));
      }
      setJogSequence(initialJogSequence);
    }

    function doEditSequence() {
      if (isBusy) return;

      setSequenceState({
        ...currentState,
        editing: "sequence",
      });
    }

    function doToggleUpdateSelected() {
      setSequenceState({
        ...currentState,
        updateSelected: !currentState.updateSelected,
      });
    }

    /**
     * @param {PlaybackEnum} playback
     */
    function makePlaybackHandler(playback) {
      return () => {
        if (isBusy) return;

        setSequenceState({
          ...currentState,
          playback,
        });
      };
    }

    const doPlay = makePlaybackHandler("play");
    const doPreview = makePlaybackHandler("preview");
    const doStop = makePlaybackHandler("stopped");
    const doJog = makePlaybackHandler("jog");

    /**
     * @param {Event} e
     */
    function onSelectItem(e) {
      e.preventDefault();
      if (isBusy) return;

      let index = findIndex(this);

      setSequenceState({
        ...currentState,
        selectedIndex: index,
      });
    }

    function onDeleteItem() {
      if (isBusy) return;

      const index = findIndex(this);
      if (index === undefined || isNaN(index)) {
        return;
      }

      const newItems = currentSequence.items.filter((_, i) => i !== index);
      let nextSelectedIndex = currentState.selectedIndex;

      if (index < nextSelectedIndex) {
        nextSelectedIndex -= 1;
      }

      if (nextSelectedIndex >= newItems.length) {
        nextSelectedIndex = newItems.length - 1;
      }

      if (nextSelectedIndex !== currentState.selectedIndex) {
        setSequenceState({
          ...currentState,
          selectedIndex: nextSelectedIndex,
        });
      }

      setJogSequence({
        ...currentSequence,
        items: newItems,
      });
    }

    function doEditItem() {
      if (isBusy) return;

      setSequenceState({
        ...currentState,
        editing: "item",
      });
    }

    const selectItems =
      `
        <option ${!currentSequence.id ? "selected" : ""} value="">
           New
        </option>
    ` +
      sequences().map(
        ({ name, id }) => `
      <option ${currentSequence.id === id ? "selected" : ""} value="${id}">
          ${name}
      </option>
    `
      );

    const children =
      currentSequence.items
        .map(
          (item, index) => `
      <tr data-index="${index}">
        <td>
          <input type="radio" class="item-select" ${
            currentState.selectedIndex === index ? "checked" : ""
          } />
        </td>
        <th scope="row">${item.name}</th>
        <td>${!!item.position.effector ? "tool" : ""} ${
            !!item.position.joints ? "joint" : ""
          }</td>
        <td>${item.speed !== undefined ? item.speed : "inherit"}</td>
        <td><button class="item-delete">X</button></td>
      </tr>
    `
        )
        .join("\n") +
      (currentSequence.items.length == 0
        ? `
      <tr>
        <td>
          <input type="radio" class="item-select" "checked" />
          Jog robot to add point
        </td>
        <th scope="row" colspan="4"></th>
      </tr>
      `
        : "");

    const busyDisabled = isBusy ? "true" : undefined;
    const emptyDisabled = isEmpty ? "true" : undefined;
    const selectedDisabled = !currentSequence.items[currentState.selectedIndex]
      ? "true"
      : undefined;

    return {
      ".sequence-delete": {
        attributes: {
          disabled: busyDisabled,
        },
        eventListeners: {
          click: doDeleteSequence,
        },
      },
      ".sequence-edit": {
        attributes: {
          disabled: busyDisabled,
        },
        eventListeners: {
          click: doEditSequence,
        },
      },
      ".sequence-update": {
        attributes: {
          disabled: selectedDisabled,
          checked: currentState.updateSelected ? "true" : undefined,
        },
        eventListeners: {
          click: doToggleUpdateSelected,
        },
      },
      ".sequence-play": {
        attributes: {
          disabled: emptyDisabled || busyDisabled,
        },
        eventListeners: {
          click: doPlay,
        },
      },
      ".sequence-jog": {
        attributes: {
          disabled: emptyDisabled || busyDisabled || selectedDisabled,
        },
        eventListeners: {
          click: doJog,
        },
      },
      ".sequence-stop": {
        attributes: {
          disabled: emptyDisabled || busyDisabled,
        },
        eventListeners: {
          click: doStop,
        },
      },
      ".sequence-preview": {
        attributes: {
          disabled: emptyDisabled || busyDisabled,
        },
        eventListeners: {
          click: doPreview,
        },
      },
      ".select-jog-sequence": {
        attributes: {
          disabled: busyDisabled,
        },
        properties: { innerHTML: selectItems },
        eventListeners: {
          change: onSelectJogSequence,
        },
      },
      ".positions": {
        properties: { innerHTML: children },
      },
      ".item-select": {
        attributes: {
          disabled: busyDisabled,
        },
        eventListeners: {
          click: onSelectItem,
        },
      },
      ".item-edit": {
        attributes: {
          disabled: busyDisabled || selectedDisabled,
        },
        eventListeners: {
          click: doEditItem,
        },
      },
      ".item-delete": {
        attributes: {
          disabled: busyDisabled,
        },
        eventListeners: {
          click: onDeleteItem,
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
    return parseInt(el.getAttribute("data-index") || "-1");
  }
  if (el.parentElement) {
    return findIndex(el.parentElement);
  }
  return -1;
}

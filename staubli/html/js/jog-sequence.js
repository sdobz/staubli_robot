import { html, createComponent } from "./lib/component.js";
import { createEffect, createSignal } from "./lib/state.js";
import { robot } from "./robot.js";
import { getItem, listItems, removeItem, setItem } from "./lib/storage.js";

/** @import { Position } from './robot.js' */

/** @typedef {"stopped" | "play" | "preview" | "jog" } PlaybackEnum */
/** @typedef {"none" | "sequence" | "item" } EditingEnum */

/**
 * @typedef {Object} SequenceState
 * @property {number} [selectedIndex]
 * @property {PlaybackEnum} playback
 * @property {EditingEnum} editing
 * @property {boolean} loop
 * @property {boolean} busy
 */

/** @type {SequenceState} */
const initialSequenceState = {
  selectedIndex: undefined,
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

export function loadJogSequence(id) {
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

  const nextIndex =
    initialState.selectedIndex === undefined ? 0 : initialState.selectedIndex;
  const nextItem = initialSequence[nextIndex];

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
        editing: "sequence"
      })
    }

    /**
     * @param {PlaybackEnum} playback
     */
    function makePlaybackHandler(playback) {
      return () => {
        if (isBusy) return;

        setSequenceState({
          ...currentState,
          playback
        })
      }
    }

    const doPlay = makePlaybackHandler("play")
    const doPreview = makePlaybackHandler("preview")
    const doStop = makePlaybackHandler("stopped")
    const doJog = makePlaybackHandler("jog")

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
      let nextSelectedIndex = currentState.selectedIndex

      if (nextSelectedIndex !== undefined) {
        if (index < nextSelectedIndex) {
          nextSelectedIndex -= 1
        }

        if (nextSelectedIndex >= newItems.length) {
          nextSelectedIndex = undefined
        }

        if (nextSelectedIndex !== currentState.selectedIndex) {
          setSequenceState({
            ...currentState,
            selectedIndex: nextSelectedIndex
          })
        }
      }
      
      setJogSequence({
        ...currentSequence,
        items: newItems
      })
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

    const children = currentSequence.items
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
      .join("\n") + `
      <tr>
        <td>
          <input type="radio" class="item-select" ${currentState.selectedIndex === undefined ? "checked" : ""}
          />
        </td>
        <th scope="row" colspan="4">Add new point</th>
      </tr>
      `

    const busyDisabled =  isBusy ? "true" : undefined
    const emptyDisabled =  isEmpty ? "true" : undefined
    const jogDisabled = currentState.selectedIndex === undefined || !currentSequence[currentState.selectedIndex] ? "true" : undefined

    return {
      ".sequence-delete": {
        attributes: {
          disabled: busyDisabled
        },
        eventListeners: {
          click: doDeleteSequence,
        },
      },
      ".sequence-edit": {
        attributes: {
          disable: busyDisabled
        },
        eventListeners: {
          click: doEditSequence,
        }
      },
      ".sequence-play": {
        attributes: {
          disabled: emptyDisabled || busyDisabled
        },
        eventListeners: {
          click: doPlay,
        },
      },
      ".sequence-jog": {
        attributes: {
          disabled: emptyDisabled || busyDisabled || jogDisabled
        },
        eventListeners: {
          click: doJog,
        },
      },
      ".sequence-stop": {
        attributes: {
          disabled: emptyDisabled || busyDisabled
        },
        eventListeners: {
          click: doStop,
        },
      },
      ".sequence-preview": {
        attributes: {
          disabled: emptyDisabled || busyDisabled
        },
        eventListeners: {
          click: doPreview,
        },
      },
      ".select-jog-sequence": {
        attributes: {
          disabled: busyDisabled
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
          disabled: busyDisabled
        },
        eventListeners: {
          click: onSelectItem,
        },
      },
      ".item-delete": {
        attributes: {
          disabled: busyDisabled
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
    return parseInt(el.getAttribute("data-index") || "");
  }
  if (el.parentElement) {
    return findIndex(el.parentElement);
  }
  return;
}

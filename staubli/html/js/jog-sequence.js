import { html, createComponent } from "./lib/component.js";
import { createEffect, createSignal } from "./lib/state.js";
import { robot } from "./robot.js";
import {getItem, listItems, removeItem, setItem} from "./lib/storage.js"

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
 * @property {boolean} [visible]
 */

/**
 * @typedef {Object} JogSequence
 * @property {string} [name]
 * @property {string} [id]
 * @property {JogItem[]} items
 */

/** @type {JogSequence} */
const initialJogSequence = {
  items: []
};
const [jogSequence, _setJogSequence] = createSignal(initialJogSequence);

/**
 * @typedef {Object} JogSequenceIndex
 * @property {string} name
 * @property {string} id
 */

/** @type {JogSequenceIndex[]} */
const initialJogSequenceIndex = listItems("sequence")
const [sequences, setSequences] = createSignal(initialJogSequenceIndex)

/**
 * @param {JogSequence} jogSequence 
 */
function isPopulated(jogSequence) {
  return !!jogSequence.name || jogSequence.items.length > 0
}

function reduceJogSequence({id, name}) {
  return {id, name}
}

function sortJogSequence({name: nameA}, {name: nameB}) {
  return nameA < nameB ? -1 : 1
}

/**
 * 
 * @param {JogSequence} newJogSequence 
 */
function setJogSequence(newJogSequence) {
  const currentState = sequenceState();
  if (currentState.active) {
    setSequenceState({
      ...currentState,
      active: false,
    });
  }

  if (isPopulated(newJogSequence)) {
    if (!newJogSequence.id) {
      newJogSequence = {
        ...newJogSequence,
        name: newJogSequence.name || (new Date()).toISOString(),
        id: Math.random().toString(36).slice(2)
      }
    }
    
    setItem('sequence', /** @type {Required<JogSequence>} */(newJogSequence), reduceJogSequence, sortJogSequence)
    setSequences(listItems('sequence'))
  }

  _setJogSequence(newJogSequence);
}

export function loadJogSequence(id) {
  const item = getItem('sequence', id)
  if (!item) {
    return
  }

  setJogSequence(item)
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

  if (currentSequence.items.length === 0) {
    return;
  }

  setSequenceState({
    ...currentState,
    pending: true,
  });

  const nextPosition = currentSequence[0];
  currentRobot.jog(nextPosition.position).then(() => {
    const currentJogSequence = jogSequence()
    const newItems = currentJogSequence.items.slice(1);
    const newState = sequenceState();

    const newActive = newState.active && newItems.length > 0;

    _setJogSequence({
      ...currentJogSequence,
      items: newItems
    });
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
    <article class="vertical-stack">
        <h4>Jog Sequence</h4>
        <select class="select-jog-sequence" aria-label="Load Jog Sequence" required>
          <option selected value="">
            New
          </option>
        </select>
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
    </article>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = sequenceState();
    const currentSequence = jogSequence();

    const isActive = currentState.active;
    const isEmpty = currentSequence.items.length === 0;

    function onSelectJogSequence(e) {
      const selectedJogSequenceId = e.target.value

      if (!selectedJogSequenceId) {
        setJogSequence(initialJogSequence)
        return
      }

      loadJogSequence(selectedJogSequenceId)
    }

    function deleteSequence() {
      if (isActive) {
        toggleActive();
      }

      if (currentSequence.id) {
        removeItem('sequence', /** @type{{id: string}} */(currentSequence))
        setSequences(listItems('sequence'))
      }
      setJogSequence(initialJogSequence);
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

    const selectItems = `
        <option ${!currentSequence.id ? "selected" : ""} value="">
           New
        </option>
    ` + sequences().map(({name, id}) => `
      <option ${currentSequence.id === id ? "selected" : ""} value="${id}">
          ${name}
      </option>
    `)

    const children = currentSequence.items
      .map(
        (item, index) => `
      <tr data-index="${index}">
        <td ${
          index === 0 && currentState.pending ? "aria-loading=true" : ""
        }></td>
        <td><input class="toggle-hide" type="checkbox" ${
          item.visible === false ? "" : "checked"
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
          click: deleteSequence,
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
      ".select-jog-sequence": {
        properties: { innerHTML: selectItems },
        eventListeners: {
          change: onSelectJogSequence
        }
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

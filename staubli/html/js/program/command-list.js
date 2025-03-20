import { html, createComponent } from "../lib/component.js";
import {
  addCommand,
  program,
  programmerState,
  setProgram,
  setProgrammerState,
} from "./state.js";

/** @import { JogMode, JogSpace } from './state.js' */

createComponent({
  tag: "command-list",
  template: html`
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
    <div class="horizontal-stack">
      <button class="item-edit">Edit</button>
      <div role="group">
        <select class="command-to-add" aria-label="Command To Add" required>
          <option selected value="joints">Set Joints</option>
          <option value="tool-position">Move</option>
        </select>
        <button class="add-command">Add</button>
      </div>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = programmerState();
    const currentSequence = program();

    const isBusy = currentState.busy;
    /**
     * @param {Event} e
     */
    function onSelectItem(e) {
      e.preventDefault();
      if (isBusy) return;

      let index = findIndex(this);

      setProgrammerState({
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
        setProgrammerState({
          ...currentState,
          selectedIndex: nextSelectedIndex,
        });
      }

      setProgram({
        ...currentSequence,
        items: newItems,
      });
    }

    function doEditItem() {
      if (isBusy) return;

      setProgrammerState({
        ...currentState,
        editing: "item",
      });
    }

    function onSelectCommandToAdd(e) {
      if (isBusy) return;
      const commandToAdd = e.target.value;

      if (!commandToAdd) {
        return;
      }

      setProgrammerState({
        ...currentState,
        commandToAdd,
      });
    }

    function doAddCommand() {
      if (isBusy) return;

      addCommand();
    }

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
      .join("\n");

    const busyDisabled = isBusy ? "true" : undefined;
    const selectedDisabled = !currentSequence.items[currentState.selectedIndex]
      ? "true"
      : undefined;

    return {
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
      ".command-to-add": {
        eventListeners: {
          change: onSelectCommandToAdd,
        },
      },
      ".add-command": {
        attributes: {
          disabled: busyDisabled,
        },
        eventListeners: {
          click: doAddCommand,
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

import { createComponent, html } from "../lib/component.js";
import {
  deleteProgram,
  loadProgram,
  newProgram,
  program,
  programmerState,
  programs,
  setProgrammerState,
} from "./state.js";

createComponent({
  tag: "program-list",
  template: html`
    <select class="select-jog-sequence" aria-label="Load Jog Sequence" required>
      <option selected value="">New</option>
    </select>
    <div role="group">
      <button class="sequence-edit">Edit</button>
      <button class="sequence-delete">Delete</button>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = programmerState();
    const currentSequence = program();

    const isBusy = currentState.busy;

    function onSelectProgram(e) {
      if (isBusy) return;
      const selectedProgramId = e.target.value;

      if (!selectedProgramId) {
        newProgram();
        return;
      }

      loadProgram(selectedProgramId);
    }

    function doDeleteProgram() {
      if (isBusy) return;

      deleteProgram();
    }

    function doEditSequence() {
      if (isBusy) return;

      setProgrammerState({
        ...currentState,
        editing: "sequence",
      });
    }

    const selectItems =
      `
          <option ${!currentSequence.id ? "selected" : ""} value="">
             New
          </option>
      ` +
      programs().map(
        ({ name, id }) => `
        <option ${currentSequence.id === id ? "selected" : ""} value="${id}">
            ${name}
        </option>
      `
      );

    const busyDisabled = isBusy ? "true" : undefined;

    return {
      ".sequence-delete": {
        attributes: {
          disabled: busyDisabled,
        },
        eventListeners: {
          click: doDeleteProgram,
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

      ".select-jog-sequence": {
        attributes: {
          disabled: busyDisabled,
        },
        properties: { innerHTML: selectItems },
        eventListeners: {
          change: onSelectProgram,
        },
      },
    };
  },
});

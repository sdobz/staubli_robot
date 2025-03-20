import { createComponent, html } from "../lib/component.js";
import {
  patchCommand,
  program,
  programmerState,
  setProgram,
  setProgrammerState,
} from "./state.js";

createComponent({
  tag: "program-edit",
  template: html`
    <dialog class="program-edit-modal">
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            class="program-edit-close"
          ></button>
          <p>Editing <strong class="program-edit-name"></strong></p>
        </header>
        <label for="program-name"> Program Name </label>
        <input
          class="program-edit-name-input"
          type="text"
          id="program-name"
          placeholder="Program Name"
          aria-label="Program Name"
        />
      </article>
    </dialog>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = programmerState();
    const currentProgran = program();

    function doCloseEditing() {
      setProgrammerState({
        ...currentState,
        editing: undefined,
      });
    }

    function onChangeName(e) {
      setProgram({
        ...currentProgran,
        name: e.target.value,
      });
    }

    return {
      ".program-edit-modal": {
        attributes: {
          open: currentState.editing === "sequence" ? "open" : undefined,
        },
        eventListeners: {
          click: doCloseEditing,
        },
      },
      ".program-edit-close": {
        eventListeners: {
          click: doCloseEditing,
        },
      },
      ".program-edit-modal article": {
        eventListeners: {
          click: (e) => e.stopPropagation(),
        },
      },

      ".program-edit-name": {
        properties: {
          innerHTML: currentProgran.name,
        },
      },

      ".program-edit-name-input": {
        properties: {
          value: currentProgran.name,
        },
        eventListeners: {
          change: onChangeName,
        },
      },
    };
  },
});

createComponent({
  tag: "command-edit",
  template: html`
    <dialog class="command-edit-modal">
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            class="command-edit-close"
          ></button>
          <p>Editing <strong class="command-edit-name"></strong></p>
        </header>
        <label for="command-name"> Command Name </label>
        <input
          class="command-edit-name-input"
          type="text"
          id="command-name"
          placeholder="Command Name"
          aria-label="Command Name"
        />

        <details name="raw-command">
          <summary>Raw Command</summary>
          <pre class="raw-command-code"></pre>
        </details>
      </article>
    </dialog>
  `,
  attrsFn: (_state, _attrs) => {
    const currentState = programmerState();
    const currentProgran = program();
    const currentCommand = currentProgran.items[currentState.selectedIndex]

    function doCloseEditing() {
      setProgrammerState({
        ...currentState,
        editing: undefined,
      });
    }

    function onChangeName(e) {
      patchCommand({
        name: e.target.value,
      });
    }

    return {
      ".command-edit-modal": {
        attributes: {
          open: currentState.editing === "item" ? "open" : undefined,
        },
        eventListeners: {
          click: doCloseEditing,
        },
      },
      ".command-edit-close": {
        eventListeners: {
          click: doCloseEditing,
        },
      },
      ".command-edit-modal article": {
        eventListeners: {
          click: (e) => e.stopPropagation(),
        },
      },

      ".command-edit-name": {
        properties: {
          innerHTML: currentCommand?.name,
        },
      },

      ".command-edit-name-input": {
        properties: {
          value: currentCommand?.name,
        },
        eventListeners: {
          change: onChangeName,
        },
      },

      ".raw-command-code": {
        properties: {
          innerHTML: JSON.stringify(currentCommand, undefined, 2)
        }
      }
    };
  },
});

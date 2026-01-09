import {
  program,
  programmerState,
  setProgram,
  setProgrammerState,
  patchCommand,
} from "./state";

export function ProgramEdit() {
  const state = programmerState;
  const prog = program;

  function doCloseEditing() {
    setProgrammerState("editing", "none");
  }

  function onChangeName(e: Event) {
    setProgram({ ...prog, name: (e.target as HTMLInputElement).value });
  }

  return (
    <dialog
      class="program-edit-modal"
      open={state.editing === "sequence"}
      onClick={doCloseEditing}
    >
      <article>
        <header>
          <button
            aria-label="Close"
            class="program-edit-close"
            onClick={doCloseEditing}
          ></button>
          <p>
            Editing <strong class="program-edit-name">{prog.name}</strong>
          </p>
        </header>
        <label for="program-name"> Program Name </label>
        <input
          class="program-edit-name-input"
          type="text"
          id="program-name"
          placeholder="Program Name"
          aria-label="Program Name"
          value={prog.name || ""}
          onChange={onChangeName}
        />
      </article>
    </dialog>
  );
}

export function CommandEdit() {
  const state = programmerState;
  const prog = program;
  const currentCommand = prog.commands[state.selectedIndex];

  function doCloseEditing() {
    setProgrammerState({ ...state, editing: undefined });
  }

  function onChangeName(e: Event) {
    patchCommand({
      name: (e.target as HTMLInputElement).value,
      type: currentCommand.type,
    });
  }

  return (
    <dialog
      class="command-edit-modal"
      open={state.editing === "item"}
      onClick={doCloseEditing}
    >
      <article onClick={(e) => e.stopPropagation()}>
        <header>
          <button
            aria-label="Close"
            class="command-edit-close"
            onClick={doCloseEditing}
          ></button>
          <p>
            Editing{" "}
            <strong class="command-edit-name">{currentCommand?.name}</strong>
          </p>
        </header>
        <label for="command-name"> Command Name </label>
        <input
          class="command-edit-name-input"
          type="text"
          id="command-name"
          placeholder="Command Name"
          aria-label="Command Name"
          value={currentCommand?.name}
          onChange={onChangeName}
        />

        <details name="raw-command">
          <summary>Raw Command</summary>
          <pre class="raw-command-code">
            {JSON.stringify(currentCommand, undefined, 2)}
          </pre>
        </details>
      </article>
    </dialog>
  );
}

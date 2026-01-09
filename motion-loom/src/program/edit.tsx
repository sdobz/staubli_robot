import { createMemo } from "solid-js";
import {
  program,
  programmerState,
  setProgram,
  setProgrammerState,
  patchCommand,
} from "./state";

export function ProgramEdit() {
  function doCloseEditing() {
    setProgrammerState("editing", "none");
  }

  function onChangeName(e: Event) {
    setProgram({ ...program, name: (e.target as HTMLInputElement).value });
  }

  return (
    <dialog
      class="program-edit-modal"
      open={programmerState.editing === "sequence"}
      onClick={doCloseEditing}
    >
      <article onClick={(e) => e.stopPropagation()}>
        <header>
          <button
            aria-label="Close"
            class="close"
            onClick={doCloseEditing}
          ></button>
          <p>
            Editing <strong class="program-edit-name">{program.name}</strong>
          </p>
        </header>
        <label for="program-name"> Program Name </label>
        <input
          class="program-edit-name-input"
          type="text"
          id="program-name"
          placeholder="Program Name"
          aria-label="Program Name"
          value={program.name || ""}
          onChange={onChangeName}
        />
      </article>
    </dialog>
  );
}

export function CommandEdit() {
  const currentCommand = createMemo(
    () => program.commands[programmerState.selectedIndex]
  );

  function doCloseEditing() {
    setProgrammerState({ ...programmerState, editing: undefined });
  }

  function onChangeName(e: Event) {
    const cmd = currentCommand();
    if (!cmd) return;
    patchCommand({
      name: (e.target as HTMLInputElement).value,
      type: cmd.type,
    });
  }

  return (
    <dialog
      class="command-edit-modal"
      open={programmerState.editing === "item"}
      onClick={doCloseEditing}
    >
      <article onClick={(e) => e.stopPropagation()}>
        <header>
          <button
            aria-label="Close"
            class="command-edit-close close"
            onClick={doCloseEditing}
          ></button>
          <p>
            Editing{" "}
            <strong class="command-edit-name">{currentCommand()?.name}</strong>
          </p>
        </header>
        <label for="command-name"> Command Name </label>
        <input
          class="command-edit-name-input"
          type="text"
          id="command-name"
          placeholder="Command Name"
          aria-label="Command Name"
          value={currentCommand()?.name}
          onChange={onChangeName}
        />

        <details name="raw-command">
          <summary>Raw Command</summary>
          <pre class="raw-command-code">
            {JSON.stringify(currentCommand(), undefined, 2)}
          </pre>
        </details>
      </article>
    </dialog>
  );
}

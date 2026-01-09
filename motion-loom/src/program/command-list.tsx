import { createEffect, For } from "solid-js";
import {
  addCommand,
  program,
  programmerState,
  setProgram,
  setProgrammerState,
} from "./state";

export function CommandList() {
  function onSelect(index: number) {
    if (programmerState.busy) return;
    setProgrammerState("selectedIndex", index);
  }

  function onDelete(index: number) {
    if (programmerState.busy) return;
    const newCommands = program.commands.filter((_, i) => i !== index);
    let nextSelectedIndex = programmerState.selectedIndex;
    if (index < nextSelectedIndex) nextSelectedIndex -= 1;
    if (nextSelectedIndex >= newCommands.length)
      nextSelectedIndex = newCommands.length - 1;
    if (nextSelectedIndex !== programmerState.selectedIndex)
      setProgrammerState("selectedIndex", nextSelectedIndex);

    setProgram({ ...program, commands: newCommands });
  }

  function doEditItem() {
    if (programmerState.busy) return;
    setProgrammerState({ ...programmerState, editing: "item" });
  }

  function onSelectCommandToAdd(e: Event) {
    if (programmerState.busy) return;
    // @ts-ignore
    const commandToAdd = e.target.value;
    if (!commandToAdd) return;
    setProgrammerState({ ...programmerState, commandToAdd });
  }

  function doAddCommand() {
    if (programmerState.busy) return;
    addCommand();
  }

  return (
    <section>
      <table class="effector">
        <thead>
          <tr>
            <th scope="col">select</th>
            <th scope="col">name</th>
            <th scope="col">type</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          <For each={program.commands}>
            {(command, idx) => {
              const i = idx();
              return (
                <tr data-index={i}>
                  <td>
                    <input
                      type="radio"
                      class="command-select"
                      checked={programmerState.selectedIndex === i}
                      disabled={programmerState.busy}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelect(i);
                      }}
                    />
                  </td>
                  <th scope="row">{command.name}</th>
                  <td>{command.type}</td>
                  <td>
                    <button
                      class="command-delete"
                      disabled={programmerState.busy}
                      onClick={() => onDelete(i)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      <div class="horizontal-stack">
        <button
          class="command-edit"
          disabled={
            programmerState.busy ||
            !program.commands[programmerState.selectedIndex] ||
            !program.name
          }
          onClick={doEditItem}
        >
          Edit
        </button>
        <div role="group">
          <select
            class="command-to-add"
            aria-label="Command To Add"
            required
            onChange={onSelectCommandToAdd}
          >
            <option selected value="joints">
              Joint Position
            </option>
            <option value="effector">Linear Move</option>
            <option value="tool">Tool Offset</option>
            <option value="speed">Speed</option>
          </select>
          <button
            class="add-command"
            disabled={programmerState.busy}
            onClick={doAddCommand}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
}

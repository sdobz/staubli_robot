import { For } from "solid-js";
import {
  addCommand,
  program,
  programmerState,
  setProgram,
  setProgrammerState,
} from "./state";

export function CommandList() {
  const state = programmerState;
  const prog = program;

  function onSelect(index: number) {
    if (state.busy) return;
    setProgrammerState("selectedIndex", index);
  }

  function onDelete(index: number) {
    if (state.busy) return;
    const newCommands = prog.commands.filter((_, i) => i !== index);
    let nextSelectedIndex = state.selectedIndex;
    if (index < nextSelectedIndex) nextSelectedIndex -= 1;
    if (nextSelectedIndex >= newCommands.length)
      nextSelectedIndex = newCommands.length - 1;
    if (nextSelectedIndex !== state.selectedIndex)
      setProgrammerState("selectedIndex", nextSelectedIndex);

    setProgram({ ...prog, commands: newCommands });
  }

  function doEditItem() {
    if (state.busy) return;
    setProgrammerState({ ...state, editing: "item" });
  }

  function onSelectCommandToAdd(e: Event) {
    if (state.busy) return;
    // @ts-ignore
    const commandToAdd = e.target.value;
    if (!commandToAdd) return;
    setProgrammerState({ ...state, commandToAdd });
  }

  function doAddCommand() {
    if (state.busy) return;
    addCommand();
  }

  const isBusy = () => state.busy;

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
          <For each={prog.commands}>
            {(command, idx) => {
              const i = idx();
              return (
                <tr data-index={i}>
                  <td>
                    <input
                      type="radio"
                      class="command-select"
                      checked={state.selectedIndex === i}
                      disabled={isBusy()}
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
                      disabled={isBusy()}
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
          disabled={isBusy() || !prog.commands[state.selectedIndex]}
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
            disabled={isBusy()}
            onClick={doAddCommand}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
}

function findIndex(el: HTMLElement) {
  if (el.hasAttribute("data-index")) {
    return parseInt(el.getAttribute("data-index") || "-1");
  }
  if (el.parentElement) {
    return findIndex(el.parentElement);
  }
  return -1;
}

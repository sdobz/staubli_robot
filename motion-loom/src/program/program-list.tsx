import { createEffect, For } from "solid-js";
import {
  defaultProgramName,
  deleteProgram,
  loadProgram,
  newProgram,
  program,
  programmerState,
  programs,
  setProgram,
  setProgrammerState,
} from "./state";

export function ProgramList() {
  const state = programmerState;
  const current = program;
  const list = programs;

  function onSelectProgram(e: Event) {
    if (state.busy) return;
    const selectedProgramId = (e.target as HTMLSelectElement).value;
    if (!selectedProgramId) {
      newProgram();
      return;
    }
    loadProgram(selectedProgramId);
  }

  function doDeleteProgram() {
    if (state.busy) return;
    deleteProgram();
  }

  function doEditSequence() {
    if (state.busy) return;
    if (!current.name) {
      setProgram({ ...current, name: defaultProgramName() });
    }
    setProgrammerState({ ...state, editing: "sequence" });
  }

  return (
    <div>
      <select
        class="select-jog-sequence"
        aria-label="Load Jog Sequence"
        required
        onChange={onSelectProgram}
        disabled={state.busy}
        value={current.id}
      >
        <option value="">New</option>
        <For each={list}>
          {(item) => <option value={item.id}>{item.name}</option>}
        </For>
      </select>
      <div role="group">
        <button
          class="sequence-edit"
          disabled={state.busy}
          onClick={doEditSequence}
        >
          Edit
        </button>
        <button
          class="sequence-delete"
          disabled={state.busy}
          onClick={doDeleteProgram}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

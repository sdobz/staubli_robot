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
  function onSelectProgram(e: Event) {
    if (programmerState.busy) return;
    const selectedProgramId = (e.target as HTMLSelectElement).value;
    if (!selectedProgramId) {
      newProgram();
      return;
    }
    loadProgram(selectedProgramId);
  }

  function doDeleteProgram() {
    if (programmerState.busy) return;
    deleteProgram();
  }

  function doEditSequence() {
    if (programmerState.busy) return;
    if (!program.name) {
      setProgram({ ...program, name: defaultProgramName() });
    }
    setProgrammerState({ ...programmerState, editing: "sequence" });
  }

  return (
    <div>
      <select
        class="select-jog-sequence"
        aria-label="Load Jog Sequence"
        required
        onChange={onSelectProgram}
        disabled={programmerState.busy}
        value={program.id}
      >
        <option value="">New</option>
        <For each={programs}>
          {(item) => <option value={item.id}>{item.name}</option>}
        </For>
      </select>
      <div role="group">
        <button
          class="sequence-edit"
          disabled={programmerState.busy}
          onClick={doEditSequence}
        >
          Edit
        </button>
        <button
          class="sequence-delete"
          disabled={programmerState.busy}
          onClick={doDeleteProgram}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

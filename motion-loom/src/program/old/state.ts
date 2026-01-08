import { getItem, listItems, removeItem, setItem } from "../../lib/storage";
import { createSignal } from "../../lib/state";
import { bindParam } from "../../lib/url";
import { robot } from "../../robot";
import { derivedState } from "../../3d/viewport";
import {
  Command,
  CommandType,
  EffectorCommand,
  JointsCommand,
  SerialCommand,
  SpeedCommand,
  ToolCommand,
} from "../../robot-types";

export type JogMode = "translate-effector" | "rotate-effector" | "drag-joint";
export type JogSpace = "local" | "world";

export interface JogState {
  mode: JogMode;
  space: JogSpace;
}

const [jogState, setJogState] = createSignal<JogState>({
  mode: "drag-joint",
  space: "world",
});
export { jogState, setJogState };

export type PlaybackEnum = "stopped" | "play" | "preview" | "jog";
export type EditingEnum = "none" | "sequence" | "item";

export interface ProgrammerState {
  selectedIndex: number;
  updateSelected: boolean;
  playback: PlaybackEnum;
  editing: EditingEnum;
  commandToAdd: CommandType;
  loop: boolean;
  busy: boolean;
}

const initialProgrammerState: ProgrammerState = {
  selectedIndex: 0,
  updateSelected: false,
  playback: "stopped",
  editing: "none",
  commandToAdd: "joints",
  loop: false,
  busy: false,
};
const [programmerState, setProgrammerState] = createSignal(
  initialProgrammerState
);
export { programmerState, setProgrammerState };

interface Program {
  name?: string;
  id?: string;
  speed?: number;
  commands: Command[];
}

type SavedProgram = Program & { id: string };

function isSaveable(program: Program): program is SavedProgram {
  return typeof program.id === "string";
}

const initialProgram: Program = {
  commands: [],
};
const [program, _setProgram] = createSignal(initialProgram);
export { program, setProgram };

interface ProgramIndexItem {
  name: string;
  id: string;
}

const initialProgramIndex: ProgramIndexItem[] = listItems("sequence");
const [programs, setPrograms] = createSignal(initialProgramIndex);
export { programs };

function isPopulated(program: Program) {
  return !!program.name || program.commands.length > 0;
}

export function defaultProgramName() {
  return new Date().toISOString();
}

function reduceProgram({ id, name }) {
  return { id, name };
}

function sortProgram({ name: nameA }, { name: nameB }) {
  return nameA < nameB ? -1 : 1;
}

function setProgram(newProgram: Program) {
  const currentState = programmerState();
  if (currentState.busy) {
    setProgrammerState({
      ...currentState,
      playback: "stopped",
    });
  }

  if (isPopulated(newProgram)) {
    const savedProgram = isSaveable(newProgram)
      ? newProgram
      : {
          ...newProgram,
          name: newProgram.name || defaultProgramName(),
          id: Math.random().toString(36).slice(2),
        };

    // Instantiate urdf
    // For item
    //  Set kinematics to position
    //  Derive position
    //  Update derived position

    setItem("sequence", savedProgram, reduceProgram, sortProgram);
    setPrograms(listItems("sequence"));
  }

  _setProgram(newProgram);
}

export function addCommand() {
  const currentProgrammerState = programmerState();
  const currentProgram = program();

  let currentIndex = currentProgrammerState.selectedIndex;
  const derived = derivedState()[currentIndex];
  if (!derived) {
    currentIndex = -1;
  }
  const deriveFromState = derived?.state || robot().state();

  if (!deriveFromState) {
    console.error("Add command without position");
    return;
  }

  let newCommand: Command;

  switch (currentProgrammerState.commandToAdd) {
    case "joints":
      newCommand = {
        name: defaultProgramName(),
        type: "joints",
        data: deriveFromState.position.joints,
      };
      break;
    case "effector":
      newCommand = {
        name: defaultProgramName(),
        type: "effector",
        data: deriveFromState.position.effector,
      };
      break;
    case "tool":
      newCommand = {
        name: defaultProgramName(),
        type: "tool",
        data: deriveFromState.tool_offset,
      };
      break;
    case "speed":
      newCommand = {
        name: defaultProgramName(),
        type: "speed",
        data: { speed: deriveFromState.speed },
      };
      break;
    default:
      throw new Error(
        `Unknown command type: ${currentProgrammerState.commandToAdd}`
      );
  }

  const oldCommands = currentProgram.commands;
  /** @type {Command[]} */
  const newCommands: Command[] = [
    ...oldCommands.slice(0, currentIndex + 1),
    newCommand,
    ...oldCommands.slice(currentIndex + 1),
  ];

  const selectedIndex = currentIndex + 1;

  setProgram({
    ...currentProgram,
    commands: newCommands,
  });
  setProgrammerState({
    ...currentProgrammerState,
    selectedIndex,
  });
}

/**
 * @param {Partial<Command>} patch
 */
export function patchCommand(patch: Partial<Command>) {
  const currentProgrammerState = programmerState();
  const currentProgram = program();

  const currentIndex = currentProgrammerState.selectedIndex;

  const currentCommand = currentProgram.commands[currentIndex];
  if (!currentCommand) {
    console.error("No selected command while patching");
    return;
  }

  if (!patch.type || patch.type !== currentCommand.type) {
    console.error("Attempt to update command with missing or mismatched type");
    return;
  }

  const newCommand = mergeDeep(currentCommand, patch) as Command;

  const oldCommands = currentProgram.commands;
  const newCommands: Command[] = [
    ...oldCommands.slice(0, currentIndex),
    newCommand,
    ...oldCommands.slice(currentIndex + 1),
  ];

  setProgram({
    ...currentProgram,
    commands: newCommands,
  });
}

export function newProgram() {
  setProgram(initialProgram);
}

export function loadProgram(id: string) {
  const item: Program | null = getItem("sequence", id);
  if (!item) {
    return;
  }

  setProgram(item);
  setProgrammerState(initialProgrammerState);
}

export function deleteProgram() {
  const currentProgram = program();
  if (isSaveable(currentProgram)) {
    removeItem("sequence", currentProgram);
    setPrograms(listItems("sequence"));
  }
  setProgram(initialProgram);
}

// Order on params is important:
// When history is popped
// first update program
//  causing the programmer state to revert to "initial" (resetting selected index)
// then update index
bindParam(
  "program",
  () => program().id || "",
  (newProgramId) =>
    newProgramId === "" ? setProgram(initialProgram) : loadProgram(newProgramId)
);

bindParam(
  "index",
  () => programmerState().selectedIndex.toString(),
  (newIndexStr) =>
    setProgrammerState({
      ...programmerState(),
      selectedIndex: parseInt(newIndexStr) || 0,
    })
);

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 */
function mergeDeep<T>(...objects: T[]): T {
  const isObject = (obj: any) => obj && typeof obj === "object";

  return objects.reduce<T>((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {} as T);
}

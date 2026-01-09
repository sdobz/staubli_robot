import { getItem, listItems, removeItem, setItem } from "../lib/storage";
import { createStore } from "solid-js/store";
import { bindParam } from "../lib/url";
import { robot } from "../staubli/robot";
import { derivedState } from "../3d/viewport";
import { Command, CommandType } from "../staubli/robot-types";

export type JogMode = "translate-effector" | "rotate-effector" | "drag-joint";
export type JogSpace = "local" | "world";

export interface JogState {
  mode: JogMode;
  space: JogSpace;
}

const [jogState, setJogState] = createStore<JogState>({
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
const [programmerState, setProgrammerState] = createStore<ProgrammerState>(
  cloneDeep(initialProgrammerState)
);
export { programmerState, setProgrammerState };

interface Program {
  name?: string;
  id: string;
  speed?: number;
  commands: Command[];
}

type SavedProgram = Program & Required<Pick<Program, "name" | "id">>;

function isSaveable(program: Program): program is SavedProgram {
  return program.id !== "" && !!program.name;
}

const initialProgram: Program = {
  id: "",
  commands: [],
};
const [program, _setProgram] = createStore<Program>(cloneDeep(initialProgram));
export { program, setProgram };

interface ProgramIndexItem {
  name: string;
  id: string;
}

const initialProgramIndex: ProgramIndexItem[] = listItems("sequence");
const [programs, setPrograms] =
  createStore<ProgramIndexItem[]>(initialProgramIndex);
export { programs };

function isPopulated(program: Program) {
  return !!program.name || program.commands.length > 0;
}

export function defaultProgramName() {
  return new Date().toISOString();
}

function reduceProgram({ id, name }: SavedProgram) {
  return { id, name };
}

function sortProgram(
  { name: nameA }: { name: string },
  { name: nameB }: { name: string }
) {
  return nameA < nameB ? -1 : 1;
}

function setProgram(newProgram: Program) {
  const { busy } = programmerState;
  if (busy) {
    setProgrammerState("playback", "stopped");
  }

  if (isPopulated(newProgram)) {
    const savedProgram = isSaveable(newProgram)
      ? newProgram
      : {
          ...newProgram,
          name: newProgram.name || defaultProgramName(),
          id: Math.random().toString(36).slice(2),
        };

    setItem("sequence", savedProgram, reduceProgram, sortProgram);
    setPrograms(listItems("sequence"));
    _setProgram(savedProgram);
  } else {
    _setProgram(newProgram);
  }
}

export function addCommand() {
  const { selectedIndex, commandToAdd } = programmerState;
  const { commands } = program;

  let currentIndex = selectedIndex;
  const derived = derivedState()[selectedIndex];
  if (!derived) {
    currentIndex = -1;
  }
  const deriveFromState = derived?.state || robot()?.state();

  if (!deriveFromState) {
    console.error("Add command without position");
    return;
  }

  let newCommand: Command;

  switch (commandToAdd) {
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
      throw new Error(`Unknown command type: ${commandToAdd}`);
  }

  const newCommands = [
    ...commands.slice(0, currentIndex + 1),
    newCommand,
    ...commands.slice(currentIndex + 1),
  ];

  const nextSelectedIndex = currentIndex + 1;

  setProgram({
    ...program,
    commands: newCommands,
  });
  setProgrammerState("selectedIndex", nextSelectedIndex);
}

/**
 * @param {Partial<Command>} patch
 */
export function patchCommand(patch: Partial<Command>) {
  const { selectedIndex } = programmerState;
  const { commands } = program;

  const currentIndex = selectedIndex;

  const currentCommand = commands[currentIndex];
  if (!currentCommand) {
    console.error("No selected command while patching");
    return;
  }

  if (!patch.type || patch.type !== currentCommand.type) {
    console.error("Attempt to update command with missing or mismatched type");
    return;
  }

  const newCommand = mergeDeep(currentCommand, patch) as Command;

  const newCommands: Command[] = [
    ...commands.slice(0, currentIndex),
    newCommand,
    ...commands.slice(currentIndex + 1),
  ];

  setProgram({
    ...program,
    commands: newCommands,
  });
}

export function newProgram() {
  setProgram(cloneDeep(initialProgram));
}

export function loadProgram(id: string) {
  const item: Program | null = getItem("sequence", id);
  if (!item) {
    return;
  }

  _setProgram(item);
  setProgrammerState(cloneDeep(initialProgrammerState));
}

export function deleteProgram() {
  const currentProgram = program;
  if (isSaveable(currentProgram)) {
    removeItem("sequence", currentProgram);
    setPrograms(listItems("sequence"));
  }
  setProgram(cloneDeep(initialProgram));
}

// Order on params is important:
// When history is popped
// first update program
//  causing the programmer state to revert to "initial" (resetting selected index)
// then update index
bindParam(
  "program",
  () => program.id || "",
  (newProgramId) =>
    newProgramId === ""
      ? setProgram(cloneDeep(initialProgram))
      : loadProgram(newProgramId)
);

bindParam(
  "index",
  () => programmerState.selectedIndex.toString(),
  (newIndexStr) =>
    setProgrammerState({
      ...programmerState,
      selectedIndex: parseInt(newIndexStr) || 0,
    })
);

/**
 * Creates a deep clone of an object. Does not modify the original object.
 */
function cloneDeep<T extends Record<string, any>>(obj: T): T {
  const isObject = (val: any) => val && typeof val === "object";

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      isObject(item) ? cloneDeep(item) : item
    ) as unknown as T;
  }

  if (isObject(obj)) {
    return Object.keys(obj).reduce<T>((result, key) => {
      const val = (obj as Record<string, any>)[key];
      (result as Record<string, any>)[key] = isObject(val)
        ? cloneDeep(val)
        : val;
      return result;
    }, {} as T);
  }

  return obj;
}

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 */
function mergeDeep<T extends Record<string, any>>(...objects: T[]): T {
  const isObject = (obj: any) => obj && typeof obj === "object";

  return objects.reduce<T>((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = (prev as Record<string, any>)[key];
      const oVal = (obj as Record<string, any>)[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        (prev as Record<string, any>)[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        (prev as Record<string, any>)[key] = mergeDeep(pVal, oVal);
      } else {
        (prev as Record<string, any>)[key] = oVal;
      }
    });

    return prev;
  }, {} as T);
}

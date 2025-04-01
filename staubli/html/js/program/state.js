import { getItem, listItems, removeItem, setItem } from "../lib/storage.js";
import { createSignal } from "../lib/state.js";
import { bindParam } from "../lib/url.js";
import { robot } from "../robot.js";
import { derivedState } from "../3d/viewport.js";

/**
 * @typedef {"translate-effector" | "rotate-effector" | "drag-joint"} JogMode
 */

/**
 * @typedef {"local" | "world"} JogSpace
 */
/**
 * @typedef {Object} JogState
 * @property {JogMode} mode - Currently selected translation mode
 * @property {JogSpace} space
 */

const [jogState, setJogState] = createSignal({
  mode: /** @type {JogMode} */ ("drag-joint"),
  space: /** @type {JogSpace} */ ("world"),
});
export { jogState, setJogState };

/** @import { Position, JointPosition, EffectorPosition, RobotState, Command, CommandType } from '../robot-types' */

/** @typedef {"stopped" | "play" | "preview" | "jog" } PlaybackEnum */
/** @typedef {"none" | "sequence" | "item" } EditingEnum */

/**
 * @typedef {Object} ProgrammerState
 * @property {number} selectedIndex
 * @property {boolean} updateSelected
 * @property {PlaybackEnum} playback
 * @property {EditingEnum} editing
 * @property {CommandType} commandToAdd
 * @property {boolean} loop
 * @property {boolean} busy
 */

/** @type {ProgrammerState} */
const initialProgrammerState = {
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

/**
 * @typedef {Object} Program
 * @property {string} [name]
 * @property {string} [id]
 * @property {number} [speed]
 * @property {Command[]} commands
 */

/** @type {Program} */
const initialProgram = {
  commands: [],
};
const [program, _setProgram] = createSignal(initialProgram);
export { program, setProgram };

/**
 * @typedef {Object} ProgramIndexItem
 * @property {string} name
 * @property {string} id
 */

/** @type {ProgramIndexItem[]} */
const initialProgramIndex = listItems("sequence");
const [programs, setPrograms] = createSignal(initialProgramIndex);
export { programs };

/**
 * @param {Program} program
 */
function isPopulated(program) {
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

/**
 *
 * @param {Program} newProgram
 */
function setProgram(newProgram) {
  const currentState = programmerState();
  if (currentState.busy) {
    setProgrammerState({
      ...currentState,
      playback: "stopped",
    });
  }

  if (isPopulated(newProgram)) {
    if (!newProgram.id) {
      newProgram = {
        ...newProgram,
        name: newProgram.name || defaultProgramName(),
        id: Math.random().toString(36).slice(2),
      };
    }

    // Instantiate urdf
    // For item
    //  Set kinematics to position
    //  Derive position
    //  Update derived position

    setItem(
      "sequence",
      /** @type {Required<Program>} */ (newProgram),
      reduceProgram,
      sortProgram
    );
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

  /** @type {Command} */
  let newCommand;

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
  const newCommands = [
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
export function patchCommand(patch) {
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

  const newCommand = mergeDeep(currentCommand, patch);

  const oldCommands = currentProgram.commands;
  /** @type {Command[]} */
  const newCommands = [
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

export function loadProgram(id) {
  /** @type {Program | null} */
  const item = getItem("sequence", id);
  if (!item) {
    return;
  }

  setProgram(item);
  setProgrammerState(initialProgrammerState);
}

export function deleteProgram() {
  const currentProgram = program();
  if (currentProgram.id) {
    removeItem("sequence", /** @type{{id: string}} */ (currentProgram));
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
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
function mergeDeep(...objects) {
  const isObject = (obj) => obj && typeof obj === "object";

  return objects.reduce((prev, obj) => {
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
  }, {});
}

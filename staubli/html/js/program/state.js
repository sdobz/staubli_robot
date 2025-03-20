import { getItem, listItems, removeItem, setItem } from "../lib/storage.js";
import { createSignal } from "../lib/state.js";
import { positionType, robotState } from "../robot.js";

/**
 * @typedef {"translate-effector" | "rotate-effector" | "drag-joint"} JogMode
 */

/**
 * @typedef {"local" | "world"} JogSpace
 */

/**
 * @typedef {"joints" | "tool-position"} CommandType
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

/** @import { Position, JointPosition, EffectorPosition, RobotState } from '../robot.js' */

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
 * @typedef {Object} JogItem
 * @property {string} name
 * @property {Position} position
 * @property {number} [speed]
 * @property {RobotState} [_derivedState]
 */

/**
 * @typedef {Object} Program
 * @property {string} [name]
 * @property {string} [id]
 * @property {number} [speed]
 * @property {JogItem[]} items
 */

/** @type {Program} */
const initialProgram = {
  items: [],
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
  return !!program.name || program.items.length > 0;
}

export function defaultProgramName() {
  return (new Date()).toISOString()
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
  const currentCommand = currentProgram.items[currentIndex]
  if (!currentCommand) {
    currentIndex = 0
  }
  const deriveFromPosition = currentCommand?._derivedState?.position || robotState().position

  if (!deriveFromPosition) {
    console.error("Add command without position")
    return
  }

  /** @type {Position} */
  const position = currentProgrammerState.commandToAdd === "joints" ? { joints: deriveFromPosition.joints } : { effector: deriveFromPosition.effector }

  /** @type {JogItem} */
  const newItem = {
    name: (new Date()).toISOString(),
    position: position
  }

  const oldItems = currentProgram.items;
  /** @type {JogItem[]} */
  const newItems = [
    ...oldItems.slice(0, currentIndex+1),
    newItem,
    ...oldItems.slice(currentIndex+1),
  ];

  setProgram({
    ...currentProgram,
    items: newItems,
  });
  setProgrammerState({
    ...currentProgrammerState,
    selectedIndex: currentIndex + 1
  })
}

/**
 *
 * @param {Partial<JogItem>} patch
 */
export function patchCommand(patch) {
  const currentProgrammerState = programmerState();
  const currentProgram = program();

  const currentIndex = currentProgrammerState.selectedIndex;

  const currentCommand = currentProgram.items[currentIndex];
  if (!currentCommand) {
    console.error("No selected command while patching");
    return;
  }

  if (
    patch.position &&
    positionType(currentCommand.position) !== positionType(patch.position)
  ) {
    console.error("Attempt to update command with invalid position");
    return;
  }

  const newCommand = mergeDeep(currentCommand, patch);

  const oldItems = currentProgram.items;
  /** @type {JogItem[]} */
  const newItems = [
    ...oldItems.slice(0, currentIndex),
    newCommand,
    ...oldItems.slice(currentIndex + 1),
  ];

  setProgram({
    ...currentProgram,
    items: newItems,
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

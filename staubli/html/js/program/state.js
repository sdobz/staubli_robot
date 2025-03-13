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
 * @typedef {Object} JogState
 * @property {JogMode} mode - Currently selected translation mode
 * @property {JogSpace} space
 */

const [jogState, setJogState] = createSignal({
  mode: /** @type {JogMode} */ ("drag-joint"),
  space: /** @type {JogSpace} */ ("world"),
});
export { jogState, setJogState };

/** @import { Position, JointPosition, EffectorPosition } from '../robot.js' */

/** @typedef {"stopped" | "play" | "preview" | "jog" } PlaybackEnum */
/** @typedef {"none" | "sequence" | "item" } EditingEnum */

/**
 * @typedef {Object} ProgrammerState
 * @property {number} selectedIndex
 * @property {boolean} updateSelected
 * @property {PlaybackEnum} playback
 * @property {EditingEnum} editing
 * @property {boolean} loop
 * @property {boolean} busy
 */

/** @type {ProgrammerState} */
const initialProgrammerState = {
  selectedIndex: 0,
  updateSelected: false,
  editing: "none",
  playback: "stopped",
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
        name: newProgram.name || new Date().toISOString(),
        id: Math.random().toString(36).slice(2),
      };
    }

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

/**
 * @param {{joints?: Partial<JointPosition>, effector?: EffectorPosition}} partialPosition
 */
export function updatePosition(partialPosition) {
  const currentProgram = program();
  const currentProgrammerState = programmerState();
  const currentRobotState = robotState();
  const currentIndex = currentProgrammerState.selectedIndex;
  const currentItem = currentProgram.items[currentIndex];

  /** @type {Position} */
  let position;

  if (partialPosition.joints) {
    // Joints always "append" - preserve order
    let lastJoints = currentRobotState.position.joints;

    for (let i = currentIndex - 1; i >= 0; i -= 1) {
      const testJoints = currentProgram.items[i]?.position.joints;
      if (!testJoints) {
        continue;
      }

      lastJoints = testJoints;
      break;
    }

    if (!lastJoints) {
      throw new Error(
        "Unable to discover previous joints while inserting joint based position"
      );
    }

    position = {
      joints: {
        ...lastJoints,
        ...partialPosition.joints,
      },
    };
  } else if (partialPosition.effector) {
    position = { effector: partialPosition.effector };
  } else {
    throw new Error("Invalid position supplied to updatePosition");
  }

  const shouldUpdate =
    currentProgrammerState.updateSelected &&
    currentItem &&
    positionType(position) === positionType(currentItem.position);

  const oldItems = currentProgram.items;

  /** @type {JogItem[]} */
  const newItems = shouldUpdate
    ? [
        ...oldItems.slice(0, currentIndex),
        { ...currentItem, position },
        ...oldItems.slice(currentIndex),
      ]
    : [...oldItems, { name: new Date().toISOString(), position }];

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

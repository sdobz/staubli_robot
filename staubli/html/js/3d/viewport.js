import { Vector3, ArrowHelper } from "three";

import { html } from "../lib/component.js";
import { createEffect, createSignal, untrack } from "../lib/state.js";
import { loadRobot, loadTool, RobotControl, toolProperties } from "./robot.js";
import { program, programmerState, jogState } from "../program/state.js";
import { World } from "./world.js";
import { Kinematics } from "./kinematics.js";
import { robot } from "../robot.js";

/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import { Object3D, Mesh } from 'three' */

/** @import { JointPosition, EffectorPosition, Command, RobotState } from '../robot-types.d.ts' */

/**
 * @typedef {Object} DerivedState
 * @prop {Command} command
 * @prop {RobotState} state
 * @prop {RobotControl} robot
 */

/** @type {readonly [() => DerivedState[], (set: DerivedState[]) => void]} */
const [derivedState, setDerivedState] = createSignal([]);
export { derivedState };

const robot3DTemplate = html` <div id="robot-3d"></div> `;

/** @type {{previewRobot: RobotControl | null}} */
export const previewRobotRef = {
  previewRobot: null,
};

class Robot3D extends HTMLElement {
  constructor() {
    super();

    /** @type {ArrowHelper[]} */
    this.arrows = [];

    this.world = new World();
    /** @type {RobotControl[]} */
    this.robots = [];

    loadRobot().then((result) => {
      this.urdfRoot = result;

      this.world.fitCameraToSelection([this.urdfRoot]);
      this.updateRobots();
    });
    /** @type {Mesh | undefined} */
    this.toolRoot = undefined;

    const shadowRoot = this.attachShadow({ mode: "open" });
    document.querySelectorAll("link").forEach((linkElement) => {
      shadowRoot.appendChild(linkElement.cloneNode());
    });
    const templateContents = robot3DTemplate.content.cloneNode(true);
    this.container = /** @type {HTMLElement} */ (
      templateContents
    ).querySelector("#robot-3d");
    this.container.appendChild(this.world.renderer.domElement);

    shadowRoot.appendChild(templateContents);

    this.onResize();
    this.bindState();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  bindState() {
    createEffect(() => {
      // todo: what happens if this happens in the middle of a drag?
      this.updateRobots();
    });

    createEffect(() => {
      const props = toolProperties();

      while (this.robots.length > 0) {
        this.robots.pop().dispose();
      }

      loadTool(props).then((result) => {
        this.toolRoot = result;
        this.updateRobots();
      });
    });
  }

  updateRobots() {
    const currentRobotState = robot()?.state();
    const currentSequence = program();
    const currentProgrammerState = programmerState();
    const currentJogState = jogState();

    if (!currentRobotState?.position) {
      return;
    }

    if (!this.urdfRoot || !this.toolRoot) {
      return;
    }

    const previousRobots = this.robots;
    this.robots = [];
    const popRobot = () => {
      const nextRobot = previousRobots.shift() || this.#createRobot();

      this.robots.push(nextRobot);
      return nextRobot;
    };

    const kinematics = new Kinematics(this.urdfRoot);

    const currentPosition = currentRobotState.position;
    if (!currentPosition.effector || !currentPosition.joints) {
      console.error("Missing current position");
      return;
    }

    const currentRobot = popRobot();
    if (previewRobotRef.previewRobot !== currentRobot) {
      previewRobotRef.previewRobot = currentRobot;
    }
    currentRobot.update(
      kinematics,
      currentSequence.commands.length === 0 ? "current" : "current-ghost",
      undefined,
      undefined
    );
    kinematics.applyJointPosition(currentPosition.joints, currentRobot);
    kinematics.applyEffectorPosition(currentPosition.effector, currentRobot);

    let previousRobot = currentRobot;
    let previousState = currentRobotState;
    /** @type {DerivedState[]} */
    let nextDerivedState = [];
    currentSequence.commands.forEach((currentCommand, index) => {
      let nextState = previousState;
      const robot = popRobot();

      if (currentCommand.type === "joints") {
        kinematics.applyJointPosition(currentCommand.data, robot);
        kinematics.applyEffectorFromJointPosition(robot, nextState.tool_offset);

        nextState = {
          ...nextState,
          position: {
            joints: currentCommand.data,
            effector: kinematics.determineEffectorPosition(robot),
          },
        };
      } else if (currentCommand.type === "effector") {
        kinematics.applyEffectorPosition(currentCommand.data, robot);
        kinematics.applyJointsFromEffectorPosition(
          previousRobot,
          currentCommand.data,
          nextState.tool_offset,
          robot
        );

        nextState = {
          ...nextState,
          position: {
            effector: currentCommand.data,
            joints: kinematics.determineJointPosition(robot),
          },
        };
      } else if (currentCommand.type === "tool") {
        const nextToolOffset = currentCommand.data;
        kinematics.applyJointPosition(nextState.position.joints, robot);
        // Update effector position to keep robot joints stationary for the next state
        kinematics.applyEffectorFromJointPosition(robot, nextToolOffset);

        const nextEffectorPosition =
          kinematics.determineEffectorPosition(robot);

        nextState = {
          ...nextState,
          tool_offset: nextToolOffset,
          position: {
            effector: nextEffectorPosition,
            joints: nextState.position.joints,
          },
        };
      } else if (currentCommand.type === "speed") {
        kinematics.applyJointPosition(nextState.position.joints, robot);
        kinematics.applyEffectorPosition(nextState.position.effector, robot);

        nextState = {
          ...nextState,
          speed: currentCommand.data.speed,
        };
      }
      const isSelected = index === currentProgrammerState.selectedIndex;

      robot.update(
        kinematics,
        "ghost",
        nextState.tool_offset,
        previousRobot,
        isSelected ? currentCommand.type : undefined,
        isSelected ? currentJogState : undefined
      );

      nextDerivedState.push({
        command: currentCommand,
        robot: robot,
        state: nextState,
      });

      previousRobot = robot;
      previousState = nextState;
    });

    while (previousRobots.length > 0) {
      previousRobots.pop().dispose();
    }

    setDerivedState(nextDerivedState);
    this.world.render();
  }

  #createRobot() {
    const newRobot = new RobotControl(this.urdfRoot, this.toolRoot, this.world);
    newRobot.addToScene();
    return newRobot;
  }

  purgeArrows() {
    this.arrows.forEach((arrow) => {
      this.world.scene.remove(arrow);
      arrow.dispose();
    });
    this.arrows = [];
  }

  /**
   *
   * @param {Vector3} from
   * @param {Vector3} to
   */
  createArrow(from, to) {
    const direction = new Vector3(to.x, to.y, to.z);
    direction.sub(from);
    const length = direction.length();
    direction.normalize();

    const arrow = new ArrowHelper(direction, from, length, 0xffffff);
    this.arrows.push(arrow);
    this.world.scene.add(arrow);
  }

  onResize() {
    this.world.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.world.renderer.setPixelRatio(window.devicePixelRatio);
    this.world.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.world.camera.updateProjectionMatrix();
    this.world.render();
  }

  connectedCallback() {
    this.world.render();
  }

  disconnectedCallback() {
    this.attached = false;
    //this.dragControls.dispose();
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }
}

customElements.define("robot-3d", Robot3D);

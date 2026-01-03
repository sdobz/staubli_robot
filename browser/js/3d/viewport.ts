import { Vector3, ArrowHelper, Mesh } from "three";

import { html } from "../lib/component.ts";
import { createEffect, createSignal } from "../lib/state.ts";
import { loadRobot, loadTool, RobotControl, toolProperties } from "./robot.ts";
import { program, programmerState, jogState } from "../program/state.ts";
import { World } from "./world.js";
import { Kinematics } from "./kinematics.ts";
import { robot } from "../robot.ts";
import { Command, RobotState } from "../robot-types.ts";
import { URDFRobot } from "urdf-loader";

interface DerivedState {
  command: Command;
  state: RobotState;
  robot: RobotControl;
}

const [derivedState, setDerivedState] = createSignal<DerivedState[]>([]);
export { derivedState };

const robot3DTemplate = html` <div id="robot-3d"></div> `;

interface RefObject<T> {
  current: T;
}

export const previewRobotRef: RefObject<RobotControl | null> = {
  current: null,
};

class Robot3D extends HTMLElement {
  arrows: ArrowHelper[];
  world: World;
  robots: RobotControl[];
  urdfRoot: URDFRobot | undefined;
  toolRoot: Mesh | undefined;
  container: HTMLElement;
  attached: boolean;
  constructor() {
    super();

    this.arrows = [];

    this.world = new World();
    this.robots = [];

    loadRobot().then((result) => {
      this.urdfRoot = result;

      this.world.fitCameraToSelection([this.urdfRoot]);
      this.updateRobots();
    });

    this.toolRoot = undefined;

    const shadowRoot = this.attachShadow({ mode: "open" });
    document.querySelectorAll("link").forEach((linkElement) => {
      shadowRoot.appendChild(linkElement.cloneNode());
    });
    const templateContents = robot3DTemplate.content.cloneNode(true) as HTMLElement;
    this.container = templateContents.querySelector("#robot-3d");
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
    if (previewRobotRef.current !== currentRobot) {
      previewRobotRef.current = currentRobot;
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
    let nextDerivedState: DerivedState[]= [];
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

  createArrow(from: Vector3, to: Vector3) {
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

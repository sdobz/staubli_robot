import { Vector3, ArrowHelper } from "three";

import { html } from "../lib/component.js";
import { createEffect } from "../lib/state.js";
import { robotState } from "../robot.js";
import { loadRobot, loadTool, RobotControl } from "./robot.js";
import { program, programmerState, jogState } from "../program/state.js";
import { World } from "./world.js";
import { Kinematics } from "./kinematics.js";

/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import { Object3D } from 'three' */

/** @import { JointPosition, EffectorPosition } from '../robot.js' */

const robot3DTemplate = html` <div id="robot-3d"></div> `;

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

    loadTool().then((result) => {
      this.toolRoot = result;

      this.updateRobots();
    });

    const shadowRoot = this.attachShadow({ mode: "open" });
    document.querySelectorAll("link").forEach((linkElement) => {
      shadowRoot.appendChild(linkElement.cloneNode());
    });
    const templateContents = robot3DTemplate.content.cloneNode(true);
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
  }

  updateRobots() {
    const currentRobotState = robotState();
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
      console.error("Missing current poistion");
    }

    const currentRobot = popRobot();
    currentRobot.update(
      kinematics,
      currentSequence.items.length === 0 ? 'current' : 'current-ghost',
      undefined
    );
    kinematics.applyJointPosition(currentPosition.joints, currentRobot);
    kinematics.applyEffectorPosition(currentPosition.effector, currentRobot);

    let previousRobot = currentRobot
    currentSequence.items.forEach((currentItem, index) => {
      const position = currentItem.position;
      const robot = popRobot();
      robot.update(
        kinematics,
        'ghost',
        index === currentProgrammerState.selectedIndex
          ? currentJogState
          : undefined
      );

      // This order is important: kinematics derives one from the other
      if (position.joints) {
        kinematics.applyJointPosition(position.joints, robot);
      } else {
        kinematics.applyJointsFromEffectorPosition(previousRobot, position.effector, robot);
      }
      if (position.effector) {
        kinematics.applyEffectorPosition(position.effector, robot);
      } else {
        kinematics.applyEffectorFromJointPosition(robot);
      }
      previousRobot = robot

      // This does not trigger a re-signal, and I hate it.
      // The way to fix this is to move the entire "updateRobots" sequence into the "updateProgram" loop
      currentItem._derivedState = {
        ...currentRobotState,
        position: {
          effector: kinematics.determineEffectorPosition(robot),
          joints: kinematics.determineJointPosition(robot),
        },
      };
    });

    while (previousRobots.length > 0) {
      previousRobots.pop().dispose();
    }

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

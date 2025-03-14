import { LoadingManager, MathUtils, Mesh, Quaternion, Vector3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import URDFLoader from "urdf-loader/URDFLoader.js";
import { effectorMaterial, highlightMaterial } from "./world.js";
import { PointerURDFDragControls } from "urdf-loader/URDFDragControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

import { updatePosition } from "../program/state.js";
import { Kinematics } from "./kinematics.js";

/** @import { Object3D } from "three" */
/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import { EffectorPosition, JointPosition, Position, RobotState } from "../robot" */
/** @import { JogState } from "../program/state.js" */
/** @import { World } from "./world" */

export function loadRobot() {
  return new Promise((resolve, reject) => {
    let urdfRoot;
    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.packages = {
      staubli_rx90: "/urdf/staubli_rx90",
    };
    loader.load("/urdf/staubli_rx90/StaubliRX90.urdf", (result) => {
      /** @type {URDFRobot | undefined} */
      urdfRoot = result;
    });

    manager.onLoad = () => {
      if (!urdfRoot) {
        throw new Error("Manager load without robot");
      }

      resolve(urdfRoot);
    };
  });
}

export function loadTool() {
  return new Promise((resolve, reject) => {
    const stlLoader = new STLLoader();
    stlLoader.load(
      "effectors/flange.stl",
      (geometry) => {
        const mesh = new Mesh(geometry, effectorMaterial);
        mesh.scale.x = mmToM;
        mesh.scale.y = mmToM;
        mesh.scale.z = mmToM;

        resolve(mesh);
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export class RobotControl {
  /**
   *
   * @param {URDFRobot} urdfRoot
   * @param {Object3D} toolRoot
   * @param {World} world
   */
  constructor(urdfRoot, toolRoot, world) {
    this.urdfRoot = urdfRoot;
    this.robot = urdfRoot.clone(true);
    this.tool = toolRoot.clone(true);
    this.kinematics = new Kinematics(urdfRoot, this.robot, this.tool);
    this.world = world;

    this.world.scene.add(this.robot);
    this.world.scene.add(this.tool);
  }

  /**
   *
   * @param {RobotState} state
   * @param {JogState} [jogState]
   */
  update(state, jogState) {
    this.kinematics.setPosition(state.position);

    this.tool.setPosition(this.kinematics.effectorPosition);

    this.#updateControls(jogState);
  }

  /**
   * @param {JogState} [jogState]
   */
  #updateControls(jogState) {
    const dragControlsEnabled = jogState?.mode === "drag-joint";
    if (dragControlsEnabled) {
      this.#setupURDFControl();
    } else {
      this.#removeURDFControl();
    }

    const effectorControlEnabled =
      jogState?.mode === "rotate-effector" ||
      jogState?.mode === "translate-effector";

    if (effectorControlEnabled) {
      const controls = this.#setupToolControl();
      controls.setSpace(jogState.space);
      if (jogState.mode === "rotate-effector") {
        controls.setMode("rotate");
      }
      if (jogState.mode === "translate-effector") {
        controls.setMode("translate");
      }
    } else {
      this.#removeToolControl();
    }
  }

  #setupURDFControl() {
    if (this.dragControls) {
      return;
    }

    const isJoint = (j) => {
      return j.isURDFJoint && j.jointType !== "fixed";
    };

    // Highlight the link geometry under a joint
    const highlightLinkGeometry = (m, revert) => {
      const traverse = (c) => {
        // Set or revert the highlight color
        if (c.type === "Mesh") {
          if (revert) {
            c.material = c.__origMaterial;
            delete c.__origMaterial;
          } else {
            c.__origMaterial = c.material;
            c.material = highlightMaterial;
          }
        }

        // Look into the children and stop if the next child is
        // another joint
        if (c === m || !isJoint(c)) {
          for (let i = 0; i < c.children.length; i++) {
            const child = c.children[i];
            if (!child.isURDFCollider) {
              traverse(c.children[i]);
            }
          }
        }
      };

      traverse(m);
    };

    const dragControls = new PointerURDFDragControls(
      this.world.scene,
      this.world.camera,
      this.world.renderer.domElement
    );
    dragControls.onDragStart = (joint) => {
      this.world.orbit.enabled = false;
    };
    dragControls.onDragEnd = (joint) => {
      this.world.orbit.enabled = true;
      this.#updateJointCommand(joint.name, joint.angle); // implicit updateRobots
      this.world.render();
    };
    dragControls.updateJoint = (joint, angle) => {
      this.robot.joints?.[joint.name].setJointValue(angle);
    };
    dragControls.onHover = (joint) => {
      highlightLinkGeometry(joint, false);
      this.world.render();
    };
    dragControls.onUnhover = (joint) => {
      highlightLinkGeometry(joint, true);
      this.world.render();
    };

    this.dragControls = dragControls;
  }

  #removeURDFControl() {
    this.dragControls?.dispose();
    delete this.dragControls;
  }

  #updateJointCommand(name, angle) {
    const jointId = parseInt(name.split("_")[1]);
    const jointPositionKey = `j${jointId}`;

    const offsetAngleDeg = MathUtils.radToDeg(angle) + jointOffset[jointId];

    updatePosition({
      joints: { [jointPositionKey]: offsetAngleDeg },
    });
  }

  #setupToolControl() {
    if (this.transformControls) {
      return this.transformControls;
    }

    let ikRoot, solver, goal;

    this.transformControls = new TransformControls(
      this.world.camera,
      this.world.renderer.domElement
    );
    this.transformControls.addEventListener("change", () => {
      if (goal) {
        goal.setPosition(
          this.tool.position.x,
          this.tool.position.y,
          this.tool.position.z
        );
        goal.setQuaternion(
          this.tool.quaternion.x,
          this.tool.quaternion.y,
          this.tool.quaternion.z,
          this.tool.quaternion.w
        );
        this.#updateIK(ikRoot, solver);
      }
      this.world.render();
    });
    this.transformControls.addEventListener("dragging-changed", (event) => {
      const isDragging = event.value;
      this.world.orbit.enabled = !isDragging;

      this.dragging = isDragging;

      if (isDragging) {
        if (!ikRoot) {
          ikRoot = urdfRobotToIKRoot(this.urdfRoot);
          setIKFromUrdf(ikRoot, this.robot);
          ikRoot.setDoF(); // Lock the base
          const effectorLink = ikRoot.find(
            (potentialLink) => potentialLink.name === "tool0"
          );
          goal = new Goal();
          goal.makeClosure(effectorLink);
          solver = new Solver([ikRoot]);
        }
      }

      if (!isDragging) {
        if (!this.tool) {
          console.error("Drag end without effector");
          return;
        }

        if (ikRoot) {
          ikRoot = undefined;
        }
        if (solver) {
          solver = undefined;
        }
        if (goal) {
          goal = undefined;
        }

        this.#updateToolCommand();
      }
    });

    this.transformControls.attach(this.tool);

    const gizmo = this.transformControls.getHelper();
    this.world.scene.add(gizmo);
    return this.transformControls;
  }

  #removeToolControl() {
    if (!this.transformControls) {
      return;
    }

    const gizmo = this.transformControls.getHelper();
    this.world.scene.remove(gizmo);
    this.transformControls.dispose();
    delete this.transformControls;
  }

  #updateToolCommand() {
    updatePosition({
      effector: getObjectEffectorPosition(this.tool, this.toolOffset, mmToM),
    });
  }

  dispose() {
    this.#removeToolControl();
    this.#removeURDFControl();
    this.world.scene.remove(this.robot);
    this.world.scene.remove(this.tool);
    // this.robot.dispose();
    // this.tool.dispose();
  }
}

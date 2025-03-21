/**
 * Intent: this file does not know about commands, state, or staubli coordinates
 * It just knows about three coordinates
 */

import { LoadingManager, MathUtils, Mesh, Quaternion, Vector3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import URDFLoader from "urdf-loader/URDFLoader.js";
import {
  currentInactiveMaterial,
  effectorMaterial,
  errorMaterial,
  ghostMaterial,
  highlightMaterial,
  selectedMaterial,
} from "./world.js";
import { PointerURDFDragControls } from "urdf-loader/URDFDragControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

import { Kinematics } from "./kinematics.js";

/** @import { Object3D } from "three" */
/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import { EffectorPosition, JointPosition, Position, RobotState } from "../robot" */
/** @import { JogState } from "../program/state.js" */
/** @import { World } from "./world" */

/** @typedef {"current" | "current-ghost" | "ghost"} RobotModeEnum */

// let globalRobotIndex = 0

// /**
//  *
//  * @param {URDFRobot} r
//  */
// function nameRobot(r) {
//   console.log("Naming robot", globalRobotIndex)
//   r.name = `robot-${globalRobotIndex}`
//   let localRobotIndex = 0

//   r.traverse(c => {
//     c.name = `robot-${globalRobotIndex}-${localRobotIndex}`
//   })

//   globalRobotIndex += 1
// }

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
        const mmToM = 1 / 1000;
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
   * @param {Object3D} toolRoot
   * @param {World} world
   */
  constructor(urdfRoot, toolRoot, world) {
    this.urdfRoot = urdfRoot;
    /**@type {URDFRobot} */
    this.robot = urdfRoot.clone(true);
    /**@type {Object3D} */
    this.tool = toolRoot.clone(true);
    this.world = world;
  }

  addToScene() {
    this.world.scene.add(this.tool);
    this.world.scene.add(this.robot);
  }

  /**
   * @param {Kinematics} kinematics
   * @param {RobotModeEnum} mode
   * @param {JogState} [jogState]
   */
  update(kinematics, mode, jogState) {
    this.kinematics = kinematics;
    const dragControlsEnabled = jogState?.mode === "drag-joint";

    let material;
    if (mode === "ghost") {
      if (!!jogState) {
        material = selectedMaterial;
      } else {
        material = ghostMaterial;
      }
    } else if (mode === "current") {
      material = undefined; // urdf defined material
    } else if (mode === "current-ghost") {
      material = currentInactiveMaterial;
    } else {
      material = errorMaterial;
    }

    const layer =
      material && mode !== "current-ghost" && material.opacity === 1 ? 0 : 1;
    this.tool.traverse((c) => {
      c.layers.set(layer);
      if (c.type !== "Mesh") {
        return;
      }
      c.material = material || effectorMaterial;
    });

    this.robot.traverse((c) => {
      c.layers.set(layer);
      if (c.type !== "Mesh") {
        return;
      }
      if (!c.__unsetMaterial) {
        c.__unsetMaterial = c.material;
      }
      c.material = material || c.__unsetMaterial;
    });

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
    // Solves an issue rendering LineSegment2: raycaster needs to understand how to intersect with 2d objects
    dragControls.raycaster.camera = this.world.camera;

    dragControls.onDragStart = (joint) => {
      this.world.orbit.enabled = false;
    };
    dragControls.onDragEnd = (joint) => {
      this.world.orbit.enabled = true;
      this.world.render();
      setTimeout(() => {
        // updateRobots may re-order robots. This ensures that the "unhover" will not fire on the previous robot
        this.kinematics.updateCommand(this);
      });
    };
    dragControls.updateJoint = (joint, angle) => {
      this.robot.joints?.[joint.name].setJointValue(angle);
      this.world.render();
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
    if (!this.dragControls) {
      return;
    }
    this.dragControls?.dispose();
    delete this.dragControls;
  }

  #setupToolControl() {
    if (this.transformControls) {
      return this.transformControls;
    }

    this.transformControls = new TransformControls(
      this.world.camera,
      this.world.renderer.domElement
    );
    this.transformControls.addEventListener("change", () => {
      this.kinematics.applyJointsFromTool(this, this);
      this.world.render();
    });
    this.transformControls.addEventListener("dragging-changed", (event) => {
      const isDragging = event.value;
      this.world.orbit.enabled = !isDragging;

      this.dragging = isDragging;
      
      if (!isDragging) {
        this.kinematics.updateCommand(this);
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

  dispose() {
    this.#removeToolControl();
    this.#removeURDFControl();
    this.world.scene.remove(this.robot);
    this.world.scene.remove(this.tool);
    // this.robot.dispose();
    // this.tool.dispose();
  }
}

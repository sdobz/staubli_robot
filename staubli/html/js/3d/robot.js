import { LoadingManager, MathUtils, Mesh, Quaternion, Vector3 } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import URDFLoader from "urdf-loader/URDFLoader.js";
import { effectorMaterial, highlightMaterial } from "./world.js";
import { PointerURDFDragControls } from "urdf-loader/URDFDragControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

import { updatePosition } from "../program/state.js";

import {
  Goal,
  setIKFromUrdf,
  setUrdfFromIK,
  SOLVE_STATUS,
  Solver,
  urdfRobotToIKRoot,
} from "closed-chain-ik-js";

/** @import { Object3D } from "three" */
/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import { EffectorPosition, JointPosition, Position } from "../robot" */
/** @import { JogState } from "../program/state.js" */
/** @import { World } from "./world" */

const mmToM = 1 / 1000;
const jointOffset = [-1, 0, -90, 90, 0, 0, 0];

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
    this.toolOffset = urdfRoot.joints["base_link-base"].position;
    this.robot = urdfRoot.clone(true);
    this.tool = toolRoot.clone(true);
    this.world = world;

    this.world.scene.add(this.robot);
    this.world.scene.add(this.tool);
  }

  /**
   *
   * @param {Position} position
   * @param {RobotControl} ikPredecessor
   * @param {JogState} [jogState]
   */
  update(position, ikPredecessor, jogState) {
    let displayEffectorPosition = position.effector;

    if (position.joints) {
      this.#setJoints(position.joints);

      if (!displayEffectorPosition) {
        this.robot.traverse((obj) => {
          if (obj.name === "tool0") {
            displayEffectorPosition = getObjectEffectorWorldPosition(
              obj,
              this.toolOffset,
              mmToM
            );
          }
        });
      }
    } else if (position.effector) {
      const ikRoot = urdfRobotToIKRoot(this.urdfRoot);
      if (ikPredecessor) {
        setIKFromUrdf(ikRoot, ikPredecessor.robot);
      }
      ikRoot.setDoF(); // Lock the base
      const effectorLink = ikRoot.find(
        (potentialLink) => potentialLink.name === "tool0"
      );

      const goal = new Goal();
      goal.makeClosure(effectorLink);
      this.#updateGoal(goal, position.effector);
      const solver = new Solver([ikRoot]);

      this.#updateIK(ikRoot, solver);
    }

    if (displayEffectorPosition) {
      setObjectEffectorPosition(
        this.tool,
        displayEffectorPosition,
        this.toolOffset,
        mmToM
      );
    }
    this.#updateControls(jogState);
  }

  /**
   *
   * @param {JointPosition} jointPosition
   */
  #setJoints(jointPosition) {
    if (!this.robot.joints) {
      throw new Error("Robot no joints");
    }
    /** @type {Record<string, URDFJoint>} */
    const robotJoints = /** @type{any} */ (this.robot.joints);
    for (let i = 1; i <= 6; i++) {
      const joint = robotJoints[`joint_${i}`];
      const jointPositionAngle = jointPosition[`j${i}`];
      joint.setJointValue(
        MathUtils.degToRad(jointPositionAngle - jointOffset[i])
      );
    }

    this.robot.updateMatrixWorld(true);
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
      this.#appendJointSequence(joint.name, joint.angle); // implicit updateRobots
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

  #appendJointSequence(name, angle) {
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

        this.#appendEffectorSequence(this.tool);
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

  /**
   *
   * @param {Object3D} effector
   */
  #appendEffectorSequence(effector) {
    updatePosition({
      effector: getObjectEffectorPosition(effector, this.toolOffset, mmToM),
    });
  }

  /**
   *
   * @param {Goal} goal
   * @param {EffectorPosition} effectorPosition
   */
  #updateGoal(goal, effectorPosition) {
    const { x, y, z, yaw, pitch, roll } = effectorPosition;
    goal.setPosition(
      x * mmToM + this.toolOffset.x,
      y * mmToM + this.toolOffset.y,
      z * mmToM + this.toolOffset.z
    );
    const goalQuaternion = createZYZQuaternion(yaw, pitch, roll);
    goal.setQuaternion(
      goalQuaternion.x,
      goalQuaternion.y,
      goalQuaternion.z,
      goalQuaternion.w
    );
  }

  #updateIK(ikRoot, solver) {
    const settleIterations = 5;
    let totalTime = 0;
    let isConverged = false;
    for (let i = 0; i < settleIterations; i++) {
      // update drive goals from the new location
      ikRoot.updateMatrixWorld(true);

      // update store results
      const startTime = window.performance.now();
      const results = solver.solve();
      const delta = window.performance.now() - startTime;
      totalTime += delta;

      isConverged =
        results.filter((r) => r === SOLVE_STATUS.CONVERGED).length ===
        results.length;
      const isAllDiverged =
        results.filter((r) => r === SOLVE_STATUS.DIVERGED).length ===
        results.length;
      const isAllStalled =
        results.filter((r) => r === SOLVE_STATUS.STALLED).length ===
        results.length;

      if (isConverged || isAllDiverged || isAllStalled) {
        break;
      }
    }

    setUrdfFromIK(this.robot, ikRoot);
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

// https://chatgpt.com/c/67cd432e-cb74-800c-b5f7-4cb90809cbfa

/**
 *
 * @param {number} yawDeg
 * @param {number} pitchDeg
 * @param {number} rollDeg
 */
export function createZYZQuaternion(yawDeg, pitchDeg, rollDeg) {
  const qYaw = new Quaternion().setFromAxisAngle(
    new Vector3(0, 0, 1),
    MathUtils.degToRad(yawDeg)
  );
  const qPitch = new Quaternion().setFromAxisAngle(
    new Vector3(0, 1, 0),
    MathUtils.degToRad(pitchDeg)
  );
  const qRoll = new Quaternion().setFromAxisAngle(
    new Vector3(0, 0, 1),
    MathUtils.degToRad(rollDeg)
  );

  // Combine the rotations in the correct order: Yaw → Pitch → Roll
  const qFinal = new Quaternion();
  qFinal.multiplyQuaternions(qYaw, qPitch);
  qFinal.multiply(qRoll);

  return qFinal;
}

// https://amu.hal.science/hal-03848730/document
// 3.3 Example of a proper sequence: the sequence ZYZ
// fig (46)

/**
 *
 * @param {Quaternion} q
 * @returns
 */
export function quaternionToZYZ(q) {
  const qr = q.w,
    qz = q.z,
    qy = q.y,
    qx = q.x;

  const roll = Math.atan2(qz, qr) - Math.atan2(-qx, qy);
  const pitch = Math.acos(2 * (qr * qr + qz * qz) - 1);
  const yaw = Math.atan2(qz, qr) + Math.atan2(-qx, qy);

  return {
    yaw: MathUtils.radToDeg(yaw),
    pitch: MathUtils.radToDeg(pitch),
    roll: MathUtils.radToDeg(roll),
  };
}

/**
 * @param {Object3D} object
 * @param {Vector3} offset
 * @param {number} scale
 * @returns {EffectorPosition}
 */
export function getObjectEffectorPosition(object, offset, scale) {
  return {
    x: (object.position.x - offset.x) / scale,
    y: (object.position.y - offset.y) / scale,
    z: (object.position.z - offset.z) / scale,
    ...quaternionToZYZ(object.quaternion),
  };
}

/**
 * @param {Object3D} object
 * @param {Vector3} offset
 * @param {number} scale
 * @returns {EffectorPosition}
 */
export function getObjectEffectorWorldPosition(object, offset, scale) {
  const worldPosition = new Vector3();
  const worldQuaternion = new Quaternion();

  object.getWorldPosition(worldPosition);
  object.getWorldQuaternion(worldQuaternion);
  return {
    x: (worldPosition.x - offset.x) / scale,
    y: (worldPosition.y - offset.y) / scale,
    z: (worldPosition.z - offset.z) / scale,
    ...quaternionToZYZ(worldQuaternion),
  };
}

/**
 *
 * @param {Object3D} object
 * @param {EffectorPosition} effectorPosition
 * @param {Vector3} offset
 * @param {number} scale
 */
export function setObjectEffectorPosition(
  object,
  effectorPosition,
  offset,
  scale
) {
  const { x, y, z, yaw, pitch, roll } = effectorPosition;
  object.position.x = x * scale + offset.x;
  object.position.y = y * scale + offset.y;
  object.position.z = z * scale + offset.z;

  object.setRotationFromQuaternion(createZYZQuaternion(yaw, pitch, roll));
  object.updateMatrixWorld(true);
}

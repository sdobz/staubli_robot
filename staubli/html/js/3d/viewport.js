import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  PlaneGeometry,
  ShadowMaterial,
  DirectionalLight,
  PCFSoftShadowMap,
  SRGBColorSpace,
  Color,
  AmbientLight,
  LoadingManager,
  MathUtils,
  MeshPhongMaterial,
  Vector3,
  Box3,
  ArrowHelper,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

import URDFLoader from "urdf-loader/URDFLoader.js";
import { PointerURDFDragControls } from "urdf-loader/URDFDragControls.js";

import { html } from "../lib/component.js";
import { createEffect } from "../lib/state.js";
import { robotState } from "../robot.js";
import { jogSequence, setJogSequence } from "../jog-sequence.js";
import { jogState } from "../jog-control.js";
import {
  createZYZQuaternion,
  fitCameraToSelection,
  quaternionToZYZ,
} from "./util.js";

import {
  urdfRobotToIKRoot,
  Goal,
  IKRootsHelper,
  Solver,
  SOLVE_STATUS,
  setUrdfFromIK,
} from "closed-chain-ik-js";

/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */
/** @import { Object3D } from 'three' */

/** @import { JointPosition, EffectorPosition } from '../robot.js' */
/** @import {JogItem} from '../jog-sequence.js' */

const mmToM = 1 / 1000;
const jointOffset = [-1, 0, -90, 90, 0, 0, 0];

const robot3DTemplate = html` <div id="robot-3d"></div> `;

class Robot3D extends HTMLElement {
  constructor() {
    super();

    // The highlight material
    const ghostColor = "#FFFFFF";
    this.ghostMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: ghostColor,
      emissive: ghostColor,
      emissiveIntensity: 0.25,
      opacity: 0.2,
      transparent: true,
    });
    const ikColor = "#FF0000";
    this.ikMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: ikColor,
      emissive: ikColor,
      emissiveIntensity: 0.25,
      opacity: 0.2,
      transparent: true,
    });
    const followColor = "#FFFF00";
    this.followMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: followColor,
      emissive: followColor,
      emissiveIntensity: 0.25,
      opacity: 0.2,
      transparent: true,
    });
    const highlightColor = "#FFFFFF";
    this.highlightMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: highlightColor,
      emissive: highlightColor,
      emissiveIntensity: 0.25,
    });
    const effectorColor = "#00FF00";
    this.effectorMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: effectorColor,
      emissive: effectorColor,
      emissiveIntensity: 0.25,
      opacity: 1,
      transparent: true,
      depthTest: false,
    });

    this.dragging = false;
    /** @type {Object3D[]} */
    this.ghosts = [];
    /** @type {ArrowHelper[]} */
    this.arrows = [];

    /** @type {Mesh | undefined} */
    this.effector = undefined;
    this.effectorOffset = new Vector3(0, 0, 0);

    let scene, camera, renderer, orbit;
    scene = new Scene();
    scene.background = new Color(0x263238);

    camera = new PerspectiveCamera();
    // @ts-ignore
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    camera.layers.enable(1);
    camera.up.set(0, 0, 1);

    renderer = new WebGLRenderer({ antialias: true });
    renderer.outputEncoding = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const directionalLight = new DirectionalLight(0xffffff, 1.0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.setScalar(1024);
    directionalLight.position.set(5, 5, 30);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const ground = new Mesh(
      new PlaneGeometry(),
      new ShadowMaterial({ opacity: 0.25 })
    );
    ground.scale.setScalar(30);
    ground.receiveShadow = true;
    scene.add(ground);

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.minDistance = 0.5;
    orbit.target.y = 1;
    orbit.update();

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.orbit = orbit;

    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.packages = {
      staubli_tx90_support: "/urdf/staubli_tx90_support",
    };
    loader.load("/urdf/staubli_tx90_support/urdf/tx90-rx.urdf", (result) => {
      /** @type {URDFRobot | undefined} */
      this.robot = result;
    });

    manager.onLoad = () => {
      if (!this.robot) {
        console.error("Manager load without robot");
        return;
      }
      this.robot.traverse((c) => {
        c.castShadow = true;
      });

      this.effectorOffset = this.effectorOffset.copy(
        this.robot.joints["base_link-base"].position
      );

      fitCameraToSelection(camera, orbit, [this.robot]);

      scene.add(this.robot);
      this.updateRobots();
    };

    const stlLoader = new STLLoader();
    stlLoader.load(
      "effectors/flange.stl",
      (geometry) => {
        const mesh = new Mesh(geometry, this.effectorMaterial);
        mesh.scale.x = mmToM;
        mesh.scale.y = mmToM;
        mesh.scale.z = mmToM;
        this.effector = mesh;
        scene.add(mesh);
        this.updateRobots();
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    const shadowRoot = this.attachShadow({ mode: "open" });
    document.querySelectorAll("link").forEach((linkElement) => {
      shadowRoot.appendChild(linkElement.cloneNode());
    });
    const templateContents = robot3DTemplate.content.cloneNode(true);
    this.container = templateContents.querySelector("#robot-3d");
    this.container.appendChild(renderer.domElement);

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
      const currentJogState = jogState();

      const dragControlsEnabled = currentJogState.mode === "drag-joint";
      if (dragControlsEnabled) {
        this.setupURDFControl();
      } else {
        this.removeURDFControl();
      }

      const effectorControlEnabled =
        currentJogState.mode === "rotate-effector" ||
        currentJogState.mode === "translate-effector";

      if (effectorControlEnabled) {
        const controls = this.setupEffectorControls();
        controls.setSpace(currentJogState.space);
        if (currentJogState.mode === "rotate-effector") {
          controls.setMode("rotate");
        }
        if (currentJogState.mode === "translate-effector") {
          controls.setMode("translate");
        }
      } else {
        this.removeEffectorControls();
      }
    });
  }

  updateRobots() {
    const currentRobotState = robotState();
    const currentSequence = jogSequence();

    if (!currentRobotState?.position) {
      console.error("Unable to get current position");
      return;
    }

    if (!this.robot) {
      console.error("Robot not loaded");
      return;
    }

    // This was one of those bits of code that was way harder to write than it looks
    // The goal is that there is a trail of ghosts behind the "intended position", where the "current position" looks different
    // If there is no sequence then the "intended position" is the real robot
    this.purgeGhosts();
    this.purgeArrows();

    const currentPosition = currentRobotState.position;
    let sequenceToRender = [{ position: currentPosition }, ...currentSequence];

    if (this.dragging) {
      sequenceToRender.push(sequenceToRender[sequenceToRender.length - 1]);
    }

    let lastRobot;
    sequenceToRender.forEach(({ position, hide }, index) => {
      const isFirst = index === 0;
      const isLast = index === sequenceToRender.length - 1;

      const hasJoints = !!position.joints;

      const robotToUpdate = isLast
        ? this.robot
        : this.createGhostRobot(
            isFirst
              ? this.followMaterial
              : hasJoints
              ? this.ghostMaterial
              : this.ikMaterial
          );
      robotToUpdate.visible = !hide;

      if (!position.joints && lastRobot) {
        // console.log("Position without joints, embarking on IK...");

        const ikRoot = urdfRobotToIKRoot(lastRobot);
        ikRoot.setDoF();
        const effectorLink = ikRoot.find(potentialLink => potentialLink.name === "link_6")
        // const helper = new IKRootsHelper([ikRoot]);
        // this.scene.add(helper);
        // this.ghosts.push(helper);
        const goal = new Goal();
        goal.makeClosure( effectorLink );
        this.updateGoal(goal, position.effector);
        const solver = new Solver([ikRoot]);
        
        this.updateIK(ikRoot, solver, robotToUpdate);
        lastRobot = robotToUpdate;

        return;
      }

      lastRobot = robotToUpdate;

      this.updateRobot(robotToUpdate, position.joints);
    });

    sequenceToRender.forEach(({ position, hide }, index) => {
      if (!position.effector) {
        console.error("Position without effector");
        return;
      }
      const isFirst = index === 0;
      const isLast = index === sequenceToRender.length - 1;

      const effectorToUpdate = isLast
        ? this.effector
        : this.createGhostEffector(
            isFirst ? this.followMaterial : this.ghostMaterial
          );

      effectorToUpdate.visible = !hide;

      this.updateEffector(effectorToUpdate, position.effector);
    });

    this.render();
  }

  updateIK(ikRoot, solver, target) {
    const settleIterations = 5
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
      // console.log("converged", isConverged, "all diverged", isAllDiverged, "all stalled", isAllStalled)
    }
    // console.log("settled", totalTime)


    setUrdfFromIK(target, ikRoot);
  }

  /**
   *
   * @param {URDFRobot} robot
   * @param {JointPosition} jointPosition
   */
  updateRobot(robot, jointPosition) {
    if (!robot.joints) {
      console.error("Robot no joints");
    }
    /** @type {Record<string, URDFJoint>} */
    const robotJoints = /** @type{any} */ (robot.joints);
    for (let i = 1; i <= 6; i++) {
      const joint = robotJoints[`joint_${i}`];
      const jointPositionAngle = jointPosition[`j${i}`];
      joint.setJointValue(
        MathUtils.degToRad(jointPositionAngle - jointOffset[i])
      );
    }

    robot.updateMatrixWorld(true);
  }

  /**
   *
   * @param {Object3D} effector
   * @param {EffectorPosition} effectorPosition
   */
  updateEffector(effector, effectorPosition) {
    const { x, y, z, yaw, pitch, roll } = effectorPosition;
    effector.position.x = x * mmToM + this.effectorOffset.x;
    effector.position.y = y * mmToM + this.effectorOffset.y;
    effector.position.z = z * mmToM + this.effectorOffset.z;

    effector.setRotationFromQuaternion(createZYZQuaternion(yaw, pitch, roll));
    effector.updateMatrixWorld(true);
  }

  /**
   *
   * @param {Goal} goal
   * @param {EffectorPosition} effectorPosition
   */
  updateGoal(goal, effectorPosition) {
    const { x, y, z, yaw, pitch, roll } = effectorPosition;
    goal.setPosition(
      x * mmToM + this.effectorOffset.x,
      y * mmToM + this.effectorOffset.y,
      z * mmToM + this.effectorOffset.z
    );

    goal.setQuaternion(createZYZQuaternion(yaw, pitch, roll));
  }

  purgeArrows() {
    this.arrows.forEach((arrow) => {
      this.scene.remove(arrow);
      arrow.dispose();
    });
    this.arrows = [];
  }
  purgeGhosts() {
    this.ghosts.forEach((ghost) => {
      this.scene.remove(ghost);
    });
    this.ghosts = [];
  }

  /**
   *
   * @param {MeshPhongMaterial} material
   * @returns
   */
  createGhostRobot(material) {
    /** @type {URDFRobot} */
    const ghostRobot = this.robot.clone();
    ghostRobot.traverse((c) => {
      c.castShadow = false;
      c.material = material;
      c.layers.set(1);
    });
    this.scene.add(ghostRobot);
    this.ghosts.push(ghostRobot);
    return ghostRobot;
  }

  /**
   *
   * @param {MeshPhongMaterial} material
   * @returns
   */
  createGhostEffector(material) {
    /** @type {Object3D} */
    const ghostEffector = this.effector.clone();
    ghostEffector.traverse((c) => {
      c.castShadow = false;
      c.material = material;
      c.layers.set(1);
    });
    this.scene.add(ghostEffector);
    this.ghosts.push(ghostEffector);
    return ghostEffector;
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
    this.scene.add(arrow);
  }

  setupURDFControl() {
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
            c.material = this.highlightMaterial;
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
      this.scene,
      this.camera,
      this.renderer.domElement
    );
    dragControls.onDragStart = (joint) => {
      this.orbit.enabled = false;
      this.dragging = true;
      this.updateRobots();
      this.render();
    };
    dragControls.onDragEnd = (joint) => {
      this.orbit.enabled = true;
      this.dragging = false;
      this.appendJointSequence(joint.name, joint.angle); // implicit updateRobots
      this.render();
    };
    dragControls.updateJoint = (joint, angle) => {
      this.setJointValue(joint.name, angle);
    };
    dragControls.onHover = (joint) => {
      highlightLinkGeometry(joint, false);
      this.render();
    };
    dragControls.onUnhover = (joint) => {
      highlightLinkGeometry(joint, true);
      this.render();
    };

    this.dragControls = dragControls;
  }

  removeURDFControl() {
    this.dragControls?.dispose();
    delete this.dragControls;
  }

  appendJointSequence(name, angle) {
    const jointId = parseInt(name.split("_")[1]);
    const jointPositionKey = `j${jointId}`;

    const offsetAngleDeg = MathUtils.radToDeg(angle) + jointOffset[jointId];

    const sequence = jogSequence();
    const state = robotState();

    const lastJoints =
      sequence.findLast((item) => !!item.position.joints)?.position.joints ??
      state?.position.joints;

    if (!lastJoints) {
      console.error("Unable to get reference position");
      return;
    }

    /** @type {JogItem} */
    const nextItem = {
      name: new Date().toISOString(),
      position: {
        joints: /** @type {any} */ ({
          ...lastJoints,
          [jointPositionKey]: offsetAngleDeg,
        }),
      },
    };

    setJogSequence([...sequence, nextItem]);
  }

  setJointValue(name, angle) {
    if (!this.robot) {
      console.error("Set joint value without robot");
      return;
    }
    this.robot.joints?.[name].setJointValue(angle);
  }

  setupEffectorControls() {
    if (this.transformControls) {
      return this.transformControls;
    }

    this.transformControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.transformControls.addEventListener("change", () => this.render());
    this.transformControls.addEventListener("dragging-changed", (event) => {
      const isDragging = event.value;
      this.orbit.enabled = !isDragging;

      this.dragging = isDragging;

      if (isDragging) {
        this.updateRobots();
      }

      if (!isDragging) {
        if (!this.effector) {
          console.error("Drag end without effector");
          return;
        }
        this.appendEffectorSequence(this.effector);
      }
    });

    if (this.effector) {
      this.transformControls.attach(this.effector);
    }

    const gizmo = this.transformControls.getHelper();
    this.scene.add(gizmo);
    return this.transformControls;
  }

  removeEffectorControls() {
    if (!this.transformControls) {
      return;
    }

    const gizmo = this.transformControls.getHelper();
    this.scene.remove(gizmo);
    this.transformControls.dispose();
    delete this.transformControls;
  }

  /**
   *
   * @param {Object3D} effector
   */
  appendEffectorSequence(effector) {
    const currentSequence = jogSequence();
    setJogSequence([
      ...currentSequence,
      {
        name: new Date().toISOString(),
        position: {
          effector: {
            x: (effector.position.x - this.effectorOffset.x) / mmToM,
            y: (effector.position.y - this.effectorOffset.y) / mmToM,
            z: (effector.position.z - this.effectorOffset.z) / mmToM,
            ...quaternionToZYZ(effector.quaternion),
          },
        },
      },
    ]);
  }

  onResize() {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  attached = false;
  render() {
    if (this.attached) {
      requestAnimationFrame(this.render.bind(this));
    }
    this.renderer.render(this.scene, this.camera);
  }

  connectedCallback() {
    this.attached = true;
    this.render();
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

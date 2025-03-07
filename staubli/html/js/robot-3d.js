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
  ArrowHelper
} from "./vendor/three/three.js";
import { OrbitControls } from "./vendor/three/OrbitControls.js";
import URDFLoader from "./vendor/urdf/URDFLoader.js";
import { PointerURDFDragControls } from "./vendor/urdf/URDFDragControls.js";
import { html } from "./lib/component.js";
import { createEffect } from "./lib/state.js";
import { robotState } from "./robot.js";
import { jogSequence, sequenceState, setJogSequence } from "./jog-sequence.js";

/** @import { URDFJoint, URDFRobot } from "./vendor/urdf/URDFClasses.js"; */
/** @import { Position, JointPosition } from './robot.js' */

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
    const followColor = "#FFFF00";
    this.followMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: followColor,
      emissive: followColor,
      emissiveIntensity: 0.25,
      opacity: 0.2,
      transparent: true,
    });

    this.dragging = false;
    /** @type {URDFRobot[]} */
    this.ghosts = [];
    /** @type {ArrowHelper[]} */
    this.arrows = [];

    let scene, camera, renderer, orbit;
    scene = new Scene();
    scene.background = new Color(0x263238);

    camera = new PerspectiveCamera();
    // @ts-ignore
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    camera.layers.enable(1);

    renderer = new WebGLRenderer({ antialias: true });
    renderer.outputEncoding = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const directionalLight = new DirectionalLight(0xffffff, 1.0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.setScalar(1024);
    directionalLight.position.set(5, 30, 5);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const ground = new Mesh(
      new PlaneGeometry(),
      new ShadowMaterial({ opacity: 0.25 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.scale.setScalar(30);
    ground.receiveShadow = true;
    scene.add(ground);

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.minDistance = 0.5;
    orbit.target.y = 1;
    orbit.update();

    this.dragControls = this.setupURDFControl(scene, camera, orbit, renderer);

    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.packages = {
      staubli_tx90_support: "/urdf/staubli_tx90_support",
    };
    loader.load("/urdf/staubli_tx90_support/urdf/tx90.urdf", (result) => {
      /** @type {URDFRobot} */
      this.robot = result;
    });

    manager.onLoad = () => {
      const state = robotState();
      this.robot.rotation.x = -Math.PI / 2;
      this.robot.traverse((c) => {
        c.castShadow = true;
      });
      if (state?.position.joints) {
        this.updateRobot(this.robot, state.position.joints);
      }

      fitCameraToSelection(camera, orbit, [this.robot]);

      scene.add(this.robot);
    };

    const shadowRoot = this.attachShadow({ mode: "open" });
    document.querySelectorAll("link").forEach((linkElement) => {
      shadowRoot.appendChild(linkElement.cloneNode());
    });
    const templateContents = robot3DTemplate.content.cloneNode(true);
    this.container = templateContents.querySelector("#robot-3d");
    this.container.appendChild(renderer.domElement);

    shadowRoot.appendChild(templateContents);

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

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
    const currentSequenceState = sequenceState();
    const currentSequence = jogSequence();

    this.dragControls.enabled = !currentSequenceState.active;

    if (!currentRobotState?.position) {
      console.error("Unable to get current position");
      return;
    }

    // This was one of those bits of code that was way harder to write than it looks
    // The goal is that there is a trail of ghosts behind the "intended position", where the "current position" looks different
    // If there is no sequence then the "intended position" is the real robot
    this.purgeGhosts();
    this.purgeArrows()

    const currentPosition = currentRobotState.position;
    let sequenceToRender = [currentPosition, ...currentSequence];

    if (this.dragging) {
      sequenceToRender.push(sequenceToRender[sequenceToRender.length - 1])
    }

    /** @type {Array<readonly [URDFRobot, Position]>} */
    sequenceToRender.forEach((position, index) => {
      if (!position.joints) {
        console.error("Position without joints");
        return;
      }
      const isFirst = index === 0;
      const isLast = index === sequenceToRender.length - 1;

      const robotToUpdate = isLast
        ? this.robot
        : this.createGhostRobot(
            isFirst ? this.followMaterial : this.ghostMaterial
          );

      this.updateRobot(robotToUpdate, position.joints);
    });

    this.render();
  }

  /**
   *
   * @param {URDFRobot} robot
   * @param {JointPosition} jointPosition
   */
  updateRobot(robot, jointPosition) {
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

  purgeArrows() {
    this.arrows.forEach((arrow) => {
      this.scene.remove(arrow)
      arrow.dispose()
    })
    this.arrows = []
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
   * @param {Vector3} from 
   * @param {Vector3} to 
   */
  createArrow(from, to) {
    const direction = to.copy()
    direction.sub(from)
    const length = direction.length()
    direction.normalize()

    const arrow = new ArrowHelper(direction, from, length, 0xFFFFFF)
    this.arrows.push(arrow)
    this.scene.add(arrow)
  }

  setupURDFControl(scene, camera, orbit, renderer) {
    const highlightColor = "#FFFFFF";
    // The highlight material
    this.highlightMaterial = new MeshPhongMaterial({
      shininess: 10,
      color: highlightColor,
      emissive: highlightColor,
      emissiveIntensity: 0.25,
    });

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
      scene,
      camera,
      renderer.domElement
    );
    dragControls.onDragStart = (joint) => {
      orbit.enabled = false;
      this.dragging = true;
      this.updateRobots();
      this.render();
    };
    dragControls.onDragEnd = (joint) => {
      orbit.enabled = true;
      this.dragging = false;
      this.appendJogSequence(joint.name, joint.angle); // implicit updateRobots
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

    return dragControls;
  }

  appendJogSequence(name, angle) {
    const jointId = parseInt(name.split("_")[1]);
    const jointPositionKey = `j${jointId}`;

    const offsetAngleDeg = MathUtils.radToDeg(angle) + jointOffset[jointId];

    const sequence = jogSequence();
    const state = robotState();
    const lastPosition =
      sequence.length > 0
        ? sequence[sequence.length - 1].joints
        : state?.position.joints;

    if (!lastPosition) {
      console.error("Unable to get reference position");
      return;
    }

    /** @type {Position} */
    const nextPosition = {
      joints: /** @type {any} */ ({
        ...lastPosition,
        [jointPositionKey]: offsetAngleDeg,
      }),
    };

    setJogSequence([...sequence, nextPosition]);
  }

  setJointValue(name, angle) {
    this.robot.joints?.[name].setJointValue(angle);
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

const size = new Vector3();
const center = new Vector3();
const box = new Box3();

// https://codepen.io/discoverthreejs/full/vwVeZB
function fitCameraToSelection(camera, controls, selection, fitOffset = 1.2) {
  box.makeEmpty();
  for (const object of selection) {
    box.expandByObject(object);
  }

  box.getSize(size);
  box.getCenter(center);

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance);

  controls.maxDistance = distance * 10;
  controls.target.copy(center);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(controls.target).sub(direction);

  controls.update();
}

customElements.define("robot-3d", Robot3D);

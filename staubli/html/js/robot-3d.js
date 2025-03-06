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
} from "./vendor/three/three.js";
import { OrbitControls } from "./vendor/three/OrbitControls.js";
import URDFLoader from "./vendor/urdf/URDFLoader.js";
import { PointerURDFDragControls } from "./vendor/urdf/URDFDragControls.js";
import { html } from "./lib/component.js";
import { createEffect } from "./lib/state.js";
import { robotState } from "./robot.js";

const jointOffset = [-1, 0, -90, 90, 0, 0, 0];

const robot3DTemplate = html` <div id="robot-3d"></div> `;

class Robot3D extends HTMLElement {
  constructor() {
    super();

    let scene, camera, renderer, robot, orbit;
    scene = new Scene();
    scene.background = new Color(0x263238);

    camera = new PerspectiveCamera();
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

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
      this.dispatchEvent(
        new CustomEvent("manipulate-start", {
          bubbles: true,
          cancelable: true,
          detail: joint.name,
        })
      );
      orbit.enabled = false;
      this.render();
    };
    dragControls.onDragEnd = (joint) => {
      orbit.enabled = true;
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

    // Load robot
    const manager = new LoadingManager();
    const loader = new URDFLoader(manager);
    loader.packages = {
      staubli_tx90_support: "/urdf/staubli_tx90_support",
    };
    loader.load("/urdf/staubli_tx90_support/urdf/tx90.urdf", (result) => {
      this.robot = result;
    });

    manager.onLoad = () => {
      this.robot.rotation.x = -Math.PI / 2;
      this.robot.traverse((c) => {
        c.castShadow = true;
      });
      for (let i = 1; i <= 6; i++) {
        this.robot.joints[`joint_${i}`].setJointValue(MathUtils.degToRad(0));
      }
      this.robot.updateMatrixWorld(true);

      createEffect(() => {
        const state = robotState();
        if (!state) {
          return;
        }

        for (let i = 1; i <= 6; i++) {
          this.robot.joints[`joint_${i}`].setJointValue(
            MathUtils.degToRad(state.position.joints[`j${i}`] - jointOffset[i])
          );
        }

        this.robot.updateMatrixWorld(true);
      });

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
    window.addEventListener("resize", this.onResize.bind(this));
  }

  setJointValue(name, angle) {
    this.robot.joints[name].setJointValue(angle);
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

  attributeChangedCallback(name, oldValue, newValue) {
    const attrs = this.getAllAttributes();
    this.setAttrsSignal(attrs);
  }
}

customElements.define("robot-3d", Robot3D);

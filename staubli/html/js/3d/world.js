import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/** @import { EffectorPosition } from '../robot.js' */
/** @import { Object3D } from 'three' */

const size = new Vector3();
const center = new Vector3();
const box = new Box3();

export class World {
  constructor() {
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
    orbit.addEventListener("change", () => this.render());

    orbit.minDistance = 0.5;
    orbit.target.y = 1;

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.orbit = orbit;

    orbit.update();
  }

  // https://codepen.io/discoverthreejs/full/vwVeZB
  fitCameraToSelection(selection, fitOffset = 1.2) {
    const controls = this.orbit,
      camera = this.camera;
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

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

// The highlight material
const ghostColor = "#FFFFFF";
export const ghostMaterial = new MeshPhongMaterial({
  shininess: 10,
  color: ghostColor,
  emissive: ghostColor,
  emissiveIntensity: 0.25,
  opacity: 0.2,
  transparent: true,
});
const ikColor = "#FF0000";
export const ikMaterial = new MeshPhongMaterial({
  shininess: 10,
  color: ikColor,
  emissive: ikColor,
  emissiveIntensity: 0.25,
  opacity: 0.2,
  transparent: true,
});
const followColor = "#FFFF00";
export const followMaterial = new MeshPhongMaterial({
  shininess: 10,
  color: followColor,
  emissive: followColor,
  emissiveIntensity: 0.25,
  opacity: 0.2,
  transparent: true,
});
const highlightColor = "#FFFFFF";
export const highlightMaterial = new MeshPhongMaterial({
  shininess: 10,
  color: highlightColor,
  emissive: highlightColor,
  emissiveIntensity: 0.25,
});
const effectorColor = "#00FF00";
export const effectorMaterial = new MeshPhongMaterial({
  shininess: 10,
  color: effectorColor,
  emissive: effectorColor,
  emissiveIntensity: 0.25,
  opacity: 1,
  transparent: true,
  depthTest: false,
});

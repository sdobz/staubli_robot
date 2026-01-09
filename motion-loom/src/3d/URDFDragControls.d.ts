declare module "urdf-loader/src/URDFDragControls.js" {
  import { Camera, Raycaster, Scene } from "three";
  import { URDFJoint } from "urdf-loader";

  export class PointerURDFDragControls {
    constructor(scene: Scene, camera: Camera, domElement: HTMLElement);

    raycaster: Raycaster;

    onDragStart: (joint: URDFJoint) => void;
    onDragEnd: (joint: URDFJoint) => void;
    updateJoint: (joint: URDFJoint, angle: number) => void;
    onHover: (joint: URDFJoint) => void;
    onUnhover: (joint: URDFJoint) => void;

    dispose(): void;
  }
}

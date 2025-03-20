import { BufferGeometry, Euler, Material, Quaternion, Vector3 } from "three";

declare module "three" {
  interface Object3D {
    readonly position: Vector3;
    readonly rotation: Euler;
    readonly quaternion: Quaternion;
    readonly scale: Vector3;
  }

  interface Mesh {
    new (geometry?: BufferGeometry, material?: Material): Mesh;
  }

  interface WebGLRenderer {
    outputEncoding: string;
    shadowMap: any
  }
}

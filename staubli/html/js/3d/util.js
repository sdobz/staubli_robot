import { Box3, MathUtils, Quaternion, Vector3 } from "three";

/** @import { EffectorPosition } from '../robot.js' */
/** @import { Object3D } from 'three' */

// https://codepen.io/discoverthreejs/full/vwVeZB
export function fitCameraToSelection(camera, controls, selection, fitOffset = 1.2) {
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


// https://chatgpt.com/c/67cd432e-cb74-800c-b5f7-4cb90809cbfa

const size = new Vector3();
const center = new Vector3();
const box = new Box3();


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
export function getObjectEffectorPosition(object, offset, scale){
  return {
    x: (object.position.x - offset.x) / scale,
    y: (object.position.y - offset.y) / scale,
    z: (object.position.z - offset.z) / scale,
    ...quaternionToZYZ(object.quaternion),
  }
}

/**
 * @param {Object3D} object 
 * @param {Vector3} offset 
 * @param {number} scale 
 * @returns {EffectorPosition}
 */
export function getObjectEffectorWorldPosition(object, offset, scale){
  const worldPosition = new Vector3()
  const worldQuaternion = new Quaternion()

  object.getWorldPosition(worldPosition)
  object.getWorldQuaternion(worldQuaternion)
  return {
    x: (worldPosition.x - offset.x) / scale,
    y: (worldPosition.y - offset.y) / scale,
    z: (worldPosition.z - offset.z) / scale,
    ...quaternionToZYZ(worldQuaternion),
  }
}

  /**
   *
   * @param {Object3D} object
   * @param {EffectorPosition} effectorPosition
   * @param {Vector3} offset
   * @param {number} scale
   */
export function setObjectEffectorPosition(object, effectorPosition, offset, scale) {
  const { x, y, z, yaw, pitch, roll } = effectorPosition;
  object.position.x = x * scale + offset.x
  object.position.y = y * scale + offset.y;
  object.position.z = z * scale + offset.z;

  object.setRotationFromQuaternion(createZYZQuaternion(yaw, pitch, roll));
  object.updateMatrixWorld(true);
}

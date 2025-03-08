// src/core/Frame.js
import { mat4, quat, vec3 } from "gl-matrix";

// src/core/utils/quaternion.js
import { vec4 } from "gl-matrix";
var tempQuat = new Float64Array(16);
function smallestDifferenceQuaternion(output, a, b) {
  vec4.scale(tempQuat, b, -1);
  if (vec4.squaredDistance(a, tempQuat) < vec4.squaredDistance(a, b)) {
    vec4.subtract(output, a, tempQuat);
  } else {
    vec4.subtract(output, a, b);
  }
}
var tempQuat2 = new Float64Array(16);
function quaternionSquaredDistance(a, b) {
  smallestDifferenceQuaternion(tempQuat2, a, b);
  return vec4.squaredLength(tempQuat2);
}

// src/core/utils/constants.js
var PI = Math.PI;
var PI2 = 2 * PI;
var HALF_PI = PI / 2;
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 1 / DEG2RAD;

// src/core/Frame.js
var tempInverse = new Float32Array(16);
var tempMatrix = new Float32Array(16);
var tempQuat3 = new Float32Array(4);
var tempPos = new Float32Array(3);
var sharedTraversedChildren = /* @__PURE__ */ new Set();
var sharedTraverseArray = [];
var traverseVariablesInUse = false;
var Frame = class {
  constructor() {
    this.name = "";
    this.quaternion = new Float32Array([0, 0, 0, 1]);
    this.position = new Float32Array(3);
    this.matrix = new Float32Array(16);
    mat4.identity(this.matrix);
    this.matrixWorld = new Float32Array(16);
    mat4.identity(this.matrixWorld);
    this.matrixNeedsUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.parent = null;
    this.children = [];
  }
  setPosition(...args) {
    const position = this.position;
    if (vec3.sqrDist(position, args) > 1e-10) {
      position[0] = args[0];
      position[1] = args[1];
      position[2] = args[2];
      this.setMatrixNeedsUpdate();
    }
  }
  setEuler(x, y, z) {
    quat.fromEuler(tempQuat3, x * RAD2DEG, y * RAD2DEG, z * RAD2DEG);
    this.setQuaternion(...tempQuat3);
  }
  setQuaternion(...args) {
    const quaternion = this.quaternion;
    if (quaternionSquaredDistance(quaternion, args) > 1e-10) {
      quaternion[0] = args[0];
      quaternion[1] = args[1];
      quaternion[2] = args[2];
      quaternion[3] = args[3];
      this.setMatrixNeedsUpdate();
    }
  }
  setWorldPosition(x, y, z) {
    const parent = this.parent;
    tempPos[0] = x;
    tempPos[1] = y;
    tempPos[2] = z;
    if (parent) {
      parent.updateMatrixWorld();
      mat4.invert(tempInverse, parent.matrixWorld);
      vec3.transformMat4(tempPos, tempPos, tempInverse);
    }
    this.setPosition(...tempPos);
  }
  setWorldEuler(x, y, z) {
    quat.fromEuler(tempQuat3, x * RAD2DEG, y * RAD2DEG, z * RAD2DEG);
    this.setWorldQuaternion(...tempQuat3);
  }
  setWorldQuaternion(x, y, z, w) {
    const parent = this;
    tempQuat3[0] = x;
    tempQuat3[1] = y;
    tempQuat3[2] = z;
    tempQuat3[3] = w;
    if (parent) {
      parent.updateMatrixWorld();
      mat4.invert(tempInverse, parent.matrixWorld);
      mat4.fromQuat(tempMatrix, tempQuat3);
      mat4.multiply(tempMatrix, tempInverse, tempMatrix);
      mat4.getRotation(tempQuat3, tempMatrix);
    }
    this.setQuaternion(...tempQuat3);
  }
  getWorldPosition(arr) {
    this.updateMatrixWorld();
    mat4.getTranslation(arr, this.matrixWorld);
  }
  getWorldQuaternion(arr) {
    this.updateMatrixWorld();
    mat4.getRotation(arr, this.matrixWorld);
  }
  traverseParents(cb) {
    let traversedChildren;
    const originalVariablesInUse = traverseVariablesInUse;
    if (traverseVariablesInUse) {
      traversedChildren = /* @__PURE__ */ new Set();
    } else {
      traversedChildren = sharedTraversedChildren;
      traversedChildren.clear();
    }
    traverseVariablesInUse = true;
    let curr = this.parent;
    while (curr) {
      if (traversedChildren.has(curr)) {
        break;
      }
      const stop = cb(curr);
      if (stop) {
        return;
      }
      traversedChildren.add(curr);
      curr = curr.parent;
    }
    traverseVariablesInUse = originalVariablesInUse;
    traversedChildren.clear();
  }
  traverse(cb) {
    const originalVariablesInUse = traverseVariablesInUse;
    let traversedChildren;
    let stack;
    if (traverseVariablesInUse) {
      traversedChildren = /* @__PURE__ */ new Set();
      stack = [this];
    } else {
      traversedChildren = sharedTraversedChildren;
      traversedChildren.clear();
      stack = sharedTraverseArray;
      stack[0] = this;
    }
    traverseVariablesInUse = true;
    let i = 0;
    let tot = 1;
    while (i < tot) {
      const curr = stack[i];
      const stop = cb(curr);
      if (!stop) {
        const children = curr.children;
        for (let c = 0, l = children.length; c < l; c++) {
          const child = children[c];
          if (traversedChildren.has(child)) {
            continue;
          } else {
            traversedChildren.add(child);
            stack[tot] = child;
            tot++;
          }
        }
      }
      i++;
    }
    traverseVariablesInUse = originalVariablesInUse;
    traversedChildren.clear();
    stack.fill(null);
  }
  find(cb) {
    let result = null;
    this.traverse((c) => {
      if (result) {
        return true;
      } else if (cb(c)) {
        result = c;
        return true;
      }
    });
    return result;
  }
  addChild(child) {
    if (child.parent) {
      throw new Error("Frame: Added child must not already have a parent.");
    }
    if (child === this) {
      throw new Error("Frame: Frame cannot be added as a child to itself.");
    }
    this.traverseParents((p) => {
      if (p === child) {
        throw new Error("Frame: Added child is an ancestor of this Frame. Use Joint.makeClosure instead.");
      }
    });
    child.parent = this;
    this.children.push(child);
    child.setMatrixWorldNeedsUpdate();
  }
  removeChild(child) {
    if (child.parent !== this) {
      throw new Error("Frame: Child to be removed is not a child of this Frame.");
    }
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
    child.parent = null;
    child.setMatrixWorldNeedsUpdate();
  }
  attachChild(child) {
    this.updateMatrixWorld();
    child.updateMatrixWorld();
    this.addChild(child);
    mat4.invert(tempInverse, this.matrixWorld);
    mat4.multiply(child.matrix, tempInverse, child.matrixWorld);
    mat4.getTranslation(child.position, child.matrix);
    mat4.getRotation(child.quaternion, child.matrix);
  }
  detachChild(child) {
    this.updateMatrixWorld();
    child.updateMatrixWorld();
    this.removeChild(child);
    mat4.copy(child.matrix, child.matrixWorld);
    mat4.getTranslation(child.position, child.matrix);
    mat4.getRotation(child.quaternion, child.matrix);
  }
  computeMatrixWorld() {
    if (this.parent) {
      mat4.multiply(this.matrixWorld, this.parent.matrixWorld, this.matrix);
    } else {
      mat4.copy(this.matrixWorld, this.matrix);
    }
  }
  setMatrixNeedsUpdate() {
    if (this.matrixNeedsUpdate === false) {
      this.matrixNeedsUpdate = true;
      this.setMatrixWorldNeedsUpdate();
    }
  }
  setMatrixWorldNeedsUpdate() {
    this.traverse((c) => {
      if (c.matrixWorldNeedsUpdate) {
        return true;
      }
      c.matrixWorldNeedsUpdate = true;
      return false;
    });
  }
  updateMatrix() {
    if (this.matrixNeedsUpdate) {
      mat4.fromRotationTranslation(this.matrix, this.quaternion, this.position);
      this.matrixNeedsUpdate = false;
    }
  }
  updateMatrixWorld(updateChildren = false) {
    const { parent } = this;
    if (this.matrixWorldNeedsUpdate) {
      if (parent && parent.matrixWorldNeedsUpdate) {
        parent.updateMatrixWorld(false);
      }
      this.updateMatrix();
      this.computeMatrixWorld();
      this.matrixWorldNeedsUpdate = false;
    }
    if (updateChildren) {
      this.traverse((c) => {
        if (this !== c) {
          c.updateMatrixWorld(false);
        }
      });
    }
  }
};

// src/core/Link.js
var Link = class extends Frame {
  constructor() {
    super();
    this.isLink = true;
    this.closureJoints = [];
  }
  addChild(child) {
    if (!child.isJoint) {
      throw new Error("Link: Added child must be a Joint.");
    } else {
      super.addChild(child);
    }
  }
};

// src/core/Joint.js
import { mat4 as mat43, quat as quat2 } from "gl-matrix";

// src/core/utils/euler.js
import { vec3 as vec32 } from "gl-matrix";
function clampEulerValue(value) {
  let result = value % PI2;
  if (result > PI) {
    result -= PI2;
  } else if (result <= -PI) {
    result += PI2;
  }
  return result;
}
function toSmallestEulerValueDistance(target, toAdjust) {
  const wholeRotation = Math.round(target / PI2) * PI2;
  const clampedValue = clampEulerValue(toAdjust);
  let result = wholeRotation + clampedValue;
  const delta = result - target;
  if (Math.abs(delta) > PI) {
    result -= Math.sign(delta) * PI2;
  }
  return result;
}
function toSmallestEulerDistance(output, target, toAdjust) {
  output[0] = toSmallestEulerValueDistance(target[0], toAdjust[0]);
  output[1] = toSmallestEulerValueDistance(target[1], toAdjust[1]);
  output[2] = toSmallestEulerValueDistance(target[2], toAdjust[2]);
}
function diffEulerDistance(a, b) {
  let result = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  return result;
}
function getRedundantEulerRepresentation(output, input) {
  output[0] = input[0] + PI;
  output[1] = PI - input[1];
  output[2] = input[2] + PI;
}
function isRedundantTwist(euler) {
  const pivotAngle = clampEulerValue(euler[1]);
  if (Math.abs(Math.abs(pivotAngle) - HALF_PI) > 1e-7) {
    return false;
  }
  return true;
}
function toSmallestRedundantTwistRepresentation(output, target, toAdjust) {
  if (!isRedundantTwist(toAdjust)) {
    return false;
  }
  const pivotAngle = clampEulerValue(toAdjust[1]);
  const zRotationSign = -1 * Math.sign(pivotAngle);
  const combinedXRotation = toAdjust[0] + zRotationSign * toAdjust[2];
  output[0] = target[0];
  output[1] = toSmallestEulerValueDistance(target[1], toAdjust[1]);
  output[2] = toSmallestEulerValueDistance(target[2], zRotationSign * (combinedXRotation - target[0]));
  toSmallestEulerDistance(output, target, output);
  return true;
}
var tempEuler1 = new Float64Array(3);
var tempEuler2 = new Float64Array(3);
function getClosestEulerRepresentation(output, target, input) {
  let score = Infinity;
  if (isRedundantTwist(input)) {
    toSmallestRedundantTwistRepresentation(tempEuler1, target, input);
    getRedundantEulerRepresentation(tempEuler2, input);
    toSmallestRedundantTwistRepresentation(tempEuler2, target, tempEuler2);
    const d12 = diffEulerDistance(target, tempEuler1);
    const d22 = diffEulerDistance(target, tempEuler2);
    if (d12 < d22) {
      vec32.copy(output, tempEuler1);
      score = d12;
    } else {
      vec32.copy(output, tempEuler2);
      score = d22;
    }
  }
  toSmallestEulerDistance(tempEuler1, target, input);
  getRedundantEulerRepresentation(tempEuler2, input);
  toSmallestEulerDistance(tempEuler2, target, tempEuler2);
  const d1 = diffEulerDistance(target, tempEuler1);
  const d2 = diffEulerDistance(target, tempEuler2);
  if (d1 < score || d2 < score) {
    if (d1 < d2) {
      vec32.copy(output, tempEuler1);
    } else {
      vec32.copy(output, tempEuler2);
    }
  }
}

// src/core/utils/glmatrix.js
import { mat4 as mat42, vec3 as vec33 } from "gl-matrix";
var tempPos2 = new Float64Array(3);
var tempQuat4 = new Float64Array(4);
var tempPos22 = new Float64Array(3);
var tempQuat22 = new Float64Array(4);
function getEuler(out, quat4) {
  const [x, y, z, w] = quat4;
  const t0 = 2 * (w * x + y * z);
  const t1 = 1 - 2 * (x * x + y * y);
  const roll = Math.atan2(t0, t1);
  let t2 = 2 * (w * y - z * x);
  t2 = t2 > 1 ? 1 : t2;
  t2 = t2 < -1 ? -1 : t2;
  const pitch = Math.asin(t2);
  const t3 = 2 * (w * z + x * y);
  const t4 = 1 - 2 * (y * y + z * z);
  const yaw = Math.atan2(t3, t4);
  out[0] = roll * RAD2DEG;
  out[1] = pitch * RAD2DEG;
  out[2] = yaw * RAD2DEG;
  return out;
}
function getMatrixDifference(a, b, outPos, outQuat) {
  mat42.getTranslation(tempPos2, a);
  mat42.getRotation(tempQuat4, a);
  mat42.getTranslation(tempPos22, b);
  mat42.getRotation(tempQuat22, b);
  vec33.subtract(outPos, tempPos2, tempPos22);
  smallestDifferenceQuaternion(outQuat, tempQuat4, tempQuat22);
}

// src/core/Joint.js
var DOF = {
  X: 0,
  Y: 1,
  Z: 2,
  EX: 3,
  EY: 4,
  EZ: 5
};
var DOF_NAMES = Object.entries(DOF).sort((a, b) => a[1] - b[1]).map((e) => e[0]);
var tempInverse2 = new Float32Array(16);
var tempMatrix2 = new Float32Array(16);
var tempQuat5 = new Float32Array(4);
var tempEuler = new Float32Array(3);
var tempValueEuler = new Float32Array(3);
var quatEuler = new Float32Array(3);
var tempDoFValues = new Float32Array(6);
function dofToMatrix(out, dof) {
  quat2.fromEuler(tempQuat5, dof[DOF.EX] * RAD2DEG, dof[DOF.EY] * RAD2DEG, dof[DOF.EZ] * RAD2DEG);
  mat43.fromRotationTranslation(out, tempQuat5, dof);
}
var Joint = class extends Frame {
  constructor() {
    super();
    this.isJoint = true;
    this.child = null;
    this.isClosure = false;
    this.trackJointWrap = false;
    this.rotationDoFCount = 0;
    this.translationDoFCount = 0;
    this.dof = [];
    this.dofFlags = new Uint8Array(6);
    this.dofValues = new Float32Array(6);
    this.dofTarget = new Float32Array(6);
    this.dofRestPose = new Float32Array(6);
    this.minDoFLimit = new Float32Array(6).fill(-Infinity);
    this.maxDoFLimit = new Float32Array(6).fill(Infinity);
    this.targetSet = false;
    this.restPoseSet = false;
    this.matrixDoFNeedsUpdate = false;
    this.matrixDoF = new Float32Array(16);
    mat43.identity(this.matrixDoF);
    this.cachedIdentityDoFMatrixWorld = new Float32Array(16);
    mat43.identity(this.cachedIdentityDoFMatrixWorld);
  }
  // private helpers
  _getQuaternion(target, outQuat) {
    quat2.fromEuler(outQuat, target[DOF.EX], target[DOF.EY], target[DOF.EZ]);
  }
  _getEuler(target, outEuler) {
    outEuler[0] = target[DOF.EX];
    outEuler[1] = target[DOF.EY];
    outEuler[2] = target[DOF.EZ];
  }
  _getPosition(target, outPos) {
    outPos[0] = target[DOF.X];
    outPos[1] = target[DOF.Y];
    outPos[2] = target[DOF.Z];
  }
  _setValue(target, dof, value) {
    if (target === this.minDoFLimit || target == this.maxDoFLimit) {
      throw new Error("Joint: Cannot set minDoFLimit or maxDoFLimit with _setValue.");
    }
    if (dof < 0 || dof > 6 || typeof dof !== "number") {
      throw new Error("Joint: Invalid DoF.");
    }
    if (!this.dofFlags[dof]) {
      return false;
    }
    const minVal = this.minDoFLimit[dof];
    const maxVal = this.maxDoFLimit[dof];
    if (value < minVal) {
      value = minVal;
    }
    if (value > maxVal) {
      value = maxVal;
    }
    target[dof] = value;
    return value === maxVal || value === minVal;
  }
  _setValues(target, values) {
    const dof = this.dof;
    for (let i = 0, l = values.length; i < l; i++) {
      this._setValue(target, dof[i], values[i]);
    }
  }
  // TODO: these functions are unused
  _setViaFullPosition(target, values) {
    const dofFlags = this.dofFlags;
    for (let i = 0; i < 3; i++) {
      target[i] = dofFlags[i] * values[i];
    }
  }
  _setViaFullEuler(target, values) {
    const dofFlags = this.dofFlags;
    for (let i = 3; i < 6; i++) {
      target[i] = dofFlags[i] * values[i - 3];
    }
    this.tryMinimizeEulerAngles();
  }
  _setViaQuaternion(target, values) {
    getEuler(quatEuler, values);
    quatEuler[0] *= DEG2RAD;
    quatEuler[1] *= DEG2RAD;
    quatEuler[2] *= DEG2RAD;
    if (this.trackJointWrap) {
      const dofValues = this.dofValues;
      tempEuler[0] = dofValues[DOF.EX];
      tempEuler[1] = dofValues[DOF.EY];
      tempEuler[2] = dofValues[DOF.EZ];
      getClosestEulerRepresentation(quatEuler, tempEuler, quatEuler);
    }
    this._setViaFullEuler(target, quatEuler);
  }
  // Set the degrees of freedom
  clearDoF() {
    this.setDoF();
  }
  setDoF(...args) {
    args.forEach((dof, i) => {
      if (dof < 0 || dof >= 6) {
        throw new Error("Joint: Invalid degree of freedom enum " + dof + ".");
      }
      if (args.includes(dof, i + 1)) {
        throw new Error("Joint: Duplicate degree of freedom " + DOF_NAMES[dof] + "specified.");
      }
      if (i !== 0 && args[i - 1] > dof) {
        throw new Error("Joint: Joints degrees of freedom must be specified in position then rotation, XYZ order");
      }
    });
    this.dof = args;
    this.dofValues.fill(0);
    this.dofTarget.fill(0);
    this.dofRestPose.fill(0);
    this.minDoFLimit.fill(-Infinity);
    this.maxDoFLimit.fill(Infinity);
    this.setMatrixDoFNeedsUpdate();
    for (let i = 0; i < 6; i++) {
      this.dofFlags[i] = Number(args.includes(i));
    }
    this.rotationDoFCount = this.dofFlags[DOF.EX] + this.dofFlags[DOF.EY] + this.dofFlags[DOF.EZ];
    this.translationDoFCount = this.dofFlags[DOF.X] + this.dofFlags[DOF.Y] + this.dofFlags[DOF.Z];
  }
  // Get and set the values of the different degrees of freedom
  setDoFValues(...values) {
    this.setMatrixDoFNeedsUpdate();
    this._setValues(this.dofValues, values);
  }
  setDoFValue(dof, value) {
    this.setMatrixDoFNeedsUpdate();
    return this._setValue(this.dofValues, dof, value);
  }
  getDoFValue(dof) {
    return this.dofValues[dof];
  }
  getDoFQuaternion(outQuat) {
    this._getQuaternion(this.dofValues, outQuat);
  }
  getDoFEuler(outEuler) {
    this._getEuler(this.dofValues, outEuler);
  }
  getDoFPosition(outPos) {
    this._getPosition(this.dofValues, outPos);
  }
  // Get and set the restPose values of the different degrees of freedom
  setRestPoseValues(...values) {
    this._setValues(this.dofRestPose, values);
  }
  setRestPoseValue(dof, value) {
    return this._setValue(this.dofRestPose, dof, value);
  }
  getRestPoseValue(dof) {
    return this.dofRestPose[dof];
  }
  getRestPoseQuaternion(outQuat) {
    this._getQuaternion(this.dofRestPose, outQuat);
  }
  getRestPoseEuler(outEuler) {
    this._getEuler(this.dofRestPose, outEuler);
  }
  getRestPosePosition(outPos) {
    this._getPosition(this.dofRestPose, outPos);
  }
  // Get and set the restPose values of the different degrees of freedom
  setTargetValues(...values) {
    this._setValues(this.dofTarget, values);
  }
  setTargetValue(dof, value) {
    this._setValue(this.dofTarget, dof, value);
  }
  getTargetValue(dof) {
    return this.dofTarget[dof];
  }
  getTargetQuaternion(outQuat) {
    this._getQuaternion(this.dofTarget, outQuat);
  }
  getTargetEuler(outEuler) {
    this._getEuler(this.dofTarget, outEuler);
  }
  getTargetPosition(outPos) {
    this._getPosition(this.dofTarget, outPos);
  }
  // Joint Limits
  setMinLimits(...values) {
    const { dof } = this;
    for (const i in values) {
      const d = dof[i];
      this.setMinLimit(d, values[i]);
    }
  }
  setMinLimit(dof, value) {
    this.minDoFLimit[dof] = value;
    this.setDoFValue(dof, this.dofValues[dof]);
  }
  getMinLimit(dof) {
    return this.minDoFLimit[dof];
  }
  setMaxLimits(...values) {
    const { dof } = this;
    for (const i in values) {
      const d = dof[i];
      this.setMaxLimit(d, values[i]);
    }
  }
  setMaxLimit(dof, value) {
    this.maxDoFLimit[dof] = value;
    this.setDoFValue(dof, this.dofValues[dof]);
  }
  getMaxLimit(dof) {
    return this.maxDoFLimit[dof];
  }
  // Returns the error between this joint and the next link if this is a closure.
  // TODO: remove this and put it in solver
  getClosureError(outPos, outQuat) {
    if (!this.isClosure) {
      throw new Error("Joint: Cannot get closure error on non closure Joint.");
    }
    this.updateMatrixWorld();
    this.child.updateMatrixWorld();
    getMatrixDifference(this.matrixWorld, this.child.matrixWorld, outPos, outQuat);
  }
  // Update matrix overrides
  // TODO: it might be best if we skip this and try to characterize joint error with quats in
  // the error vector
  tryMinimizeEulerAngles() {
    const {
      trackJointWrap,
      rotationDoFCount,
      dofRestPose,
      dofTarget,
      dofValues
    } = this;
    if (!trackJointWrap) {
      if (rotationDoFCount < 3) {
        for (let i = DOF.EX; i <= DOF.EZ; i++) {
          dofTarget[i] = toSmallestEulerValueDistance(dofValues[i], dofTarget[i]);
          dofRestPose[i] = toSmallestEulerValueDistance(dofValues[i], dofRestPose[i]);
        }
      } else {
        tempValueEuler[0] = dofValues[DOF.EX];
        tempValueEuler[1] = dofValues[DOF.EY];
        tempValueEuler[2] = dofValues[DOF.EZ];
        tempEuler[0] = dofTarget[DOF.EX];
        tempEuler[1] = dofTarget[DOF.EY];
        tempEuler[2] = dofTarget[DOF.EZ];
        getClosestEulerRepresentation(tempEuler, tempValueEuler, tempEuler);
        dofTarget[DOF.EX] = tempEuler[0];
        dofTarget[DOF.EY] = tempEuler[1];
        dofTarget[DOF.EZ] = tempEuler[2];
        tempEuler[0] = dofRestPose[DOF.EX];
        tempEuler[1] = dofRestPose[DOF.EY];
        tempEuler[2] = dofRestPose[DOF.EZ];
        getClosestEulerRepresentation(tempEuler, tempValueEuler, tempEuler);
        dofRestPose[DOF.EX] = tempEuler[0];
        dofRestPose[DOF.EY] = tempEuler[1];
        dofRestPose[DOF.EZ] = tempEuler[2];
      }
    }
  }
  getDeltaWorldMatrix(dof, delta, outMatrix) {
    const {
      dofValues,
      minDoFLimit,
      maxDoFLimit,
      cachedIdentityDoFMatrixWorld
    } = this;
    this.updateMatrixWorld();
    tempDoFValues.set(dofValues);
    const min = minDoFLimit[dof];
    const max = maxDoFLimit[dof];
    const currVal = tempDoFValues[dof];
    const minSlack = currVal - min;
    const maxSlack = max - currVal;
    let newVal = currVal + delta;
    const isMaxConstrained = delta > 0 && newVal > max;
    const isMinConstrained = delta < 0 && newVal < min;
    const doInvert = isMaxConstrained && minSlack > maxSlack || isMinConstrained && maxSlack > minSlack;
    if (doInvert) {
      newVal = currVal - delta;
    }
    tempDoFValues[dof] = newVal;
    dofToMatrix(tempMatrix2, tempDoFValues);
    mat43.multiply(outMatrix, cachedIdentityDoFMatrixWorld, tempMatrix2);
    return doInvert;
  }
  // matrix updates
  setMatrixDoFNeedsUpdate() {
    if (this.matrixDoFNeedsUpdate === false) {
      this.matrixDoFNeedsUpdate = true;
      this.setMatrixWorldNeedsUpdate();
    }
  }
  updateDoFMatrix() {
    if (this.matrixDoFNeedsUpdate) {
      dofToMatrix(this.matrixDoF, this.dofValues);
      this.matrixDoFNeedsUpdate = false;
    }
  }
  computeMatrixWorld() {
    const {
      parent,
      matrixWorld,
      matrix,
      matrixDoF,
      cachedIdentityDoFMatrixWorld
    } = this;
    this.updateDoFMatrix();
    mat43.multiply(matrixWorld, matrix, matrixDoF);
    if (parent) {
      mat43.multiply(matrixWorld, parent.matrixWorld, matrixWorld);
      mat43.multiply(cachedIdentityDoFMatrixWorld, parent.matrixWorld, matrix);
    } else {
      mat43.copy(cachedIdentityDoFMatrixWorld, matrix);
    }
  }
  // Add child overrides
  makeClosure(child) {
    if (!child.isLink || this.child || child.parent === this) {
      throw new Error("Joint: Given child cannot be used to make closure.");
    } else {
      this.child = child;
      this.isClosure = true;
      child.closureJoints.push(this);
    }
  }
  addChild(child) {
    if (!child.isLink || this.child || child.parent === this) {
      throw new Error("Joint: Given child cannot be added to Joint.");
    } else {
      super.addChild(child);
      this.child = child;
      this.isClosure = false;
    }
  }
  removeChild(child) {
    if (this.isClosure) {
      if (this.child !== child) {
        throw new Error("Frame: Child to be removed is not a child of this Joint.");
      } else {
        this.child = null;
        this.isClosure = false;
        const index = child.closureJoints.indexOf(this);
        child.closureJoints.splice(index, 1);
      }
    } else {
      super.removeChild(child);
    }
  }
  attachChild(child) {
    super.attachChild(child);
    mat43.invert(tempInverse2, this.matrixDoF);
    mat43.multiply(child.matrix, tempInverse2, child.matrix);
    mat43.getTranslation(child.position, child.matrix);
    mat43.getRotation(child.quaternion, child.matrix);
  }
  detachChild(child) {
    super.detachChild(child);
    mat43.invert(tempInverse2, this.matrixDoF);
    mat43.multiply(child.matrix, tempInverse2, child.matrix);
    mat43.getTranslation(child.position, child.matrix);
    mat43.getRotation(child.quaternion, child.matrix);
  }
};

// src/core/Goal.js
var Goal = class extends Joint {
  constructor(...args) {
    super(...args);
    this.isGoal = true;
    this.setFreeDoF();
  }
  setDoF(...args) {
    let rotCount = Number(args.includes(DOF.EX)) + Number(args.includes(DOF.EY)) + Number(args.includes(DOF.EZ));
    if (rotCount !== 0 && rotCount !== 3) {
      throw new Error("Goal: Only full 3 DoF or 0 DoF rotation goals are supported.");
    }
    super.setDoF(...args);
  }
  setGoalDoF(...args) {
    this.setDoF(...args);
  }
  setFreeDoF(...args) {
    const freeDoF = [
      DOF.X,
      DOF.Y,
      DOF.Z,
      DOF.EX,
      DOF.EY,
      DOF.EZ
    ].filter((d) => !args.includes(d));
    this.setDoF(...freeDoF);
  }
  addChild() {
    throw new Error("Goal: Cannot add children to Goal.");
  }
};

// src/core/ChainSolver.js
import { vec3 as vec35, vec4 as vec43, mat4 as mat44 } from "gl-matrix";

// src/core/utils/solver.js
import { vec3 as vec34, vec4 as vec42 } from "gl-matrix";
var tempPos3 = new Float64Array(3);
var tempQuat6 = new Float64Array(4);
var tempEuler3 = new Float64Array(3);
function accumulateClosureError(solver, joint, startIndex, errorVector = null, result = { isConverged: false, rowCount: 7, totalError: 0 }) {
  const {
    translationConvergeThreshold,
    rotationConvergeThreshold,
    translationErrorClamp,
    rotationErrorClamp,
    translationFactor,
    rotationFactor
  } = solver;
  const {
    translationDoFCount,
    rotationDoFCount,
    dofFlags,
    dof
  } = joint;
  joint.getClosureError(tempPos3, tempQuat6);
  let rowCount = 7;
  if (joint.isGoal) {
    tempPos3[0] *= dofFlags[0];
    tempPos3[1] *= dofFlags[1];
    tempPos3[2] *= dofFlags[2];
    rowCount = translationDoFCount;
    if (rotationDoFCount === 0) {
      tempQuat6[0] = 0;
      tempQuat6[1] = 0;
      tempQuat6[2] = 0;
      tempQuat6[3] = 0;
    } else {
      rowCount += 4;
    }
  }
  let isConverged = false;
  let totalError = 0;
  const posMag = vec34.length(tempPos3);
  const rotMag = vec42.length(tempQuat6);
  if (posMag < translationConvergeThreshold && rotMag < rotationConvergeThreshold) {
    isConverged = true;
  }
  totalError += posMag + rotMag;
  if (errorVector) {
    if (posMag > translationErrorClamp) {
      vec34.scale(tempPos3, tempPos3, translationErrorClamp / posMag);
    }
    vec42.scale(tempPos3, tempPos3, translationFactor);
    if (rotMag > rotationErrorClamp) {
      vec42.scale(tempQuat6, tempQuat6, rotationErrorClamp / rotMag);
    }
    vec42.scale(tempQuat6, tempQuat6, rotationFactor);
    if (joint.isGoal) {
      for (let i = 0; i < translationDoFCount; i++) {
        const d = dof[i];
        errorVector[startIndex + i][0] = tempPos3[d];
      }
      if (joint.rotationDoFCount === 3) {
        errorVector[startIndex + translationDoFCount + 0][0] = tempQuat6[0];
        errorVector[startIndex + translationDoFCount + 1][0] = tempQuat6[1];
        errorVector[startIndex + translationDoFCount + 2][0] = tempQuat6[2];
        errorVector[startIndex + translationDoFCount + 3][0] = tempQuat6[3];
      }
    } else {
      errorVector[startIndex + 0][0] = tempPos3[0];
      errorVector[startIndex + 1][0] = tempPos3[1];
      errorVector[startIndex + 2][0] = tempPos3[2];
      errorVector[startIndex + 3][0] = tempQuat6[0];
      errorVector[startIndex + 4][0] = tempQuat6[1];
      errorVector[startIndex + 5][0] = tempQuat6[2];
      errorVector[startIndex + 6][0] = tempQuat6[3];
    }
  }
  result.totalError = totalError;
  result.isConverged = isConverged;
  result.rowCount = rowCount;
  return result;
}
function accumulateTargetError(solver, joint, startIndex, errorVector = null, result = { isConverged: false, rowCount: 7, totalError: 0 }) {
  const {
    translationConvergeThreshold,
    rotationConvergeThreshold,
    lockedJointDoFCount,
    translationErrorClamp,
    rotationErrorClamp,
    lockedJointDoF
  } = solver;
  const {
    dofTarget,
    dofValues,
    translationDoFCount,
    rotationDoFCount,
    translationFactor,
    rotationFactor,
    dofList
  } = joint;
  const posDelta = vec34.distance(dofValues, dofTarget);
  let rotDelta = dofTarget[DOF.EX] - dofValues[DOF.EX] + dofTarget[DOF.EY] - dofValues[DOF.EY] + dofTarget[DOF.EZ] - dofValues[DOF.EZ];
  const lockedDoFCount = lockedJointDoFCount.get(joint) || 0;
  result.rowCount = translationDoFCount + rotationDoFCount - lockedDoFCount;
  result.isConverged = posDelta < translationConvergeThreshold && rotDelta < rotationConvergeThreshold;
  result.totalError = posDelta + rotDelta;
  if (errorVector) {
    const lockedDoF = lockedJointDoF.get(joint);
    const isLocked = lockedDoFCount !== 0;
    let rowIndex = 0;
    tempPos3[0] = dofTarget[0] - dofValues[0];
    tempPos3[1] = dofTarget[1] - dofValues[1];
    tempPos3[2] = dofTarget[2] - dofValues[2];
    const posMag = vec34.length(tempPos3);
    vec34.scale(tempPos3, tempPos3, translationFactor * translationErrorClamp / posMag);
    for (let i = 0, l = translationDoFCount; i < l; i++) {
      const dof = dofList[i];
      if (isLocked && lockedDoF[dof]) {
        continue;
      }
      errorVector[startIndex + rowIndex][0] = tempPos3[dof];
      rowIndex++;
    }
    tempEuler3[0] = joint.dofTarget[3] - joint.dofValues[3];
    tempEuler3[1] = joint.dofTarget[4] - joint.dofValues[4];
    tempEuler3[2] = joint.dofTarget[5] - joint.dofValues[5];
    const eulerMag = vec34.length(tempEuler3);
    vec34.scale(tempEuler3, tempEuler3, rotationFactor * rotationErrorClamp / eulerMag);
    for (let i = translationDoFCount, l = translationDoFCount + rotationDoFCount; i < l; i++) {
      const dof = dofList[i];
      if (isLocked && lockedDoF[dof]) {
        continue;
      }
      errorVector[startIndex + rowIndex][0] = tempEuler3[dof];
      rowIndex++;
    }
  }
}

// src/core/utils/matrix.js
import linearSolve from "linear-solve";
import { SVD } from "svd-js";
function transpose(outMatrix, a) {
  const tr = a.length;
  const tc = a[0].length;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      outMatrix[c][r] = a[r][c];
    }
  }
}
function identity(outMatrix) {
  for (let r = 0, tr = outMatrix.length; r < tr; r++) {
    for (let c = 0, tc = outMatrix.length; c < tc; c++) {
      outMatrix[r][c] = r === c ? 1 : 0;
    }
  }
}
function scale(outMatrix, matrix, scalar) {
  for (let r = 0, tr = outMatrix.length; r < tr; r++) {
    for (let c = 0, tc = outMatrix.length; c < tc; c++) {
      outMatrix[r][c] = matrix[r][c] * scalar;
    }
  }
}
function multiply(outMatrix, a, b) {
  if (a === outMatrix || b === outMatrix) {
    throw new Error("Matrix: Cannot multiply to a matrix in place.");
  }
  const m = a.length;
  const n = b.length;
  const k = b[0].length;
  for (let r = 0, tr = m; r < tr; r++) {
    for (let c = 0, tc = k; c < tc; c++) {
      let sum = 0;
      for (let i = 0, ti = n; i < ti; i++) {
        sum += a[r][i] * b[i][c];
      }
      outMatrix[r][c] = sum;
    }
  }
}
function create(row, col) {
  const result = new Array(row);
  for (let i = 0; i < row; i++) {
    result[i] = new Float64Array(col);
  }
  return result;
}
function copy(outMatrix, sourceMatrix) {
  const tr = sourceMatrix.length;
  const tc = sourceMatrix[0].length;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      outMatrix[r][c] = sourceMatrix[r][c];
    }
  }
}
function clone(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const resultMatrix = create(rows, cols);
  copy(resultMatrix, matrix);
  return resultMatrix;
}
function solve(outMatrix, matrix, vector) {
  const res = linearSolve.solve(matrix, vector);
  for (let i = 0, l = res.length; i < l; i++) {
    outMatrix[i].set(res[i]);
  }
}
function svd(ru, rq, rv, matrix) {
  const { u, v, q } = SVD(matrix);
  const urows = u.length;
  for (let r = 0; r < urows; r++) {
    ru[r].set(u[r]);
  }
  const vrows = v.length;
  for (let r = 0; r < vrows; r++) {
    rv[r].set(v[r]);
  }
  const qrows = q.length;
  for (let r = 0; r < qrows; r++) {
    const rqrow = rq[r];
    const qval = q[r];
    rqrow.fill(0);
    rqrow[r] = qval;
  }
}
function invert(outMatrix, matrix) {
  const res = linearSolve.invert(matrix);
  const tr = matrix[0].length;
  const tc = matrix.length;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      outMatrix[r][c] = res[r][c];
    }
  }
}
function add(outMatrix, a, b) {
  const tr = a.length;
  const tc = a[0].length;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      outMatrix[r][c] = a[r][c] + b[r][c];
    }
  }
}
function subtract(outMatrix, a, b) {
  const tr = a.length;
  const tc = a[0].length;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      outMatrix[r][c] = a[r][c] - b[r][c];
    }
  }
}
function magnitudeSquared(matrix) {
  let sum = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      sum += matrix[r][c] ** 2;
    }
  }
  return sum;
}
function magnitude(matrix) {
  return Math.sqrt(magnitudeSquared(matrix));
}
function toString(matrix, dec = 3) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let str = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      str += matrix[r][c].toFixed(dec) + ", ";
    }
    str += "\n";
  }
  return str;
}
function log(matrix, dec) {
  console.log(toString(matrix, dec));
}
var mat = {
  transpose,
  identity,
  scale,
  multiply,
  create,
  copy,
  clone,
  solve,
  svd,
  invert,
  add,
  subtract,
  magnitudeSquared,
  magnitude,
  toString,
  log
};

// src/core/ChainSolver.js
var targetRelativeToJointMatrix = new Float64Array(16);
var targetDeltaWorldMatrix = new Float64Array(16);
var tempDeltaWorldMatrix = new Float64Array(16);
var tempInverseMatrixWorld = new Float64Array(16);
var tempQuat7 = new Float64Array(4);
var tempPos4 = new Float64Array(3);
var tempQuat23 = new Float64Array(4);
var tempPos23 = new Float64Array(3);
var targetJoints = [];
var freeJoints = [];
var errorResultInfo = {
  rowCount: 0,
  isConverged: false,
  totalError: 0
};
var dofResultInfo = {
  errorRows: 0,
  freeDoF: 0,
  totalError: 0
};
var SOLVE_STATUS = {
  CONVERGED: 0,
  STALLED: 1,
  DIVERGED: 2,
  TIMEOUT: 3
};
var SOLVE_STATUS_NAMES = Object.entries(SOLVE_STATUS).sort((a, b) => a[1] - b[1]).map((el) => el[0]);
var ChainSolver = class {
  constructor(chain) {
    this.chain = Array.from(chain);
    this.targets = null;
    this.affectedClosures = null;
    this.affectedConnectedClosures = null;
    this.lockedJointDoFCount = null;
    this.lockedJointDoF = null;
    this.prevDoFValues = null;
    this.maxIterations = -1;
    this.matrixPool = null;
    this.useSVD = false;
    this.translationConvergeThreshold = -1;
    this.rotationConvergeThreshold = -1;
    this.translationFactor = -1;
    this.rotationFactor = -1;
    this.translationStep = -1;
    this.rotationStep = -1;
    this.translationErrorClamp = -1;
    this.rotationErrorClamp = -1;
    this.stallThreshold = -1;
    this.dampingFactor = -1;
    this.divergeThreshold = -1;
    this.restPoseFactor = -1;
    this.init();
  }
  init() {
    const chain = this.chain;
    const targets = chain.filter((j) => j.targetSet || j.isClosure);
    const lockedJointDoF = /* @__PURE__ */ new Map();
    const lockedJointDoFCount = /* @__PURE__ */ new Map();
    const prevDoFValues = /* @__PURE__ */ new Map();
    const affectedClosures = /* @__PURE__ */ new Map();
    const affectedConnectedClosures = /* @__PURE__ */ new Map();
    chain.forEach((j) => {
      affectedClosures.set(j, /* @__PURE__ */ new Set());
      affectedConnectedClosures.set(j, /* @__PURE__ */ new Set());
      lockedJointDoF.set(j, new Uint8Array(6));
      prevDoFValues.set(j, new Float64Array(6));
    });
    targets.forEach((target) => {
      if (target.isClosure) {
        let currJoint = target;
        while (currJoint) {
          if (currJoint.isJoint) {
            affectedClosures.get(currJoint).add(target);
          }
          currJoint = currJoint.parent;
        }
        currJoint = target.child;
        while (currJoint) {
          if (currJoint.isJoint) {
            affectedConnectedClosures.get(currJoint).add(target);
          }
          currJoint = currJoint.parent;
        }
      }
    });
    this.targets = targets;
    this.affectedClosures = affectedClosures;
    this.affectedConnectedClosures = affectedConnectedClosures;
    this.lockedJointDoF = lockedJointDoF;
    this.lockedJointDoFCount = lockedJointDoFCount;
    this.prevDoFValues = prevDoFValues;
  }
  solve() {
    const {
      divergeThreshold,
      stallThreshold,
      chain,
      restPoseFactor,
      lockedJointDoFCount,
      prevDoFValues,
      useSVD,
      matrixPool
    } = this;
    let iterations = 0;
    let prevErrorMagnitude = Infinity;
    let status = -1;
    lockedJointDoFCount.clear();
    for (let i = 0, l = chain.length; i < l; i++) {
      const joint = chain[i];
      if (joint.targetSet || joint.restPoseSet) {
        joint.tryMinimizeEulerAngles();
      }
    }
    do {
      matrixPool.releaseAll();
      for (let i = 0, l = chain.length; i < l; i++) {
        const joint = chain[i];
        joint.updateMatrixWorld();
      }
      targetJoints.length = 0;
      freeJoints.length = 0;
      this.countUnconvergedVariables(freeJoints, targetJoints, dofResultInfo);
      const { freeDoF, errorRows, totalError } = dofResultInfo;
      if (errorRows === 0) {
        status = SOLVE_STATUS.CONVERGED;
        break;
      }
      if (totalError > prevErrorMagnitude + divergeThreshold) {
        prevDoFValues.forEach((dofValues, joint) => {
          joint.dofValues.set(dofValues);
          joint.setMatrixDoFNeedsUpdate();
        });
        status = SOLVE_STATUS.DIVERGED;
        break;
      }
      prevErrorMagnitude = totalError;
      iterations++;
      if (iterations > this.maxIterations) {
        status = SOLVE_STATUS.TIMEOUT;
        break;
      }
      const errorVector = matrixPool.get(errorRows, 1);
      this.fillErrorVector(targetJoints, errorVector);
      const jacobian = matrixPool.get(errorRows, freeDoF);
      this.fillJacobian(targetJoints, freeJoints, jacobian);
      const pseudoInverse = matrixPool.get(freeDoF, errorRows);
      let failedSVD = false;
      if (useSVD) {
        try {
          const m = errorRows;
          const n = freeDoF;
          const k = Math.min(m, n);
          const u = matrixPool.get(m, k);
          const q = matrixPool.get(k, k);
          const v = matrixPool.get(n, k);
          mat.svd(u, q, v, jacobian);
          const uTranspose = matrixPool.get(k, m);
          const qInverse = matrixPool.get(k, k);
          mat.transpose(uTranspose, u);
          for (let i = 0, l = q.length; i < l; i++) {
            const val = q[i][i];
            let inv;
            if (Math.abs(val) < 1e-3) {
              inv = 0;
            } else {
              inv = 1 / val;
            }
            qInverse[i][i] = inv;
          }
          const vqinv = matrixPool.get(n, k);
          mat.multiply(vqinv, v, qInverse);
          mat.multiply(pseudoInverse, vqinv, uTranspose);
        } catch (err) {
          failedSVD = true;
        }
      }
      if (!useSVD || failedSVD) {
        const jacobianIdentityDamping = matrixPool.get(errorRows, errorRows);
        mat.identity(jacobianIdentityDamping);
        mat.scale(jacobianIdentityDamping, jacobianIdentityDamping, this.dampingFactor ** 2);
        const jacobianTranspose = matrixPool.get(freeDoF, errorRows);
        mat.transpose(jacobianTranspose, jacobian);
        const jjt = matrixPool.get(errorRows, errorRows);
        mat.multiply(jjt, jacobian, jacobianTranspose);
        const jjti = matrixPool.get(errorRows, errorRows);
        mat.add(jjti, jjt, jacobianIdentityDamping);
        const jjtii = matrixPool.get(errorRows, errorRows);
        mat.invert(jjtii, jjti);
        mat.multiply(pseudoInverse, jacobianTranspose, jjtii);
      }
      const deltaTheta = matrixPool.get(freeDoF, 1);
      mat.multiply(deltaTheta, pseudoInverse, errorVector);
      if (restPoseFactor !== 0) {
        const restPose = matrixPool.get(freeDoF, 1);
        const restPoseResult = matrixPool.get(freeDoF, 1);
        let colIndex = 0;
        for (let i = 0, l = freeJoints.length; i < l; i++) {
          const joint = freeJoints[i];
          const lockedDoFCount = this.lockedJointDoFCount.get(joint) || 0;
          const isLocked = lockedDoFCount !== 0;
          const lockedDoF = this.lockedJointDoF.get(joint);
          const colCount = joint.rotationDoFCount + joint.translationDoFCount - lockedDoFCount;
          if (joint.restPoseSet) {
            const dofList = joint.dof;
            const dofValues = joint.dofValues;
            const dofRestPose = joint.dofRestPose;
            for (let d = 0; d < colCount; d++) {
              const dof = dofList[d];
              if (isLocked && lockedDoF[dof]) continue;
              restPose[colIndex][0] = dofRestPose[dof] - dofValues[dof];
              colIndex++;
            }
          } else {
            for (let d = 0; d < colCount; d++) {
              restPose[colIndex][0] = 0;
              colIndex++;
            }
          }
        }
        const jij = matrixPool.get(freeDoF, freeDoF);
        mat.multiply(jij, pseudoInverse, jacobian);
        const ident = matrixPool.get(freeDoF, freeDoF);
        mat.identity(ident);
        const nullSpaceProjection = matrixPool.get(freeDoF, freeDoF);
        mat.subtract(nullSpaceProjection, ident, jij);
        mat.multiply(restPoseResult, nullSpaceProjection, restPose);
        for (let r = 0; r < freeDoF; r++) {
          const val = restPoseResult[r][0];
          deltaTheta[r][0] += val * restPoseFactor;
        }
      }
      if (stallThreshold > 0) {
        let stalled = true;
        for (let i = 0, l = deltaTheta.length; i < l; i++) {
          const delta = deltaTheta[i][0];
          if (Math.abs(delta) > stallThreshold) {
            stalled = false;
            break;
          }
        }
        if (stalled) {
          status = SOLVE_STATUS.STALLED;
          break;
        }
      }
      prevDoFValues.forEach((dofValues, joint) => {
        dofValues.set(joint.dofValues);
      });
      this.applyJointAngles(freeJoints, deltaTheta);
    } while (true);
    targetJoints.length = 0;
    freeJoints.length = 0;
    return status;
  }
  // Apply the delta values from the solve to the free joints in the list
  applyJointAngles(freeJoints2, deltaTheta) {
    const {
      lockedJointDoF,
      lockedJointDoFCount
    } = this;
    let lockedJoint = false;
    let dti = 0;
    for (let i = 0, l = freeJoints2.length; i < l; i++) {
      const joint = freeJoints2[i];
      const dofList = joint.dof;
      const lockedDoF = lockedJointDoF.get(joint);
      const isLocked = lockedJointDoFCount.has(joint);
      for (let d = 0, l2 = dofList.length; d < l2; d++) {
        const dof = dofList[d];
        if (isLocked && lockedDoF[dof]) {
          continue;
        }
        const value = joint.getDoFValue(dof);
        const hitLimit = joint.setDoFValue(dof, value + deltaTheta[dti][0]);
        if (hitLimit) {
          if (!lockedJointDoFCount.has(joint)) {
            lockedJointDoFCount.set(joint, 0);
            lockedDoF.fill(0);
          }
          const lockedCount = lockedJointDoFCount.get(joint);
          lockedJointDoFCount.set(joint, lockedCount + 1);
          lockedDoF[dof] = 1;
          lockedJoint = true;
        }
        dti++;
      }
    }
    if (dti !== deltaTheta.length) {
      throw new Error();
    }
    return lockedJoint;
  }
  // generate the jacobian
  // The jacobian has one column for each free degree of freedom and a row for every
  // target degree of freedom we have. The entries are generated by adjusting every
  // DoF by some epsilon and storing how much it affected the target error.
  fillJacobian(targetJoints2, freeJoints2, outJacobian) {
    const {
      translationStep,
      rotationStep,
      lockedJointDoF,
      lockedJointDoFCount,
      translationFactor,
      rotationFactor
    } = this;
    const affectedClosures = this.affectedClosures;
    const affectedConnectedClosures = this.affectedConnectedClosures;
    let colIndex = 0;
    for (let c = 0, tc = freeJoints2.length; c < tc; c++) {
      const freeJoint = freeJoints2[c];
      const relevantClosures = affectedClosures.get(freeJoint);
      const relevantConnectedClosures = affectedConnectedClosures.get(freeJoint);
      const dofList = freeJoint.dof;
      const colCount = freeJoint.translationDoFCount + freeJoint.rotationDoFCount;
      const isLocked = lockedJointDoFCount.has(freeJoint);
      const lockedDoF = lockedJointDoF.get(freeJoint);
      mat44.invert(tempInverseMatrixWorld, freeJoint.matrixWorld);
      for (let co = 0; co < colCount; co++) {
        const dof = dofList[co];
        if (isLocked && lockedDoF[dof]) {
          continue;
        }
        let rowIndex = 0;
        let delta = dof < 3 ? translationStep : rotationStep;
        if (freeJoint.getDeltaWorldMatrix(dof, delta, tempDeltaWorldMatrix)) {
          delta *= -1;
        }
        for (let r = 0, tr = targetJoints2.length; r < tr; r++) {
          const targetJoint = targetJoints2[r];
          if (targetJoint.isClosure) {
            if (relevantClosures.has(targetJoint) || relevantConnectedClosures.has(targetJoint)) {
              targetJoint.getClosureError(tempPos4, tempQuat7);
              if (relevantConnectedClosures.has(targetJoint)) {
                mat44.multiply(targetRelativeToJointMatrix, tempInverseMatrixWorld, targetJoint.child.matrixWorld);
                mat44.multiply(targetDeltaWorldMatrix, tempDeltaWorldMatrix, targetRelativeToJointMatrix);
                getMatrixDifference(targetJoint.matrixWorld, targetDeltaWorldMatrix, tempPos23, tempQuat23);
              } else {
                mat44.multiply(targetRelativeToJointMatrix, tempInverseMatrixWorld, targetJoint.matrixWorld);
                mat44.multiply(targetDeltaWorldMatrix, tempDeltaWorldMatrix, targetRelativeToJointMatrix);
                getMatrixDifference(targetDeltaWorldMatrix, targetJoint.child.matrixWorld, tempPos23, tempQuat23);
              }
              vec35.subtract(tempPos4, tempPos4, tempPos23);
              vec35.scale(tempPos4, tempPos4, translationFactor / delta);
              vec43.subtract(tempQuat7, tempQuat7, tempQuat23);
              vec43.scale(tempQuat7, tempQuat7, rotationFactor / delta);
              if (targetJoint.isGoal) {
                const { translationDoFCount, rotationDoFCount, dof: dof2 } = targetJoint;
                for (let i = 0; i < translationDoFCount; i++) {
                  const d = dof2[i];
                  outJacobian[rowIndex + i][colIndex] = tempPos4[d];
                }
                if (rotationDoFCount === 3) {
                  outJacobian[rowIndex + translationDoFCount + 0][colIndex] = tempQuat7[0];
                  outJacobian[rowIndex + translationDoFCount + 1][colIndex] = tempQuat7[1];
                  outJacobian[rowIndex + translationDoFCount + 2][colIndex] = tempQuat7[2];
                  outJacobian[rowIndex + translationDoFCount + 3][colIndex] = tempQuat7[3];
                  rowIndex += 4;
                }
                rowIndex += translationDoFCount;
              } else {
                outJacobian[rowIndex + 0][colIndex] = tempPos4[0];
                outJacobian[rowIndex + 1][colIndex] = tempPos4[1];
                outJacobian[rowIndex + 2][colIndex] = tempPos4[2];
                outJacobian[rowIndex + 3][colIndex] = tempQuat7[0];
                outJacobian[rowIndex + 4][colIndex] = tempQuat7[1];
                outJacobian[rowIndex + 5][colIndex] = tempQuat7[2];
                outJacobian[rowIndex + 6][colIndex] = tempQuat7[3];
                rowIndex += 7;
              }
            } else {
              let totalRows = 7;
              if (targetJoint.isGoal) {
                totalRows = targetJoint.translationDoFCount;
                if (targetJoint.rotationDoFCount === 3) {
                  totalRows += 4;
                }
              }
              for (let i = 0; i < totalRows; i++) {
                outJacobian[rowIndex + i][colIndex] = 0;
              }
              rowIndex += totalRows;
            }
          }
          if (targetJoint.targetSet) {
            const rowCount = targetJoint.translationDoFCount + targetJoint.rotationDoFCount;
            if (freeJoint === targetJoint) {
              for (let i = 0; i < rowCount; i++) {
                outJacobian[rowIndex + colIndex][colIndex] = -1;
              }
            } else {
              for (let i = 0; i < rowCount; i++) {
                outJacobian[rowIndex + i][colIndex] = 0;
              }
            }
            rowIndex += rowCount;
          }
        }
        colIndex++;
      }
    }
    if (colIndex !== outJacobian[0].length) {
      throw new Error();
    }
  }
  // Fill in the error vector
  fillErrorVector(targetJoints2, errorVector) {
    let rowIndex = 0;
    for (let i = 0, l = targetJoints2.length; i < l; i++) {
      const joint = targetJoints2[i];
      if (joint.isClosure) {
        accumulateClosureError(this, joint, rowIndex, errorVector, errorResultInfo);
        rowIndex += errorResultInfo.rowCount;
      }
      if (joint.targetSet) {
        accumulateTargetError(this, joint, rowIndex, errorVector, errorResultInfo);
        rowIndex += errorResultInfo.rowCount;
      }
    }
  }
  // Count the unconverged targets in the chain and store them in targetJoints and store
  // any freeJoints in
  countUnconvergedVariables(freeJoints2, targetJoints2, dofResultInfo2) {
    const { lockedJointDoFCount } = this;
    const chain = this.chain;
    let totalError = 0;
    let errorRows = 0;
    let unconvergedRows = 0;
    let freeDoF = 0;
    for (let i = 0, l = chain.length; i < l; i++) {
      let addToTargetList = false;
      const joint = chain[i];
      const lockedDoF = lockedJointDoFCount.get(joint) || 0;
      if (joint.isClosure) {
        accumulateClosureError(this, joint, errorRows, null, errorResultInfo);
        if (!errorResultInfo.isConverged) {
          unconvergedRows += errorResultInfo.rowCount;
          totalError += errorResultInfo.totalError;
        }
        addToTargetList = true;
        errorRows += errorResultInfo.rowCount;
      }
      const dofList = joint.dof;
      if (joint.targetSet) {
        accumulateTargetError(this, joint, errorRows, null, errorResultInfo);
        if (!errorResultInfo.isConverged) {
          unconvergedRows += errorResultInfo.rowCount;
          totalError += errorResultInfo.totalError;
        }
        addToTargetList = true;
        errorRows += errorResultInfo.rowCount;
      }
      if (!joint.isGoal && dofList.length > 0) {
        freeDoF += dofList.length - lockedDoF;
        freeJoints2.push(joint);
      }
      if (addToTargetList) {
        targetJoints2.push(joint);
      }
    }
    if (unconvergedRows === 0) {
      errorRows = 0;
    }
    dofResultInfo2.errorRows = errorRows;
    dofResultInfo2.freeDoF = freeDoF;
    dofResultInfo2.totalError = totalError;
  }
};

// src/core/utils/findRoots.js
function findRoots(frames) {
  const potentialRoots = frames.map((f) => {
    let lastParent = f;
    f.traverseParents((p) => {
      lastParent = p;
    });
    return lastParent;
  });
  const roots = [];
  const set = /* @__PURE__ */ new Set();
  for (let i = 0; i < potentialRoots.length; i++) {
    const frame = potentialRoots[i];
    if (set.has(frame)) {
      continue;
    }
    roots.push(frame);
    frame.traverse((c) => {
      if (set.has(c)) {
        return true;
      }
      set.add(c);
      let closureConnections;
      if (c.isLink) {
        closureConnections = c.closureJoints;
      } else if (c.isJoint && c.isClosure) {
        closureConnections = [c.child];
      }
      if (closureConnections) {
        closureConnections.forEach((cl) => {
          let lastParent = cl;
          cl.traverseParents((p) => {
            lastParent = p;
          });
          if (!set.has(lastParent)) {
            potentialRoots.push(lastParent);
          }
        });
      }
    });
  }
  return roots;
}

// src/core/MatrixPool.js
var FixedMatrixPool = class {
  constructor(row, col) {
    const matrices = [];
    let index = 0;
    this.get = function() {
      let matrix = matrices[index];
      if (!matrix) {
        matrices[index] = matrix = mat.create(row, col);
      }
      index++;
      return matrix;
    };
    this.releaseAll = function() {
      index = 0;
    };
  }
};
var MatrixPool = class {
  constructor() {
    const pools = {};
    const poolArray = [];
    this.get = function(row, col) {
      let colPools = pools[row];
      if (!colPools) {
        colPools = pools[row] = {};
      }
      let pool = colPools[col];
      if (!pool) {
        pool = colPools[col] = new FixedMatrixPool(row, col);
        poolArray.push(pool);
      }
      return pool.get();
    };
    this.releaseAll = function() {
      for (let i = 0, l = poolArray.length; i < l; i++) {
        poolArray[i].releaseAll();
      }
    };
  }
};

// src/core/Solver.js
var Solver = class {
  constructor(roots = []) {
    this.matrixPool = new MatrixPool();
    this.useSVD = false;
    this.maxIterations = 5;
    this.stallThreshold = 1e-4;
    this.dampingFactor = 1e-3;
    this.divergeThreshold = 0.01;
    this.restPoseFactor = 0.01;
    this.translationConvergeThreshold = 1e-3;
    this.rotationConvergeThreshold = 1e-5;
    this.translationFactor = 1;
    this.rotationFactor = 1;
    this.translationStep = 1e-3;
    this.rotationStep = 1e-3;
    this.translationErrorClamp = 0.1;
    this.rotationErrorClamp = 0.1;
    this.roots = Array.isArray(roots) ? [...roots] : [roots];
    this.solvers = null;
    this.updateStructure();
  }
  // needs to be called whenever tree structure is updated
  updateStructure() {
    const roots = findRoots(this.roots);
    const chains = [];
    const traversal = /* @__PURE__ */ new Set();
    const allChainJoints = /* @__PURE__ */ new Set();
    const traverseChains = (frame) => {
      if (frame.isJoint) {
        const joint = frame;
        traversal.add(joint);
        if (joint.isClosure) {
          const chainSet = /* @__PURE__ */ new Set();
          let curr = joint.child;
          while (curr) {
            if (curr.isJoint) {
              if (traversal.has(curr)) {
                break;
              } else {
                chainSet.add(curr);
                allChainJoints.add(curr);
              }
            }
            curr = curr.parent;
          }
          traversal.forEach((c) => {
            chainSet.add(c);
            allChainJoints.add(c);
          });
          chains.push(chainSet);
        }
      }
      const children = frame.children;
      for (let i = 0, l = children.length; i < l; i++) {
        traverseChains(children[i]);
      }
      traversal.delete(frame);
    };
    roots.forEach(traverseChains);
    const independentChains = [];
    while (chains.length) {
      const currChain = chains.pop();
      independentChains.push(currChain);
      for (let i = 0; i < chains.length; i++) {
        const otherChain = chains[i];
        let dependent = false;
        otherChain.forEach((c) => {
          dependent = dependent || currChain.has(c);
        });
        if (dependent) {
          otherChain.forEach((c) => currChain.add(c));
          chains.splice(i, 1);
          i--;
        }
      }
    }
    const nonChainJoints = /* @__PURE__ */ new Set();
    roots.forEach((root) => root.traverse((c) => {
      if (c.isJoint && c.dof.length > 0 && !allChainJoints.has(c)) {
        nonChainJoints.add(c);
      }
    }));
    this.solvers = independentChains.map((c) => new ChainSolver(c));
    this.nonChainJoints = nonChainJoints;
  }
  solve() {
    const { solvers, nonChainJoints } = this;
    nonChainJoints.forEach((joint) => {
      if (joint.targetSet) {
        joint.dofValues.set(joint.dofTarget);
        joint.setMatrixDoFNeedsUpdate();
      }
    });
    const results = [];
    for (let i = 0, l = solvers.length; i < l; i++) {
      const s = solvers[i];
      s.matrixPool = this.matrixPool;
      s.useSVD = this.useSVD;
      s.maxIterations = this.maxIterations;
      s.stallThreshold = this.stallThreshold;
      s.dampingFactor = this.dampingFactor;
      s.divergeThreshold = this.divergeThreshold;
      s.restPoseFactor = this.restPoseFactor;
      s.translationConvergeThreshold = this.translationConvergeThreshold;
      s.rotationConvergeThreshold = this.rotationConvergeThreshold;
      s.translationFactor = this.translationFactor;
      s.rotationFactor = this.rotationFactor;
      s.translationStep = this.translationStep;
      s.rotationStep = this.rotationStep;
      s.translationErrorClamp = this.translationErrorClamp;
      s.rotationErrorClamp = this.rotationErrorClamp;
      const result = s.solve();
      results.push(result);
    }
    return results;
  }
};

// src/worker/serialize.js
function serialize(frames) {
  const map = /* @__PURE__ */ new Map();
  const info = [];
  for (let i = 0, l = frames.length; i < l; i++) {
    const frame = frames[i];
    const {
      name,
      dof,
      dofValues,
      dofTarget,
      dofRestPose,
      minDoFLimit,
      maxDoFLimit,
      targetSet,
      restPoseSet,
      position,
      quaternion,
      isClosure
    } = frame;
    let type = "Link";
    if (frame.isGoal) {
      type = "Goal";
    } else if (frame.isJoint) {
      type = "Joint";
    }
    const res = {
      dof: dof ? dof.slice() : null,
      dofValues: dofValues ? dofValues.slice() : null,
      dofTarget: dofTarget ? dofTarget.slice() : null,
      dofRestPose: dofRestPose ? dofRestPose.slice() : null,
      minDoFLimit: minDoFLimit ? minDoFLimit.slice() : null,
      maxDoFLimit: maxDoFLimit ? maxDoFLimit.slice() : null,
      targetSet,
      restPoseSet,
      isClosure,
      name,
      position: position.slice(),
      quaternion: quaternion.slice(),
      children: null,
      closureJoints: null,
      child: null,
      type
    };
    info.push(res);
    map.set(frame, i);
  }
  for (let i = 0, l = frames.length; i < l; i++) {
    const inf = info[i];
    const frame = frames[i];
    inf.children = frame.children.map((c) => map.get(c));
    if (frame.isLink) {
      inf.closureJoints = frame.closureJoints.map((c) => map.get(c));
    }
    if (frame.isJoint && frame.child) {
      inf.child = map.get(frame.child);
    }
    if (frame.parent) {
      inf.parent = map.get(frame.parent);
    } else {
      inf.parent = null;
    }
  }
  return info;
}

// src/worker/utils.js
var JOINT_STRIDE = 304;
function generateSharedBuffer(frames, useSharedArrayBuffer = true) {
  let arrayBuffer;
  if (useSharedArrayBuffer) {
    arrayBuffer = new SharedArrayBuffer(JOINT_STRIDE * frames.length);
  } else {
    arrayBuffer = new ArrayBuffer(JOINT_STRIDE * frames.length);
  }
  const float64 = new Float32Array(arrayBuffer);
  const byte8 = new Uint8Array(arrayBuffer);
  applyToBuffer(frames, float64, byte8);
  return arrayBuffer;
}
function applyToBuffer(frames, floatBuffer, byteBuffer, copyDoFValues = true, copyJointSettings = true) {
  for (let i = 0, l = frames.length; i < l; i++) {
    copyFrameToBuffer(frames[i], floatBuffer, byteBuffer, i * JOINT_STRIDE, copyDoFValues, copyJointSettings);
  }
}
function copyFrameToBuffer(frame, floatBuffer, byteBuffer, byteOffset, copyDoFValues = true, copyJointSettings = true) {
  const floatOffset = byteOffset / 4;
  if (copyJointSettings) {
    const {
      position,
      quaternion
    } = frame;
    for (let i = 0; i < 3; i++) {
      floatBuffer[floatOffset + 0 + i] = position[i];
    }
    for (let i = 0; i < 4; i++) {
      floatBuffer[floatOffset + 3 + i] = quaternion[i];
    }
    if (frame.isJoint) {
      const {
        dofTarget,
        dofRestPose,
        minDoFLimit,
        maxDoFLimit,
        targetSet,
        restPoseSet
      } = frame;
      for (let i = 0; i < 6; i++) {
        floatBuffer[floatOffset + 7 + 0 * 6 + i] = dofTarget[i];
        floatBuffer[floatOffset + 7 + 1 * 6 + i] = dofRestPose[i];
        floatBuffer[floatOffset + 7 + 2 * 6 + i] = minDoFLimit[i];
        floatBuffer[floatOffset + 7 + 3 * 6 + i] = maxDoFLimit[i];
      }
      byteBuffer[byteOffset + 148] = Number(targetSet);
      byteBuffer[byteOffset + 149] = Number(restPoseSet);
    }
  }
  if (copyDoFValues && frame.isJoint) {
    const { dofValues } = frame;
    for (let i = 0; i < 6; i++) {
      floatBuffer[floatOffset + 7 + 4 * 6 + i] = dofValues[i];
    }
  }
}
function copyBufferToFrame(joint, floatBuffer, byteBuffer, byteOffset, copyDoFValues = true, copyJointSettings = true) {
  const floatOffset = byteOffset / 4;
  if (copyJointSettings) {
    joint.setPosition(
      floatBuffer[floatOffset + 0],
      floatBuffer[floatOffset + 1],
      floatBuffer[floatOffset + 2]
    );
    joint.setQuaternion(
      floatBuffer[floatOffset + 3 + 0],
      floatBuffer[floatOffset + 3 + 1],
      floatBuffer[floatOffset + 3 + 2],
      floatBuffer[floatOffset + 3 + 3]
    );
    if (joint.isJoint) {
      const {
        dofTarget,
        dofRestPose,
        minDoFLimit,
        maxDoFLimit
      } = joint;
      for (let i = 0; i < 6; i++) {
        dofTarget[i] = floatBuffer[floatOffset + 7 + 0 * 6 + i];
        dofRestPose[i] = floatBuffer[floatOffset + 7 + 1 * 6 + i];
        minDoFLimit[i] = floatBuffer[floatOffset + 7 + 2 * 6 + i];
        maxDoFLimit[i] = floatBuffer[floatOffset + 7 + 3 * 6 + i];
      }
      joint.targetSet = Boolean(byteBuffer[byteOffset + 148]);
      joint.restPoseSet = Boolean(byteBuffer[byteOffset + 149]);
    }
  }
  if (copyDoFValues && joint.isJoint) {
    const { dofValues } = joint;
    let changed = false;
    for (let i = 0; i < 6; i++) {
      const v = floatBuffer[floatOffset + 7 + 4 * 6 + i];
      if (v !== dofValues[i]) {
        dofValues[i] = v;
        changed = true;
      }
    }
    if (changed) {
      joint.setMatrixDoFNeedsUpdate();
    }
  }
}

// src/worker/WorkerSolver.js
var useSharedArrayBuffers = typeof SharedArrayBuffer !== "undefined";
var WorkerSolver = class {
  constructor(roots = []) {
    this.roots = Array.isArray(roots) ? [...roots] : [roots];
    this.status = [];
    this.running = false;
    this.frames = null;
    this.buffer = null;
    this.floatBuffer = null;
    this.byteBuffer = null;
    this.jointsToUpdate = null;
    this.jointsToIndexMap = null;
    this.scheduledStateUpdate = false;
    const worker = new Worker(new URL("./workerSolver.worker.js", import.meta.url), { type: "module" });
    let scheduled = false;
    worker.onmessage = ({ data: e }) => {
      if (e.type === "updateSolve") {
        if (!scheduled) {
          scheduled = true;
          Promise.resolve().then(() => {
            let byteBuffer, floatBuffer;
            if (useSharedArrayBuffers) {
              byteBuffer = this.byteBuffer;
              floatBuffer = this.floatBuffer;
            } else {
              byteBuffer = new Uint8Array(e.data.buffer);
              floatBuffer = new Float32Array(e.data.buffer);
            }
            const { jointsToIndexMap, jointsToUpdate } = this;
            for (let i = 0, l = jointsToUpdate.length; i < l; i++) {
              const joint = jointsToUpdate[i];
              const index = jointsToIndexMap.get(joint);
              copyBufferToFrame(joint, floatBuffer, byteBuffer, index * JOINT_STRIDE, true, false);
            }
            scheduled = false;
          });
        }
        const status = e.data.status;
        this.status = status;
        if (status !== SOLVE_STATUS.TIMEOUT) {
          this.running = false;
        }
      }
    };
    this.worker = worker;
    this.updateStructure();
  }
  // Update the structure of the graph in the worker. Must be called every time the graph structure
  // changes or a degree of freedom changes. Or if the main thread must change the DoF values.
  updateStructure() {
    const { worker } = this;
    const roots = findRoots(this.roots);
    const framesSet = /* @__PURE__ */ new Set();
    roots.forEach((root) => root.traverse((c) => {
      framesSet.add(c);
    }));
    const frames = Array.from(framesSet);
    const serialized = serialize(frames);
    const buffer = generateSharedBuffer(frames, useSharedArrayBuffers);
    const floatBuffer = new Float32Array(buffer);
    const byteBuffer = new Uint8Array(buffer);
    const jointsToUpdate = [];
    const jointsToIndexMap = /* @__PURE__ */ new Map();
    for (let i = 0, l = frames.length; i < l; i++) {
      const frame = frames[i];
      if (frame.isJoint && frame.dof.length > 0) {
        jointsToUpdate.push(frame);
        jointsToIndexMap.set(frame, i);
      }
    }
    if (useSharedArrayBuffers) {
      this.buffer = buffer;
      this.floatBuffer = floatBuffer;
      this.byteBuffer = byteBuffer;
    } else {
      this.buffer = buffer.slice();
      this.floatBuffer = new Float32Array(this.buffer);
      this.byteBuffer = new Uint8Array(this.buffer);
    }
    this.frames = frames;
    this.jointsToUpdate = jointsToUpdate;
    this.jointsToIndexMap = jointsToIndexMap;
    if (useSharedArrayBuffers) {
      worker.postMessage({
        type: "updateStructure",
        data: {
          serialized,
          buffer
        }
      });
    } else {
      worker.postMessage({
        type: "updateStructure",
        data: {
          serialized,
          buffer
        }
      }, [buffer]);
    }
  }
  // Update the solver settings via a settings object.
  updateSolverSettings(settings) {
    this.worker.postMessage({
      type: "updateSolverSettings",
      data: settings
    });
  }
  // Copy the non DoF values over to shared buffer for use in the worker
  updateFrameState(...updateJoints) {
    const { frames, floatBuffer, byteBuffer } = this;
    if (updateJoints.length === 0) {
      applyToBuffer(frames, floatBuffer, byteBuffer, false, true);
    } else {
      for (let i = 0, l = updateJoints.length; i < l; i++) {
        const frame = updateJoints[i];
        const index = frames.indexOf(frame);
        copyFrameToBuffer(frame, floatBuffer, byteBuffer, JOINT_STRIDE * index, false, true);
      }
    }
    if (!useSharedArrayBuffers && !this.scheduledStateUpdate) {
      this.scheduledStateUpdate = true;
      Promise.resolve().then(() => {
        this.scheduledStateUpdate = false;
        const buffer = this.buffer.slice();
        this.worker.postMessage({
          type: "updateFrameState",
          data: {
            buffer
          }
        }, [buffer]);
      });
    }
  }
  // Start the solve loop if it's not running
  solve() {
    this.worker.postMessage({
      type: "startSolve"
    });
    this.running = true;
  }
  // Stop the solve loop
  stop() {
    this.worker.postMessage({
      type: "stopSolve"
    });
    this.running = false;
  }
  // Stop and dispose the worker
  dispose() {
    this.stop();
    this.worker.terminate();
    this.worker = null;
  }
};

// src/three/IKRootsHelper.js
import { Group as Group2, Vector2, Color } from "three";

// src/three/IKJointHelper.js
import { BoxBufferGeometry, Vector3, CylinderBufferGeometry, SphereBufferGeometry, Mesh, MeshStandardMaterial } from "three";
import { Line2 as Line22 } from "three/examples/jsm/lines/Line2.js";

// src/three/IKLinkHelper.js
import { mat4 as mat45, vec3 as vec36 } from "gl-matrix";
import { Group, Matrix4 } from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
var glTempPos = new Float64Array(3);
var glTempMatrix = new Float64Array(16);
var tempMatrix3 = new Matrix4();
var tempParentMatrixWorld = new Matrix4();
var IKLinkHelper = class extends Group {
  constructor(link) {
    super();
    this.frame = link;
    const line = new Line2();
    line.geometry.setPositions([
      0,
      0,
      0,
      0,
      0,
      0
    ]);
    line.material.color.set(16777215);
    line.material.linewidth = 2;
    this.add(line);
    this.line = line;
  }
  update() {
    const { frame, line } = this;
    if (frame.parent) {
      glTempPos[0] = 0;
      glTempPos[1] = 0;
      glTempPos[2] = 0;
      mat45.invert(glTempMatrix, frame.matrix);
      vec36.transformMat4(glTempPos, glTempPos, glTempMatrix);
      line.geometry.setPositions([
        ...glTempPos,
        0,
        0,
        0
      ]);
      line.visible = true;
      if (vec36.length(glTempPos) < 1e-7) {
        line.visible = false;
      }
    } else {
      line.visible = false;
    }
  }
  updateMatrixWorld(...args) {
    const frame = this.frame;
    frame.updateMatrixWorld();
    if (frame.isJoint) {
      if (frame.parent) {
        tempMatrix3.set(...frame.matrix).transpose();
        tempParentMatrixWorld.set(...frame.parent.matrixWorld).transpose();
        this.matrix.multiplyMatrices(tempParentMatrixWorld, tempMatrix3);
      } else {
        tempMatrix3.set(...frame.matrix).transpose();
        this.matrix.set(...frame.matrix).transpose();
      }
    } else {
      this.matrix.set(...frame.matrixWorld).transpose();
    }
    this.matrix.decompose(this.position, this.quaternion, this.scale);
    super.updateMatrixWorld(...args);
  }
  dispose() {
    this.traverse((c) => {
      if (c.material) {
        c.material.dispose();
      }
      if (c.geometry) {
        c.geometry.dispose();
      }
    });
  }
};

// src/three/IKJointHelper.js
var tempPos5 = new Vector3();
var tempRot = new Vector3();
var RotationLimitHelper = class extends Mesh {
  constructor(material, dof) {
    super(void 0, material);
    this._dof = dof;
    this._min = null;
    this._delta = null;
    this.setLimits(0, 2 * Math.PI);
  }
  setLimits(min, max) {
    const delta = Math.min(max - min, 2 * Math.PI);
    if (min === -Infinity) {
      min = 0;
    }
    if (this._min === min && this._delta === delta) {
      return;
    }
    this._min = min;
    this._delta = delta;
    if (this.geometry) {
      this.geometry.dispose();
    }
    const dof = this._dof;
    const geometry = new CylinderBufferGeometry(0.075, 0.075, 1e-7, 100, 1, false, min, delta);
    if (dof === DOF.EX) {
      geometry.rotateZ(HALF_PI);
    }
    if (dof === DOF.EZ) {
      geometry.rotateX(HALF_PI);
    }
    this.geometry = geometry;
  }
};
var IKJointHelper = class extends IKLinkHelper {
  constructor(joint) {
    super(joint);
    const xRotationMesh = new Mesh(
      new CylinderBufferGeometry(0.05, 0.05, 0.25, 30, 1).rotateZ(HALF_PI),
      new MeshStandardMaterial()
    );
    const xRotationLimits = new RotationLimitHelper(
      new MeshStandardMaterial(),
      DOF.EX
    );
    const yRotationMesh = new Mesh(
      new CylinderBufferGeometry(0.05, 0.05, 0.25, 30, 1),
      new MeshStandardMaterial()
    );
    const yRotationLimits = new RotationLimitHelper(
      new MeshStandardMaterial(),
      DOF.EY
    );
    const zRotationMesh = new Mesh(
      new CylinderBufferGeometry(0.05, 0.05, 0.25, 30, 1).rotateX(HALF_PI),
      new MeshStandardMaterial()
    );
    const zRotationLimits = new RotationLimitHelper(
      new MeshStandardMaterial(),
      DOF.EZ
    );
    zRotationLimits.rotation.set(HALF_PI, 0, 0);
    const freeRotationMesh = new Mesh(
      new SphereBufferGeometry(0.05, 30, 30),
      new MeshStandardMaterial()
    );
    const fixedMesh = new Mesh(
      new BoxBufferGeometry(0.05, 0.05, 0.05),
      new MeshStandardMaterial()
    );
    const translationMesh = new Line22();
    translationMesh.geometry.setPositions([
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      1
    ]);
    translationMesh.material.color.set(16777215);
    translationMesh.material.side = 2;
    translationMesh.material.linewidth = 2;
    this.add(
      xRotationMesh,
      yRotationMesh,
      zRotationMesh,
      xRotationLimits,
      yRotationLimits,
      zRotationLimits,
      freeRotationMesh,
      translationMesh,
      fixedMesh
    );
    this.xRotationMesh = xRotationMesh;
    this.yRotationMesh = yRotationMesh;
    this.zRotationMesh = zRotationMesh;
    this.xRotationLimits = xRotationLimits;
    this.yRotationLimits = yRotationLimits;
    this.zRotationLimits = zRotationLimits;
    this.translationMesh = translationMesh;
    this.freeRotationMesh = freeRotationMesh;
    this.fixedMesh = fixedMesh;
  }
  setJointScale(s) {
    this.xRotationMesh.scale.setScalar(s);
    this.yRotationMesh.scale.setScalar(s);
    this.zRotationMesh.scale.setScalar(s);
    this.xRotationLimits.scale.setScalar(s);
    this.yRotationLimits.scale.setScalar(s);
    this.zRotationLimits.scale.setScalar(s);
    this.freeRotationMesh.scale.setScalar(s);
    this.fixedMesh.scale.setScalar(s);
  }
  update() {
    super.update();
    const {
      xRotationMesh,
      yRotationMesh,
      zRotationMesh,
      xRotationLimits,
      yRotationLimits,
      zRotationLimits,
      freeRotationMesh,
      translationMesh,
      fixedMesh
    } = this;
    const joint = this.frame;
    xRotationMesh.visible = false;
    yRotationMesh.visible = false;
    zRotationMesh.visible = false;
    xRotationLimits.visible = false;
    yRotationLimits.visible = false;
    zRotationLimits.visible = false;
    freeRotationMesh.visible = false;
    translationMesh.visible = false;
    fixedMesh.visible = false;
    if (joint.translationDoFCount !== 0) {
      translationMesh.visible = true;
    }
    if (joint.rotationDoFCount === 3) {
      freeRotationMesh.visible = true;
      xRotationLimits.visible = true;
      yRotationLimits.visible = true;
      zRotationLimits.visible = true;
    } else {
      xRotationMesh.visible = Boolean(joint.dofFlags[DOF.EX]);
      yRotationMesh.visible = Boolean(joint.dofFlags[DOF.EY]);
      zRotationMesh.visible = Boolean(joint.dofFlags[DOF.EZ]);
      xRotationLimits.visible = Boolean(joint.dofFlags[DOF.EX]);
      yRotationLimits.visible = Boolean(joint.dofFlags[DOF.EY]);
      zRotationLimits.visible = Boolean(joint.dofFlags[DOF.EZ]);
    }
    if (joint.translationDoFCount === 0 && joint.rotationDoFCount === 0) {
      this.visible = this.line.visible;
    }
  }
  updateMatrixWorld(...args) {
    const {
      xRotationMesh,
      yRotationMesh,
      zRotationMesh,
      xRotationLimits,
      yRotationLimits,
      zRotationLimits,
      freeRotationMesh,
      translationMesh
    } = this;
    const joint = this.frame;
    tempPos5.set(
      joint.getDoFValue(DOF.X),
      joint.getDoFValue(DOF.Y),
      joint.getDoFValue(DOF.Z)
    );
    tempRot.set(
      joint.getDoFValue(DOF.EX),
      joint.getDoFValue(DOF.EY),
      joint.getDoFValue(DOF.EZ)
    );
    translationMesh.scale.copy(tempPos5);
    xRotationMesh.position.copy(tempPos5);
    xRotationLimits.position.copy(tempPos5);
    xRotationLimits.setLimits(
      joint.getMinLimit(DOF.EX),
      joint.getMaxLimit(DOF.EX)
    );
    yRotationMesh.position.copy(tempPos5);
    yRotationMesh.rotation.set(tempRot.x, 0, 0);
    yRotationLimits.position.copy(tempPos5);
    yRotationLimits.rotation.set(tempRot.x, 0, 0);
    yRotationLimits.setLimits(
      joint.getMinLimit(DOF.EY),
      joint.getMaxLimit(DOF.EY)
    );
    zRotationMesh.position.copy(tempPos5);
    zRotationMesh.rotation.set(tempRot.x, tempRot.y, 0);
    zRotationLimits.position.copy(tempPos5);
    zRotationLimits.rotation.set(tempRot.x, tempRot.y, 0);
    zRotationLimits.setLimits(
      joint.getMinLimit(DOF.EZ),
      joint.getMaxLimit(DOF.EZ)
    );
    freeRotationMesh.position.copy(tempPos5);
    super.updateMatrixWorld(...args);
  }
};

// src/three/IKRootsHelper.js
var currLinks = /* @__PURE__ */ new Set();
var currJoints = /* @__PURE__ */ new Set();
var IKRootsHelper = class extends Group2 {
  constructor(roots = []) {
    super();
    this.roots = Array.isArray(roots) ? [...roots] : [roots];
    this.joints = /* @__PURE__ */ new Map();
    this.links = /* @__PURE__ */ new Map();
    this.resolution = new Vector2(1e3, 1e3);
    this.drawThrough = false;
    this.color = new Color(16777215);
    this.jointScale = 1;
    this.updateStructure();
  }
  _updateHelpers() {
    const { drawThrough, resolution, color, jointScale } = this;
    this.traverse((c) => {
      const material = c.material;
      if (material) {
        material.color.copy(color);
        if (material.isLineMaterial) {
          material.uniforms.resolution.value.copy(resolution);
        }
        if (drawThrough) {
          material.opacity = 0.1;
          material.transparent = true;
          material.depthWrite = false;
          material.depthTest = false;
        } else {
          material.opacity = 1;
          material.transparent = false;
          material.depthWrite = true;
          material.depthTest = true;
        }
      }
      if (c instanceof IKJointHelper) {
        c.setJointScale(jointScale);
      }
    });
  }
  setColor(c) {
    if (c.isColor) {
      this.color.copy(c);
    } else {
      this.color.set(c);
    }
    this._updateHelpers();
    return this;
  }
  setJointScale(s) {
    this.jointScale = s;
    this._updateHelpers();
    return this;
  }
  setDrawThrough(value) {
    this.drawThrough = value;
    this._updateHelpers();
    return this;
  }
  setResolution(width, height) {
    this.resolution.set(width, height);
    this._updateHelpers();
    return this;
  }
  updateStructure() {
    const { joints, links } = this;
    const roots = findRoots(this.roots);
    currJoints.clear();
    joints.forEach((helper, joint) => currJoints.add(joint));
    currLinks.clear();
    links.forEach((helper, links2) => currLinks.add(links2));
    for (let i = 0, l = roots.length; i < l; i++) {
      const root = roots[i];
      root.updateMatrixWorld(true);
      root.traverse((c) => {
        if (c.isJoint) {
          let helper;
          if (joints.has(c)) {
            helper = joints.get(c);
          } else {
            helper = new IKJointHelper(c);
            this.add(helper);
            joints.set(c, helper);
          }
          helper.update();
          currJoints.delete(c);
        } else {
          let helper;
          if (links.has(c)) {
            helper = links.get(c);
          } else {
            helper = new IKLinkHelper(c);
            this.add(helper);
            links.set(c, helper);
          }
          helper.update();
          currLinks.delete(c);
        }
      });
    }
    currJoints.forEach((joint) => {
      const helper = joints.get(joint);
      this.remove(helper);
      helper.dispose();
    });
    currLinks.forEach((link) => {
      const helper = links.get(link);
      this.remove(helper);
      helper.dispose();
    });
    this._updateHelpers();
  }
  dispose() {
    const { links, joints } = this;
    joints.forEach(([joint, helper]) => {
      this.remove(helper);
      helper.dispose();
    });
    joints.clear();
    links.forEach(([link, helper]) => {
      this.remove(helper);
      helper.dispose();
    });
    links.clear();
  }
};

// src/three/urdfHelpers.js
import { Euler } from "three";
import { quat as quat3 } from "gl-matrix";
var tempVec = new Float64Array(3);
var tempVec2 = new Float64Array(3);
var tempEuler4 = new Euler();
function urdfRobotToIKRoot(urdfNode, trimUnused = false, isRoot = true) {
  let rootNode = null;
  let node;
  let doReturn = true;
  if (urdfNode.isURDFRobot) {
    rootNode = new Joint();
    rootNode.name = "__world_joint__";
    rootNode.setDoF(DOF.X, DOF.Y, DOF.Z, DOF.EX, DOF.EY, DOF.EZ);
    node = new Link();
    node.name = urdfNode.name;
    rootNode.addChild(node);
  } else if (urdfNode.isURDFLink) {
    node = new Link();
    node.name = urdfNode.name;
    doReturn = !trimUnused;
  } else if (urdfNode.isURDFJoint) {
    rootNode = new Joint();
    const jointType = urdfNode.jointType;
    switch (jointType) {
      case "continuous":
      case "revolute":
      case "prismatic": {
        const link = new Link();
        rootNode.addChild(link);
        const joint = new Joint();
        joint.name = urdfNode.name;
        link.addChild(joint);
        const fixedLink = new Link();
        joint.addChild(fixedLink);
        const fixedJoint = new Joint();
        fixedLink.addChild(fixedJoint);
        tempVec[0] = 0;
        tempVec[1] = 0;
        tempVec[2] = 1;
        tempVec2[0] = urdfNode.axis.x;
        tempVec2[1] = urdfNode.axis.y;
        tempVec2[2] = urdfNode.axis.z;
        quat3.rotationTo(joint.quaternion, tempVec, tempVec2);
        quat3.invert(fixedJoint.quaternion, joint.quaternion);
        joint.setMatrixNeedsUpdate();
        fixedJoint.setMatrixNeedsUpdate();
        if (jointType === "revolute" || jointType === "continuous") {
          joint.setDoF(DOF.EZ);
        } else {
          joint.setDoF(DOF.Z);
        }
        if (jointType !== "continuous") {
          joint.setMinLimits(urdfNode.limit.lower);
          joint.setMaxLimits(urdfNode.limit.upper);
        }
        node = fixedJoint;
        break;
      }
      case "fixed": {
        node = rootNode;
        doReturn = !trimUnused;
        break;
      }
      case "planar":
      case "floating":
      default:
        console.error(`urdfRobotToIKRoot: Joint type ${jointType} not supported.`);
        doReturn = !trimUnused;
    }
  } else {
    return null;
  }
  if (!isRoot) {
    (rootNode || node).setPosition(
      urdfNode.position.x,
      urdfNode.position.y,
      urdfNode.position.z
    );
    (rootNode || node).setQuaternion(
      urdfNode.quaternion.x,
      urdfNode.quaternion.y,
      urdfNode.quaternion.z,
      urdfNode.quaternion.w
    );
  }
  const children = urdfNode.children;
  for (let i = 0, l = children.length; i < l; i++) {
    const res = urdfRobotToIKRoot(children[i], trimUnused, false);
    if (res) {
      node.addChild(res);
      doReturn = true;
    }
  }
  return !trimUnused || doReturn ? rootNode || node : null;
}
function setIKFromUrdf(ikRoot, urdfRoot) {
  ikRoot.setDoFValue(DOF.X, urdfRoot.position.x);
  ikRoot.setDoFValue(DOF.Y, urdfRoot.position.y);
  ikRoot.setDoFValue(DOF.Z, urdfRoot.position.z);
  tempEuler4.copy(urdfRoot.rotation);
  tempEuler4.reorder("ZYX");
  ikRoot.setDoFValue(DOF.EX, tempEuler4.x);
  ikRoot.setDoFValue(DOF.EY, tempEuler4.y);
  ikRoot.setDoFValue(DOF.EZ, tempEuler4.z);
  ikRoot.traverse((c) => {
    if (c.isJoint) {
      const name = c.name;
      if (name in urdfRoot.joints) {
        c.setDoFValues(urdfRoot.joints[name].angle);
      }
    }
  });
}
function setUrdfFromIK(urdfRoot, ikRoot) {
  ikRoot.updateMatrixWorld();
  urdfRoot.matrix.set(...ikRoot.matrixWorld).transpose();
  urdfRoot.matrix.decompose(
    urdfRoot.position,
    urdfRoot.quaternion,
    urdfRoot.scale
  );
  ikRoot.traverse((c) => {
    if (c.isJoint) {
      const ikJoint = c;
      const urdfJoint = urdfRoot.joints[c.name];
      if (urdfJoint) {
        if (urdfJoint.jointType === "prismatic") {
          urdfJoint.setJointValue(ikJoint.getDoFValue(DOF.Z));
        } else {
          urdfJoint.setJointValue(ikJoint.getDoFValue(DOF.EZ));
        }
      }
    }
  });
}
export {
  DOF,
  DOF_NAMES,
  Goal,
  IKRootsHelper,
  Joint,
  Link,
  SOLVE_STATUS,
  SOLVE_STATUS_NAMES,
  Solver,
  WorkerSolver,
  findRoots,
  setIKFromUrdf,
  setUrdfFromIK,
  urdfRobotToIKRoot
};

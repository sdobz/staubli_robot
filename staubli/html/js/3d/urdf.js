import { LoadingManager } from "three";
import URDFLoader from "urdf-loader/URDFLoader.js";

/** @import { URDFJoint, URDFRobot } from "urdf-loader/URDFClasses"; */

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
      
      resolve(urdfRoot)
    };
  });
}

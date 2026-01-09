import { Vector3, ArrowHelper, Mesh } from "three";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { loadRobot, loadTool, RobotControl, toolProperties } from "./robot";
import { program, programmerState, jogState } from "../program/state";
import { World } from "./world";
import { Kinematics } from "./kinematics";
import { robot } from "../staubli/robot";
import { Command, RobotState } from "../staubli/robot-types";
import { URDFRobot } from "urdf-loader";

interface DerivedState {
  command: Command;
  state: RobotState;
  robot: RobotControl;
}

const [derivedState, setDerivedState] = createSignal<DerivedState[]>([]);
export { derivedState };

interface RefObject<T> {
  current: T;
}

export const previewRobotRef: RefObject<RobotControl | null> = {
  current: null,
};

export const Robot3D = () => {
  let container!: HTMLDivElement;
  const world = new World();
  let robots: RobotControl[] = [];
  let urdfRoot: URDFRobot | undefined;
  let toolRoot: Mesh | undefined;

  const onResize = () => {
    if (!container) return;
    world.renderer.setSize(container.clientWidth, container.clientHeight);
    world.renderer.setPixelRatio(window.devicePixelRatio);
    world.camera.aspect = container.clientWidth / container.clientHeight;
    world.camera.updateProjectionMatrix();
    world.render();
  };

  const createRobot = () => {
    if (!urdfRoot || !toolRoot) {
      throw new Error("URDF or tool root not loaded");
    }
    const newRobot = new RobotControl(urdfRoot, toolRoot, world);
    newRobot.addToScene();
    return newRobot;
  };

  const updateRobots = () => {
    const currentRobotState = robot()?.state();
    const currentSequence = program;
    const currentProgrammerState = programmerState;
    const currentJogState = jogState;

    if (!currentRobotState?.position) {
      return;
    }

    if (!urdfRoot || !toolRoot) {
      return;
    }

    const previousRobots = robots;
    robots = [];
    const popRobot = () => {
      const nextRobot = previousRobots.shift() || createRobot();
      robots.push(nextRobot);
      return nextRobot;
    };

    const kinematics = new Kinematics(urdfRoot);

    const currentPosition = currentRobotState.position;
    if (!currentPosition.effector || !currentPosition.joints) {
      console.error("Missing current position");
      return;
    }

    const currentRobot = popRobot();
    if (previewRobotRef.current !== currentRobot) {
      previewRobotRef.current = currentRobot;
    }
    currentRobot.update(
      kinematics,
      currentSequence.commands.length === 0 ? "current" : "current-ghost",
      undefined,
      undefined
    );
    kinematics.applyJointPosition(currentPosition.joints, currentRobot);
    kinematics.applyEffectorPosition(currentPosition.effector, currentRobot);

    let previousRobot = currentRobot;
    let previousState = currentRobotState;
    let nextDerivedState: DerivedState[] = [];
    currentSequence.commands.forEach((currentCommand, index) => {
      let nextState = previousState;
      const robot = popRobot();

      if (currentCommand.type === "joints") {
        kinematics.applyJointPosition(currentCommand.data, robot);
        kinematics.applyEffectorFromJointPosition(robot, nextState.tool_offset);

        nextState = {
          ...nextState,
          position: {
            joints: currentCommand.data,
            effector: kinematics.determineEffectorPosition(robot),
          },
        };
      } else if (currentCommand.type === "effector") {
        kinematics.applyEffectorPosition(currentCommand.data, robot);
        kinematics.applyJointsFromEffectorPosition(
          previousRobot,
          currentCommand.data,
          nextState.tool_offset,
          robot
        );

        nextState = {
          ...nextState,
          position: {
            effector: currentCommand.data,
            joints: kinematics.determineJointPosition(robot),
          },
        };
      } else if (currentCommand.type === "tool") {
        const nextToolOffset = currentCommand.data;
        kinematics.applyJointPosition(nextState.position.joints, robot);
        // Update effector position to keep robot joints stationary for the next state
        kinematics.applyEffectorFromJointPosition(robot, nextToolOffset);

        const nextEffectorPosition =
          kinematics.determineEffectorPosition(robot);

        nextState = {
          ...nextState,
          tool_offset: nextToolOffset,
          position: {
            effector: nextEffectorPosition,
            joints: nextState.position.joints,
          },
        };
      } else if (currentCommand.type === "speed") {
        kinematics.applyJointPosition(nextState.position.joints, robot);
        kinematics.applyEffectorPosition(nextState.position.effector, robot);

        nextState = {
          ...nextState,
          speed: currentCommand.data.speed,
        };
      }
      const isSelected = index === currentProgrammerState.selectedIndex;

      robot.update(
        kinematics,
        "ghost",
        nextState.tool_offset,
        previousRobot,
        isSelected ? currentCommand.type : undefined,
        isSelected ? currentJogState : undefined
      );

      nextDerivedState.push({
        command: currentCommand,
        robot: robot,
        state: nextState,
      });

      previousRobot = robot;
      previousState = nextState;
    });

    while (previousRobots.length > 0) {
      previousRobots.pop()!.dispose();
    }

    setDerivedState(nextDerivedState);
    world.render();
  };

  onMount(() => {
    container.appendChild(world.renderer.domElement);
    window.addEventListener("resize", onResize);

    loadRobot().then((result) => {
      urdfRoot = result;
      world.fitCameraToSelection([urdfRoot]);
      updateRobots();
    });

    onResize();
    world.render();
  });

  onCleanup(() => {
    window.removeEventListener("resize", onResize);
    // any other cleanup
  });

  createEffect(() => {
    // todo: what happens if this happens in the middle of a drag?
    updateRobots();
  });

  createEffect(() => {
    const props = toolProperties();

    while (robots.length > 0) {
      robots.pop()!.dispose();
    }

    loadTool(props).then((result) => {
      toolRoot = result;
      updateRobots();
    });
  });

  return <div id="robot-3d" ref={container}></div>;
};

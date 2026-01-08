import { RobotState, Command, JointPosition, EffectorPosition, RobotInterface } from "../robot-types";
import { MotionConstraint, MotionPlan } from "../lib/motion-plan";
import { createSignal } from "../lib/state";
import { RobotControl } from "./robot";

export class RobotPreview implements RobotInterface {
  control: RobotControl;
  state: () => RobotState;
  setState: (value: RobotState) => void;
  name: string;

  constructor(control: RobotControl, initialState: RobotState) {
    this.control = control;
    const [state, setState] = createSignal<RobotState>(initialState);
    this.state = state;
    this.setState = setState;
    this.name = "preview";
  }

  async execute(command: Command) {
    switch (command.type) {
      case "joints":
        await this.#accelJoints(command.data);
        break;
      case "effector":
        await this.#accelEffector(command.data);
        break;
      case "speed":
        this.setState({
          ...this.state(),
          speed: command.data.speed,
        });
        break;
      case "tool":
        const currentState = this.state();
        this.control.kinematics.applyEffectorFromJointPosition(
          this.control,
          command.data
        );
        this.setState({
          ...currentState,
          tool_offset: command.data,
          position: {
            joints: currentState.position.joints,
            effector: this.control.kinematics.determineEffectorPosition(
              this.control
            ),
          },
        });
        break;
    }
  }

  async #accelJoints(jointPosition: JointPosition) {
    const initialState = this.state();
    const initialJoints = initialState.position.joints;

    const constraints = {
      maxAcceleration: 10,
      maxVelocity: initialState.speed * 5,
    };
    const starts = jointPositionToArray(initialJoints);
    const stops = jointPositionToArray(jointPosition);
    await this.#animatePlans(constraints, starts, stops, (positions) => {
      const currentJoints = jointPositionFromArray(positions);
      this.control.kinematics.applyJointPosition(currentJoints, this.control);
      this.control.kinematics.applyEffectorFromJointPosition(
        this.control,
        initialState.tool_offset
      );
      this.control.world.render();
    });

    this.setState({
      ...initialState,
      position: {
        effector: this.control.kinematics.determineEffectorPosition(
          this.control
        ),
        joints: jointPosition,
      },
    });
  }

  async #accelEffector(effectorPosition: EffectorPosition) {
    const initialState = this.state();
    const initialEffector = initialState.position.effector;

    const constraints = {
      maxAcceleration: 50,
      maxVelocity: initialState.speed * 25,
    };
    const starts = effectorPositionToArray(initialEffector);
    const stops = effectorPositionToArray(effectorPosition);
    await this.#animatePlans(constraints, starts, stops, (positions) => {
      const currentEffector = effectorPositionFromArray(positions);
      this.control.kinematics.applyEffectorPosition(
        currentEffector,
        this.control
      );
      this.control.kinematics.applyJointsFromEffectorPosition(
        this.control,
        currentEffector,
        initialState.tool_offset,
        this.control
      );
      this.control.world.render();
    });

    this.setState({
      ...initialState,
      position: {
        joints: this.control.kinematics.determineJointPosition(this.control),
        effector: effectorPosition,
      },
    });
  }

  #animatePlans(constraints: MotionConstraint, starts: number[], stops: number[], callback: (positions: number[]) => void) {
    const plans = MotionPlan.planSync(constraints, starts, stops);
    const duration = plans[0].totalTime();

    return new Promise<void>((resolve, reject) => {
      const startTime = performance.now();
      const finishTime = startTime + duration * 1000;

      function animate(currentTime: DOMHighResTimeStamp) {
        const planTime = (currentTime - startTime) / 1000;
        const positions = plans.map((plan) => plan.position(planTime));
        callback(positions);

        if (currentTime < finishTime) {
          requestAnimationFrame(animate);
        } else {
          callback(stops);
          resolve();
        }
      }

      animate(startTime);
    });
  }
}

function jointPositionToArray(jointPosition: JointPosition) {
  return [
    jointPosition.j1,
    jointPosition.j2,
    jointPosition.j3,
    jointPosition.j4,
    jointPosition.j5,
    jointPosition.j6,
  ];
}

function jointPositionFromArray(joints: number[]): JointPosition {
  return {
    j1: joints[0],
    j2: joints[1],
    j3: joints[2],
    j4: joints[3],
    j5: joints[4],
    j6: joints[5],
  };
}

function effectorPositionToArray(effectorPosition: EffectorPosition) {
  return [
    effectorPosition.x,
    effectorPosition.y,
    effectorPosition.z,
    effectorPosition.yaw,
    effectorPosition.pitch,
    effectorPosition.roll,
  ];
}

function effectorPositionFromArray(effector: number[]): EffectorPosition {
  return {
    x: effector[0],
    y: effector[1],
    z: effector[2],
    yaw: effector[3],
    pitch: effector[4],
    roll: effector[5],
  };
}

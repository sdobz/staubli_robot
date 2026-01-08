import { Component, createMemo, ParentComponent } from "solid-js";
import { robot, RobotApi } from "./robot";

type RobotApiNoArgMethods = {
  [K in keyof RobotApi]: RobotApi[K] extends () => void ? K : never;
}[keyof RobotApi];

export const RobotButton: ParentComponent<{
  method: RobotApiNoArgMethods;
}> = (props) => {
  function onClick() {
    const instance = robot();
    if (!instance) {
      return;
    }
    (instance as RobotApi)[props.method]();
  }

  return (
    <button class="robot-button" disabled={!robot()} onClick={onClick}>
      {props.children}
    </button>
  );
};

export const ElbowButton: Component = () => {
  const label = createMemo(() => robot()?.state()?.["elbow"] ?? "Elbow...");

  return <RobotButton method="elbow">{label()}</RobotButton>;
};

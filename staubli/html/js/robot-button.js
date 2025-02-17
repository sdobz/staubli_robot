import { createComponent, html } from "./lib/component.js";

import { robot, robotState } from "./robot.js";

createComponent({
  tag: "robot-button",
  template: html` <button class="robot-button"></button> `,
  observedAttributes: ['label'],
  stateFn: () => {
    return {};
  },
  attrsFn: ({}, attrs) => {
    const instance = robot();
    const method = attrs.method;

    function click() {
      if (!instance) {
        return;
      }
      const boundMethod = instance[method].bind(instance);
      boundMethod();
    }
    return {
      button: {
        innerHTML: attrs.label,
        properties: { disabled: !instance },
        eventListeners: { click },
      },
    };
  }
});

createComponent({
  tag: "elbow-button",
  template: html` <robot-button method="elbow" label="..."></robot-button> `,
  stateFn: () => {},
  attrsFn: (attrs) => {
    const state = robotState()?.["elbow"] || "Elbow...";
    console.log("Elbot button robot state", robotState(), state)

    return {
      "robot-button": {
        attributes: {
          label: state,
        },
      },
    };
  }
});

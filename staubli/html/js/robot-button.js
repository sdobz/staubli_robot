import { createComponent, html } from "./lib/component.js";

import { robot, robotState } from "./robot.js";

createComponent({
  tag: "robot-button",
  template: html` <button class="robot-button"></button> `,
  observedAttributes: ["method", "label"],
  attrsFn: (_state, attrs) => {
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
        attributes: { disabled: instance ? "" : "disabled" },
        properties: { innerHTML: attrs.label },
        eventListeners: { click },
      },
    };
  },
});

createComponent({
  tag: "elbow-button",
  template: html` <robot-button method="elbow" label="..."></robot-button> `,
  attrsFn: (_state, _attrs) => {
    const label = robotState()?.["elbow"] || "Elbow...";

    return {
      "robot-button": {
        attributes: {
          label,
        },
      },
    };
  },
});

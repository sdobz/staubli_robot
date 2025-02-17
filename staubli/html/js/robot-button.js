import { createComponent, html } from "./lib/component.js";

import { robot, robotState } from "./robot.js";

createComponent({
  tag: "robot-button",
  template: html` <button class="robot-button"></button> `,
  observedAttributes: ["label"],
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
  },
});

createComponent({
  tag: "elbow-button",
  template: html` <robot-button method="elbow" label="..."></robot-button> `,
  stateFn: () => {},
  attrsFn: (_state, _attrs) => {
    const label = robotState()?.["elbow"] || "Elbow...";

    return {
      "robot-button": {
        attributes: {
          label
        },
      },
    };
  },
});

createComponent({
  tag: "step-control",
  template: html`
    <div class="horizontal-stack">
      <robot-button method="minus" label="(-)"></robot-button>
      <pre id="step"></pre>
      <robot-button method="plus" label="(+)"></robot-button>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const distance = robotState()?.["distance"] || "?";

    return {
      "#step": {
        innerHTML: `${distance}mm`,
      },
    };
  },
});


createComponent({
  tag: "angle-control",
  template: html`
    <div class="horizontal-stack">
      <robot-button method="angle_minus" label="(-)"></robot-button>
      <pre id="step"></pre>
      <robot-button method="angle_plus" label="(+)"></robot-button>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const angleStep = robotState()?.["angle_step"] || "?";

    return {
      "#step": {
        innerHTML: `${angleStep}°`,
      },
    };
  },
});

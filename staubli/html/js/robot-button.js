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

createComponent({
  tag: "step-control",
  template: html`
    <div class="horizontal-stack">
      <robot-button method="minus" label="(-)"></robot-button>
      <pre class="step"></pre>
      <robot-button method="plus" label="(+)"></robot-button>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const distance = robotState()?.["distance"] || "?";

    return {
      ".step": {
        properties: { innerHTML: `${distance}mm` },
      },
    };
  },
});

createComponent({
  tag: "angle-control",
  template: html`
    <div class="horizontal-stack">
      <robot-button method="angle_minus" label="(-)"></robot-button>
      <pre class="step"></pre>
      <robot-button method="angle_plus" label="(+)"></robot-button>
    </div>
  `,
  attrsFn: (_state, _attrs) => {
    const angleStep = robotState()?.["angle_step"] || "?";

    return {
      ".step": {
        properties: { innerHTML: `${angleStep}°` },
      },
    };
  },
});

createComponent({
  tag: "sequence-position",
  observedAttributes: ["name", "current"],
  template: html` <pre></pre> `,
  attrsFn: (_state, attrs) => {
    const isCurrent = attrs.current === "true";
    return {
      pre: {
        properties: { innerHTML: attrs.name },
        attributes: { class: `${isCurrent ? "current" : ""}` },
      },
    };
  },
});

createComponent({
  tag: "sequence-control",
  template: html`
    <robot-button method="previous_position" label="<- Prev"></robot-button>
    <robot-button method="print_position" label="Append"></robot-button>
    <robot-button method="next_position" label="Next ->"></robot-button>
    <div class="vertical-stack positions"><div></div></div>
  `,
  attrsFn: (_state, _attrs) => {
    const state = robotState();
    const positions = state?.["positions"] || [];
    const positionIndex =
      state?.["positions_index"] !== undefined
        ? state?.["positions_index"]
        : -1;

    const children = positions
      .map(
        ({ name, position }, index) =>
          `<sequence-position name="${name}" current="${
            index === positionIndex
          }"></sequence-position>`
      )
      .join("\n");

    return {
      ".positions": {
        properties: { innerHTML: children },
      },
    };
  },
});

import { createComponent, html } from "./lib/component.js";
import { createSignal } from "./lib/state.js";

const counterTemplate = html` <button>SET button-text</button> `;

createComponent({
  tag: "counter-button",
  observedAttributes: ['button-text'],
  template: counterTemplate,
  stateFn: () => {
    const [count, setCount] = createSignal(0);

    return { count, setCount };
  },
  attrsFn: ({ count, setCount }, attrs) => {
    const click = () => {
      setCount(count() + 1);
    };

    return {
      button: {
        innerHTML: `${attrs["button-text"]} (${count()})`,
        eventListeners: { click },
      },
    };
  }
});

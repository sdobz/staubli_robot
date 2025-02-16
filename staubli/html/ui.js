import { createComponent, html } from "./component.js";
import { createSignal } from "./state.js";

const robotButton = html`
    <button>SET button-text</button>
`;

createComponent(
  "robot-button", robotButton,
  () => {
    const [count, setCount] = createSignal(0);

    return { count, setCount };
  },
  ({ count, setCount }, attrs) => {
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
);

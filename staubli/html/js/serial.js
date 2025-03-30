import { createComponent, html } from "./lib/component.js";
import { createSignal } from "./lib/state.js";
import { robot } from "./robot.js";

/**
 * @typedef {Object} WebsocketMessage
 * @prop {"write" | "read" | "readline"} mode
 * @prop {string} msg
 */

createComponent({
  tag: "robot-serial",
  template: html`
    <article class="overflow-auto vh30">
      <pre></pre>
      <fieldset role="group">
        <input
          class="monitor-input"
          type="text"
          placeholder="Monitor"
          aria-label="Monitor"
        />
        <button class="monitor-send">Send</button>
      </fieldset>
    </article>
  `,
  stateFn: () => {
    const socket = new WebSocket(`ws://${location.hostname}:8765`);
    /** @type readonly [() => WebsocketMessage[], (set: WebsocketMessage[]) => void] */
    const [messages, setMessages] = createSignal([]);
    socket.onmessage = (event) => {
      /** @type {WebsocketMessage} */
      const payload = JSON.parse(event.data);

      setMessages([...messages(), payload]);
    };

    const [pendingCommand, setPendingCommand] = createSignal("");
    const [busy, setBusy] = createSignal(false);

    return { messages, pendingCommand, setPendingCommand, busy, setBusy };
  },
  attrsFn: (
    { messages, pendingCommand, setPendingCommand, busy, setBusy },
    attrs,
    element
  ) => {
    let body = "";

    messages().forEach(({ mode, msg }) => {
      switch (mode) {
        case "read":
          body += msg;
          break;
        case "readline":
          body += "< " + msg + "\n";
          break;
        case "write":
          body += msg;
          break;
      }
    });

    setTimeout(() => {
      const article = element.querySelector("article");
      article.scrollTop = article.scrollHeight;
    }, 1);

    function onChangePendingCommand(e) {
      setPendingCommand(e.target.value);
    }

    function doSendCommand() {
      if (busy()) {
        return
      }
      setBusy(true);
      robot()
        .execute({
          type: "serial",
          name: "adhoc",
          data: {
            command: pendingCommand(),
          }
        })
        .then(() => {
          setPendingCommand("");
          setBusy(false);
        });
    }

    const busyDisabled = busy() ? "true" : undefined

    return {
      pre: {
        properties: { innerHTML: htmlEscape(body) },
      },
      ".monitor-input": {
        attributes: {
          disabled: busyDisabled
        },
        properties: {
          value: pendingCommand(),
        },
        eventListeners: {
          change: onChangePendingCommand,
        },
      },
      ".monitor-send": {
        attributes: {
          disabled: busyDisabled
        },
        eventListeners: {
          click: doSendCommand,
        },
      },
    };
  },
});

function htmlEscape(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
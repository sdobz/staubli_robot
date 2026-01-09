import { createMemo, createSignal, onMount } from "solid-js";
import { robot } from "./staubli/robot";

interface WebsocketMessage {
  mode: "write" | "read" | "readline";
  msg: string;
}

export function RobotSerial() {
  const [messages, setMessages] = createSignal<WebsocketMessage[]>([]);
  const [pendingCommand, setPendingCommand] = createSignal("");
  const [busy, setBusy] = createSignal(false);

  onMount(() => {
    const socket = new WebSocket(`ws://${location.hostname}:8765`);
    socket.onmessage = (event) => {
      const payload: WebsocketMessage = JSON.parse(event.data);

      setMessages([...messages(), payload]);
    };
  });

  const body = createMemo(() => {
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
    return body;
  });

  let articleRef!: HTMLElement;
  setTimeout(() => {
    articleRef.scrollTop = articleRef.scrollHeight;
  }, 1);

  function onChangePendingCommand(e: Event) {
    setPendingCommand((e.target as HTMLInputElement).value);
  }

  function onKeypress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      onChangePendingCommand(e);
      doSendCommand();
    }
  }

  function doSendCommand() {
    if (busy()) {
      return;
    }
    setBusy(true);
    robot()
      ?.execute({
        type: "serial",
        name: "adhoc",
        data: {
          command: pendingCommand(),
        },
      })
      .then(() => {
        setPendingCommand("");
        setBusy(false);
      });
  }

  return (
    <article class="overflow-auto vh30" ref={articleRef}>
      <pre>{body()}</pre>
      <fieldset role="group">
        <input
          class="monitor-input"
          type="text"
          disabled={busy()}
          value={pendingCommand()}
          onChange={onChangePendingCommand}
          onKeyPress={onKeypress}
          placeholder="Monitor"
          aria-label="Monitor"
        />
        <button class="monitor-send" disabled={busy()} onClick={doSendCommand}>
          Send
        </button>
      </fieldset>
    </article>
  );
}

// function htmlEscape(text) {
//   return String(text)
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#39;");
// }

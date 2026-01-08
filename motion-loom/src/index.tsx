/* @refresh reload */
import { render } from "solid-js/web";
import "solid-devtools";

import "./vendor/pico.amber.css";
import "../node_modules/normalize.css/normalize.css";
import "./index.css";
import App from "./App";
import { robotApi } from "./staubli/robot";
import { createEffect } from "solid-js";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <App />, root!);
createEffect(() => {
  console.log(robotApi.state());
});

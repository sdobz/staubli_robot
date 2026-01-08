import { esbuildPlugin } from "@web/dev-server-esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import proxy from "koa-proxies";
import { fileURLToPath } from "url";

import tsconfig from "./tsconfig.json" assert { type: "json" };
const { jsx, jsxImportSource, target } = tsconfig.compilerOptions;

/** @type {import("@web/dev-server").DevServerConfig} */
export default {
  appIndex: "index.html",
  port: 8008,
  middleware: [
    proxy("/api/", {
      target: "http://localhost:8000/",
    }),
  ],
  watch: true,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      tsx: true,
      tsconfig: fileURLToPath(new URL("./tsconfig.json", import.meta.url)),
      plugins: [solidPlugin()],
      jsx,
      jsxImportSource,
      target,
      esbuildOptions: {},
    }),
  ],
};

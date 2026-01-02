#!/usr/bin/env node
import esbuild from "esbuild";
import htmlPlugin from "@chialab/esbuild-plugin-html";
import { copy } from "esbuild-plugin-copy";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browserDir = __dirname;
const outDir = path.resolve(browserDir, "..", "staubli", "html");
const entry = path.join(browserDir, "index.html");

console.log("Building", entry, "->", outDir);

try {
  await esbuild.build({
    tsconfig: path.join(browserDir, "tsconfig.json"),
    entryPoints: [entry],
    bundle: true,
    outdir: outDir,
    minify: true,
    plugins: [
      htmlPlugin(),
      copy({
        assets: [
          { from: ['./urdf/**/*.stl'], to: ['./urdf'], },
          { from: ['./urdf/**/*.json'], to: ['./urdf'], },
          { from: ['./urdf/**/*.urdf'], to: ['./urdf'], },
        ],
      }),
    ],
    loader: { ".js": "js", ".ts": "ts" },
    target: ["es2022"],
    absWorkingDir: browserDir,
  });
  console.log("Build completed");
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
}

import type { Component } from "solid-js";

// import logo from "./logo.svg";
// import styles from "./App.module.css";
import { ElbowButton, RobotButton } from "./staubli/robot-button";
import { ProgramList } from "./program/program-list";
import { CommandEdit, ProgramEdit } from "./program/edit";
import { PlaybackControl } from "./program/playback";
import { CommandList } from "./program/command-list";
import { CommandEditor } from "./program/command-editor";
import { Robot3D } from "./3d/viewport";
import { RobotSerial } from "./serial";

const App: Component = () => {
  return (
    <main>
      <div class="grid vh70 overflow-auto">
        <div class="vertical-stack">
          <article class="vertical-stack">
            <h1>Program</h1>
            <ProgramList />
            <ProgramEdit />
            <PlaybackControl />
            <CommandList />
            <CommandEdit />
          </article>
          <article>
            <h2>Control</h2>
            <div role="group">
              <ElbowButton />
              <RobotButton method="flail">Flail</RobotButton>
              <RobotButton method="reset">Reset</RobotButton>
            </div>
          </article>
        </div>
        <Robot3D />
        <div class="vertical-stack">
          <CommandEditor />
        </div>
      </div>
      <RobotSerial />
    </main>
  );
};

export default App;

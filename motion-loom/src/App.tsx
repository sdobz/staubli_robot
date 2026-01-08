import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { ElbowButton, RobotButton } from "./staubli/robot-button";

// import "./counter";
// import "./robot-button";
// import "./3d/viewport";
// import "./program/command-editor";
// import "./program/command-list";
// import "./program/playback";
// import "./program/program-list";
// import "./program/edit";
// import "./serial";
// import { robotApi } from "./robot";

// robotApi.load();

// <div class="grid vh70 overflow-auto">
//       <div class="vertical-stack">
//         <article class="vertical-stack">
//           <h1>Program</h1>
//           <program-list></program-list>
//           <program-edit></program-edit>
//           <playback-control></playback-control>
//           <command-list></command-list>
//           <command-edit></command-edit>
//         </article>
//         <article>
//           <h2>Control</h2>
//           <div role="group">
//             <elbow-button></elbow-button>
//             <robot-button method="flail" label="Flail"></robot-button>
//             <robot-button method="reset" label="Reset"></robot-button>
//           </div>
//         </article>
//       </div>
//       <robot-3d></robot-3d>
//       <div class="vertical-stack">
//         <command-editor></command-editor>
//       </div>
//     </div>
//     <robot-serial></robot-serial>

const App: Component = () => {
  return (
    <div class="grid vh70 overflow-auto">
      {/* <div class="vertical-stack">
         <article class="vertical-stack">
           <h1>Program</h1>
           <program-list></program-list>
           <program-edit></program-edit>
           <playback-control></playback-control>
           <command-list></command-list>
           <command-edit></command-edit>
         </article> */}
      <article>
        <h2>Control</h2>
        <div role="group">
          <ElbowButton />
          <RobotButton method="flail">Flail</RobotButton>
          <RobotButton method="reset">Reset</RobotButton>
        </div>
      </article>
      {/*   <robot-3d></robot-3d>
        <div class="vertical-stack">
          <command-editor></command-editor>
        </div> */}
    </div>
    //  <robot-serial></robot-serial>
  );
};

export default App;

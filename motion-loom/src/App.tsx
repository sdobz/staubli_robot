import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

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
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;

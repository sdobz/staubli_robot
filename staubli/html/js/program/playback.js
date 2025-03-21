import { robot, robotApi, setRobot } from "../robot.js";
import { createEffect } from "../lib/state.js";
import { program, programmerState, setProgrammerState } from "./state.js";
import { createComponent, html } from "../lib/component.js";
import { RobotPreview } from "../3d/preview.js";
import { previewRobotControl } from "../3d/viewport.js";

/** @import { PlaybackEnum, ProgrammerState } from "./state.js" */

createEffect(() => {
  const initialProgram = program();
  const initialState = programmerState();
  const currentRobot = robot();

  if (initialState.playback !== "play" && initialState.playback !== "jog") {
    return;
  }

  if (initialState.busy) {
    return;
  }

  if (!currentRobot) {
    return;
  }

  if (initialProgram.commands.length === 0) {
    return;
  }

  const nextIndex = initialState.selectedIndex;
  const nextCommand = initialProgram.commands[nextIndex];

  if (!nextCommand) {
    setProgrammerState({
      ...initialState,
      playback: "stopped",
      busy: false,
    });
    return;
  }

  /** @type {ProgrammerState} */
  const busyState = {
    ...initialState,
    busy: true,
  };
  setProgrammerState(busyState);

  currentRobot.execute(nextCommand).then(() => {
    const newSequence = program();
    const newState = programmerState();

    const stateChangedWhileWaiting =
      newSequence !== initialProgram || newState !== busyState;
    const isJog = newState.playback === "jog";
    const loopOver = nextIndex >= newSequence.commands.length - 1;

    if (stateChangedWhileWaiting || isJog || loopOver) {
      setProgrammerState({
        ...newState,
        playback: "stopped",
        busy: false,
      });
    } else {
      const loopedIndex = (nextIndex + 1) % newSequence.commands.length;
      setProgrammerState({
        ...newState,
        selectedIndex: loopedIndex,
        busy: false,
      });
    }
  });
});

createComponent({
  tag: "playback-control",
  template: html`
    <div class="horizontal-stack">
    <label>
      <input type="checkbox" name="preview" class="sequence-preview" />
      Preview
    </label>
    <div role="group">
      <button class="sequence-jog">jog</button>
      <button class="sequence-play">play</button>
      <button class="sequence-stop">stop</button>
    </div>
    </div>
  `,
  attrsFn: () => {
    const currentState = programmerState();
    const currentSequence = program();
    const currentRobot = robot()
    const currentPreviewRobot = previewRobotControl()

    const isPreview = currentRobot.name === "preview"
    function doTogglePreview() {
      if (isPreview) {
        setRobot(robotApi)
      } else {
        setRobot(new RobotPreview(currentPreviewRobot, currentRobot.state()))
      }
    }

    /**
     * @param {PlaybackEnum} playback
     */
    function makePlaybackHandler(playback) {
      return () => {
        if (isBusy) return;

        setProgrammerState({
          ...currentState,
          playback,
        });
      };
    }

    const doPlay = makePlaybackHandler("play");
    const doStop = makePlaybackHandler("stopped");
    const doJog = makePlaybackHandler("jog");

    const isEmpty = currentSequence.commands.length === 0;
    const isBusy = currentState.busy;
    const busyDisabled = isBusy ? "true" : undefined;
    const emptyDisabled = isEmpty ? "true" : undefined;
    const selectedDisabled = !currentSequence.commands[
      currentState.selectedIndex
    ]
      ? "true"
      : undefined;
    return {
      ".sequence-play": {
        attributes: {
          disabled: emptyDisabled || busyDisabled,
        },
        eventListeners: {
          click: doPlay,
        },
      },
      ".sequence-jog": {
        attributes: {
          disabled: emptyDisabled || busyDisabled || selectedDisabled,
        },
        eventListeners: {
          click: doJog,
        },
      },
      ".sequence-stop": {
        attributes: {
          disabled: emptyDisabled || busyDisabled,
        },
        eventListeners: {
          click: doStop,
        },
      },
      ".sequence-preview": {
        attributes: {
          disabled: busyDisabled,
          checked: isPreview ? "checked" : undefined
        },
        eventListeners: {
          change: doTogglePreview,
        },
      },
    };
  },
});

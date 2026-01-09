import { robot, robotApi, setRobot } from "../program-old/robot";
import { createEffect } from "solid-js";
import { JSX } from "solid-js";
import {
  PlaybackEnum,
  program,
  ProgrammerState,
  programmerState,
  setProgrammerState,
} from "./state";
import { RobotPreview } from "../3d/preview";
import { previewRobotRef } from "../3d/viewport";

createEffect(() => {
  const initialProgram = program;
  const initialState = programmerState;
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
    setProgrammerState({ ...initialState, playback: "stopped", busy: false });
    return;
  }

  const busyState: ProgrammerState = { ...initialState, busy: true };
  setProgrammerState(busyState);

  currentRobot.execute(nextCommand).then(() => {
    const newSequence = program;
    const newState = programmerState;

    const stateChangedWhileWaiting =
      newSequence !== initialProgram || newState !== busyState;
    const isJog = newState.playback === "jog";
    const loopOver = nextIndex >= newSequence.commands.length - 1;

    if (stateChangedWhileWaiting || isJog || loopOver) {
      setProgrammerState({ ...newState, playback: "stopped", busy: false });
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

export function PlaybackControl() {
  const currentState = programmerState;
  const currentSequence = program;
  const currentRobot = robot();
  const currentPreviewRobot = previewRobotRef.current;

  const isPreview = currentRobot?.name === "preview";
  function doTogglePreview() {
    if (isPreview) {
      setRobot(robotApi);
    } else if (currentPreviewRobot !== null) {
      const previewState = currentRobot?.state();
      if (previewState) {
        setRobot(new RobotPreview(currentPreviewRobot, previewState));
      }
    }
  }

  function makePlaybackHandler(playback: PlaybackEnum) {
    return () => {
      if (currentState.busy && playback !== "stopped") return;
      setProgrammerState({ ...currentState, playback });
    };
  }

  const doPlay = makePlaybackHandler("play");
  const doStop = makePlaybackHandler("stopped");
  const doJog = makePlaybackHandler("jog");

  const isEmpty = currentSequence.commands.length === 0;

  return (
    <div class="horizontal-stack">
      <label>
        <input
          type="checkbox"
          name="preview"
          class="sequence-preview"
          checked={isPreview}
          disabled={currentState.busy}
          onChange={doTogglePreview}
        />
        Preview
      </label>
      <div role="group">
        <button
          class="sequence-jog"
          disabled={
            isEmpty ||
            currentState.busy ||
            !currentSequence.commands[currentState.selectedIndex]
          }
          onClick={doJog}
        >
          jog
        </button>
        <button
          class="sequence-play"
          disabled={isEmpty || currentState.busy}
          onClick={doPlay}
        >
          play
        </button>
        <button
          class="sequence-stop"
          disabled={isEmpty || currentState.playback === "stopped"}
          onClick={doStop}
        >
          stop
        </button>
      </div>
    </div>
  );
}

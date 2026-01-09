import { createEffect } from "solid-js";

export function bindParam(
  param: string,
  paramSignal: () => string,
  setParamSignal: (set: string) => void
) {
  const initialSignal = paramSignal();
  const initialParam = new URLSearchParams(window.location.search).get(param);
  if (initialSignal !== initialParam) {
    setParamSignal(initialParam || "");
  }

  window.addEventListener("popstate", (event) => {
    const popSignal = paramSignal();
    const popParam = new URLSearchParams(window.location.search).get(param);
    if (popSignal !== popParam) {
      setParamSignal(popParam || "");
    }
  });

  createEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const currentSignal = paramSignal();
    const currentParam = currentParams.get(param);
    if (currentSignal === currentParam) {
      return;
    }

    const url = new URL(window.location.toString());
    url.searchParams.set(param, currentSignal);
    history.pushState(null, "", url);
  });
}

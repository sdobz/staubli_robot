import { createEffect } from "./state.js";

/**
 * @param {string} param - url query parameter
 * @param {() => string} paramSignal - get url query parameter
 * @param {(set: string) => void} setParamSignal - update url query parameter
 */
export function bindParam(param, paramSignal, setParamSignal) {
  const initialSignal = paramSignal();
  const initialParam = new URLSearchParams(window.location.search).get(param);
  if (initialSignal !== initialParam) {
    setParamSignal(initialParam);
  }

  window.addEventListener("popstate", (event) => {
    const popSignal = paramSignal();
    const popParam = new URLSearchParams(window.location.search).get(param);
    if (popSignal !== popParam) {
      setParamSignal(popParam);
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

import { useState } from "react";

function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    const arr = history;

    if (replace) {
      arr.pop();
    }

    arr.push(newMode);
    setHistory(arr);
    setMode(newMode);
  }

  function back () {
    if (mode === initial) {
      return;
    }

    const arr = history;
    arr.pop();
    setHistory(arr);
    setMode(arr[arr.length - 1]);
  }

  return {
    mode,
    transition,
    back,
  };
}

export default useVisualMode;

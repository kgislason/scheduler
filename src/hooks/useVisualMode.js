import { useState } from "react";

function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    const newHistory = [...history];

    if (replace) {
      newHistory.pop();
    }

    newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newMode);
  }

  function back () {
    if (mode === initial) {
      return;
    }

    const newHistory = [...history].pop();
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  }

  return {
    mode,
    transition,
    back,
  };
}

export default useVisualMode;

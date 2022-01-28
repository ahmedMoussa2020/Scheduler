import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (newMode, skip = false) => {
    setMode(newMode);

    if (!skip) {
      setHistory(prevArray => [...prevArray, newMode]);
    }
  };

  const back = () => {
    // Cannot go back past initial element
    if (history.length === 1) return;

    setHistory(prevArray => {
      prevArray.pop();
      setMode(prevArray[prevArray.length - 1]);
      return prevArray;
    });
  };

  return { mode, transition, back };
}
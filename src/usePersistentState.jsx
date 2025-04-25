import { useState, useEffect } from 'react';

export function usePersistentState(key, initialState) {
  const prefixedKey = 'use-persistent-state-' + key
  // read key from local storage if not found use default value
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(prefixedKey);
    if (storedValue === null) {
      if (typeof initialState === 'function') {
        return initialState();
      } else {
        return initialState;
      }
    } else {
      return JSON.parse(storedValue);
    }
  });
  // update local storage when value changes
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);
  return [value, setValue];
}
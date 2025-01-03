import { useState, useEffect } from "react";

// Access the global localStorage object, provided by JS,
// through Web Storage API

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
      const currentValue = localStorage.getItem(key);
  
      if (currentValue) {
        return JSON.parse(currentValue);
      } else {
        return defaultValue;
      }
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  };

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
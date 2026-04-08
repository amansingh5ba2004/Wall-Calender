import { useState, useEffect } from "react";

const STORAGE_KEY = "wc-notes";

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const saveNote = (key, value) => {
    setNotes((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return { notes, saveNote };
}

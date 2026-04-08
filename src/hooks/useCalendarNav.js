import { useState, useCallback } from "react";

export function useCalendarNav() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [imageIdx, setImageIdx] = useState(today.getMonth());
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(1);

  const navigate = useCallback(
    (dir) => {
      if (isFlipping) return;
      setFlipDir(dir);
      setIsFlipping(true);

      setTimeout(() => {
        setViewMonth((prev) => {
          const nm = prev + dir;
          if (nm > 11) {
            setViewYear((y) => y + 1);
            return 0;
          }
          if (nm < 0) {
            setViewYear((y) => y - 1);
            return 11;
          }
          return nm;
        });

        setImageIdx((prev) => {
          const ni = prev + dir;
          if (ni > 11) return 0;
          if (ni < 0) return 11;
          return ni;
        });

        setIsFlipping(false);
      }, 340);
    },
    [isFlipping]
  );

  return { viewYear, viewMonth, imageIdx, setImageIdx, isFlipping, flipDir, navigate };
}

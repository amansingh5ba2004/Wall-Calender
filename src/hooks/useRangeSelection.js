import { useState, useCallback } from "react";
import { dateKey } from "../utils/calendarUtils";

export function useRangeSelection() {
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDay, setHoverDay] = useState(null);

  const handleDayClick = useCallback(
    (year, month, day, onNoteKeyChange) => {
      const d = { year, month, day };
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(d);
        setRangeEnd(null);
        onNoteKeyChange?.(`range-${dateKey(year, month, day)}`);
      } else {
        setRangeEnd(d);
      }
    },
    [rangeStart, rangeEnd]
  );

  const clearRange = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDay(null);
  }, []);

  return {
    rangeStart,
    rangeEnd,
    hoverDay,
    setHoverDay,
    handleDayClick,
    clearRange,
  };
}

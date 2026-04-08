import React, { useRef } from "react";
import styles from "../styles/NotesPanel.module.css";
import { MONTHS } from "../constants";
import { dateKey } from "../utils/calendarUtils";

export default function NotesPanel({
  viewYear,
  viewMonth,
  rangeStart,
  rangeEnd,
  noteKey,
  activeNote,
  onNoteChange,
  onNoteKeyChange,
  accentColor,
}) {
  const textareaRef = useRef(null);

  const monthKey = `month-${viewYear}-${viewMonth}`;
  const rangeTabKey = rangeStart
    ? `range-${dateKey(viewYear, viewMonth, rangeStart.day)}`
    : null;

  const isMonthTab = noteKey.startsWith("month");
  const isRangeTab = noteKey.startsWith("range");

  const placeholder =
    rangeStart && rangeEnd
      ? `Notes for ${rangeStart.day}–${rangeEnd.day} ${MONTHS[viewMonth]}...`
      : `Notes for ${MONTHS[viewMonth]} ${viewYear}...`;

  const hint =
    rangeStart && !rangeEnd
      ? "Now click an end date →"
      : rangeStart && rangeEnd
      ? "✓ Range selected · click to add range notes"
      : "Click a date to start a range selection";

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesTitle}>Notes</div>

      {rangeStart && rangeEnd && (
        <>
          <div className={styles.rangeInfo} style={{ color: accentColor }}>
            {rangeStart.day}–{rangeEnd.day} {MONTHS[viewMonth].slice(0, 3)}
          </div>
          <div className={styles.noteTabRow}>
            <button
              className={`${styles.noteTab} ${isMonthTab ? styles.active : ""}`}
              style={{ "--accent": accentColor }}
              onClick={() => onNoteKeyChange(monthKey)}
            >
              Month
            </button>
            <button
              className={`${styles.noteTab} ${isRangeTab ? styles.active : ""}`}
              style={{ "--accent": accentColor }}
              onClick={() => rangeTabKey && onNoteKeyChange(rangeTabKey)}
            >
              Range
            </button>
          </div>
        </>
      )}

      <textarea
        ref={textareaRef}
        className={styles.notesTextarea}
        value={activeNote}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder={placeholder}
      />

      <div className={styles.notesHint}>{hint}</div>
    </div>
  );
}

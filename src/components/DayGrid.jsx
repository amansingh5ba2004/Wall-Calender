import React from "react";
import styles from "../styles/DayGrid.module.css";
import { DAYS, HOLIDAYS } from "../constants";
import { isSameDay, isBetween, isEndpoint } from "../utils/calendarUtils";

function getDayState(cell, viewYear, viewMonth, rangeStart, rangeEnd, hoverDay) {
  if (!cell.current) return "ghost";
  const d = { year: viewYear, month: viewMonth, day: cell.day };
  const hov = hoverDay ? { year: viewYear, month: viewMonth, day: hoverDay } : null;
  const effectiveEnd = rangeEnd || (rangeStart && !rangeEnd && hov ? hov : null);
  if (isEndpoint(d, rangeStart, effectiveEnd)) return "endpoint";
  if (isBetween(d, rangeStart, effectiveEnd)) return "range";
  return "normal";
}

export default function DayGrid({
  cells,
  viewYear,
  viewMonth,
  rangeStart,
  rangeEnd,
  hoverDay,
  onDayClick,
  onDayEnter,
  onDayLeave,
  accentColor,
  textColor,
}) {
  const today = new Date();

  const isToday = (day) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const holiday = (day) => HOLIDAYS[`${viewMonth + 1}-${day}`];

  return (
    <div className={styles.gridSection}>
      {/* Day headers */}
      <div className={styles.dayHeaders}>
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`${styles.dayHeader} ${i >= 5 ? styles.weekend : ""}`}
            style={{ "--accent": accentColor }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className={styles.dayGrid}>
        {cells.map((cell, idx) => {
          const colIdx = idx % 7;
          const isWeekend = colIdx === 5 || colIdx === 6;
          const state = getDayState(cell, viewYear, viewMonth, rangeStart, rangeEnd, hoverDay);
          const hol = cell.current ? holiday(cell.day) : null;

          const classList = [
            styles.dayCell,
            !cell.current ? styles.ghost : "",
            cell.current && isToday(cell.day) ? styles.today : "",
            cell.current && isWeekend && state !== "endpoint" ? styles.weekendDay : "",
            state === "endpoint" ? styles.endpoint : "",
            state === "range" ? styles.range : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={idx}
              className={classList}
              style={{ "--accent": accentColor, "--text": textColor }}
              onClick={() => cell.current && onDayClick(cell.day)}
              onMouseEnter={() => cell.current && onDayEnter(cell.day)}
              onMouseLeave={onDayLeave}
              title={hol || ""}
            >
              <span className={styles.dayNum}>{cell.day}</span>
              {hol && cell.current && <div className={styles.holidayDot} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

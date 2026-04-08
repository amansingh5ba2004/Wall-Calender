import React, { useState, useEffect } from "react";
import styles from "../styles/WallCalendar.module.css";

import { THEMES, HERO_IMAGES } from "../constants";
import { buildCells, dateKey } from "../utils/calendarUtils";
import { useCalendarNav } from "../hooks/useCalendarNav";
import { useNotes } from "../hooks/useNotes";
import { useRangeSelection } from "../hooks/useRangeSelection";

import HeroSection from "./HeroSection";
import DayGrid from "./DayGrid";
import NotesPanel from "./NotesPanel";
import ImagePicker from "./ImagePicker";
import ControlsStrip from "./ControlsStrip";

export default function WallCalendar() {
  const { viewYear, viewMonth, imageIdx, setImageIdx, isFlipping, flipDir, navigate } =
    useCalendarNav();

  const { notes, saveNote } = useNotes();
  const { rangeStart, rangeEnd, hoverDay, setHoverDay, handleDayClick, clearRange } =
    useRangeSelection();

  const [theme, setTheme] = useState("blue");
  const [showImagePicker, setShowImagePicker] = useState(false);

  const [noteKey, setNoteKey] = useState(`month-${viewYear}-${viewMonth}`);
  const [activeNote, setActiveNote] = useState("");

  // Sync noteKey when month changes
  useEffect(() => {
    setNoteKey(`month-${viewYear}-${viewMonth}`);
  }, [viewYear, viewMonth]);

  // Sync activeNote when noteKey or notes change
  useEffect(() => {
    setActiveNote(notes[noteKey] || "");
  }, [noteKey, notes]);

  const t = THEMES[theme];
  const heroImg = HERO_IMAGES[imageIdx % 12];
  const cells = buildCells(viewYear, viewMonth);

  const handleNoteChange = (val) => {
    setActiveNote(val);
    saveNote(noteKey, val);
  };

  const handleClear = () => {
    clearRange();
    setNoteKey(`month-${viewYear}-${viewMonth}`);
  };

  const handleDayClickWrapper = (day) => {
    handleDayClick(viewYear, viewMonth, day, setNoteKey);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <div
        className={styles.calRoot}
        style={{
          "--accent": t.accent,
          "--accent2": t.accent2,
          "--bg": t.bg,
          "--text": t.text,
        }}
      >
        {/* Spiral binding */}
        <div className={styles.spiral}>
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={styles.spiralRing} />
          ))}
        </div>

        {/* Image picker overlay */}
        {showImagePicker && (
          <ImagePicker
            currentIdx={imageIdx}
            onSelect={setImageIdx}
            onClose={() => setShowImagePicker(false)}
          />
        )}

        {/* Hero + Calendar body */}
        <HeroSection
          heroImg={heroImg}
          viewYear={viewYear}
          viewMonth={viewMonth}
          isFlipping={isFlipping}
          flipDir={flipDir}
          onNavigate={navigate}
          onOpenPicker={() => setShowImagePicker(true)}
        />

        <div className={styles.calBody}>
          <DayGrid
            cells={cells}
            viewYear={viewYear}
            viewMonth={viewMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            hoverDay={hoverDay}
            onDayClick={handleDayClickWrapper}
            onDayEnter={setHoverDay}
            onDayLeave={() => setHoverDay(null)}
            accentColor={t.accent}
            textColor={t.text}
          />

          <NotesPanel
            viewYear={viewYear}
            viewMonth={viewMonth}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            noteKey={noteKey}
            activeNote={activeNote}
            onNoteChange={handleNoteChange}
            onNoteKeyChange={setNoteKey}
            accentColor={t.accent}
          />
        </div>

        {/* Theme + clear controls */}
        <ControlsStrip
          theme={theme}
          onThemeChange={setTheme}
          onClear={handleClear}
        />
      </div>
    </>
  );
}

import React from "react";
import styles from "../styles/HeroSection.module.css";
import { MONTHS } from "../constants";

export default function HeroSection({
  heroImg,
  viewYear,
  viewMonth,
  isFlipping,
  flipDir,
  onNavigate,
  onOpenPicker,
}) {
  return (
    <div
      className={`${styles.pageWrap} ${isFlipping ? styles.flipping : ""}`}
      style={{
        "--flip-dir": flipDir > 0 ? "-1" : "1",
      }}
    >
      <div
        className={styles.hero}
        onClick={onOpenPicker}
        title="Click to change photo"
      >
        <div className={styles.heroOverlay} />
        <img src={heroImg.url} alt={heroImg.label} className={styles.heroImg} />
        <div className={styles.heroLabel}>📷 {heroImg.label}</div>

        <button
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(-1);
          }}
          aria-label="Previous month"
        >
          ‹
        </button>
        <button
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(1);
          }}
          aria-label="Next month"
        >
          ›
        </button>

        <div className={styles.heroBadge}>
          <div className={styles.year}>{viewYear}</div>
          <div className={styles.monthName}>{MONTHS[viewMonth]}</div>
        </div>
      </div>
    </div>
  );
}

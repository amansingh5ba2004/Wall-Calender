import React from "react";
import styles from "../styles/ControlsStrip.module.css";
import { THEMES } from "../constants";

export default function ControlsStrip({ theme, onThemeChange, onClear }) {
  return (
    <div className={styles.strip}>
      <div className={styles.themeDots}>
        <span className={styles.themeLabel}>Theme</span>
        {Object.entries(THEMES).map(([name, vals]) => (
          <div
            key={name}
            className={`${styles.dot} ${theme === name ? styles.active : ""}`}
            style={{ background: vals.accent }}
            onClick={() => onThemeChange(name)}
            title={name}
          />
        ))}
      </div>
      <button className={styles.clearBtn} onClick={onClear}>
        ✕ Clear selection
      </button>
    </div>
  );
}

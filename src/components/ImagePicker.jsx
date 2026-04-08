import React from "react";
import styles from "../styles/ImagePicker.module.css";
import { HERO_IMAGES } from "../constants";

export default function ImagePicker({ currentIdx, onSelect, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.title}>Choose Your Photo</div>
      <div className={styles.grid}>
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className={`${styles.thumb} ${i === currentIdx ? styles.selected : ""}`}
            onClick={() => {
              onSelect(i);
              onClose();
            }}
          >
            <img src={img.url} alt={img.label} loading="lazy" />
            <div className={styles.thumbLabel}>{img.label}</div>
          </div>
        ))}
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </div>
  );
}

"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Phase 1a: Name fades in
      tl.to(nameRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Phase 1b: Counter animates 0 → 100
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(counterObj.value);
            if (counterRef.current) {
              counterRef.current.textContent = val.toString().padStart(3, "0");
            }
            if (progressRef.current) {
              progressRef.current.style.width = `${val}%`;
            }
          },
        },
        "-=0.3",
      );

      // Brief hold at 100%
      tl.to({}, { duration: 0.3 });

      // Phase 2: Name and counter fade out
      tl.to([nameRef.current, counterRef.current?.parentElement], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
      });

      // Phase 2b: Curtain slides up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        onStart: () => setIsExiting(true),
        onComplete: () => {
          onComplete();
        },
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className={styles.preloaderOverlay}
      style={{ display: isExiting ? undefined : undefined }}
    >
      {/* Corner markers */}
      <div className={`${styles.cornerMarker} ${styles.cornerTL}`} />
      <div className={`${styles.cornerMarker} ${styles.cornerTR}`} />
      <div className={`${styles.cornerMarker} ${styles.cornerBL}`} />
      <div className={`${styles.cornerMarker} ${styles.cornerBR}`} />

      {/* Accent lines */}
      <div className={`${styles.accentLine} ${styles.accentLineLeft}`} />
      <div className={`${styles.accentLine} ${styles.accentLineRight}`} />

      {/* Name */}
      <div ref={nameRef} className={styles.preloaderName}>
        Prince Nogia
      </div>

      {/* Counter */}
      <div className={styles.counterWrapper}>
        <span ref={counterRef} className={styles.counter}>
          000
        </span>
        <span className={styles.counterPercent}>%</span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBarContainer}>
        <div ref={progressRef} className={styles.progressBar} />
      </div>
    </div>
  );
}

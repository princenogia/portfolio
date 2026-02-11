"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Section3D.module.css";

interface Section3DProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Custom scale at exit (default 0.92) */
  exitScale?: number;
  /** Custom rotateX at exit in degrees (default 8) */
  exitRotateX?: number;
  /** Custom perspective in px (default 1200) */
  perspective?: number;
  /** Whether this is the last section — skips exit animation */
  isLast?: boolean;
  style?: React.CSSProperties;
}

export default function Section3D({
  children,
  id,
  className,
  exitScale = 0.92,
  exitRotateX = 8,
  perspective = 1200,
  isLast = false,
  style,
}: Section3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 3D exit animation — triggers in the last 20% of scroll
  const scale = useTransform(
    scrollYProgress,
    [0.7, 1],
    [1, isLast ? 1 : exitScale],
  );
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, isLast ? 1 : 0]);
  const rotateX = useTransform(
    scrollYProgress,
    [0.7, 1],
    ["0deg", isLast ? "0deg" : `${exitRotateX}deg`],
  );
  const filter = useTransform(
    scrollYProgress,
    [0.75, 1],
    ["blur(0px)", isLast ? "blur(0px)" : "blur(8px)"],
  );
  const y = useTransform(
    scrollYProgress,
    [0.7, 1],
    ["0%", isLast ? "0%" : "15%"],
  );

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`${styles.section3d} ${className || ""}`}
      style={{
        scale,
        opacity,
        rotateX,
        filter,
        y,
        transformPerspective: `${perspective}px`,
        transformOrigin: "bottom center",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";
import styles from "./Hero.module.css";
import React from "react";
import { Download } from "lucide-react";
import { useLenis } from "lenis/react";
import SocialIcons from "../ui/SocialIcons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const DESIGNATIONS = [
  "Full Stack Developer",
  "React Native Developer",
  "Data Analyst",
];

const TextRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DESIGNATIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className={styles.typewriterWrapper} layout>
      <motion.span className={styles.designationStatic} layout>
        I am a{" "}
      </motion.span>
      <motion.div
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={styles.rotatingTextContainer}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.designationDynamic}
          >
            {DESIGNATIONS[index]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Staggered reveal variants for hero content
const revealVariants = {
  hidden: { y: 60, opacity: 0, filter: "blur(6px)" },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // custom cubic-bezier for premium feel
    },
  }),
};

interface HeroProps {
  isRevealed?: boolean;
}

export default function Hero({ isRevealed = false }: HeroProps) {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  // Opacity stays 1 until 700px, then fades to 0 by 1000px
  const opacity = useTransform(scrollY, [0, 700, 1000], [1, 1, 0]);
  // Scale goes down to 0.5 to look like it's moving far back
  const scale = useTransform(scrollY, [0, 1000], [1, 0.5]);
  // Border radius increases significantly to look like a card/object
  const borderRadius = useTransform(scrollY, [0, 1000], ["0px", "100px"]);
  const y = useTransform(scrollY, [0, 1000], [0, 200]); // Increased parallax shift

  const animationState = isRevealed ? "visible" : "hidden";

  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "processing" | "downloaded"
  >("idle");

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (downloadStatus === "processing") {
      e.preventDefault();
      return;
    }
    if (downloadStatus === "downloaded") return; // Allow re-download? Maybe just let it be

    e.preventDefault(); // Stop immediate download
    setDownloadStatus("processing");

    // Simulate processing
    setTimeout(() => {
      setDownloadStatus("downloaded");

      // Trigger actual download
      const link = document.createElement("a");
      link.href = "/Prince_Nogia_Resume.pdf";
      link.download = "Prince_Nogia_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset after a while?
      setTimeout(() => {
        setDownloadStatus("idle");
      }, 5000);
    }, 2000);
  };

  const scrollToContact = () => {
    if (lenis) {
      lenis.scrollTo("#contact", {
        offset: 0,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      id="home"
      className={styles.heroContainer}
      style={{ opacity, scale, borderRadius, y }}
    >
      <div className={styles.heroWrapper}>
        <section className={styles.heroSection}>
          {/* Animated Background */}
          <div className={styles.heroBg}>
            <div className={styles.skyGrid} />
            <div className={styles.retroSun} />
            <div className={styles.horizonGlow} />
            <div className={styles.glowOrb1} />
            <div className={styles.glowOrb2} />
            <div className={styles.gridOverlay} />
          </div>
          <div className={styles.contentWrapper}>
            {/* Centered Text Content */}
            <div className={styles.textContent}>
              <motion.h2
                className={styles.greeting}
                variants={revealVariants}
                initial="hidden"
                animate={animationState}
                custom={0}
              >
                Hello, It&apos;s Me
              </motion.h2>

              <motion.h1
                className={styles.name}
                variants={revealVariants}
                initial="hidden"
                animate={animationState}
                custom={0.15}
              >
                Prince Nogia
              </motion.h1>

              <motion.div
                variants={revealVariants}
                initial="hidden"
                animate={animationState}
                custom={0.3}
              >
                <TextRotator />
              </motion.div>

              <motion.p
                className={styles.description}
                variants={revealVariants}
                initial="hidden"
                animate={animationState}
                custom={0.45}
              >
                I build immersive digital experiences using modern web
                technologies. Merging creativity with code to bring ideas to
                life.
              </motion.p>

              <motion.div
                className={styles.ctaButtons}
                variants={revealVariants}
                initial="hidden"
                animate={animationState}
                custom={0.6}
              >
                <button
                  className={styles.btnPrimary}
                  suppressHydrationWarning
                  onClick={scrollToContact}
                >
                  Contact Me
                </button>
                <a
                  href="/Prince_Nogia_Resume.pdf"
                  download="Prince_Nogia_Resume.pdf"
                  className={`${styles.btnSecondary} ${
                    downloadStatus === "processing" ? styles.processing : ""
                  } ${downloadStatus === "downloaded" ? styles.downloaded : ""}`}
                  onClick={handleDownload}
                  suppressHydrationWarning
                >
                  {downloadStatus === "idle" && (
                    <>
                      Download CV <Download className={styles.downloadIcon} />
                    </>
                  )}
                  {downloadStatus === "processing" && (
                    <>
                      <span className={styles.spinner}></span> Processing...
                    </>
                  )}
                  {downloadStatus === "downloaded" && (
                    <>
                      Downloaded <span style={{ fontSize: "1.2rem" }}>✓</span>
                    </>
                  )}
                </a>
              </motion.div>
            </div>
          </div>

          {/* Side Tabs Navigation */}
        </section>
      </div>
    </motion.div>
  );
}

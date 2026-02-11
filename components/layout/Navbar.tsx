"use client";
import styles from "./Navbar.module.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

const NAV_ITEMS = [
  "Home",
  "About",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Contact",
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Entrance
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.5 },
    );

    // Dynamic Logo Logic
    const logoAnimation = gsap.fromTo(
      ".navbar-logo",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, paused: true, overwrite: true },
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 150) {
        logoAnimation.play();
      } else {
        logoAnimation.reverse();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Close
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
      });
      setIsMenuOpen(false);
    } else {
      // Open
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.5,
      });
      // Stagger links
      gsap.fromTo(
        ".overlay-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 },
      );
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        ref={navRef}
      >
        {/* Dynamic Logo - Visible on Scroll */}
        <div className={`${styles.logo} navbar-logo`} style={{ opacity: 0 }}>
          PRINCE NOGIA
        </div>

        {/* Menu Button instead of inline links */}
        <div style={{ marginLeft: "auto" }}>
          <button onClick={toggleMenu} className={styles.menuButton}>
            <div
              className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ""}`}
            >
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </div>
          </button>
        </div>

        {/* Let's Talk removed */}
      </nav>

      {/* Fullscreen Overlay */}
      <div ref={overlayRef} className={styles.overlay}>
        <div className={styles.overlayContent}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`${styles.overlayLink} overlay-link`}
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

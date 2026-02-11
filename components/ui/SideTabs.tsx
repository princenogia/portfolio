"use client";
import React from "react";
import styles from "./SideTabs.module.css";
// import gsap from "gsap"; // Optional if we want stagger entrance?

const TABS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SideTabs() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Lenis smooth scroll usually hijacks native behavior, but let's try standard first
      // If using standard lenis setup, window.scrollTo behavior: 'smooth' might be intercepted correctly
      // or we can just use element.scrollIntoView
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.sideTabs}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={styles.tab}
          onClick={() => handleScrollTo(tab.id)}
        >
          <span className={styles.line}></span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

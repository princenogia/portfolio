"use client";
import React, { useRef } from "react";
import styles from "./Education.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import Section3D from "../3d/Section3D";

const EDUCATION_DATA = [
  {
    institution: "Delhi Institute of Technology & Management",
    degree: "B.Tech in Computer Science & Engineering",
    date: "December 2021 - August 2025",
    location:
      "Ganaur, Haryana (Affiliated to Guru Gobind Singh Indraprastha University, Delhi)",
    description:
      "Completed Bachelor's degree with focus on full-stack development, modern web technologies, and software engineering.",
    tags: ["Computer Science", "Engineering", "Graduate"],
    status: "Completed",
  },
  {
    institution: "Dwarka International School",
    degree: "Senior Secondary (12th)",
    date: "Completed July 2021",
    location: "Dwarka Sector-12, New Delhi (CBSE Board)",
    description: "Completed with distinction.",
    tags: ["CBSE", "Science Stream"],
    status: "Completed July 2021",
  },
  {
    institution: "Dwarka International School",
    degree: "Matriculation (10th)",
    date: "Completed May 2019",
    location: "Dwarka Sector-12, New Delhi (CBSE Board)",
    description: "Foundation for technical career.",
    tags: ["CBSE", "Academic Excellence"],
    status: "Completed May 2019",
  },
];

export default function Education() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Scale height of the line from 0% to 100% based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section3D id="education" className={styles.educationSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>Academic Background</span>
          <h2 className={styles.title}>Education</h2>
        </motion.div>

        <div className={styles.timeline} ref={containerRef}>
          {/* Scroll-Linked Vertical Line */}
          <motion.div className={styles.timelineLine} style={{ scaleY }} />
          {/* Static Background Line (Faint) */}
          <div className={styles.timelineLineBg} />

          {EDUCATION_DATA.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </Section3D>
  );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      className={styles.timelineItem}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.timelineDot} />
      <div className={styles.timelineContent}>
        <h3 className={styles.degree}>{item.degree}</h3>
        <div className={styles.institution}>{item.institution}</div>

        <div className={styles.meta}>
          <div className={styles.date}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ minWidth: "20px" }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {item.date}
          </div>
          <div className={styles.location}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ minWidth: "20px" }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {item.location}
          </div>
        </div>

        <p className={styles.description}>{item.description}</p>

        <div className={styles.tags}>
          {item.tags.map((tag: string, i: number) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

"use client";
import React, { useRef } from "react";
import styles from "./Experience.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import Section3D from "../3d/Section3D";

const EXPERIENCE_DATA = [
  {
    role: "Full-Stack Developer",
    company: "Freelance",
    date: "Jan 2025 — Present",
    location: "Delhi, India",
    descriptionPoints: [
      "Engineered multiple full-stack web applications, including dynamic forms, marketing landing pages, and a feature-rich tourism platform.",
      "Utilized modern frontend technologies such as Next.js, React.js, TypeScript, Tailwind CSS, and Vanilla JavaScript to craft responsive and accessible user interfaces.",
      "Developed robust backend functionality using PHP and MySQL, handling data management, user input, and custom content workflows.",
      "Emphasized scalable architecture, clean code practices, and optimized UI/UX across all projects.",
      "Delivered end-to-end solutions independently, demonstrating strong problem-solving skills and a client-focused approach.",
    ],
    tags: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "PHP",
      "MySQL",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Scale height of the line from 0% to 100% based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section3D id="experience" className={styles.experienceSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>Professional Journey</span>
          <h2 className={styles.title}>Experience</h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            A snapshot of roles and projects that shaped my journey as a
            developer.
          </p>
        </motion.div>

        <div className={styles.timeline} ref={containerRef}>
          {/* Scroll-Linked Vertical Line */}
          <motion.div className={styles.timelineLine} style={{ scaleY }} />
          {/* Static Background Line (Faint) */}
          <div className={styles.timelineLineBg} />

          {EXPERIENCE_DATA.map((item, index) => (
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
        <h3 className={styles.role}>{item.role}</h3>
        <div className={styles.company}>{item.company}</div>

        <div className={styles.meta}>
          <div className={styles.date}>
            <span role="img" aria-label="calendar">
              📅
            </span>
            {item.date}
          </div>
          <div className={styles.location}>
            <span role="img" aria-label="location">
              📍
            </span>
            {item.location}
          </div>
        </div>

        <ul className={styles.descriptionList}>
          {item.descriptionPoints.map((point: string, i: number) => (
            <li key={i} className={styles.descriptionItem}>
              {point
                .replace(
                  /Next\.js|React\.js|TypeScript|Tailwind CSS|Vanilla JavaScript|PHP|MySQL/g,
                  (match) => `<strong>${match}</strong>`,
                ) // Bold keywords nicely if simple
                .split(/(<strong>.*?<\/strong>)/g)
                .map((part, index) =>
                  part.startsWith("<strong>") ? (
                    <strong key={index} style={{ color: "#fff" }}>
                      {part.replace(/<\/?strong>/g, "")}
                    </strong>
                  ) : (
                    part
                  ),
                )}
            </li>
          ))}
        </ul>

        <div className={styles.tagsTitle}>&lt;/&gt; Technologies Used</div>
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

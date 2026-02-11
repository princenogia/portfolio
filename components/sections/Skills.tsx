"use client";
import React, { useRef } from "react";
import styles from "./Skills.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section3D from "../3d/Section3D";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPhp,
  FaPython,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiJquery,
  SiTableau,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";
import {
  BsFiletypeHtml,
  BsFiletypeCss,
  BsFiletypeJs,
  BsFiletypePhp,
  BsFiletypePy,
} from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";

gsap.registerPlugin(ScrollTrigger);

// 14 skills for 2-row honeycomb (7 + 7)
const SKILLS = [
  // Row 1 (7 items - offset)
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "ReactJS", icon: <FaReact /> },
  { name: "React Native", icon: <TbBrandReactNative /> },
  { name: "MySQL", icon: <SiMysql /> },
  // Row 2 (7 items)
  { name: "PHP", icon: <FaPhp /> },
  { name: "NextJS", icon: <SiNextdotjs /> },
  { name: "jQuery", icon: <SiJquery /> },
  { name: "Python", icon: <FaPython /> },
  { name: "MS Excel", icon: <RiFileExcel2Fill /> },
  { name: "Power BI", icon: <BiBarChartAlt /> },
  { name: "Tableau", icon: <SiTableau /> },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.skillItem}`);

      gsap.fromTo(
        items,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: {
            each: 0.05,
            grid: "auto",
            from: "center",
          },
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <Section3D id="skills" className={styles.skillsSection}>
      <div className={styles.widthWrapper} ref={containerRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Technical <span className={styles.highlight}>Skills</span>
          </h2>
          <p className={styles.subtitle}>
            A comprehensive toolkit for building modern digital experiences.
          </p>
        </div>

        <div className={styles.skillsGrid}>
          {SKILLS.map((skill, index) => (
            <div key={skill.name} className={styles.skillItem}>
              <div className={styles.iconWrapper}>{skill.icon}</div>
              <span className={styles.skillName}>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section3D>
  );
}

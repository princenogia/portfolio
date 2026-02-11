"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./Projects.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section3D from "../3d/Section3D";
import { createPortal } from "react-dom";
import {
  Maximize2,
  X,
  ExternalLink,
  Github,
  Code2,
  Globe,
  Mail,
} from "lucide-react";
import {
  SiNextdotjs,
  SiOpenai,
  SiStripe,
  SiPrisma,
  SiPostgresql,
  SiReact,
  SiD3Dotjs,
  SiNodedotjs,
  SiRedis,
  SiFirebase,
  SiExpo,
  SiThreedotjs,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiClerk,
  SiVercel,
  SiGoogle,
} from "react-icons/si";
import { TbBrandReactNative, TbBrandFramerMotion } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "WriteScan",
    category: "AI & Automation",
    shortDesc: "Extract text from handwritten PDFs and images.",
    description:
      "An intelligent document extraction tool that converts handwritten text from PDFs and images into structured, formatted text.",
    tech: [
      { name: "Next.js", icon: <SiNextdotjs size={16} /> },
      { name: "React", icon: <SiReact size={16} /> },
      { name: "Gemini", icon: <SiGoogle size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
      { name: "Vercel", icon: <SiVercel size={16} /> },
    ],
    color: "#c0ff00",
    demoLink: "https://writescan.vercel.app/",
    imageUrl: "/projects/writescan.png",
  },
  {
    id: 2,
    title: "WorldFeast",
    category: "Web Development",
    shortDesc: "Discover authentic recipes from every continent.",
    description:
      "A global recipe discovery platform that lets you explore authentic recipes from every continent. From Asian delicacies to European classics, embark on a culinary journey around the world.",
    tech: [
      { name: "Next.js", icon: <SiNextdotjs size={16} /> },
      { name: "React", icon: <SiReact size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
      { name: "EmailJS", icon: <Mail size={16} /> },
      { name: "Vercel", icon: <SiVercel size={16} /> },
    ],
    color: "#ffAA00",
    demoLink: "https://worldfeast.vercel.app/",
    imageUrl: "/projects/worldfeast.png",
  },
  {
    id: 3,
    title: "Nativity UI",
    category: "Open Source Library",
    shortDesc: "Beautiful, animated React Native components for Expo.",
    description:
      "A comprehensive open-source UI library designated for React Native and Expo. Provides a suite of highly performant, animated components that are fully customizable and drop-in ready.",
    tech: [
      { name: "React Native", icon: <TbBrandReactNative size={16} /> },
      { name: "Expo", icon: <SiExpo size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Reanimated", icon: <SiReact size={16} /> },
    ],
    color: "#00ccff",
    demoLink: "https://nativity-ui.vercel.app/",
    imageUrl: "/projects/nativity.png",
  },
  {
    id: 4,
    title: "VivaMentor",
    category: "AI & Education",
    shortDesc: "AI Voice Tutor for College Exams.",
    description:
      "An AI-powered medical viva practice platform that helps medical students prepare for oral exams with voice-based Q&A, instant feedback, and comprehensive subject coverage.",
    tech: [
      { name: "Next.js", icon: <SiNextdotjs size={16} /> },
      { name: "React", icon: <SiReact size={16} /> },
      { name: "TypeScript", icon: <SiTypescript size={16} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
      { name: "Vapi AI", icon: <SiOpenai size={16} /> },
      { name: "Firebase", icon: <SiFirebase size={16} /> },
      { name: "Vercel", icon: <SiVercel size={16} /> },
    ],
    color: "#ff0055",
    demoLink: "https://viva-mentor.vercel.app/",
    imageUrl: "/projects/vivamentor.png",
  },
];

// ... (imports remain)

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bento grid class assignment
  const getBentoClass = (index: number) => {
    if (index % 4 === 0) return styles.cardLarge;
    if (index % 4 === 3) return styles.cardWide;
    return "";
  };

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      gsap.set(cards, { y: 50, opacity: 0 });

      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        start: "top 85%",
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (activeProject && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.3,
      });
      gsap.fromTo(
        overlayRef.current.querySelector(`.${styles.overlayContent}`),
        { y: 50, scale: 0.95 },
        { y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
      );
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        onComplete: () => {
          // Optional cleanup if we were unmounting, but we are portaling so it stays
        },
      });
    }
  }, [activeProject]);

  return (
    <Section3D id="projects" className={styles.projectsSection}>
      <div ref={containerRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>Selected Works</h2>
          <p className={styles.subtitle}>Engineering & Design 2024-2026</p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.card} ${getBentoClass(index)}`}
              onClick={() => setActiveProject(project)}
            >
              {/* Image Background (optional, if imageUrl exists) */}
              {/* @ts-ignore */}
              {project.imageUrl && (
                <div
                  className={styles.cardImageBg}
                  // @ts-ignore
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />
              )}

              <div className={styles.cardHeader}>
                <span
                  className={styles.cardCategory}
                  style={{
                    borderColor: project.color,
                    color: project.color,
                    background: `${project.color}10`,
                  }}
                >
                  {project.category}
                </span>
                <Maximize2 size={20} className={styles.expandIcon} />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.shortDesc}>{project.shortDesc}</p>
              </div>

              <div className={styles.cardVisual}>0{index + 1}</div>
            </div>
          ))}
        </div>

        {/* Modal Overlay - Portaled to Body */}
        {mounted &&
          createPortal(
            <div
              className={styles.overlay}
              ref={overlayRef}
              style={{ opacity: 0, pointerEvents: "none" }} // Init hidden
            >
              {activeProject && (
                <div className={styles.overlayContent}>
                  <button
                    className={styles.closeButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(null);
                    }}
                  >
                    <X size={28} />
                  </button>

                  <div className={styles.modalHeader}>
                    <span
                      className={styles.modalCategory}
                      style={{ color: activeProject.color }}
                    >
                      {activeProject.category}
                    </span>
                    <h2 className={styles.modalTitle}>{activeProject.title}</h2>
                  </div>

                  <div className={styles.modalBody}>
                    <p className={styles.modalDesc}>
                      {activeProject.description}
                    </p>

                    <div className={styles.techStack}>
                      {activeProject.tech.map((t, i) => (
                        <span key={i} className={styles.techTag}>
                          {t.icon}
                          {t.name}
                        </span>
                      ))}
                    </div>

                    <div className={styles.modalLinks}>
                      {/* @ts-ignore */}
                      {activeProject.demoLink && (
                        <a
                          // @ts-ignore
                          href={activeProject.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkButton}
                        >
                          Live Demo <ExternalLink size={16} />
                        </a>
                      )}
                      {/* @ts-ignore */}
                      {activeProject.repoLink && (
                        <a
                          // @ts-ignore
                          href={activeProject.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.linkButton}
                        >
                          Source Code <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>,
            document.body,
          )}
      </div>
    </Section3D>
  );
}

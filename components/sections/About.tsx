"use client";
import React from "react";
import styles from "./About.module.css";
import { motion } from "framer-motion";
import Section3D from "../3d/Section3D";

export default function About() {
  return (
    <Section3D id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>Who I Am</span>
          <h2 className={styles.title}>About Me</h2>
        </motion.div>

        <motion.div
          className={styles.textColumn}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            I am a B.Tech graduate in Computer Science and Engineering (2025)
            with a strong foundation in full-stack web development. I specialize
            in building responsive and scalable web applications using HTML,
            CSS, JavaScript, React, Next.js, PHP, and MySQL.
          </p>
          <p>
            Through academic projects and freelance work, I have developed
            modern, user-centric web applications with a focus on clean UI
            design, performance optimization, and seamless user experience. I am
            particularly passionate about creating intuitive interfaces and
            writing efficient, maintainable code that delivers real-world value.
          </p>
          <p>
            I continuously seek to enhance my technical skills and stay updated
            with modern web technologies to build impactful digital solutions.
          </p>
        </motion.div>
      </div>
    </Section3D>
  );
}

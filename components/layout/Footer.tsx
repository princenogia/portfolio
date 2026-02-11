"use client";
import React from "react";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Section3D from "../3d/Section3D";

const Footer = () => {
  return (
    <Section3D className={styles.footer} isLast>
      <div className={styles.content}>
        <div className={styles.socials}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaInstagram />
          </a>
        </div>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Prince Nogia. All rights reserved.
        </p>

        <p className={styles.madeWith}>
          Designed & Built with <span className={styles.heart}>❤</span>
        </p>
      </div>
    </Section3D>
  );
};

export default Footer;

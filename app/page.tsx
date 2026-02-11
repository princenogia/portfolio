"use client";
import { useEffect, useState, useCallback } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Navbar from "@/components/layout/Navbar";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import Preloader from "@/components/layout/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  // Lock scrolling during preloader
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    // Small delay to let curtain clear before triggering hero entrance
    setTimeout(() => {
      setIsRevealed(true);
    }, 100);
  }, []);

  return (
    <main style={{ position: "relative", backgroundColor: "#000" }}>
      {/* Preloader Overlay */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <Navbar />

      {/* New 3D Avatar Hero (Fixed) */}
      <Hero isRevealed={isRevealed} />

      {/* Spacer to push content below fixed Hero */}
      <div style={{ height: "100vh", width: "100%" }} />

      {/* About Section */}
      <About />

      {/* Education Section */}
      <Education />

      {/* Experience Section */}
      <Experience />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Contact */}
      <ContactForm />
      <Footer />
    </main>
  );
}

"use client";
import styles from "./HeroScroll.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../3d/Scene";
import Image from "next/image";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const typeLeftRef = useRef<HTMLHeadingElement>(null);
  const typeRightRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef(0);

  useLenis(({ scroll }) => {
    scrollRef.current = scroll;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pin the white section for a while
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Scroll distance
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animation: Scale down the image wrapper
      tl.to(
        imageWrapperRef.current,
        {
          scale: 0.5,
          width: "40%", // Becomes a box
          height: "60%",
          borderRadius: "20px",
          ease: "power1.inOut",
        },
        0,
      );

      // Animate text coming in/parallax possibly?
      // Actually they are behind, so revealing them is enough?
      // Let's make them move slightly to feel alive
      tl.fromTo(
        typeLeftRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1 },
        0,
      );
      tl.fromTo(
        typeRightRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1 },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Background Text that gets revealed */}
      <div className={styles.revealedText}>
        <h1 className={styles.giantType} ref={typeLeftRef}>
          DID IT
          <br />
          GP WE
        </h1>
        <h1
          className={styles.giantType}
          style={{ textAlign: "right" }}
          ref={typeRightRef}
        >
          ME WE
          <br />
          REVER
        </h1>
      </div>

      {/* The Pinned Section */}
      <div ref={whiteSectionRef} className={styles.whiteSection}>
        {/* Transforming Wrapper */}
        <div ref={imageWrapperRef} className={styles.imageWrapper}>
          {/* Light Mode Contour Background (0) */}
          <Scene theme={0} scrollRef={scrollRef} />

          {/* Using Layout Fill for full coverage */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "90%",
              zIndex: 2,
            }}
          >
            <Image
              src="/portrait.png"
              alt="Subject"
              fill
              style={{ objectFit: "contain", objectPosition: "bottom" }}
              priority
            />
          </div>

          {/* Overlays (Logo, etc) - Inside wrapper so they scale with it? 
               Actually in reference, they seem to stay fixed or fade out. 
               Let's keep them in the wrapper for now or separate. 
           */}
          <div style={{ position: "absolute", top: 40, left: 40, zIndex: 10 }}>
            <h2
              style={{
                fontFamily: "var(--font-oswald)",
                fontSize: "2rem",
                color: "black",
                textTransform: "uppercase",
              }}
            >
              Lando
              <br />
              Norris
            </h2>
          </div>

          <div style={{ position: "absolute", top: 40, right: 40, zIndex: 10 }}>
            <button
              style={{
                background: "#CBF250",
                border: "none",
                padding: "1rem 2rem",
                fontFamily: "var(--font-inter)",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              STORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

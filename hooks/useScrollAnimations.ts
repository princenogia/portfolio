"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  heroRef: React.RefObject<HTMLElement | null>;
  titleRef?: React.RefObject<HTMLElement | null>;
  subtitleRef?: React.RefObject<HTMLElement | null>;
  navbarRef?: React.RefObject<HTMLElement | null>;
  backgroundRef?: React.RefObject<HTMLElement | null>;
}

export function useScrollAnimations(options: ScrollAnimationOptions) {
  const { heroRef, titleRef, subtitleRef, navbarRef, backgroundRef } = options;

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero parallax - elements move at different speeds
      if (titleRef?.current) {
        gsap.to(titleRef.current, {
          y: 200,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (subtitleRef?.current) {
        gsap.to(subtitleRef.current, {
          y: 100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1,
          },
        });
      }

      // Background parallax - slower movement
      if (backgroundRef?.current) {
        gsap.to(backgroundRef.current, {
          y: -100,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Navbar hide on scroll down, show on scroll up
      if (navbarRef?.current) {
        let lastScroll = 0;

        ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            const currentScroll = self.scroll();
            const direction = currentScroll > lastScroll ? 1 : -1;
            const velocity = Math.abs(currentScroll - lastScroll);

            if (currentScroll > 100) {
              if (direction === 1 && velocity > 2) {
                // Scrolling down - hide navbar
                gsap.to(navbarRef.current, {
                  y: -100,
                  duration: 0.3,
                  ease: "power2.out",
                });
              } else if (direction === -1) {
                // Scrolling up - show navbar with blur
                gsap.to(navbarRef.current, {
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            } else {
              // At top - show navbar
              gsap.to(navbarRef.current, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }

            lastScroll = currentScroll;
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [heroRef, titleRef, subtitleRef, navbarRef, backgroundRef]);
}

// Reveal animation on scroll
export function useRevealOnScroll(
  elementRef: React.RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  },
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          y: options?.y ?? 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options?.duration ?? 1,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementRef.current,
            start: options?.start ?? "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, elementRef);

    return () => ctx.revert();
  }, [elementRef, options]);
}

// Text split animation
export function useSplitTextReveal(
  textRef: React.RefObject<HTMLElement | null>,
  delay: number = 0,
) {
  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const originalText = text.innerText;

    // Split into characters
    text.innerHTML = originalText
      .split("")
      .map(
        (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");

    const chars = text.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          ease: "power4.out",
          delay,
        },
      );
    }, textRef);

    return () => {
      ctx.revert();
      text.innerText = originalText;
    };
  }, [textRef, delay]);
}

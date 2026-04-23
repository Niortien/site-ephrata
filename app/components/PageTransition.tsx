"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PageTransition — wraps any inner page content.
 * On mount:  curtain slides out to the right (reveal)
 * On route change: the Next.js navigation is instant;
 *   we do an exit animation on the PREVIOUS page via the
 *   `data-page-content` element before the new page renders.
 *
 * Usage: wrap <main> inside each page with <PageTransition>.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* Entrance: curtain swipes out on mount */
  useEffect(() => {
    const curtain = curtainRef.current;
    const content = containerRef.current;
    if (!curtain || !content) return;

    // Start state: curtain covers content, content invisible
    gsap.set(curtain, { scaleX: 1, transformOrigin: "left center" });
    gsap.set(content, { opacity: 0, y: 18 });

    const tl = gsap.timeline();

    // Curtain sweeps left → hidden
    tl.to(curtain, {
      scaleX: 0,
      duration: 0.65,
      ease: "power3.inOut",
      transformOrigin: "right center",
    })
    // Content fades + slides in
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.2");

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Sliding curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-200 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #4A0F30 0%, #6B1645 50%, #F5821F 100%)",
          transformOrigin: "left center",
        }}
      />
      {/* Page content */}
      <div ref={containerRef}>
        {children}
      </div>
    </div>
  );
}

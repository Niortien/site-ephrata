"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  IconStar,
  IconArrowDown,
  IconBook,
  IconPencil,
  IconBrush,
} from "@tabler/icons-react";

function FloatingShape({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 5, -3, 0] }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top left, #8B2260 0%, #6B1645 45%, #4A0F30 100%)",
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #F5821F 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, #F5821F 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Floating decorative elements */}
      <FloatingShape
        className="top-[15%] left-[8%] text-white/20"
        delay={0}
      >
        <div className="w-16 h-16 rounded-2xl border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
          <IconBook size={28} className="text-orange-300" />
        </div>
      </FloatingShape>

      <FloatingShape
        className="top-[25%] right-[10%] text-white/20"
        delay={1.5}
      >
        <div className="w-14 h-14 rounded-full border-2 border-orange-300/40 flex items-center justify-center">
          <IconPencil size={22} className="text-orange-200" />
        </div>
      </FloatingShape>

      <FloatingShape
        className="bottom-[30%] left-[5%]"
        delay={2.5}
      >
        <div className="w-12 h-12 rounded-xl border-2 border-white/20 flex items-center justify-center">
          <IconBrush size={20} className="text-pink-200" />
        </div>
      </FloatingShape>

      <FloatingShape className="top-[60%] right-[6%]" delay={3}>
        <div className="w-10 h-10 rounded-full bg-orange-400/30 flex items-center justify-center">
          <IconStar size={18} className="text-orange-200" />
        </div>
      </FloatingShape>

      {/* Geometric dots pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              opacity: 0.3 + (i % 5) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm font-semibold mb-8"
        >
          <IconStar size={14} className="text-orange-300" fill="currentColor" />
          Groupe Scolaire Privé Ephrata
          <IconStar size={14} className="text-orange-300" fill="currentColor" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-display font-extrabold text-white leading-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
        >
          Là où les jeunes esprits{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #F5821F, #FFB347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            s&apos;épanouissent
          </span>{" "}
          avec joie
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Une école primaire d&apos;excellence où chaque enfant découvre le
          monde avec curiosité, créativité et confiance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245,130,31,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl bg-[#F5821F] text-white font-bold text-base shadow-xl cursor-pointer inline-block"
          >
            S&apos;inscrire maintenant →
          </motion.a>
          <motion.a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-bold text-base backdrop-blur-sm cursor-pointer inline-block"
          >
            Découvrir notre école
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { number: "500+", label: "Élèves heureux" },
            { number: "30+", label: "Enseignants qualifiés" },
            { number: "15+", label: "Années d'excellence" },
            { number: "98%", label: "Parents satisfaits" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold text-white font-display">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Défiler</span>
        <IconArrowDown size={18} />
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "80px" }}
        >
          <path
            d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z"
            fill="#FFFBF5"
          />
        </svg>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  IconBell,
  IconCalendarEvent,
  IconInfoCircle,
  IconAlertTriangle,
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";

/* ─────────────────────────────────────────────────────────────────────
   ✏️  MODIFIEZ CE TABLEAU pour ajouter / retirer des annonces
   ───────────────────────────────────────────────────────────────────── */
export const infos = [
  {
    type: "annonce",
    icon: IconBell,
    gradient: "linear-gradient(135deg, #F5821F 0%, #FFB347 100%)",
    glow: "rgba(245,130,31,0.45)",
    badge: "📣 Inscriptions",
    title: "Inscriptions 2025–2026 ouvertes",
    body: "Les inscriptions pour la prochaine année scolaire sont lancées. Rendez-vous à l'école ou remplissez le formulaire. Places limitées !",
    cta: { label: "S'inscrire maintenant", href: "#contact" },
    urgent: true,
  },
  {
    type: "calendrier",
    icon: IconCalendarEvent,
    gradient: "linear-gradient(135deg, #6B1645 0%, #9B2765 100%)",
    glow: "rgba(107,22,69,0.45)",
    badge: "📅 Calendrier",
    title: "Rentrée : 8 septembre 2025",
    body: "La rentrée des classes pour toutes les sections (maternelle et primaire) aura lieu le lundi 8 septembre à 7h30.",
    urgent: false,
  },
  {
    type: "info",
    icon: IconInfoCircle,
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    glow: "rgba(29,78,216,0.40)",
    badge: "ℹ️ Information",
    title: "Réunion parents–enseignants",
    body: "Samedi 13 septembre 2025 à 9h00 dans la salle polyvalente. Présentation des enseignants et du programme pédagogique.",
    urgent: false,
  },
  {
    type: "alerte",
    icon: IconAlertTriangle,
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    glow: "rgba(180,83,9,0.40)",
    badge: "⚠️ Rappel",
    title: "Documents requis",
    body: "CNI des parents, acte de naissance, 2 photos d'identité, carnet scolaire de l'année précédente.",
    urgent: false,
  },
];

type Info = (typeof infos)[number];

function PulsingRing() {
  return (
    <span className="absolute inset-0 rounded-2xl" aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-2xl"
        style={{ border: "2px solid #F5821F" }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-2xl"
        style={{ border: "2px solid #FFB347" }}
        animate={{ scale: [1, 1.42, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </span>
  );
}

function InfoCard({ info, index }: { info: Info; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = info.icon;

  const handleCta = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.88 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      className="relative flex flex-col rounded-3xl overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.13)",
        backdropFilter: "blur(12px)",
        boxShadow: `0 8px 32px ${info.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* Gradient top strip */}
      <div className="h-1.5 w-full shrink-0" style={{ background: info.gradient }} />

      {/* Background glow blob */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{ background: info.gradient }}
      />

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Icon + badge */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: info.gradient }}
            >
              <Icon size={22} className="text-white" />
            </div>
            {info.urgent && <PulsingRing />}
          </div>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.80)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {info.badge}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-display font-extrabold text-lg text-white leading-snug mb-2">
            {info.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">{info.body}</p>
        </div>

        {/* CTA */}
        {"cta" in info && info.cta && (
          <motion.button
            onClick={() =>
              handleCta((info.cta as { label: string; href: string }).href)
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-white cursor-pointer mt-1"
            style={{
              background: info.gradient,
              boxShadow: `0 4px 18px ${info.glow}`,
            }}
          >
            {(info.cta as { label: string; href: string }).label}
            <IconArrowRight size={15} />
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

export default function InfoParentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  /* Compteur animé */
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const countInView = useInView(sectionRef, { once: true });
  useEffect(() => {
    if (countInView) {
      const ctrl = animate(count, infos.length, { duration: 1.4, ease: "easeOut" });
      return ctrl.stop;
    }
  }, [countInView, count]);

  return (
    <section
      id="infos-parents"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1a0a12 0%, #2d0f1f 35%, #4A0F30 65%, #3a1000 100%)",
      }}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-130 h-130 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,130,31,0.10) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.18, 1], x: [0, 35, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-105 h-105 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(107,22,69,0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.22, 1], x: [0, -25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={titleInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5, type: "spring", bounce: 0.45 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-6 border"
            style={{
              background: "rgba(245,130,31,0.14)",
              borderColor: "rgba(245,130,31,0.35)",
              color: "#FFB347",
            }}
          >
            <motion.span
              animate={{ rotate: [0, 18, -12, 18, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3 }}
            >
              <IconSparkles size={15} />
            </motion.span>
            Espace parents
            <span
              className="ml-1 px-2 py-0.5 rounded-full text-xs font-extrabold"
              style={{ background: "rgba(245,130,31,0.22)", color: "#F5821F" }}
            >
              <motion.span>{rounded}</motion.span> annonces
            </span>
          </motion.div>

          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
            Informations &amp;{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F5821F, #FFB347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Annonces
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto">
            Toutes les informations importantes pour les parents, en un coup d&apos;œil.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.9, ease: "easeOut" }}
            className="mt-8 mx-auto h-px max-w-xs"
            style={{
              background:
                "linear-gradient(90deg, transparent, #F5821F, transparent)",
            }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infos.map((info, i) => (
            <InfoCard key={info.title} info={info} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
            fill="oklch(0.9985 0.005 80)"
          />
        </svg>
      </div>
    </section>
  );
}

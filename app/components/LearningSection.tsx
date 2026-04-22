"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IconMath,
  IconPalette,
  IconFlask,
  IconRun,
  IconMusic,
  IconGlobe,
  IconStarFilled,
} from "@tabler/icons-react";

const subjects = [
  {
    icon: IconMath,
    title: "Mathématiques",
    description:
      "Des approches concrètes et ludiques pour développer la logique et l'abstraction dès le plus jeune âge.",
    color: "#6B1645",
    bg: "linear-gradient(135deg, #6B1645, #9B2765)",
    tag: "Fondamental",
  },
  {
    icon: IconPalette,
    title: "Arts & Créativité",
    description:
      "Peinture, dessin, sculpture et arts numériques pour libérer l'expression créative de chaque enfant.",
    color: "#F5821F",
    bg: "linear-gradient(135deg, #F5821F, #FFB347)",
    tag: "Expression",
  },
  {
    icon: IconFlask,
    title: "Sciences",
    description:
      "Des expériences fascinantes en laboratoire pour éveiller la curiosité scientifique naturelle des enfants.",
    color: "#6B1645",
    bg: "linear-gradient(135deg, #6B1645, #9B2765)",
    tag: "Découverte",
  },
  {
    icon: IconRun,
    title: "Sport & EPS",
    description:
      "Activités sportives variées pour développer l'esprit d'équipe, la santé et la coordination motrice.",
    color: "#F5821F",
    bg: "linear-gradient(135deg, #F5821F, #FFB347)",
    tag: "Corps & Esprit",
  },
  {
    icon: IconMusic,
    title: "Musique",
    description:
      "Éveil musical, chant, percussion et instruments pour cultiver la sensibilité artistique et la mémoire.",
    color: "#6B1645",
    bg: "linear-gradient(135deg, #6B1645, #9B2765)",
    tag: "Harmonie",
  },
  {
    icon: IconGlobe,
    title: "Langues",
    description:
      "Français, anglais et langues locales pour préparer les enfants à un monde ouvert et multiculturel.",
    color: "#F5821F",
    bg: "linear-gradient(135deg, #F5821F, #FFB347)",
    tag: "Ouverture",
  },
];

function SubjectCard({ subject, index }: { subject: (typeof subjects)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = subject.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group relative rounded-3xl overflow-hidden cursor-default"
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-white" />

      {/* Top gradient accent */}
      <div
        className="h-2 w-full"
        style={{ background: subject.bg }}
      />

      <div className="p-7 relative">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
          style={{ background: subject.bg }}
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={26} className="text-white" />
        </motion.div>

        {/* Tag */}
        <span
          className="text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block"
          style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
        >
          {subject.tag}
        </span>

        <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
          {subject.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {subject.description}
        </p>

        {/* Hover arrow */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
            style={{ background: subject.bg }}
          >
            →
          </div>
        </motion.div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ borderColor: subject.color }}
      />
    </motion.div>
  );
}

export default function LearningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="learning"
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#F9EEF6" }}
    >
      {/* Decorative blob top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, #F5821F20 0%, transparent 70%)",
        }}
      />
      {/* Decorative wave top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full" style={{ marginTop: "-1px" }}>
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z"
            fill="#FFFBF5"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B1645]/10 text-[#6B1645] text-sm font-bold mb-4">
            <IconStarFilled size={12} />
            Notre programme
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-5">
            Une expérience{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B1645, #F5821F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              d&apos;apprentissage
            </span>{" "}
            unique
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Des matières fondamentales aux activités d&apos;éveil, chaque journée
            est pensée pour nourrir la curiosité et les talents de votre enfant.
          </p>
        </motion.div>

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, i) => (
            <SubjectCard key={subject.title} subject={subject} index={i} />
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl px-8 py-7 bg-white shadow-lg border border-[#F9EEF6]"
        >
          <div>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-1">
              Découvrez notre programme complet
            </h3>
            <p className="text-gray-500 text-sm">
              Téléchargez notre brochure pédagogique ou visitez l&apos;école.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-white cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6B1645, #9B2765)" }}
            >
              Visiter l&apos;école
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-2xl text-sm font-bold border-2 cursor-pointer"
              style={{ borderColor: "#F5821F", color: "#F5821F" }}
            >
              Brochure →
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full">
          <path
            d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,80 L0,80 Z"
            fill="#FFFBF5"
          />
        </svg>
      </div>
    </section>
  );
}

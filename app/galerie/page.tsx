"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconArrowLeft,
  IconCamera,
  IconPhoto,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import EmblaCarousel, { CarouselSlide } from "../components/EmblaCarousel";

/* ─── Carousel data ─────────────────────────────────────────────────── */
const carouselSlides: CarouselSlide[] = [
  {
    id: "1",
    type: "gradient",
    gradient: "linear-gradient(135deg, #4A0F30 0%, #6B1645 45%, #9B2765 100%)",
    emoji: "⚽",
    title: "Journée sportive inter-classes",
    subtitle: "Compétition amicale et esprit d'équipe au rendez-vous",
    badge: "Sport",
  },
  {
    id: "2",
    type: "gradient",
    gradient: "linear-gradient(135deg, #c85500 0%, #e07010 50%, #F5821F 100%)",
    emoji: "🎨",
    title: "Atelier de peinture & créativité",
    subtitle: "Nos petits artistes donnent vie à leurs rêves",
    badge: "Arts",
  },
  {
    id: "3",
    type: "gradient",
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 55%, #4ade80 100%)",
    emoji: "🌍",
    title: "Sortie pédagogique au Jardin Botanique",
    subtitle: "L'apprentissage hors des murs de la classe",
    badge: "Sortie",
  },
  {
    id: "4",
    type: "gradient",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #60a5fa 100%)",
    emoji: "🎵",
    title: "Concert de fin d'année scolaire",
    subtitle: "Chants, danses et émotions pour clôturer l'année en beauté",
    badge: "Musique",
  },
  {
    id: "5",
    type: "gradient",
    gradient: "linear-gradient(135deg, #6B1645 0%, #9B2765 50%, #F5821F 100%)",
    emoji: "🏆",
    title: "Cérémonie de remise des prix",
    subtitle: "Félicitations à tous nos lauréats de l'année 2024–2025",
    badge: "Cérémonie",
  },
  {
    id: "6",
    type: "gradient",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #a78bfa 100%)",
    emoji: "📚",
    title: "Club lecture & contes du monde",
    subtitle: "Chaque histoire est une fenêtre ouverte sur l'univers",
    badge: "Lecture",
  },
];

/* ─── Category grid data ─────────────────────────────────────────────── */
const categories = [
  {
    name: "Sport & Loisirs",
    emoji: "⚽",
    count: 24,
    gradient: "linear-gradient(135deg, #c85500 0%, #F5821F 100%)",
  },
  {
    name: "Arts & Création",
    emoji: "🎨",
    count: 18,
    gradient: "linear-gradient(135deg, #6B1645 0%, #9B2765 100%)",
  },
  {
    name: "Éveil Musical",
    emoji: "🎵",
    count: 12,
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
  },
  {
    name: "Sorties Scolaires",
    emoji: "🌍",
    count: 30,
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
  },
  {
    name: "Cérémonies",
    emoji: "🏆",
    count: 15,
    gradient: "linear-gradient(135deg, #6B1645 0%, #F5821F 100%)",
  },
  {
    name: "Vie de Classe",
    emoji: "📚",
    count: 42,
    gradient: "linear-gradient(135deg, #4c1d95 0%, #9B2765 100%)",
  },
];

/* ─── Stat data ──────────────────────────────────────────────────────── */
const stats = [
  { value: "141+", label: "Photos", icon: "📸" },
  { value: "6", label: "Catégories", icon: "🗂️" },
  { value: "3", label: "Vidéos", icon: "🎬" },
  { value: "1", label: "Année scolaire", icon: "📅" },
];

/* ─── Category card ──────────────────────────────────────────────────── */
function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
        style={{ background: cat.gradient }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

      {/* Emoji */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-7xl md:text-8xl select-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-3"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
        >
          {cat.emoji}
        </span>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-display font-bold text-lg leading-tight drop-shadow">
          {cat.name}
        </p>
        <p className="text-white/65 text-sm mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {cat.count} photos
        </p>
      </div>

      {/* Hover icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mt-6">
          <IconPhoto size={20} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function GaleriePage() {
  const carouselRef = useRef(null);
  const categoriesRef = useRef(null);
  const statsRef = useRef(null);

  const carouselInView = useInView(carouselRef, { once: true, margin: "-60px" });
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <PageTransition>
    <main className="min-h-screen bg-[oklch(0.9985_0.005_80)]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-linear-to-br from-[#3A0820] via-[#6B1645] to-[#9B2765]">
        {/* Blobs */}
        <div className="absolute top-12 left-12 w-80 h-80 rounded-full bg-[#F5821F]/25 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-96 h-96 rounded-full bg-[#4A0F30]/50 blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-[60px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm font-semibold mb-8 transition-colors group"
            >
              <IconArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              Retour à l&apos;accueil
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 mb-7"
          >
            <IconCamera size={15} className="text-[#F5821F]" />
            <span className="text-white/90 text-sm font-semibold">
              Galerie photos &amp; vidéos
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white leading-tight"
          >
            La vie à{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F5821F] to-[#FFB347]">
              Ephrata
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-5 text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Découvrez les moments précieux de la vie scolaire — les rires, les
            exploits et les célébrations de nos élèves.
          </motion.p>

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-1 mt-6"
          >
            {[...Array(5)].map((_, i) => (
              <IconStar
                key={i}
                size={16}
                className="text-[#F5821F] fill-[#F5821F]"
              />
            ))}
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full"
          >
            <path
              d="M0 56L1440 56L1440 18C1200 56 960 0 720 18C480 36 240 0 0 18L0 56Z"
              fill="oklch(0.9985 0.005 80)"
            />
          </svg>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section ref={statsRef} className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-4 gap-3 bg-white rounded-2xl shadow-xl shadow-[#6B1645]/8 border border-gray-100 p-4 md:p-5"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 * i, duration: 0.45 }}
              className="text-center"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="font-display font-extrabold text-xl md:text-2xl text-[#6B1645]">
                {s.value}
              </p>
              <p className="text-gray-400 text-xs font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Carousel ── */}
      <section ref={carouselRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#6B1645] bg-[#6B1645]/10 uppercase tracking-widest mb-3">
            À la une
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#6B1645]">
            Moments forts
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Une sélection de nos meilleurs instants capturés tout au long de
            l&apos;année scolaire.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.65, ease: "easeOut" }}
        >
          <EmblaCarousel slides={carouselSlides} autoplayDelay={4500} />
        </motion.div>
      </section>

      {/* ── Categories ── */}
      <section ref={categoriesRef} className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#F5821F] bg-[#F5821F]/10 uppercase tracking-widest mb-3">
            Catégories
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#6B1645]">
            Parcourir par thème
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
            Explorez les différentes facettes de la vie scolaire à Ephrata.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
}

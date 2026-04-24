"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconArrowLeft,
  IconTrophy,
  IconChartBar,
  IconUsers,
  IconStar,
} from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import ExamStatsChart from "../components/ExamStatsChart";
import BestStudents from "../components/BestStudents";
import ClassRankings from "../components/ClassRankings";

const tabs = [
  { id: "stats", label: "Statistiques examens", icon: IconChartBar },
  { id: "laureats", label: "Lauréats d'examens", icon: IconTrophy },
  { id: "classements", label: "Premiers de classe", icon: IconUsers },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function PalmaresPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeTab, setActiveTab] = useState<TabId>("stats");

  return (
    <PageTransition>
    <main className="min-h-screen bg-[oklch(0.9985_0.005_80)]">
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-28 overflow-hidden bg-linear-to-br from-[#78350f] via-[#b45309] to-[#F5821F]"
      >
        {/* Blobs */}
        <div className="absolute top-16 left-16 w-80 h-80 rounded-full bg-[#6B1645]/30 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#4A0F30]/40 blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold mb-8 transition-colors group"
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
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-7"
          >
            <IconTrophy size={15} className="text-white" />
            <span className="text-white/90 text-sm font-semibold">
              Palmarès &amp; résultats
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white leading-tight"
          >
            Palmarès{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fde68a] to-[#fbbf24]">
              Ephrata
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-5 text-white/75 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Statistiques d&apos;admissions aux examens officiels, lauréats et premiers
            de classe — une fierté partagée par toute la communauté Ephrata.
          </motion.p>

          {/* Trophy row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {[
              { v: "100%", l: "CEPE 2025", e: "🏆" },
              { v: "5 ans", l: "Sans échec au CEPE", e: "⭐" },
              { v: "58", l: "Admis 2025", e: "🎓" },
            ].map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white/12 border border-white/20 backdrop-blur-sm min-w-22.5"
              >
                <span className="text-2xl mb-1">{s.e}</span>
                <p className="font-display font-extrabold text-xl text-white">{s.v}</p>
                <p className="text-white/65 text-xs font-medium text-center leading-tight">{s.l}</p>
              </div>
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

      {/* ── Tab navigation ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-250 cursor-pointer border ${
                  activeTab === tab.id
                    ? "bg-[#b45309] text-white border-[#b45309] shadow-lg shadow-[#b45309]/25"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#b45309]/40 hover:text-[#b45309]"
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Tab content ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-24">

        {/* Section header */}
        <div className="text-center mb-10">
          {activeTab === "stats" && (
            <>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#b45309] bg-[#b45309]/10 uppercase tracking-widest mb-3">
                Résultats officiels
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900">
                Taux de réussite aux examens
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
                CEPE — 5 dernières années scolaires (2020–2025)
              </p>
            </>
          )}
          {activeTab === "laureats" && (
            <>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#F5821F] bg-[#F5821F]/10 uppercase tracking-widest mb-3">
                Meilleurs élèves
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900">
                Lauréats des examens officiels
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Les élèves les plus brillants au CEPE ces 3 dernières années
              </p>
            </>
          )}
          {activeTab === "classements" && (
            <>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-[#6B1645] bg-[#6B1645]/10 uppercase tracking-widest mb-3">
                Compositions
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900">
                Premiers de classe par niveau
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl mx-auto">
                Top 3 de chaque classe — Composition 2 · Année 2024–2025
              </p>
            </>
          )}
        </div>

        {/* Content panels */}
        {activeTab === "stats" && <ExamStatsChart />}
        {activeTab === "laureats" && <BestStudents />}
        {activeTab === "classements" && <ClassRankings />}
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#4A0F30] via-[#6B1645] to-[#F5821F] p-10 md:p-14 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/15 blur-2xl pointer-events-none" />
          <div className="relative">
            <div className="flex justify-center gap-2 mb-5">
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={20} className="text-[#fbbf24] fill-[#fbbf24]" />
              ))}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              Votre enfant sera le prochain lauréat
            </h2>
            <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Inscrivez votre enfant dès maintenant et offrez-lui un environnement
              d&apos;excellence où les résultats parlent d&apos;eux-mêmes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="px-8 py-3.5 rounded-2xl bg-white text-[#6B1645] text-sm font-extrabold hover:bg-orange-50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                Inscrire mon enfant
              </Link>
              <Link
                href="/classes"
                className="px-8 py-3.5 rounded-2xl bg-white/15 border border-white/30 text-white text-sm font-bold hover:bg-white/25 transition-colors backdrop-blur-sm"
              >
                Voir les classes
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
    </PageTransition>
  );
}

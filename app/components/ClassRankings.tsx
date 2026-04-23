"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  IconChevronDown,
  IconMedal,
  IconTrophy,
  IconStar,
} from "@tabler/icons-react";

export type ClassStudent = {
  rank: number;
  name: string;
  average: number;
  mention: string;
  mention_color: string;
  emoji: string;
  photo?: string;
};

export type ClassRanking = {
  id: string;
  level: string;
  teacher: string;
  period: string;
  color: string;
  bg: string;
  gradient: string;
  emoji: string;
  students: ClassStudent[];
};

const rankings: ClassRanking[] = [
  {
    id: "maternelle-1",
    level: "Maternelle 1",
    teacher: "Mme Anita Mbongo",
    period: "Composition 2 — 2024–2025",
    color: "#16a34a",
    bg: "#f0fdf4",
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #4ade80 100%)",
    emoji: "🌱",
    students: [
      { rank: 1, name: "Léa Nkoa", average: 18.5, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Paul Etame", average: 17.9, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Grace Fouda", average: 17.2, mention: "Bien", mention_color: "#F5821F", emoji: "👧" },
    ],
  },
  {
    id: "maternelle-2",
    level: "Maternelle 2",
    teacher: "Mme Clarisse Oyono",
    period: "Composition 2 — 2024–2025",
    color: "#0891b2",
    bg: "#ecfeff",
    gradient: "linear-gradient(135deg, #155e75 0%, #0891b2 60%, #67e8f9 100%)",
    emoji: "🌿",
    students: [
      { rank: 1, name: "Mia Bello", average: 19.0, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Axel Ngono", average: 18.3, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Ines Tabi", average: 17.8, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
    ],
  },
  {
    id: "maternelle-3",
    level: "Maternelle 3",
    teacher: "Mme Nadège Essono",
    period: "Composition 2 — 2024–2025",
    color: "#9333ea",
    bg: "#faf5ff",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #9333ea 60%, #c084fc 100%)",
    emoji: "🌸",
    students: [
      { rank: 1, name: "Joséphine Ela", average: 19.4, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Nathan Mvé", average: 18.7, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Clara Biyong", average: 18.1, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
    ],
  },
  {
    id: "cp",
    level: "CP",
    teacher: "M. Patrick Ondoua",
    period: "Composition 2 — 2024–2025",
    color: "#F5821F",
    bg: "#fff7ed",
    gradient: "linear-gradient(135deg, #c85500 0%, #F5821F 60%, #FFB347 100%)",
    emoji: "📖",
    students: [
      { rank: 1, name: "Esther Belinga", average: 19.1, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Hugo Tsimi", average: 18.8, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Naomi Zang", average: 18.0, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
    ],
  },
  {
    id: "ce1",
    level: "CE1",
    teacher: "Mme Rachel Ateba",
    period: "Composition 2 — 2024–2025",
    color: "#6B1645",
    bg: "#fdf2f8",
    gradient: "linear-gradient(135deg, #4A0F30 0%, #6B1645 60%, #9B2765 100%)",
    emoji: "✏️",
    students: [
      { rank: 1, name: "Reine Mba", average: 18.6, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Cyrus Onana", average: 18.2, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Hanna Ntep", average: 17.5, mention: "Bien", mention_color: "#F5821F", emoji: "👧" },
    ],
  },
  {
    id: "ce2",
    level: "CE2",
    teacher: "M. Joël Nkeng",
    period: "Composition 2 — 2024–2025",
    color: "#1d4ed8",
    bg: "#eff6ff",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #60a5fa 100%)",
    emoji: "🔭",
    students: [
      { rank: 1, name: "Danielle Ondo", average: 19.3, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Mathieu Foe", average: 18.9, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Lucie Abam", average: 18.5, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
    ],
  },
  {
    id: "cm1",
    level: "CM1",
    teacher: "Mme Christelle Fouda",
    period: "Composition 2 — 2024–2025",
    color: "#b45309",
    bg: "#fffbeb",
    gradient: "linear-gradient(135deg, #78350f 0%, #b45309 60%, #f59e0b 100%)",
    emoji: "🧪",
    students: [
      { rank: 1, name: "Kevin Abessolo", average: 18.4, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 2, name: "Alice Ngamba", average: 18.0, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 3, name: "Yves Mbarga", average: 17.6, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
    ],
  },
  {
    id: "cm2",
    level: "CM2",
    teacher: "M. Théodore Biyong",
    period: "Composition 2 — 2024–2025",
    color: "#6B1645",
    bg: "#fdf2f8",
    gradient: "linear-gradient(135deg, #4A0F30 0%, #6B1645 40%, #F5821F 100%)",
    emoji: "🎓",
    students: [
      { rank: 1, name: "Esther Nkoulou", average: 19.5, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
      { rank: 2, name: "Théo Manga", average: 19.2, mention: "Très Bien", mention_color: "#16a34a", emoji: "👦" },
      { rank: 3, name: "Carine Eba", average: 18.8, mention: "Très Bien", mention_color: "#16a34a", emoji: "👧" },
    ],
  },
];

const medalEmoji = ["🥇", "🥈", "🥉"];
const medalColors: Record<number, string> = { 1: "#F59E0B", 2: "#94A3B8", 3: "#CD7C3A" };

/* ─── Single student row ─────────────────────────────────────────────── */
function StudentRow({ student, index }: { student: ClassStudent; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
    >
      {/* Rank */}
      <div className="text-2xl w-8 text-center shrink-0">
        {medalEmoji[student.rank - 1] ?? `#${student.rank}`}
      </div>

      {/* Photo / emoji */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md overflow-hidden"
        style={{ background: `${medalColors[student.rank]}22` }}
      >
        {student.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl">{student.emoji}</span>
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 text-sm leading-tight truncate">{student.name}</p>
        <p className="text-xs font-medium mt-0.5" style={{ color: student.mention_color }}>
          {student.mention}
        </p>
      </div>

      {/* Average */}
      <div className="text-right shrink-0">
        <p className="font-display font-extrabold text-lg text-gray-900">
          {student.average.toFixed(1)}
        </p>
        <p className="text-xs text-gray-400">/ 20</p>
      </div>
    </motion.div>
  );
}

/* ─── Class ranking card ─────────────────────────────────────────────── */
function ClassRankCard({ cls, index }: { cls: ClassRanking; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(index < 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.09, ease: "easeOut" }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-black/5"
    >
      {/* Header */}
      <button
        className="w-full text-left cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <div
          className="relative px-6 py-5 flex items-center justify-between overflow-hidden"
          style={{ background: cls.gradient }}
        >
          <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-white/10 blur-2xl" />
          <div className="flex items-center gap-3">
            <span className="text-4xl">{cls.emoji}</span>
            <div>
              <div
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1"
                style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
              >
                {cls.period}
              </div>
              <p className="font-display font-extrabold text-xl text-white leading-tight">
                {cls.level}
              </p>
              <p className="text-white/70 text-xs font-medium">{cls.teacher}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <IconChevronDown size={16} className="text-white" />
          </motion.div>
        </div>

        {/* Top 1 preview */}
        {!expanded && (
          <div
            className="px-6 py-3 flex items-center gap-3 border-t"
            style={{ borderColor: cls.color + "22", backgroundColor: cls.bg }}
          >
            <span className="text-xl">🥇</span>
            <span className="text-sm font-bold text-gray-800">{cls.students[0].name}</span>
            <span className="text-xs font-semibold ml-auto" style={{ color: cls.color }}>
              {cls.students[0].average.toFixed(1)} / 20
            </span>
          </div>
        )}
      </button>

      {/* Students list */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              {cls.students.map((s, i) => (
                <StudentRow key={s.name} student={s} index={i} />
              ))}
            </div>

            {/* See all link */}
            <div
              className="mx-4 mb-4 py-2 rounded-xl text-center text-xs font-bold cursor-pointer border transition-colors hover:opacity-80"
              style={{
                color: cls.color,
                borderColor: cls.color + "33",
                backgroundColor: cls.bg,
              }}
            >
              <IconTrophy size={12} className="inline mr-1.5" />
              Voir le classement complet
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ClassRankings() {
  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {[["🥇", "1er de classe"], ["🥈", "2ème de classe"], ["🥉", "3ème de classe"]].map(([e, l]) => (
          <span key={l} className="flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-100 rounded-full px-4 py-1.5 shadow-sm">
            <span>{e}</span> {l}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-100 rounded-full px-4 py-1.5 shadow-sm">
          <IconStar size={14} className="text-[#F5821F] fill-[#F5821F]" /> Moyenne sur 20
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rankings.map((cls, i) => (
          <ClassRankCard key={cls.id} cls={cls} index={i} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IconMedal, IconStar, IconTrophy } from "@tabler/icons-react";

export type ExamTopStudent = {
  id: string;
  name: string;
  exam: string;
  year: string;
  score: string;
  mention: string;
  mention_color: string;
  rank: number;
  emoji: string;
  gradient: string;
  photo?: string; // path to real photo if available
  school_rank?: string; // e.g. "1er au niveau régional"
};

const topStudents: ExamTopStudent[] = [
  {
    id: "1",
    name: "Esther Nkoulou",
    exam: "CEP",
    year: "2024–2025",
    score: "19,5 / 20",
    mention: "Très Bien",
    mention_color: "#16a34a",
    rank: 1,
    emoji: "👩",
    gradient: "linear-gradient(135deg, #4A0F30 0%, #6B1645 60%, #9B2765 100%)",
    school_rank: "1ère du département",
  },
  {
    id: "2",
    name: "Théo Manga",
    exam: "CEP",
    year: "2024–2025",
    score: "19,2 / 20",
    mention: "Très Bien",
    mention_color: "#16a34a",
    rank: 2,
    emoji: "👦",
    gradient: "linear-gradient(135deg, #c85500 0%, #F5821F 60%, #FFB347 100%)",
    school_rank: "2ème du département",
  },
  {
    id: "3",
    name: "Fatoumata Diallo",
    exam: "BEPC",
    year: "2024–2025",
    score: "17,8 / 20",
    mention: "Très Bien",
    mention_color: "#16a34a",
    rank: 1,
    emoji: "👩",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #60a5fa 100%)",
    school_rank: "1ère de l'académie",
  },
  {
    id: "4",
    name: "Boris Eto'o",
    exam: "CEP",
    year: "2023–2024",
    score: "19,0 / 20",
    mention: "Très Bien",
    mention_color: "#16a34a",
    rank: 1,
    emoji: "👦",
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #4ade80 100%)",
    school_rank: "1er du département",
  },
  {
    id: "5",
    name: "Aurelie Mvondo",
    exam: "BEPC",
    year: "2023–2024",
    score: "17,4 / 20",
    mention: "Bien",
    mention_color: "#F5821F",
    rank: 2,
    emoji: "👩",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #9333ea 60%, #c084fc 100%)",
    school_rank: "2ème de l'académie",
  },
  {
    id: "6",
    name: "Samuel Abega",
    exam: "CEP",
    year: "2022–2023",
    score: "18,9 / 20",
    mention: "Très Bien",
    mention_color: "#16a34a",
    rank: 1,
    emoji: "👦",
    gradient: "linear-gradient(135deg, #78350f 0%, #b45309 60%, #f59e0b 100%)",
    school_rank: "Major du département",
  },
];

const medalColors: Record<number, string> = {
  1: "#F59E0B",
  2: "#9CA3AF",
  3: "#CD7C3A",
};

const medalLabels: Record<number, string> = {
  1: "Or",
  2: "Argent",
  3: "Bronze",
};

function StudentCard({ student, index }: { student: ExamTopStudent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Card header */}
      <div
        className="relative h-40 flex flex-col items-center justify-end pb-3 overflow-hidden"
        style={{ background: student.gradient }}
      >
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-black/10 blur-2xl" />

        {/* Photo circle */}
        <div className="relative w-20 h-20 rounded-full border-4 border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl mb-1 overflow-hidden">
          {student.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={student.photo}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl select-none">{student.emoji}</span>
          )}
          {/* Medal badge */}
          {student.rank <= 3 && (
            <div
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-md"
              style={{ backgroundColor: medalColors[student.rank] }}
            >
              <IconMedal size={13} className="text-white" />
            </div>
          )}
        </div>

        {/* Exam badge */}
        <span className="px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold backdrop-blur-sm">
          {student.exam} · {student.year}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 text-center">
        <h3 className="font-display font-extrabold text-lg text-gray-900 leading-tight">
          {student.name}
        </h3>

        {student.school_rank && (
          <p className="text-xs font-semibold text-[#6B1645] mt-1 flex items-center justify-center gap-1">
            <IconTrophy size={11} />
            {student.school_rank}
          </p>
        )}

        {/* Score */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="text-center">
            <p className="font-display font-extrabold text-2xl text-gray-900">
              {student.score}
            </p>
            <p className="text-xs text-gray-400 font-medium">Score</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center">
            <p
              className="font-bold text-sm"
              style={{ color: student.mention_color }}
            >
              {student.mention}
            </p>
            <p className="text-xs text-gray-400 font-medium">Mention</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center">
            <p
              className="font-display font-extrabold text-xl"
              style={{ color: medalColors[student.rank] ?? "#6B1645" }}
            >
              {student.rank <= 3
                ? `🥇🥈🥉`[student.rank - 1]
                : `#${student.rank}`}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {medalLabels[student.rank] ?? "Classement"}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-0.5 mt-4">
          {[...Array(5)].map((_, i) => (
            <IconStar
              key={i}
              size={14}
              className={i < Math.round(student.score.startsWith("19") ? 5 : 4) ? "text-[#F5821F] fill-[#F5821F]" : "text-gray-200 fill-gray-200"}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function BestStudents() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topStudents.map((student, i) => (
          <StudentCard key={student.id} student={student} index={i} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  IconArrowLeft,
  IconUsers,
  IconBook2,
  IconStar,
  IconAward,
  IconChevronDown,
  IconMail,
  IconBrush,
  IconCalculator,
  IconLanguage,
  IconMusic,
  IconRun,
  IconFlask,
} from "@tabler/icons-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";

/* ─── Types ──────────────────────────────────────────────────────────── */
type Teacher = {
  name: string;
  role: string;
  diploma: string;
  experience: string;
  quote: string;
  emoji: string;
  gradient: string;
  subjects: { label: string; icon: React.ElementType }[];
};

type ClassLevel = {
  id: string;
  level: string;
  fullName: string;
  ages: string;
  pupils: number;
  emoji: string;
  color: string;
  bg: string;
  gradient: string;
  description: string;
  skills: string[];
  teacher: Teacher;
};

/* ─── Data ───────────────────────────────────────────────────────────── */
const classes: ClassLevel[] = [
  {
    id: "maternelle-1",
    level: "Maternelle 1",
    fullName: "Petite Section",
    ages: "3 – 4 ans",
    pupils: 22,
    emoji: "🌱",
    color: "#16a34a",
    bg: "#f0fdf4",
    gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 55%, #4ade80 100%)",
    description:
      "La Petite Section est le premier pas dans l'univers scolaire. Dans un cadre chaleureux et sécurisé, les enfants développent leur autonomie, leur langage oral et leur motricité à travers le jeu.",
    skills: [
      "Éveil sensoriel",
      "Langage oral",
      "Motricité fine & globale",
      "Vie collective",
      "Premiers tracés",
    ],
    teacher: {
      name: "Mme Anita Mbongo",
      role: "Institutrice Maternelle",
      diploma: "DIPES I – ENS Yaoundé",
      experience: "9 ans d'expérience",
      quote:
        "Chaque enfant est une graine merveilleuse. Mon rôle est de créer le sol fertile où il peut éclore.",
      emoji: "🌿",
      gradient: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
      subjects: [
        { label: "Éveil", icon: IconBrush },
        { label: "Langage", icon: IconLanguage },
        { label: "Musique", icon: IconMusic },
      ],
    },
  },
  {
    id: "maternelle-2",
    level: "Maternelle 2",
    fullName: "Moyenne Section",
    ages: "4 – 5 ans",
    pupils: 24,
    emoji: "🌿",
    color: "#0891b2",
    bg: "#ecfeff",
    gradient: "linear-gradient(135deg, #155e75 0%, #0891b2 55%, #67e8f9 100%)",
    description:
      "La Moyenne Section renforce les acquis de la Petite Section et prépare progressivement l'enfant aux apprentissages fondamentaux. L'accent est mis sur la curiosité, la concentration et la créativité.",
    skills: [
      "Pré-lecture",
      "Numération de 1 à 20",
      "Expression artistique",
      "Vivre ensemble",
      "Coordination motrice",
    ],
    teacher: {
      name: "Mme Clarisse Oyono",
      role: "Institutrice Maternelle",
      diploma: "DIPES I – Université de Douala",
      experience: "7 ans d'expérience",
      quote:
        "La curiosité est le moteur de l'apprentissage. J'allume cette flamme chaque matin.",
      emoji: "💧",
      gradient: "linear-gradient(135deg, #155e75 0%, #0891b2 100%)",
      subjects: [
        { label: "Pré-lecture", icon: IconBook2 },
        { label: "Éveil", icon: IconBrush },
        { label: "Sport", icon: IconRun },
      ],
    },
  },
  {
    id: "maternelle-3",
    level: "Maternelle 3",
    fullName: "Grande Section",
    ages: "5 – 6 ans",
    pupils: 25,
    emoji: "🌸",
    color: "#9333ea",
    bg: "#faf5ff",
    gradient: "linear-gradient(135deg, #4c1d95 0%, #9333ea 55%, #c084fc 100%)",
    description:
      "La Grande Section est la charnière entre l'école maternelle et le CP. Les enfants acquièrent les pré-requis solides en lecture, écriture et calcul pour aborder le primaire avec confiance.",
    skills: [
      "Pré-écriture & graphisme",
      "Conscience phonologique",
      "Numération jusqu'à 30",
      "Découverte du monde",
      "Autonomie scolaire",
    ],
    teacher: {
      name: "Mme Nadège Essono",
      role: "Institutrice Maternelle Senior",
      diploma: "DIPES I + Formation Montessori",
      experience: "12 ans d'expérience",
      quote:
        "La Grande Section, c'est le décollage. J'accompagne chaque enfant vers sa propre envergure.",
      emoji: "✨",
      gradient: "linear-gradient(135deg, #4c1d95 0%, #9333ea 100%)",
      subjects: [
        { label: "Graphisme", icon: IconBrush },
        { label: "Maths", icon: IconCalculator },
        { label: "Phono", icon: IconLanguage },
      ],
    },
  },
  {
    id: "cp",
    level: "CP",
    fullName: "Cours Préparatoire",
    ages: "6 – 7 ans",
    pupils: 28,
    emoji: "📖",
    color: "#F5821F",
    bg: "#fff7ed",
    gradient: "linear-gradient(135deg, #c85500 0%, #F5821F 55%, #FFB347 100%)",
    description:
      "Le CP est l'année de l'apprentissage de la lecture et de l'écriture. Grâce à une pédagogie active et différenciée, chaque élève progresse à son rythme vers la maîtrise des bases fondamentales.",
    skills: [
      "Lecture & déchiffrage",
      "Écriture cursive",
      "Addition & soustraction",
      "Découverte du vivant",
      "Expression orale",
    ],
    teacher: {
      name: "M. Patrick Ondoua",
      role: "Instituteur Primaire",
      diploma: "DIPES I – ENS Yaoundé",
      experience: "11 ans d'expérience",
      quote:
        "Apprendre à lire est un cadeau pour la vie. C'est une joie immense d'offrir cette clé à chaque enfant.",
      emoji: "🔑",
      gradient: "linear-gradient(135deg, #c85500 0%, #F5821F 100%)",
      subjects: [
        { label: "Lecture", icon: IconBook2 },
        { label: "Calcul", icon: IconCalculator },
        { label: "Sciences", icon: IconFlask },
      ],
    },
  },
  {
    id: "ce1",
    level: "CE1",
    fullName: "Cours Élémentaire 1",
    ages: "7 – 8 ans",
    pupils: 30,
    emoji: "✏️",
    color: "#6B1645",
    bg: "#fdf2f8",
    gradient: "linear-gradient(135deg, #4A0F30 0%, #6B1645 55%, #9B2765 100%)",
    description:
      "Au CE1, les élèves consolident la lecture et développent la compréhension de textes. Les mathématiques s'enrichissent avec la multiplication et la géométrie. La curiosité scientifique s'éveille.",
    skills: [
      "Lecture & compréhension",
      "Conjugaison & grammaire",
      "Tables de multiplication",
      "Géométrie plane",
      "Éveil scientifique",
    ],
    teacher: {
      name: "Mme Rachel Ateba",
      role: "Institutrice Primaire",
      diploma: "DIPES I – Université de Ngaoundéré",
      experience: "8 ans d'expérience",
      quote:
        "La curiosité d'un enfant est infinie. Mon rôle est de ne jamais l'éteindre, mais de la guider.",
      emoji: "💜",
      gradient: "linear-gradient(135deg, #4A0F30 0%, #9B2765 100%)",
      subjects: [
        { label: "Français", icon: IconLanguage },
        { label: "Maths", icon: IconCalculator },
        { label: "Éveil", icon: IconBrush },
      ],
    },
  },
  {
    id: "ce2",
    level: "CE2",
    fullName: "Cours Élémentaire 2",
    ages: "8 – 9 ans",
    pupils: 29,
    emoji: "🔭",
    color: "#1d4ed8",
    bg: "#eff6ff",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #60a5fa 100%)",
    description:
      "Le CE2 marque un tournant vers plus d'autonomie intellectuelle. Les élèves rédigent leurs premiers textes, maîtrisent les quatre opérations et s'ouvrent au monde à travers la géographie et l'histoire.",
    skills: [
      "Production écrite",
      "Divisions & fractions simples",
      "Histoire & géographie",
      "Anglais initiation",
      "Projet scientifique",
    ],
    teacher: {
      name: "M. Joël Nkeng",
      role: "Instituteur Primaire",
      diploma: "DIPES I + Certification Anglais",
      experience: "10 ans d'expérience",
      quote:
        "L'ouverture sur le monde commence en classe. Je veux que mes élèves soient des citoyens curieux et engagés.",
      emoji: "🌍",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
      subjects: [
        { label: "Français", icon: IconLanguage },
        { label: "Anglais", icon: IconBook2 },
        { label: "Sciences", icon: IconFlask },
      ],
    },
  },
  {
    id: "cm1",
    level: "CM1",
    fullName: "Cours Moyen 1",
    ages: "9 – 10 ans",
    pupils: 27,
    emoji: "🧪",
    color: "#b45309",
    bg: "#fffbeb",
    gradient: "linear-gradient(135deg, #78350f 0%, #b45309 55%, #f59e0b 100%)",
    description:
      "Au CM1, les élèves approfondissent toutes les matières et développent leur esprit critique. La lecture de textes complexes, les calculs avancés et les projets de groupe préparent au cycle final du primaire.",
    skills: [
      "Lecture analytique",
      "Rédaction structurée",
      "Calcul mental avancé",
      "Éducation civique",
      "Expériences scientifiques",
    ],
    teacher: {
      name: "Mme Christelle Fouda",
      role: "Institutrice Primaire",
      diploma: "DIPES I – ENS Bertoua",
      experience: "14 ans d'expérience",
      quote:
        "Un élève qui réfléchit par lui-même est ma plus belle récompense. Je cultive l'esprit critique dès le plus jeune âge.",
      emoji: "🏅",
      gradient: "linear-gradient(135deg, #78350f 0%, #b45309 100%)",
      subjects: [
        { label: "Sciences", icon: IconFlask },
        { label: "Maths", icon: IconCalculator },
        { label: "Français", icon: IconLanguage },
      ],
    },
  },
  {
    id: "cm2",
    level: "CM2",
    fullName: "Cours Moyen 2",
    ages: "10 – 12 ans",
    pupils: 26,
    emoji: "🎓",
    color: "#6B1645",
    bg: "#fdf2f8",
    gradient: "linear-gradient(135deg, #4A0F30 0%, #6B1645 40%, #F5821F 100%)",
    description:
      "Le CM2 est la classe de tous les accomplissements. Les élèves se préparent à l'entrée en 6ème avec rigueur et confiance. Révisions, examens blancs et projets interdisciplinaires sont au programme.",
    skills: [
      "Rédaction & dissertation",
      "Résolution de problèmes",
      "Géographie du Cameroun",
      "Anglais intermédiaire",
      "Orientation & bilan scolaire",
    ],
    teacher: {
      name: "M. Théodore Biyong",
      role: "Directeur des Études & Enseignant CM2",
      diploma: "DIPES II – ENS Yaoundé",
      experience: "18 ans d'expérience",
      quote:
        "Le CM2, c'est la rampe de lancement. Je prépare chaque élève à voler de ses propres ailes vers le collège.",
      emoji: "🚀",
      gradient: "linear-gradient(135deg, #4A0F30 0%, #F5821F 100%)",
      subjects: [
        { label: "Toutes matières", icon: IconAward },
        { label: "Anglais", icon: IconLanguage },
        { label: "Maths", icon: IconCalculator },
      ],
    },
  },
];

/* ─── Teacher Card ───────────────────────────────────────────────────── */
function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg shadow-black/5">
      {/* Avatar band */}
      <div
        className="relative h-28 flex items-end justify-start px-6 pb-0"
        style={{ background: teacher.gradient }}
      >
        {/* Big emoji */}
        <span
          className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl select-none"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.18))" }}
        >
          {teacher.emoji}
        </span>
        {/* Avatar circle placeholder */}
        <div className="relative w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center translate-y-8 shadow-xl">
          <span className="text-3xl">{teacher.emoji}</span>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pt-12 pb-6">
        <p className="font-display font-extrabold text-lg text-gray-900 leading-snug">
          {teacher.name}
        </p>
        <p className="text-sm font-semibold text-[#6B1645] mt-0.5">{teacher.role}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full px-3 py-1">
            <IconAward size={12} />
            {teacher.diploma}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#FEF3E8] text-[#F5821F] rounded-full px-3 py-1">
            <IconStar size={12} />
            {teacher.experience}
          </span>
        </div>

        {/* Subjects */}
        <div className="flex gap-2 mt-4">
          {teacher.subjects.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 flex-1 bg-gray-50 rounded-xl py-2 px-1"
              >
                <Icon size={16} className="text-[#6B1645]" />
                <span className="text-[10px] font-semibold text-gray-500 text-center leading-tight">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quote */}
        <blockquote className="mt-5 border-l-3 border-[#F5821F] pl-3 text-sm text-gray-500 italic leading-relaxed">
          &ldquo;{teacher.quote}&rdquo;
        </blockquote>

        {/* Contact */}
        <button className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-[#6B1645] bg-[#F9EEF6] hover:bg-[#6B1645] hover:text-white transition-colors duration-250 cursor-pointer">
          <IconMail size={15} />
          Contacter l&apos;enseignant
        </button>
      </div>
    </div>
  );
}

/* ─── Class Card ─────────────────────────────────────────────────────── */
function ClassCard({
  cls,
  index,
}: {
  cls: ClassLevel;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/8 transition-shadow duration-400"
    >
      {/* Header band */}
      <div
        className="relative h-36 flex items-center px-7 overflow-hidden"
        style={{ background: cls.gradient }}
      >
        {/* Blur blobs */}
        <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-4 w-28 h-28 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        {/* Emoji */}
        <span
          className="absolute right-7 text-8xl select-none opacity-90"
          style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.22))" }}
        >
          {cls.emoji}
        </span>

        <div>
          <div className="inline-block px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs text-white font-bold uppercase tracking-widest mb-2">
            {cls.ages}
          </div>
          <h3 className="font-display font-extrabold text-2xl text-white leading-tight drop-shadow">
            {cls.level}
          </h3>
          <p className="text-white/75 text-sm font-medium mt-0.5">{cls.fullName}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-6">
        {/* Pupils count */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <IconUsers size={15} />
          <span className="font-semibold">{cls.pupils} élèves inscrits</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">{cls.description}</p>

        {/* Skills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {cls.skills.map((s) => (
            <span
              key={s}
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full border"
              style={{
                backgroundColor: cls.bg,
                color: cls.color,
                borderColor: cls.color + "33",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Teacher accordion toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-6 w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{cls.teacher.emoji}</span>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {cls.teacher.name}
              </p>
              <p className="text-xs text-gray-400">{cls.teacher.role}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <IconChevronDown size={18} className="text-gray-400" />
          </motion.div>
        </button>

        {/* Teacher detail accordion */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="teacher-detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <TeacherCard teacher={cls.teacher} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Stats ──────────────────────────────────────────────────────────── */
const stats = [
  { value: "8", label: "Classes", icon: "🏫" },
  { value: "8", label: "Enseignants", icon: "👩‍🏫" },
  { value: "211", label: "Élèves", icon: "🎒" },
  { value: "100%", label: "Qualifiés DIPES", icon: "🎓" },
];

/* ─── Filter tabs ────────────────────────────────────────────────────── */
const filters = [
  { id: "all", label: "Toutes les classes" },
  { id: "maternelle", label: "Maternelle" },
  { id: "primaire", label: "Primaire" },
];

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ClassesPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = classes.filter((c) => {
    if (activeFilter === "maternelle") return c.id.startsWith("maternelle");
    if (activeFilter === "primaire") return !c.id.startsWith("maternelle");
    return true;
  });

  return (
    <PageTransition>
    <main className="min-h-screen bg-[oklch(0.9985_0.005_80)]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-28 overflow-hidden bg-linear-to-br from-[#3A0820] via-[#6B1645] to-[#9B2765]">
        {/* Blobs */}
        <div className="absolute top-16 left-16 w-80 h-80 rounded-full bg-[#F5821F]/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#4A0F30]/50 blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
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
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 mb-7"
          >
            <IconUsers size={15} className="text-[#F5821F]" />
            <span className="text-white/90 text-sm font-semibold">
              Nos classes &amp; notre équipe
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white leading-tight"
          >
            Classes &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F5821F] to-[#FFB347]">
              Enseignants
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-5 text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            De la Petite Section au CM2, découvrez notre programme pédagogique et
            les enseignants passionnés qui accompagnent chaque enfant vers
            l&apos;excellence.
          </motion.p>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {["🌱 Maternelle 1–3", "📖 CP", "✏️ CE1–CE2", "🧪 CM1", "🎓 CM2"].map(
              (b) => (
                <span
                  key={b}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-sm font-semibold backdrop-blur-sm"
                >
                  {b}
                </span>
              )
            )}
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

      {/* ── Stats ── */}
      <section ref={statsRef} className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 pb-6">
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

      {/* ── Filters ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-250 cursor-pointer border ${
                activeFilter === f.id
                  ? "bg-[#6B1645] text-white border-[#6B1645] shadow-lg shadow-[#6B1645]/25"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#6B1645]/40 hover:text-[#6B1645]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Classes grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-24">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
          >
            {filtered.map((cls, i) => (
              <ClassCard key={cls.id} cls={cls} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
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
            <span className="text-5xl mb-5 block">🎒</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              Inscrivez votre enfant dès aujourd&apos;hui
            </h2>
            <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Les places sont limitées. Rejoignez la famille Ephrata et offrez à
              votre enfant les meilleures chances de réussite.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/#contact"
                className="px-8 py-3.5 rounded-2xl bg-white text-[#6B1645] text-sm font-extrabold hover:bg-orange-50 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Demander une inscription
              </Link>
              <Link
                href="/galerie"
                className="px-8 py-3.5 rounded-2xl bg-white/15 border border-white/30 text-white text-sm font-bold hover:bg-white/25 transition-colors backdrop-blur-sm"
              >
                Voir la galerie
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

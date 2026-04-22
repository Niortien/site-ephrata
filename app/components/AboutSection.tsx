"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  IconTrophy,
  IconHeart,
  IconBulb,
  IconShield,
  IconStarFilled,
} from "@tabler/icons-react";

const values = [
  {
    icon: IconTrophy,
    title: "Excellence",
    description:
      "Nous cultivons la rigueur académique et l'ambition intellectuelle pour préparer chaque enfant à un avenir brillant.",
    color: "#F5821F",
    bg: "#FEF3E8",
    delay: 0,
  },
  {
    icon: IconShield,
    title: "Discipline",
    description:
      "Dans un cadre bienveillant et structuré, les élèves apprennent la persévérance et le sens des responsabilités.",
    color: "#6B1645",
    bg: "#F9EEF6",
    delay: 0.1,
  },
  {
    icon: IconBulb,
    title: "Créativité",
    description:
      "Nous stimulons l'imagination et la pensée critique à travers des activités artistiques, scientifiques et ludiques.",
    color: "#F5821F",
    bg: "#FEF3E8",
    delay: 0.2,
  },
  {
    icon: IconHeart,
    title: "Bienveillance",
    description:
      "Chaque enfant est unique. Nous accompagnons son épanouissement personnel avec chaleur, écoute et respect.",
    color: "#6B1645",
    bg: "#F9EEF6",
    delay: 0.3,
  },
];

function ValueCard({ value, index }: { value: (typeof values)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = value.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: value.delay, ease: "easeOut" }}
      className="group relative rounded-3xl p-8 cursor-default overflow-hidden"
      style={{ backgroundColor: value.bg }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      {/* Large background number */}
      <span
        className="absolute top-4 right-6 font-display font-extrabold opacity-8 select-none"
        style={{ fontSize: "5rem", color: value.color, opacity: 0.06, lineHeight: 1 }}
      >
        0{index + 1}
      </span>

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md transition-transform group-hover:scale-110 duration-300"
        style={{ backgroundColor: value.color }}
      >
        <Icon size={26} className="text-white" />
      </div>

      <h3
        className="font-display font-bold text-xl mb-3"
        style={{ color: value.color }}
      >
        {value.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
        style={{ backgroundColor: value.color }}
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#FFFBF5" }}
    >
      {/* Background blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, #F9EEF6 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9EEF6] text-[#6B1645] text-sm font-bold mb-4">
            <IconStarFilled size={12} />
            Notre philosophie
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-5">
            Construire{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B1645, #F5821F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              l&apos;avenir
            </span>{" "}
            ensemble
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            À l&apos;École Ephrata, nous croyons que chaque enfant porte en lui
            un potentiel extraordinaire. Notre mission est de le révéler.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>

        {/* Story block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #6B1645 0%, #9B2765 50%, #F5821F 100%)",
          }}
        >
          <div className="px-8 py-12 md:px-16 md:py-14 text-white flex flex-col md:flex-row items-center gap-10">
            <div className="md:flex-1">
              <h3 className="font-display font-extrabold text-2xl md:text-3xl mb-4">
                Une école fondée sur la confiance
              </h3>
              <p className="text-white/80 leading-relaxed text-base">
                Depuis plus de 15 ans, le Groupe Scolaire Privé Ephrata accueille
                les enfants dans un environnement sûr, stimulant et joyeux.
                Nos méthodes pédagogiques innovantes allient tradition académique et
                épanouissement personnel.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-64 shrink-0">
              {[
                { n: "500+", l: "Élèves" },
                { n: "30+", l: "Enseignants" },
                { n: "15+", l: "Années" },
                { n: "98%", l: "Satisfaction" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/15 rounded-2xl p-4 text-center backdrop-blur-sm"
                >
                  <div className="font-display font-extrabold text-2xl">
                    {s.n}
                  </div>
                  <div className="text-white/70 text-xs mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

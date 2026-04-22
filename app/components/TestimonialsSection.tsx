"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IconStarFilled, IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    name: "Marie-Claire Ngo",
    role: "Mère de Lucas, CP",
    quote:
      "Depuis que mon fils est à l'École Ephrata, il adore aller à l'école chaque matin. Les enseignants sont dévoués, bienveillants et vraiment à l'écoute. Une école qui tient ses promesses !",
    stars: 5,
    avatar: "M",
    avatarBg: "linear-gradient(135deg, #6B1645, #9B2765)",
    delay: 0,
  },
  {
    name: "Jean-Paul Ekane",
    role: "Père de Sophie, CE2",
    quote:
      "Le niveau académique est excellent. Ma fille a fait des progrès remarquables en seulement quelques mois. L'ambiance est familiale et les activités extra-scolaires sont vraiment enrichissantes.",
    stars: 5,
    avatar: "J",
    avatarBg: "linear-gradient(135deg, #F5821F, #FFB347)",
    delay: 0.1,
  },
  {
    name: "Aïcha Mbodj",
    role: "Mère de Karim, CM1",
    quote:
      "Ce qui me plaît le plus c'est la mixité des méthodes : traditionnel et moderne. Mon enfant apprend avec joie, et ça se voit dans ses résultats et sa confiance en lui. Je recommande vivement !",
    stars: 5,
    avatar: "A",
    avatarBg: "linear-gradient(135deg, #9B2765, #F5821F)",
    delay: 0.2,
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: t.delay }}
      className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 cursor-default"
      whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(107,22,69,0.12)", transition: { duration: 0.25 } }}
    >
      {/* Quote icon */}
      <div
        className="absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center opacity-30"
        style={{ background: "linear-gradient(135deg, #6B1645, #F5821F)" }}
      >
        <IconQuote size={18} className="text-white" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: t.stars }).map((_, i) => (
          <IconStarFilled key={i} size={16} className="text-[#F5821F]" />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-gray-600 leading-relaxed text-sm mb-7 italic">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 shadow-md"
          style={{ background: t.avatarBg }}
        >
          {t.avatar}
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm">{t.name}</div>
          <div className="text-gray-400 text-xs">{t.role}</div>
        </div>
      </div>

      {/* Bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg, #6B1645, #F5821F)" }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#F9EEF6" }}
    >
      {/* Wave top */}
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
            Ils nous font confiance
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-5">
            Ce que disent{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B1645, #F5821F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              nos parents
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            La confiance des familles est notre plus belle récompense.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-center">
              <div className="font-display font-extrabold text-4xl text-[#6B1645]">4.9</div>
              <div className="text-gray-400 text-xs mt-0.5">sur 5</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled key={i} size={18} className="text-[#F5821F]" />
                ))}
              </div>
              <div className="text-gray-500 text-sm">Basé sur +120 avis parents</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave bottom */}
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

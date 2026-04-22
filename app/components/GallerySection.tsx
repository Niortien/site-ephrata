"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  IconCamera,
  IconStarFilled,
  IconUsers,
  IconTrophy,
  IconPalette,
  IconRun,
  IconBook2,
  IconMusic,
} from "@tabler/icons-react";

const galleryItems = [
  {
    label: "Lecture en salle",
    icon: IconBook2,
    bg: "linear-gradient(135deg, #6B1645 0%, #9B2765 100%)",
    size: "tall",
    emoji: "📚",
  },
  {
    label: "Activités sportives",
    icon: IconRun,
    bg: "linear-gradient(135deg, #F5821F 0%, #FFB347 100%)",
    size: "normal",
    emoji: "⚽",
  },
  {
    label: "Cours d'art",
    icon: IconPalette,
    bg: "linear-gradient(135deg, #9B2765 0%, #F5821F 100%)",
    size: "normal",
    emoji: "🎨",
  },
  {
    label: "Travail en équipe",
    icon: IconUsers,
    bg: "linear-gradient(135deg, #4A0F30 0%, #6B1645 100%)",
    size: "wide",
    emoji: "🤝",
  },
  {
    label: "Eveil musical",
    icon: IconMusic,
    bg: "linear-gradient(135deg, #F5821F 0%, #e07010 100%)",
    size: "normal",
    emoji: "🎵",
  },
  {
    label: "Cérémonie primée",
    icon: IconTrophy,
    bg: "linear-gradient(135deg, #6B1645 0%, #F5821F 100%)",
    size: "tall",
    emoji: "🏆",
  },
  {
    label: "Récréation joyeuse",
    icon: IconCamera,
    bg: "linear-gradient(135deg, #9B2765 0%, #6B1645 100%)",
    size: "wide",
    emoji: "😊",
  },
];

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03, zIndex: 10 }}
      style={{
        background: item.bg,
        gridColumn: item.size === "wide" ? "span 2" : "span 1",
        gridRow: item.size === "tall" ? "span 2" : "span 1",
        minHeight: item.size === "tall" ? "300px" : "150px",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Emoji large */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", opacity: 0.18 }}
      >
        {item.emoji}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon size={16} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">{item.label}</span>
        </div>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"
        initial={false}
      />

      {/* Bottom shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            animation: "shimmer 1.5s ease-in-out",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#FFFBF5" }}
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3E8] text-[#F5821F] text-sm font-bold mb-4">
            <IconStarFilled size={12} />
            La vie à l&apos;école
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-5">
            Des{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B1645, #F5821F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              souvenirs inoubliables
            </span>{" "}
            chaque jour
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            La vie à l&apos;École Ephrata est riche en découvertes, rires,
            partages et petites victoires qui forgent le caractère.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]"
          style={{ gridAutoRows: "180px" }}
        >
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-4">
            Bien plus encore dans notre école
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white font-bold shadow-lg cursor-pointer"
            style={{ background: "linear-gradient(135deg, #6B1645, #9B2765)" }}
          >
            <IconCamera size={16} />
            Planifier une visite
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

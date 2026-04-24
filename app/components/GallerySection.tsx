"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  IconCamera,
  IconStarFilled,
} from "@tabler/icons-react";

const galleryItems = [
  {
    label: "Sortie en récréation",
    src: "/assets/images/home/2Q%3D%3D.jpg",
    size: "tall",
  },
  {
    label: "Élèves en tenue",
    src: "/assets/images/home/2Q%3D%3D%20(1).jpg",
    size: "normal",
  },
  {
    label: "Équipe sportive",
    src: "/assets/images/home/2Q%3D%3D%20(2).jpg",
    size: "wide",
  },
  {
    label: "Groupe classe",
    src: "/assets/images/home/9k%3D.jpg",
    size: "normal",
  },
  {
    label: "Défilé en costume",
    src: "/assets/images/home/9k%3D%20(1).jpg",
    size: "normal",
  },
  {
    label: "Sortie récréative",
    src: "/assets/images/home/Z.jpg",
    size: "normal",
  },
  {
    label: "Cérémonie de fin d'année",
    src: "/assets/images/home/Z%20(1).jpg",
    size: "wide",
  },
  {
    label: "Joie partagée",
    src: "/assets/images/home/Z%20(2).jpg",
    size: "tall",
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03, zIndex: 10 }}
      style={{
        gridColumn: item.size === "wide" ? "span 2" : "span 1",
        gridRow: item.size === "tall" ? "span 2" : "span 1",
      }}
    >
      {/* Real photo */}
      <Image
        src={item.src}
        alt={item.label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-white font-semibold text-sm drop-shadow-sm">
          {item.label}
        </span>
      </div>

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
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

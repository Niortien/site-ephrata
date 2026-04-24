"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconBell, IconArrowRight } from "@tabler/icons-react";

export type Announcement = {
  id: string;
  tag: string;
  message: string;
  cta?: { label: string; href: string };
};

const announcements: Announcement[] = [
  {
    id: "inscriptions-2025-2026",
    tag: "📣 Inscriptions ouvertes",
    message:
      "Les inscriptions pour l'année scolaire 2025–2026 sont ouvertes. Places limitées !",
    cta: { label: "S'inscrire", href: "#contact" },
  },
  // Ajoutez d'autres annonces ici :
  // {
  //   id: "rentree-septembre",
  //   tag: "📅 Rentrée",
  //   message: "La rentrée scolaire 2025-2026 aura lieu le lundi 8 septembre.",
  // },
];

const STORAGE_KEY = "ephrata-dismissed-announcements";

function getDismissed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function dismiss(id: string) {
  const prev = getDismissed();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set([...prev, id])]));
}

export default function AnnouncementBanner() {
  const [current, setCurrent] = useState<Announcement | null>(null);

  useEffect(() => {
    const dismissed = getDismissed();
    const next = announcements.find((a) => !dismissed.includes(a.id)) ?? null;
    setCurrent(next);
  }, []);

  const handleDismiss = () => {
    if (!current) return;
    dismiss(current.id);
    setCurrent(null);
  };

  const handleCta = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #4A0F30 0%, #6B1645 40%, #b45309 80%, #F5821F 100%)",
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-2.5 max-w-7xl mx-auto">
            {/* Left — icon + message */}
            <div className="flex items-center gap-2 min-w-0">
              <IconBell size={15} className="text-orange-200 shrink-0" />
              <span className="text-white/90 text-xs sm:text-sm font-semibold truncate">
                <span className="text-orange-200 mr-1.5">{current.tag}</span>
                {current.message}
              </span>
            </div>

            {/* Right — CTA + close */}
            <div className="flex items-center gap-2 shrink-0">
              {current.cta && (
                <button
                  onClick={() => handleCta(current.cta!.href)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {current.cta.label}
                  <IconArrowRight size={12} />
                </button>
              )}
              <button
                onClick={handleDismiss}
                aria-label="Fermer l'annonce"
                className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <IconX size={15} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

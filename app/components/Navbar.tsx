"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconPhone } from "@tabler/icons-react";
import Image from "next/image";

const links = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Apprentissage", href: "#learning" },
  { label: "Vie scolaire", href: "#gallery" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "mx-4 mt-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white/50"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
              <Image
                src="/assets/images/logo.png"
                alt="Logo GSPE"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="hidden sm:block">
              <p className={`font-bold text-sm leading-tight font-display transition-colors ${scrolled ? "text-[#6B1645]" : "text-white"}`}>
                Groupe Scolaire
              </p>
              <p className={`font-extrabold text-base leading-tight font-display transition-colors ${scrolled ? "text-[#F5821F]" : "text-orange-300"}`}>
                Privé Ephrata
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer hover:bg-white/20 ${
                    scrolled
                      ? "text-gray-700 hover:text-[#6B1645] hover:bg-[#F9EEF6]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+000000000"
              className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? "text-[#6B1645]" : "text-white/80"
              }`}
            >
              <IconPhone size={16} />
              <span>Appelez-nous</span>
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden md:block px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#F5821F] hover:bg-[#e07010] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
            >
              S&apos;inscrire
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                scrolled ? "text-[#6B1645] hover:bg-[#F9EEF6]" : "text-white hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-[#6B1645] flex flex-col px-6 pt-24 pb-10 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-xl font-bold text-white py-3 px-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-8 w-full py-4 rounded-2xl text-lg font-bold text-white bg-[#F5821F] hover:bg-[#e07010] transition-colors shadow-lg cursor-pointer"
            >
              S&apos;inscrire maintenant
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

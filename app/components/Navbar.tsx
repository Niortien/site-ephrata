"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IconMenu2, IconX, IconPhone } from "@tabler/icons-react";
import Image from "next/image";

const links = [
  { label: "Accueil", href: "#hero" },
  // { label: "À propos", href: "#about" },
  { label: "Apprentissage", href: "#learning" },
  { label: "Vie scolaire", href: "#gallery" },
  { label: "Infos parents", href: "#infos-parents" },
  { label: "Classes", href: "/classes" },
  { label: "Palmarès", href: "/palmares" },
  { label: "Galerie", href: "/galerie" },
  
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance animation ── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(logoRef.current, { opacity: 0, x: -30, duration: 0.6, delay: 0.1 })
      .from(
        navListRef.current ? Array.from(navListRef.current.children) : [],
        { opacity: 0, y: -16, stagger: 0.07, duration: 0.45 },
        "-=0.3"
      )
      .from(ctaRef.current?.children ?? [], {
        opacity: 0,
        x: 20,
        stagger: 0.08,
        duration: 0.45,
        clearProps: "opacity,transform",
      }, "-=0.4");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight active page link */
  const isActive = (href: string) => {
    if (href.startsWith("/")) return pathname === href;
    return false;
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "mx-4 mt-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white/50"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            ref={logoRef}
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
          <ul ref={navListRef} className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href} className="relative">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer hover:bg-white/20 ${
                    scrolled
                      ? isActive(link.href)
                        ? "text-[#6B1645] bg-[#F9EEF6]"
                        : "text-gray-700 hover:text-[#6B1645] hover:bg-[#F9EEF6]"
                      : isActive(link.href)
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#F5821F]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div ref={ctaRef} className="flex items-center gap-3">
            <a
              href="tel:+2250777642998"
              className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? "text-[#6B1645]" : "text-white/80"
              }`}
            >
              <IconPhone size={16} />
              <span>07 77 64 29 98</span>
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
      </header>

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

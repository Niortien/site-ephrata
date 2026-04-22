"use client";

import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconHeart,
} from "@tabler/icons-react";
import Image from "next/image";

const footerLinks = {
  "Navigation": [
    { label: "Accueil", href: "#hero" },
    { label: "À propos", href: "#about" },
    { label: "Programme", href: "#learning" },
    { label: "Vie scolaire", href: "#gallery" },
    { label: "Témoignages", href: "#testimonials" },
  ],
  "Informations": [
    { label: "Calendrier scolaire", href: "#" },
    { label: "Méthodes pédagogiques", href: "#" },
    { label: "Règlement intérieur", href: "#" },
    { label: "FAQ parents", href: "#" },
  ],
};

export default function Footer() {
  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #4A0F30 0%, #6B1645 50%, #3A0B25 100%)",
      }}
    >
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full" style={{ marginTop: "-1px" }}>
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z"
            fill="#FFFBF5"
          />
        </svg>
      </div>

      {/* Background decorations */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #F5821F 0%, transparent 70%)",
          transform: "translate(30%, 30%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1">
                <Image
                  src="/assets/images/logo.png"
                  alt="Logo GSPE"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <p className="text-white/70 text-xs leading-tight">Groupe Scolaire</p>
                <p className="text-white font-extrabold text-lg leading-tight font-display">
                  Privé Ephrata
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Une école primaire d&apos;excellence où chaque enfant s&apos;épanouit
              avec joie, curiosité et confiance depuis plus de 15 ans.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { Icon: IconBrandFacebook, label: "Facebook" },
                { Icon: IconBrandInstagram, label: "Instagram" },
                { Icon: IconBrandWhatsapp, label: "WhatsApp" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#F5821F] border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="text-white/55 hover:text-white text-sm transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { icon: IconMapPin, text: "Quartier Ephrata, Yaoundé" },
                { icon: IconPhone, text: "+237 6XX XXX XXX" },
                { icon: IconMail, text: "contact@gspe-ephrata.cm" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={16} className="text-[#F5821F] mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Groupe Scolaire Privé Ephrata. Tous droits réservés.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Conçu avec <IconHeart size={12} className="text-[#F5821F]" fill="currentColor" /> pour l&apos;avenir de nos enfants
          </p>
        </div>
      </div>
    </footer>
  );
}

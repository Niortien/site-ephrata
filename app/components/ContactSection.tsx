"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconSend,
  IconStarFilled,
  IconCheck,
} from "@tabler/icons-react";

const contactInfo = [
  {
    icon: IconMapPin,
    label: "Adresse",
    value: "Quartier Ephrata, Yaoundé, Cameroun",
    color: "#6B1645",
  },
  {
    icon: IconPhone,
    label: "Téléphone",
    value: "+237 6XX XXX XXX",
    color: "#F5821F",
  },
  {
    icon: IconMail,
    label: "Email",
    value: "contact@gspe-ephrata.cm",
    color: "#6B1645",
  },
  {
    icon: IconClock,
    label: "Horaires",
    value: "Lun–Ven : 7h00 – 17h00",
    color: "#F5821F",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    level: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#FFFBF5" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #F9EEF6 0%, transparent 70%)",
          transform: "translate(-40%, -40%)",
        }}
      />

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
            Rejoignez notre famille
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-5">
            Prêts à commencer{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B1645, #F5821F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              l&apos;aventure
            </span>
            ?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Contactez-nous pour en savoir plus sur les inscriptions ou venez
            visiter notre école. Nous serons ravis de vous accueillir.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div
              className="rounded-3xl p-8 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #6B1645 0%, #9B2765 60%, #F5821F 100%)",
              }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
              />
              <h3 className="font-display font-bold text-2xl mb-2">
                Informations de contact
              </h3>
              <p className="text-white/70 text-sm mb-8">
                Notre équipe est disponible pour répondre à toutes vos questions.
              </p>
              <ul className="flex flex-col gap-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white/60 text-xs mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-white font-semibold text-sm">
                          {item.value}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                height: "200px",
                background: "linear-gradient(135deg, #F9EEF6, #FEF3E8)",
                border: "2px dashed #E8C4D8",
              }}
            >
              <div className="text-center">
                <IconMapPin size={36} className="text-[#6B1645] mx-auto mb-2" />
                <p className="text-[#6B1645] font-semibold text-sm">
                  Yaoundé, Cameroun
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Carte interactive à venir
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
          >
            {!sent ? (
              <>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">
                  Formulaire d&apos;inscription
                </h3>
                <p className="text-gray-500 text-sm mb-7">
                  Remplissez ce formulaire et nous vous contactons sous 24h.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ex: Marie Dupont"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#6B1645] focus:ring-2 focus:ring-[#6B1645]/10 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Ex: marie@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#6B1645] focus:ring-2 focus:ring-[#6B1645]/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone + Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+237 6XX XXX XXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#F5821F] focus:ring-2 focus:ring-[#F5821F]/10 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Niveau souhaité
                      </label>
                      <select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#F5821F] focus:ring-2 focus:ring-[#F5821F]/10 transition-all bg-white"
                      >
                        <option value="">Choisir...</option>
                        <option value="maternelle">Maternelle</option>
                        <option value="cp">CP</option>
                        <option value="ce1">CE1</option>
                        <option value="ce2">CE2</option>
                        <option value="cm1">CM1</option>
                        <option value="cm2">CM2</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Votre message ou question..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#6B1645] focus:ring-2 focus:ring-[#6B1645]/10 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(245,130,31,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 cursor-pointer mt-1"
                    style={{
                      background:
                        "linear-gradient(135deg, #F5821F, #e07010)",
                    }}
                  >
                    <IconSend size={18} />
                    Envoyer ma demande
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl"
                  style={{ background: "linear-gradient(135deg, #6B1645, #F5821F)" }}
                >
                  <IconCheck size={36} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">
                  Message envoyé !
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-xs">
                  Merci pour votre intérêt. Notre équipe vous contactera dans
                  les 24 heures suivantes.
                </p>
                <motion.button
                  onClick={() => setSent(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl text-sm font-bold border-2 border-[#6B1645] text-[#6B1645] hover:bg-[#F9EEF6] transition-colors cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  Nouveau message
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";

export type CarouselSlide = {
  id: string;
  type: "image" | "video" | "gradient";
  src?: string;
  poster?: string;
  gradient?: string;
  emoji?: string;
  title: string;
  subtitle?: string;
  badge?: string;
};

interface EmblaCarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
}

export default function EmblaCarousel({
  slides,
  autoplayDelay = 4500,
}: EmblaCarouselProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 30 },
    [autoplayPlugin.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="relative group select-none">
      {/* Glow backdrop */}
      <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-[#6B1645]/20 to-[#F5821F]/20 blur-2xl pointer-events-none" />

      {/* Main viewport */}
      <div
        ref={emblaRef}
        className="relative overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(107,22,69,0.22)]"
      >
        <div className="flex touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] aspect-video min-w-0"
            >
              {/* Background */}
              {slide.type === "gradient" && (
                <div
                  className="absolute inset-0"
                  style={{ background: slide.gradient }}
                />
              )}
              {slide.type === "image" && slide.src && (
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              )}
              {slide.type === "video" && slide.src && (
                <video
                  src={slide.src}
                  poster={slide.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={i === selectedIndex}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Decorative emoji */}
              {slide.emoji && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <span
                    className="text-[25vw] sm:text-[18vw] max-w-none select-none"
                    style={{ opacity: 0.12, filter: "blur(3px)" }}
                  >
                    {slide.emoji}
                  </span>
                </div>
              )}

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

              {/* Text — animated on slide change */}
              <AnimatePresence mode="wait">
                {i === selectedIndex && (
                  <motion.div
                    key={`text-${slide.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pb-8 md:pb-12"
                  >
                    {slide.badge && (
                      <motion.span
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 }}
                        className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold bg-[#F5821F] text-white uppercase tracking-widest shadow-md"
                      >
                        {slide.badge}
                      </motion.span>
                    )}
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-white font-display text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h3>
                    {slide.subtitle && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28 }}
                        className="text-white/75 text-sm sm:text-base md:text-lg mt-2 max-w-xl leading-relaxed"
                      >
                        {slide.subtitle}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Autoplay progress bar */}
              {i === selectedIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-white/15">
                  <motion.div
                    key={`progress-${selectedIndex}`}
                    className="h-full bg-[#F5821F]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: autoplayDelay / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 pointer-events-none">
        <span className="text-white/90 text-xs font-bold tabular-nums tracking-wider">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Prev button */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
        aria-label="Diapositive précédente"
      >
        <IconChevronLeft size={22} />
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
        aria-label="Diapositive suivante"
      >
        <IconChevronRight size={22} />
      </button>

      {/* Dots navigation */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === selectedIndex
                ? "w-8 h-2.5 bg-[#F5821F] shadow-sm"
                : "w-2.5 h-2.5 bg-gray-300 hover:bg-[#9B2765]/50"
            }`}
            aria-label={`Aller à la diapositive ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/siteContent";

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = heroSlides[activeIndex];

  const controls = useMemo(
    () => ({
      previous: () =>
        setActiveIndex((current) =>
          current === 0 ? heroSlides.length - 1 : current - 1
        ),
      next: () =>
        setActiveIndex((current) =>
          current === heroSlides.length - 1 ? 0 : current + 1
        ),
    }),
    []
  );

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(controls.next, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [controls.next, isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#0A3323] pt-[77px] lg:pt-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Container with a defined responsive height so it's not too small on mobile */}
      <div className="relative w-full h-[70vh] min-h-[500px] md:h-[85vh] lg:h-screen">
        {/* Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.heading}
            className={`
              absolute inset-0
              w-full h-full bg-cover bg-center
              transition-all duration-1000 ease-in-out
              ${
                activeIndex === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }
            `}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        {/* Dark Overlay (Gradient similar to the skill but adapted) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A3323]/80 via-[#0A3323]/40 to-transparent" />

        {/* Text Content Overlay */}
        <div className="
          absolute inset-0
          z-20
          flex flex-col
          justify-center
          px-10 sm:px-14 md:px-24
        ">
          <div className="max-w-4xl text-[#F7F4D5]">
            <p className="
              text-[#839958]
              tracking-[4px] md:tracking-[6px]
              text-xs md:text-sm
              mb-4 md:mb-8
              uppercase
              font-medium
            ">
              {heroSlides[0].eyebrow}
            </p>

            <h1 className="
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
              leading-tight
              mb-4 md:mb-6
            ">
              {heroSlides[0].heading.split('\\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            <p className="
              text-base sm:text-lg md:text-xl
              max-w-xl
              mb-8 md:mb-10
              text-[#F7F4D5]/90
              leading-relaxed
            ">
              {heroSlides[0].description.split('\\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            <Link href={heroSlides[0].href}>
              <button
                className="
                  bg-[#F7F4D5]
                  text-[#0A3323]
                  px-8 py-3.5 md:px-10 md:py-4
                  rounded-full
                  text-sm md:text-base
                  font-medium
                  transition-all duration-300
                  hover:bg-[#839958] hover:text-white hover:scale-105
                "
              >
                {heroSlides[0].cta}
              </button>
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={controls.previous}
          className="
            absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30
            w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12
            flex items-center justify-center
            rounded-full bg-white/10 border border-white/20 text-white
            hover:bg-white/20 transition-all
          "
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={controls.next}
          className="
            absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30
            w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12
            flex items-center justify-center
            rounded-full bg-white/10 border border-white/20 text-white
            hover:bg-white/20 transition-all
          "
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Slider Indicators (Dots) */}
        <div className="
          absolute
          bottom-2 md:bottom-8
          left-1/2
          -translate-x-1/2
          flex
          gap-2 md:gap-3
          z-30
        ">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                h-1.5 md:h-2
                rounded-full
                transition-all duration-500
                ${
                  activeIndex === index
                  ? "w-4 md:w-10 bg-[#F7F4D5]"
                  : "w-1.5 md:w-2 bg-[#F7F4D5]/50 hover:bg-[#F7F4D5]/80"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
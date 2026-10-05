"use client";

import React, { useState, useEffect, useRef } from "react";

// Auto-playing Slides Data for First Box (Birthday / Personalised)
const birthdaySlides = [
  {
    id: "s1",
    title: "Personalised Surprises",
    subTag: "CUSTOM LAMPS & FRAMES",
    badge: "EXPRESS 60-MIN",
    image:
      "https://images.pexels.com/photos/9451803/pexels-photo-9451803.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "s2",
    title: "Birthday Specials",
    subTag: "BALLOON DECOR & CAKES",
    badge: "MOST POPULAR",
    image:
      "https://images.pexels.com/photos/3859921/pexels-photo-3859921.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "s3",
    title: "Exotic Roses & Bouquets",
    subTag: "FRESH FLOWER COMBOS",
    badge: "TRENDING NOW",
    image:
      "https://images.pexels.com/photos/30891127/pexels-photo-30891127.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

// Expanded Occasion Cards List
const allOccasionCards = [
  {
    id: "navratri",
    title: "Navratri",
    tag: "11TH OCT",
    image:
      "https://images.pexels.com/photos/35124359/pexels-photo-35124359.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-petal",
  },
  {
    id: "karwachauth",
    title: "Karwa Chauth",
    tag: "29TH OCT",
    image:
      "https://images.pexels.com/photos/13831901/pexels-photo-13831901.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-blush",
  },
  {
    id: "diwali",
    title: "Diwali",
    tag: "8TH NOV",
    subTag: "DECOR AVAILABLE",
    image:
      "https://images.pexels.com/photos/815580/pexels-photo-815580.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-sand",
  },
  {
    id: "anniversary",
    title: "Anniversary Romance",
    image:
      "https://images.pexels.com/photos/264771/pexels-photo-264771.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-petal",
  },
  {
    id: "congrats",
    title: "Congratulations",
    image:
      "https://images.pexels.com/photos/1194036/pexels-photo-1194036.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-blush",
  },
  {
    id: "thankyou",
    title: "Thank You Surprises",
    image:
      "https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-blush",
  },
  {
    id: "housewarming",
    title: "Housewarming Plants",
    image:
      "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-blush",
  },
  {
    id: "love",
    title: "Love & Romance",
    image:
      "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-petal",
  },
  {
    id: "sorry",
    title: "I Am Sorry Gifts",
    image:
      "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=500",
    bg: "bg-sand",
  },
];

export default function OccasionStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fast Auto-slide Timer (1.2 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % birthdaySlides.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Smooth Scroll Handler for Left/Right Arrows
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - amount : scrollLeft + amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6 relative">
      <h2 className="section-title mb-4">
        Gifts For Every Occasion
      </h2>

      <div className="relative group">
        {/* Permanent Visible Floating Scroll Arrows */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center text-botanical font-bold text-sm hover:scale-110 hover:bg-botanical hover:text-white transition-all"
          aria-label="Scroll Left"
        >
          ❮
        </button>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
        >
          {/* 1st Card: Fast Motion Auto-Sliding Banner */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="group/first relative w-64 sm:w-72 h-36 rounded-2xl overflow-hidden shrink-0 snap-start shadow-2xs hover:shadow-md transition-all cursor-pointer border border-botanical/10"
          >
            {birthdaySlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-400 ease-in-out ${
                  currentSlideIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img loading="lazy" decoding="async"
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform group-hover/first:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-20">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-extrabold bg-botanical/90 text-white backdrop-blur-xs px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/20">
                      {slide.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-gold uppercase tracking-widest block mb-0.5">
                      {slide.subTag}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg leading-tight flex items-center justify-between text-white">
                      <span>{slide.title}</span>
                      <span className="text-xs">❯</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div
                className="h-full bg-rose transition-all duration-200 ease-linear"
                style={{
                  width: `${((currentSlideIndex + 1) / birthdaySlides.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* All Static Cards */}
          {allOccasionCards.map((item) => (
            <a
              key={item.id}
              href={`/search?q=${encodeURIComponent(item.title)}`}
              className={`group/card flex justify-between p-4 rounded-2xl ${item.bg} w-64 sm:w-72 h-36 shrink-0 snap-start shadow-2xs relative overflow-hidden transition-all hover:shadow-md border border-black/5`}
            >
              <div className="flex flex-col justify-between z-10 max-w-[55%]">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-botanical leading-tight flex items-center gap-1">
                    {item.title} <span className="text-xs">❯</span>
                  </h3>
                  {item.subTag && (
                    <span className="text-[11px] font-bold text-botanical/60 uppercase tracking-wider block mt-1">
                      {item.subTag}
                    </span>
                  )}
                </div>

                {item.tag && (
                  <span className="inline-block self-start text-[11px] font-extrabold bg-white/80 backdrop-blur-xs text-botanical px-2 py-0.5 rounded-md border border-black/5">
                    {item.tag}
                  </span>
                )}
              </div>

              <div className="w-28 h-28 self-end rounded-xl overflow-hidden bg-white/40 p-1">
                <img loading="lazy" decoding="async"
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-lg border border-black/10 flex items-center justify-center text-botanical font-bold text-sm hover:scale-110 hover:bg-botanical hover:text-white transition-all"
          aria-label="Scroll Right"
        >
          ❯
        </button>
      </div>
    </section>
  );
}
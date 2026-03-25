"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const StickyCtaBar = () => {
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        setMinutes((m) => (m > 0 ? m - 1 : 9));
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-3 py-2 md:px-6 md:py-3">

        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* TIMER */}
          <div className="flex flex-col items-center">
            <span className="text-primary text-[10px] md:text-xs font-bold mb-1">
              சலுகை முடிவு:
            </span>

            <div className="flex gap-1 md:gap-2">
              <span className="bg-foreground text-primary-foreground text-sm md:text-lg font-bold rounded-md px-2 md:px-3 py-1">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="bg-foreground text-primary-foreground text-sm md:text-lg font-bold rounded-md px-2 md:px-3 py-1">
                {String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-muted-foreground line-through text-xs md:text-base">
              ₹999
            </span>
            <span className="text-primary font-extrabold text-lg md:text-2xl">
              ₹199
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/tamil/checkout"
         className="btn-cta animate-pulse-glow text-base md:text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-3 shadow-xl transition-all duration-300"
        >
          என் Soul Mate ✨
        </Link>
      </div>
    </div>
  );
};

export default StickyCtaBar;
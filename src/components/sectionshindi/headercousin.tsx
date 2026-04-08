"use client";

import Image from "next/image";

/**
 * Header — EXACT same background layers as HeroSection
 * - Uses identical gradient + blobs + radial + light-ray stripes
 * - Compact height, scrolls away (not sticky)
 * - Logo sits above layers (high z-index)
 * - Width matches page container; tweak `siteMax` if needed
 */

const siteMax = "max-w-[740px]";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* === BACKGROUND LAYERS (COPIED FROM HERO) === */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_400px_at_50%_-20%,theme(colors.primary/0.25),transparent)]" />
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[120vh] w-[90vw] -translate-x-1/2 rotate-12 opacity-30 [background:repeating-linear-gradient(90deg,transparent,transparent_6px,theme(colors.white/8)_7px,transparent_8px)]" />
      {/* === /BACKGROUND LAYERS === */}

      {/* CONTENT */}
      <div className={`relative z-20 mx-auto ${siteMax} px-5`}>
        {/* tighten vertical space so header isn’t tall */}
        <div className="flex items-center justify-center py-3 sm:py-4">
          <Image
             src="/images/WhatsApp_Image_2026-03-19_at_3.40.37_PM-removebg-preview.png"
          alt="Easy Astro Logo"
          width={200}
          height={50}
            priority
            className="w-44 sm:w-56 h-auto"
          />
        </div>
      </div>
    </header>
  );
}

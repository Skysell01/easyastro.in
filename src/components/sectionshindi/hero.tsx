"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

/**
 * PREMIUM HERO SECTION — HINDI VERSION
 */

const STATS = [
  { Icon: Users, value: "1,00,000+", label: "संतुष्ट ग्राहक" },
  { Icon: Star, value: "4.8/5", label: "औसत रेटिंग" },
  { Icon: Clock, value: "24 घंटे", label: "गोपनीय डिलीवरी" },
  { Icon: ShieldCheck, value: "100%", label: "पूरी तरह सुरक्षित" },
];

export default function HeroSection() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/hindiCartCashfree");
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_400px_at_50%_-20%,theme(colors.primary/0.25),transparent)]" />
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[120vh] w-[90vw] -translate-x-1/2 rotate-12 opacity-30 [background:repeating-linear-gradient(90deg,transparent,transparent_6px,theme(colors.white/8)_7px,transparent_8px)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2">
          
          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              ट्रेंडिंग • 1 लाख+ ग्राहकों द्वारा पसंद किया गया
            </div>

            <h1 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-5xl md:leading-[1.1]">
              <span className="font-extrabold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                अपने सोलमेट का चेहरा देखें
              </span>{" "}
              <span className="font-semibold text-foreground">— आज से ही।</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-foreground/75 md:text-lg md:leading-relaxed lg:mx-0 mx-auto">
              अनुभवी साइकि्क्स और एस्ट्रोलॉजी विशेषज्ञों द्वारा तैयार किया गया।  
              आपका निजी, व्यक्तिगत स्केच — पूरी सुरक्षा के साथ 24 घंटे के भीतर डिलीवर किया जाएगा।
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
              <Button
                size="lg"
                onClick={handleRedirect}
                className="group w-full sm:w-auto rounded-2xl px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <span className="relative inline-flex items-center">
                  मेरा सोलमेट अभी देखें
                  <Sparkles className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                </span>
              </Button>

              <div className="flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-4 py-3 text-sm text-foreground/80 backdrop-blur">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>100% प्राइवेट • सुरक्षित • कोई स्पैम नहीं</span>
              </div>
            </div>

            {/* Spots Left */}
            <div className="mt-3 text-sm font-semibold text-primary" aria-live="polite">
              फ्री लव रीडिंग के लिए सिर्फ 9 स्लॉट बचे हैं!
            </div>

            {/* TRUST BADGES */}
            <div className="mt-6 flex flex-col gap-2 text-foreground/70 sm:flex-row sm:items-center sm:gap-4">
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>मनी-बैक गारंटी</span>
              </div>
              <div className="hidden h-4 w-px bg-foreground/10 sm:block" />
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>सिक्योर चेकआउट</span>
              </div>
              <div className="hidden h-4 w-px bg-foreground/10 sm:block" />
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>आपका डेटा कभी शेयर नहीं किया जाएगा</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[520px]">

              <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/40 via-purple-500/30 to-primary/10 opacity-75 blur-2xl" />
              <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                     src="/hero-image.png"
                alt="Soulmate Sketch Example"
                width={500}
                height={500}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
                यह केवल एक सैंपल है — आपका स्केच पूरी तरह पर्सनलाइज़्ड होगा
              </div>

            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 px-4 py-5 text-center shadow-sm backdrop-blur transition-all hover:shadow-md"
            >
              <div className="pointer-events-none absolute -top-10 right-0 h-24 w-24 rotate-45 bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-70 blur-xl" />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl">
                {value}
              </div>
              <div className="mt-1 text-sm text-foreground/70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

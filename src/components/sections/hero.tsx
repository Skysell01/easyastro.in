"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, Star, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
const stats = [
  {
    icon: <Users className="h-9 w-9 sm:h-8 sm:w-8 text-primary" />,
    value: "100,000+",
    label: "Happy Clients",
  },
  {
    icon: <Star className="h-9 w-9 sm:h-8 sm:w-8 text-primary" />,
    value: "4.8/5",
    label: "Average Rating",
  },
  {
    icon: <Clock className="h-9 w-9 sm:h-8 sm:w-8 text-primary" />,
    value: "24 Hours",
    label: "Delivered Privately",
  },
  {
    icon: <ShieldCheck className="h-9 w-9 sm:h-8 sm:w-8 text-primary" />,
    value: "100%",
    label: "Safe & Confidential",
  },
];



export default function HeroSection() {
   const router = useRouter();
  const handleRedirect = () => {
    router.push('/cart');
  };
  return (
    <section className="relative overflow-hidden pt-2 pb-7 sm:py-16 bg-card">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50"></div>
      <div className="container relative z-10 mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-headline font-bold text-3xl md:text-5xl text-primary leading-tight tracking-wide mb-4">
              Discover Your Soulmate’s Face Today!
            </h1>
            <div className="lg:hidden my-8">
              <Image
                src="/hero-image.png"
                alt="Soulmate Sketch Example"
                width={500}
                height={500}
                className="rounded-lg shadow-xl mx-auto"
                data-ai-hint="soulmate sketch"
                priority
              />
            </div>
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-foreground/80 mb-8">
              Ever wondered who your true soulmate is? Experience the magic of seeing your soulmate’s face – drawn just for you by gifted psychics and astrology experts.
            </p>
            <Button
              size="lg"
              className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine"
              onClick={handleRedirect}
            >
              Reveal My Soulmate Now!
            </Button>
            <p className="mt-4 text-sm text-primary/80 animate-pulse">
              Only a few spots left! Hurry before the special offer ends.
            </p>
            <p className="mt-2 text-sm font-bold text-primary animate-pulse">
              9 spots left for free in-depth love reading!
            </p>
          </div>

          <div className="hidden lg:block">
            <Image
              src="/hero-image.png"
              alt="Soulmate Sketch Example"
              width={500}
              height={500}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="soulmate sketch"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              {React.cloneElement(stat.icon, { className: 'h-9 w-9 sm:h-8 sm:w-8 text-primary' })}
              <p className="text-3xl sm:text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-base sm:text-sm text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

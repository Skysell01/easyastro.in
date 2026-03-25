"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="hero-gradient relative overflow-hidden pt-4 pb-16 md:pt-6 md:pb-24 lg:pt-8 lg:pb-32">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src='/tamil/logo.png' alt="Soulmap Creations" width={200} 
  height={50}  className="h-12 md:h-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Soul Report</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground mb-6">
              உங்கள் ஆன்மாவின்{" "}
              <span className="text-gradient">வரைபடத்தை</span>{" "}
              இன்றே கண்டறியுங்கள்!
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              உங்கள் பிறப்பு விவரங்களை அடிப்படையாகக் கொண்டு, AI தொழில்நுட்பம் மூலம் தனிப்பயனாக்கப்பட்ட ஆன்ம அறிக்கையைப் பெறுங்கள். உங்கள் வாழ்க்கையின் மறைந்திருக்கும் பாதையை அறியுங்கள்.
            </p>

            <Link  href="/tamil/checkout" className="btn-cta animate-pulse-glow text-base md:text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-3 shadow-xl transition-all duration-300">
              உங்கள் Soul Map-ஐ உருவாக்கவும் ✨
            </Link>

            <p className="text-muted-foreground/70 text-sm mt-4">
              ⚡ சிறப்பு சலுகை: இன்று மட்டும் 80% தள்ளுபடி!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src='/tamil/hero-soul-map.webp'
              alt="Soul Map Report"
              width={500}
              height={500}
              className="rounded-3xl shadow-2xl animate-float max-w-xs md:max-w-sm lg:max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

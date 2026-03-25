"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link"

const SoulmateSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[hsl(340,60%,97%)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              உங்கள் இதயம் அந்த சிறப்பான{" "}
              <span className="text-primary">உறவை</span> தேடுகிறதா?
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-4 max-w-lg mx-auto lg:mx-0">
              உங்கள் விதிக்கப்பட்ட துணையின் மர்மத்தை ஒரு தனிப்பயனாக்கப்பட்ட 
              Soulmate Sketch மூலம் கண்டறியுங்கள் — பிரபஞ்சத்துடன் உங்கள் 
              ஆற்றலை இணைத்து, உண்மையான அன்பை உங்கள் வாழ்க்கையில் ஈர்க்க 
              வடிவமைக்கப்பட்டது.
            </p>

            <p className="text-primary italic text-base md:text-lg font-medium mb-8 max-w-lg mx-auto lg:mx-0">
              உங்கள் காதல் விதி காத்திருக்கிறது — நீங்கள் செய்ய வேண்டியது 
              "ஆம்" என்று சொல்வது மட்டுமே.
            </p>

            <Link
              href="/tamil/checkout"
             className="btn-cta animate-pulse-glow text-base md:text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-3 shadow-xl transition-all duration-300"
            >
              எனது Soulmate-ஐ கண்டறியுங்கள்! ✨
            </Link>

            <p className="text-muted-foreground/70 text-sm mt-4">
              ⚡ சில இடங்கள் மட்டுமே உள்ளன! சிறப்பு சலுகை முடிவதற்குள் 
              பயன்படுத்துங்கள்.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src='/tamil/soulmate-sketch.webp'
              alt="Soulmate Sketch"
              width={500} 
  height={500} 
              className="rounded-3xl shadow-2xl max-w-xs md:max-w-sm lg:max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SoulmateSection;

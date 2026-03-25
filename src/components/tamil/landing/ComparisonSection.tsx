"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  ["AI-Powered தனிப்பயன் அறிக்கை", true, false],
  ["50+ பக்க விரிவான பகுப்பாய்வு", true, false],
  ["காதல் இணக்கத்தன்மை", true, false],
  ["தொழில் & நிதி வழிகாட்டுதல்", true, false],
  ["மாத & ஆண்டு கணிப்புகள்", true, true],
  ["பொதுவான ராசிபலன்", true, true],
] as const;

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 section-dark">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-12"
        >
          ஏன் Soul Map <span className="text-gradient">சிறந்தது?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-primary/20 bg-background"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-primary/10 p-4 text-sm font-bold">
            <span className="text-muted-foreground">அம்சம்</span>
            <span className="text-center text-primary">Soul Map</span>
            <span className="text-center text-muted-foreground">மற்ற ஆப்கள்</span>
          </div>

          {/* Rows */}
          {rows.map(([label, us, them], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="grid grid-cols-3 p-4 border-t border-border text-sm"
            >
              <span className="text-foreground/80">{label}</span>
              <span className="flex justify-center">
                {us ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </span>
              <span className="flex justify-center">
                {them ? (
                  <Check className="w-5 h-5 text-green-500/50" />
                ) : (
                  <X className="w-5 h-5 text-red-400/50" />
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
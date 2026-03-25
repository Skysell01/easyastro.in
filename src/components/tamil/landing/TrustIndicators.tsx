"use client";

import { motion } from "framer-motion";
import { Users, Star, Clock, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Users, value: "50,000+", label: "மகிழ்ச்சியான வாடிக்கையாளர்கள்" },
  { icon: Star, value: "4.9/5", label: "சராசரி மதிப்பீடு" },
  { icon: Clock, value: "24 மணி", label: "விரைவான டெலிவரி" },
  { icon: ShieldCheck, value: "100%", label: "பாதுகாப்பான & ரகசியமான" },
];

const TrustIndicators = () => {
  return (
    <section className="py-12 md:py-16 section-gradient">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="trust-badge"
            >
              <stat.icon className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl md:text-3xl font-extrabold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
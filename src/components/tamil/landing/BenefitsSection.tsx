"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Target, Compass, Shield, Gem } from "lucide-react";

const benefits = [
  { icon: Heart, title: "உங்கள் உறவுகளை புரிந்துகொள்ளுங்கள்", desc: "காதல், குடும்பம், நட்பு பற்றிய ஆழமான நுண்ணறிவு" },
  { icon: Brain, title: "மறைந்த திறமைகளை கண்டறியுங்கள்", desc: "உங்கள் உள்ளார்ந்த பலங்களை அறிந்துகொள்ளுங்கள்" },
  { icon: Target, title: "வாழ்க்கை நோக்கத்தை தெளிவாக்குங்கள்", desc: "உங்கள் உண்மையான பாதையை கண்டறியுங்கள்" },
  { icon: Compass, title: "எதிர்கால வழிகாட்டுதல்", desc: "வரவிருக்கும் சவால்கள் & வாய்ப்புகளை அறியுங்கள்" },
  { icon: Shield, title: "மனநல ஆரோக்கியம்", desc: "உங்கள் உணர்ச்சி வடிவங்களை புரிந்துகொள்ளுங்கள்" },
  { icon: Gem, title: "தனிப்பட்ட வளர்ச்சி", desc: "சுய முன்னேற்றத்திற்கான வழிகாட்டுதல்கள்" },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 section-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
            நீங்கள் <span className="text-gradient">என்ன பெறுவீர்கள்?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            உங்கள் Soul Map அறிக்கை வாழ்க்கையின் அனைத்து முக்கிய அம்சங்களையும் உள்ளடக்கியது
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card-glass flex items-start gap-4"
            >
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
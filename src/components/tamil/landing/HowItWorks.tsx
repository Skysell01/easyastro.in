"use client";

import { motion } from "framer-motion";
import { ClipboardList, Cpu, FileText } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "விவரங்களை உள்ளிடுங்கள்",
    desc: "உங்கள் பெயர், பிறந்த தேதி, நேரம் மற்றும் இடம் ஆகியவற்றை பதிவு செய்யுங்கள்.",
  },
  {
    icon: Cpu,
    title: "AI அறிக்கை உருவாக்கம்",
    desc: "எங்கள் AI உங்கள் தகவல்களை ஆய்வு செய்து தனிப்பயன் அறிக்கையை உருவாக்குகிறது.",
  },
  {
    icon: FileText,
    title: "அறிக்கையைப் பெறுங்கள்",
    desc: "உங்கள் தனிப்பயனாக்கப்பட்ட Soul Map அறிக்கை 24 மணி நேரத்தில் மின்னஞ்சலில் வரும்.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-12"
        >
          எப்படி <span className="text-gradient">செயல்படுகிறது?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="card-glass text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-sm font-bold text-primary mb-1">படி {i + 1}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
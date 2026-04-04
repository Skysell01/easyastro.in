"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileText, Palette, Mail } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "अपनी जानकारी साझा करें",
    description: "अपना नाम और जन्म विवरण दें ताकि हम आपकी ऊर्जा को समझ सकें।",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "हमारे आर्टिस्ट्स काम शुरू करते हैं",
    description: "हमारे साइकिक और ज्योतिषी आपकी जानकारी के आधार पर स्केच बनाते हैं।",
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "अपनी स्केच प्राप्त करें",
    description: "आपको 24 घंटे के अंदर WhatsApp या Email पर स्केच मिलेगा।",
  },
];

const HowItWorks = () => {
const router = useRouter();

  return (
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            तीन आसान चरणों में अपने सोलमेट को देखें
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card rounded-2xl p-8 text-center card-hover border border-border"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center text-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => router.push("/hindi-2/checkout")}
              className="btn-primary animate-pulse-slow hover:animate-none"
              size="lg"
            >
              मेरा सोलमेट दिखाएं
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-muted-foreground">
            ⏰ केवल कुछ ही स्लॉट बाकी हैं आज के लिए!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

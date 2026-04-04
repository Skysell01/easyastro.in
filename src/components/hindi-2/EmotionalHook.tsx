"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import Image from "next/image";

const EmotionalHook = () => {
const router = useRouter();

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient mb-6">
              क्या आपका दिल किसी खास के लिए तरस रहा है?
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              एक पर्सनलाइज्ड सोलमेट स्केच के ज़रिए अपने जीवनसाथी के रहस्य से पर्दा उठाएं — जो आपकी ऊर्जा से मेल खाता हो।
            </p>
            <p className="text-muted-foreground mb-8">आपका सोलमेट आपका इंतजार कर रहा है — बस आपको उसे देखना है।</p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button onClick={() => router.push("/hindi-2/checkout")} className="btn-primary animate-pulse-slow hover:animate-none" size="lg">
                मेरा सोलमेट दिखाएं
              </Button>
            </motion.div>

            <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-success">✓</span>
              100,000+ प्यार से भरे हुए ग्राहक
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              <Image
                src="/hindi-2/secondImg.png"
                width={500}
              height={500}
                alt="साइकिक आर्टिस्ट स्केच बनाते हुए"
                className="rounded-2xl shadow-soft w-full max-w-md mx-auto"
              />

              {/* Floating note */}
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-8 -left-4 bg-card p-4 rounded-lg shadow-card border border-border max-w-[200px] transform"
              >
                <p className="text-sm italic text-foreground">"I will show your precious Soulmate"</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-primary text-xs">♥</span>
                  <span className="text-xs text-muted-foreground">EasyAstro</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalHook;

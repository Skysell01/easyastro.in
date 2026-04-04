"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const images = [
  "/hindi-2/pastwork-1.png",
  "/hindi-2/pastwork-2.png",
  "/hindi-2/pastwork-3.png",
];

interface PastWorkProps {
  showCTA?: boolean;
}

const PastWork = ({ showCTA = true }: PastWorkProps) => {
 const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient mb-6 mt-2">
              पिछले कार्य / प्रमाण
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              हज़ारों लोगों ने अपने सोलमेट की सटीक और भावनात्मक स्केच प्राप्त की है। हमारे अनुभवी साइकिक आर्टिस्ट्स ने
              दुनिया भर के लोगों को उनके सोलमेट से मिलवाया है।
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-primary">✓</span>
                हर स्केच व्यक्तिगत रूप से बनाई जाती है
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-primary">✓</span>
                अनुभवी ज्योतिषियों द्वारा सत्यापित
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="text-primary">✓</span>
                100% संतुष्टि गारंटी
              </li>
            </ul>

            {showCTA && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => router.push("/hindi-2/checkout")}
                  className="btn-primary animate-pulse-slow hover:animate-none"
                  size="lg"
                >
                  मेरा सोलमेट दिखाएं
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Image slider with proof */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-soft w-full max-w-md mx-auto aspect-[3/4]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`संतुष्ट ग्राहक ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-primary w-6" : "bg-primary/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PastWork;

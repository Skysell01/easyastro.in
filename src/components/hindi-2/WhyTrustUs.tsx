"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Users, Star, Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";

const trustPoints = [
  { icon: <Users className="w-5 h-5" />, text: "100,000+ स्केच डिलीवर किए" },
  { icon: <Star className="w-5 h-5" />, text: "4.8/5 औसत रेटिंग" },
  { icon: <Sparkles className="w-5 h-5" />, text: "अनुभवी साइकिक और ज्योतिषी" },
  { icon: <ShieldCheck className="w-5 h-5" />, text: "संतुष्टि या पैसे वापस" },
];

const WhyTrustUs = () => {
  const router = useRouter();

  return (
    <section className="section-padding bg-rose-light">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient mb-8">Why Trust Us?</h2>

            <ul className="space-y-4 mb-8">
              {trustPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <span className="text-primary">{point.icon}</span>
                  <span>{point.text}</span>
                </motion.li>
              ))}
            </ul>

            <p className="text-muted-foreground mb-8">
              सुरक्षित, विश्वसनीय और गोपनीय। आपकी प्राइवेसी हमारी प्राथमिकता है।
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button onClick={() => router.push("/hindi-2/checkout")} className="btn-primary animate-pulse-slow hover:animate-none" size="lg">
                मेरा सोलमेट दिखाएं
              </Button>
            </motion.div>
            <p className="mt-4 text-sm text-muted-foreground">⏰ केवल कुछ ही स्लॉट बाकी हैं आज के लिए!</p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Image
              src="/hindi-2/thirdImg.png"
              width={500}
              height={500}
              alt="साइकिक आर्टिस्ट"
              className="rounded-2xl shadow-soft w-full max-w-md mx-auto"
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;

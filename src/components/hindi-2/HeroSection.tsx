"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Star, Clock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import soulmateSketch from "@/assets/soulmate-sketch.jpg";

const HeroSection = () => {
const router = useRouter();

  const handleCTA = () => {
    router.push("/hindi-2/checkout");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-light to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-narrow section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 mt-2">
              आज ही अपने सोलमेट का चेहरा देखें!
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
              क्या आपने कभी सोचा है कि आपका सोलमेट कैसा दिखता है? हमारे अनुभवी ज्योतिषियों और साइकिक आर्टिस्ट्स द्वारा
              हाथ से बनाई गई स्केच के ज़रिए अपने सोलमेट को देखें।
            </p>

            <Button onClick={handleCTA} className="btn-primary text-lg" size="lg">
              मेरा होने वाला पार्टनर कैसा दिखता है?
            </Button>

            <p className="mt-4 text-sm text-muted-foreground">⏰ सीमित समय के लिए विशेष छूट उपलब्ध!</p>
          </motion.div>

          {/* Right content - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main couple image */}
              <Image
                src="/hindi-2/firstImg.png" 
                width={500}
              height={500}
                alt="खुश जोड़ा सोलमेट स्केच के साथ"
                className="rounded-2xl shadow-soft w-full max-w-md mx-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <TrustBadge icon={<Users className="w-6 h-6" />} title="100,000+" subtitle="खुश ग्राहक" />
          <TrustBadge icon={<Star className="w-6 h-6" />} title="4.8/5" subtitle="औसत रेटिंग" />
          <TrustBadge icon={<Clock className="w-6 h-6" />} title="24 घंटे" subtitle="में डिलीवरी" />
          <TrustBadge icon={<Shield className="w-6 h-6" />} title="100%" subtitle="सुरक्षित और गोपनीय" />
        </motion.div>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="text-primary mb-2">{icon}</div>
    <p className="font-bold text-foreground">{title}</p>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </div>
);

export default HeroSection;

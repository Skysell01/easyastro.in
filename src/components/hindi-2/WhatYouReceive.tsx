"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Heart, BookOpen, TrendingUp } from "lucide-react";

const items = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "पर्सनलाइज्ड सोलमेट स्केच",
    description: "आपकी ऊर्जा के आधार पर हाथ से बनाई गई विस्तृत पेंसिल स्केच जो आपके सोलमेट का चेहरा दिखाती है।",
    tag: null,
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "FREE गहराई से प्रेम रीडिंग",
    description: "अपने प्रेम जीवन के बारे में विस्तृत जानकारी प्राप्त करें। जानें कि कब और कैसे आप अपने सोलमेट से मिलेंगे।",
    tag: "FREE",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "वैकल्पिक पर्सनलाइज्ड वेल्थ रिपोर्ट",
    description: "अपनी आर्थिक स्थिति के बारे में गहरी जानकारी पाएं और जानें कि कैसे अपने भाग्य को बढ़ाएं।",
    tag: "OPTIONAL",
  },
];

const WhatYouReceive = () => {
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
            What You Receive
          </h2>
          <p className="text-muted-foreground text-lg">
            आपको क्या मिलेगा
          </p>
        </motion.div>

        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 card-hover border border-border flex gap-4"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-secondary flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  {item.tag && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.tag === "FREE" 
                        ? "bg-success/10 text-success" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">
            🔒 हर ऑर्डर 100% निजी और गोपनीय है।
          </p>
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

export default WhatYouReceive;

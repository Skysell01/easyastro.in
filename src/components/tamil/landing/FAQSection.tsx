"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Soul Map அறிக்கை எவ்வளவு துல்லியமானது?",
    a: "எங்கள் AI தொழில்நுட்பம் பாரம்பரிய ஜோதிட அறிவியலையும் நவீன தரவு பகுப்பாய்வையும் இணைத்து மிகவும் துல்லியமான அறிக்கையை உருவாக்குகிறது. 95% வாடிக்கையாளர்கள் இதை மிகவும் துல்லியமானதாக மதிப்பிட்டுள்ளனர்.",
  },
  {
    q: "என் தனிப்பட்ட தகவல்கள் பாதுகாப்பாக இருக்குமா?",
    a: "100% பாதுகாப்பு உத்தரவாதம். உங்கள் தகவல்கள் எந்த மூன்றாம் தரப்பினருடனும் பகிரப்படாது. SSL encryption மூலம் முழு பாதுகாப்பு வழங்கப்படுகிறது.",
  },
  {
    q: "அறிக்கையை எவ்வளவு நேரத்தில் பெறுவேன்?",
    a: "பணம் செலுத்தியவுடன் 24 மணி நேரத்திற்குள் உங்கள் மின்னஞ்சலில் அறிக்கை வரும். பெரும்பாலான நேரங்களில் 2-4 மணி நேரத்தில் வரும்.",
  },
  {
    q: "திருப்தி இல்லையெனில் பணம் திரும்பக் கிடைக்குமா?",
    a: "ஆம்! 7 நாட்களுக்குள் முழு பணத்தைத் திருப்பிப் பெறலாம். எந்த கேள்வியும் கேட்கப்படாது.",
  },
  {
    q: "இது ஜோதிடத்திலிருந்து எப்படி வேறுபட்டது?",
    a: "பாரம்பரிய ஜோதிடம் பொதுவான கணிப்புகளை மட்டுமே வழங்கும். Soul Map AI தொழில்நுட்பம் மூலம் உங்களுக்கு மட்டுமேயான தனிப்பயன் நுண்ணறிவுகளை வழங்குகிறது.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-12"
        >
          அடிக்கடி கேட்கப்படும் <span className="text-gradient">கேள்விகள்</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <AccordionItem value={`faq-${i}`} className="card-glass border-none">
                  <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
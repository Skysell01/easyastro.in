"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "ப்ரியா மகேஷ்",
    text: "இந்த அறிக்கை என் வாழ்க்கையை மாற்றியது! என்னைப் பற்றி நான் தெரியாத விஷயங்களை இது வெளிப்படுத்தியது. மிகவும் துல்லியமாக இருக்கிறது 😍",
  },
  {
    name: "கார்த்திக் ராஜ்",
    text: "எனக்கு ஆரம்பத்தில் சந்தேகம் இருந்தது, ஆனால் அறிக்கையை படித்ததும் ஆச்சரியமாக இருந்தது. என் குணாதிசயங்கள் மிகவும் சரியாக இருந்தன! 🔥",
  },
  {
    name: "தீபிகா சுரேஷ்",
    text: "என் தொழில் வழிகாட்டுதல் மிகவும் பயனுள்ளதாக இருந்தது. இப்போது என் எதிர்காலத்தைப் பற்றி தெளிவாக புரிகிறது. நன்றி Soul Map! 💖",
  },
  {
    name: "அருண் குமார்",
    text: "₹199-க்கு இவ்வளவு விரிவான அறிக்கையா? நம்ப முடியவில்லை! ஒவ்வொரு பக்கமும் மதிப்புமிக்கது. என் நண்பர்களுக்கும் பரிந்துரைக்கிறேன் ⭐",
  },
  {
    name: "மீனாட்சி கணேஷ்",
    text: "காதல் இணக்கப் பிரிவு என் கணவருடன் உள்ள உறவை இன்னும் நன்றாக புரிந்துகொள்ள உதவியது. அற்புதமான அனுபவம்! 🩷",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 section-gradient">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-12"
        >
          வாடிக்கையாளர்கள் <span className="text-gradient">என்ன சொல்கிறார்கள்?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-glass"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4 text-sm leading-relaxed">"{t.text}"</p>
              <p className="text-sm font-bold text-primary">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
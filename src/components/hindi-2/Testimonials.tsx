"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "प्रिया शर्मा",
    location: "मुंबई",
    text: "जब मुझे स्केच मिली, मैं रो पड़ी। यह बिल्कुल मेरे बॉयफ्रेंड जैसी दिखती है जिससे मैं अभी मिली हूं! 😍 मुझे विश्वास नहीं हो रहा।",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "राहुल वर्मा",
    location: "दिल्ली",
    text: "पहले तो मुझे शक था, लेकिन स्केच देखकर मैं हैरान रह गया। यह सच में काम करता है! 🙏 धन्यवाद EasyAstro!",
    rating: 5,
    avatar: "RV",
  },
  {
    name: "अंजलि गुप्ता",
    location: "बैंगलोर",
    text: "बहुत सुंदर स्केच मिली। प्रेम रीडिंग भी बहुत सटीक थी। अब मुझे पता है कि मेरा सोलमेट कैसा दिखता है। ❤️",
    rating: 5,
    avatar: "AG",
  },
  {
    name: "विकास सिंह",
    location: "जयपुर",
    text: "24 घंटे के अंदर मिल गई। बहुत प्रोफेशनल सर्विस। स्केच बहुत डिटेल्ड है। 👏",
    rating: 5,
    avatar: "VS",
  },
];

interface TestimonialsProps {
  showCTA?: boolean;
}

const Testimonials = ({ showCTA = true }: TestimonialsProps) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient mb-4">
            हमारे ग्राहक क्या कहते हैं
          </h2>
          <p className="text-muted-foreground text-lg">What Our Clients Say</p>
        </motion.div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-card shadow-card border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-card shadow-card border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-3 gap-6 overflow-hidden px-8">
            {visibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 card-hover border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-warning">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        {showCTA && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => router.push("/hindi-2/checkout")}
                className="btn-primary animate-pulse-slow hover:animate-none"
                size="lg"
              >
                आज ही अपनी Soulmate Sketch देखें
              </Button>
            </motion.div>
            <p className="mt-4 text-sm text-muted-foreground">⏰ केवल कुछ ही स्लॉट बाकी हैं आज के लिए!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

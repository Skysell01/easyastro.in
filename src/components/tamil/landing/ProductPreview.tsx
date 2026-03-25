"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const testimonialImages = [
  { src: "/tamil/pastwork-1.webp", alt: "Customer testimonial 1" },
  { src: "/tamil/pastwork-2.webp", alt: "Customer testimonial 2" },
  { src: "/tamil/pastwork-3.webp", alt: "Customer testimonial 3" },
];

const ProductPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
              உங்கள் <span className="text-gradient">Soul Map அறிக்கை</span> எப்படி இருக்கும்?
            </h2>
            <p className="text-muted-foreground mb-6">
              50+ பக்கங்கள் கொண்ட விரிவான அறிக்கை, அழகான வடிவமைப்பில், படிக்க எளிதாக.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "ஆளுமை பகுப்பாய்வு & வாழ்க்கை நோக்கம்",
                "காதல் & உறவு இணக்கத்தன்மை",
                "தொழில் வழிகாட்டுதல் & நிதி நுண்ணறிவு",
                "ஆரோக்கியம் & மன நலம்",
                "ஆண்டு & மாத கணிப்புகள்",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/tamil/checkout" className="btn-cta animate-pulse-glow text-base md:text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-3 shadow-xl transition-all duration-300">
              இப்போதே பெறுங்கள் →
            </Link>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8 items-center"
          >
            <div className="w-full max-w-sm md:max-w-md">
              <h3 className="text-lg font-bold text-foreground text-center mb-4">
                வாடிக்கையாளர் அனுபவங்கள் 💬
              </h3>
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {testimonialImages.map((img, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={400}
                        height={400}
                        loading="lazy"
                        className="rounded-2xl shadow-lg w-full object-contain max-h-[400px]"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProductPreview;

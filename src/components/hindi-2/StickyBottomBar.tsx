"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const StickyBottomBar = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 47,
    seconds: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg"
        >
          <div className="container-narrow py-3 flex items-center justify-between gap-4">
            {/* Left side - Timer */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">ऑफर समाप्त:</span>
              <div className="flex items-center gap-1">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-mono">
                  {formatTime(timeLeft.hours)}
                </span>
                <span className="text-foreground">:</span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-mono">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span className="text-foreground">:</span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-mono">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>

            {/* Center - Price */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground line-through text-sm">₹2289</span>
              <span className="text-foreground font-bold text-lg">₹99</span>
            </div>

            {/* Right side - CTA */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => router.push("/hindi-2/checkout")}
                className="btn-primary text-sm py-2 px-6 animate-pulse-slow hover:animate-none"
              >
                आज ही अपनी Soulmate Sketch देखें
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBottomBar;

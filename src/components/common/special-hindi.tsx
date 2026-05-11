"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Gift, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SpecialOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecialOfferPopup({ isOpen, onClose }: SpecialOfferPopupProps) {
  const router = useRouter();
  const [spotsLeft, setSpotsLeft] = useState(85);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleGetSoulmateSketch = () => {
    onClose();
    // router.push('/cart');
     window.location.href =
    "https://superprofile.bio/vp/custom-soul-mate-sketch---free-love-report-%F0%9F%98%B3?checkout=true";
  };

  useEffect(() => {
    if (!isOpen) return;

    // Spots reduction timer
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 5) {
          const decrease = Math.floor(Math.random() * 2) + 1;
          return prev - decrease;
        }
        return prev;
      });
    }, 6000 + Math.random() * 3000);

    // Countdown timer
    const timeInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    }, 1000);

    // Set urgent mode when spots are low
    const urgentCheck = setInterval(() => {
      if (spotsLeft <= 20) {
        setIsUrgent(true);
      }
    }, 1000);

    return () => {
      clearInterval(spotsInterval);
      clearInterval(timeInterval);
      clearInterval(urgentCheck);
    };
  }, [isOpen, spotsLeft]);


  const getUrgencyMessage = () => {
    if (spotsLeft > 70) return "🔥 लोग अभी अपना सोलमेट स्केच क्लेम कर रहे हैं!";
    if (spotsLeft > 65) return "⚡ आपका सोलमेट आपका इंतज़ार कर रहा है — मौका मत छोड़ें!";
    if (spotsLeft > 60) return "🚨 स्पॉट तेज़ी से भर रहे हैं — आपकी किस्मत इंतज़ार कर रही है!";
    if (spotsLeft > 55) return "💫 लगभग बिक गए — अपना मौका मत गंवाइए!";
    if (spotsLeft > 50) return "🌟 आपका सोलमेट स्केच आपको बुला रहा है!";
    if (spotsLeft > 45) return "🔥 आख़िरी कुछ स्पॉट — अपना डेस्टिनी अभी पाएं!";
    if (spotsLeft > 40) return "⚡ आपका सोलमेट बेचैन हो रहा है!";
    if (spotsLeft > 35) return "🚨 लगभग खत्म — आपका लव स्टोरी इंतज़ार कर रही है!";
    if (spotsLeft > 30) return "💫 अपने सोलमेट को और इंतज़ार मत कराइए!";
    if (spotsLeft > 25) return "🌟 फाइनल स्पॉट — आपकी किस्मत आवाज़ दे रही है!";
    if (spotsLeft > 20) return "🔥 आख़िरी मौका — अपना सोलमेट आज ही पाएं!";
    if (spotsLeft > 15) return "⚡ आपका सोलमेट स्केच लगभग बिक गया है!";
    if (spotsLeft > 10) return "🚨 फाइनल स्पॉट — अपना सोलमेट अभी क्लेम करें!";
    return "💥 आख़िरी स्पॉट — आपका सोलमेट आपका इंतज़ार कर रहा है!";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <Card className={`relative w-[90vw] max-w-md m-4 bg-card border-primary/50 animate-in zoom-in-95 shadow-2xl ${spotsLeft <= 20 ? 'animate-shake' : ''}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <CardHeader className="text-center items-center pb-2 mt-4">
          <CardTitle className="font-headline text-2xl text-primary leading-tight">
            <span className="animate-lightning-shake pr-2">⚡ </span> सीमित स्पॉट्स <span className="animate-lightning-shake pl-2">⚡</span>
          </CardTitle>
          <p className="text-lg text-primary font-semibold">मौका मत गंवाइए!</p>
        </CardHeader>

        <CardContent className="text-center mt-2">

          {/* Spots Countdown */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-bold text-xl text-primary">
                सिर्फ <span className="font-black">{spotsLeft}</span> स्पॉट बचे हैं!
              </span>
            </div>

            <div className="w-full bg-primary/20 rounded-full h-3 mb-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(spotsLeft / 75) * 75}%` }}
              ></div>
            </div>

            <p className="text-sm text-foreground/80 font-medium">
              {getUrgencyMessage()}
            </p>
          </div>

          {/* Order Includes */}
          <div className="p-4 bg-primary/10 rounded-lg mb-6 text-left">
            <p className="font-semibold text-primary">आपके ऑर्डर में शामिल हैं:</p>
            <ul className="list-disc list-inside text-foreground/80 mt-2 space-y-1">
              <li>एक पर्सनलाइज्ड साइकिक स्केच</li>
              <li className="font-bold">फ्री — डीप इन-डेप्थ लव रीडिंग</li>
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleGetSoulmateSketch}
            className="w-full font-bold text-lg py-6 animate-shine bg-primary hover:bg-primary/90"
          >
            मेरा सोलमेट स्केच अभी पाएं
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

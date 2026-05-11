"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/ui/countdown-timer";
import SpecialOfferPopup from "@/components/common/special-hindi";
import { useRouter } from 'next/navigation';

export default function StickyCtaBar() {
  
  const [offerEndTime, setOfferEndTime] = useState<Date | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupHasBeenShown, setPopupHasBeenShown] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    // router.push('/hindiCartCashfree');
     window.location.href =
    "https://superprofile.bio/vp/custom-soul-mate-sketch---free-love-report-%F0%9F%98%B3?checkout=true";
  };

  useEffect(() => {
    // केवल क्लाइंट पर चलने वाला भाग
    setOfferEndTime(new Date(Date.now() + 10 * 60 * 1000));
  }, []);

  useEffect(() => {
    if (!offerEndTime || popupHasBeenShown) return;

    const interval = setInterval(() => {
      const timeLeft = +offerEndTime - +new Date();
      const nineMinutesThirtySeconds = 9.5 * 60 * 1000;

      if (timeLeft > 0 && timeLeft <= nineMinutesThirtySeconds) {
        setIsPopupOpen(true);
        setPopupHasBeenShown(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [offerEndTime, popupHasBeenShown]);

  if (!offerEndTime) {
    return null; // या लोडिंग स्केलेटन
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-card p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t border-primary/20 sm:p-3">
        <div className="container mx-auto flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="font-bold text-primary animate-pulse text-sm mb-1">
                ऑफ़र समाप्त होने में:
              </p>

              {/* काउंटडाउन टाइमर */}
              <CountdownTimer endTime={offerEndTime} />
            </div>

            <div className="hidden sm:flex items-baseline gap-3">
              <span className="text-2xl text-muted-foreground line-through">₹998</span>
              <span className="text-4xl font-bold text-primary">₹199</span>
            </div>
          </div>
          
          <a href={process.env.NEXT_PUBLIC_CTA_URL} className="w-auto shrink-0">
            <Button 
              onClick={handleRedirect}
              size="lg"
              className="w-full font-bold text-base sm:text-lg py-3 sm:py-6 px-4 sm:px-6 animate-shine text-center"
            >
              मेरा सोलमेट दिखाएँ
            </Button>
          </a>
        </div>
      </div>

      {/* स्पेशल ऑफ़र पॉपअप */}
      <SpecialOfferPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
}

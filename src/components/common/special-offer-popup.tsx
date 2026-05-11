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

// export default function SpecialOfferPopup({ isOpen, onClose }: SpecialOfferPopupProps) {
//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
//       <Card className="relative w-[90vw] max-w-md m-4 bg-card border-primary/50 shadow-2xl animate-in zoom-in-95">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-accent transition-colors"
//         >
//           <X className="h-5 w-5" />
//           <span className="sr-only">Close</span>
//         </button>
//         <CardHeader className="text-center items-center pb-2">
//             <div className="p-3 bg-primary/10 rounded-full mb-2">
//                 <Gift className="h-8 w-8 text-primary" />
//             </div>
//             <CardTitle className="font-headline text-2xl text-primary">
//                 Wait! A Special Offer For You
//             </CardTitle>
//         </CardHeader>
//         <CardContent className="text-center">
//             <p className="text-foreground/80 mb-4">
//                 You're just moments away from seeing your soulmate. As a special gift, we're giving you an extra <span className="font-bold text-primary">25% DISCOUNT</span> on your order!
//             </p>
//             <div className="p-4 bg-primary/10 rounded-lg mb-6 text-left">
//                 <p className="font-semibold text-primary">Your order includes:</p>
//                 <ul className="list-disc list-inside text-foreground/80 mt-2 space-y-1">
//                     <li>A Personalized Psychic Sketch</li>
//                     <li className="font-bold">A FREE In-Depth Love Reading</li>
//                 </ul>
//             </div>
//           <a href={process.env.NEXT_PUBLIC_DISCOUNT_CTA_URL} onClick={onClose}>
//             <Button size="lg" className="w-full font-bold text-lg py-6 animate-shine">
//               Claim My 25% Discount Now
//             </Button>
//           </a>
//           <p className="mt-2 text-sm text-muted-foreground">Offer applied at checkout.</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function SpecialOfferPopup({ isOpen, onClose }: SpecialOfferPopupProps) {
  const router = useRouter();
  const [spotsLeft, setSpotsLeft] = useState(85);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isUrgent, setIsUrgent] = useState(false);

  const handleGetSoulmateSketch = () => {
    onClose();
    // router.push('/cart-cashfree');
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
    if (spotsLeft > 70) return "🔥 People are claiming their soulmate sketches NOW!";
    if (spotsLeft > 65) return "⚡ Your soulmate is waiting - don't let them slip away!";
    if (spotsLeft > 60) return "🚨 Spots disappearing fast - your destiny awaits!";
    if (spotsLeft > 55) return "💫 Almost sold out - don't miss your chance!";
    if (spotsLeft > 50) return "🌟 Your soulmate sketch is calling your name!";
    if (spotsLeft > 45) return "🔥 Last few spots - claim your destiny now!";
    if (spotsLeft > 40) return "⚡ Your soulmate is getting impatient!";
    if (spotsLeft > 35) return "🚨 Almost gone - your love story awaits!";
    if (spotsLeft > 30) return "💫 Don't let your soulmate wait any longer!";
    if (spotsLeft > 25) return "🌟 Final spots - your destiny is calling!";
    if (spotsLeft > 20) return "🔥 Last chance to meet your soulmate!";
    if (spotsLeft > 15) return "⚡ Your soulmate sketch is almost sold out!";
    if (spotsLeft > 10) return "🚨 FINAL SPOTS - Claim your soulmate now!";
    return "💥 LAST SPOT - Your soulmate is waiting for you!";
  };

  if (!isOpen) {
    return null;
  }

  return (
    // <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in zoom-in-95 fade-in-0">

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
          {/* <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Gift className="h-8 w-8 text-primary" />
            </div> */}
          <CardTitle className="font-headline text-2xl text-primary leading-tight">
            <span className="animate-lightning-shake pr-2">⚡ </span> LIMITED SPOTS <span className="animate-lightning-shake pl-2">⚡</span>
          </CardTitle>
          <p className="text-lg text-primary font-semibold">Don't Miss Out!</p>
        </CardHeader>

        <CardContent className="text-center mt-2">
          {/* FOMO Countdown Section */}
          <div className="mb-6 space-y-4">

            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-bold text-xl text-primary">Only <span className="font-black">{spotsLeft}</span> Spots Left!</span>
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

          <div className="p-4 bg-primary/10 rounded-lg mb-6 text-left">
            <p className="font-semibold text-primary">Your order includes:</p>
            <ul className="list-disc list-inside text-foreground/80 mt-2 space-y-1">
              <li>A Personalized Psychic Sketch</li>
              <li className="font-bold">A FREE In-Depth Love Reading</li>
            </ul>
          </div>

          {/* <a href={process.env.NEXT_PUBLIC_DISCOUNT_CTA_URL} onClick={onClose}> */}
            <Button size="lg" onClick={handleGetSoulmateSketch} className="w-full font-bold text-lg py-6 animate-shine bg-primary hover:bg-primary/90">
              Get My Soulmate Sketch Now
            </Button>
          {/* </a> */}
        </CardContent>
      </Card>
    </div>
  );
}
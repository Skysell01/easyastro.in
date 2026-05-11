'use client'; // 👈 add this at the top if in app/ directory

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface CtaButtonProps {
    isCartPage?: boolean;
}

export default function CtaButton({ isCartPage = false }: CtaButtonProps) {
    const router = useRouter();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRedirect = () => {
        scrollToTop();
        // router.push('/cart-cashfree');
         window.location.href =
    "https://superprofile.bio/vp/custom-soul-mate-sketch---free-love-report-%F0%9F%98%B3?checkout=true";
    };

    return (
        <div className="text-center">
            {isCartPage ? (
                <Button 
                    size="lg" 
                    className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine"
             
                >
                    Reveal My Soulmate Now!
                </Button>
            ) : (
                <a >
                    <Button 
                           onClick={handleRedirect}
                    size="lg" className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine">
                        Reveal My Soulmate Now!
                    </Button>
                </a>
            )}
            <p className="mt-4 text-sm text-primary/80 animate-pulse">
                Only a few spots left! Hurry before the special offer ends.
            </p>
        </div>
    );
}

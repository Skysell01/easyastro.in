'use client'; // 👈 app/ directory में हो तो ऊपर यह ज़रूर लिखें

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface CousinCtaProps {
    isCartPage?: boolean;
}

export default function CousinCta({ isCartPage = false }: CousinCtaProps) {
    const router = useRouter();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRedirect = () => {
        scrollToTop();
        // router.push('/hindiCartCashfree');
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
                    अभी अपना सोलमेट देखें!
                </Button>
            ) : (
                <a>
                    <Button 
                        onClick={handleRedirect}
                        size="lg" 
                        className="font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 animate-shine"
                    >
                        अभी अपना सोलमेट देखें!
                    </Button>
                </a>
            )}
            <p className="mt-4 text-sm text-primary/80 animate-pulse">
                केवल कुछ ही स्थान बचे हैं! ऑफ़र खत्म होने से पहले जल्दी करें।
            </p>
        </div>
    );
}

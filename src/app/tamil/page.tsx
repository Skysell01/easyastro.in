

import HeroSection from "@/components/tamil/landing/HeroSection";
import TrustIndicators from "@/components/tamil/landing/TrustIndicators";
import SoulmateSection from "@/components/tamil/landing/SoulmateSection";
import HowItWorks from "@/components/tamil/landing/HowItWorks";
import BenefitsSection from "@/components/tamil/landing/BenefitsSection";
import ProductPreview from "@/components/tamil/landing/ProductPreview";
import TestimonialsSection from "@/components/tamil/landing/TestimonialsSection";
import ComparisonSection from "@/components/tamil/landing/ComparisonSection";
import FAQSection from "@/components/tamil/landing/FAQSection";
import FooterCta from "@/components/tamil/landing/FooterCta";
import StickyCtaBar from "@/components/tamil/landing/StickyCtaBar";

export const metadata = {
  title: "Soulmate Tamil | EasyAstro",
  description: "உங்கள் ஆன்ம துணையை கண்டறியுங்கள்",
};

export default function SoulmateTamilPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <TrustIndicators />
      <SoulmateSection />
      <HowItWorks />
      <BenefitsSection />
      <ProductPreview />
      <TestimonialsSection />
      <ComparisonSection />
      <FAQSection />
      <FooterCta />
      <StickyCtaBar />
    </main>
  );
}
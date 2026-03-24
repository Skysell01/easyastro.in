
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import CtaButton from "../common/cta-button";

const trustFactors = [
  "Over 100,000 sketches delivered",
  "Average 4.8/5 rating from clients",
  "Expert psychics & astrologers",
  "Full satisfaction or your money back",
];

export default function WhyTrustUsSection() {
  return (
    <section className="py-7 sm:py-16 bg-card">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-headline mb-7">Why Trust Us?</h2>
            <ul className="space-y-4 mb-8">
              {trustFactors.map((factor, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground/90">{factor}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold text-accent">
              Safe, secure, and always confidential. Your trust is our priority.
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <Image
              src="/trust-image.png"
              alt="Beautiful soulmate sketch"
              width={500}
              height={500}
              className="aspect-square object-contain"
            />
          </div>
        </div>
        <div className="mt-11">
          <CtaButton />
        </div>
      </div>
    </section>
  );
}

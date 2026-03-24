import Image from "next/image";
import CtaButton from "@/components/common/cta-button";

export default function IntroductionSection() {
  return (
    <section className="py-7 sm:py-16 bg-background">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-7">
            Is your heart longing for that special connection?
          </h2>
          <div className="lg:hidden my-8">
            <Image
              src="/hero-image-2.png"
              alt="Artistic representation of destiny and connection"
              width={500}
              height={500}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="destiny connection"
            />
          </div>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Unveil the mystery of your destined partner with a personalized soulmate sketch – crafted to align your energy with the universe and attract true love into your life.
          </p>
          <p className="text-xl font-semibold text-primary italic">
            Your romantic destiny is waiting – all you need to do is say yes.
          </p>
          <div className="mt-11">
            <CtaButton />
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
            <Image
              src="/hero-image-2.png"
              alt="Artistic representation of destiny and connection"
              width={500}
              height={500}
              className="rounded-lg shadow-xl mx-auto"
              data-ai-hint="destiny connection"
            />
        </div>
      </div>
    </section>
  );
}

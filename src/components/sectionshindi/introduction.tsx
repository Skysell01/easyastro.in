import Image from "next/image";
import CousinCta from "./CousinCta";
import { Sparkles, HeartHandshake, CheckCircle2 } from "lucide-react";

export default function IntroductionSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/70 to-background">
      {/* background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(600px_220px_at_70%_0%,theme(colors.primary/12),transparent)]" />

      <div className="container mx-auto grid items-center gap-10 px-4 py-10 sm:py-16 lg:grid-cols-2">
        
        {/* LEFT: Copy */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          
          {/* Mini badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary lg:mx-0">
            <Sparkles className="h-4 w-4" />
            व्यक्तिगत और पूरी तरह निजी
          </div>

          <h2 className="mt-4 font-headline text-3xl leading-tight text-foreground md:text-4xl">
            क्या आपका दिल उस{" "}
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-primary bg-clip-text font-extrabold text-transparent">
              खास रिश्ते
            </span>{" "}
            की तलाश में है?
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-foreground/80">
            अपने जीवनसाथी या नियत प्रेम की रहस्यमयी पहचान को उजागर करें — एक{" "}
            <span className="font-semibold text-foreground">व्यक्तिगत सोलमेट स्केच</span> के माध्यम से,
            जिसे आपकी ऊर्जा, आपकी आभा और ब्रह्मांड के संयोग के अनुसार तैयार किया जाता है,
            ताकि आपके जीवन में सच्चा प्यार आकर्षित हो सके।
          </p>

          <p className="mt-3 text-xl font-semibold italic text-primary">
            आपका प्रेमभाग्य आपका इंतज़ार कर रहा है — बस आपको “हाँ” कहना है।
          </p>

          {/* Benefits list */}
          <ul className="mx-auto mt-6 grid max-w-xl gap-3 text-left lg:mx-0">
            {[
              "24 घंटों के भीतर गोपनीय रूप से डिलीवर किया जाएगा",
              "100% प्राइवेसी — आपकी जानकारी पूरी तरह सुरक्षित",
              "प्रतिभाशाली साइकि्क्स और एस्ट्रोलॉजी विशेषज्ञों द्वारा तैयार",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-card/70 px-4 py-3 backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA + trust */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <CousinCta />
            <div className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-card/60 px-4 py-3 text-sm text-foreground/70 backdrop-blur">
              <HeartHandshake className="h-5 w-5 text-primary" />
              <span>हज़ारों खुश ग्राहक</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="order-1 flex justify-center lg:order-2">

          {/* Mobile image */}
          <div className="w-full max-w-md lg:hidden">
            <Image
              src="https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2002_54_36%20PM.png"
              alt="भाग्य और जुड़ाव का कलात्मक प्रतिरूप"
              width={800}
              height={800}
              className="mx-auto rounded-3xl border border-white/10 shadow-2xl"
              priority
            />
          </div>

          {/* Desktop framed image */}
          <div className="relative hidden w-full max-w-lg lg:block">
            <div className="absolute -inset-0.5 -z-10 rounded-[28px] bg-gradient-to-br from-primary/40 via-fuchsia-500/30 to-primary/10 opacity-80 blur-2xl" />
            <div className="rounded-3xl border border-white/10 bg-card/80 p-2 shadow-2xl backdrop-blur">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/hero-image-2.png"
              alt="Artistic representation of destiny and connection"
              width={500}
              height={500}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur">
              यह सिर्फ एक सैंपल है • आपका स्केच पूरी तरह आपके लिए अनोखा होगा
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

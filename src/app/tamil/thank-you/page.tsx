"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Clock, MessageCircle, Gift } from "lucide-react";
import Link from "next/link";

const ThankYou = () => (
  <main className="min-h-screen section-gradient flex items-center py-12">
    <div className="container max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
          நன்றி! உங்கள் ஆர்டர் <span className="text-gradient">உறுதிப்படுத்தப்பட்டது</span> ✨
        </h1>
        <p className="text-muted-foreground mb-10">
          உங்கள் Soul Map அறிக்கை விரைவில் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்.
        </p>

        {/* Next Steps */}
        <div className="card-glass text-left space-y-5 mb-10">
          <h2 className="font-bold text-foreground text-lg">அடுத்து என்ன நடக்கும்?</h2>
          {[
            { icon: Mail, text: "உங்கள் மின்னஞ்சலில் உறுதிப்படுத்தல் செய்தி வரும்" },
            { icon: Clock, text: "24 மணி நேரத்திற்குள் அறிக்கை தயாராகும்" },
            { icon: Mail, text: "PDF அறிக்கை உங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground text-sm">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Support */}
        <div className="card-glass text-left mb-10">
          <div className="flex items-center gap-4">
            <MessageCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <p className="font-bold text-foreground text-sm">உதவி தேவையா?</p>
              <p className="text-muted-foreground text-sm">support@soulmap.in | WhatsApp: +91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Upsell */}
        <div className="card-glass text-left border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <Gift className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-1">🎁 சிறப்பு சலுகை!</h3>
              <p className="text-muted-foreground text-sm mb-3">
                உங்கள் துணையின் Soul Map-ஐயும் பெறுங்கள் — 50% கூடுதல் தள்ளுபடியில்! இரண்டு அறிக்கைகளையும் ஒப்பிட்டு உறவு இணக்கத்தன்மையை கண்டறியுங்கள்.
              </p>
              <Link href="/tamil/checkout" className="btn-cta text-sm px-6 py-2.5">
                துணையின் அறிக்கையும் வாங்கவும் — ₹99
              </Link>
            </div>
          </div>
        </div>

        <a href="/" className="inline-block mt-8 text-sm text-primary font-semibold hover:underline">
          ← முகப்புப் பக்கத்திற்கு திரும்பு
        </a>
      </motion.div>
    </div>
  </main>
);

export default ThankYou;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { load } from "@cashfreepayments/cashfree-js";
import {
  ShieldCheck,
  Star,
  Timer,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Plus,
  ChevronDown,
} from "lucide-react";
import StickyBuyBar from "./sticky";
import { BACKEND_URL } from "@/lib/backendUrl";
// ✅ SUPABASE — import client
import { ordersSupabase } from "@/components/hindi-supabase/integration/supabase/client";

import GalleryHindi from "../../components/sections/GalleryHindi";
import TestimonialsHindi from "../../components/sections/TestimonialsHindi";
import TestimonialsSection from "../../components/sections/TestimonialsHindi";

/** ───────────────────────── Types & Data ───────────────────────── */

type Bump = {
  id: string;
  title: string;
  blurb: string;
  price: number;
  compareAt?: number;
  features?: string[];
};

const PRODUCT = {
  id: "soulmate-sketch",
  title: "सोलमेट स्केच + मुफ़्त लव रिपोर्ट",
  img: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png",
  price: 199,
  compareAt: 998,
  includes: [
    "आपके लिए बनाया गया पर्सनल हैंड-ड्रॉन स्केच",
    "मुफ़्त डीटेल्ड लव रीडिंग",
    "ईमेल और व्हाट्सएप पर 24–48 घंटे के अंदर प्राइवेट डिलीवरी",
  ],
};

const BUMPS: Bump[] = [
  {
    id: "bump-horoscope-24m",
    title: "2 साल का पर्सनल राशिफल",
    blurb:
      "आने वाले 24 महीनों का स्पष्ट नक्शा — प्यार, करियर, पैसा और हेल्थ। सही समय पर सही फ़ैसले लें।",
    price: 99,
    compareAt: 299,
    features: [
      "हर महीने की भविष्यवाणी",
      "प्यार और शादी का फ़ोरकास्ट",
      "करियर और धन की साइकल",
      "लकी दिन और सही मौके",
      "उपाय, क्या करें और क्या न करें",
    ],
  },
  {
    id: "bump-wealth",
    title: "वेल्थ रिपोर्ट",
    blurb: "पैसों की रुकावटें पहचानें और अपनी फाइनेंशियल डेस्टिनी के साथ अलाइन हों।",
    price: 99,
    compareAt: 299,
    features: [
      "मनी ब्लॉक्स और उनके समाधान",
      "इन्वेस्टमेंट के सही टाइमलाइन",
      "बचत और रिस्क लेने की सही विंडो",
    ],
  },
  {
    id: "bump-life-path-ebook",
    title: "लाइफ़ पाथ और करियर ई-बुक",
    blurb: "आपके पर्पज़, स्ट्रेंथ और करियर पाथ पर क्लियर, एक्शन-योग्य गाइड।",
    price: 99,
    compareAt: 249,
    features: [
      "आपका पर्पज़ और स्ट्रेंथ",
      "साप्ताहिक प्रैक्टिस प्लान",
      "फ़ैसले लेने के प्रैक्टिकल फ्रेमवर्क",
    ],
  },
];

/** ───────────────────────── Hooks ───────────────────────── */

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const mmss = useMemo(() => {
    const m = String(Math.floor(left / 60)).padStart(2, "0");
    const s = String(left % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [left]);
  return { left, mmss };
}

/** ───────────────────────── Page ───────────────────────── */

export default function CartPage() {
  const router = useRouter();
  const { mmss } = useCountdown(10 * 60);

  // Essentials form
  const [form, setForm] = useState({
    fullName: "",
    gender: "female",
    email: "",
    whatsapp: "",
    dateOfBirth: "",
    placeOfBirth: "",
  });
  const on = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  // Bumps
  const [selectedBumps, setSelectedBumps] = useState<Record<string, boolean>>({});
  const toggleBump = (id: string) => setSelectedBumps((s) => ({ ...s, [id]: !s[id] }));
  const bumpsTotal = useMemo(
    () => BUMPS.filter((b) => selectedBumps[b.id]).reduce((sum, b) => sum + b.price, 0),
    [selectedBumps]
  );
  const total = PRODUCT.price + bumpsTotal;

  // Checkout state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [finalAmount, setFinalAmount] = useState(total);
  const [cashfree, setCashfree] = useState<any>(null);
const [sdkReady, setSdkReady] = useState(false);

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
//initialize cashfree
useEffect(() => {
  const initCashfree = async () => {
    try {
      const cf = await load({
        mode: "production", // or sandbox
      });
      setCashfree(cf);
      setSdkReady(true);
    } catch (err) {
      console.error("Cashfree init failed:", err);
      alert("Payment system load nahi ho paya");
    }
  };

  initCashfree();
}, []);

  // Update finalAmount when total changes
  useEffect(() => {
    setFinalAmount(total);
  }, [total]);


  // createPaymentSession
  const createPaymentSession = async () => {
  try {
    const additionalProducts = BUMPS
      .filter((b) => selectedBumps[b.id])
      .map((b) => b.title);

    const payload = {
      amount: finalAmount,
      fullName: form.fullName?.trim() || "Guest User",
      email: form.email?.trim() || `guest${Date.now()}@gmail.com`,
      phoneNumber: form.whatsapp?.replace(/\D/g, "") || "9999999999",
      additional_products: additionalProducts,
      product_name: "Soulmate Sketch",
      url: `${window.location.origin}/hindi-order-confirmation`, // ✅ DIFFERENT PAGE
    };

    // ✅ Save before payment
    localStorage.setItem("orderData", JSON.stringify(payload));

    const res = await fetch(`${FUNCTIONS_URL}/create-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAIN_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) throw new Error("Session failed");

    localStorage.setItem("pendingOrderId", data.data.order_id);

    return data.data.payment_session_id;

  } catch (err) {
    console.error(err);
    alert("Session create nahi ho paya");
    return null;
  }
};
 

  // Listen for "reveal-form" (from sticky bar)
  const [formGlow, setFormGlow] = useState(false);
  useEffect(() => {
    const handler = () => {
      setFormGlow(true);
      setTimeout(() => setFormGlow(false), 1400);
    };
    document.addEventListener("reveal-form", handler);
    return () => document.removeEventListener("reveal-form", handler);
  }, []);

  /** ── Chatsonway webhook ── */
  const sendChatsonwayWebhook = async (payload: any) => {
    try {
      await fetch("https://automations.chatsonway.com/webhook/692049bf1b9845c02d52d83b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to send Chatsonway webhook:", error);
    }
  };

  /** ── Abandoned user automation ── */
  const sendAbandonedUserToAutomation = async () => {
    try {
      const [firstName, ...restName] = (form?.fullName || "").trim().split(" ");
      const lastName = restName.join(" ");
      await fetch("https://automations.chatsonway.com/webhook/6927f8681b9845c02d57070d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName || "",
          lastName: lastName || "",
          dob: form?.dateOfBirth || "",
          placeOfBirth: form?.placeOfBirth || "",
          phoneNumber: form?.whatsapp || "",
          email: form?.email || "",
          is: "abandoned",
        }),
      });
    } catch (error) {
      console.error("Failed to send abandoned user to automation:", error);
    }
  };

  // handle checkout 
  const handleCheckout = async () => {
  try {
    setIsCheckingOut(true);

    const paymentSessionId = await createPaymentSession();

    if (!paymentSessionId) return;

    if (!cashfree || !sdkReady) {
      alert("Payment ready nahi hai");
      return;
    }

    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_self",
    });

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  } finally {
    setIsCheckingOut(false);
  }
};

      
    

      // ── 2. Supabase: insert abandoned order (independent) ───
      const { error: abdSupabaseError } = await ordersSupabase
        .from("abandoned_orders")
        .insert({
          full_name: form.fullName,
          email: form.email,
          phone: form.whatsapp,
          gender: form.gender,
          date_of_birth: form.dateOfBirth,
          place_of_birth: form.placeOfBirth,
          amount: finalAmount,
          additional_products: additionalProducts,
        });
      if (abdSupabaseError) {
        // Non-fatal — log and continue
        console.error("Supabase abandoned_orders insert error:", abdSupabaseError);
      } else {
        console.log("Supabase abandoned_orders: row inserted");
      }

      

              // ── 4b. Supabase: insert confirmed order (independent) ──
              const { error: orderSupabaseError } = await ordersSupabase
                .from("orders")
                .insert({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  full_name: form.fullName,
                  email: form.email,
                  phone: form.whatsapp,
                  gender: form.gender,
                  date_of_birth: form.dateOfBirth,
                  place_of_birth: form.placeOfBirth,
                  amount: finalAmount,
                  additional_products: additionalProducts,
                });
              if (orderSupabaseError) {
                // Non-fatal — payment succeeded, don't block user
                console.error("Supabase orders insert error:", orderSupabaseError);
              } else {
                console.log("Supabase orders: row inserted");
              }

              // ── 5. Chatsonway webhook ────────────────────────────
              await sendChatsonwayWebhook({
                amount: finalAmount,
                name: form.fullName || "",
                email: form.email || "",
                phone: form.whatsapp || "",
                dateOfBirth: form.dateOfBirth || "",
                placeOfBirth: form.placeOfBirth || "",
                gender: form.gender || "",
                additionalProducts,
                isChatsonorderSuccessfull: "Order Successfull",
              });

              // ── 6. AiSensy campaign notification ─────────────────
              if (form.whatsapp) {
                try {
                  await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      apiKey:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGY5YTMyZDQ3MzczMGU3MzNhZTZiMCIsIm5hbWUiOiJTcGVrbGlvIE1lZGlhIDIxMzQiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjhkZjlhMzJkNDczNzMwZTczM2FlNmFiIiwiYWN0aXZlUGxhbiI6IkZSRUVfRk9SRVZFUiIsImlhdCI6MTc1OTQ4NDQ2Nn0.D5rCrsjtikR4N68HNS7ZOpNfzTSTuN9otxZ9-UBvi1g",
                      campaignName: "28oct",
                      destination: form.whatsapp,
                      userName: "Speklio Media 2134",
                      templateParams: [],
                      source: "new-landing-page form",
                      media: {},
                      buttons: [],
                      carouselCards: [],
                      location: {},
                      attributes: {},
                      paramsFallbackValue: {},
                    }),
                  });
                } catch (error) {
                  console.error("Failed to send campaign notification:", error);
                }
              }

           

              // ── 8. Redirect to confirmation ──────────────────────
              const confirmationParams = new URLSearchParams({
                orderId: data.orderId,
                orderType: "सोलमेट स्केच",
                fullName: form.fullName || "Customer",
                email: form.email || "",
                phoneNumber: form.whatsapp || "",
                amount: finalAmount.toString(),
                dateOfBirth: form.dateOfBirth,
                placeOfBirth: form.placeOfBirth,
                gender: form.gender,
                additionalProducts: additionalProducts.join(","),
              });
              window.location.href = `/hindi-order-confirmation?${confirmationParams.toString()}`;
            } else {
              alert("पेमेंट सफल हुआ, लेकिन ऑर्डर क्रिएट नहीं हो पाया। कृपया सपोर्ट से संपर्क करें।");
            }
          } catch (error) {
            console.error("Error creating order:", error);
            alert("पेमेंट सफल हुआ, लेकिन ऑर्डर क्रिएट नहीं हो पाया। कृपया सपोर्ट से संपर्क करें।");
          }
        },

        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.whatsapp,
        },
        theme: { color: "#ec4899" },
        modal: {
          ondismiss: async () => {
            console.log("Razorpay modal dismissed");
            // Supabase abandoned row already inserted above — nothing extra needed
            await sendAbandonedUserToAutomation();
          },
        };

   
     catch (error) {
      console.error("Checkout error:", error);
      alert("पेमेंट फ़ेल हो गया, कृपया दोबारा कोशिश करें।");
    } finally {
      setIsCheckingOut(false);
    };
  

  return (
    <main className="relative min-h-screen overflow-x-hidden scroll-smooth text-[15.5px] sm:text-[16.5px] leading-[1.65]">
      <style jsx global>{`
        .btn-glow {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(236, 72, 153, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.18);
          transform: translateZ(0);
        }
        .btn-glow::before {
          content: "";
          position: absolute;
          inset: -140%;
          background: conic-gradient(
            from 0deg,
            rgba(236, 72, 153, 0.25),
            rgba(244, 114, 182, 0.25),
            rgba(244, 63, 94, 0.25),
            rgba(236, 72, 153, 0.25)
          );
          filter: blur(28px);
          animation: spin-slow 6s linear infinite;
          z-index: -2;
        }
        .btn-glow::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 120% at 50% 0%, rgba(255, 255, 255, 0.28), transparent 60%);
          z-index: -1;
        }
        .btn-glow:hover {
          box-shadow: 0 14px 30px rgba(236, 72, 153, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.22);
        }
        .btn-shine {
          position: relative;
          overflow: hidden;
        }
        .btn-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          height: 100%;
          width: 60%;
          transform: skewX(-24deg);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shine 2.4s ease-in-out infinite;
        }
        @keyframes shine {
          0% { left: -120%; }
          55% { left: 140%; }
          100% { left: 140%; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .btn-bounce {
          animation: micro-bounce 1.8s ease-in-out infinite;
        }
        @keyframes micro-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
      `}</style>

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fee9f2] via-[#fdd7e8]/75 to-[#fbcadb]" />
      <div className="absolute inset-0 opacity-45 [background:repeating-linear-gradient(110deg,rgba(255,255,255,.58)_0_8px,transparent_8px_16px)]" />

      <StickyBuyBar
        price={PRODUCT.price}
        compareAt={PRODUCT.compareAt}
        mmss={mmss}
        total={total}
        scrollTargetId="details-form"
      />

      <ScrollCue />

      <div className="relative mx-auto w-full max-w-[1000px] px-4 sm:px-6 pb-32 pt-7 sm:pt-10">
        {/* Top chip */}
        <div className="mb-6 text-center sm:mb-9">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-pink-100/50 px-3.5 py-1.5 text-[13px] font-semibold text-pink-700 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            सुरक्षित चेकआउट • 100k+ लोगों का भरोसा
          </span>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <section className="space-y-7">
            {/* PRODUCT PREVIEW */}
            <Card className="overflow-hidden border-pink-200/60 bg-white/95 backdrop-blur">
              <CardHeader className="pb-1.5">
                <CardTitle className="text-base sm:text-lg font-bold truncate text-zinc-900">
                  {PRODUCT.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid items-start gap-3 [grid-template-columns:minmax(0,1fr)_150px] sm:[grid-template-columns:minmax(0,1fr)_220px]">
                <div className="pr-1">
                  <ul className="space-y-2.5">
                    {PRODUCT.includes.map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 rounded-lg border border-zinc-200/70 bg-white/85 px-3 py-2 text-[13.5px] leading-[1.35] sm:text-[14px]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500 shrink-0" />
                        <span className="truncate">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="justify-self-end w-[150px] sm:w-[220px]">
                  <div className="rounded-xl border border-white/60 bg-white/80 p-1.5 shadow-sm">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={PRODUCT.img}
                        alt="सोलमेट स्केच का सैंपल प्रीव्यू"
                        width={440}
                        height={440}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-1.5 text-center text-[11px] text-pink-900/70">
                    सैंपल इमेज • आपका स्केच पूरी तरह पर्सनल होगा
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BUMPS */}
            <Card className="border-pink-200/70 bg-white/96 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xl sm:text-[22px] text-pink-700 font-extrabold">
                  <span className="h-2 w-2 rounded-full bg-pink-500 inline-block" />
                  अपने लव जर्नी को और पावरफ़ुल बनाएं
                </CardTitle>
                <p className="text-[13.5px] sm:text-sm text-pink-700/80">
                  यह वैकल्पिक ऐड-ऑन हैं। शामिल करने के लिए "Add" पर टैप करें।
                </p>
              </CardHeader>
              <CardContent className="space-y-4.5">
                {BUMPS.map((b) => (
                  <CompactBumpRow
                    key={b.id}
                    bump={b}
                    checked={!!selectedBumps[b.id]}
                    onToggle={() => toggleBump(b.id)}
                  />
                ))}
              </CardContent>
            </Card>

            {/* FORM */}
            <Card
              id="details-form"
              className={[
                "border-pink-200/60 bg-white/95 backdrop-blur transition-all",
                formGlow ? "ring-2 ring-pink-400 shadow-[0_0_0_6px_rgba(244,114,182,0.18)]" : "",
              ].join(" ")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl sm:text-[22px] font-extrabold text-zinc-900">
                  आपकी डिटेल्स
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4.5">
                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                      पूरा नाम <span className="text-pink-600">*</span>
                    </label>
                    <input
                      value={form.fullName}
                      onChange={on("fullName")}
                      placeholder="जैसे: Aisha Khan"
                      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                        जेंडर
                      </label>
                      <select
                        value={form.gender}
                        onChange={on("gender")}
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                      >
                        <option value="female">महिला</option>
                        <option value="male">पुरुष</option>
                        <option value="other">अन्य</option>
                        <option value="prefer_not_to_say">न बताना पसंद है</option>
                      </select>
                    </div>
                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-pink-500" />
                        व्हाट्सएप नंबर
                      </label>
                      <input
                        value={form.whatsapp}
                        onChange={on("whatsapp")}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900 flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-pink-500" />
                      ईमेल
                    </label>
                    <input
                      value={form.email}
                      onChange={on("email")}
                      type="email"
                      placeholder="aap@example.com"
                      className="w-full rounded-lg border border-zinc-200 bg-white/90 px-3.5 py-2.5 text-[15px] outline-none focus:border-pink-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                        जन्म तिथि
                      </label>
                      <div className="relative">
                        {!form.dateOfBirth && (
                          <span
                            style={{
                              position: "absolute",
                              left: "14px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              fontSize: "14px",
                              color: "#9ca3af",
                              pointerEvents: "none",
                            }}
                          >
                            YYYY-MM-DD
                          </span>
                        )}
                        <input
                          value={form.dateOfBirth}
                          onChange={on("dateOfBirth")}
                          type="date"
                          required
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            background: "rgba(255,255,255,0.9)",
                            padding: "12px",
                            fontSize: "15px",
                            outline: "none",
                            minHeight: "46px",
                            WebkitAppearance: "none",
                          }}
                          className="focus:border-pink-300"
                        />
                      </div>
                    </div>

                    <div className="grid gap-1.5">
                      <label className="text-[14px] sm:text-[15px] font-semibold text-zinc-900">
                        जन्म स्थान
                      </label>
                      <input
                        value={form.placeOfBirth}
                        onChange={on("placeOfBirth")}
                        placeholder="शहर, राज्य"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          background: "rgba(255,255,255,0.9)",
                          padding: "12px",
                          fontSize: "15px",
                          outline: "none",
                        }}
                        className="focus:border-pink-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <Button
                    onClick={handleCheckout}
                    size="lg"
                    className={[
                      "w-full rounded-2xl py-5 text-[17px] mt-[14px] sm:text-[18px] font-extrabold",
                      "bg-pink-600 hover:bg-pink-600/95 text-white",
                      "btn-glow btn-shine btn-bounce",
                    ].join(" ")}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "प्रोसेस हो रहा है..." : `अभी खरीदें — ₹${PRODUCT.price}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* RIGHT — desktop summary */}
          <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start space-y-6">
            <SummaryCard
              price={PRODUCT.price}
              compareAt={PRODUCT.compareAt}
              mmss={mmss}
              total={total}
              onPay={handleCheckout}
            />
            <AssureCard />
          </aside>
        </div>

        <div className="mt-10">
          <GalleryHindi isCartPage />
        </div>
        <div className="mt-10">
          <TestimonialsSection isCartPage={true} />
        </div>
      </div>
    </main>
  );
}

/** ───────────────────────── Small UI helpers ───────────────────────── */

function SummaryCard({
  price,
  compareAt,
  mmss,
  total,
  onPay,
}: {
  price: number;
  compareAt?: number;
  mmss: string;
  total: number;
  onPay: () => void;
}) {
  return (
    <Card className="border-pink-200/60 bg-white/96 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl sm:text-[22px] font-extrabold text-zinc-900">
          ऑर्डर सारांश
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-zinc-200 bg-white/70 p-4.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[13.5px] sm:text-sm text-zinc-600">आज की कीमत</span>
            <div className="text-right">
              <div className="text-[26px] sm:text-[28px] font-black text-pink-600">₹{price}</div>
              {!!compareAt && (
                <div className="text-xs text-zinc-500 line-through">₹{compareAt}</div>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-pink-50 px-3 py-2 text-[13.5px] sm:text-sm text-pink-700">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              लिमिटेड-टाइम स्पेशल अपने आप लागू हो चुका है
            </div>
            <div className="flex items-center gap-1 font-bold">
              <Timer className="h-4 w-4" />
              <span>{mmss}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-[14.5px] sm:text-[15px]">
          <div className="flex items-center justify-between text-zinc-700">
            <span>सब-टोटल</span>
            <span>₹{price}</span>
          </div>
          <div className="flex items-center justify-between text-zinc-700">
            <span>डिलीवरी</span>
            <span>मुफ़्त</span>
          </div>
          <div className="h-px w-full bg-zinc-200" />
          <div className="flex items-center justify-between text-[16.5px] font-extrabold text-zinc-900">
            <span>टोटल</span>
            <span>₹{total}</span>
          </div>
        </div>

        <Button
          size="lg"
          className={[
            "w-full rounded-2xl py-6 text-[17px] sm:text-[18px] font-extrabold",
            "bg-pink-600 hover:bg-pink-600/95 text-white",
            "btn-glow btn-shine btn-bounce",
          ].join(" ")}
          onClick={onPay}
        >
          ऑर्डर सुरक्षित रूप से पूरा करें
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-[13px] text-zinc-600">
          <ShieldCheck className="h-4 w-4 text-pink-600" />
          100% प्राइवेट • मनी-बैक गारंटी • सुरक्षित चेकआउट
        </div>
      </CardContent>
    </Card>
  );
}

function AssureCard() {
  return (
    <Card className="border-pink-200/60 bg-white/90 backdrop-blur">
      <CardContent className="space-y-3.5 p-4 text-[14.5px] text-zinc-800">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500" />
          <p>
            डिलीवरी <b>ईमेल और व्हाट्सएप</b> के ज़रिए <b>24–48 घंटों</b> के अंदर।
          </p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500" />
          <p>
            हर स्केच <b>हाथ से बनाया जाता है</b> और <b>पूरी तरह आपके लिए यूनिक</b> होता है।
          </p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 text-green-500" />
          <p>
            अगर आप संतुष्ट नहीं हैं तो <b>फुल रिफंड</b> — बिना किसी सवाल-जवाब के।
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function CompactBumpRow({
  bump,
  checked,
  onToggle,
}: {
  bump: Bump;
  checked: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-pink-200/70 bg-pink-50/40 p-3.5 sm:p-4.5">
      <div className="flex items-start justify-between gap-3.5">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <input
            id={`b-${bump.id}`}
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="mt-1 h-5 w-5 rounded border-pink-400 text-pink-600 focus:ring-pink-300"
          />
          <div className="min-w-0">
            <label
              htmlFor={`b-${bump.id}`}
              className="cursor-pointer text-[15.5px] sm:text-[16px] font-extrabold text-pink-800"
            >
              {bump.title}
            </label>
            <p className="mt-0.5 line-clamp-2 text-[13.5px] sm:text-[14px] text-pink-900/85">
              {bump.blurb}
            </p>
            {bump.features?.length ? (
              <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
                {bump.features.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-pink-200 bg-white/70 px-2.5 py-0.5 text-[11.5px] text-pink-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[14.5px] sm:text-[15px] font-black text-pink-700">₹{bump.price}</div>
          {!!bump.compareAt && (
            <div className="text-[11.5px] text-pink-700/60 line-through">₹{bump.compareAt}</div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="mt-1 inline-flex items-center gap-1 rounded-md border border-pink-300 bg-white/80 px-2.5 py-1.5 text-[12.5px] font-bold text-pink-700 hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" />
            {checked ? "Remove" : "Add"}
          </button>
        </div>
      </div>

      {bump.features?.length ? (
        <div className="mt-2">
          {open ? (
            <>
              <ul className="space-y-1.5 rounded-lg border border-pink-200/70 bg-white/80 p-3.5 text-[13.5px] text-pink-900/90">
                {bump.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-pink-500/70" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-2 text-[12.5px] font-semibold text-pink-700 underline underline-offset-2"
                onClick={() => setOpen(false)}
              >
                कम दिखाएं
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-[12.5px] font-semibold text-pink-700 underline underline-offset-2"
              onClick={() => setOpen(true)}
            >
              और डिटेल देखें
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function ScrollCue() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[76px] z-30 flex justify-center">
      <div className="flex items-center gap-2 rounded-full border border-pink-300/60 bg-pink-50/80 px-3.5 py-1.5 text-[12.5px] sm:text-[13px] font-semibold text-pink-700 shadow-sm">
        <span className="animate-bounce">
          <ChevronDown className="h-4 w-4" />
        </span>
        नीचे स्क्रॉल करें, डिटेल भरें और अपना ऑर्डर पूरा करें
      </div>
    </div>
  );
}


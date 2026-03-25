"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { tamilSupabase } from "@/components/hindi-supabase/integration/supabase/client";

const Checkout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    pob: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: order, error: orderError } = await tamilSupabase
        .from("soulmate_orders")
        .insert([{
          project_name: "Soulmate Tamil",
          full_name: form.name,
          email: form.email,
          phone_number: form.phone,
          date_of_birth: form.dob,
          place_of_birth: form.pob,
          gender: form.gender,
          amount: 199,
          additional_products: [],
          razorpay_order_id: null,
          razorpay_payment_id: null,
          razorpay_signature: null,
          status: "pending",
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Will trigger Razorpay here in next step
    //   router.push(
    //     `/tamil/thank-you?order_id=${order.id}&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`
    //   );
      router.push(
        `/tamil/thank-you`
      );

    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "விரிவான முக அம்சங்கள்",
    "ஆளுமை நுண்ணறிவுகள்",
    "சந்திப்பு காலக்கெடு",
    "இணக்கத்தன்மை பகுப்பாய்வு",
  ];

  return (
    <main className="min-h-screen section-gradient py-8 md:py-16">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-foreground mb-2">
            உங்கள் <span className="text-gradient">Soulmate Sketch</span>-ஐ ஆர்டர் செய்யுங்கள்
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            உங்கள் காதல் சேவைகளை மதிப்பாய்வு செய்யுங்கள்
          </p>

          {/* Product Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <Image
                src="/tamil/soulmate-sketch.webp"
                alt="Soulmate Sketch"
                width={96}
                height={96}
                className="rounded-xl object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-foreground text-lg">Soulmate Sketch</h3>
                <p className="text-muted-foreground text-sm">
                  உங்கள் ஆன்ம துணையின் முகத்தின் விரிவான ஓவியத்தைப் பெறுங்கள்
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
            <hr className="border-border mb-3" />
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-primary">₹199</span>
              <span className="text-muted-foreground line-through text-sm">₹1999</span>
              <span className="text-green-600 font-bold text-sm">90% OFF</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 card-glass space-y-5 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 mb-8">

              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-foreground font-semibold">Name</Label>
                <Input id="name" name="name" placeholder="உங்கள் முழுப்பெயர்" value={form.name} onChange={handleChange} required className="mt-1.5" />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-foreground font-semibold">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="example@email.com" value={form.email} onChange={handleChange} required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground font-semibold">Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className="mt-1.5" />
                </div>
              </div>

              {/* DOB & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dob" className="text-foreground font-semibold">DOB</Label>
                  <Input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-foreground font-semibold">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">தேர்ந்தெடுக்கவும்</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Place of Birth */}
              <div>
                <Label htmlFor="pob" className="text-foreground font-semibold">Place of Birth</Label>
                <Input id="pob" name="pob" placeholder="நகரம், மாநிலம்" value={form.pob} onChange={handleChange} className="mt-1.5" />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-cta animate-pulse-glow text-base md:text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-3 shadow-xl transition-all duration-300"
              >
                {loading ? "சேமிக்கிறது..." : "இப்போது வாங்கவும் — ₹199 💫"}
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 mb-8">
              <div className="card-glass">
                <h3 className="font-bold text-foreground mb-4">ஆர்டர் சுருக்கம்</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Soul Map அறிக்கை</span>
                    <span className="text-muted-foreground line-through">₹999</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">தள்ளுபடி (80%)</span>
                    <span className="text-green-600 font-semibold">-₹800</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between text-lg font-extrabold">
                    <span className="text-foreground">மொத்தம்</span>
                    <span className="text-primary">₹199</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: ShieldCheck, text: "100% பாதுகாப்பான பணம் செலுத்துதல்" },
                  { icon: Lock, text: "தனிப்பட்ட தகவல் ரகசியமாக பாதுகாக்கப்படும்" },
                  { icon: Clock, text: "24 மணி நேரத்தில் அறிக்கை டெலிவரி" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Checkout;

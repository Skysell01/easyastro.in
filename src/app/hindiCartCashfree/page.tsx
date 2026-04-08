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

import GalleryHindi from "../../components/sections/GalleryHindi";
import TestimonialsSection from "../../components/sections/TestimonialsHindi";

/** ───────────────────────── DATA ───────────────────────── */

const PRODUCT = {
  id: "soulmate-sketch",
  title: "सोलमेट स्केच + मुफ़्त लव रिपोर्ट",
  img: "https://ik.imagekit.io/5r36kvobl/ChatGPT%20Image%20Jul%2020,%202025,%2003_59_24%20PM.png",
  price: 199,
  compareAt: 998,
};

const BUMPS = [
  { id: "b1", title: "2 साल का पर्सनल राशिफल", price: 99 },
  { id: "b2", title: "वेल्थ रिपोर्ट", price: 99 },
  { id: "b3", title: "लाइफ़ पाथ ई-बुक", price: 99 },
];

/** ───────────────────────── PAGE ───────────────────────── */

export default function CartPage() {
  const router = useRouter();

  // FORM
  const [form, setForm] = useState({
    fullName: "",
    gender: "female",
    email: "",
    whatsapp: "",
    dateOfBirth: "",
    placeOfBirth: "",
  });

  const on = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // BUMPS
  const [selectedBumps, setSelectedBumps] = useState({});
  const toggleBump = (id) =>
    setSelectedBumps((prev) => ({ ...prev, [id]: !prev[id] }));

  const bumpsTotal = useMemo(() => {
    return BUMPS.filter((b) => selectedBumps[b.id]).reduce(
      (sum, b) => sum + b.price,
      0
    );
  }, [selectedBumps]);

  const total = PRODUCT.price + bumpsTotal;

  // CASHFREE
  const [cashfree, setCashfree] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;

  useEffect(() => {
    const init = async () => {
      try {
        const cf = await load({ mode: "production" });
        setCashfree(cf);
        setSdkReady(true);
      } catch (err) {
        console.error(err);
        alert("Payment load failed");
      }
    };
    init();
  }, []);

  /** ───────────────── PAYMENT SESSION ───────────────── */

  const createPaymentSession = async () => {
    try {
      const additionalProducts = BUMPS.filter((b) => selectedBumps[b.id]).map(
        (b) => b.title
      );

      const payload = {
        amount: total,
        fullName: form.fullName || "Guest User",
        email: form.email || `guest${Date.now()}@gmail.com`,
        phoneNumber: form.whatsapp?.replace(/\D/g, "") || "9999999999",
        additional_products: additionalProducts,
        product_name: "Soulmate Sketch",
        url: `${window.location.origin}/hindi-order-confirmation`,
      };

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
      alert("Session create failed");
      return null;
    }
  };

  /** ───────────────── CHECKOUT ───────────────── */

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const sessionId = await createPaymentSession();

      if (!sessionId) return;

      if (!cashfree || !sdkReady) {
        alert("Payment not ready");
        return;
      }

      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setIsCheckingOut(false);
    }
  };

  /** ───────────────── UI ───────────────── */

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">{PRODUCT.title}</h1>

      <input
        placeholder="Name"
        value={form.fullName}
        onChange={on("fullName")}
      />

      <input
        placeholder="Phone"
        value={form.whatsapp}
        onChange={on("whatsapp")}
      />

      <button onClick={handleCheckout}>
        {isCheckingOut ? "Processing..." : `Pay ₹${total}`}
      </button>

      <GalleryHindi />
      <TestimonialsSection />
    </main>
  );
}
"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartHeader from "@/components/cart/cart-header";
import CartContent from "@/components/cart/cart-content";
import { useState, useEffect } from "react";
import TestimonialsSection from "@/components/sections/testimonials";
import GallerySection from "@/components/sections/gallery";

import { useRouter } from "next/navigation";
import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";
import { load } from "@cashfreepayments/cashfree-js";

// Mock data for demonstration
const mockCartItems = [
  {
    id: "1",
    name: "Soulmate Sketch",
    description: "Get a detailed sketch of your soulmate's face",
    price: 199,
    originalPrice: 1999,
    features: [
      "Detailed facial features",
      "Personality insights",
      "Meeting timeline",
      "Compatibility analysis",
    ],
  },
];

const mockAdditionalProducts = [
  {
    id: "add-1",
    title: "2-Year Personal Horoscope Report",
    description:
      "Get a roadmap of your next 24 months based on your unique birth chart. Know what's coming in love, career, money & health — so you can plan smarter.",
    price: 99,
    originalPrice: 299,
    features: [
      "Month-by-Month Predictions",
      "Love & Marriage Forecast",
      "Career & Wealth Cycles",
      "Lucky Days & Time Windows",
      "Remedies & Do's/Don'ts",
    ],
  },
  {
    id: "add-2",
    title: "Wealth Report",
    description:
      "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
    price: 99,
    originalPrice: 299,
    features: [
      "Personalized astrology + numerology-based wealth blueprint",
      "Career timing, money blocks & success windows",
      "Delivered as a digital report within 48 hours",
      "Based on Vedic astrology",
      "Instant delivery to WhatsApp or Email",
    ],
  },
  {
    id: "add-3",
    title: "Life path & Career guidance ebook",
    description:
      "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
    price: 99,
    originalPrice: 249,
    features: [
      "Discover your ideal career path",
      "Align goals with your life purposes",
      "Strength-based tips to grow faster",
      "Avoid burnout by knowing what doesn't suit you",
    ],
  },
];

export default function CartPage() {
  const router = useRouter();
  const [animateElements, setAnimateElements] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [consultationFormData, setConsultationFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });
  const [finalAmount, setFinalAmount] = useState(0);
  const [cashfree, setCashfree] = useState<any>(null);
const [sdkReady, setSdkReady] = useState(false);
const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;

  // ─── Totals ───────────────────────────────────────────────────────────────
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalWithMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice,
    0
  );
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const additionalTotalWithMRP = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.originalPrice || 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const totalWithMRP = subtotalWithMRP + additionalTotalWithMRP;
  const discount =
    cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price),
      0
    ) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);
  const discountWithMRP =
    cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price),
      0
    ) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const logPath = async () => {
      try {
        const indianTime = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
       await cartSupabase.from("logs").insert({
  path: "cart",
  timestamp: new Date().toISOString(),
});
      } catch (error) {
        console.error("Error logging path:", error);
      }
    };
    logPath();
  }, []);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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
      alert("Payment system failed to load");
    }
  };

  initCashfree();
}, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConsultationFormSubmit = (data: any) => {
    console.log("Consultation form submitted:", data);
  };

  // ─── Abandoned automation webhook ─────────────────────────────────────────
  const sendAbandonedUserToAutomation = async () => {
    try {
      const [firstName, ...restName] = (consultationFormData?.name || "")
        .trim()
        .split(" ");
      const lastName = restName.join(" ");

      await fetch(
        "https://automations.chatsonway.com/webhook/6927f8681b9845c02d57070d",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName || "",
            lastName: lastName || "",
            dob: consultationFormData?.dateOfBirth || "",
            placeOfBirth: consultationFormData?.placeOfBirth || "",
            phoneNumber: consultationFormData?.phoneNumber || "",
            email: consultationFormData?.email || "",
            is: "abandoned",
          }),
        }
      );
      console.log("Abandoned user sent to automation");
    } catch (error) {
      console.error("Failed to send abandoned user to automation:", error);
    }
  };

  // ─── Checkout ─────────────────────────────────────────────────────────────
  const handleCheckout = async () => {
  try {
    setIsCheckingOut(true);

    const paymentSessionId = await createPaymentSession();

    if (!paymentSessionId) return;

    if (!cashfree || !sdkReady) {
      alert("Payment not ready");
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
const createPaymentSession = async () => {
  try {
    // 🔥 Map additional product titles (IMPORTANT)
    const additionalProductsData = selectedProducts.map((id) => {
      const product = mockAdditionalProducts.find((p) => p.id === id);
      return product?.title;
    }).filter(Boolean);

   const payload = {
  amount: finalAmount > 0 ? finalAmount : total,
  fullName: consultationFormData.name?.trim() || "Guest User",
  email: consultationFormData.email?.trim() || `guest${Date.now()}@gmail.com`,
  phoneNumber: consultationFormData.phoneNumber?.replace(/\D/g, "") || "9999999999",
  additional_products: additionalProductsData || [],
  product_name: "English Soulmate",
  url: `${window.location.origin}/order-confirmation-cashfree`, // ✅ keep as is
};

// ✅ Save BEFORE payment
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

    // ✅ Save order_id for verification
    localStorage.setItem("pendingOrderId", data.data.order_id);

    return data.data.payment_session_id;

  } catch (err) {
    console.error(err);
    alert("Failed to create session");
    return null;
  }
};
  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <CartHeader animateElements={animateElements} />
        <CartContent
          cartItems={cartItems}
          additionalProducts={mockAdditionalProducts}
          selectedProducts={selectedProducts}
          consultationFormData={consultationFormData}
          subtotal={subtotal}
          discount={discount}
          discountWithMRP={discountWithMRP}
          totalWithMRP={totalWithMRP}
          total={total}
          additionalTotal={additionalTotal}
          isCheckingOut={isCheckingOut}
          animateElements={animateElements}
          onRemove={removeItem}
          onProductToggle={onProductToggle}
          onConsultationFormSubmit={handleConsultationFormSubmit}
          onCheckout={handleCheckout}
          setConsultationFormData={setConsultationFormData}
          finalAmount={finalAmount}
          setFinalAmount={setFinalAmount}
        />
        <TestimonialsSection isCartPage={true} />
        <GallerySection isCartPage={true} />
      </main>
      <Footer />
    </div>
  );
}







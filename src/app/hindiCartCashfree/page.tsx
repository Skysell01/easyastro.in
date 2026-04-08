"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import CartContent from "@/components/cart/cart-content-hindi";
import { useState, useEffect } from "react";
import TestimonialsHindi from "../../components/sections/TestimonialsHindi";
import GalleryHindi from "../../components/sections/GalleryHindi";

import { useRouter } from "next/navigation";
import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";
import { load } from "@cashfreepayments/cashfree-js";

// Mock data for demonstration
const mockCartItems = [
  {
    id: "1",
    name: "Soulmate Sketch",
    description: "सोलमेट स्केच + मुफ़्त लव रिपोर्ट",
    price: 2,
    originalPrice: 1999,
    features: [
      "आपके लिए बनाया गया पर्सनल हैंड-ड्रॉन स्केच",
    "मुफ़्त डीटेल्ड लव रीडिंग",
    "ईमेल और व्हाट्सएप पर 24–48 घंटे के अंदर प्राइवेट डिलीवरी",
    ],
  },
];

const mockAdditionalProducts = [
  {
    id: "add-1",
    title: "2 साल का पर्सनल राशिफल",
    description:
      "आने वाले 24 महीनों का स्पष्ट नक्शा — प्यार, करियर, पैसा और हेल्थ। सही समय पर सही फ़ैसले लें।",
    price: 99,
    originalPrice: 299,
    features: [
      "हर महीने की भविष्यवाणी",
      "प्यार और शादी का फ़ोरकास्ट",
      "करियर और धन की साइकल",
      "लकी दिन और सही मौके",
      "उपाय, क्या करें और क्या न करें",
    ],
  },
  {
    id: "add-2",
    title: "वेल्थ रिपोर्ट",
    description:
       "पैसों की रुकावटें पहचानें और अपनी फाइनेंशियल डेस्टिनी के साथ अलाइन हों।",
    price: 99,
    originalPrice: 299,
    features: [
      "मनी ब्लॉक्स और उनके समाधान",
      "इन्वेस्टमेंट के सही टाइमलाइन",
      "बचत और रिस्क लेने की सही विंडो",
    ],
  },
  {
    id: "add-3",
    title: "लाइफ़ पाथ और करियर ई-बुक",
    description: "आपके पर्पज़, स्ट्रेंथ और करियर पाथ पर क्लियर, एक्शन-योग्य गाइड।",
    price: 99,
    originalPrice: 249,
    features: [
     "आपका पर्पज़ और स्ट्रेंथ",
      "साप्ताहिक प्रैक्टिस प्लान",
      "फ़ैसले लेने के प्रैक्टिकल फ्रेमवर्क",
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
  product_name: "Soulmate Sketch",
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
        <TestimonialsHindi isCartPage={true} />
        <GalleryHindi isCartPage={true} />
        
      </main>
      <Footer />
    </div>
  );
}







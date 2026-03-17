import { useState, useEffect } from "react";

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

// ── Types ─────────────────────────────────────────────────────────────────────

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, string>;
  };
}

// interface InitiatePaymentOptions {
//   email: string;
//   name: string;
//   phone?: string;
//   quizResponses?: Record<string, unknown>;
//   onSuccess: (paymentId: string, response: RazorpayResponse) => void;
//   onFailure: (errorMessage: string) => void;
//   amount?: number;
//   currency?: string;
//   description?: string;
//   companyName?: string;
//   themeColor?: string;
// }
interface InitiatePaymentOptions {
  email: string;
  name: string;
  phone?: string;
  quizResponses?: Record<string, unknown>;
  customerId?: string | null;   // ← add this
  onSuccess: (paymentId: string, response: RazorpayResponse) => void;
  onFailure: (errorMessage: string) => void;
  amount?: number;
currency?: string;
  description?: string;
  companyName?: string;
  themeColor?: string;
}

// ── Script loader ─────────────────────────────────────────────────────────────

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as Window & { Razorpay?: unknown }).Razorpay) {
      console.log("[Razorpay] Script already loaded.");
      resolve(true);
      return;
    }
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      console.log("[Razorpay] Script loaded successfully.");
      resolve(true);
    };
    script.onerror = () => {
      console.error("[Razorpay] ❌ Failed to load checkout.js — check network/ad-blocker.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useRazorpay() {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setScriptReady(loaded);
      console.log("[Razorpay] Script ready on mount:", loaded);
    });
  }, []);

  const initiatePayment = async ({
    email,
    name,
    phone,
    
    quizResponses = {},
    customerId,
    onSuccess,
    onFailure,
    amount = 449,
    currency = "INR",
    description = "Soulmate Sketch Reading",
    companyName = "Soulmate Sketch",
    themeColor = "#F97316",
  }: InitiatePaymentOptions) => {

    console.log("[Razorpay] initiatePayment called", { email, name });

    // ── 1. Validate key ───────────────────────────────────────────────────
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    console.log("[Razorpay] Key present:", !!keyId, "| starts with:", keyId?.slice(0, 10));

    if (!keyId || keyId.trim() === "") {
      console.error("[Razorpay] ❌ NEXT_PUBLIC_RAZORPAY_KEY_ID is missing. Restart dev server after adding to .env.local");
      onFailure("Payment configuration error. Please contact support.");
      return;
    }

    // ── 2. Load script ────────────────────────────────────────────────────
    setIsLoading(true);
    const loaded = scriptReady || (await loadRazorpayScript());
    console.log("[Razorpay] Script loaded:", loaded);

    if (!loaded) {
      setIsLoading(false);
      onFailure("Payment gateway could not be loaded. Please check your connection.");
      return;
    }

    // ── 3. Create order via backend ───────────────────────────────────────
    let orderId: string;
    try {
      console.log("[Razorpay] Calling /api/create-order...");
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, receipt: email }),
      });

      console.log("[Razorpay] /api/create-order response status:", res.status);

      if (!res.ok) {
        const text = await res.text();
        console.error("[Razorpay] ❌ Order API error:", res.status, text);
        throw new Error(`Order API returned ${res.status}`);
      }

      const data = await res.json();
      console.log("[Razorpay] Order created:", data);
      orderId = data.id;

      if (!orderId) {
        console.error("[Razorpay] ❌ No order ID in response:", data);
        throw new Error("No order ID returned");
      }
    } catch (err) {
      console.error("[Razorpay] ❌ Order creation failed:", err);
      setIsLoading(false);
      onFailure("Could not initiate order. Please try again.");
      return;
    }

    // ── 4. Open Razorpay modal ────────────────────────────────────────────
    console.log("[Razorpay] Opening modal with orderId:", orderId);

    const options = {
      key: keyId,
      amount: amount * 100,
      currency,
      name: companyName,
      description,
      order_id: orderId,
      prefill: { name, email, contact: phone ?? "" },
      notes: {
        quiz_responses: JSON.stringify(quizResponses).slice(0, 512),
      },
      theme: { color: themeColor },
      modal: {
        ondismiss() {
          console.log("[Razorpay] Modal dismissed by user.");
          setIsLoading(false);
        },
        confirm_close: true,
      },

      // ── 5. Payment success handler with verification ──────────────────
      async handler(response: RazorpayResponse) {
        console.log("[Razorpay] ✅ Payment success response:", response);

        try {
          // Verify payment signature server-side
          console.log("[Razorpay] Verifying payment...");
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
  razorpay_order_id:   response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature:  response.razorpay_signature,
  email,        // ← user's email from Checkout.tsx
  name,         // ← user's name from Checkout.tsx
  phone,        // ← user's phone from Checkout.tsx
  amount,       // ← 449
  quizResponses, // ← all 6 quiz answers
  customerId,
}),
          });

          const verifyData = await verifyRes.json();
          console.log("[Razorpay] Verification response:", verifyData);

          if (!verifyRes.ok || !verifyData.success) {
            console.error("[Razorpay] ❌ Payment verification failed:", verifyData);
            setIsLoading(false);
            onFailure("Payment verification failed. Please contact support.");
            return;
          }

          console.log("[Razorpay] ✅ Payment verified successfully!");
          setIsLoading(false);
          onSuccess(response.razorpay_payment_id, response);

        } catch (err) {
          console.error("[Razorpay] ❌ Verification error:", err);
          setIsLoading(false);
          onFailure("Payment verification error. Please contact support.");
        }
      },
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (resp: RazorpayErrorResponse) => {
        console.error("[Razorpay] ❌ Payment failed:", resp.error);
        setIsLoading(false);
        onFailure(resp.error?.description ?? "Payment failed. Please try again.");
      });
      rzp.open();
      console.log("[Razorpay] Modal opened.");
    } catch (err) {
      console.error("[Razorpay] ❌ Error opening modal:", err);
      setIsLoading(false);
      onFailure("Could not open payment window. Please try again.");
    }
  };

  return { initiatePayment, isLoading };
}
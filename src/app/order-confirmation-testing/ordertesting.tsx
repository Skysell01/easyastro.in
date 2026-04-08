"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL!;

export default function OrderConfirmationTesting({ orderId: paramOrderId }: { orderId: string }) {
  const router = useRouter();

  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);

 

  useEffect(() => {
    const storedOrderId = localStorage.getItem("pendingOrderId");
    const resolvedOrderId = paramOrderId || storedOrderId || "";
    setOrderId(resolvedOrderId);

    const orderData = localStorage.getItem("orderData");
    if (orderData) {
      try {
        const parsed = JSON.parse(orderData);
        setAmount(parsed?.amount || 0);
      } catch {}
    }
  }, [paramOrderId]);

  useEffect(() => {
    if (!orderId) return;
    verify();
  }, [orderId]);

  async function verify() {
    try {
      setStatus("verifying");

      const res = await fetch(`${FUNCTIONS_URL}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_MAIN_SUPABASE_ANON_KEY}`,
         },
        
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      console.log("Verify response:", data);

      if (data?.payment_status === "SUCCESS") {
        setStatus("success");
        localStorage.removeItem("pendingOrderId");
        localStorage.removeItem("orderData");
      } else {
        // ❌ Failed or Pending → redirect to cart with failure flag
        localStorage.setItem("paymentFailed", "true");
        router.replace("/cart-testing");
      }
    } catch (err) {
      localStorage.setItem("paymentFailed", "true");
      router.replace("/cart-testing");
    }
  }

  // VERIFYING UI
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-gray-600 text-lg">Verifying your payment...</p>
        <p className="text-gray-400 text-sm">Please don't close this page</p>
      </div>
    );
  }

  // SUCCESS UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful 🎉</h1>
        <p className="text-gray-500 mt-2 mb-6">Your order is confirmed.</p>

        <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="text-gray-800 font-medium text-sm">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="text-gray-800 font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-semibold">Paid ✓</span>
          </div>
        </div>

        <button
          onClick={() => router.push("/hindi")}
          className="mt-6 w-full px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
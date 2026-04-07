"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL!;

export default function OrderConfirmationClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderStatus, setOrderStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [retryCount, setRetryCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);

  // ✅ Read localStorage inside useEffect to avoid SSR issues
  useEffect(() => {
    const paramOrderId = searchParams.get("order_id");
    const storedOrderId = localStorage.getItem("pendingOrderId");
    const resolvedOrderId = paramOrderId || storedOrderId || "";
    setOrderId(resolvedOrderId);

    const orderData = localStorage.getItem("orderData");
    if (orderData) {
      const parsed = JSON.parse(orderData);
      setAmount(parsed?.amount || 0);
    }
  }, []);

  useEffect(() => {
    if (!orderId) return; // wait until orderId is set

    async function verifyPayment() {
      try {
        if (!orderId) {
          setOrderStatus("failed");
          setErrorMessage("Order ID not found.");
          return;
        }

        const res = await fetch(`${FUNCTIONS_URL}/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        console.log("Verify response:", data); // helpful for debugging

        // ✅ Fixed: was data?.status, now data?.payment_status
        if (data?.payment_status === "SUCCESS") {
          setOrderStatus("success");
          localStorage.removeItem("pendingOrderId");
        } else if (data?.payment_status === "PENDING") {
          setOrderStatus("failed");
          setErrorMessage("Payment is still processing. Please retry in a moment.");
        } else {
          setOrderStatus("failed");
          setErrorMessage("Payment not completed. Try again.");
        }
      } catch (err) {
        setOrderStatus("failed");
        setErrorMessage("Verification failed. Try again.");
      }
    }

    verifyPayment();
  }, [orderId, retryCount]);

  // LOADING UI
  if (orderStatus === "verifying") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        <p className="text-gray-600">Verifying your payment...</p>
      </div>
    );
  }

  // FAILED UI
  if (orderStatus === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div className="max-w-md space-y-5">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="text-2xl font-bold">Payment Failed</h2>
          <p className="text-gray-600">{errorMessage}</p>
          <div className="flex flex-col gap-3 mt-5">
            <button
              onClick={() => setRetryCount((x) => x + 1)}
              className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
            >
              Retry Verification
            </button>
            <button
              onClick={() => router.push("/cart-cashfree")}
              className="w-full px-6 py-3 rounded-lg border border-gray-300"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SUCCESS UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-4">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
      <h1 className="text-3xl font-bold mt-4">Payment Successful 🎉</h1>
      <p className="text-gray-600 mt-2">Your order is confirmed.</p>
      <div className="bg-white p-6 mt-8 w-full max-w-md rounded-xl shadow">
        <div className="flex justify-between">
          <span className="text-gray-500">Order ID</span>
          <span className="text-gray-800 font-medium">{orderId}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-gray-500">Amount</span>
          <span className="text-gray-800 font-medium">₹{amount}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-gray-500">Status</span>
          <span className="text-green-600 font-semibold">Paid ✓</span>
        </div>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
      >
        Back to Home
      </button>
    </div>
  );
}
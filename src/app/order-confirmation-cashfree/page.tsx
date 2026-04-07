"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState("verifying");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const orderId = searchParams.get("order_id");

      const orderData = JSON.parse(
        localStorage.getItem("orderData") || "{}"
      );

      if (!orderId) return handleFailure();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL}/verify-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, ...orderData }),
        }
      );

      const data = await res.json();

      if (
        data.payment_status === "SUCCESS" ||
        data.order_status === "PAID"
      ) {
        setStatus("success");

        setOrderDetails({
          orderId,
          amount: orderData.amount,
          productName: orderData.product_name || "Soulmate Sketch",
          additionalProducts: orderData.additional_products || [],
        });

        localStorage.removeItem("pendingOrderId");
      } else {
        handleFailure();
      }
    } catch (err) {
      console.error(err);
      handleFailure();
    }
  };

  const handleFailure = () => {
    alert("❌ Payment Failed or Cancelled");
    router.push("/cart-cashfree");
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Verifying payment...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">
          ✅ Payment Successful
        </h1>

        <p className="text-gray-600">Your order has been placed successfully!</p>

        <div className="text-left mt-4 space-y-2">
          <p><strong>Order ID:</strong> {orderDetails?.orderId}</p>
          <p><strong>Product:</strong> {orderDetails?.productName}</p>
          <p><strong>Amount Paid:</strong> ₹{orderDetails?.amount}</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
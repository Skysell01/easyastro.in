"use client";



import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;

export default function OrderConfirmation() {
  const [status, setStatus] = useState("verifying");
  const [orderDetails, setOrderDetails] = useState(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Wait for searchParams hydration
    if (searchParams) {
      verifyPayment();
    }
  }, [searchParams]);

  const verifyPayment = async () => {
    try {
      const orderId = searchParams.get("order_id");

      // Prevent undefined localStorage on server
      let orderData = {};
      if (typeof window !== "undefined") {
        orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
      }

      if (!orderId) return handleFailure();

      const res = await fetch(`${FUNCTIONS_URL}/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          ...orderData,
        }),
      });

      const data = await res.json();

      console.log("VERIFY RESPONSE:", data);

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

        // cleanup
        if (typeof window !== "undefined") {
          localStorage.removeItem("pendingOrderId");
        }
      } else {
        handleFailure();
      }
    } catch (error) {
      console.error(error);
      handleFailure();
    }
  };

  const handleFailure = () => {
    alert("❌ Payment Failed or Cancelled");
    router.push("/cart-cashfree");
  };

  // ----------------------------------------
  // 🔄 Loading State
  // ----------------------------------------
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg font-semibold">Verifying payment...</h2>
      </div>
    );
  }

  // ----------------------------------------
  // 🎉 Success UI
  // ----------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center space-y-4">

        <h1 className="text-2xl font-bold text-green-600">
          ✅ Payment Successful
        </h1>

        <p className="text-gray-600">
          Your order has been placed successfully!
        </p>

        <div className="text-left mt-4 space-y-2">
          <p><strong>Order ID:</strong> {orderDetails?.orderId}</p>
          <p><strong>Product:</strong> {orderDetails?.productName}</p>
          <p><strong>Amount Paid:</strong> ₹{orderDetails?.amount}</p>

          <div>
            <strong>Additional Products:</strong>
            {orderDetails?.additionalProducts?.length > 0 ? (
              <ul className="list-disc ml-5">
                {orderDetails.additionalProducts.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>
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
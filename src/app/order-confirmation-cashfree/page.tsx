"use client";
import { useEffect, useState } from "react";


const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;

export default function OrderConfirmation() {
  const [status, setStatus] = useState("verifying");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const orderId = localStorage.getItem("pendingOrderId");
      const orderData = JSON.parse(
        localStorage.getItem("orderData") || "{}"
      );

      if (!orderId) {
        handleFailure();
        return;
      }

      const res = await fetch(`${FUNCTIONS_URL}/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          ...orderData, // 🔥 send full data for DB insert
        }),
      });

      const data = await res.json();

      if (data.payment_status === "SUCCESS") {
        setStatus("success");

        setOrderDetails({
          orderId,
          amount: orderData.amount,
          productName: "Soulmate Sketch", // you can dynamic this
          additionalProducts: orderData.additional_products || [],
        });

        // ✅ Clean storage
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
    alert("❌ Payment Failed. Please try again.");
    window.location.href = "/cart-cashfree"; // 🔥 redirect back
  };

  // 🔄 Loading state
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Verifying payment...</h2>
      </div>
    );
  }

  // 🟢 SUCCESS UI
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
                {orderDetails.additionalProducts.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
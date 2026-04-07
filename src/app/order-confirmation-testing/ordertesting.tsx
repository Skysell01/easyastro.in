"use client";

import { useEffect, useState } from "react";
import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";

export default function OrderConfirmation() {
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderId = localStorage.getItem("pendingOrderId");

        if (!orderId) {
          setStatus("Order not found");
          return;
        }

        // 🔥 Call your backend to verify payment
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL}/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order_id: orderId }),
          }
        );

        const data = await res.json();

        console.log("Payment verify response:", data);

        let paymentStatus = "failed";

        if (data.payment_status === "SUCCESS") {
          paymentStatus = "paid"; // ✅ YOUR REQUIRED VALUE
          setStatus("Payment Successful 🎉");
        } else {
          paymentStatus = "failed";
          setStatus("Payment Failed ❌");
        }

        // 🔥 UPDATE SUPABASE
        const { error } = await cartSupabase
          .from("soulmate_orders")
          .update({ payment_status: paymentStatus })
          .eq("cashfree_order_id", orderId);

        if (error) {
          console.error("Update error:", error);
        }

   
        localStorage.removeItem("pendingOrderId");

      } catch (err) {
        console.error("Verification error:", err);
        setStatus("Something went wrong");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{status}</h1>
    </div>
  );
}
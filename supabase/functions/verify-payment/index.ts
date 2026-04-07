// supabase/functions/verify-payment/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const { orderId, ...orderData } = body;

    if (!orderId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing orderId" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");

    // 🔥 Fetch order from Cashfree
    const response = await fetch(
      `https://api.cashfree.com/pg/orders/${orderId}`,
      {
        method: "GET",
        headers: {
          "x-client-id": CASHFREE_APP_ID!,
          "x-client-secret": CASHFREE_SECRET_KEY!,
          "x-api-version": "2022-09-01",
        },
      }
    );

    const data = await response.json();

    const orderStatus = data.order_status;

    // ✅ Handle all cases properly
    let paymentStatus = "FAILED";

    if (orderStatus === "PAID") {
      paymentStatus = "SUCCESS";
    } else if (orderStatus === "ACTIVE") {
      paymentStatus = "PENDING";
    } else if (orderStatus === "EXPIRED") {
      paymentStatus = "FAILED";
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment_status: paymentStatus,
        order_status: orderStatus,
        data,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (err: any) {
    console.error("Verify payment error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});
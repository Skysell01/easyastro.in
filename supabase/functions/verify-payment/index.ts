// supabase/functions/verify-payment/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

serve(async (req) => {
  // ✅ Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");

    // 🔥 Fetch order details from Cashfree
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

    const isPaid = data.order_status === "PAID";

    return new Response(
      JSON.stringify({
        success: true,
        payment_status: isPaid ? "SUCCESS" : "FAILED",
        order_status: data.order_status,
        data,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    console.error("Verify payment error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
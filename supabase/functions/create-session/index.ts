// supabase/functions/create-session/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  // ✅ Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      amount,
      fullName,
      email,
      phoneNumber,
      url,
    } = body;

    const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");

    // 🔥 Create Cashfree Order
    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID!,
        "x-client-secret": CASHFREE_SECRET_KEY!,
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify({
         order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
           customer_id: `cust_${phoneNumber}_${Date.now()}`,
          customer_name: fullName,
          customer_email: email,
          customer_phone: phoneNumber,
        },
       order_meta: {
 return_url: `${url}?order_id=${orderId}`,
},
      }),
    });

    const data = await response.json();

    if (!data.payment_session_id) {
      return new Response(
        JSON.stringify({ success: false, error: data }),
        { status: 400, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          payment_session_id: data.payment_session_id,
         order_id: orderId,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Create session error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
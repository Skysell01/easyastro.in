// // supabase/functions/create-session/index.ts

// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   try {
//     const body = await req.json();

//     const {
//       amount,
//       fullName,
//       email,
//       phoneNumber,
//       url,
//       
//     } = body;

//     const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
//     const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");

//     if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Cashfree credentials missing",
//         }),
//         { status: 500, headers: corsHeaders }
//       );
//     }

//     // ✅ GENERATE YOUR ORDER ID HERE (the missing part)
//     const orderId = `order_${Date.now()}`;

//     // 🔥 Create Cashfree Order
//     const response = await fetch("https://api.cashfree.com/pg/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-client-id": CASHFREE_APP_ID,
//         "x-client-secret": CASHFREE_SECRET_KEY,
//         "x-api-version": "2022-09-01",
//       },
//       body: JSON.stringify({
//         order_id: orderId,
//         order_amount: amount,
//         order_currency: "INR",
//         customer_details: {
//           customer_id: `cust_${phoneNumber}_${Date.now()}`,
//           customer_name: fullName,
//           customer_email: email,
//           customer_phone: phoneNumber,
//         },
//         order_meta: {
//           return_url: `${url}?order_id=${orderId}`,
//         },
//       }),
//     });

//     const data = await response.json();

//     if (!data.payment_session_id) {
//       return new Response(
//         JSON.stringify({ success: false, error: data }),
//         { status: 400, headers: corsHeaders }
//       );
//     }


    

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: {
//           payment_session_id: data.payment_session_id,
//           order_id: orderId, // ✅ NOW VALID
//           language: language || "english", 
//         },
//       }),
//       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
//     );

//   } catch (err: any) {
//     console.error("Create session error:", err);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: err.message,
//       }),
//       { status: 500, headers: corsHeaders }
//     );
//   }
// });



// supabase/functions/create-session/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    const {
      amount,
      fullName,
      email,
      phoneNumber,
      url,
      projectName, 
      product_name,
      dateOfBirth,
      placeOfBirth,
      gender,
      additional_products, // ✅ FIX 1: was used in insert but never destructured
                
    } = body;

    const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
    const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Cashfree credentials missing" }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Supabase credentials missing" }),
        { status: 500, headers: corsHeaders }
      );
    }

    // ✅ FIX 3: supabase client was never created
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const orderId = `order_${Date.now()}`;

    // Create Cashfree Order
    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
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

    // Insert pending order into soulmate_orders
    const { error: insertError } = await supabase.from("soulmate_orders").insert({
      cashfree_order_id: orderId,
      payment_session_id: data.payment_session_id,
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      amount: amount,
      additional_products: additional_products || [],
      project_name: projectName , // ✅ FIX 4: was `product_name`, now matches destructured `projectName`
      date_of_birth: dateOfBirth || null,
      place_of_birth: placeOfBirth || null,
      gender: gender || null,
      payment_status: "pending",
      status: "created",
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return new Response(
        JSON.stringify({ success: false, error: insertError.message }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          payment_session_id: data.payment_session_id,
          order_id: orderId,
          language: language || "english",
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Create session error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
// // supabase/functions/verify-payment/index.ts

// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, content-type",
//   "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
// };

// // 🔁 POLLING FUNCTION — waits up to 8 seconds for Cashfree to return "PAID"
// async function pollCashfreeStatus(orderId: string, appId: string, secret: string) {
//   for (let attempt = 0; attempt < 6; attempt++) {
//     const res = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
//       method: "GET",
//       headers: {
//         "x-client-id": appId,
//         "x-client-secret": secret,
//         "x-api-version": "2022-09-01",
//       },
//     });

//     const data = await res.json();
//     console.log("Cashfree Poll Attempt:", attempt + 1, data);

//     // ❇️ SUCCESS — Cashfree confirmed payment
//     if (data.order_status === "PAID") {
//       return { status: "SUCCESS", raw: data };
//     }

//     // ❌ Failed instantly → stop
//     if (data.order_status === "EXPIRED" || data.order_status === "FAILED") {
//       return { status: "FAILED", raw: data };
//     }

//     // Still PROCESSING → wait and retry
//     await new Promise((r) => setTimeout(r, 1500));
//   }

//   // If after all attempts still not paid → treat as pending
//   return { status: "PENDING", raw: null };
// }

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   try {
//     const body = await req.json();
//     const { orderId, ...orderData } = body;

//     if (!orderId) {
//       return new Response(
//         JSON.stringify({ success: false, error: "Missing orderId" }),
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     const CASHFREE_APP_ID = Deno.env.get("CASHFREE_APP_ID");
//     const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");

//     if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Cashfree credentials missing in environment",
//         }),
//         { status: 500, headers: corsHeaders }
//       );
//     }

//     // 🔁 Poll Cashfree until we get a final payment result
//     const result = await pollCashfreeStatus(
//       orderId,
//       CASHFREE_APP_ID,
//       CASHFREE_SECRET_KEY
//     );

//     return new Response(
//       JSON.stringify({
//         success: true,
//         payment_status: result.status,
//         order_status: result.raw?.order_status || "UNKNOWN",
//         data: result.raw,
//       }),
//       {
//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (err: any) {
//     console.error("Verify payment error:", err);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: err.message || "Unknown error",
//       }),
//       {
//         status: 500,
//         headers: corsHeaders,
//       }
//     );
//   }
// });



// supabase/functions/verify-payment/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// 🔁 POLLING FUNCTION — waits up to 8 seconds for Cashfree to return "PAID"
async function pollCashfreeStatus(orderId: string, appId: string, secret: string) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secret,
        "x-api-version": "2022-09-01",
      },
    });

    const data = await res.json();
    console.log("Cashfree Poll Attempt:", attempt + 1, data);

    // ❇️ SUCCESS — Cashfree confirmed payment
    if (data.order_status === "PAID") {
      return { status: "SUCCESS", raw: data };
    }

    // ❌ Failed instantly → stop
    if (data.order_status === "EXPIRED" || data.order_status === "FAILED") {
      return { status: "FAILED", raw: data };
    }

    // Still PROCESSING → wait and retry
    await new Promise((r) => setTimeout(r, 1500));
  }

  // If after all attempts still not paid → treat as pending
  return { status: "PENDING", raw: null };
}

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
        const SUPABASE_URL = Deno.env.get("SUPABASE_URL");                          // ✅ ADD
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"); // ✅ ADD

     if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Cashfree credentials missing in environment",
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);  

   

    // 🔁 Poll Cashfree until we get a final payment result
    const result = await pollCashfreeStatus(
      orderId,
      CASHFREE_APP_ID,
      CASHFREE_SECRET_KEY
    );


      // ✅ UPDATE soulmate_orders based on payment result
    const paymentStatus =
      result.status === "SUCCESS" ? "paid" :
      result.status === "FAILED"  ? "failed" :
      "pending";
       await supabase
      .from("soulmate_orders")
      .update({
        payment_status: paymentStatus,
        status: result.status === "SUCCESS" ? "confirmed" : "created",
      })
      .eq("cashfree_order_id", orderId); 

    return new Response(
      JSON.stringify({
        success: true,
        payment_status: result.status,
        order_status: result.raw?.order_status || "UNKNOWN",
        data: result.raw,
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
        error: err.message || "Unknown error",
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});


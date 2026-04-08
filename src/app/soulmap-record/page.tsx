// "use client";

// import React, { useState, useEffect } from "react";
// import Header from "@/components/layout/header";
// import Footer from "@/components/layout/footer";
// import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";
// import clsx from "clsx";

// interface Order {
//   full_name: string;
//   email: string;
//   phone_number: string;
//   project_name: string;
//   date_of_birth: string;
//   place_of_birth: string;
//   gender: string;
//   additional_products: string[];
//   created_at: string;
// }

// type ProjectFilter = "all" | "English Soulmap" | "Hindi Soulmap";

// const CORRECT_PASSWORD = "arjun@arjun";

// export default function RecordPage() {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState(false);

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
//   const [search, setSearch] = useState("");

//   // ─── Login ────────────────────────────────────────────────────────────────
//   const handleLogin = () => {
//     if (password === CORRECT_PASSWORD) {
//       setAuthenticated(true);
//       setLoginError(false);
//     } else {
//       setLoginError(true);
//     }
//   };

//   // ─── Fetch ────────────────────────────────────────────────────────────────
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { data, error: supabaseError } = await cartSupabase
//         .from("soulmate_orders")
//         .select(
//           "full_name, email, phone_number, project_name, date_of_birth, place_of_birth, gender, additional_products, created_at"
//         )
//         .order("created_at", { ascending: false });

//       if (supabaseError) {
//         setError("Failed to fetch orders: " + supabaseError.message);
//         return;
//       }

//       setOrders(data || []);
//     } catch (err: any) {
//       setError("Error fetching orders: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (authenticated) fetchOrders();
//   }, [authenticated]);

//   // ─── Filters ──────────────────────────────────────────────────────────────
//   useEffect(() => {
//     let filtered = [...orders];
// if (projectFilter !== "all") {
//   filtered = filtered.filter(
//     (o) =>
//       (o.project_name || "").trim().toLowerCase() ===
//       projectFilter.toLowerCase()
//   );
// }


//     if (search.trim()) {
//       const q = search.toLowerCase();
//       filtered = filtered.filter(
//         (o) =>
//           (o.full_name || "").toLowerCase().includes(q) ||
//           (o.email || "").toLowerCase().includes(q) ||
//           (o.phone_number || "").toLowerCase().includes(q)
//       );
//     }

//     setFilteredOrders(filtered);
//   }, [orders, projectFilter, search]);

//   // ─── Helpers ──────────────────────────────────────────────────────────────
//   const formatDate = (d: string) =>
//     d ? new Date(d).toLocaleDateString("en-IN") : "—";

//   const englishCount = orders.filter(
//     (o) => o.project_name === "English Soulmap"
//   ).length;
//   const hindiCount = orders.filter(
//     (o) => o.project_name === "Hindi Soulmap"
//   ).length;

//   // ─── Login Screen ─────────────────────────────────────────────────────────
//   if (!authenticated) {
//     return (
//       <div className="flex flex-col min-h-dvh bg-background text-foreground">
//         <Header />
//         <main className="flex-1 flex items-center justify-center px-4">
//           <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-sm">
//             <h1 className="text-xl font-semibold mb-1">Admin access</h1>
//             <p className="text-sm text-muted-foreground mb-6">
//               Enter your password to continue
//             </p>

//             <div className="mb-4">
//               <label className="text-sm text-muted-foreground block mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setLoginError(false);
//                 }}
//                 onKeyDown={(e) => e.key === "Enter" && handleLogin()}
//                 placeholder="••••••••"
//                 className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
//               />
//               {loginError && (
//                 <p className="text-xs text-destructive mt-1">
//                   Incorrect password
//                 </p>
//               )}
//             </div>

//             <button
//               onClick={handleLogin}
//               className="w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition"
//             >
//               Sign in
//             </button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   // ─── Dashboard ────────────────────────────────────────────────────────────
//   return (
//     <div className="flex flex-col min-h-dvh bg-background text-foreground">
//       <Header />
//       <main className="flex-1">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

//           {/* Title */}
//           <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl font-semibold">
//                 <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
//                   Order Records
//                 </span>
//               </h1>
//               <p className="text-sm text-muted-foreground mt-1">
//                 {orders.length} total orders · {filteredOrders.length} shown
//               </p>
//             </div>
//             <button
//               onClick={fetchOrders}
//               className="px-4 py-1.5 rounded-full border border-border text-sm bg-muted hover:bg-muted/70 transition"
//             >
//               ↻ Refresh
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <div className="bg-muted rounded-xl p-4 text-center">
//               <p className="text-xs text-muted-foreground mb-1">Total Orders</p>
//               <p className="text-2xl font-semibold">{orders.length}</p>
//             </div>
//             <div className="bg-muted rounded-xl p-4 text-center">
//               <p className="text-xs text-muted-foreground mb-1">Showing</p>
//               <p className="text-2xl font-semibold">{filteredOrders.length}</p>
//             </div>
//             <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 text-center">
//               <p className="text-xs text-pink-500 mb-1">English Soulmap</p>
//               <p className="text-2xl font-semibold text-pink-600">
//                 {englishCount}
//               </p>
//             </div>
//             <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
//               <p className="text-xs text-amber-500 mb-1">Hindi Soulmap</p>
//               <p className="text-2xl font-semibold text-amber-600">
//                 {hindiCount}
//               </p>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-3 items-center mb-4">
//             <span className="text-xs text-muted-foreground">Project:</span>
//             {(["all", "English Soulmap", "Hindi Soulmap"] as ProjectFilter[]).map(
//               (p) => (
//                 <button
//                   key={p}
//                   onClick={() => setProjectFilter(p)}
//                   className={clsx(
//                     "px-3 py-1 rounded-full border text-sm transition",
//                     projectFilter === p
//                       ? p === "English Soulmap"
//                         ? "bg-pink-500 text-white border-pink-500"
//                         : p === "Hindi Soulmap"
//                         ? "bg-amber-500 text-white border-amber-500"
//                         : "bg-primary text-primary-foreground border-primary"
//                       : "bg-muted text-foreground border-border"
//                   )}
//                 >
//                   {p === "all" ? "All Projects" : p}
//                 </button>
//               )
//             )}
//           </div>

//           {/* Search */}
//           <div className="mb-6">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, email or phone..."
//               className="w-full max-w-sm border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
//             />
//           </div>

//           {/* Table */}
//           {loading ? (
//             <div className="flex justify-center py-16">
//               <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-destructive">
//               <p>{error}</p>
//               <button
//                 onClick={fetchOrders}
//                 className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <div className="rounded-2xl border border-border overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="bg-muted/50 border-b border-border">
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Project
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Full Name
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Email
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Phone
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Gender
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Date of Birth
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Place of Birth
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Add-ons
//                       </th>
//                       <th className="px-4 py-3 text-left font-medium text-muted-foreground">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredOrders.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan={9}
//                           className="px-4 py-12 text-center text-muted-foreground"
//                         >
//                           No orders found
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredOrders.map((order, i) => (
//                         <tr
//                           key={i}
//                           className="border-b border-border hover:bg-muted/30 transition-colors"
//                         >
//                           <td className="px-4 py-3">
//                             <span
//                               className={clsx(
//                                 "px-2 py-1 rounded-full text-xs font-semibold",
//                                 order.project_name === "English Soulmap"
//                                   ? "bg-pink-100 text-pink-700"
//                                   : order.project_name === "Hindi Soulmap"
//                                   ? "bg-amber-100 text-amber-700"
//                                   : "bg-muted text-muted-foreground"
//                               )}
//                             >
//                               {order.project_name || "—"}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3 font-medium">
//                             {order.full_name || "—"}
//                           </td>
//                           <td className="px-4 py-3">{order.email || "—"}</td>
//                           <td className="px-4 py-3">
//                             {order.phone_number || "—"}
//                           </td>
//                           <td className="px-4 py-3 capitalize">
//                             {order.gender || "—"}
//                           </td>
//                           <td className="px-4 py-3">
//                             {order.date_of_birth || "—"}
//                           </td>
//                           <td className="px-4 py-3">
//                             {order.place_of_birth || "—"}
//                           </td>
//                           <td className="px-4 py-3">
//                             {(order.additional_products || []).length > 0 ? (
//                               <div className="flex flex-wrap gap-1">
//                                 {order.additional_products.map((a, j) => (
//                                   <span
//                                     key={j}
//                                     className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
//                                   >
//                                     {a}
//                                   </span>
//                                 ))}
//                               </div>
//                             ) : (
//                               <span className="text-muted-foreground text-xs">
//                                 None
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-4 py-3 text-muted-foreground text-xs">
//                             {formatDate(order.created_at)}
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";
import clsx from "clsx";

interface Order {
  full_name: string;
  email: string;
  phone_number: string;
  project_name: string;
  payment_status: string;
  created_at: string;
}

type ProjectFilter = "all" | "English Soulmap" | "Hindi Soulmap";
type PaymentFilter = "all" | "SUCCESS" | "PENDING" | "FAILED";
type DateFilter = "all" | "today" | "yesterday" | "last7days";

const CORRECT_PASSWORD = "arjun@arjun";

export default function RecordPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  // ─── LOGIN ─────────────────────────────
  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // ─── FETCH ─────────────────────────────
  const fetchOrders = async () => {
    setLoading(true);

    const { data } = await cartSupabase
      .from("soulmate_orders")
      .select(
        "full_name, email, phone_number, project_name, payment_status, created_at"
      )
      .order("created_at", { ascending: false });

    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  // ─── DATE FILTER LOGIC ─────────────────
  const isWithinDate = (dateStr: string) => {
    if (dateFilter === "all") return true;

    const date = new Date(dateStr);
    const now = new Date();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 7);

    if (dateFilter === "today") return date >= todayStart;
    if (dateFilter === "yesterday")
      return date >= yesterdayStart && date < todayStart;
    if (dateFilter === "last7days") return date >= last7Days;

    return true;
  };

  // ─── FILTERS ───────────────────────────
  useEffect(() => {
    let filtered = [...orders];

    // Project filter
    if (projectFilter !== "all") {
      filtered = filtered.filter(
        (o) =>
          (o.project_name || "").toLowerCase().trim() ===
          projectFilter.toLowerCase()
      );
    }

    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (o) =>
          (o.payment_status || "").toUpperCase() === paymentFilter
      );
    }

    // Date filter
    filtered = filtered.filter((o) => isWithinDate(o.created_at));

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.full_name?.toLowerCase().includes(q) ||
          o.email?.toLowerCase().includes(q) ||
          o.phone_number?.toLowerCase().includes(q)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, projectFilter, paymentFilter, dateFilter, search]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN");

  // ─── LOGIN SCREEN ──────────────────────
  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleLogin}>Login</button>
        {loginError && <p>Wrong password</p>}
      </div>
    );
  }

  // ─── UI ────────────────────────────────
  return (
    <div>
      <Header />

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-4">Order Records</h1>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-4">

          {/* Project */}
          {["all", "English Soulmap", "Hindi Soulmap"].map((p) => (
            <button key={p} onClick={() => setProjectFilter(p as any)}>
              {p}
            </button>
          ))}

          {/* Payment */}
          {["all", "SUCCESS", "PENDING", "FAILED"].map((p) => (
            <button key={p} onClick={() => setPaymentFilter(p as any)}>
              {p}
            </button>
          ))}

          {/* Date */}
          {["all", "today", "yesterday", "last7days"].map((d) => (
            <button key={d} onClick={() => setDateFilter(d as any)}>
              {d}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search..."
          className="border px-2 py-1 mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Project</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((o, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{o.project_name}</td>
                  <td className="p-3">{o.full_name}</td>
                  <td className="p-3">{o.email}</td>
                  <td className="p-3">{o.phone_number}</td>

                  <td className="p-3">
                    <span
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        o.payment_status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : o.payment_status === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {o.payment_status === "SUCCESS"
                        ? "PAID"
                        : o.payment_status}
                    </span>
                  </td>

                  <td className="p-3">{formatDate(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
}
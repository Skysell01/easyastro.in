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
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  additional_products: string[];
  created_at: string;
  payment_status: string; // ✅ added
}

type ProjectFilter = "all" | "English Soulmap" | "Hindi Soulmap";
type PaymentFilter = "all" | "paid" | "pending";

const CORRECT_PASSWORD = "arjun@arjun";

export default function RecordPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await cartSupabase
        .from("soulmate_orders")
        .select(
          "full_name, email, phone_number, project_name, date_of_birth, place_of_birth, gender, additional_products, created_at, payment_status" // ✅ added
        )
        .order("created_at", { ascending: false });

      if (supabaseError) {
        setError("Failed to fetch orders: " + supabaseError.message);
        return;
      }

      setOrders(data || []);
    } catch (err: any) {
      setError("Error fetching orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  useEffect(() => {
  let filtered = [...orders];

  // ✅ Project filter
  if (projectFilter !== "all") {
    filtered = filtered.filter((o) => o.project_name === projectFilter);
  }

  // ✅ Payment filter
  if (paymentFilter !== "all") {
    filtered = filtered.filter(
      (o) => (o.payment_status || "").toLowerCase() === paymentFilter
    );
  }

  // ✅ Search filter
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        (o.full_name || "").toLowerCase().includes(q) ||
        (o.email || "").toLowerCase().includes(q) ||
        (o.phone_number || "").toLowerCase().includes(q)
    );
  }

  setFilteredOrders(filtered);
}, [orders, projectFilter, paymentFilter, search]);

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("en-IN") : "—";

  const englishCount = orders.filter(
    (o) => o.project_name === "English Soulmap"
  ).length;
  const hindiCount = orders.filter(
    (o) => o.project_name === "Hindi Soulmap"
  ).length;

  if (!authenticated) {
    return (
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h1 className="text-xl font-semibold mb-1">Admin access</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your password to continue
            </p>

            <div className="mb-4">
              <label className="text-sm text-muted-foreground block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {loginError && (
                <p className="text-xs text-destructive mt-1">
                  Incorrect password
                </p>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              Sign in
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
  <div className="flex flex-col min-h-dvh bg-background text-foreground">
    <Header />
    <main className="flex-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Order Records
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {orders.length} total orders · {filteredOrders.length} shown
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="px-4 py-1.5 rounded-full border border-border text-sm bg-muted hover:bg-muted/70 transition"
          >
            ↻ Refresh
          </button>
        </div>
          <div className="flex flex-wrap gap-3 items-center mb-4">
  <span className="text-xs text-muted-foreground">Project:</span>
  {(["all", "English Soulmap", "Hindi Soulmap"] as ProjectFilter[]).map(
    (p) => (
      <button
        key={p}
        onClick={() => setProjectFilter(p)}
        className={clsx(
          "px-3 py-1 rounded-full border text-sm transition",
          projectFilter === p
            ? p === "English Soulmap"
              ? "bg-pink-500 text-white border-pink-500"
              : p === "Hindi Soulmap"
              ? "bg-amber-500 text-white border-amber-500"
              : "bg-primary text-primary-foreground border-primary"
            : "bg-muted text-foreground border-border"
        )}
      >
        {p === "all" ? "All Projects" : p}
      </button>
    )
  )}
</div>
        {/* ✅ Payment Filter UI */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <span className="text-xs text-muted-foreground">Payment:</span>
          {(["all", "paid", "pending"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPaymentFilter(p)}
              className={clsx(
                "px-3 py-1 rounded-full border text-sm transition capitalize",
                paymentFilter === p
                  ? p === "paid"
                    ? "bg-green-500 text-white border-green-500"
                    : p === "pending"
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-foreground border-border"
              )}
            >
              {p === "all" ? "All" : p}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Project</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Full Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Payment Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Gender</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date of Birth</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Place of Birth</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Add-ons</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">{order.project_name}</td>
                    <td className="px-4 py-3">{order.full_name}</td>
                    <td className="px-4 py-3">{order.email}</td>
                    <td className="px-4 py-3">{order.phone_number}</td>

                    {/* ✅ Colored Payment Badge */}
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "px-2 py-1 rounded-full text-xs font-semibold capitalize",
                          order.payment_status?.toLowerCase() === "paid"
                            ? "bg-green-100 text-green-700"
                            : order.payment_status?.toLowerCase() === "pending"
                            ? "bg-red-100 text-red-700"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {order.payment_status || "—"}
                      </span>
                    </td>

                    <td className="px-4 py-3">{order.gender}</td>
                    <td className="px-4 py-3">{order.date_of_birth}</td>
                    <td className="px-4 py-3">{order.place_of_birth}</td>
                    <td className="px-4 py-3">
                      {(order.additional_products || []).join(", ") || "None"}
                    </td>
                    <td className="px-4 py-3">{formatDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
    <Footer />
  </div>
);
}
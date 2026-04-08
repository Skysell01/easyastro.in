"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";
import clsx from "clsx";
import Papa from "papaparse";

interface Order {
  id: string;
  created_at: string;
  project_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
  place_of_birth: string;
  additional_products: string[];
  amount: number;
  cashfree_order_id: string | null;
  payment_session_id: string | null;
  payment_status: string;
  status: string;
}

type FilterType = "all" | "today" | "yesterday" | "last7days" | "custom";
type StatusFilter = "all" | "paid" | "pending" | "failed";
type ProjectFilter = "all" | "Hindi Soulmate" | "English Soulmate"; // ✅ NEW

const PAGE_LIMIT = 50;

export default function RecordPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all"); // ✅ NEW
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  // ─── Fetch all orders from Supabase ───────────────────────────────────────
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError, count } = await cartSupabase
        .from("soulmate_orders")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (supabaseError) {
        setError("Failed to fetch orders: " + supabaseError.message);
        return;
      }

      setOrders(data || []);
      setTotalCount(count || 0);
    } catch (err: any) {
      setError("Error fetching orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [orders, filter, customStart, customEnd, statusFilter, projectFilter]); // ✅ added projectFilter

  // ─── Filters ──────────────────────────────────────────────────────────────
  const isWithin = (date: Date, from: Date, to: Date) =>
    date >= from && date <= to;

  const applyFilters = () => {
    const now = new Date();
    let filtered = [...orders];

    // Date filter
    switch (filter) {
      case "today":
        filtered = filtered.filter(
          (o) => new Date(o.created_at).toDateString() === now.toDateString()
        );
        break;
      case "yesterday":
        const y = new Date();
        y.setDate(y.getDate() - 1);
        filtered = filtered.filter(
          (o) => new Date(o.created_at).toDateString() === y.toDateString()
        );
        break;
      case "last7days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 6);
        filtered = filtered.filter((o) =>
          isWithin(new Date(o.created_at), sevenDaysAgo, now)
        );
        break;
      case "custom":
        if (customStart && customEnd) {
          const endOfDay = new Date(customEnd);
          endOfDay.setHours(23, 59, 59, 999);
          filtered = filtered.filter((o) =>
            isWithin(new Date(o.created_at), customStart, endOfDay)
          );
        }
        break;
      default:
        break;
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.payment_status === statusFilter);
    }

    // ✅ Project filter
    if (projectFilter !== "all") {
      filtered = filtered.filter((o) => o.project_name === projectFilter);
    }

    filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString("en-IN") : "—";
  const formatDateTime = (d: string) =>
    d
      ? new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : "—";
  const isNewOrder = (created_at: string) =>
    (Date.now() - new Date(created_at).getTime()) / (1000 * 60) < 60;

  const totalAmount = filteredOrders
    .filter((o) => o.payment_status === "paid")
    .reduce((sum, o) => sum + o.amount, 0);

  const paidCount = filteredOrders.filter(
    (o) => o.payment_status === "paid"
  ).length;
  const pendingCount = filteredOrders.filter(
    (o) => o.payment_status === "pending"
  ).length;
  const failedCount = filteredOrders.filter(
    (o) => o.payment_status === "failed"
  ).length;

  // ─── Pagination ───────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filteredOrders.length / PAGE_LIMIT);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );

  // ─── Export CSV ───────────────────────────────────────────────────────────
  const exportToCSV = () => {
    const csvData = filteredOrders.map((o) => ({
      Project: o.project_name,
      Status: o.payment_status,
      Name: o.full_name,
      Email: o.email,
      Phone: o.phone_number,
      Gender: o.gender,
      DOB: formatDate(o.date_of_birth),
      PlaceOfBirth: o.place_of_birth,
      AdditionalProducts: (o.additional_products || []).join(", "),
      Amount: o.amount,
      CashfreeOrderID: o.cashfree_order_id || "—",
      PaymentSessionID: o.payment_session_id || "—",
      OrderDate: formatDateTime(o.created_at),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "soulmate_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Order Records
              </span>
            </h1>
            <p className="text-muted-foreground">
              Total Orders:{" "}
              <span className="font-semibold">{totalCount}</span> · Showing:{" "}
              <span className="font-semibold">{filteredOrders.length}</span>
              {totalPages > 1 && (
                <span className="ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-primary">₹{totalAmount}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-green-600 mb-1">Paid Orders</p>
                <p className="text-2xl font-bold text-green-700">{paidCount}</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-yellow-600 mb-1">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {pendingCount}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <p className="text-xs text-red-600 mb-1">Failed Orders</p>
                <p className="text-2xl font-bold text-red-700">{failedCount}</p>
              </CardContent>
            </Card>
          </div>

          {/* Date Filters */}
          <div className="mb-4 flex flex-wrap gap-3 justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  "all",
                  "today",
                  "yesterday",
                  "last7days",
                  "custom",
                ] as FilterType[]
              ).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    "px-3 py-1 rounded-full border text-sm",
                    filter === f
                      ? "bg-primary text-white border-primary"
                      : "bg-muted text-foreground border-border"
                  )}
                >
                  {f === "all" && "All"}
                  {f === "today" && "Today"}
                  {f === "yesterday" && "Yesterday"}
                  {f === "last7days" && "Last 7 Days"}
                  {f === "custom" && "Custom Range"}
                </button>
              ))}
            </div>
            <button
              onClick={exportToCSV}
              className="bg-primary text-white text-sm px-4 py-1.5 rounded-full shadow hover:bg-primary/90 transition"
            >
              Export CSV
            </button>
          </div>

          {/* Custom date range */}
          {filter === "custom" && (
            <div className="mb-4 flex gap-4 items-center">
              <input
                type="date"
                value={
                  customStart ? customStart.toISOString().split("T")[0] : ""
                }
                onChange={(e) => setCustomStart(new Date(e.target.value))}
                className="border px-2 py-1 rounded-md text-sm bg-background"
              />
              <span className="text-muted-foreground text-sm">to</span>
              <input
                type="date"
                value={customEnd ? customEnd.toISOString().split("T")[0] : ""}
                onChange={(e) => setCustomEnd(new Date(e.target.value))}
                className="border px-2 py-1 rounded-md text-sm bg-background"
              />
            </div>
          )}

          {/* Status Filter */}
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            <div className="flex gap-2 flex-wrap">
              {(["all", "paid", "pending", "failed"] as StatusFilter[]).map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={clsx(
                      "px-3 py-1 rounded-full border text-sm capitalize",
                      statusFilter === s
                        ? s === "paid"
                          ? "bg-green-600 text-white border-green-600"
                          : s === "pending"
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : s === "failed"
                          ? "bg-red-500 text-white border-red-500"
                          : "bg-primary text-white border-primary"
                        : "bg-muted text-foreground border-border"
                    )}
                  >
                    {s === "all" ? "All Status" : s}
                  </button>
                )
              )}
            </div>
            <button
              onClick={fetchOrders}
              className="ml-auto px-3 py-1 rounded-full border border-border text-sm bg-muted hover:bg-muted/70 transition"
            >
              🔄 Refresh
            </button>
          </div>

          {/* ✅ Project Filter */}
          <div className="mb-6 flex flex-wrap gap-3 items-center">
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  "all",
                  "Hindi Soulmate",
                  "English Soulmate",
                ] as ProjectFilter[]
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setProjectFilter(p)}
                  className={clsx(
                    "px-3 py-1 rounded-full border text-sm",
                    projectFilter === p
                      ? p === "Hindi Soulmate"
                        ? "bg-orange-500 text-white border-orange-500"
                        : p === "English Soulmate"
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-primary text-white border-primary"
                      : "bg-muted text-foreground border-border"
                  )}
                >
                  {p === "all" ? "All Projects" : p}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading orders...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-destructive font-medium">{error}</p>
                  <button
                    onClick={fetchOrders}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    Try Again
                  </button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="px-4 py-3 text-left font-medium">Project</th>
                          <th className="px-4 py-3 text-left font-medium">Name</th>
                          <th className="px-4 py-3 text-left font-medium">Email</th>
                          <th className="px-4 py-3 text-left font-medium">Phone</th>
                          <th className="px-4 py-3 text-left font-medium">Gender</th>
                          <th className="px-4 py-3 text-left font-medium">DOB</th>
                          <th className="px-4 py-3 text-left font-medium">Place of Birth</th>
                          <th className="px-4 py-3 text-left font-medium">Add-ons</th>
                          <th className="px-4 py-3 text-left font-medium">Amount</th>
                          <th className="px-4 py-3 text-left font-medium">Order ID</th>
                          <th className="px-4 py-3 text-left font-medium">Payment Status</th>
                          <th className="px-4 py-3 text-left font-medium">Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedOrders.length === 0 ? (
                          <tr>
                            <td
                              colSpan={12}
                              className="px-4 py-8 text-center text-muted-foreground"
                            >
                              No orders found
                            </td>
                          </tr>
                        ) : (
                          paginatedOrders.map((order) => (
                            <tr
                              key={order.id}
                              className={clsx(
                                "border-b border-border transition-colors",
                                isNewOrder(order.created_at)
                                  ? "bg-green-50 hover:bg-green-100"
                                  : "hover:bg-muted/30"
                              )}
                            >
                              <td className="px-4 py-3">
                                <span
                                  className={clsx(
                                    "px-2 py-1 rounded-full text-xs font-semibold",
                                    order.project_name === "Hindi Soulmate"
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-pink-100 text-pink-700"
                                  )}
                                >
                                  {order.project_name || "—"}
                                </span>
                              </td>
                              <td className="px-4 py-3 font-medium">
                                {order.full_name}
                              </td>
                              <td className="px-4 py-3">{order.email}</td>
                              <td className="px-4 py-3">{order.phone_number}</td>
                              <td className="px-4 py-3 capitalize">
                                {order.gender || "—"}
                              </td>
                              <td className="px-4 py-3">
                                {formatDate(order.date_of_birth)}
                              </td>
                              <td className="px-4 py-3">
                                {order.place_of_birth || "—"}
                              </td>
                              <td className="px-4 py-3">
                                {(order.additional_products || []).length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {order.additional_products.map(
                                      (product, i) => (
                                        <span
                                          key={i}
                                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                        >
                                          {product}
                                        </span>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-xs">
                                    None
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3 font-semibold text-primary">
                                ₹{order.amount}
                              </td>
                              <td className="px-4 py-3 text-xs text-muted-foreground">
                                {order.cashfree_order_id || "—"}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={clsx(
                                    "px-2 py-1 rounded-full text-xs font-semibold capitalize",
                                    order.payment_status === "paid"
                                      ? "bg-green-100 text-green-700"
                                      : order.payment_status === "failed"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  )}
                                >
                                  {order.payment_status || "pending"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-muted-foreground text-xs">
                                {formatDateTime(order.created_at)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>

                      {filteredOrders.length > 0 && (
                        <tfoot>
                          <tr className="bg-muted/50 border-t border-border font-semibold">
                            <td colSpan={8} className="px-4 py-3 text-right">
                              Total Revenue (paid orders)
                            </td>
                            <td className="px-4 py-3 text-primary">
                              ₹{totalAmount}
                            </td>
                            <td colSpan={3}></td>
                          </tr>
                        </tfoot>
                      )}
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-border bg-muted/30">
                        <span className="text-sm text-muted-foreground">
                          Showing page {currentPage} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage <= 1 || loading}
                            className="px-3 py-1.5 rounded border border-border text-sm font-medium disabled:opacity-50 hover:bg-muted transition"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() =>
                              setCurrentPage((p) =>
                                Math.min(totalPages, p + 1)
                              )
                            }
                            disabled={currentPage >= totalPages || loading}
                            className="px-3 py-1.5 rounded border border-border text-sm font-medium disabled:opacity-50 hover:bg-muted transition"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
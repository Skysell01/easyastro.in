"use client";

import React, { useEffect, useState, useMemo } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* ─────────────────────── Types ─────────────────────── */
type Order = {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  place_of_birth: string;
  amount: number;
  additional_products: string[];
  created_at: string;
};

type AbandonedOrder = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  place_of_birth: string;
  amount: number;
  additional_products: string[];
  created_at: string;
};

type Tab = "orders" | "abandoned";
type SortKey = "created_at" | "amount" | "full_name";
type SortDir = "asc" | "desc";

/* ─────────────────────── Helpers ─────────────────────── */
const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const shortId = (str: string) => (str ? str.slice(0, 10).toUpperCase() : "—");

/* ─────────────────────── Page ─────────────────────── */
export default function RecordsPage() {


  // ── Auth guard ──────────────────────────────────────────
  // Replace this with your own auth check.
  // Example: check sessionStorage / cookie set by your login page.
//   const [authChecked, setAuthChecked] = useState(false);
//   const [authed, setAuthed] = useState(false);

//   useEffect(() => {
//     // ✏️  Replace the logic below with your actual auth check.
//     // Examples:
//     //   const token = sessionStorage.getItem("admin_token");
//     //   const cookie = document.cookie.includes("admin_session=true");
//     //   const user = JSON.parse(localStorage.getItem("admin_user") || "null");
//     const token = sessionStorage.getItem("admin_token");
//     if (token) {
//       setAuthed(true);
//     } else {
//       // Redirect to your existing login page
//       router.replace("/admin/login"); // ✏️ change to your login route
//     }
//     setAuthChecked(true);
//   }, [router]);

  // ── Data ────────────────────────────────────────────────
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [abandoned, setAbandoned] = useState<AbandonedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: o, error: oErr }, { data: a, error: aErr }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("abandoned_orders").select("*").order("created_at", { ascending: false }),
    ]);
    if (oErr) console.error("Supabase orders fetch error:", oErr);
    if (aErr) console.error("Supabase abandoned_orders fetch error:", aErr);
    setOrders((o as Order[]) ?? []);
    setAbandoned((a as AbandonedOrder[]) ?? []);
    setLoading(false);
  };

useEffect(() => {
  fetchData();
}, []);

  // ── Derived ─────────────────────────────────────────────
  const rows = tab === "orders" ? orders : abandoned;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return rows
      .filter((r) => {
        if (!q) return true;
        const o = r as Order;
        return (
          r.full_name?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.phone?.includes(q) ||
          o.razorpay_order_id?.toLowerCase().includes(q) ||
          o.razorpay_payment_id?.toLowerCase().includes(q) ||
          r.place_of_birth?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        let av: any = a[sortKey as keyof typeof a];
        let bv: any = b[sortKey as keyof typeof b];
        if (sortKey === "created_at") {
          av = new Date(av as string).getTime();
          bv = new Date(bv as string).getTime();
        }
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av === bv) return 0;
        return sortDir === "asc" ? (av > bv ? 1 : -1) : av < bv ? 1 : -1;
      });
  }, [rows, search, sortKey, sortDir]);

  const totalRevenue = orders.reduce((s, o) => s + (o.amount ?? 0), 0);
  const conversionRate =
    orders.length + abandoned.length > 0
      ? ((orders.length / (orders.length + abandoned.length)) * 100).toFixed(1)
      : "0.0";

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const sortArrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  // ── Guard render ────────────────────────────────────────
//   if (!authChecked || !authed) {
//     return (
//       <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ width: 32, height: 32, border: "2px solid rgba(255,60,172,0.2)", borderTopColor: "#ff3cac", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     );
//   }

  /* ─── Render ─── */
  return (
    <div className="records-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .records-root {
          min-height: 100vh;
          background: #0a0a0f;
          color: #e8e6f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
        }

        /* noise overlay */
        .records-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        /* top accent bar */
        .records-root::after {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff3cac, #784ba0, #2b86c5, #ff3cac);
          background-size: 300% 100%;
          animation: bar-slide 4s linear infinite;
          z-index: 100;
        }
        @keyframes bar-slide { to { background-position: 300% 0; } }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 1380px;
          margin: 0 auto;
          padding: 44px 24px 100px;
        }

        /* header */
        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 36px;
        }
        .page-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #ff3cac;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(135deg, #fff 30%, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 16px 18px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, rgba(255,60,172,0.06), transparent 65%);
          pointer-events: none;
        }
        .stat-card:hover {
          border-color: rgba(255,60,172,0.28);
          transform: translateY(-1px);
        }
        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.13em;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
        }
        .stat-value.green { color: #4ade80; }
        .stat-value.pink  { color: #ff3cac; }
        .stat-value.yellow{ color: #fbbf24; }
        .stat-value.blue  { color: #60a5fa; }

        /* controls */
        .controls-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .tab-group {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 3px;
          gap: 2px;
        }
        .tab-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 7px;
          border: none;
          cursor: pointer;
          transition: all 0.15s;
          background: transparent;
          color: #777;
        }
        .tab-btn.active {
          background: linear-gradient(135deg, #ff3cac, #784ba0);
          color: #fff;
          box-shadow: 0 2px 12px rgba(255,60,172,0.28);
        }
        .tab-btn:not(.active):hover { color: #ccc; background: rgba(255,255,255,0.05); }

        .search-wrap { flex: 1; min-width: 200px; position: relative; }
        .search-icon {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          color: #555; font-size: 15px; pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 9px 14px 9px 36px;
          color: #e8e6f0;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input::placeholder { color: #555; }
        .search-input:focus { border-color: rgba(255,60,172,0.4); }

        .count-badge {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          background: rgba(255,60,172,0.1);
          border: 1px solid rgba(255,60,172,0.22);
          color: #ff3cac;
          padding: 5px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .icon-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: #999;
          border-radius: 10px;
          padding: 8px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .icon-btn:hover { border-color: rgba(255,60,172,0.3); color: #fff; }

        /* table */
        .table-wrap {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          overflow-x: auto;
        }
        table { width: 100%; border-collapse: collapse; min-width: 700px; }

        thead tr {
          background: rgba(255,255,255,0.035);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        th {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: #555;
          text-transform: uppercase;
          padding: 12px 16px;
          text-align: left;
          white-space: nowrap;
          user-select: none;
        }
        th.sortable { cursor: pointer; }
        th.sortable:hover { color: #ff3cac; }
        th.sorted { color: #ff3cac; }

        tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.035);
          transition: background 0.12s;
          cursor: pointer;
        }
        tbody tr:hover { background: rgba(255,60,172,0.035); }
        tbody tr:last-child { border-bottom: none; }
        tbody tr.is-expanded { background: rgba(120,75,160,0.07); }

        td {
          padding: 12px 16px;
          vertical-align: middle;
          color: #b8b4cc;
          font-size: 13px;
        }

        /* cell variants */
        .cell-id {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #a78bfa;
          letter-spacing: 0.05em;
        }
        .cell-name { font-weight: 600; color: #fff; white-space: nowrap; }
        .cell-sub { font-size: 11px; color: #666; margin-top: 2px; }
        .cell-phone { font-family: 'DM Mono', monospace; font-size: 12px; }
        .cell-amount {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          color: #4ade80;
          font-size: 15px;
        }
        .cell-date { font-size: 11.5px; color: #666; white-space: nowrap; }

        /* badges */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .badge-paid {
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.22);
          color: #4ade80;
        }
        .badge-abandoned {
          background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.2);
          color: #fbbf24;
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.35} }

        .gender-pill {
          background: rgba(167,139,250,0.08);
          border: 1px solid rgba(167,139,250,0.18);
          color: #a78bfa;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
        }

        /* expanded detail */
        .expanded-row td { padding: 0; }
        .expanded-content {
          padding: 18px 20px;
          background: rgba(120,75,160,0.05);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 14px;
        }
        .exp-field { display: flex; flex-direction: column; gap: 3px; }
        .exp-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.13em;
          color: #4a4a5a;
          text-transform: uppercase;
        }
        .exp-value { font-size: 13px; color: #ddd; word-break: break-all; }
        .exp-value.mono {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #a78bfa;
        }
        .exp-products { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 2px; }
        .exp-tag {
          background: rgba(255,60,172,0.08);
          border: 1px solid rgba(255,60,172,0.18);
          color: #ff3cac;
          padding: 2px 9px;
          border-radius: 8px;
          font-size: 11px;
        }
        .exp-tag.none { color: #555; border-color: rgba(255,255,255,0.08); background: transparent; }

        /* empty / loader */
        .empty-state { text-align: center; padding: 60px 20px; }
        .empty-icon { font-size: 34px; margin-bottom: 10px; opacity: 0.3; }
        .empty-text { color: #555; font-size: 13px; }

        .loader-row td { padding: 56px; text-align: center; }
        .spinner {
          display: inline-block;
          width: 28px; height: 28px;
          border: 2px solid rgba(255,60,172,0.18);
          border-top-color: #ff3cac;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .sort-arrow { opacity: 0.4; font-size: 10px; margin-left: 2px; }
        .sort-arrow.on { opacity: 1; color: #ff3cac; }

        @media (max-width: 860px) {
          .hide-sm { display: none; }
          .page-wrap { padding: 24px 14px 60px; }
        }
      `}</style>

      <div className="page-wrap">
        {/* ── Header ── */}
        <div className="page-header">
          <div>
            <div className="page-eyebrow">EasyAstro · Admin Panel</div>
            <h1 className="page-title">Orders & Records</h1>
          </div>
          <button className="icon-btn" onClick={fetchData}>
            ↺ Refresh
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Paid Orders</div>
            <div className="stat-value green">{orders.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Revenue</div>
            <div className="stat-value green">₹{totalRevenue.toLocaleString("en-IN")}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Order Value</div>
            <div className="stat-value blue">
              ₹{orders.length ? Math.round(totalRevenue / orders.length).toLocaleString("en-IN") : 0}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Abandoned</div>
            <div className="stat-value yellow">{abandoned.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Conversion Rate</div>
            <div className="stat-value pink">{conversionRate}%</div>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="controls-row">
          <div className="tab-group">
            <button
              className={`tab-btn ${tab === "orders" ? "active" : ""}`}
              onClick={() => { setTab("orders"); setSearch(""); setExpandedId(null); }}
            >
              ✅ Paid Orders
            </button>
            <button
              className={`tab-btn ${tab === "abandoned" ? "active" : ""}`}
              onClick={() => { setTab("abandoned"); setSearch(""); setExpandedId(null); }}
            >
              ⚠️ Abandoned
            </button>
          </div>

          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              placeholder="Search name, email, phone, order ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <span className="count-badge">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* ── Table ── */}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th
                  className={`sortable ${sortKey === "full_name" ? "sorted" : ""}`}
                  onClick={() => toggleSort("full_name")}
                >
                  Name
                  <span className={`sort-arrow ${sortKey === "full_name" ? "on" : ""}`}>
                    {sortArrow("full_name")}
                  </span>
                </th>
                <th className="hide-sm">Contact</th>
                <th className="hide-sm">DOB / Place</th>
                <th className="hide-sm">Gender</th>
                <th
                  className={`sortable ${sortKey === "amount" ? "sorted" : ""}`}
                  onClick={() => toggleSort("amount")}
                >
                  Amount
                  <span className={`sort-arrow ${sortKey === "amount" ? "on" : ""}`}>
                    {sortArrow("amount")}
                  </span>
                </th>
                <th>Status</th>
                <th
                  className={`sortable hide-sm ${sortKey === "created_at" ? "sorted" : ""}`}
                  onClick={() => toggleSort("created_at")}
                >
                  Date
                  <span className={`sort-arrow ${sortKey === "created_at" ? "on" : ""}`}>
                    {sortArrow("created_at")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="loader-row">
                  <td colSpan={8}><div className="spinner" /></td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <div className="empty-icon">📭</div>
                      <div className="empty-text">No records found</div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.flatMap((row) => {
                  const isOrder = tab === "orders";
                  const o = row as Order;
                  const isExpanded = expandedId === row.id;

                  return [
                    <tr
                      key={row.id}
                      className={isExpanded ? "is-expanded" : ""}
                      onClick={() => setExpandedId(isExpanded ? null : row.id)}
                    >
                      {/* Order ID */}
                      <td>
                        <span className="cell-id">
                          {isOrder
                            ? shortId(o.razorpay_order_id || row.id)
                            : shortId(row.id)}
                        </span>
                      </td>

                      {/* Name */}
                      <td>
                        <div className="cell-name">{row.full_name || "—"}</div>
                      </td>

                      {/* Contact (email + phone) */}
                      <td className="hide-sm">
                        <div style={{ fontSize: 12, color: "#88aacc" }}>{row.email || "—"}</div>
                        <div className="cell-sub cell-phone">{row.phone || "—"}</div>
                      </td>

                      {/* DOB / Place */}
                      <td className="hide-sm">
                        <div style={{ fontSize: 12, color: "#bbb" }}>{row.date_of_birth || "—"}</div>
                        <div className="cell-sub">{row.place_of_birth || "—"}</div>
                      </td>

                      {/* Gender */}
                      <td className="hide-sm">
                        {row.gender
                          ? <span className="gender-pill">{row.gender}</span>
                          : <span style={{ color: "#444" }}>—</span>}
                      </td>

                      {/* Amount */}
                      <td><span className="cell-amount">₹{row.amount ?? 0}</span></td>

                      {/* Status */}
                      <td>
                        {isOrder ? (
                          <span className="badge badge-paid">
                            <span className="badge-dot" />Paid
                          </span>
                        ) : (
                          <span className="badge badge-abandoned">
                            <span className="badge-dot" />Abandoned
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="hide-sm">
                        <span className="cell-date">{fmt(row.created_at)}</span>
                      </td>
                    </tr>,

                    /* ── Expanded detail row ── */
                    isExpanded && (
                      <tr key={`${row.id}-exp`} className="expanded-row">
                        <td colSpan={8}>
                          <div className="expanded-content">
                            <div className="exp-field">
                              <span className="exp-label">Full Record ID</span>
                              <span className="exp-value mono">{row.id}</span>
                            </div>

                            {isOrder && (
                              <>
                                <div className="exp-field">
                                  <span className="exp-label">Razorpay Order ID</span>
                                  <span className="exp-value mono">{o.razorpay_order_id || "—"}</span>
                                </div>
                                <div className="exp-field">
                                  <span className="exp-label">Razorpay Payment ID</span>
                                  <span className="exp-value mono">{o.razorpay_payment_id || "—"}</span>
                                </div>
                                <div className="exp-field">
                                  <span className="exp-label">Signature</span>
                                  <span className="exp-value mono" style={{ fontSize: 10 }}>
                                    {o.razorpay_signature
                                      ? o.razorpay_signature.slice(0, 32) + "…"
                                      : "—"}
                                  </span>
                                </div>
                              </>
                            )}

                            <div className="exp-field">
                              <span className="exp-label">Full Name</span>
                              <span className="exp-value">{row.full_name || "—"}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Email</span>
                              <span className="exp-value">{row.email || "—"}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Phone / WhatsApp</span>
                              <span className="exp-value">{row.phone || "—"}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Gender</span>
                              <span className="exp-value">{row.gender || "—"}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Date of Birth</span>
                              <span className="exp-value">{row.date_of_birth || "—"}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Place of Birth</span>
                              <span className="exp-value">{row.place_of_birth || "—"}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Amount Paid</span>
                              <span className="exp-value">₹{row.amount ?? 0}</span>
                            </div>
                            <div className="exp-field">
                              <span className="exp-label">Created At</span>
                              <span className="exp-value">{fmt(row.created_at)}</span>
                            </div>

                            <div className="exp-field" style={{ gridColumn: "1 / -1" }}>
                              <span className="exp-label">Add-on Products</span>
                              <div className="exp-products">
                                {row.additional_products?.length > 0
                                  ? row.additional_products.map((p) => (
                                      <span key={p} className="exp-tag">{p}</span>
                                    ))
                                  : <span className="exp-tag none">None selected</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ),
                  ].filter(Boolean);
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

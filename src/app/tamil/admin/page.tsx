"use client";
import { useState, useEffect, useMemo } from "react";
import { tamilSupabase } from "@/components/hindi-supabase/integration/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw } from "lucide-react";
import Image from 'next/image';

const DATE_FILTERS = ["All", "Today", "Yesterday", "Last 7 Days"] as const;
const STATUS_FILTERS = ["All Status", "Success", "Pending", "Abandoned"] as const;

type Order = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
  place_of_birth: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await tamilSupabase
      .from("soulmate_orders")
      .select(`
        id,
        full_name,
        email,
        phone_number,
        gender,
        date_of_birth,
        place_of_birth,
        amount,
        status,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  // Fetch on mount + live updates
  useEffect(() => {
    fetchOrders();

    const channel = tamilSupabase
      .channel("soulmate_orders_changes")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "soulmate_orders",
      }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      tamilSupabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      // Status filter
      const matchStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Success" && o.status === "paid") ||
        (statusFilter === "Pending" && o.status === "pending") ||
        (statusFilter === "Abandoned" && o.status === "abandoned");

      // Date filter
      const orderDate = new Date(o.created_at);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const last7 = new Date(today);
      last7.setDate(last7.getDate() - 7);

      const matchDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && orderDate >= today) ||
        (dateFilter === "Yesterday" && orderDate >= yesterday && orderDate < today) ||
        (dateFilter === "Last 7 Days" && orderDate >= last7);

      return matchStatus && matchDate;
    });
  }, [orders, statusFilter, dateFilter]);

  // Stats
  const totalRevenue = filtered
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + (o.amount || 0), 0);

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Gender", "DOB", "Place of Birth", "Amount", "Status", "Order Date"];
    const rows = filtered.map((o) => [
      o.full_name,
      o.email,
      o.phone_number || "—",
      o.gender || "—",
      o.date_of_birth || "—",
      o.place_of_birth || "—",
      o.amount,
      o.status,
      new Date(o.created_at).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "soulmate_orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b bg-background px-4 md:px-6 py-3 sticky top-0 z-20">
        <Image src='/tamil/logo.png' alt="Soulmap Creations" width={190} height={50} className="h-8 md:h-10" />
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Record Orders</h1>
        <span className="ml-auto text-sm text-muted-foreground">
          {loading ? "Loading..." : `${filtered.length} orders`}
        </span>
      </div>

      <main className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-5">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Orders", value: filtered.length },
            { label: "Paid", value: filtered.filter(o => o.status === "paid").length },
            { label: "Pending", value: filtered.filter(o => o.status === "pending").length },
            { label: "Revenue", value: `₹${totalRevenue}` },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Date filter + Export */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {DATE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setDateFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  dateFilter === f
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10 rounded-full"
            onClick={exportCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Status filter + Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === f
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            className="rounded-full gap-2"
            onClick={fetchOrders}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Desktop Table */}
        <Card className="border hidden md:block overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Place of Birth</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className={`transition-colors ${
                      order.status === "paid"
                        ? "bg-emerald-50/50 hover:bg-emerald-50"
                        : order.status === "pending"
                        ? "bg-yellow-50/50 hover:bg-yellow-50"
                        : "bg-red-50/50 hover:bg-red-50"
                    }`}
                  >
                    <TableCell className="text-muted-foreground text-xs">{index + 1}</TableCell>
                    <TableCell className="font-medium">{order.full_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.email}</TableCell>
                    <TableCell className="text-sm">{order.phone_number || "—"}</TableCell>
                    <TableCell className="text-sm">{order.gender || "—"}</TableCell>
                    <TableCell className="text-sm">{order.date_of_birth || "—"}</TableCell>
                    <TableCell className="text-sm">{order.place_of_birth || "—"}</TableCell>
                    <TableCell className="text-destructive font-semibold text-sm">₹{order.amount}</TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <Card className="border p-12 text-center">
              <p className="text-muted-foreground">Loading orders...</p>
            </Card>
          ) : filtered.length === 0 ? (
            <Card className="border p-12 text-center">
              <p className="text-muted-foreground">No orders found.</p>
            </Card>
          ) : (
            filtered.map((order) => (
              <Card
                key={order.id}
                className={`p-4 border ${
                  order.status === "paid"
                    ? "bg-emerald-50/50"
                    : order.status === "pending"
                    ? "bg-yellow-50/50"
                    : "bg-red-50/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{order.full_name}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground text-xs">Phone:</span> <span className="text-foreground text-xs">{order.phone_number || "—"}</span></div>
                  <div><span className="text-muted-foreground text-xs">Gender:</span> <span className="text-foreground text-xs">{order.gender || "—"}</span></div>
                  <div><span className="text-muted-foreground text-xs">DOB:</span> <span className="text-foreground text-xs">{order.date_of_birth || "—"}</span></div>
                  <div><span className="text-muted-foreground text-xs">Place:</span> <span className="text-foreground text-xs">{order.place_of_birth || "—"}</span></div>
                  <div><span className="text-muted-foreground text-xs">Amount:</span> <span className="text-destructive font-semibold text-xs">₹{order.amount}</span></div>
                  <div><span className="text-muted-foreground text-xs">Date:</span> <span className="text-foreground text-xs">{new Date(order.created_at).toLocaleDateString("en-IN")}</span></div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "paid") return <span className="text-emerald-600 font-semibold text-sm">Paid ✅</span>;
  if (status === "pending") return <span className="text-yellow-600 font-semibold text-sm">Pending ⏳</span>;
  return <span className="text-destructive font-semibold text-sm">Abandoned ❌</span>;
}
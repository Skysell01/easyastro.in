import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useAuth } from "@/hooks/useAuth";
// import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, RefreshCw, Package, Download, Search, IndianRupee, Users, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface Order {
  id: string;
  full_name: string;
  email: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
  product_type: string;
  amount: number;
  payment_status: string;
  created_at: string;
}

const Admin = () => {
  const router = useRouter();
  // const { user, isAdmin, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // useEffect(() => {
  //   if (!loading) {
  //     if (!user) {
  //       navigate("/auth");
  //     } else if (!isAdmin) {
  //       navigate("/");
  //     }
  //   }
  // }, [user, isAdmin, loading, navigate]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data || []);
    }
    setIsLoadingOrders(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrders();
    }
  }, [user, isAdmin]);

  // Get unique product types for filter
  const productTypes = useMemo(() => {
    const types = new Set(orders.map(o => o.product_type));
    return Array.from(types);
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        order.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.place_of_birth.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === "all" || order.payment_status === statusFilter;
      
      // Product filter
      const matchesProduct = productFilter === "all" || order.product_type === productFilter;
      
      // Date filter
      const orderDate = new Date(order.created_at);
      const matchesDateFrom = !dateFrom || orderDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || orderDate <= new Date(dateTo + "T23:59:59");
      
      return matchesSearch && matchesStatus && matchesProduct && matchesDateFrom && matchesDateTo;
    });
  }, [orders, searchQuery, statusFilter, productFilter, dateFrom, dateTo]);

  // Paginated orders
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Stats
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const paidOrders = orders.filter(o => o.payment_status === "paid").length;
    const pendingOrders = orders.filter(o => o.payment_status === "pending").length;
    const totalRevenue = orders
      .filter(o => o.payment_status === "paid")
      .reduce((sum, o) => sum + o.amount, 0);
    
    return { totalOrders, paidOrders, pendingOrders, totalRevenue };
  }, [orders]);

  // CSV Download
  const downloadCSV = () => {
    const headers = [
      "ID", "नाम", "ईमेल", "जन्म तिथि", "जन्म समय", 
      "जन्म स्थान", "प्रोडक्ट", "राशि", "स्टेटस", "तारीख"
    ];
    
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map(order => [
        order.id,
        `"${order.full_name}"`,
        order.email,
        order.date_of_birth,
        order.time_of_birth,
        `"${order.place_of_birth}"`,
        order.product_type,
        order.amount,
        order.payment_status,
        format(new Date(order.created_at), "dd MMM yyyy HH:mm")
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setProductFilter("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { classes: string; label: string }> = {
      pending: { classes: "bg-yellow-100 text-yellow-800 border border-yellow-300", label: "Pending" },
      paid: { classes: "bg-green-100 text-green-800 border border-green-300", label: "Paid ✓" },
      failed: { classes: "bg-red-100 text-red-800 border border-red-300", label: "Failed" },
    };
    const config = statusConfig[status] || { classes: "bg-gray-100 text-gray-800 border border-gray-300", label: status };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.classes}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>एडमिन डैशबोर्ड | EasyAstro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">एडमिन डैशबोर्ड</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                लॉगआउट
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">कुल ऑर्डर</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">पेड ऑर्डर</p>
                  <p className="text-2xl font-bold text-foreground">{stats.paidOrders}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">पेंडिंग</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingOrders}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">कुल रेवेन्यू</p>
                  <p className="text-2xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-4 border border-border shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="नाम, ईमेल या स्थान खोजें..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="pl-10"
                />
              </div>
              
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="स्टेटस" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी स्टेटस</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Product Filter */}
              <Select value={productFilter} onValueChange={(v) => { setProductFilter(v); setCurrentPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="प्रोडक्ट" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी प्रोडक्ट</SelectItem>
                  {productTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Date From */}
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                placeholder="से"
              />
              
              {/* Date To */}
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                placeholder="तक"
              />
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {filteredOrders.length} में से {filteredOrders.length} ऑर्डर दिखाए जा रहे हैं
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  फ़िल्टर हटाएं
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCSV} disabled={filteredOrders.length === 0}>
                  <Download className="w-4 h-4 mr-2" />
                  CSV डाउनलोड
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
          >
            {/* Table Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">ऑर्डर्स</h2>
                  <p className="text-sm text-muted-foreground">
                    पेज {currentPage} / {totalPages || 1}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={fetchOrders} disabled={isLoadingOrders}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingOrders ? "animate-spin" : ""}`} />
                रिफ्रेश
              </Button>
            </div>

            {/* Table Content */}
            {isLoadingOrders ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">लोड हो रहा है...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">कोई ऑर्डर नहीं मिला</p>
                <p className="text-muted-foreground mt-1">फ़िल्टर बदलकर देखें या नया ऑर्डर आने का इंतज़ार करें।</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>नाम</TableHead>
                        <TableHead>ईमेल</TableHead>
                        <TableHead className="hidden md:table-cell">जन्म विवरण</TableHead>
                        <TableHead>प्रोडक्ट</TableHead>
                        <TableHead>राशि</TableHead>
                        <TableHead>स्टेटस</TableHead>
                        <TableHead>तारीख</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.full_name}</TableCell>
                          <TableCell className="text-sm">{order.email || "-"}</TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                            <div>{order.date_of_birth || "-"}</div>
                            <div>{order.time_of_birth}, {order.place_of_birth}</div>
                          </TableCell>
                          <TableCell>{order.product_type}</TableCell>
                          <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(order.payment_status)}</TableCell>
                          <TableCell className="text-sm">
                            {format(new Date(order.created_at), "dd MMM yyyy")}
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(order.created_at), "HH:mm")}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 border-t border-border flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      पिछला
                    </Button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      अगला
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Admin;

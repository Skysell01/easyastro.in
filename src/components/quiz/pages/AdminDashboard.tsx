// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet-async";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/quiz/ui/input";
// import { Badge } from "@/components/quiz/ui/badge";
// import { Textarea } from "@/components/quiz/ui/textarea";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/quiz/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/quiz/ui/dialog";
// import {
//   Users,
//   IndianRupee,
//   Download,
//   LogOut,
//   Search,
//   Eye,
//   MessageSquare,
//   CheckCircle,
//   Clock,
//   XCircle,
// } from "lucide-react";
// import { supabase } from "@/components/quiz/integrations/supabase/client";
// import { toast } from "sonner";

// interface Customer {
//   id: string;
//   email: string;
//   name: string | null;
//   phone: string | null;
//   payment_status: string;
//   payment_id: string | null;
//   order_id: string | null;
//   amount: number | null;
//   admin_notes: string | null;
//   created_at: string;
//   updated_at: string;
// }

// interface QuizResponse {
//   id: string;
//   question_id: string;
//   question_text: string;
//   answer: string;
// }

// const AdminDashboard = () => {
// const router = useRouter();
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//   const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
//   const [adminNotes, setAdminNotes] = useState("");
//   const [showDetailsDialog, setShowDetailsDialog] = useState(false);

//   useEffect(() => {
//     checkAuth();
//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     const filtered = customers.filter(
//       (customer) =>
//         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.phone?.includes(searchTerm)
//     );
//     setFilteredCustomers(filtered);
//   }, [searchTerm, customers]);

//   const checkAuth = async () => {
//     const { data: { session } } = await supabase.auth.getSession();
//     if (!session) {
//       router.push("/myquiz/quiz-admin");
//       return;
//     }

//     const { data: roleData } = await supabase
//       .from("user_roles")
//       .select("role")
//       .eq("user_id", session.user.id)
//       .eq("role", "admin")
//       .maybeSingle();

//     if (!roleData) {
//       await supabase.auth.signOut();
//      router.push("/myquiz/quiz-admin");
//     }
//   };

//   const fetchCustomers = async () => {
//     const { data, error } = await supabase
//       .from("customers")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("Error fetching customers:", error);
//       toast.error("Failed to load customers");
//     } else {
//       setCustomers(data || []);
//       setFilteredCustomers(data || []);
//     }
//     setIsLoading(false);
//   };

//   const fetchQuizResponses = async (customerId: string) => {
//     const { data, error } = await supabase
//       .from("quiz_responses")
//       .select("*")
//       .eq("customer_id", customerId);

//     if (error) {
//       console.error("Error fetching quiz responses:", error);
//     } else {
//       setQuizResponses(data || []);
//     }
//   };

//   const handleViewDetails = async (customer: Customer) => {
//     setSelectedCustomer(customer);
//     setAdminNotes(customer.admin_notes || "");
//     await fetchQuizResponses(customer.id);
//     setShowDetailsDialog(true);
//   };

//   const handleSaveNotes = async () => {
//     if (!selectedCustomer) return;

//     const { error } = await supabase
//       .from("customers")
//       .update({ admin_notes: adminNotes })
//       .eq("id", selectedCustomer.id);

//     if (error) {
//       toast.error("Failed to save notes");
//     } else {
//       toast.success("Notes saved successfully");
//       fetchCustomers();
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push("/myquiz/quiz-admin");
//   };

//   const exportToCSV = () => {
//     const headers = ["Name", "Email", "Phone", "Payment Status", "Amount", "Order ID", "Payment ID", "Date"];
//     const csvData = filteredCustomers.map((c) => [
//       c.name || "",
//       c.email,
//       c.phone || "",
//       c.payment_status,
//       c.amount?.toString() || "",
//       c.order_id || "",
//       c.payment_id || "",
//       new Date(c.created_at).toLocaleString(),
//     ]);

//     const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `customers_${new Date().toISOString().split("T")[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//     toast.success("Export completed");
//   };

//   const stats = {
//     total: customers.length,
//     completed: customers.filter((c) => c.payment_status === "completed").length,
//     pending: customers.filter((c) => c.payment_status === "pending").length,
//     revenue: customers
//       .filter((c) => c.payment_status === "completed")
//       .reduce((sum, c) => sum + (c.amount || 0), 0),
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case "pending":
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       default:
//         return <XCircle className="w-4 h-4 text-red-500" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30">Completed</Badge>;
//       case "pending":
//         return <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30">Pending</Badge>;
//       default:
//         return <Badge variant="destructive">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Helmet>
//         <title>Admin Dashboard | Soulmate Sketch</title>
//       </Helmet>

//       {/* Header */}
//       <header className="border-b border-border bg-card">
//         <div className="container px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
//               <Users className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="font-serif text-xl font-semibold">Admin Dashboard</h1>
//               <p className="text-xs text-muted-foreground">Soulmate Sketch</p>
//             </div>
//           </div>
//           <Button variant="outline" size="sm" onClick={handleLogout}>
//             <LogOut className="w-4 h-4 mr-2" />
//             Logout
//           </Button>
//         </div>
//       </header>

//       <main className="container px-4 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//           >
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
//                     <Users className="w-5 h-5 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">{stats.total}</p>
//                     <p className="text-xs text-muted-foreground">Total Customers</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">{stats.completed}</p>
//                     <p className="text-xs text-muted-foreground">Completed</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
//                     <Clock className="w-5 h-5 text-yellow-500" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">{stats.pending}</p>
//                     <p className="text-xs text-muted-foreground">Pending</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
//                     <IndianRupee className="w-5 h-5 text-coral" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</p>
//                     <p className="text-xs text-muted-foreground">Revenue</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         {/* Actions Bar */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Search by name, email, or phone..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Button variant="outline" onClick={exportToCSV}>
//             <Download className="w-4 h-4 mr-2" />
//             Export CSV
//           </Button>
//         </div>

//         {/* Customers Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Customer Records</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {isLoading ? (
//               <div className="text-center py-8 text-muted-foreground">Loading...</div>
//             ) : filteredCustomers.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">No customers found</div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Contact</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Amount</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead className="text-right">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filteredCustomers.map((customer) => (
//                       <TableRow key={customer.id}>
//                         <TableCell>
//                           <div>
//                             <p className="font-medium">{customer.name || "—"}</p>
//                             <p className="text-xs text-muted-foreground">{customer.email}</p>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <p className="text-sm">{customer.phone || "—"}</p>
//                         </TableCell>
//                         <TableCell>{getStatusBadge(customer.payment_status)}</TableCell>
//                         <TableCell>
//                           <p className="font-medium">₹{customer.amount || 0}</p>
//                         </TableCell>
//                         <TableCell>
//                           <p className="text-sm text-muted-foreground">
//                             {new Date(customer.created_at).toLocaleDateString()}
//                           </p>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleViewDetails(customer)}
//                           >
//                             <Eye className="w-4 h-4 mr-1" />
//                             View
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </main>

//       {/* Customer Details Dialog */}
//       <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
//         <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="font-serif text-xl">Customer Details</DialogTitle>
//           </DialogHeader>

//           {selectedCustomer && (
//             <div className="space-y-6">
//               {/* Customer Info */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Name</p>
//                   <p className="font-medium">{selectedCustomer.name || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <p className="font-medium">{selectedCustomer.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Phone</p>
//                   <p className="font-medium">{selectedCustomer.phone || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Payment Status</p>
//                   <div className="flex items-center gap-2 mt-1">
//                     {getStatusIcon(selectedCustomer.payment_status)}
//                     <span className="capitalize">{selectedCustomer.payment_status}</span>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Order ID</p>
//                   <p className="font-mono text-sm">{selectedCustomer.order_id || "—"}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Payment ID</p>
//                   <p className="font-mono text-sm">{selectedCustomer.payment_id || "—"}</p>
//                 </div>
//               </div>

//               {/* Quiz Responses */}
//               {quizResponses.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold mb-3 flex items-center gap-2">
//                     <MessageSquare className="w-4 h-4" />
//                     Quiz Responses
//                   </h3>
//                   <div className="space-y-3 bg-muted/50 rounded-xl p-4">
//                     {quizResponses.map((response) => (
//                       <div key={response.id} className="border-b border-border pb-2 last:border-0 last:pb-0">
//                         <p className="text-sm text-muted-foreground">{response.question_text}</p>
//                         <p className="font-medium">{response.answer}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Admin Notes */}
//               <div>
//                 <h3 className="font-semibold mb-3">Admin Notes</h3>
//                 <Textarea
//                   value={adminNotes}
//                   onChange={(e) => setAdminNotes(e.target.value)}
//                   placeholder="Add notes about this customer..."
//                   rows={4}
//                 />
//                 <Button onClick={handleSaveNotes} className="mt-3" size="sm">
//                   Save Notes
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminDashboard;



"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/quiz/ui/input";
import { Badge } from "@/components/quiz/ui/badge";
import { Textarea } from "@/components/quiz/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/quiz/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/quiz/ui/dialog";
import {
  Users,
  IndianRupee,
  Download,
  LogOut,
  Search,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
} from "lucide-react";
import { supabase } from "@/components/quiz/integrations/supabase/client";
import { toast } from "sonner";

interface Customer {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  payment_status: string;
  payment_id: string | null;
  order_id: string | null;
  amount: number | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface QuizResponse {
  id: string;
  question_id: string;
  question_text: string;
  answer: string;
}

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const AdminDashboard = () => {
const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[]>([]);
  const [adminNotes, setAdminNotes] = useState("");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone?.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || customer.payment_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, statusFilter, customers]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/myquiz/quiz-admin");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
     router.push("/myquiz/quiz-admin");
    }
  };

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to load customers");
    } else {
      setCustomers(data || []);
      setFilteredCustomers(data || []);
    }
    setIsLoading(false);
  };

  const fetchQuizResponses = async (customerId: string) => {
    const { data, error } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("customer_id", customerId);

    if (error) {
      console.error("Error fetching quiz responses:", error);
    } else {
      setQuizResponses(data || []);
    }
  };

  const handleViewDetails = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setAdminNotes(customer.admin_notes || "");
    await fetchQuizResponses(customer.id);
    setShowDetailsDialog(true);
  };

  const handleSaveNotes = async () => {
    if (!selectedCustomer) return;

    const { error } = await supabase
      .from("customers")
      .update({ admin_notes: adminNotes })
      .eq("id", selectedCustomer.id);

    if (error) {
      toast.error("Failed to save notes");
    } else {
      toast.success("Notes saved successfully");
      fetchCustomers();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/myquiz/quiz-admin");
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Payment Status", "Amount", "Order ID", "Payment ID", "Date"];
    const csvData = filteredCustomers.map((c) => [
      c.name || "",
      c.email,
      c.phone || "",
      c.payment_status,
      c.amount?.toString() || "",
      c.order_id || "",
      c.payment_id || "",
      new Date(c.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Export completed");
  };

  const stats = {
    total: customers.length,
    completed: customers.filter((c) => c.payment_status === "completed").length,
    pending: customers.filter((c) => c.payment_status === "pending").length,
    revenue: customers
      .filter((c) => c.payment_status === "completed")
      .reduce((sum, c) => sum + (c.amount || 0), 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30">Pending</Badge>;
      default:
        return <Badge variant="destructive">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard | Soulmate Sketch</title>
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Soulmate Sketch</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.completed}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="flex gap-1">
              {STATUS_FILTERS.map((filter) => (
                <Button
                  key={filter.value}
                  variant={statusFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(filter.value)}
                  className={
                    statusFilter === filter.value
                      ? filter.value === "completed"
                        ? "bg-green-500 hover:bg-green-600 text-white border-transparent"
                        : filter.value === "pending"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white border-transparent"
                        : ""
                      : filter.value === "completed"
                      ? "text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300"
                      : filter.value === "pending"
                      ? "text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300"
                      : ""
                  }
                >
                  {filter.value === "completed" && (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  )}
                  {filter.value === "pending" && (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {filter.label}
                  {filter.value !== "all" && (
                    <span className="ml-1 text-xs opacity-75">
                      ({filter.value === "completed" ? stats.completed : stats.pending})
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Customer Records</span>
              {statusFilter !== "all" && (
                <Badge
                  className={
                    statusFilter === "completed"
                      ? "bg-green-500/20 text-green-600"
                      : "bg-yellow-500/20 text-yellow-600"
                  }
                >
                  Filtered: {statusFilter} ({filteredCustomers.length})
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {statusFilter !== "all"
                  ? `No ${statusFilter} customers found`
                  : "No customers found"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name || "—"}</p>
                            <p className="text-xs text-muted-foreground">{customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{customer.phone || "—"}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(customer.payment_status)}</TableCell>
                        <TableCell>
                          <p className="font-medium">₹{customer.amount || 0}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm text-muted-foreground">
                            {new Date(customer.created_at).toLocaleDateString()}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(customer)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Customer Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Customer Details</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedCustomer.name || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedCustomer.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedCustomer.payment_status)}
                    <span className="capitalize">{selectedCustomer.payment_status}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-sm">{selectedCustomer.order_id || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment ID</p>
                  <p className="font-mono text-sm">{selectedCustomer.payment_id || "—"}</p>
                </div>
              </div>

              {/* Quiz Responses */}
              {quizResponses.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Quiz Responses
                  </h3>
                  <div className="space-y-3 bg-muted/50 rounded-xl p-4">
                    {quizResponses.map((response) => (
                      <div key={response.id} className="border-b border-border pb-2 last:border-0 last:pb-0">
                        <p className="text-sm text-muted-foreground">{response.question_text}</p>
                        <p className="font-medium">{response.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <h3 className="font-semibold mb-3">Admin Notes</h3>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this customer..."
                  rows={4}
                />
                <Button onClick={handleSaveNotes} className="mt-3" size="sm">
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
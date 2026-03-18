"use client";

// import { useState, useEffect } from "react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Helmet } from "react-helmet-async";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { 
//   Check, Shield, Zap, Star, Lock, Mail, Heart, 
//   Sparkles, Eye, FileCheck, Send, Users, Palette, Brain, Compass, ChevronUp
// } from "lucide-react";
// import FloatingElements from "@/components/quiz/FloatingElements";
// // import { useRazorpay } from "@/hooks/useRazorpay";
// import { toast } from "sonner";

// const detailedFeatures = [
//   {
//     icon: Palette,
//     title: "Hand-Drawn Digital Soulmate Sketch",
//     description: "A unique, personalized portrait created based on your energy and emotional patterns — not AI-generated.",
//   },
//   {
//     icon: Brain,
//     title: "Emotional & Personality Traits Breakdown",
//     description: "Deep insights into your soulmate's temperament, communication style, and emotional nature.",
//   },
//   {
//     icon: Heart,
//     title: "Relationship Energy & Compatibility Insight",
//     description: "Understand how your energies align and what makes your connection unique and destined.",
//   },
//   {
//     icon: Compass,
//     title: "Timing & Connection Guidance",
//     description: "Astrological insights on when and how you're most likely to meet or recognize your soulmate.",
//   },
//   {
//     icon: Mail,
//     title: "Delivered Via Email",
//     description: "No physical shipping. Your complete reading is delivered digitally within 24 hours.",
//   },
// ];

// const whyThisWorks = [
//   {
//     icon: Sparkles,
//     title: "Based on Emotional Psychology",
//     description: "Combines ancient astrological wisdom with modern emotional pattern analysis.",
//   },
//   {
//     icon: Zap,
//     title: "Uses Your Current Energy",
//     description: "Your answers capture your present emotional state, ensuring accuracy and relevance.",
//   },
//   {
//     icon: Eye,
//     title: "Personalized, Never Generic",
//     description: "Each reading is created individually — no templates, no recycled content.",
//   },
// ];

// const testimonials = [
//   {
//     name: "Priya",
//     city: "Mumbai",
//     text: "The sketch was unbelievably accurate. I felt an instant connection when I saw it. The personality description matched exactly what I've always been drawn to.",
//     rating: 5,
//   },
//   {
//     name: "Amit",
//     city: "Delhi",
//     text: "Worth every penny. This gave me clarity I've been seeking for years. The timing guidance was especially helpful.",
//     rating: 5,
//   },
//   {
//     name: "Sneha",
//     city: "Bangalore",
//     text: "I was skeptical at first, but the level of detail amazed me. It felt like someone truly understood what I was looking for.",
//     rating: 5,
//   },
// ];

// const paymentSteps = [
//   { icon: FileCheck, title: "Payment Confirmed", description: "Your order is securely processed" },
//   { icon: Eye, title: "Answers Reviewed", description: "Your quiz responses are analyzed" },
//   { icon: Palette, title: "Sketch Created", description: "Your personalized reading is crafted" },
//   { icon: Send, title: "Email Delivery", description: "Delivered to your inbox within 24 hours" },
// ];

// const Checkout = () => {
//   const router = useRouter();
//   const [showStickyButton, setShowStickyButton] = useState(false);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   // const { initiatePayment, isLoading: isProcessing } = useRazorpay();

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowStickyButton(window.scrollY > 400);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handlePayment = () => {
//     if (!email || !name) {
//       toast.error("Please enter your name and email");
//       return;
//     }

//     // Get quiz responses from localStorage
//     const quizResponses = JSON.parse(localStorage.getItem("quizAnswers") || "{}");

//     // initiatePayment({
//     //   email,
//     //   name,
//     //   phone: phone || undefined,
//     //   quizResponses,
//     //   onSuccess: () => {
//     //     localStorage.removeItem("quizAnswers");
//     //     navigate("/thank-you");
//     //   },
//     //   onFailure: (error) => {
//     //     toast.error(error);
//     //   },
//     // });
//   };

//   const scrollToForm = () => {
//     document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen gradient-hero relative overflow-hidden pb-20 md:pb-0">
//       <FloatingElements />
//       <Helmet>
//         <title>Complete Your Order | Soulmate Sketch</title>
//         <meta name="description" content="Your personalized soulmate sketch is ready. Complete your order to receive your digital reading." />
//       </Helmet>

//       <div className="container px-4 py-10 md:py-16 relative z-10">
//         <div className="max-w-5xl mx-auto">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mb-10"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
//               <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
//               <span className="text-sm font-medium">Your sketch is ready</span>
//             </div>

//             <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-3">
//               Your Soulmate Sketch Is Ready
//             </h1>
//             <p className="text-muted-foreground text-lg max-w-xl mx-auto">
//               Complete your order to receive your personalized soulmate sketch & reading.
//             </p>
//           </motion.div>

//           {/* Price Highlight Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="max-w-md mx-auto mb-8"
//           >
//             <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-coral/5">
//               <CardContent className="p-6 text-center">
//                 <div className="flex items-center justify-center gap-3 mb-2">
//                   <span className="text-muted-foreground line-through text-lg">₹1,999</span>
//                   <span className="px-2 py-1 rounded-full bg-coral/20 text-coral text-xs font-semibold">75% OFF</span>
//                 </div>
//                 <div className="text-4xl md:text-5xl font-serif font-bold text-coral mb-3">
//                   ₹499
//                 </div>
//                 <p className="text-sm text-coral font-medium mb-4">
//                   🎉 Limited time offer — Today only
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
//                   <span className="flex items-center gap-1">
//                     <Check className="w-3 h-3 text-primary" />
//                     One-time payment
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Check className="w-3 h-3 text-primary" />
//                     No subscription
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Check className="w-3 h-3 text-primary" />
//                     Instant digital delivery
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Payment Form - Right under pricing */}
//           <motion.div
//             id="order-form"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.15 }}
//             className="max-w-lg mx-auto mb-12"
//           >
//             <Card variant="gradient" className="overflow-hidden border-2 border-primary/20">
//               <CardContent className="p-6 md:p-8 space-y-5">
//                 <h3 className="font-serif text-xl md:text-2xl font-semibold text-center">
//                   Complete Your Order
//                 </h3>

//                 {/* Email input */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your@email.com"
//                     className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//                     required
//                   />
//                   <p className="text-xs text-muted-foreground mt-1">
//                     Your soulmate sketch will be delivered here
//                   </p>
//                 </div>

//                 {/* Name input */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Your name"
//                     className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//                     required
//                   />
//                 </div>

//                 {/* Phone input (optional) */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Phone  <span className="text-muted-foreground font-normal">(optional)</span>
//                   </label>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="+91 98765 43210"
//                     className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//                   />
//                 </div>

//                 {/* Payment button */}
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 17 }}
//                 >
//                   <Button
//                     variant="hero"
//                     size="xl"
//                     className="w-full"
//                     onClick={handlePayment}
//                     // disabled={isProcessing}
//                   >
//                      Pay ₹499 & Get Report
//                   </Button>
//                 </motion.div>

//                 <p className="text-xs text-center text-muted-foreground">
//                   Takes less than 2 minutes • No physical shipping • One-time payment
//                 </p>

//                 <p className="text-xs text-center text-muted-foreground">
//                   By proceeding, you agree to our{" "}
//                   <Link href="/terms-and-conditions" className="underline hover:text-primary transition-colors">
//                     Terms & Conditions
//                   </Link>{" "}
//                   and{" "}
//                   <Link href="/refund-policy" className="underline hover:text-primary transition-colors">
//                     Refund Policy
//                   </Link>
//                   .
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Trust Strip Below Form */}
//             <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-6">
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Lock className="w-4 h-4 text-primary" />
//                 <span>100% Secure Payments</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Mail className="w-4 h-4 text-coral" />
//                 <span>Instant Digital Delivery</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Shield className="w-4 h-4 text-primary" />
//                 <span>Privacy Protected</span>
//               </div>
//               <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                 <Users className="w-4 h-4 text-coral" />
//                 <span>Trusted by 50,000+</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* What You'll Receive - Detailed Section */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mb-12"
//           >
//             <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-6">
//               What You'll Receive
//             </h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {detailedFeatures.map((feature, index) => (
//                 <motion.div
//                   key={feature.title}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.25 + index * 0.05 }}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.02, y: -4 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 17 }}
//                   >
//                     <Card variant="soft" className="h-full hover:shadow-lg transition-shadow">
//                       <CardContent className="p-5">
//                         <motion.div 
//                           className="w-10 h-10 rounded-xl gradient-coral flex items-center justify-center mb-3"
//                           whileHover={{ rotate: [0, -5, 5, 0] }}
//                           transition={{ duration: 0.4 }}
//                         >
//                           <feature.icon className="w-5 h-5 text-primary-foreground" />
//                         </motion.div>
//                         <h3 className="font-semibold text-foreground mb-2 text-sm">
//                           {feature.title}
//                         </h3>
//                         <p className="text-xs text-muted-foreground leading-relaxed">
//                           {feature.description}
//                         </p>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>

//           {/* What Happens After Payment - Fixed alignment */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mb-12"
//           >
//             <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-8">
//               What Happens After Payment?
//             </h2>
//             <div className="max-w-3xl mx-auto">
//               {/* Desktop: Horizontal layout */}
//               <div className="hidden md:flex items-center justify-between">
//                 {paymentSteps.map((step, index) => (
//                   <div key={step.title} className="flex items-center flex-1">
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.35 + index * 0.1 }}
//                       className="flex flex-col items-center text-center"
//                     >
//                       <div className="w-14 h-14 rounded-full gradient-coral flex items-center justify-center mb-3 shadow-lg">
//                         <step.icon className="w-6 h-6 text-primary-foreground" />
//                       </div>
//                       <span className="text-sm font-medium text-foreground mb-1">{step.title}</span>
//                       <span className="text-xs text-muted-foreground max-w-[140px]">{step.description}</span>
//                     </motion.div>
//                     {index < paymentSteps.length - 1 && (
//                       <div className="flex-1 h-[2px] bg-gradient-to-r from-coral/40 to-primary/40 mx-4" />
//                     )}
//                   </div>
//                 ))}
//               </div>
              
//               {/* Mobile: Vertical layout */}
//               <div className="md:hidden space-y-4">
//                 {paymentSteps.map((step, index) => (
//                   <motion.div
//                     key={step.title}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.35 + index * 0.1 }}
//                     className="flex items-center gap-4"
//                   >
//                     <div className="relative">
//                       <div className="w-12 h-12 rounded-full gradient-coral flex items-center justify-center shadow-lg">
//                         <step.icon className="w-5 h-5 text-primary-foreground" />
//                       </div>
//                       {index < paymentSteps.length - 1 && (
//                         <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-gradient-to-b from-coral/40 to-primary/40" />
//                       )}
//                     </div>
//                     <div>
//                       <span className="text-sm font-medium text-foreground block">{step.title}</span>
//                       <span className="text-xs text-muted-foreground">{step.description}</span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.section>

//           {/* Why This Works - Credibility Section */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="mb-12"
//           >
//             <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-background to-coral/5 p-6 md:p-8 border border-primary/10">
//               <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-2">
//                 Why This Works
//               </h2>
//               <p className="text-muted-foreground text-center text-sm mb-6 max-w-lg mx-auto">
//                 Our approach combines time-tested wisdom with your unique emotional signature.
//               </p>
//               <div className="grid md:grid-cols-3 gap-4">
//                 {whyThisWorks.map((item, index) => (
//                   <motion.div
//                     key={item.title}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.45 + index * 0.1 }}
//                     className="text-center p-5 rounded-xl bg-background/60 border border-border/50"
//                   >
//                     <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
//                       <item.icon className="w-6 h-6 text-primary-foreground" />
//                     </div>
//                     <h3 className="font-semibold text-foreground mb-2 text-sm">
//                       {item.title}
//                     </h3>
//                     <p className="text-xs text-muted-foreground leading-relaxed">
//                       {item.description}
//                     </p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </motion.section>

//           {/* Testimonials - Expanded */}
//           <motion.section
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="mb-12"
//           >
//             <div className="text-center mb-6">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 border border-coral/20 mb-3">
//                 <Star className="w-4 h-4 fill-coral text-coral" />
//                 <span className="text-sm font-medium text-coral">4.8/5 based on 50,000+ users worldwide</span>
//               </div>
//               <h2 className="font-serif text-2xl md:text-3xl font-semibold">
//                 What Our Users Say
//               </h2>
//             </div>
//             <div className="grid md:grid-cols-3 gap-4">
//               {testimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={testimonial.name}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.55 + index * 0.1 }}
//                 >
//                   <Card variant="elevated" className="h-full">
//                     <CardContent className="p-5">
//                       <div className="flex gap-1 mb-3">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <Star key={i} className="w-4 h-4 fill-coral text-coral" />
//                         ))}
//                       </div>
//                       <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
//                         "{testimonial.text}"
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm font-medium text-foreground">
//                             {testimonial.name}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {testimonial.city}
//                           </p>
//                         </div>
//                         <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
//                           Verified User
//                         </span>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.section>
//         </div>
//       </div>

//       {/* Sticky CTA Button */}
//       <AnimatePresence>
//         {showStickyButton && (
//           <motion.div
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 100, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden"
//           >
//             <Button
//               variant="hero"
//               size="xl"
//               className="w-full shadow-button"
//               onClick={scrollToForm}
//             >
//               <ChevronUp className="w-4 h-4 mr-2" />
//               Complete Order — ₹499
//             </Button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Checkout;
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Check, Shield, Zap, Star, Lock, Mail, Heart, 
  Sparkles, Eye, FileCheck, Send, Users, Palette, Brain, Compass, ChevronUp
} from "lucide-react";
import FloatingElements from "@/components/quiz/FloatingElements";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "sonner";

const detailedFeatures = [
  {
    icon: Palette,
    title: "Hand-Drawn Digital Soulmate Sketch",
    description: "A unique, personalized portrait created based on your energy and emotional patterns — not AI-generated.",
  },
  {
    icon: Brain,
    title: "Emotional & Personality Traits Breakdown",
    description: "Deep insights into your soulmate's temperament, communication style, and emotional nature.",
  },
  {
    icon: Heart,
    title: "Relationship Energy & Compatibility Insight",
    description: "Understand how your energies align and what makes your connection unique and destined.",
  },
  {
    icon: Compass,
    title: "Timing & Connection Guidance",
    description: "Astrological insights on when and how you're most likely to meet or recognize your soulmate.",
  },
  {
    icon: Mail,
    title: "Delivered Via Email",
    description: "No physical shipping. Your complete reading is delivered digitally within 24 hours.",
  },
];

const whyThisWorks = [
  {
    icon: Sparkles,
    title: "Based on Emotional Psychology",
    description: "Combines ancient astrological wisdom with modern emotional pattern analysis.",
  },
  {
    icon: Zap,
    title: "Uses Your Current Energy",
    description: "Your answers capture your present emotional state, ensuring accuracy and relevance.",
  },
  {
    icon: Eye,
    title: "Personalized, Never Generic",
    description: "Each reading is created individually — no templates, no recycled content.",
  },
];

const testimonials = [
  {
    name: "Priya",
    city: "Mumbai",
    text: "The sketch was unbelievably accurate. I felt an instant connection when I saw it. The personality description matched exactly what I've always been drawn to.",
    rating: 5,
  },
  {
    name: "Amit",
    city: "Delhi",
    text: "Worth every penny. This gave me clarity I've been seeking for years. The timing guidance was especially helpful.",
    rating: 5,
  },
  {
    name: "Sneha",
    city: "Bangalore",
    text: "I was skeptical at first, but the level of detail amazed me. It felt like someone truly understood what I was looking for.",
    rating: 5,
  },
];

const paymentSteps = [
  { icon: FileCheck, title: "Payment Confirmed", description: "Your order is securely processed" },
  { icon: Eye, title: "Answers Reviewed", description: "Your quiz responses are analyzed" },
  { icon: Palette, title: "Sketch Created", description: "Your personalized reading is crafted" },
  { icon: Send, title: "Email Delivery", description: "Delivered to your inbox within 24 hours" },
];

const Checkout = () => {
  const router = useRouter();
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // ── NEW: track the saved lead's DB row ID ──────────────────────────
  const [customerId, setCustomerId] = useState<string | null>(null);
  const { initiatePayment, isLoading: isProcessing } = useRazorpay();

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── UPDATED handlePayment ──────────────────────────────────────────
  const handlePayment = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    const quizResponses = JSON.parse(localStorage.getItem("quizAnswers") || "{}");

    // Generate unique session ID for this visit
    const sessionId = crypto.randomUUID();

    // ── Step 1: Save lead to Supabase BEFORE opening Razorpay ────────
    // Captures abandoned users even if they cancel payment
    let savedCustomerId: string | null = null;
    try {
      const res = await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          phone,
          amount: 299,
          quizResponses,
          sessionId,
        }),
      });
      const data = await res.json();
      savedCustomerId = data.customerId || null;
      setCustomerId(savedCustomerId);
      console.log("[Checkout] ✅ Lead saved, customerId:", savedCustomerId);
    } catch (err) {
      // Don't block payment if lead save fails
      console.warn("[Checkout] ⚠️ Lead save failed — continuing anyway:", err);
    }

    // ── Step 2: Open Razorpay with customerId ─────────────────────────
    initiatePayment({
      email,
      name,
      phone:        phone || undefined,
      quizResponses,
      customerId:   savedCustomerId,   // ← links payment to this exact row
      onSuccess: (paymentId) => {
        toast.success("Payment successful! Check your email for your reading.");
        localStorage.removeItem("quizAnswers");
        router.push("/myquiz/quiz-thankyou");
      },
      onFailure: (error) => {
        toast.error(error || "Payment failed. Please try again.");
      },
    });
  };

  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden pb-20 md:pb-0">
      <FloatingElements />
      <Helmet>
        <title>Complete Your Order | Soulmate Sketch</title>
        <meta name="description" content="Your personalized soulmate sketch is ready. Complete your order to receive your digital reading." />
      </Helmet>

      <div className="container px-4 py-10 md:py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-sm font-medium">Your sketch is ready</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-3">
              Your Soulmate Sketch Is Ready
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Complete your order to receive your personalized soulmate sketch & reading.
            </p>
          </motion.div>

          {/* Price Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-8"
          >
            <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-coral/5">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-muted-foreground line-through text-lg">₹1,999</span>
                  <span className="px-2 py-1 rounded-full bg-coral/20 text-coral text-xs font-semibold">75% OFF</span>
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-coral mb-3">
                  ₹299
                </div>
                <p className="text-sm text-coral font-medium mb-4">
                  🎉 Limited time offer — Today only
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-primary" />
                    One-time payment
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-primary" />
                    No subscription
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-primary" />
                    Instant digital delivery
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            id="order-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-lg mx-auto mb-12"
          >
            <Card variant="gradient" className="overflow-hidden border-2 border-primary/20">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-center">
                  Complete Your Order
                </h3>

                {/* Email input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your soulmate sketch will be delivered here
                  </p>
                </div>

                {/* Name input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                {/* Phone input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-12 rounded-xl bg-background border border-border px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Payment button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full group bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Opening Payment…
                      </span>
                    ) : (
                      "Pay ₹449 & Get Report"
                    )}
                  </Button>
                </motion.div>

                <p className="text-xs text-center text-muted-foreground">
                  Takes less than 2 minutes • No physical shipping • One-time payment
                </p>

                <p className="text-xs text-center text-muted-foreground">
                  By proceeding, you agree to our{" "}
                  <Link href="/terms-and-conditions" className="underline hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/refund-policy" className="underline hover:text-primary transition-colors">
                    Refund Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            {/* Trust Strip */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4 text-primary" />
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-4 h-4 text-coral" />
                <span>Instant Digital Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-4 h-4 text-coral" />
                <span>Trusted by 50,000+</span>
              </div>
            </div>
          </motion.div>

          {/* What You'll Receive */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-6">
              What You'll Receive
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {detailedFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Card variant="soft" className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <motion.div
                          className="w-10 h-10 rounded-xl gradient-coral flex items-center justify-center mb-3"
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <feature.icon className="w-5 h-5 text-primary-foreground" />
                        </motion.div>
                        <h3 className="font-semibold text-foreground mb-2 text-sm">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What Happens After Payment */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-8">
              What Happens After Payment?
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="hidden md:flex items-center justify-between">
                {paymentSteps.map((step, index) => (
                  <div key={step.title} className="flex items-center flex-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + index * 0.1 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full gradient-coral flex items-center justify-center mb-3 shadow-lg">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-medium text-foreground mb-1">{step.title}</span>
                      <span className="text-xs text-muted-foreground max-w-[140px]">{step.description}</span>
                    </motion.div>
                    {index < paymentSteps.length - 1 && (
                      <div className="flex-1 h-[2px] bg-gradient-to-r from-coral/40 to-primary/40 mx-4" />
                    )}
                  </div>
                ))}
              </div>

              <div className="md:hidden space-y-4">
                {paymentSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full gradient-coral flex items-center justify-center shadow-lg">
                        <step.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      {index < paymentSteps.length - 1 && (
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-gradient-to-b from-coral/40 to-primary/40" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground block">{step.title}</span>
                      <span className="text-xs text-muted-foreground">{step.description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Why This Works */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-background to-coral/5 p-6 md:p-8 border border-primary/10">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center mb-2">
                Why This Works
              </h2>
              <p className="text-muted-foreground text-center text-sm mb-6 max-w-lg mx-auto">
                Our approach combines time-tested wisdom with your unique emotional signature.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {whyThisWorks.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + index * 0.1 }}
                    className="text-center p-5 rounded-xl bg-background/60 border border-border/50"
                  >
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 border border-coral/20 mb-3">
                <Star className="w-4 h-4 fill-coral text-coral" />
                <span className="text-sm font-medium text-coral">4.8/5 based on 50,000+ users worldwide</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold">
                What Our Users Say
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full">
                    <CardContent className="p-5">
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-coral text-coral" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                        </div>
                        <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          Verified User
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Sticky CTA Button */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden"
          >
            <Button
              variant="hero"
              size="xl"
              className="w-full shadow-button"
              onClick={scrollToForm}
            >
              <ChevronUp className="w-4 h-4 mr-2" />
              Complete Order — ₹299
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
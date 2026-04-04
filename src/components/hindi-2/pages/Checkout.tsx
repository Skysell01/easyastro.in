import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/hindi-2/Header";
import { ArrowLeft, Shield, Clock, CheckCircle, Loader2 } from "lucide-react";

import Image from "next/image";
import Testimonials from "@/components/hindi-2/Testimonials";
import PastWork from "@/components/hindi-2/PastWork";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    gender: "",
  });

  const [addOns, setAddOns] = useState({
    personalizedWealth: false,
    successReport: false,
    careerEbook: false,
  });

  const basePrice = 2289;
  const discount = 2040;
  const addOnPrice = 249;
  const selectedAddOnsCount = Object.values(addOns).filter(Boolean).length;
  const finalPrice = basePrice - discount + selectedAddOnsCount * addOnPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // const saveOrderToDatabase = async () => {
  //   // Build product type string
  //   const products = ["सोलमेट स्केच + प्रेम रीडिंग"];
  //   if (addOns.personalizedWealth) products.push("वेल्थ रिपोर्ट");
  //   if (addOns.successReport) products.push("सफलता रिपोर्ट");
  //   if (addOns.careerEbook) products.push("करियर ई-बुक");

  //   const { error } = await supabase.from("orders").insert({
  //     full_name: formData.fullName,
  //     email: formData.email,
  //     date_of_birth: formData.birthDate || null,
  //     time_of_birth: formData.birthTime || "Unknown",
  //     place_of_birth: formData.birthPlace || null,
  //     product_type: products.join(", "),
  //     amount: finalPrice,
  //     payment_status: "pending",
  //   });

  //   if (error) {
  //     console.error("Error saving order:", error);
  //     return false;
  //   }
  //   return true;
  // };

  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePayment = async () => {
    // Validate form - email is required for payment verification
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast({
        title: "कृपया सभी आवश्यक जानकारी भरें",
        description: "नाम, ईमेल और फोन नंबर आवश्यक हैं।",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Save order to database first
      // const saved = await saveOrderToDatabase();
      // if (!saved) {
      //   toast({
      //     title: "ऑर्डर सेव करने में समस्या हुई",
      //     description: "कृपया दोबारा प्रयास करें।",
      //     variant: "destructive",
      //   });
      //   setIsProcessing(false);
      //   return;
      // }

      const loaded = await loadRazorpay();
      if (!loaded) {
        toast({
          title: "पेमेंट लोड करने में समस्या हुई",
          description: "कृपया पेज रिफ्रेश करें और दोबारा प्रयास करें।",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Create Razorpay order via edge function
      // const { data: orderData, error: orderError } = await supabase.functions.invoke("create-razorpay-order", {
      //   body: {
      //     amount: finalPrice,
      //     currency: "INR",
      //     receipt: `order_${Date.now()}`,
      //     notes: {
      //       customer_name: formData.fullName,
      //       customer_email: formData.email,
      //     },
      //   },
      // });

      // if (orderError || !orderData?.orderId) {
      //   console.error("Error creating Razorpay order:", orderError || orderData);
      //   toast({
      //     title: "ऑर्डर बनाने में समस्या हुई",
      //     description: "कृपया दोबारा प्रयास करें।",
      //     variant: "destructive",
      //   });
      //   setIsProcessing(false);
      //   return;
      // }

      // const options = {
      //   key: orderData.keyId,
      //   amount: orderData.amount,
      //   currency: orderData.currency,
      //   order_id: orderData.orderId,
      //   name: "Soulmap Creations",
      //   description: "सोलमेट स्केच + प्रेम रीडिंग",
      //   handler: async function (response: any) {
      //     // Payment successful - verify and update order
      //     console.log("Payment successful:", response);
      //     setIsVerifying(true);

      //     try {
      //       const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
      //         "verify-razorpay-payment",
      //         {
      //           body: {
      //             razorpay_order_id: response.razorpay_order_id,
      //             razorpay_payment_id: response.razorpay_payment_id,
      //             razorpay_signature: response.razorpay_signature,
      //             order_email: formData.email,
      //           },
      //         },
      //       );

      //       if (verifyError || !verifyData?.verified) {
      //         console.error("Payment verification failed:", verifyError || verifyData);
      //         setIsVerifying(false);
      //         toast({
      //           title: "पेमेंट वेरिफिकेशन में समस्या",
      //           description: "कृपया सपोर्ट से संपर्क करें।",
      //           variant: "destructive",
      //         });
      //         return;
      //       }

      //       navigate("/thank-you");
      //     } catch (err) {
      //       console.error("Verification error:", err);
      //       // Still redirect as payment was successful
      //       navigate("/thank-you");
      //     }
      //   },
      //   prefill: {
      //     name: formData.fullName,
      //     email: formData.email,
      //     contact: formData.phone,
      //   },
      //   theme: {
      //     color: "#C04B72",
      //   },
      //   modal: {
      //     ondismiss: function () {
      //       toast({
      //         title: "पेमेंट रद्द किया गया",
      //         description: "आप फिर से प्रयास कर सकते हैं।",
      //       });
      //     },
      //   },
      // };

      // const razorpay = new window.Razorpay(options);
      // razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "कुछ गलत हुआ",
        description: "कृपया दोबारा प्रयास करें।",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Verification Loading Overlay */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4"
          >
            <div className="flex justify-center mb-4">
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">पेमेंट वेरिफाई हो रहा है...</h3>
            <p className="text-gray-600">कृपया प्रतीक्षा करें, आपको जल्द ही रीडायरेक्ट किया जाएगा।</p>
          </motion.div>
        </div>
      )}

      <Helmet>
        <title>चेकआउट - सोलमेट स्केच | EasyAstro</title>
        <meta name="description" content="अपनी सोलमेट स्केच के लिए ऑर्डर पूरा करें।" />
      </Helmet>

      <div className="min-h-screen bg-muted">
        <Header />

        <main className="container-narrow section-padding">
          {/* Back button */}
          <button
            onClick={() => router.push("/hindi-2")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            वापस जाएं
          </button>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-pink-100"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* प्रोडक्ट इमेज */}
              <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src="/hindi-2/firstImg.png" width={500} height={500} alt="Soulmate Sketch" className="w-full h-full object-cover" />
              </div>

              {/* कंटेंट सेक्शन */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">सोलमेट स्केच (Soulmate Sketch)</h2>
                <p className="text-gray-500 mb-4">अपने जीवनसाथी के चेहरे का विस्तृत स्केच प्राप्त करें</p>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-pink-500">❤️</span> विस्तृत चेहरे की विशेषताएं
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-pink-500">❤️</span> व्यक्तित्व की गहरी जानकारी
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-pink-500">❤️</span> मिलने की समयसीमा (Timeline)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-pink-500">❤️</span> अनुकूलता विश्लेषण (Compatibility)
                  </li>
                </ul>

                <hr className="my-4 border-gray-100" />

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-pink-600">₹249</span>
                  <span className="text-gray-400 line-through text-lg">₹1999</span>
                  <span className="text-green-600 font-medium text-sm bg-green-50 px-2 py-0.5 rounded">86% OFF</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border"
            >
              <h1 className="text-2xl font-bold text-foreground mb-6">अपनी जानकारी दें</h1>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Label htmlFor="fullName">पूरा नाम *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="आपका पूरा नाम"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">ईमेल *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">फोन नंबर *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="birthDate">जन्म तिथि (वैकल्पिक)</Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthTime">जन्म समय (वैकल्पिक)</Label>
                    <Input
                      id="birthTime"
                      name="birthTime"
                      type="time"
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="birthPlace">जन्म स्थान (वैकल्पिक)</Label>
                  <Input
                    id="birthPlace"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleInputChange}
                    placeholder="शहर का नाम"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">लिंग (वैकल्पिक)</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">चुनें</option>
                    <option value="male">पुरुष</option>
                    <option value="female">महिला</option>
                    <option value="other">अन्य</option>
                  </select>
                </div>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Add-ons */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">वैकल्पिक ऐड-ऑन</h2>

                {/* कार्ड 1: पर्सनलाइज्ड वेल्थ रिपोर्ट */}
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${
                    addOns.personalizedWealth ? "border-primary bg-secondary" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setAddOns((prev) => ({ ...prev, personalizedWealth: !prev.personalizedWealth }))}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={addOns.personalizedWealth} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">पर्सनलाइज्ड वेल्थ रिपोर्ट</span>
                        <span className="text-foreground font-semibold">₹99</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        अपनी आर्थिक स्थिति और भाग्य के बारे में जानें।
                      </p>
                    </div>
                  </div>
                </div>

                {/* कार्ड 2: धन और सफलता रिपोर्ट */}
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all mb-3 ${
                    addOns.successReport ? "border-primary bg-secondary" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setAddOns((prev) => ({ ...prev, successReport: !prev.successReport }))}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={addOns.successReport} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">धन और सफलता रिपोर्ट</span>
                        <span className="text-foreground font-semibold">₹99</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        यह रिपोर्ट आपके कर्मों को आपके भाग्य के साथ जोड़ने और समृद्धि का मार्ग दिखाने में मदद करती है।
                      </p>
                    </div>
                  </div>
                </div>

                {/* कार्ड 3: लाइफ पाथ और करियर गाइडेंस ई-बुक */}
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    addOns.careerEbook ? "border-primary bg-secondary" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setAddOns((prev) => ({ ...prev, careerEbook: !prev.careerEbook }))}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox checked={addOns.careerEbook} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">लाइफ पाथ और करियर गाइडेंस ई-बुक</span>
                        <span className="text-foreground font-semibold">₹99</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        यह ई-बुक आपके कर्मों को आपके भाग्य के साथ जोड़ने और समृद्धि पाने में आपकी मदद करेगी।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{basePrice.toLocaleString()}</span>
                  </div>

                  {/* Discount */}
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>

                  {/* डायनामिक ऐड-ऑन लिस्ट: जो सिलेक्ट होगा वही यहाँ दिखेगा */}
                  {addOns.personalizedWealth && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>वेल्थ रिपोर्ट</span>
                      <span>₹99</span>
                    </div>
                  )}

                  {addOns.successReport && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>सफलता रिपोर्ट</span>
                      <span>₹99</span>
                    </div>
                  )}

                  {addOns.careerEbook && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>करियर ई-बुक</span>
                      <span>₹99</span>
                    </div>
                  )}

                  {/* Total Price Section */}
                  <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{finalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-success" />
                  सुरक्षित पेमेंट
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  24 घंटे में डिलीवरी
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                  100% गारंटी
                </span>
              </div>

              {/* Payment button */}
              <Button
                onClick={handlePayment}
                className="w-full btn-primary text-lg py-6"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? "प्रोसेसिंग..." : `पेमेंट करें - ₹${finalPrice}`}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                पेमेंट करके आप हमारी सेवा की शर्तों से सहमत होते हैं।
              </p>
            </motion.div>
          </div>
          <Testimonials showCTA={false} />
          <PastWork showCTA={false} />
        </main>
      </div>
    </>
  );
};

export default Checkout;

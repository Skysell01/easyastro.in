// "use client";
// import Header from "@/components/layout/header";
// import Footer from "@/components/layout/footer";
// import CartHeader from "@/components/cart/cart-header";
// import CartContent from "@/components/cart/cart-content";
// import { useState, useEffect } from "react";
// import TestimonialsSection from "@/components/sections/testimonials";
// import GallerySection from "@/components/sections/gallery";
// import { BACKEND_URL } from "@/lib/backendUrl";
// import { useRouter } from 'next/navigation';
// import { cartSupabase } from "@component/hindi-supabase/integration/supabase";
// // // @ts-ignore
// // import { load } from "@cashfreepayments/cashfree-js";
// // Mock data for demonstration
// const mockCartItems = [
//   {
//     id: "1",
//     name: "Soulmate Sketch",
//     description: "Get a detailed sketch of your soulmate's face",
//     price:199,
//     originalPrice: 1999,
//     features: [
//       "Detailed facial features",
//       "Personality insights",
//       "Meeting timeline",
//       "Compatibility analysis",
//     ],
//   },
// ];
// const mockAdditionalProducts = [
//   {
//     id: "add-1",
//     title: "2-Year Personal Horoscope Report",
//     description:
//       "Get a roadmap of your next 24 months based on your unique birth chart. Know what's coming in love, career, money & health — so you can plan smarter.",
//     price: 99,
//     originalPrice: 299,
//     features: [
//       "Month-by-Month Predictions",
//       "Love & Marriage Forecast",
//       "Career & Wealth Cycles",
//       "Lucky Days & Time Windows",
//       "Remedies & Do's/Don'ts",
//     ],
//   },
//   {
//     id: "add-2",
//     title: "Wealth Report",
//     description:
//       "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
//     price: 99,
//     originalPrice: 299,
//     features: [
//       "Personalized astrology + numerology-based wealth blueprint",
//       "Career timing, money blocks & success windows",
//       "Delivered as a digital report within 48 hours",
//       "Based on Vedic astrology",
//       "Instant delivery to WhatsApp or Email",
//     ],
//   },
//   {
//     id: "add-3",
//     title: "Life path & Career guidance ebook",
//     description:
//       "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
//     price: 99,
//     originalPrice: 249,
//     features: [
//       "Discover your ideal career path",
//       "Align goals with your life purposes",
//       "Strength-based tips to grow faster",
//       "Avoid burnout by knowing what doesn't suit you",
//     ],
//   },
// ];
// export default function CartPage() {
//   const router = useRouter();
//   const [animateElements, setAnimateElements] = useState(false);
//   const [cartItems, setCartItems] = useState(mockCartItems);
//   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//   const [isCheckingOut, setIsCheckingOut] = useState(false);
//   // const [sdkInitialized, setSdkInitialized] = useState(false);
//   // const [cashfree, setCashfree] = useState<any>(null);
//   const [consultationFormData, setConsultationFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     placeOfBirth: "",
//     gender: "",
//   });
//   const [finalAmount, setFinalAmount] = useState(0);
//   // Calculate totals
//   const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
//   const subtotalWithMRP = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
//   const additionalTotal = selectedProducts.reduce((sum, productId) => {
//     const product = mockAdditionalProducts.find((p) => p.id === productId);
//     return sum + (product?.price || 0);
//   }, 0);
//   const additionalTotalWithMRP = selectedProducts.reduce((sum, productId) => {
//     const product = mockAdditionalProducts.find((p) => p.id === productId);
//     return sum + (product?.originalPrice || 0);
//   }, 0);
//   const total = subtotal + additionalTotal;
//   const totalWithMRP = subtotalWithMRP + additionalTotalWithMRP;
//   const discount =
//     cartItems.reduce(
//       (sum, item) => sum + (item.originalPrice - item.price),
//       0
//     ) +
//     selectedProducts.reduce((sum, productId) => {
//       const product = mockAdditionalProducts.find((p) => p.id === productId);
//       return sum + ((product?.originalPrice || 0) - (product?.price || 0));
//     }, 0);
//   const discountWithMRP =
//     cartItems.reduce(
//       (sum, item) => sum + (item.originalPrice - item.price),
//       0
//     ) +
//     selectedProducts.reduce((sum, productId) => {
//       const product = mockAdditionalProducts.find((p) => p.id === productId);
//       return sum + ((product?.originalPrice || 0) - (product?.price || 0));
//     }, 0);
//   useEffect(() => {
//     // Trigger animations after component mounts
//     const timer = setTimeout(() => {
//       setAnimateElements(true);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const logPath = async () => {
//       try {
//         const indianTime = new Date().toLocaleString("en-IN", {
//           timeZone: "Asia/Kolkata",
//         });
//         await fetch(`${BACKEND_URL}/api/log/log-path`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             path: "cart",
//             timestamp: indianTime,
//           }),
//         });
//       } catch (error) {
//         console.error("Error logging path:", error);
//       }
//     };

//     logPath();
//   }, []);

//   const removeItem = (id: string) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };
//   const onProductToggle = (productId: string) => {
//     setSelectedProducts((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };
//   const loadScript = (src: string) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };
//     // useEffect(() => {
//     // initializeSDK();
//   // }, []);

//   useEffect(() => {
//     loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
//       (result) => {
//         if (result) {
//           console.log("Razorpay script loaded successfully");
//         }
//       }
//     );
//   }, []);

//    // // Initialize Cashfree SDK
//   // const initializeSDK = async () => {
//   //   try {
//   //     const cashfreeInstance = await load({
//   //       // mode: "sandbox", // Change to "production" for live environment
//   //       mode: "production",
//   //     });
//   //     setCashfree(cashfreeInstance);
//   //     setSdkInitialized(true);
//   //     console.log("Cashfree SDK initialized successfully");
//   //   } catch (error) {
//   //     console.error("Failed to initialize Cashfree SDK:", error);
//   //     alert("Failed to initialize payment system");
//   //     setSdkInitialized(false);
//   //   }
//   // };
//   const handleConsultationFormSubmit = (data: any) => {
//     console.log("Consultation form submitted:", data);
//     // Handle form submission
//   };
//   const sendAbandonedUserToAutomation = async () => {
//   try {
//     const [firstName, ...restName] = (consultationFormData?.name || "")
//       .trim()
//       .split(" ");
//     const lastName = restName.join(" ");

//     await fetch(
//       "https://automations.chatsonway.com/webhook/6927f8681b9845c02d57070d",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName: firstName || "",
//           lastName: lastName || "",
//           dob: consultationFormData?.dateOfBirth || "",
//           placeOfBirth: consultationFormData?.placeOfBirth || "",
//           phoneNumber: consultationFormData?.phoneNumber || "",
//           email: consultationFormData?.email || "",
//           is: "abandoned", 
//         }),
//       }
//     );

//     console.log("Abandoned user sent to automation");
//   } catch (error) {
//     console.error("Failed to send abandoned user to automation:", error);
//   }
// };

//   const handleCheckout = async () => {
//     try {
//       setIsCheckingOut(true);
//       // 1) Create ABD (abandoned) order first
//       const abdOrderResponse = await fetch(
//         `${BACKEND_URL}/api/lander3/create-order-abd`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount: finalAmount,
//             name: consultationFormData?.name,
//             email: consultationFormData?.email,
//             phone: consultationFormData?.phoneNumber,
//             dateOfBirth: consultationFormData?.dateOfBirth,
//             placeOfBirth: consultationFormData?.placeOfBirth,
//             gender: consultationFormData?.gender,
//             additionalProducts: selectedProducts
//               .map((id) => {
//                 const product = mockAdditionalProducts.find((p) => p.id === id);
//                 return product?.title || "";
//               })
//               .filter(Boolean),
//           }),
//         }
//       );
//       const abdOrderResult = await abdOrderResponse.json();
//       const abdOrderId = abdOrderResult?.data?._id;
//       if (!abdOrderResult?.success) {
//         throw new Error("Failed to create ABD order");
//       }
//       console.log("Abandoned Order Created with Id", abdOrderId);

//       // // 2) Create Cashfree payment session
//       // const additionalProductsTitles = selectedProducts
//       //   .map((id) => {
//       //     const product = mockAdditionalProducts.find((p) => p.id === id);
//       //     return product?.title || "";
//       //   })
//       //   .filter(Boolean);

//       // const cashfreeResponse = await fetch(
//       //   `${BACKEND_URL}/api/payment/create-session`,
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify({
//       //       amount: finalAmount,
//       //       fullName: consultationFormData?.name || "Customer",
//       //       email: consultationFormData?.email || "customer@example.com",
//       //       phoneNumber: consultationFormData?.phoneNumber || "9876543210",
//       //       dateOfBirth: consultationFormData?.dateOfBirth || "",
//       //       placeOfBirth: consultationFormData?.placeOfBirth || "",
//       //       gender: consultationFormData?.gender || "",
//       //       additionalProducts: additionalProductsTitles,
//       //     }),
//       //   }
//       // );
//       // const cashfreeResult = await cashfreeResponse.json();

//       // console.log("Cashfree session creation response:", cashfreeResult);
//       // console.log("Cashfree session creation response success flag:", cashfreeResult?.data);

//       // console.log("Cashfree session creation response data:", cashfreeResult?.data?.payment_session_id);
//       // if (!cashfreeResult?.data || !cashfreeResult?.data?.payment_session_id) {
//       //   throw new Error("Failed to create Cashfree payment session");
//       // }
      
//       // // Redirect to Cashfree checkout
//       // const paymentSessionId = cashfreeResult.data.payment_session_id;
//       // const orderId = cashfreeResult.data.order_id;

//       // sessionStorage.setItem("cashfree_order_id", orderId);
//       // sessionStorage.setItem("orderAmount", finalAmount.toString());

//       // // Open Cashfree checkout
//       // if (!cashfree) {
//       //   throw new Error("Cashfree SDK not initialized");
//       // }
      
//       // const checkoutOptions = {
//       //   paymentSessionId,
//       //   redirectTarget: "_self",
//       //   onSuccess: async function (data: any) {
//       //     console.log("Cashfree payment successful:", data);
          
//       //     try {
//       //       // Create order in database
//       //       const orderResponse = await fetch(
//       //         `${BACKEND_URL}/api/lander3/create-order`,
//       //         {
//       //           method: "POST",
//       //           headers: {
//       //             "Content-Type": "application/json",
//       //           },
//       //           body: JSON.stringify({
//       //             amount: finalAmount,
//       //             cashfreeOrderId: data.order?.orderId || orderId,
//       //             cashfreePaymentId: data.paymentDetails?.paymentId || "",
//       //             name: consultationFormData?.name,
//       //             email: consultationFormData?.email,
//       //             phone: consultationFormData?.phoneNumber,
//       //             dateOfBirth: consultationFormData?.dateOfBirth,
//       //             placeOfBirth: consultationFormData?.placeOfBirth,
//       //             gender: consultationFormData?.gender,
//       //             orderId: orderId,
//       //             additionalProducts: selectedProducts
//       //               .map((id) => {
//       //                 const product = mockAdditionalProducts.find(
//       //                   (p) => p.id === id
//       //                 );
//       //                 return product?.title || "";
//       //               })
//       //               .filter(Boolean),
//       //           }),
//       //         }
//       //       );
//       //       const orderResult = await orderResponse.json();
            
//       //       if (orderResult.success) {
//       //         // Prepare order confirmation URL with parameters
//       //         const confirmationParams = new URLSearchParams({
//       //           orderId: orderId,
//       //           orderType: "Soulmate Sketch", 
//       //           fullName: consultationFormData?.name || "Customer",
//       //           email: consultationFormData?.email || "",
//       //           phoneNumber: consultationFormData?.phoneNumber || "",
//       //           amount: finalAmount.toString(),
//       //           profession: "",
//       //           remarks: "",
//       //         });
              

//       //         // Store in sessionStorage as fallback
//       //         sessionStorage.setItem("orderId", orderId);
//       //         sessionStorage.setItem("orderAmount", finalAmount.toString());
              
//       //         // Send webhook notification
//       //         try {
//       //           await fetch('https://automations.chatsonway.com/webhook/692049bf1b9845c02d52d83b', {
//       //             method: 'POST',
//       //             headers: {
//       //               'Content-Type': 'application/json',
//       //             },
//       //             body: JSON.stringify({
//       //               amount: finalAmount,
//       //               name: consultationFormData?.name || "",
//       //               email: consultationFormData?.email || "",
//       //               phone: consultationFormData?.phoneNumber || "",
//       //               dateOfBirth: consultationFormData?.dateOfBirth || "",
//       //               placeOfBirth: consultationFormData?.placeOfBirth || "",
//       //               gender: consultationFormData?.gender || "",
//       //               additionalProducts: selectedProducts
//       //                 .map((id) => {
//       //                   const product = mockAdditionalProducts.find((p) => p.id === id);
//       //                   return product?.title || "";
//       //                 })
//       //                 .filter(Boolean),
//       //               isChatsonorderSuccessfull: "Order Successfull"
//       //             })
//       //           });
//       //           console.log("Webhook notification sent successfully");
//       //         } catch (error) {
//       //           console.error("Failed to send webhook notification:", error);
//       //         }
              
//       //         // Delete abandoned order
//       //         const deleteAbdOrder = await fetch(
//       //           `${BACKEND_URL}/api/lander3/delete-order-abd`,
//       //           {
//       //             method: "DELETE",
//       //             headers: {
//       //               "Content-Type": "application/json",
//       //             },
//       //             body: JSON.stringify({ email: consultationFormData?.email }),
//       //           }
//       //         );
//       //         const deleteAbdOrderResult = await deleteAbdOrder.json();
//       //         console.log("Abandoned Order Deleted", deleteAbdOrderResult);
              
//       //         // Redirect to success page with order details
//       //         window.location.href = `/order-confirmation?${confirmationParams.toString()}`;
//       //       } else {
//       //         alert("Payment successful but order creation failed. Please contact support.");
//       //       }
//       //     } catch (error) {
//       //       console.error("Error creating order:", error);
//       //       alert("Payment successful but order creation failed. Please contact support.");
//       //     }
//       //   },
//       //   onFailure: function (data: any) {
//       //     console.log("Cashfree payment failed:", data);
//       //     alert("Payment failed. Please try again.");
//       //   }
//       // };
      
//       // cashfree.checkout(checkoutOptions);

//       /* PAYU CODE - COMMENTED OUT
//       const params = new URLSearchParams({
//         amount: String(finalAmount || 0),
//         productinfo: "Soulmate Sketch Order",
//         name: consultationFormData?.name || "Customer",
//         email: consultationFormData?.email || "customer@example.com",
//         phone: consultationFormData?.phoneNumber || "9876543210",
//         dateOfBirth: consultationFormData?.dateOfBirth || "",
//         placeOfBirth: consultationFormData?.placeOfBirth || "",
//         gender: consultationFormData?.gender || "",
//         additionalProducts: additionalProductsTitles.join(","),
//       });

//       const payuUrl = `${BACKEND_URL}/api/payu/pay?${params.toString()}`;
//       router.push(payuUrl);
//       END PAYU CODE */

//       // Create Razorpay order
//       const response = await fetch(`${BACKEND_URL}/api/payment/razorpay`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: finalAmount,
//         }),
//       });
//       const result = await response.json();
//       if (!result.success) {
//         throw new Error("Failed to create payment order");
//       }
//       const data = result.data;
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//         amount: finalAmount,
//         currency: "INR",
//         name: "EasyAstro",
//         description: "Soulmate Sketch Order Payment",
//         order_id: data.orderId,
//         handler: async function (response: any) {
//           try {
//             // Create order in database
//             const orderResponse = await fetch(
//               `${BACKEND_URL}/api/lander3/create-order`,
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   amount: finalAmount,
//                   razorpayOrderId: response.razorpay_order_id,
//                   razorpayPaymentId: response.razorpay_payment_id,
//                   razorpaySignature: response.razorpay_signature,
//                   name: consultationFormData?.name,
//                   email: consultationFormData?.email,
//                   phone: consultationFormData?.phoneNumber,
//                   dateOfBirth: consultationFormData?.dateOfBirth,
//                   placeOfBirth: consultationFormData?.placeOfBirth,
//                   gender: consultationFormData?.gender,
//                   orderId: data.orderId,
//                   additionalProducts: selectedProducts
//                     .map((id) => {
//                       const product = mockAdditionalProducts.find(
//                         (p) => p.id === id
//                       );
//                       return product?.title || "";
//                     })
//                     .filter(Boolean),
//                 }),
//               }
//             );
//             const orderResult = await orderResponse.json();
//             if (orderResult.success) {
//               sessionStorage.setItem("orderId", data.orderId);
//               sessionStorage.setItem("orderAmount", finalAmount.toString());
//               try {
//                 await fetch('https://automations.chatsonway.com/webhook/692049bf1b9845c02d52d83b', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({
//                     amount: finalAmount,
//                     name: consultationFormData?.name || "",
//                     email: consultationFormData?.email || "",
//                     phone: consultationFormData?.phoneNumber || "",
//                     dateOfBirth: consultationFormData?.dateOfBirth || "",
//                     placeOfBirth: consultationFormData?.placeOfBirth || "",
//                     gender: consultationFormData?.gender || "",
//                     additionalProducts: selectedProducts
//                       .map((id) => {
//                         const product = mockAdditionalProducts.find((p) => p.id === id);
//                         return product?.title || "";
//                       })
//                       .filter(Boolean),
//                     isChatsonorderSuccessfull: "Order Successfull"
//                   })
//                 });
//                 console.log("Webhook notification sent successfully");
//               } catch (error) {
//                 console.error("Failed to send webhook notification:", error);
//               }
//               const deleteAbdOrder = await fetch(
//                 `${BACKEND_URL}/api/lander3/delete-order-abd`,
//                 {
//                   method: "DELETE",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ email: consultationFormData?.email }), // send the email here
//                 }
//               );
//               const deleteAbdOrderResult = await deleteAbdOrder.json();
//               console.log("Abandoned Order Deleted", deleteAbdOrderResult);
//               window.location.href = "/order-confirmation";
//             } else {
//               alert(
//                 "Payment successful but order creation failed. Please contact support."
//               );
//             }
//           } catch (error) {
//             console.error("Error creating order:", error);
//             alert(
//               "Payment successful but order creation failed. Please contact support."
//             );
//           }
//         },
//         prefill: {
//           name: consultationFormData?.name,
//           email: consultationFormData?.email,
//           contact: consultationFormData?.phoneNumber,
//         },
//         theme: {
//           color: "#ec4899",
//         },
//         modal: {
//     ondismiss: async () => {
//       console.log("Razorpay modal closed without payment");
//       await sendAbandonedUserToAutomation();
//     },
//   },
//       };
//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setIsCheckingOut(false);
//     }
//   };
//   /* PAYU PAYMENT FUNCTION - COMMENTED OUT
//   const handlePayuPayment = async () => {
//     try {
//       setIsCheckingOut(true);
//       // 1) Create ABD (abandoned) order first
//       const abdOrderResponse = await fetch(
//         `${BACKEND_URL}/api/lander3/create-order-abd`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount: finalAmount,
//             name: consultationFormData?.name,
//             email: consultationFormData?.email,
//             phone: consultationFormData?.phoneNumber,
//             dateOfBirth: consultationFormData?.dateOfBirth,
//             placeOfBirth: consultationFormData?.placeOfBirth,
//             gender: consultationFormData?.gender,
//             additionalProducts: selectedProducts
//               .map((id) => {
//                 const product = mockAdditionalProducts.find((p) => p.id === id);
//                 return product?.title || "";
//               })
//               .filter(Boolean),
//           }),
//         }
//       );
//       const abdOrderResult = await abdOrderResponse.json();
//       const abdOrderId = abdOrderResult?.data?._id;
//       if (!abdOrderResult?.success) {
//         throw new Error("Failed to create ABD order");
//       }
//       console.log("Abandoned Order Created with Id", abdOrderId);

//       // 2) Redirect to PayU with all user-provided details
//       const additionalProductsTitles = selectedProducts
//         .map((id) => {
//           const product = mockAdditionalProducts.find((p) => p.id === id);
//           return product?.title || "";
//         })
//         .filter(Boolean);

//       const params = new URLSearchParams({
//         amount: String(finalAmount || 0),
//         productinfo: "Soulmate Sketch Order",
//         name: consultationFormData?.name || "Customer",
//         email: consultationFormData?.email || "customer@example.com",
//         phone: consultationFormData?.phoneNumber || "9876543210",
//         dateOfBirth: consultationFormData?.dateOfBirth || "",
//         placeOfBirth: consultationFormData?.placeOfBirth || "",
//         gender: consultationFormData?.gender || "",
//         additionalProducts: additionalProductsTitles.join(","),
//       });

//       const payuUrl = `${BACKEND_URL}/api/payu/pay?${params.toString()}`;
//       router.push(payuUrl);
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setIsCheckingOut(false);
//     }
//   }
//   END PAYU PAYMENT FUNCTION */
//   return (
//     <div className="flex flex-col min-h-dvh bg-background text-foreground">
//       <Header />
//       <main className="flex-1">
//         <CartHeader animateElements={animateElements} />
//         <CartContent
//           cartItems={cartItems}
//           additionalProducts={mockAdditionalProducts}
//           selectedProducts={selectedProducts}
//           consultationFormData={consultationFormData}
//           subtotal={subtotal}
//           discount={discount}
//           discountWithMRP={discountWithMRP}
//           totalWithMRP={totalWithMRP}
//           total={total}
//           additionalTotal={additionalTotal}
//           isCheckingOut={isCheckingOut}
//           animateElements={animateElements}
//           onRemove={removeItem}
//           onProductToggle={onProductToggle}
//           onConsultationFormSubmit={handleConsultationFormSubmit}
//           // onCheckout={handleCheckout}
//           onCheckout={handleCheckout}
//           setConsultationFormData={setConsultationFormData}
//           finalAmount={finalAmount}
//           setFinalAmount={setFinalAmount}
//         />
//         <TestimonialsSection isCartPage={true} />
//         <GallerySection isCartPage={true} />
     
//       </main>
//       <Footer />
//     </div>
//   );
//   }


"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartHeader from "@/components/cart/cart-header";
import CartContent from "@/components/cart/cart-content";
import { useState, useEffect } from "react";
import TestimonialsSection from "@/components/sections/testimonials";
import GallerySection from "@/components/sections/gallery";
import { BACKEND_URL } from "@/lib/backendUrl";
import { useRouter } from "next/navigation";
import { cartSupabase } from "@/components/hindi-supabase/integration/supabase/client";

// Mock data for demonstration
const mockCartItems = [
  {
    id: "1",
    name: "Soulmate Sketch",
    description: "Get a detailed sketch of your soulmate's face",
    price: 199,
    originalPrice: 1999,
    features: [
      "Detailed facial features",
      "Personality insights",
      "Meeting timeline",
      "Compatibility analysis",
    ],
  },
];

const mockAdditionalProducts = [
  {
    id: "add-1",
    title: "2-Year Personal Horoscope Report",
    description:
      "Get a roadmap of your next 24 months based on your unique birth chart. Know what's coming in love, career, money & health — so you can plan smarter.",
    price: 99,
    originalPrice: 299,
    features: [
      "Month-by-Month Predictions",
      "Love & Marriage Forecast",
      "Career & Wealth Cycles",
      "Lucky Days & Time Windows",
      "Remedies & Do's/Don'ts",
    ],
  },
  {
    id: "add-2",
    title: "Wealth Report",
    description:
      "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
    price: 99,
    originalPrice: 299,
    features: [
      "Personalized astrology + numerology-based wealth blueprint",
      "Career timing, money blocks & success windows",
      "Delivered as a digital report within 48 hours",
      "Based on Vedic astrology",
      "Instant delivery to WhatsApp or Email",
    ],
  },
  {
    id: "add-3",
    title: "Life path & Career guidance ebook",
    description:
      "Confused about your money, career, or success path? Your birth chart holds powerful insights into what's blocking your abundance. This report helps align your actions with your true financial destiny.",
    price: 99,
    originalPrice: 249,
    features: [
      "Discover your ideal career path",
      "Align goals with your life purposes",
      "Strength-based tips to grow faster",
      "Avoid burnout by knowing what doesn't suit you",
    ],
  },
];

export default function CartPage() {
  const router = useRouter();
  const [animateElements, setAnimateElements] = useState(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [consultationFormData, setConsultationFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
  });
  const [finalAmount, setFinalAmount] = useState(0);

  // ─── Totals ───────────────────────────────────────────────────────────────
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const subtotalWithMRP = cartItems.reduce(
    (sum, item) => sum + item.originalPrice,
    0
  );
  const additionalTotal = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const additionalTotalWithMRP = selectedProducts.reduce((sum, productId) => {
    const product = mockAdditionalProducts.find((p) => p.id === productId);
    return sum + (product?.originalPrice || 0);
  }, 0);
  const total = subtotal + additionalTotal;
  const totalWithMRP = subtotalWithMRP + additionalTotalWithMRP;
  const discount =
    cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price),
      0
    ) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);
  const discountWithMRP =
    cartItems.reduce(
      (sum, item) => sum + (item.originalPrice - item.price),
      0
    ) +
    selectedProducts.reduce((sum, productId) => {
      const product = mockAdditionalProducts.find((p) => p.id === productId);
      return sum + ((product?.originalPrice || 0) - (product?.price || 0));
    }, 0);

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateElements(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const logPath = async () => {
      try {
        const indianTime = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        await fetch(`${BACKEND_URL}/api/log/log-path`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: "cart",
            timestamp: indianTime,
          }),
        });
      } catch (error) {
        console.error("Error logging path:", error);
      }
    };
    logPath();
  }, []);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js").then(
      (result) => {
        if (result) {
          console.log("Razorpay script loaded successfully");
        }
      }
    );
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConsultationFormSubmit = (data: any) => {
    console.log("Consultation form submitted:", data);
  };

  // ─── Abandoned automation webhook ─────────────────────────────────────────
  const sendAbandonedUserToAutomation = async () => {
    try {
      const [firstName, ...restName] = (consultationFormData?.name || "")
        .trim()
        .split(" ");
      const lastName = restName.join(" ");

      await fetch(
        "https://automations.chatsonway.com/webhook/6927f8681b9845c02d57070d",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName || "",
            lastName: lastName || "",
            dob: consultationFormData?.dateOfBirth || "",
            placeOfBirth: consultationFormData?.placeOfBirth || "",
            phoneNumber: consultationFormData?.phoneNumber || "",
            email: consultationFormData?.email || "",
            is: "abandoned",
          }),
        }
      );
      console.log("Abandoned user sent to automation");
    } catch (error) {
      console.error("Failed to send abandoned user to automation:", error);
    }
  };

  // ─── Checkout ─────────────────────────────────────────────────────────────
  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const additionalProducts = selectedProducts
        .map((id) => {
          const product = mockAdditionalProducts.find((p) => p.id === id);
          return product?.title || "";
        })
        .filter(Boolean);

      // ── 1. MongoDB: create abandoned order (UNCHANGED) ───────────────────
      const abdOrderResponse = await fetch(
        `${BACKEND_URL}/api/lander3/create-order-abd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
            name: consultationFormData?.name,
            email: consultationFormData?.email,
            phone: consultationFormData?.phoneNumber,
            dateOfBirth: consultationFormData?.dateOfBirth,
            placeOfBirth: consultationFormData?.placeOfBirth,
            gender: consultationFormData?.gender,
            additionalProducts,
          }),
        }
      );
      const abdOrderResult = await abdOrderResponse.json();
      const abdOrderId = abdOrderResult?.data?._id;
      if (!abdOrderResult?.success) {
        throw new Error("Failed to create ABD order");
      }
      console.log("Abandoned Order Created with Id", abdOrderId);

      // ── 2. Supabase: insert abandoned order ──────────────────────────────
      const { error: abdSupabaseError } = await cartSupabase
        .from("soulmate_orders")
        .insert({
          project_name: "soulmate",
          full_name: consultationFormData?.name,
          email: consultationFormData?.email,
          phone_number: consultationFormData?.phoneNumber,
          date_of_birth: consultationFormData?.dateOfBirth,
          place_of_birth: consultationFormData?.placeOfBirth,
          gender: consultationFormData?.gender,
          amount: finalAmount,
          additional_products: additionalProducts,
          razorpay_order_id: null,
          razorpay_payment_id: null,
          razorpay_signature: null,
          status: "abandoned",
        });
      if (abdSupabaseError) {
        // Non-fatal — log and continue
        console.error(
          "[Supabase] Abandoned insert error:",
          abdSupabaseError.message
        );
      } else {
        console.log("[Supabase] Abandoned order inserted (project: soulmate).");
      }

      // ── 3. Create Razorpay order (UNCHANGED) ─────────────────────────────
      const response = await fetch(`${BACKEND_URL}/api/payment/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
        }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error("Failed to create payment order");
      }
      const data = result.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: finalAmount,
        currency: "INR",
        name: "EasyAstro",
        description: "Soulmate Sketch Order Payment",
        order_id: data.orderId,

        // ── Payment success handler ────────────────────────────────────────
        handler: async function (response: any) {
          try {
            // ── 4a. MongoDB: create confirmed order (UNCHANGED) ───────────
            const orderResponse = await fetch(
              `${BACKEND_URL}/api/lander3/create-order`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: finalAmount,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  name: consultationFormData?.name,
                  email: consultationFormData?.email,
                  phone: consultationFormData?.phoneNumber,
                  dateOfBirth: consultationFormData?.dateOfBirth,
                  placeOfBirth: consultationFormData?.placeOfBirth,
                  gender: consultationFormData?.gender,
                  orderId: data.orderId,
                  additionalProducts,
                }),
              }
            );
            const orderResult = await orderResponse.json();

            if (orderResult.success) {
              sessionStorage.setItem("orderId", data.orderId);
              sessionStorage.setItem("orderAmount", finalAmount.toString());

              // ── 4b. Supabase: insert success order ───────────────────────
              const { error: orderSupabaseError } = await cartSupabase
                .from("soulmate_orders")
                .insert({
                  project_name: "soulmate",
                  full_name: consultationFormData?.name,
                  email: consultationFormData?.email,
                  phone_number: consultationFormData?.phoneNumber,
                  date_of_birth: consultationFormData?.dateOfBirth,
                  place_of_birth: consultationFormData?.placeOfBirth,
                  gender: consultationFormData?.gender,
                  amount: finalAmount,
                  additional_products: additionalProducts,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  status: "success",
                });
              if (orderSupabaseError) {
                // Non-fatal — payment succeeded, don't block user
                console.error(
                  "[Supabase] Success insert error:",
                  orderSupabaseError.message
                );
              } else {
                console.log(
                  "[Supabase] Success order inserted (project: soulmate)."
                );
              }

              // ── 5. Chatsonway webhook (UNCHANGED) ────────────────────────
              try {
                await fetch(
                  "https://automations.chatsonway.com/webhook/692049bf1b9845c02d52d83b",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      amount: finalAmount,
                      name: consultationFormData?.name || "",
                      email: consultationFormData?.email || "",
                      phone: consultationFormData?.phoneNumber || "",
                      dateOfBirth: consultationFormData?.dateOfBirth || "",
                      placeOfBirth: consultationFormData?.placeOfBirth || "",
                      gender: consultationFormData?.gender || "",
                      additionalProducts,
                      isChatsonorderSuccessfull: "Order Successfull",
                    }),
                  }
                );
                console.log("Webhook notification sent successfully");
              } catch (error) {
                console.error("Failed to send webhook notification:", error);
              }

              // ── 6. MongoDB: delete abandoned order (UNCHANGED) ───────────
              const deleteAbdOrder = await fetch(
                `${BACKEND_URL}/api/lander3/delete-order-abd`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email: consultationFormData?.email }),
                }
              );
              const deleteAbdOrderResult = await deleteAbdOrder.json();
              console.log("Abandoned Order Deleted", deleteAbdOrderResult);

              window.location.href = "/order-confirmation";
            } else {
              alert(
                "Payment successful but order creation failed. Please contact support."
              );
            }
          } catch (error) {
            console.error("Error creating order:", error);
            alert(
              "Payment successful but order creation failed. Please contact support."
            );
          }
        },

        prefill: {
          name: consultationFormData?.name,
          email: consultationFormData?.email,
          contact: consultationFormData?.phoneNumber,
        },
        theme: {
          color: "#ec4899",
        },

        // ── Modal dismissed — Supabase abandoned row already inserted (step 2)
        modal: {
          ondismiss: async () => {
            console.log("Razorpay modal closed without payment");
            await sendAbandonedUserToAutomation();
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <CartHeader animateElements={animateElements} />
        <CartContent
          cartItems={cartItems}
          additionalProducts={mockAdditionalProducts}
          selectedProducts={selectedProducts}
          consultationFormData={consultationFormData}
          subtotal={subtotal}
          discount={discount}
          discountWithMRP={discountWithMRP}
          totalWithMRP={totalWithMRP}
          total={total}
          additionalTotal={additionalTotal}
          isCheckingOut={isCheckingOut}
          animateElements={animateElements}
          onRemove={removeItem}
          onProductToggle={onProductToggle}
          onConsultationFormSubmit={handleConsultationFormSubmit}
          onCheckout={handleCheckout}
          setConsultationFormData={setConsultationFormData}
          finalAmount={finalAmount}
          setFinalAmount={setFinalAmount}
        />
        <TestimonialsSection isCartPage={true} />
        <GallerySection isCartPage={true} />
      </main>
      <Footer />
    </div>
  );
}

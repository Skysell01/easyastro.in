import type { Metadata } from "next";
import "./globals.css";
import "./styles/index.css"
import "./styles/App.css"
import { Toaster } from "@/components/ui/toaster";
import { Alegreya, Belleza } from "next/font/google";
import Script from "next/script";
import React from "react";

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

const belleza = Belleza({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-belleza",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soulmap",
  description:
    "Discover your soulmate's face today with a personalized sketch from our gifted psychics.",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${belleza.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        {/* ================= META PIXEL ================= */}
        {/* <Script id="meta-pixel-base" strategy="afterInteractive">
          {`
            (function(){
             !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2055279592036652');


            })();
          `}
        </Script> */}
        


        

        {/* ========== SPA PAGEVIEW TRACKER (deduped) ========== */}
        {/* <Script id="meta-pixel-spa-pageview" strategy="afterInteractive">
          {`
            (function () {
              function safeTrack() {
                try {
                  if (!window.fbq) return;
                  var url = location.href;
                  if (window.__lastFbqPV === url) return;
                  window.__lastFbqPV = url;
                  window.fbq('track', 'PageView');
                } catch (e) {}
              }

              function init(attempt) {
                if (window.fbq) {
                  safeTrack();

                  var _pushState = history.pushState;
                  var _replaceState = history.replaceState;

                  history.pushState = function () {
                    _pushState.apply(this, arguments);
                    safeTrack();
                  };

                  history.replaceState = function () {
                    _replaceState.apply(this, arguments);
                    safeTrack();
                  };

                  window.addEventListener('popstate', safeTrack);
                  return;
                }

                if (attempt < 60) {
                  setTimeout(function () {
                    init(attempt + 1);
                  }, 100);
                }
              }

              init(0);
            })();
          `}
        </Script> */}

        {/* ================= CAPI HELPER (server call) ================= */}
        <Script id="meta-capi-helper" strategy="afterInteractive">
          {`
            (function () {
              function getCookie(name) {
                try {
                  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                  return match ? decodeURIComponent(match[2]) : null;
                } catch (e) { return null; }
              }

              function setCookie(name, value, days) {
                try {
                  var d = new Date();
                  d.setTime(d.getTime() + (days*24*60*60*1000));
                  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
                } catch (e) {}
              }

              // Capture fbclid -> fbc (recommended when available)
              function ensureFbc() {
                try {
                  var url = new URL(window.location.href);
                  var fbclid = url.searchParams.get("fbclid");
                  if (!fbclid) return;
                  // Meta format often used: "fb.1.<timestamp>.<fbclid>"
                  var fbc = "fb.1." + Math.floor(Date.now() / 1000) + "." + fbclid;
                  setCookie("_fbc", fbc, 90);
                } catch (e) {}
              }

              ensureFbc();

              function uuid() {
                // modern browsers have crypto.randomUUID
                if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
                // fallback
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
                  var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                  return v.toString(16);
                });
              }

              async function sendCapi(payload) {
                try {
                  // keepalive helps on quick navigations
                  await fetch("/api/meta", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(payload),
                    keepalive: true
                  });
                } catch (e) {}
              }

              // Public function you can call anywhere:
              // window.metaTrack("Lead", {value: 1, currency: "USD"}, {email, phone})
              window.metaTrack = function(eventName, customData, user) {
                try {
                  var eventId = uuid();

                  // 1) Browser event (Pixel)
                  // if (window.fbq) {
                  //   window.fbq('track', eventName, customData || {}, { eventID: eventId });
                  // }
                   if (window.fbq) {
      window.fbq('track', eventName, customData || {}, { eventID: eventId });
    }

                  // 2) Server event (CAPI) with same event_id for dedup
                  // var fbp = getCookie("_fbp");
                  // var fbc = getCookie("_fbc");
                  var fbp = getCookie("_fbp");
    var fbc = getCookie("_fbc");

                  var payload = {
                    event_name: eventName,
                     event_id: eventId, 
                    action_source: "website",
                    event_source_url: window.location.href,
                    custom_data: customData || {},
                    user: user || {},
                    fbp: fbp || undefined,
                    fbc: fbc || undefined
                  };

                  sendCapi(payload);
                  return eventId;
                } catch (e) {
                  return null;
                }
              };

              // Auto: send CAPI PageView alongside Pixel PageView (deduped)
              // (Pixel already fires PageView; we mirror it to server)
              // Avoid flooding: only once per URL
              (function(){
                var last = null;
                function capiPV() {
                  try {
                    var url = location.href;
                    if (last === url) return;
                    last = url;
                    window.metaTrack("PageView", {}, {});
                  } catch (e) {}
                }

                // initial
                capiPV();

                // hook SPA navigation
                var _pushState = history.pushState;
                var _replaceState = history.replaceState;

                history.pushState = function () {
                  _pushState.apply(this, arguments);
                  capiPV();
                };
                history.replaceState = function () {
                  _replaceState.apply(this, arguments);
                  capiPV();
                };
                window.addEventListener("popstate", capiPV);
              })();
            })();
          `}
        </Script>

        {/* ================= noscript fallback ================= */}
       <noscript><img height="1" width="1" style={{display:"none"}}
src="https://www.facebook.com/tr?id=2055279592036652&ev=PageView&noscript=1"
/></noscript>

        {children}
        <Toaster />
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import "./globals.css";
// import "./styles/index.css";
// import "./styles/App.css";
// import { Toaster } from "@/components/ui/toaster";
// import { Alegreya, Belleza } from "next/font/google";
// import Script from "next/script";
// import React from "react";

// const alegreya = Alegreya({
//   subsets: ["latin"],
//   variable: "--font-alegreya",
//   display: "swap",
// });

// const belleza = Belleza({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-belleza",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Soulmap",
//   description:
//     "Discover your soulmate's face today with a personalized sketch from our gifted psychics.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       className={`${alegreya.variable} ${belleza.variable} scroll-smooth`}
//     >
//       <body className="font-body antialiased">

//         {/* ================= META PIXEL ================= */}
//         <Script id="meta-pixel-base" strategy="afterInteractive">
//           {`
//             !function(f,b,e,v,n,t,s)
//             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//             n.queue=[];t=b.createElement(e);t.async=!0;
//             t.src=v;s=b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t,s)}
//             (window, document,'script',
//             'https://connect.facebook.net/en_US/fbevents.js');

//             fbq('init', '2055279592036652');
//             fbq('track', 'PageView'); // ✅ IMPORTANT
//             var pvId = window.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
// fbq('track', 'PageView', {}, { eventID: pvId });
//           `}
//         </Script>

//         {/* ================= CAPI HELPER ================= */}
//         <Script id="meta-capi-helper" strategy="afterInteractive">
//           {`
//             (function () {

//               function getCookie(name) {
//                 try {
//                   var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//                   return match ? decodeURIComponent(match[2]) : null;
//                 } catch (e) { return null; }
//               }

//               function setCookie(name, value, days) {
//                 try {
//                   var d = new Date();
//                   d.setTime(d.getTime() + (days*24*60*60*1000));
//                   document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
//                 } catch (e) {}
//               }

//               // Capture fbclid → fbc
//               (function ensureFbc() {
//                 try {
//                   var url = new URL(window.location.href);
//                   var fbclid = url.searchParams.get("fbclid");
//                   if (!fbclid) return;
//                   var fbc = "fb.1." + Math.floor(Date.now() / 1000) + "." + fbclid;
//                   setCookie("_fbc", fbc, 90);
//                 } catch (e) {}
//               })();

//               function uuid() {
//                 if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
//                 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
//                   var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
//                   return v.toString(16);
//                 });
//               }

//               async function sendCapi(payload) {
//                 try {
//                   await fetch("/api/meta", {
//                     method: "POST",
//                     headers: { "content-type": "application/json" },
//                     body: JSON.stringify(payload),
//                     keepalive: true
//                   });
//                 } catch (e) {}
//               }

//               // ✅ ONLY use this for Purchase / Lead / etc.
//               window.metaTrack = function(eventName, customData, user) {
//                 try {
//                   var eventId = uuid();

//                   // Pixel
//                   if (window.fbq) {
//                     window.fbq('track', eventName, customData || {}, { eventID: eventId });
//                   }

//                   // CAPI
//                   var payload = {
//                     event_name: eventName,
//                     event_id: eventId,
//                     action_source: "website",
//                     event_source_url: window.location.href,
//                     custom_data: customData || {},
//                     user: user || {},
//                     fbp: getCookie("_fbp") || undefined,
//                     fbc: getCookie("_fbc") || undefined
//                   };

//                   sendCapi(payload);
//                   return eventId;

//                 } catch (e) {
//                   return null;
//                 }
//               };

//             })();
//           `}
//         </Script>

//         {/* ================= NOSCRIPT ================= */}
//         <noscript>
//           <img
//             height="1"
//             width="1"
//             style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=2055279592036652&ev=PageView&noscript=1"
//           />
//         </noscript>

//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }

// import type { Metadata } from "next";
// import "./globals.css";
// import "./styles/index.css";
// import "./styles/App.css";
// import { Toaster } from "@/components/ui/toaster";
// import { Alegreya, Belleza } from "next/font/google";
// import Script from "next/script";
// import React from "react";

// const alegreya = Alegreya({
//   subsets: ["latin"],
//   variable: "--font-alegreya",
//   display: "swap",
// });

// const belleza = Belleza({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-belleza",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Soulmap",
//   description:
//     "Discover your soulmate's face today with a personalized sketch from our gifted psychics.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       className={`${alegreya.variable} ${belleza.variable} scroll-smooth`}
//     >
//       <body className="font-body antialiased">

//         {/* ================= META PIXEL ================= */}
//         <Script id="meta-pixel-base" strategy="afterInteractive">
//           {`
//             !function(f,b,e,v,n,t,s)
//             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//             n.queue=[];t=b.createElement(e);t.async=!0;
//             t.src=v;s=b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t,s)}(window, document,'script',
//             'https://connect.facebook.net/en_US/fbevents.js');

//             // ✅ FIX 1: Guard against double initialization on re-renders / route changes
//             if (!window._pixelInitialized) {
//               window._pixelInitialized = true;

//               fbq('init', '2055279592036652');

//               // ✅ FIX 2: PageView now has a matching eventID so CAPI can deduplicate it
//               var pvId = (window.crypto && crypto.randomUUID)
//                 ? crypto.randomUUID()
//                 : 'pv-' + Math.random().toString(36).slice(2);

//               fbq('track', 'PageView', {}, { eventID: pvId });

//               // ✅ FIX 3: Send matching CAPI PageView with the same eventID
//               try {
//                 fetch('/api/meta', {
//                   method: 'POST',
//                   headers: { 'content-type': 'application/json' },
//                   body: JSON.stringify({
//                     event_name: 'PageView',
//                     event_id: pvId,
//                     action_source: 'website',
//                     event_source_url: window.location.href,
//                     user: {},
//                     custom_data: {}
//                   }),
//                   keepalive: true
//                 });
//               } catch(e) {}
//             }
//           `}
//         </Script>

//         {/* ================= CAPI HELPER ================= */}
//         <Script id="meta-capi-helper" strategy="afterInteractive">
//           {`
//             (function () {

//               // ✅ FIX 4: Guard so this helper only registers once
//               if (window._capiHelperInitialized) return;
//               window._capiHelperInitialized = true;

//               function getCookie(name) {
//                 try {
//                   var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//                   return match ? decodeURIComponent(match[2]) : null;
//                 } catch (e) { return null; }
//               }

//               function setCookie(name, value, days) {
//                 try {
//                   var d = new Date();
//                   d.setTime(d.getTime() + (days*24*60*60*1000));
//                   document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + d.toUTCString() + "; path=/; SameSite=Lax";
//                 } catch (e) {}
//               }

//               // Capture fbclid → fbc
//               (function ensureFbc() {
//                 try {
//                   var url = new URL(window.location.href);
//                   var fbclid = url.searchParams.get("fbclid");
//                   if (!fbclid) return;
//                   var fbc = "fb.1." + Math.floor(Date.now() / 1000) + "." + fbclid;
//                   setCookie("_fbc", fbc, 90);
//                 } catch (e) {}
//               })();

//               function uuid() {
//                 if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
//                 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
//                   var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
//                   return v.toString(16);
//                 });
//               }

//               async function sendCapi(payload) {
//                 try {
//                   await fetch("/api/meta", {
//                     method: "POST",
//                     headers: { "content-type": "application/json" },
//                     body: JSON.stringify(payload),
//                     keepalive: true
//                   });
//                 } catch (e) {}
//               }

//               // ✅ FIX 5: metaTrack is the ONLY way to fire events — never call fbq() directly elsewhere
//               // Both pixel + CAPI use the same eventID so Meta can deduplicate them correctly
//               window.metaTrack = function(eventName, customData, user) {

//                 // ✅ FIX 6: Prevent duplicate calls for the same event in the same tick
//                 var dedupeKey = eventName + '_' + JSON.stringify(customData || {});
//                 if (window._lastMetaTrack === dedupeKey) {
//                   console.warn('[metaTrack] Duplicate event blocked:', eventName);
//                   return null;
//                 }
//                 window._lastMetaTrack = dedupeKey;
//                 setTimeout(function() {
//                   if (window._lastMetaTrack === dedupeKey) window._lastMetaTrack = null;
//                 }, 500);

//                 try {
//                   var eventId = uuid();

//                   // Pixel (browser-side)
//                   if (window.fbq) {
//                     window.fbq('track', eventName, customData || {}, { eventID: eventId });
//                   }

//                   // CAPI (server-side) — same eventID allows Meta to deduplicate
//                   var payload = {
//                     event_name: eventName,
//                     event_id: eventId,
//                     action_source: "website",
//                     event_source_url: window.location.href,
//                     custom_data: customData || {},
//                     user: user || {},
//                     fbp: getCookie("_fbp") || undefined,
//                     fbc: getCookie("_fbc") || undefined
//                   };

//                   sendCapi(payload);
//                   return eventId;

//                 } catch (e) {
//                   return null;
//                 }
//               };

//             })();
//           `}
//         </Script>

//         {/* ================= NOSCRIPT ================= */}
//         <noscript>
//           <img
//             height="1"
//             width="1"
//             style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=2055279592036652&ev=PageView&noscript=1"
//           />
//         </noscript>

//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }
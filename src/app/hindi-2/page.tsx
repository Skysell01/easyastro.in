"use client";
import { Helmet } from "react-helmet-async";
import Header from "@/components/hindi-2/Header";
import HeroSection from "@/components/hindi-2/HeroSection";
import EmotionalHook from "@/components/hindi-2/EmotionalHook";
import HowItWorks from "@/components/hindi-2/HowItWorks";
import PastWork from "@/components/hindi-2/PastWork";
import WhatYouReceive from "@/components/hindi-2/WhatYouReceive";
import Testimonials from "@/components/hindi-2/Testimonials";
import WhyTrustUs from "@/components/hindi-2/WhyTrustUs";
import FAQ from "@/components/hindi-2/FAQ";
import StickyBottomBar from "@/components/hindi-2/StickyBottomBar";


const Index = () => {
  return (
    <>
      <Helmet>
        <title>सोलमेट स्केच - आज ही अपने सोलमेट का चेहरा देखें | Soulmap</title>
        <meta 
          name="description" 
          content="अनुभवी ज्योतिषियों और साइकिक आर्टिस्ट्स द्वारा हाथ से बनाई गई सोलमेट स्केच। 24 घंटे में डिलीवरी। 100,000+ खुश ग्राहक। अभी ऑर्डर करें।" 
        />
        <meta name="keywords" content="सोलमेट स्केच, प्रेम रीडिंग, ज्योतिष, साइकिक आर्टिस्ट, जीवनसाथी" />
        <link rel="canonical" href="https://soulmap.in/soulmatesketch" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <EmotionalHook />
          <HowItWorks />
          <PastWork />
          <WhatYouReceive />
          <Testimonials />
          <WhyTrustUs />
          <FAQ />
        </main>
        <StickyBottomBar />
      </div>
    </>
  );
};

export default Index;

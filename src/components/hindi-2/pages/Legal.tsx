import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, FileText, RotateCcw, Truck, Mail } from "lucide-react";

const sections = [
  { id: "privacy", label: "गोपनीयता नीति", icon: <Shield className="w-5 h-5" /> },
  { id: "terms", label: "नियम और शर्तें", icon: <FileText className="w-5 h-5" /> },
  { id: "refund", label: "रद्द और रिफंड नीति", icon: <RotateCcw className="w-5 h-5" /> },
  { id: "shipping", label: "शिपिंग और डिलीवरी", icon: <Truck className="w-5 h-5" /> },
  { id: "contact", label: "संपर्क करें", icon: <Mail className="w-5 h-5" /> },
];

const Legal = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Helmet>
        <title>नियम और शर्तें | सोलमेट स्केच</title>
        <meta name="description" content="गोपनीयता नीति, नियम और शर्तें, रद्द और रिफंड नीति" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container-narrow py-4 px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>वापस जाएं</span>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="section-padding bg-muted">
          <div className="container-narrow text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold heading-gradient mb-4"
            >
              नियम और शर्तें
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              कृपया हमारी सेवाओं का उपयोग करने से पहले इन्हें ध्यान से पढ़ें
            </motion.p>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="py-8 px-4 bg-background border-b border-border sticky top-16 z-40">
          <div className="container-narrow">
            <div className="flex flex-wrap justify-center gap-3">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-all"
                >
                  {section.icon}
                  {section.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container-narrow px-4 py-12 space-y-16">
          {/* Privacy Policy */}
          <motion.section
            id="privacy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold heading-gradient">गोपनीयता नीति</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">डेटा संग्रह:</strong> हम आपका नाम, जन्म तिथि, जन्म समय, 
                जन्म स्थान और ईमेल केवल आपकी कुंडली और सोलमेट स्केच सेवाओं के लिए एकत्र करते हैं।
              </p>
              <p>
                <strong className="text-foreground">डेटा सुरक्षा:</strong> आपका सारा डेटा 256-bit SSL encryption 
                से सुरक्षित है। हम आपकी जानकारी को कभी भी किसी तीसरे पक्ष को नहीं बेचते या साझा नहीं करते।
              </p>
              <p>
                <strong className="text-foreground">भुगतान सुरक्षा:</strong> सभी भुगतान विवरण सुरक्षित थर्ड-पार्टी 
                पेमेंट गेटवे (Razorpay) द्वारा संभाले जाते हैं। हम आपके कार्ड या बैंक विवरण को स्टोर नहीं करते।
              </p>
            </div>
          </motion.section>

          {/* Terms & Conditions */}
          <motion.section
            id="terms"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold heading-gradient">नियम और शर्तें</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <ul className="space-y-3 list-disc list-inside">
                <li>हमारी सेवाएं डिजिटल और ज्योतिष-आधारित हैं।</li>
                <li>
                  सभी सामग्री केवल व्यक्तिगत जानकारी और मनोरंजन के उद्देश्यों के लिए है। 
                  यह पेशेवर सलाह का विकल्प नहीं है।
                </li>
                <li>हम किसी विशेष परिणाम की गारंटी नहीं देते।</li>
                <li>उपयोगकर्ताओं को सटीक जन्म विवरण प्रदान करना होगा।</li>
                <li>हमारी सामग्री का अनधिकृत पुनर्वितरण प्रतिबंधित है।</li>
                <li>हमारी सेवाओं का उपयोग करके आप इन शर्तों से सहमत होते हैं।</li>
              </ul>
            </div>
          </motion.section>

          {/* Cancellation & Refund Policy */}
          <motion.section
            id="refund"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold heading-gradient">रद्द और रिफंड नीति</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <ul className="space-y-3 list-disc list-inside">
                <li>ऑर्डर प्रोसेसिंग शुरू होने से पहले ही रद्द किए जा सकते हैं।</li>
                <li>डिलीवर किए गए पर्सनलाइज्ड डिजिटल प्रोडक्ट्स के लिए कोई रिफंड नहीं।</li>
                <li>डुप्लिकेट भुगतान या तकनीकी विफलता के मामले में रिफंड जारी किया जा सकता है।</li>
                <li>स्वीकृत रिफंड 5-7 व्यावसायिक दिनों के भीतर प्रोसेस किए जाते हैं।</li>
              </ul>
            </div>
          </motion.section>

          {/* Shipping & Delivery Policy */}
          <motion.section
            id="shipping"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold heading-gradient">शिपिंग और डिलीवरी नीति</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <ul className="space-y-3 list-disc list-inside">
                <li>सभी प्रोडक्ट्स डिजिटल हैं — कोई फिजिकल शिपिंग नहीं।</li>
                <li>सोलमेट स्केच 24-48 घंटों के भीतर ईमेल/WhatsApp पर डिलीवर की जाती है।</li>
                <li>विस्तृत रिपोर्ट के लिए डिलीवरी में 5-7 दिन लग सकते हैं।</li>
                <li>उच्च मांग के दौरान देरी की स्थिति में आपको सूचित किया जाएगा।</li>
              </ul>
            </div>
          </motion.section>

          {/* Contact Us */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold heading-gradient">संपर्क करें</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">ईमेल:</strong>{" "}
                <a href="mailto:support@horo5.astrasoul.digital" className="text-primary hover:underline">
                  support@horo5.astrasoul.digital
                </a>
              </p>
              <p>
                <strong className="text-foreground">सपोर्ट समय:</strong> सोमवार - शनिवार, सुबह 10 बजे - शाम 6 बजे IST
              </p>
              <p>
                <strong className="text-foreground">प्रतिक्रिया समय:</strong> 24-48 घंटे
              </p>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="bg-muted border-t border-border py-8">
          <div className="container-narrow text-center">
            <Link to="/" className="text-primary hover:underline font-medium">
              ← होम पर वापस जाएं
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Legal;

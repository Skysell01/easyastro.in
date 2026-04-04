import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, Mail, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>भुगतान सफल! | EasyAstro</title>
        <meta name="description" content="धन्यवाद! आपकी सोलमेट स्केच तैयार की जा रही है।" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-rose-light to-background">
        <Header />

        <main className="container-narrow section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-success/10 flex items-center justify-center"
            >
              <CheckCircle className="w-14 h-14 text-success" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              भुगतान सफल! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              धन्यवाद! आपकी सोलमेट स्केच तैयार की जा रही है और{" "}
              <span className="text-primary font-semibold">24 घंटे के अंदर</span> आपको भेज दी जाएगी।
            </motion.p>

            {/* Delivery info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid sm:grid-cols-2 gap-4 mb-10"
            >
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">ईमेल पर</h3>
                <p className="text-sm text-muted-foreground">
                  आपकी स्केच आपके ईमेल पर भेजी जाएगी।
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <MessageCircle className="w-8 h-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">WhatsApp पर</h3>
                <p className="text-sm text-muted-foreground">
                  आपके WhatsApp पर भी भेजी जाएगी।
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-foreground">आगे क्या होगा?</h3>
              </div>
              <ol className="text-left space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                    1
                  </span>
                  <span className="text-muted-foreground">
                    हमारे साइकिक आर्टिस्ट आपकी ऊर्जा को पढ़ेंगे
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                    2
                  </span>
                  <span className="text-muted-foreground">
                    आपके सोलमेट की हाथ से स्केच बनाई जाएगी
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 flex-shrink-0 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                    3
                  </span>
                  <span className="text-muted-foreground">
                    प्रेम रीडिंग के साथ आपको भेज दी जाएगी
                  </span>
                </li>
              </ol>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={() => navigate("/")}
                className="btn-primary"
                size="lg"
              >
                होम पर वापस जाएं
              </Button>
            </motion.div>

            {/* Support info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              कोई सवाल है? हमसे संपर्क करें:{" "}
              <a href="mailto:support@easyastro.in" className="text-primary hover:underline">
                support@easyastro.in
              </a>
            </motion.p>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default ThankYou;

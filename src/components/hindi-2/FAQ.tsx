"use client";
import { motion } from "framer-motion";
import  Link  from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "सोलमेट स्केच कितनी सटीक होती है?",
    answer:
      "हमारी स्केच 85-90% सटीक होती हैं। हमारे अनुभवी साइकिक आर्टिस्ट आपकी ऊर्जा को पढ़कर आपके सोलमेट का विस्तृत चित्र बनाते हैं। हज़ारों ग्राहकों ने बताया है कि उनकी स्केच उनके वास्तविक पार्टनर से मिलती-जुलती थी।",
  },
  {
    question: "क्या मेरी जानकारी सुरक्षित रहेगी?",
    answer:
      "बिल्कुल! आपकी सभी जानकारी 256-bit SSL encryption से सुरक्षित है। हम आपकी जानकारी किसी तीसरे पक्ष के साथ साझा नहीं करते। आपकी प्राइवेसी हमारी सबसे बड़ी प्राथमिकता है।",
  },
  {
    question: "स्केच कैसे मिलेगी?",
    answer:
      "ऑर्डर के 24 घंटे के अंदर आपकी स्केच आपके WhatsApp या Email पर भेज दी जाएगी। आपको एक हाई-क्वालिटी डिजिटल इमेज मिलेगी जिसे आप प्रिंट भी करवा सकते हैं।",
  },
  {
    question: "अगर मैं संतुष्ट न हुआ तो?",
    answer:
      "हम 100% संतुष्टि गारंटी देते हैं। अगर आप अपनी स्केच से खुश नहीं हैं, तो हम आपको पूरा रिफंड देंगे। बस 7 दिन के अंदर हमसे संपर्क करें।",
  },
  {
    question: "क्या मुझे अपने सोलमेट के बारे में और जानकारी मिलेगी?",
    answer:
      "हां! स्केच के साथ आपको एक FREE प्रेम रीडिंग भी मिलेगी जिसमें आपके सोलमेट के स्वभाव, आप कब मिलेंगे, और आपके रिश्ते के बारे में जानकारी होगी।",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold heading-gradient mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">अक्सर पूछे जाने वाले सवाल</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 pt-6 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-2">
            हमारी सेवाओं का उपयोग करके, आप हमारी शर्तों से सहमत होते हैं।
          </p>
          <Link
            href="/legal"
            className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
          >
            नियम और शर्तें पढ़ें →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import { servicesDetails } from "../data/servicesDetails";

function ServiceDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const service = servicesDetails[slug];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const content = service[lang];
  const isArabic = lang === "ar";

  const labels = {
    fr: { back: "Retour aux services", contact: "Plus d'informations ?", cta: "Contactez-nous" },
    ar: { back: "العودة إلى الخدمات", contact: "لمزيد من المعلومات ؟", cta: "اتصل بنا" },
  };
  const t = labels[lang];

  return (
    <PageWrapper>
      <div className="bg-gray-50/50 min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/services"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-navy transition-colors mb-8 group"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform group-hover:-translate-x-1", isArabic && "rotate-180 group-hover:translate-x-1")} />
            <span className="ms-1">{t.back}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl shadow-navy/5 overflow-hidden border border-gray-100"
          >
            {/* Header section with solid navy bar */}
            <div className="h-2 bg-navy" />
            
            <div className="p-8 md:p-12">
              <h1 className={cn("text-3xl md:text-4xl text-navy mb-6", isArabic ? "font-semibold" : "font-bold")}>
                {content.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                {content.description}
              </p>

              <div className="space-y-12">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                    <h2 className={cn("text-xl text-navy mb-6 flex items-center", isArabic ? "font-semibold" : "font-bold")}>
                      <span className="w-1.5 h-6 bg-orange-500 rounded-full me-3" />
                      {section.title}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.content.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100/50">
                          <CheckCircle2 className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Contact / Footer bar */}
              <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-gray-500 font-medium">{t.contact}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-navy text-white rounded-xl font-bold hover:bg-navy-light transition-all shadow-lg shadow-navy/20 hover:scale-[1.02]"
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}

// Helper for conditional classes
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export default ServiceDetailPage;

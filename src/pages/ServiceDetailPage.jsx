import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import { servicesDetails } from "../data/servicesDetails";
import { cn } from "../lib/utils";

function ServiceDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const service = servicesDetails[slug];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const content = service[lang];
  const isArabic = lang === "ar";
  const Icon = Icons[service.icon] || Icons.Circle;

  const labels = {
    fr: { back: "Retour aux services", contact: "Plus d'informations ?", cta: "Nous contacter" },
    ar: { back: "العودة إلى الخدمات", contact: "لمزيد من المعلومات ؟", cta: "اتصل بنا" },
  };
  const t = labels[lang];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-24 md:pt-40 md:pb-32 text-white">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/services"
            className="inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <Icons.ChevronLeft className={cn("w-4 h-4 transition-transform group-hover:-translate-x-1", isArabic && "rotate-180 group-hover:translate-x-1")} />
            <span className="ms-1">{t.back}</span>
          </Link>

          <div className="max-w-3xl">
            <h1 className={cn("text-3xl md:text-5xl mb-4", isArabic ? "font-semibold" : "font-extrabold tracking-tight")}>
              {content.title}
            </h1>
            <div className="h-1.5 w-20 bg-orange-500 rounded-full mb-6" />
            <p className="text-xl text-white/70 leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section with Overlap */}
      <div className="bg-white pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="-mt-10 md:-mt-16 relative z-10 bg-white rounded-[2.5rem] shadow-xl shadow-navy/5 overflow-hidden border border-gray-100"
          >
            <div className="p-8 md:p-14">
              <div className="space-y-16">
                {content.sections.map((section, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <h2 className={cn("text-2xl text-navy mb-8 flex items-center gap-3", isArabic ? "font-semibold" : "font-bold")}>
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                      {section.title}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.content.map((item, itemIdx) => (
                        <li key={itemIdx} className="group flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 hover:bg-white border border-gray-100/50 hover:border-navy/10 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300">
                          <Icons.CheckCircle2 className="w-5 h-5 text-navy/40 group-hover:text-navy mt-1 flex-shrink-0 transition-colors" />
                          <span className="text-gray-700 text-[0.95rem] leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Contact Footer */}
              <motion.div
                variants={itemVariants}
                className="mt-20 p-8 md:p-10 rounded-[2.5rem] bg-navy text-white flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start"
              >
                <div>
                  <p className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">{t.contact}</p>
                  <p className="text-xl md:text-2xl font-bold">{isArabic ? "نحن هنا لمساعدتكم في كل خطوة" : "Nous sommes là pour vous accompagner"}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-orange-500/20 hover:scale-[1.05] active:scale-95 whitespace-nowrap"
                >
                  {t.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ServiceDetailPage;


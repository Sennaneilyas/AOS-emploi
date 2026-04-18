import { motion, useReducedMotion } from "framer-motion";
import * as Icons from "lucide-react";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import { cn } from "../lib/utils";
import { FeatureCard } from "../components/ui/grid-feature-cards";
import useServices from "../hooks/useServices";

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: 20, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const pageContent = {
  fr: {
    title: "Nos Services",
    subtitle: "Découvrez l'ensemble des prestations sociales et culturelles dédiées aux adhérents de l'AOS Emploi.",
    loading: "Chargement des services...",
    error: "Une erreur est survenue lors du chargement des services.",
    more: "En savoir plus",
  },
  ar: {
    title: "خدماتنا",
    subtitle: "اكتشف مجموعة الخدمات الاجتماعية والثقافية المخصصة لمنخرطي جمعية الأعمال الاجتماعية لوزارة التشغيل.",
    loading: "جاري تحميل الخدمات...",
    error: "حدث خطأ أثناء تحميل الخدمات.",
    more: "اكتشف المزيد",
  },
};

function ServicesPage() {
  const { lang } = useLang();
  const { services, loading, error } = useServices(12); // Get more services for the full page
  const t = pageContent[lang];
  const isArabic = lang === "ar";

  return (
    <PageWrapper>
      <section className="bg-white py-16 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedContainer className="mx-auto max-w-3xl text-center">
            <h1 className={`text-3xl font-bold tracking-tight text-navy md:text-5xl ${isArabic ? "font-semibold" : "font-extrabold"}`}>
              {t.title}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 md:text-lg">
              {t.subtitle}
            </p>
          </AnimatedContainer>

          <div className="mt-16 md:mt-24">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy border-t-transparent" />
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-red-700">
                {t.error}
              </div>
            ) : (
              <AnimatedContainer
                delay={0.2}
                className="grid grid-cols-1 overflow-hidden rounded-3xl border border-gray-100 shadow-xl sm:grid-cols-2 lg:grid-cols-4"
              >
                {services.map((service, i) => {
                  const iconName = service.acf?.icon || "Circle";
                  const Icon = Icons[iconName] || Icons.Circle;
                  
                  // Map the service to its detail slug
                  const slugMap = {
                    "Aide Sociale": "aide-sociale",
                    "المساعدة الاجتماعية": "aide-sociale",
                    "Couverture Médicale": "couverture-medicale",
                    "التغطية الطبية": "couverture-medicale",
                    "Aide à la Scolarisation": "aide-scolaire",
                    "المساعدة على التمدرس": "aide-scolaire",
                    "Activités Culturelles & Sportives": "activites-culturelles",
                    "الأنشطة الثقافية والرياضية": "activites-culturelles",
                    "Prêts Exceptionnels": "prets-exceptionnels",
                    "القروض الاستثنائية": "prets-exceptionnels",
                    "Soutien au Décès": "soutien-deces",
                    "مساعدة الوفاة": "soutien-deces",
                    "Accompagnement à la Retraite": "retraite-accompagnement",
                    "مرافقة التقاعد": "retraite-accompagnement",
                    "Logements de Vacances": "logement-vacances",
                    "مساكن العطل": "logement-vacances"
                  };

                  const serviceTitle = service.title?.rendered;
                  const slug = slugMap[serviceTitle] || service.slug || "aide-sociale";

                  const feature = {
                    title: isArabic ? service.title_ar : serviceTitle,
                    description: isArabic ? service.acf?.description_ar : service.acf?.description_fr,
                    icon: Icon,
                    linkText: t.more,
                  };

                  return (
                    <FeatureCard 
                      key={service.id} 
                      feature={feature} 
                      to={`/services/${slug}`}
                      className={cn(
                        "border-gray-100",
                        // Handling border layout manually for the grid look
                        i >= 0 && "border-b",
                        (i % 2 !== 1 || i % 4 !== 3) && "sm:border-r",
                        (i % 4 !== 3) && "lg:border-r"
                      )}
                    />
                  );
                })}
              </AnimatedContainer>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default ServicesPage;

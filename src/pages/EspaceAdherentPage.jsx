import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import useAuth from "../hooks/useAuth";
import { User, FileText, Bell, HelpCircle, Settings } from "lucide-react";

const content = {
  fr: {
    title: "Espace Adhérent",
    subtitle: "Bienvenue dans votre espace personnel",
    features: [
      {
        icon: User,
        title: "Profil et Adhésion",
        description: "Consultez votre profil et gérez votre adhésion",
      },
      {
        icon: FileText,
        title: "Documents",
        description: "Téléchargez vos formulaires et documents importants",
      },
      {
        icon: Bell,
        title: "Notifications",
        description: "Recevez les dernières actualités et annonces",
      },
      {
        icon: HelpCircle,
        title: "Support",
        description: "Contactez notre équipe pour toute assistance",
      },
      {
        icon: Settings,
        title: "Paramètres",
        description: "Gérez vos préférences et informations personnelles",
      },
    ],
  },
  ar: {
    title: "فضاء المنخرط",
    subtitle: "مرحبا بكم في فضائكم الشخصي",
    features: [
      {
        icon: User,
        title: "الملف الشخصي والعضوية",
        description: "استعرض ملفك الشخصي وأدر عضويتك في الجمعية",
      },
      {
        icon: FileText,
        title: "الوثائق",
        description: "قم بتحميل نماذجك والمستندات المهمة",
      },
      {
        icon: Bell,
        title: "الإشعارات",
        description: "استقبل آخر الأخبار والإعلانات",
      },
      {
        icon: HelpCircle,
        title: "الدعم",
        description: "اتصل بفريقنا للحصول على أي مساعدة",
      },
      {
        icon: Settings,
        title: "الإعدادات",
        description: "إدارة تفضيلاتك ومعلوماتك الشخصية",
      },
    ],
  },
};


function EspaceAdherentPage() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = content[lang];

  const { user } = useAuth();

  return (
    <PageWrapper>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 md:pt-40 md:pb-24 text-white">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`text-3xl md:text-4xl ${isArabic ? "font-semibold" : "font-bold"}`}>
              {t.title}
            </h1>
            <p className="mt-4 text-base text-white/70">
              {t.subtitle}
              {user?.nom && (
                <span className="font-medium text-white">, {user.nom}</span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-navy/5 transition-shadow duration-200 hover:shadow-2xl hover:shadow-navy/10 group"
                >
                  <IconComponent className="mb-4 h-8 w-8 text-navy transition-colors group-hover:text-brand-orange" />
                  <h3 className={`mb-2 text-lg text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </PageWrapper>
  );
}

export default EspaceAdherentPage;

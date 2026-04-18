import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import useAuth from "../hooks/useAuth";
import { User, FileText, Bell, HelpCircle, Settings, LogOut } from "lucide-react";

const content = {
  fr: {
    title: "Espace Adhérent",
    subtitle: "Bienvenue dans votre espace personnel",
    logoutLabel: "Se déconnecter",
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
    logoutLabel: "تسجيل الخروج",
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

  const { user, logout } = useAuth();

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-gray-soft py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-start">
            <div>
              <h1 className={`text-4xl text-navy md:text-5xl ${isArabic ? "font-semibold" : "font-bold"}`}>
                {t.title}
              </h1>
              <p className="mt-2 text-base text-gray-600">
                {t.subtitle}
                {user?.nom && (
                  <span className="font-medium text-navy">, {user.nom}</span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-red-200 hover:text-red-600"
            >
              <LogOut size={16} />
              {t.logoutLabel}
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <IconComponent className="mb-4 h-8 w-8 text-navy" />
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

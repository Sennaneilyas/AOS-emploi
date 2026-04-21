import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import { Home, Compass } from "lucide-react";

const content = {
  fr: {
    code: "404",
    title: "Page introuvable",
    description:
      "La page que vous recherchez a peut-être été déplacée ou n'existe pas.",
    goHome: "Retour à l'accueil",
    explore: "Découvrir nos services",
  },
  ar: {
    code: "404",
    title: "الصفحة غير موجودة",
    description: "الصفحة التي تبحث عنها ربما تم نقلها أو غير موجودة.",
    goHome: "العودة إلى الرئيسية",
    explore: "اكتشف خدماتنا",
  },
};

function NotFoundPage() {
  const { lang } = useLang();
  const t = content[lang];
  const isArabic = lang === "ar";

  return (
    <PageWrapper>
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-navy py-16 text-white">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* 404 Code */}
          <div className="mb-6">
            <span
              className={`inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-8 py-3 text-6xl font-extrabold text-brand-orange ${
                isArabic ? "font-bold" : ""
              }`}
            >
              {t.code}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl ${
              isArabic ? "font-semibold" : "font-bold"
            }`}
          >
            {t.title}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl mx-auto text-base text-white/70 md:text-lg">
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl bg-brand-orange px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-navy hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home className="me-2 h-4 w-4" />
              {t.goHome}
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white hover:text-navy hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="me-2 h-4 w-4" />
              {t.explore}
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default NotFoundPage;

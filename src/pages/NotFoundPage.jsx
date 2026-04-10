import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";

const content = {
  fr: {
    title: "Page introuvable",
    subtitle: "La page demandee n'existe pas.",
    cta: "Retour a l'accueil",
  },
  ar: {
    title: "الصفحة غير موجودة",
    subtitle: "الصفحة المطلوبة غير متوفرة.",
    cta: "العودة إلى الرئيسية",
  },
};

function NotFoundPage() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <PageWrapper>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className={`text-4xl text-navy ${lang === "ar" ? "font-semibold" : "font-bold"}`}>
            {t.title}
          </h1>
          <p className="mt-4 text-gray-600">{t.subtitle}</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}

export default NotFoundPage;

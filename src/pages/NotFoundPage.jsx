import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";

const content = {
  fr: {
    title: "Page introuvable",
    subtitle: "La page demandée n'existe pas.",
    cta: "Retour à l'accueil",
    code: "404",
    description: "Oups ! Il semble que vous ayez atteint une page qui n'existe pas.",
  },
  ar: {
    title: "صفحة الخطأ",
    subtitle: "الصفحة المطلوبة غير متوفرة.",
    cta: "العودة إلى الرئيسية",
    code: "404",
    description: "عذراً! يبدو أنك وصلت إلى صفحة غير موجودة.",
  },
};

function NotFoundPage() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <PageWrapper>
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="inline-flex rounded-full bg-navy/10 px-4 py-2 text-sm font-semibold text-navy">
              {t.code}
            </p>
          </div>
          <h1 className={`text-5xl text-navy ${lang === "ar" ? "font-semibold" : "font-bold"}`}>
            {t.title}
          </h1>
          <p className="mt-4 text-base text-gray-600">{t.description}</p>
          <p className="mt-2 text-sm text-gray-500">{t.subtitle}</p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-brand-orange px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light"
          >
            {t.cta}
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}

export default NotFoundPage;

import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";

const content = {
  fr: { title: "Portfolio", subtitle: "Page en cours de construction." },
  ar: { title: "المنجزات", subtitle: "الصفحة قيد الإنجاز." },
};

function PortfolioPage() {
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
        </div>
      </section>
    </PageWrapper>
  );
}

export default PortfolioPage;

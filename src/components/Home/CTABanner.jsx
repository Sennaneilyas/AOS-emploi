import { Link } from "react-router-dom";
import homeContent from "../../mocks/home.json";
import { useLang } from "../../context/LangContext";

function CTABanner() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = homeContent.sections.cta_banner;
  const support = {
    fr: "Accompagnement social, médical et culturel",
    ar: "مواكبة اجتماعية وطبية وثقافية",
  };
  const trust = {
    fr: "Association officielle",
    ar: "جمعية رسمية",
  };

  return (
    <section className="bg-navy py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-white/15 bg-navy-light p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
              {trust[lang]}
            </span>
            <h2 className={`mt-4 text-3xl text-white md:text-4xl ${isArabic ? "font-semibold" : "font-bold"}`}>
              {isArabic ? t.title_ar : t.title_fr}
            </h2>
            <p className="mt-4 max-w-3xl text-base text-gray-200">
              {isArabic ? t.subtitle_ar : t.subtitle_fr}
            </p>
            <p className="mt-3 text-sm text-gray-300">{support[lang]}</p>
          </div>

          <Link
            to={t.cta_href}
            className="inline-flex rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-dark"
          >
            {isArabic ? t.cta_ar : t.cta_fr}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;

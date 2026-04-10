import { Link } from "react-router-dom";
import homeContent from "../../mocks/home.json";
import { useLang } from "../../context/LangContext";
import HeroInfoPanel from "./HeroInfoPanel.jsx";
import { heroVisualContent } from "./heroContent";

function HeroSection() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const hero = homeContent.hero;
  const headline = isArabic
    ? [hero.headline_ar, hero.headline_highlight_ar, hero.headline_suffix_ar]
    : [hero.headline_fr, hero.headline_highlight_fr, hero.headline_suffix_fr];
  const subline = isArabic ? hero.subline_ar : hero.subline_fr;
  const badge = isArabic ? hero.badge_ar : hero.badge_fr;
  const primaryLabel = isArabic ? hero.cta_primary_ar : hero.cta_primary_fr;
  const secondaryLabel = isArabic
    ? hero.cta_secondary_ar
    : hero.cta_secondary_fr;
  const visual = heroVisualContent[lang];

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy to-navy-dark"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-12"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy opacity-70"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy-dark/80"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-dark/90 to-transparent"
          aria-hidden
        />
      </div>
      <div className="relative flex min-h-screen items-center">
        <div className="max-w-7xl mx-auto w-full px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/90">
                {badge}
              </span>
              <h1
                className={`mt-5 text-4xl md:text-5xl ${isArabic ? "font-semibold" : "font-bold"}`}
              >
                {headline[0]}{" "}
                <span className="text-brand-orange">{headline[1]}</span>{" "}
                {headline[2]}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-gray-200">
                {subline}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={hero.cta_primary_href}
                  className="rounded-lg bg-brand-orange px-5 py-3 text-sm font-semibold text-white hover:bg-navy-light transition-colors duration-150"
                >
                  {primaryLabel}
                </Link>
                <Link
                  to={hero.cta_secondary_href}
                  className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-150"
                >
                  {secondaryLabel}
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {visual.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <HeroInfoPanel content={visual} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

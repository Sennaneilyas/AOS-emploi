import { useEffect, useMemo, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import * as Icons from "lucide-react";
import chiffres from "../../mocks/chiffres.json";
import homeContent from "../../mocks/home.json";
import { useLang } from "../../context/LangContext";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const raf = { id: 0 };

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.round(progress * value));
      if (progress < 1) {
        raf.id = requestAnimationFrame(step);
      }
    };

    raf.id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.id);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function ChiffresCles() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = homeContent.sections.chiffres;
  const stats = useMemo(() => chiffres.slice(0, 4), []);

  return (
    <section className="bg-gray-soft py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl text-navy md:text-4xl ${isArabic ? "font-semibold" : "font-bold"}`}>
            {isArabic ? t.title_ar : t.title_fr}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {isArabic ? t.subtitle_ar : t.subtitle_fr}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = Icons[stat.icon] || Icons.Circle;
            const cardClass =
              index % 2 === 0
                ? "border-gray-200 bg-white"
                : "border-navy/10 bg-white";

            return (
            <article key={stat.id} className="p-6 text-center">
              <div
                className={`rounded-2xl border p-6 shadow-sm transition-shadow duration-200 hover:shadow-md ${cardClass}`}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy">
                  <Icon size={18} />
                </div>
                <p className="mt-4 text-4xl font-bold text-navy">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className={`mt-2 text-sm text-gray-800 ${isArabic ? "font-semibold" : "font-medium"}`}>
                  {isArabic ? stat.label_ar : stat.label_fr}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  {isArabic ? stat.description_ar : stat.description_fr}
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ChiffresCles;

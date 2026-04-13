import { useEffect, useMemo, useState } from "react";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import * as Icons from "lucide-react";
import chiffres from "../../mocks/chiffres.json";
import homeContent from "../../mocks/home.json";
import { useLang } from "../../context/LangContext";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.15 + 0.2,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const start = performance.now();
    const raf = { id: 0 };

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayValue(Math.round(eased * value));
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
        {/* Section title */}
        <div className="text-center">
          <h2 className={`text-3xl text-navy md:text-4xl ${isArabic ? "font-semibold" : "font-bold"}`}>
            {isArabic ? t.title_ar : t.title_fr}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {isArabic ? t.subtitle_ar : t.subtitle_fr}
          </p>
        </div>

        {/* Timeline + Cards */}
        <div className="mt-12 md:mt-16">
          {/* Timeline line — hidden on mobile */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:block absolute mx-auto w-3/4 h-px bg-gray-200 origin-left"
            style={{ marginLeft: "12.5%" }}
          />

          <div className="grid gap-6 md:grid-cols-4 relative">
            {stats.map((stat, index) => {
              const Icon = Icons[stat.icon] || Icons.Circle;

              return (
                <div key={stat.id} className="relative flex flex-col items-center">
                  {/* Timeline dot — hidden on mobile */}
                  <motion.div
                    custom={index}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 z-10 h-4 w-4 rounded-full bg-navy items-center justify-center"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </motion.div>

                  {/* Card */}
                  <motion.article
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="w-full pt-6 md:pt-12 text-center"
                  >
                    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      <motion.div
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon size={18} />
                      </motion.div>
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
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChiffresCles;

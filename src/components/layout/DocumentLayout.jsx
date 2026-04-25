import { useLang } from "../../context/LangContext";
import PageWrapper from "./PageWrapper";
import { FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * A shared layout for document-heavy pages like Statuts and Règlement Intérieur.
 * Features a sticky sidebar navigation on desktop.
 */
export default function DocumentLayout({ data }) {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const [activeChapter, setActiveChapter] = useState(data.chapters[0]?.id);

  // Intersection observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // Trigger near the top
    );

    data.chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [data.chapters]);

  const scrollToChapter = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Add a slight offset for the fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <PageWrapper>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex max-w-3xl flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-orange backdrop-blur-sm">
              <FileText size={14} />
              AOS Emploi
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl ${isArabic ? "font-bold" : "font-extrabold"}`}>
              {data.title}
            </h1>
            <p className="text-lg text-white/80 md:text-xl">{data.subtitle}</p>
            {data.lastUpdated && (
              <p className="mt-4 text-sm text-white/50">{data.lastUpdated}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content Area with Sidebar */}
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            
            {/* Sidebar Navigation (Desktop) */}
            <aside className="sticky top-24 hidden w-72 shrink-0 lg:block">
              <nav className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <ul className="space-y-1">
                  {data.chapters.map((chapter) => {
                    const isActive = activeChapter === chapter.id;
                    return (
                      <li key={chapter.id}>
                        <button
                          onClick={() => scrollToChapter(chapter.id)}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-navy text-white shadow-md shadow-navy/20 font-semibold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-navy"
                          }`}
                        >
                          <span className="line-clamp-2">{chapter.title}</span>
                          {isActive && (
                            <ChevronRight size={16} className="shrink-0 rtl:rotate-180" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Document Content */}
            <div className="flex-1 space-y-12 pb-24">
              {data.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  id={chapter.id}
                  className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10"
                >
                  <h2 className={`mb-8 border-b border-gray-100 pb-4 text-2xl text-navy md:text-3xl ${isArabic ? "font-bold" : "font-extrabold"}`}>
                    {chapter.title}
                  </h2>
                  
                  <div className="space-y-8">
                    {chapter.articles.map((article) => (
                      <div key={article.id} className="group">
                        <h3 className={`mb-3 text-lg text-gray-900 transition-colors group-hover:text-brand-orange ${isArabic ? "font-semibold" : "font-bold"}`}>
                          {article.title}
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                          {article.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

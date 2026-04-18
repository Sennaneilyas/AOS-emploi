import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";

const content = {
  fr: { title: "Actualités", subtitle: "Page en cours de construction." },
  ar: { title: "الأخبار", subtitle: "الصفحة قيد الإنجاز." },
};

function BlogPage() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <PageWrapper>
      <section className="bg-navy pt-32 pb-20 md:pt-40 md:pb-28 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className={`text-4xl ${lang === "ar" ? "font-semibold" : "font-bold"}`}>
            {t.title}
          </h1>
          <p className="mt-4 text-white/80">{t.subtitle}</p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          {/* Future news content will go here */}
        </div>
      </section>
    </PageWrapper>
  );
}

export default BlogPage;

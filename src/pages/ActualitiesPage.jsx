import PageWrapper from "../components/layout/PageWrapper";
import PostList from "../components/actualities/PostList";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorBanner from "../components/common/ErrorBanner";
import EmptyState from "../components/common/EmptyState";
import usePosts from "../hooks/usePosts";
import { useLang } from "../context/LangContext";

const pageContent = {
  fr: {
    title: "Actualités",
    subtitle: "Restez informé des dernières activités, événements et annonces de l'AOS Emploi.",
    emptyMessage: "Aucune actualité disponible pour le moment.",
    retryLabel: "Réessayer",
  },
  ar: {
    title: "الأخبار",
    subtitle: "ابق على اطلاع بآخر أنشطة وفعاليات وإعلانات جمعية الأعمال الاجتماعية لوزارة التشغيل.",
    emptyMessage: "لا توجد أخبار حالياً.",
    retryLabel: "إعادة المحاولة",
  },
};

function ActualitiesPage() {
  const { lang } = useLang();
  const { posts, loading, error, retry } = usePosts(); // No limit to get all posts
  const t = pageContent[lang];
  const isArabic = lang === "ar";

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="bg-navy pt-32 pb-16 md:pt-40 md:pb-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl ${
              isArabic ? "font-semibold" : "font-bold"
            }`}
          >
            {t.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SkeletonCard count={6} />
              </div>
            ) : null}

            {!loading && error ? (
              <ErrorBanner message={error} onRetry={retry} retryLabel={t.retryLabel} />
            ) : null}

            {!loading && !error && posts.length === 0 ? (
              <EmptyState message={t.emptyMessage} />
            ) : null}

            {!loading && !error && posts.length > 0 ? (
              <PostList posts={posts} />
            ) : null}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default ActualitiesPage;

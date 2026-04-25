import { Link } from "react-router-dom";
import PostList from "../actualities/PostList";
import SectionTitle from "../common/SectionTitle";
import SkeletonCard from "../common/SkeletonCard";
import ErrorBanner from "../common/ErrorBanner";
import EmptyState from "../common/EmptyState";
import homeContent from "../../mocks/home.json";
import { useLang } from "../../context/LangContext";

/**
 * @param {{
 *  posts: Array<object>
 *  loading: boolean
 *  error: string | null
 *  onRetry: () => void
 * }} props
 */
function ActualitesSection({ posts, loading, error, onRetry }) {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = homeContent.sections.actualites;

  const title = isArabic ? t.title_ar : t.title_fr;
  const subtitle = isArabic ? t.subtitle_ar : t.subtitle_fr;
  const cta = isArabic ? t.cta_ar : t.cta_fr;
  const emptyMessage = isArabic ? "لا توجد أخبار حالياً." : "Aucune actualite disponible.";
  const retryLabel = isArabic ? "إعادة المحاولة" : "Reessayer";
  const badge = isArabic ? "مستجدات الجمعية" : "Vie institutionnelle";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} badge={badge} isArabic={isArabic} />
        <div className="mt-12">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              <SkeletonCard count={3} />
            </div>
          ) : null}
          {!loading && error ? (
            <ErrorBanner message={error} onRetry={onRetry} retryLabel={retryLabel} />
          ) : null}
          {!loading && !error && posts.length === 0 ? <EmptyState message={emptyMessage} /> : null}
          {!loading && !error && posts.length > 0 ? <PostList posts={posts.slice(0, 3)} /> : null}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/actualites"
            className="inline-flex rounded-lg border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors duration-150 hover:bg-navy hover:text-white"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ActualitesSection;

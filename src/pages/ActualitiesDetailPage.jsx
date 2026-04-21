import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  CalendarDays, 
  ArrowLeft, 
  ArrowRight, 
  Download, 
  FileText, 
  Share2, 
  ChevronRight, 
  ChevronLeft,
  Clock,
} from "lucide-react";
import PageWrapper from "../components/layout/PageWrapper";
import usePostDetail from "../hooks/usePostDetail";
import { useLang } from "../context/LangContext";
import { getCategoryLabel, getRelatedPosts, BADGE_CLASSES } from "../mocks/actualities";
import ErrorBanner from "../components/common/ErrorBanner";
import PostCard from "../components/actualities/PostCard";
import { motion } from "framer-motion";

const content = {
  fr: {
    backToList: "Retour aux actualités",
    publishedOn: "Publié le",
    attachments: "Documents joints",
    download: "Télécharger",
    relatedPosts: "Actualités similaires",
    share: "Partager l'actualité",
    minutesRead: "min de lecture",
    notFound: "Actualité introuvable",
    errorLoading: "Une erreur est survenue lors du chargement de l'actualité.",
  },
  ar: {
    backToList: "العودة إلى الأخبار",
    publishedOn: "نُشر في",
    attachments: "الملفات المرفقة",
    download: "تحميل",
    relatedPosts: "أخبار ذات صلة",
    share: "مشاركة الخبر",
    minutesRead: "دقائق للقراءة",
    notFound: "الخبر غير موجود",
    errorLoading: "حدث خطأ أثناء تحميل الخبر.",
  },
};

function ActualitiesDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = content[lang];
  const navigate = useNavigate();

  const { post, loading, error } = usePostDetail(slug);

  if (loading) {
    return (
      <PageWrapper>
        <div className="relative overflow-hidden bg-navy pt-32 pb-40 text-white animate-pulse">
           {/* Abstract background elements */}
           <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
           <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />
           
           <div className="relative z-10 max-w-4xl mx-auto px-4">
              <div className="h-4 bg-white/20 rounded w-24 mb-8" />
              <div className="h-12 bg-white/20 rounded w-3/4 mb-4" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
           </div>
        </div>
      </PageWrapper>
    );
  }

  if (error || !post) {
    return (
      <PageWrapper>
        <div className="relative overflow-hidden bg-navy pt-32 pb-20 text-white min-h-[400px] flex items-center justify-center">
          {/* Abstract background elements */}
          <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
          <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <ErrorBanner 
              message={error === "Post not found" ? t.notFound : t.errorLoading} 
              onRetry={() => navigate("/actualites")}
              retryLabel={t.backToList}
            />
          </div>
        </div>
      </PageWrapper>
    );
  }

  const title = isArabic ? post.title_ar : post.title_fr;
  const body = isArabic ? post.content_ar : post.content_fr;
  const categoryLabel = getCategoryLabel(post.category_id, lang);
  const badgeClass = BADGE_CLASSES[post.category_id] || "bg-white/20 text-white";
  
  const date = new Date(post.date).toLocaleDateString(isArabic ? "ar-MA" : "fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedPosts = getRelatedPosts(post);
  const readingTime = Math.ceil(body.split(/\s+/).length / 200);

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16 md:pt-40 md:pb-24 text-white">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link 
            to="/actualites" 
            className="group inline-flex items-center gap-2 text-sm font-bold text-white/60 hover:text-white transition-colors mb-8"
          >
            {isArabic ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            {t.backToList}
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
              {categoryLabel}
            </span>
            <div className="flex items-center gap-2 text-sm text-white/60 ps-4 border-s border-white/10">
              <CalendarDays size={16} className="text-brand-orange" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60 ps-4 border-s border-white/10">
              <Clock size={16} />
              <span>{readingTime} {t.minutesRead}</span>
            </div>
          </div>

          <h1 className={`text-3xl md:text-4xl lg:text-5xl text-white leading-tight ${isArabic ? "font-bold leading-relaxed" : "font-extrabold tracking-tight"}`}>
            {title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white pb-20">
        <article className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Featured Image */}
            {post.image_url && (
              <div className="mb-12 overflow-hidden rounded-3xl shadow-lg border border-gray-100">
                <img 
                  src={post.image_url} 
                  alt={title} 
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            {/* Body Text */}
            <div className={`prose prose-lg max-w-none prose-navy prose-headings:text-navy prose-p:text-gray-700 prose-p:leading-relaxed ${isArabic ? "font-medium" : ""}`}>
              {body.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
              ))}
            </div>

            {/* Attachments Section */}
            {post.attachments && post.attachments.length > 0 && (
              <section className="mt-16 p-8 rounded-3xl bg-navy text-white shadow-xl shadow-navy/20 relative overflow-hidden">
                <div className="absolute top-0 end-0 p-8 opacity-10 pointer-events-none">
                  <Download size={120} />
                </div>
                
                <div className="relative z-10">
                  <h2 className={`text-2xl mb-8 flex items-center gap-3 ${isArabic ? "font-bold" : "font-bold"}`}>
                    <FileText className="text-brand-orange" />
                    {t.attachments}
                  </h2>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {post.attachments.map((file, index) => (
                      <a 
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                            <Download size={20} />
                          </div>
                          <span className="text-sm font-medium truncate">
                            {isArabic ? file.name_ar : file.name_fr}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/10 text-white/60">
                          {file.type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Share */}
            <div className="mt-16 pt-8 border-t border-gray-100">
               <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-navy uppercase tracking-widest">{t.share}</span>
                  <div className="flex gap-2">
                     {['facebook', 'twitter', 'linkedin'].map((platform) => (
                       <button 
                         key={platform}
                         className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
                         aria-label={`Share on ${platform}`}
                       >
                          <Share2 size={18} />
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-12">
                <h2 className={`text-3xl text-navy ${isArabic ? "font-bold" : "font-bold"}`}>
                  {t.relatedPosts}
                </h2>
                <Link 
                  to="/actualites" 
                  className="text-sm font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  {isArabic ? "مشاهدة الكل" : "Voir tout"}
                  {isArabic ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </Link>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
}

export default ActualitiesDetailPage;

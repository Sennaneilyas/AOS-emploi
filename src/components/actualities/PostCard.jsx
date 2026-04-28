import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { getCategoryLabel } from "../../mocks/actualities";

/**
 * @param {{
 *  post: {
 *    id: number
 *    slug: string
 *    category_id?: string
 *    title_fr?: string
 *    title_ar?: string
 *    excerpt_fr?: string
 *    excerpt_ar?: string
 *    date: string
 *    image_url?: string
 *  }
 * }} props
 */
function PostCard({ post }) {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  
  const content = {
    fr: { readMore: "Lire l'actualité" },
    ar: { readMore: "اقرأ المزيد" },
  };
  
  const t = content[lang];
  
  const date = new Date(post.date).toLocaleDateString(isArabic ? "ar-MA" : "fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const title = isArabic ? post.title_ar : post.title_fr;
  const excerpt = isArabic ? post.excerpt_ar : post.excerpt_fr;
  const categoryLabel = getCategoryLabel(post.category_id, lang);
  const image = post.image_url || "https://placehold.co/600x400/1B2A4A/FFFFFF?text=AOS+Emploi";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/1B2A4A/FFFFFF?text=AOS+Emploi";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Category Badge */}
        {categoryLabel ? (
          <div className="absolute top-4 start-4">
            <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy shadow-sm backdrop-blur-sm">
              {categoryLabel}
            </span>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} className="text-brand-orange" />
          <span>{date}</span>
        </div>

        <h3 className={`mb-3 line-clamp-2 text-xl text-navy group-hover:text-brand-orange transition-colors ${isArabic ? "font-bold leading-relaxed" : "font-bold"}`}>
          <Link to={`/actualites/${post.slug}`}>
            {title}
          </Link>
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <Link
            to={`/actualites/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-150 hover:text-brand-orange"
          >
            {t.readMore}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;

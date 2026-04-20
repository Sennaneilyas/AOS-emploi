import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useLang } from "../../context/LangContext";
import actuality1 from "../../assets/images/actuality1.jpg";
import actuality2 from "../../assets/images/actuality2.jpg";
import actuality3 from "../../assets/images/actuality3.jpg";

const POST_IMAGES = {
  "assemblee-generale-ordinaire-2025": actuality1,
  "partenariat-mutuelle-sante-2026": actuality2,
  "sortie-culturelle-ifrane-2026": actuality3,
};
/**
 * @param {{
 *  post: {
 *    id: number
 *    slug: string
 *    title?: { rendered?: string }
 *    title_fr?: string
 *    title_ar?: string
 *    excerpt?: { rendered?: string }
 *    excerpt_fr?: string
 *    excerpt_ar?: string
 *    category_fr?: string
 *    category_ar?: string
 *    date: string
 *    image_url?: string
 *    _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string }> }
 *  }
 * }} props
 */
function PostCard({ post }) {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const content = {
    fr: { readMore: "Lire l'actualité" },
    ar: { readMore: "قراءة الخبر" },
  };
  const t = content[lang];
  const date = new Date(post.date).toLocaleDateString(isArabic ? "ar-MA" : "fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const title = isArabic
    ? post.title_ar || post.title?.rendered
    : post.title_fr || post.title?.rendered;
  const excerpt = isArabic
    ? post.excerpt_ar || post.excerpt?.rendered
    : post.excerpt_fr || post.excerpt?.rendered;
  const category = isArabic ? post.category_ar : post.category_fr;
  const image =
    post.image_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    POST_IMAGES[post.slug] ||
    "";

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {image ? (
        <img src={image} alt={title} className="h-48 w-full object-cover" loading="lazy" />
      ) : null}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          {category ? (
            <span className="rounded-full bg-navy px-3 py-1 text-xs font-medium text-white">
              {category}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <CalendarDays size={14} />
            {date}
          </span>
        </div>
        <h3 className={`mt-4 text-xl text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
          <Link to={`/actualites/${post.slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm text-gray-600">{excerpt}</p>
        <Link
          to={`/actualites/${post.slug}`}
          className="mt-5 inline-flex text-sm font-semibold text-navy transition-colors duration-150 hover:text-navy-light"
        >
          {t.readMore}
        </Link>
      </div>
    </article>
  );
}

export default PostCard;

import * as Icons from "lucide-react";
import { useLang } from "../../context/LangContext";

/**
 * @param {{
 *  service: {
 *    id: number
 *    title?: { rendered?: string }
 *    title_ar?: string
 *    acf?: {
 *      icon?: string
 *      description_fr?: string
 *      description_ar?: string
 *    }
 *  }
 * }} props
 */
function ServiceCard({ service }) {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  const iconName = service.acf?.icon || "Circle";
  const Icon = Icons[iconName] || Icons.Circle;
  const title = isArabic ? service.title_ar || service.title?.rendered : service.title?.rendered;
  const description = isArabic ? service.acf?.description_ar : service.acf?.description_fr;
  const content = {
    fr: { more: "Découvrir le service" },
    ar: { more: "اكتشف الخدمة" },
  };
  const t = content[lang];

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
        <Icon size={22} />
      </div>
      <h3 className={`mt-4 text-xl text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
        {title}
      </h3>
      <p className="mt-3 text-sm text-gray-600">{description}</p>
      <p className="mt-4 text-sm font-semibold text-navy">{t.more}</p>
    </article>
  );
}

export default ServiceCard;

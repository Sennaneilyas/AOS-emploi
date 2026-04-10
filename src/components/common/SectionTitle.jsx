/**
 * @param {{
 *  title: string
 *  subtitle?: string
 *  badge?: string
 *  align?: "center" | "start"
 *  isArabic?: boolean
 * }} props
 */
function SectionTitle({ title, subtitle, badge, align = "center", isArabic = false }) {
  const alignment = align === "start" ? "text-start" : "text-center";

  return (
    <div className={`mx-auto max-w-3xl ${alignment}`}>
      {badge ? (
        <span className="inline-flex rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
          {badge}
        </span>
      ) : null}
      <h2 className={`mt-3 text-3xl text-navy md:text-4xl ${isArabic ? "font-semibold" : "font-bold"}`}>
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-base text-gray-600">{subtitle}</p> : null}
    </div>
  );
}

export default SectionTitle;

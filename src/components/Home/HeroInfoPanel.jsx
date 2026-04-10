import { ShieldCheck, Sparkles, Users } from "lucide-react";

/**
 * @param {{
 *  content: {
 *    institution: string
 *    mission: string
 *    missionText: string
 *    public: string
 *    stats: Array<{ value: string; label: string }>
 *    dedicated: string
 *  }
 * }} props
 */
function HeroInfoPanel({ content }) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-lg backdrop-blur-sm md:p-8">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {content.stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-navy-dark/50 p-4 md:p-5"
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-xs font-medium text-white/80">{stat.label}</p>
            </article>
          ))}
        </div>

        <article className="rounded-2xl border border-white/15 bg-navy-dark/50 p-5">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
            <ShieldCheck size={16} />
            {content.institution}
          </p>
          <p className="mt-2 text-xl font-semibold text-white">{content.public}</p>
        </article>

        <article className="rounded-2xl border border-white/15 bg-navy-dark/50 p-5">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
            <Sparkles size={16} />
            {content.mission}
          </p>
          <p className="mt-2 text-base text-white">{content.missionText}</p>
        </article>

        <article className="rounded-2xl border border-white/15 bg-navy-dark/50 p-5">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
            <Users size={16} />
            AOS
          </p>
          <p className="mt-2 text-base text-white">{content.dedicated}</p>
        </article>
      </div>
    </div>
  );
}

export default HeroInfoPanel;

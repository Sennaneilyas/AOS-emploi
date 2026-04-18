import { useState } from "react";
import {
  HeartHandshake,
  Stethoscope,
  GraduationCap,
  Trophy,
  ShieldCheck,
  Sparkles,
  Users,
  Banknote,
} from "lucide-react";
import { useLang } from "../../context/LangContext";
import { cn } from "../../lib/utils";

const SERVICE_ICONS = {
  HeartHandshake,
  Stethoscope,
  GraduationCap,
  Trophy,
  ShieldCheck,
  Sparkles,
  Users,
  Banknote,
};

const getServices = (lang) => [
  {
    id: "aide-sociale",
    icon: "HeartHandshake",
    nameFr: "Aide Sociale",
    nameAr: "المساعدة الاجتماعية",
    descFr: "Soutien financier et moral",
    descAr: "دعم مالي ومعنوي",
  },
  {
    id: "couverture-medicale",
    icon: "Stethoscope",
    nameFr: "Couverture Médicale",
    nameAr: "التغطية الطبية",
    descFr: "Prise en charge des frais médicaux",
    descAr: "تغطية المصاريف الطبية",
  },
  {
    id: "aide-scolaire",
    icon: "GraduationCap",
    nameFr: "Aide Scolaire",
    nameAr: "المساعدة المدرسية",
    descFr: "Soutien à la scolarisation",
    descAr: "دعم التمدرس",
  },
  {
    id: "activites",
    icon: "Trophy",
    nameFr: "Activités Culturelles",
    nameAr: "الأنشطة الثقافية",
    descFr: "Sorties, voyages et sport",
    descAr: "رحلات وسفر ورياضة",
  },
  {
    id: "institution",
    icon: "ShieldCheck",
    nameFr: "Institution Officielle",
    nameAr: "مؤسسة رسمية",
    descFr: "Association reconnue",
    descAr: "جمعية معترف بها",
  },
  {
    id: "mission",
    icon: "Sparkles",
    nameFr: "Mission Sociale",
    nameAr: "المهمة الاجتماعية",
    descFr: "Bien-être des fonctionnaires",
    descAr: "رفاه الموظفين",
  },
  {
    id: "adherents",
    icon: "Users",
    nameFr: "1500+ Adhérents",
    nameAr: "+1500 منخرط",
    descFr: "Famille AOS active",
    descAr: "عائلة AOS النشطة",
  },
  {
    id: "prets",
    icon: "Banknote",
    nameFr: "Prêts Exceptionnels",
    nameAr: "القروض الاستثنائية",
    descFr: "Aide financière d'urgence",
    descAr: "مساعدة مالية طارئة",
  },
];

function HeroInfoPanel() {
  const { lang } = useLang();
  const services = getServices(lang);
  const [hoveredId, setHoveredId] = useState(null);

  const col1 = services.filter((_, i) => i % 3 === 0);
  const col2 = services.filter((_, i) => i % 3 === 1);
  const col3 = services.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex w-full max-w-md mx-auto lg:mx-0 lg:max-w-xl select-none items-center justify-center gap-3 sm:gap-4">
      {/* ─ Left: icon grid ── */}
      <div className="flex gap-1 sm:gap-2 flex-shrink-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-1 sm:gap-2">
          {col1.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className="w-[50px] h-[55px] sm:w-[85px] sm:h-[95px] md:w-[100px] md:h-[110px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset */}
        <div className="flex flex-col gap-1 sm:gap-2 mt-4 sm:mt-10 md:mt-14">
          {col2.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className="w-[55px] h-[60px] sm:w-[95px] sm:h-[105px] md:w-[115px] md:h-[125px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — offset */}
        <div className="flex flex-col gap-1 sm:gap-2 mt-2 sm:mt-5 md:mt-7">
          {col3.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              className="w-[52px] h-[58px] sm:w-[90px] sm:h-[100px] md:w-[108px] md:h-[118px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: service name list ── */}
      <div className="flex flex-col gap-2 sm:gap-2.5 pt-0 flex-1 min-w-0">
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}



function ServiceCard({ service, className, hoveredId, onHover }) {
  const isActive = hoveredId === service.id;
  const isDimmed = hoveredId !== null && !isActive;
  const IconComponent = SERVICE_ICONS[service.icon] || ShieldCheck;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-all duration-400 border border-white/10 bg-white/5 backdrop-blur-sm",
        className,
        isDimmed ? "opacity-40 scale-95" : "opacity-100"
      )}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(service.id)}
      onTouchEnd={() => onHover(null)}
    >
      <div
        className={cn(
          "w-full h-full flex items-center justify-center transition-all duration-500",
          isActive
            ? "bg-brand-orange/20 text-brand-orange"
            : "bg-white/5 text-white/60"
        )}
      >
        <IconComponent
          size={24}
          strokeWidth={1.5}
          className="transition-transform duration-500"
        />
      </div>
    </div>
  );
}



function ServiceRow({ service, hoveredId, onHover }) {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const isActive = hoveredId === service.id;
  const isDimmed = hoveredId !== null && !isActive;
  const name = isArabic ? service.nameAr : service.nameFr;
  const desc = isArabic ? service.descAr : service.descFr;

  return (
    <div
      className={cn(
        "cursor-pointer transition-all duration-300",
        isDimmed ? "opacity-30" : "opacity-100"
      )}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(service.id)}
      onTouchEnd={() => onHover(null)}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "w-2 h-1.5 rounded-sm flex-shrink-0 transition-all duration-300",
            isActive ? "bg-brand-orange w-3" : "bg-white/20"
          )}
        />
        <span
          className={cn(
            "text-[10px] sm:text-sm md:text-base font-semibold leading-none tracking-tight transition-colors duration-300",
            isActive ? "text-white" : "text-white/60"
          )}
        >
          {name}
        </span>
      </div>

      <p
        className={cn(
          "mt-0.5 ps-4 text-[9px] sm:text-xs font-medium tracking-wide transition-colors duration-300",
          isActive ? "text-white/70" : "text-white/35"
        )}
      >
        {desc}
      </p>
    </div>
  );
}

export default HeroInfoPanel;

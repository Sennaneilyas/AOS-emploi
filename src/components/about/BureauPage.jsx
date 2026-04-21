import { useLang } from "../../context/LangContext";
import { cadreAssociatifContent } from "../../data/cadreAssociatifContent";
import PageWrapper from "../layout/PageWrapper";
import { Users, Mail } from "lucide-react";

export default function BureauPage() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const data = cadreAssociatifContent[lang].bureau;

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-24">
        {/* Abstract background elements */}
        <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -end-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex max-w-3xl flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-orange backdrop-blur-sm">
              <Users size={14} />
              AOS Emploi
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl ${isArabic ? "font-bold" : "font-extrabold"}`}>
              {data.title}
            </h1>
            <p className="text-lg text-white/80 md:text-xl">{data.subtitle}</p>
          </div>
        </div>
      </section>


      {/* Grid Area */}
      <section className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.members.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5"
              >
                {/* Decorative Background Blob */}
                <div className="absolute -end-16 -top-16 h-32 w-32 rounded-full bg-brand-orange/5 transition-transform duration-500 group-hover:scale-150" />
                
                {/* Avatar */}
                <div className="relative mb-6 flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-navy/5 text-2xl font-bold text-navy shadow-inner ring-4 ring-white">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    member.initials
                  )}
                </div>

                {/* Info */}
                <h3 className={`mb-1 text-xl text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
                  {member.name}
                </h3>
                <p className="mb-6 text-sm font-medium text-brand-orange">
                  {member.role}
                </p>

                {/* Contact Action */}
                <a
                  href={`mailto:${member.email}`}
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-2.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-navy hover:text-white"
                >
                  <Mail size={16} />
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

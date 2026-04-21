import React from "react";
import { useLang } from "../../context/LangContext";
import useAuth from "../../hooks/useAuth";
import { dashboardContent } from "./dashboardContent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, ShieldCheck, Clock, FileText, Bell } from "lucide-react";

const StatCard = ({ icon, label, value, colorClass }) => {
  const IconComponent = icon;
  return (
    <Card className="border-none shadow-xl shadow-navy/5 overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="mt-1 text-xl font-bold text-navy">{value}</p>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorClass} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            {IconComponent && <IconComponent className="h-6 w-6" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OverviewSection = () => {
  const { lang } = useLang();
  const { user } = useAuth();
  const t = dashboardContent[lang].overview;
  const isArabic = lang === "ar";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className={`text-2xl text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
          {t.welcome} {user?.nom}
        </h2>
        <p className="mt-1 text-gray-500">
          {isArabic ? "إليك ملخص لنشاطك الأخير" : "Voici un résumé de votre activité récente."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          icon={Calendar} 
          label={t.stats.memberSince} 
          value="Jan 2024" 
          colorClass="bg-navy"
        />
        <StatCard 
          icon={ShieldCheck} 
          label={t.stats.status} 
          value={user?.status === "approved" ? (isArabic ? "نشط" : "Actif") : user?.status} 
          colorClass="bg-green-500"
        />
        <StatCard 
          icon={Clock} 
          label={t.stats.lastLogin} 
          value={isArabic ? "اليوم" : "Aujourd'hui"} 
          colorClass="bg-brand-orange"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Documents */}
        <Card className="border-none shadow-xl shadow-navy/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-navy">
              <FileText className="me-2 h-5 w-5 text-brand-orange" />
              {t.recentDocs}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center me-4">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">Formulaire d'adhésion 2026</p>
                    <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Member News */}
        <Card className="border-none shadow-xl shadow-navy/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-navy">
              <Bell className="me-2 h-5 w-5 text-brand-orange" />
              {t.latestNews}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center me-4 flex-shrink-0">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Nouvelle convention avec RAM</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">Des réductions exclusives pour les adhérents AOS...</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;

import React from "react";
import { useLang } from "../../context/LangContext";
import useAuth from "../../hooks/useAuth";
import { dashboardContent } from "./dashboardContent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Briefcase, Mail, Phone, Key } from "lucide-react";

const InfoItem = ({ icon, label, value }) => {
  const IconComponent = icon;
  return (
    <div className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-white shadow-sm text-navy me-4">
        {IconComponent && <IconComponent className="h-5 w-5" />}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-navy">{value || "—"}</p>
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const { lang } = useLang();
  const { user } = useAuth();
  const t = dashboardContent[lang].profile;
  const isArabic = lang === "ar";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
          {t.title}
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Personal Info */}
        <Card className="border-none shadow-xl shadow-navy/5 overflow-hidden">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-lg flex items-center">
              <User className="me-2 h-5 w-5 text-brand-orange" />
              {t.personalInfo}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 my-4">
            <InfoItem 
              icon={User} 
              label={t.fields.nom} 
              value={user?.nom} 
            />
            <InfoItem 
              icon={Mail} 
              label={t.fields.email} 
              value={user?.email} 
            />
            <InfoItem 
              icon={Phone} 
              label={t.fields.telephone} 
              value={user?.telephone || "N/A"} 
            />
          </CardContent>
        </Card>

        {/* Work Info */}
        <Card className="border-none shadow-xl shadow-navy/5 overflow-hidden">
          <CardHeader className="bg-navy text-white">
            <CardTitle className="text-lg flex items-center">
              <Briefcase className="me-2 h-5 w-5 text-brand-orange" />
              {t.workInfo}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 my-4">
            <InfoItem 
              icon={Briefcase} 
              label={t.fields.lieu_travail} 
              value={user?.lieu_travail} 
            />
            <InfoItem 
              icon={Key} 
              label={t.fields.unique_key} 
              value={user?.unique_key} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;

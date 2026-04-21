import React from "react";
import { useLang } from "../../context/LangContext";
import { dashboardContent } from "./dashboardContent";
import { Card, CardContent } from "../ui/card";
import { FileText, Download, Search } from "lucide-react";
import Button from "../common/Button";

const DocumentsSection = () => {
  const { lang } = useLang();
  const t = dashboardContent[lang].documents;
  const isArabic = lang === "ar";

  const docs = [
    { id: 1, title: "Formulaire d'adhésion", titleAr: "نموذج الانخراط", type: "PDF", size: "1.2 MB" },
    { id: 2, title: "Demande de prêt social", titleAr: "طلب قرض اجتماعي", type: "PDF", size: "850 KB" },
    { id: 3, title: "Convention RAM 2026", titleAr: "اتفاقية الخطوط الملكية المغربية 2026", type: "PDF", size: "2.4 MB" },
    { id: 4, title: "Guide de l'adhérent", titleAr: "دليل المنخرط", type: "PDF", size: "5.1 MB" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
            {t.title}
          </h2>
          <p className="mt-1 text-gray-500">{t.description}</p>
        </div>
        
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder={isArabic ? "بحث عن وثيقة..." : "Rechercher un document..."}
            className="ps-10 pe-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-navy focus:border-navy outline-none w-full md:w-64 transition-all"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {docs.map((doc) => (
          <Card key={doc.id} className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all group">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center me-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-navy truncate">
                    {isArabic ? doc.titleAr : doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.type} • {doc.size}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="ms-4 p-2 h-10 w-10 flex items-center justify-center rounded-full border-gray-200 hover:bg-navy hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsSection;

import { User, FileText, Bell, LayoutDashboard, Settings } from "lucide-react";

export const dashboardContent = {
  fr: {
    sidebar: {
      overview: "Tableau de bord",
      profile: "Mon Profil",
      documents: "Mes Documents",
      notifications: "Notifications",
      settings: "Paramètres",
    },
    overview: {
      welcome: "Ravi de vous revoir,",
      stats: {
        lastLogin: "Dernière connexion",
        memberSince: "Membre depuis",
        status: "Statut du compte",
      },
      recentDocs: "Documents récents",
      latestNews: "Dernières actualités adhérents",
    },
    profile: {
      title: "Mon Profil",
      personalInfo: "Informations Personnelles",
      workInfo: "Informations Professionnelles",
      fields: {
        nom: "Nom complet",
        email: "Email",
        telephone: "Téléphone",
        lieu_travail: "Lieu de travail",
        unique_key: "Clé unique AOS",
      },
    },
    documents: {
      title: "Mes Documents",
      description: "Retrouvez ici tous les formulaires et documents administratifs de l'AOS.",
      download: "Télécharger",
      noDocs: "Aucun document disponible pour le moment.",
    },
    notifications: {
      title: "Notifications",
      empty: "Vous n'avez pas de nouvelles notifications.",
    }
  },
  ar: {
    sidebar: {
      overview: "لوحة التحكم",
      profile: "ملفي الشخصي",
      documents: "وثائقي",
      notifications: "الإشعارات",
      settings: "الإعدادات",
    },
    overview: {
      welcome: "يسعدنا رؤيتك مرة أخرى،",
      stats: {
        lastLogin: "آخر دخول",
        memberSince: "عضو منذ",
        status: "حالة الحساب",
      },
      recentDocs: "الوثائق الأخيرة",
      latestNews: "آخر أخبار المنخرطين",
    },
    profile: {
      title: "ملفي الشخصي",
      personalInfo: "المعلومات الشخصية",
      workInfo: "المعلومات المهنية",
      fields: {
        nom: "الاسم الكامل",
        email: "البريد الإلكتروني",
        telephone: "الهاتف",
        lieu_travail: "مقر العمل",
        unique_key: "المفتاح الفريد AOS",
      },
    },
    documents: {
      title: "وثائقي",
      description: "تجدون هنا جميع النماذج والوثائق الإدارية الخاصة بـ AOS.",
      download: "تحميل",
      noDocs: "لا توجد وثائق متاحة حاليا.",
    },
    notifications: {
      title: "الإشعارات",
      empty: "ليس لديك أي إشعارات جديدة.",
    }
  },
};

export const sidebarItems = [
  { id: "overview", labelKey: "overview", icon: LayoutDashboard },
  { id: "profile", labelKey: "profile", icon: User },
  { id: "documents", labelKey: "documents", icon: FileText },
  { id: "notifications", labelKey: "notifications", icon: Bell },
  { id: "settings", labelKey: "settings", icon: Settings },
];

import { User, FileText, Bell, LayoutDashboard, ClipboardList } from "lucide-react";

export const dashboardContent = {
  fr: {
    sidebar: {
      overview: "Tableau de bord",
      profile: "Mon Profil",
      documents: "Mes Documents",
      notifications: "Notifications",
      demandes: "Mes Demandes",
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
    },
    demandes: {
      title: "Mes Demandes",
      description: "Soumettez vos demandes pour les événements et prestations sociales de l'AOS.",
      historyTitle: "Historique des demandes",
      formTitle: "Nouvelle demande",
      submitBtn: "Envoyer la demande",
      successMsg: "Votre demande a été envoyée avec succès !",
      types: {
        aid: {
          title: "Aide Aïd Al-Adha",
          desc: "Demande d'aide financière pour l'Aïd Al-Adha."
        },
        loan: {
          title: "Prêt Exceptionnel",
          desc: "Demande de prêt social exceptionnel."
        },
        vacation: {
          title: "Centre d'Estivage",
          desc: "Réservation de logements de vacances."
        }
      },
      fields: {
        type: "Type de demande",
        amount: "Montant demandé (MAD)",
        reason: "Motif",
        startDate: "Date de début",
        endDate: "Date de fin",
        persons: "Nombre de personnes",
        destination: "Destination souhaitée",
        rib: "RIB (Relevé d'Identité Bancaire)",
        declaration: "Je certifie sur l'honneur l'exactitude des informations fournies."
      },
      status: {
        pending: "En attente",
        approved: "Approuvée",
        rejected: "Rejetée"
      },
      tableHeaders: {
        id: "ID Demande",
        date: "Date",
        type: "Type",
        status: "Statut"
      }
    }
  },
  ar: {
    sidebar: {
      overview: "لوحة التحكم",
      profile: "ملفي الشخصي",
      documents: "وثائقي",
      notifications: "الإشعارات",
      demandes: "طلباتي",
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
    },
    demandes: {
      title: "طلباتي",
      description: "قدم طلباتك للاستفادة من الفعاليات والخدمات الاجتماعية للجمعية.",
      historyTitle: "سجل الطلبات",
      formTitle: "طلب جديد",
      submitBtn: "إرسال الطلب",
      successMsg: "تم إرسال طلبك بنجاح!",
      types: {
        aid: {
          title: "منحة عيد الأضحى",
          desc: "طلب مساعدة مالية بمناسبة عيد الأضحى."
        },
        loan: {
          title: "سلف استثنائي",
          desc: "طلب سلف اجتماعي استثنائي."
        },
        vacation: {
          title: "مراكز الاصطياف",
          desc: "حجز سكن لقضاء العطلة."
        }
      },
      fields: {
        type: "نوع الطلب",
        amount: "المبلغ المطلوب (درهم)",
        reason: "السبب",
        startDate: "تاريخ البدء",
        endDate: "تاريخ الانتهاء",
        persons: "عدد الأشخاص",
        destination: "الوجهة المطلوبة",
        rib: "رقم الحساب البنكي (RIB)",
        declaration: "أصرح بشرفي بصحة المعلومات المقدمة."
      },
      status: {
        pending: "قيد المعالجة",
        approved: "مقبول",
        rejected: "مرفوض"
      },
      tableHeaders: {
        id: "رقم الطلب",
        date: "التاريخ",
        type: "النوع",
        status: "الحالة"
      }
    }
  },
};

export const sidebarItems = [
  { id: "overview", labelKey: "overview", icon: LayoutDashboard },
  { id: "profile", labelKey: "profile", icon: User },
  { id: "documents", labelKey: "documents", icon: FileText },
  { id: "notifications", labelKey: "notifications", icon: Bell },
  { id: "demandes", labelKey: "demandes", icon: ClipboardList },
];

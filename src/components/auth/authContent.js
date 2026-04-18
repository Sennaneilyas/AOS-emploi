export const authContent = {
  fr: {
    // AuthPage
    loginTab: "Se connecter",
    registerTab: "S'inscrire",
    tagline: "Espace réservé aux adhérents de l'AOS",
    noAccount: "Pas encore de compte ? ",
    hasAccount: "Déjà un compte ? ",

    // LoginForm
    loginEmail: "Email institutionnel",
    loginKey: "Clé d'accès unique",
    loginKeyHint: "Format : AOS-2026-XXXX-XXXX",
    loginKeyShow: "Afficher",
    loginKeyHide: "Masquer",
    loginSubmit: "Se connecter",
    loginSubmitting: "Connexion…",
    loginWelcome: (name) => `Bienvenue, ${name} !`,
    loginPendingMsg:
      "Votre compte est en attente de validation. Vous serez notifié par email.",
    loginFallbackError: "Une erreur est survenue.",
    loginErrors: {
      emailRequired: "L'email est requis.",
      emailInvalid: "Format d'email invalide.",
      keyRequired: "La clé d'accès est requise.",
    },

    // RegisterForm
    registerNom: "Nom complet",
    registerEmail: "Email institutionnel",
    registerEmailPlaceholder: "prenom.nom@emploi.gov.ma",
    registerTelephone: "Téléphone",
    registerLieu: "Lieu de travail / Direction",
    registerSubmit: "Soumettre la demande",
    registerSubmitting: "Envoi en cours…",
    registerSuccessTitle: "Demande envoyée",
    registerSuccessSub:
      "Votre demande a été reçue. Vous recevrez votre clé d'accès par email après validation par l'administration.",
    registerFallbackError: "Une erreur est survenue.",
    registerErrors: {
      nomRequired: "Le nom est requis.",
      emailRequired: "L'email est requis.",
      emailInvalid: "Format d'email invalide.",
      lieuRequired: "Le lieu de travail est requis.",
    },
  },

  ar: {
    // AuthPage
    loginTab: "تسجيل الدخول",
    registerTab: "إنشاء حساب",
    tagline: "فضاء خاص بمنخرطي جمعية AOS",
    noAccount: "لا يوجد لديك حساب؟ ",
    hasAccount: "لديك حساب بالفعل؟ ",

    // LoginForm
    loginEmail: "البريد الإلكتروني المؤسساتي",
    loginKey: "مفتاح الوصول الفريد",
    loginKeyHint: "الصيغة : AOS-2026-XXXX-XXXX",
    loginKeyShow: "إظهار",
    loginKeyHide: "إخفاء",
    loginSubmit: "تسجيل الدخول",
    loginSubmitting: "…جاري الدخول",
    loginWelcome: (name) => `!مرحباً، ${name}`,
    loginPendingMsg:
      "حسابك في انتظار التحقق. ستتلقى إشعاراً عبر البريد الإلكتروني.",
    loginFallbackError: "حدث خطأ ما.",
    loginErrors: {
      emailRequired: "البريد الإلكتروني مطلوب.",
      emailInvalid: "صيغة البريد الإلكتروني غير صالحة.",
      keyRequired: "مفتاح الوصول مطلوب.",
    },

    // RegisterForm
    registerNom: "الاسم الكامل",
    registerEmail: "البريد الإلكتروني المؤسساتي",
    registerEmailPlaceholder: "prenom.nom@emploi.gov.ma",
    registerTelephone: "الهاتف",
    registerLieu: "مكان العمل / المديرية",
    registerSubmit: "إرسال الطلب",
    registerSubmitting: "…جاري الإرسال",
    registerSuccessTitle: "تم إرسال الطلب",
    registerSuccessSub:
      "تم استلام طلبك. ستتلقى مفتاح الوصول الخاص بك عبر البريد الإلكتروني بعد التحقق من طرف الإدارة.",
    registerFallbackError: "حدث خطأ ما.",
    registerErrors: {
      nomRequired: "الاسم مطلوب.",
      emailRequired: "البريد الإلكتروني مطلوب.",
      emailInvalid: "صيغة البريد الإلكتروني غير صالحة.",
      lieuRequired: "مكان العمل مطلوب.",
    },
  },
};

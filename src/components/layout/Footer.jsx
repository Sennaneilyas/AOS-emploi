import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext";

const content = {
  fr: {
    description:
      "Association des Oeuvres Sociales du personnel du Ministere de l'Emploi.",
    linksTitle: "Liens utiles",
    contactTitle: "Contact institutionnel",
    contactAddress: "Rabat, Maroc",
    contactEmail: "contact@aosemploi.com",
    links: [
      { to: "/services", label: "Services" },
      { to: "/blog", label: "Actualités" },
      { to: "/contact", label: "Contact" },
    ],
    copy: "Tous droits réservés.",
  },
  ar: {
    description: "جمعية الاعمال الاجتماعية لموظفي وزارة التشغيل.",
    linksTitle: "روابط مهمة",
    contactTitle: "التواصل المؤسسي",
    contactAddress: "الرباط، المغرب",
    contactEmail: "contact@aosemploi.com",
    links: [
      { to: "/services", label: "الخدمات" },
      { to: "/blog", label: "الأخبار" },
      { to: "/contact", label: "اتصل بنا" },
    ],
    copy: "جميع الحقوق محفوظة.",
  },
};

function Footer() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-semibold">AOS Emploi</h2>
            <p className="mt-3 max-w-md text-sm text-gray-200">{t.description}</p>
          </div>
          <div>
            <h3 className="text-base font-semibold">{t.linksTitle}</h3>
            <div className="mt-3 flex flex-wrap gap-4">
              {t.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-gray-200 transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold">{t.contactTitle}</h3>
            <p className="mt-3 text-sm text-gray-200">{t.contactAddress}</p>
            <p className="mt-2 text-sm text-gray-200">{t.contactEmail}</p>
          </div>
        </div>
        <p className="mt-8 border-t border-gray-700 pt-4 text-xs text-gray-300">
          © {new Date().getFullYear()} AOS Emploi. {t.copy}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

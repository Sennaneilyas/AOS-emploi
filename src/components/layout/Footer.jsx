import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import logo from "../../../public/logo.png";

const content = {
  fr: {
    brand: "AOS Emploi",
    tagline:
      "Association des Oeuvres Sociales du personnel du Ministere de l'Emploi.",
    menu: [
      {
        title: "Association",
        links: [
          { to: "/about/statuts", label: "À propos" },
          { to: "/services", label: "Services" },
          { to: "/actualites", label: "Actualités" },
        ],
      },
      {
        title: "Accès rapide",
        links: [
          { to: "/contact", label: "Contact" },
          { to: "/espace-adherent", label: "Espace Adhérent" },
          { to: "/services", label: "Prestations" },
        ],
      },
      {
        title: "Coordonnées",
        links: [
          { to: "/contact", label: "Rabat, Maroc" },
          { to: "/contact", label: "contact@aosemploi.com" },
        ],
      },
    ],
    copyright: "Tous droits réservés.",
    bottomLinks: [
      { to: "/contact", label: "Contact" },
      { to: "/about/statuts", label: "Mentions institutionnelles" },
    ],
  },
  ar: {
    brand: "AOS التشغيل",
    tagline: "جمعية الاعمال الاجتماعية لموظفي وزارة التشغيل.",
    menu: [
      {
        title: "الجمعية",
        links: [
          { to: "/about/statuts", label: "من نحن" },
          { to: "/services", label: "الخدمات" },
          { to: "/actualites", label: "الأخبار" },
        ],
      },
      {
        title: "روابط سريعة",
        links: [
          { to: "/contact", label: "اتصل بنا" },
          { to: "/espace-adherent", label: "فضاء المنخرط" },
          { to: "/services", label: "الخدمات" },
        ],
      },
      {
        title: "التواصل",
        links: [
          { to: "/contact", label: "الرباط، المغرب" },
          { to: "/contact", label: "contact@aosemploi.com" },
        ],
      },
    ],
    copyright: "جميع الحقوق محفوظة.",
    bottomLinks: [
      { to: "/contact", label: "اتصل بنا" },
      { to: "/about/statuts", label: "معلومات مؤسساتية" },
    ],
  },
};

function Footer() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 mb-4 lg:mb-0">
            <Link
              to="/"
              className="inline-flex items-center gap-3 footer-link !text-white !no-underline hover:!text-primary"
            >
              <img src={logo} alt={t.brand} className="h-16 w-auto" />
              <p className="text-xl font-semibold">{t.brand}</p>
            </Link>
            <p className="mt-4 max-w-md text-sm text-gray-200">{t.tagline}</p>
          </div>

          {t.menu.map((section) => (
            <div key={section.title}>
              <h3 className="text-base font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="footer-link text-sm text-gray-200 transition-colors duration-150 hover:text-warnning
                      hover:text-blue-500 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-700 pt-6 text-xs text-gray-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t.brand}. {t.copyright}
          </p>
          <div className="flex flex-wrap gap-4">
            {t.bottomLinks.map((link) => (
              <Link
                key={`bottom-${link.to}-${link.label}`}
                to={link.to}
                className="footer-link underline underline-offset-4 transition-colors duration-150 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

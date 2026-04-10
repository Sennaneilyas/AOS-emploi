import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "../../context/LangContext";
import logo from "../../../public/logo.png";

const content = {
  fr: {
    brand: "AOS Emploi",
    links: [
      { to: "/", label: "Accueil" },
      { to: "/about", label: "À propos" },
      { to: "/services", label: "Services" },
      { to: "/blog", label: "Actualités" },
      { to: "/contact", label: "Contact" },
    ],
    adhherent: "Espace Adhérent",
    languageLabel: "Langue",
  },
  ar: {
    brand: "AOS التشغيل",
    links: [
      { to: "/", label: "الرئيسية" },
      { to: "/about", label: "من نحن" },
      { to: "/services", label: "الخدمات" },
      { to: "/blog", label: "الأخبار" },
      { to: "/contact", label: "اتصل بنا" },
    ],
    adhherent: "فضاء المنخرط",
    languageLabel: "اللغة",
  },
};

function Navbar() {
  const { lang, setLang } = useLang();
  const t = content[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/40 shadow-sm shadow-black/5 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-navy"
          >
            <img
              src={logo}
              alt={t.brand}
              className="h-14 w-auto"
              style={{ maxHeight: "56px" }}
            />
            <span className="sr-only">{t.brand}</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {t.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 ${
                    isActive ? "text-navy" : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/espace-adherent"
              className="hidden rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light md:inline-flex"
            >
              {t.adhherent}
            </Link>
            <div className="hidden items-center gap-2 rounded-lg border border-gray-200/70 bg-white p-1 sm:inline-flex">
              <span className="px-2 text-xs font-medium text-gray-500">
                {t.languageLabel}
              </span>
              <button
                type="button"
                onClick={() => setLang("fr")}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  lang === "fr"
                    ? "bg-navy text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang("ar")}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                  lang === "ar"
                    ? "bg-navy text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                AR
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex rounded-lg border border-gray-200/70 p-2 text-gray-700 transition-colors duration-150 hover:text-gray-900 lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-200 lg:hidden ${
            isMobileMenuOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="grid gap-1 rounded-xl border border-gray-200/70 bg-white p-2 shadow-sm shadow-black/5">
            {t.links.map((link) => (
              <NavLink
                key={`mobile-${link.to}`}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-navy/10 text-navy"
                      : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/espace-adherent"
              onClick={closeMobileMenu}
              className="mt-2 rounded-lg bg-navy px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light"
            >
              {t.adhherent}
            </Link>

            <div className="mt-4 inline-flex items-center justify-between rounded-lg border border-gray-200/70 p-1.5">
              <span className="px-2 text-xs font-medium text-gray-500">
                {t.languageLabel}
              </span>
              <div className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                    lang === "fr"
                      ? "bg-navy text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ar")}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                    lang === "ar"
                      ? "bg-navy text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  AR
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

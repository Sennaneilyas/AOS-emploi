import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLang } from "../../context/LangContext";
import { Switch } from "../ui/switch";
import logo from "../../../public/logo.png";

const content = {
  fr: {
    brand: "AOS Emploi",
    links: [
      { to: "/", label: "Accueil" },
      {
        label: "Cadre Associatif",
        children: [
          { to: "/about/statuts", label: "Statuts" },
          { to: "/about/reglement", label: "Règlement Intérieur" },
          { to: "/about/bureau", label: "Bureau Dirigeant" },
        ],
      },
      { to: "/services", label: "Services" },
      { to: "/blog", label: "Actualités" },
      { to: "/contact", label: "Contact" },
    ],
    adherent: "Espace Adhérent",
    languageLabel: "Langue",
  },
  ar: {
    brand: "AOS التشغيل",
    links: [
      { to: "/", label: "الرئيسية" },
      {
        label: "اطار الجمعية",
        children: [
          { to: "/about/statuts", label: "النظام الأساسي" },
          { to: "/about/reglement", label: "النظام الداخلي" },
          { to: "/about/bureau", label: "المكتب المسير" },
        ],
      },
      { to: "/services", label: "الخدمات" },
      { to: "/blog", label: "الأخبار" },
      { to: "/contact", label: "اتصل بنا" },
    ],
    adherent: "فضاء المنخرط",
    languageLabel: "اللغة",
  },
};

function DesktopDropdown({ label, children, scrolled, useWhiteText }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef(null);

  const handleEnter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
          useWhiteText ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-navy"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${useWhiteText ? "text-white/70" : "text-gray-400"}`}
        />
      </button>

      <div
        className={`absolute start-0 top-full z-50 pt-2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-48 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-black/5">
          {children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-navy/5 font-semibold text-navy"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({ label, children, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-150 hover:text-gray-900"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block rounded-lg py-2 ps-8 pe-3 text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-navy/10 font-semibold text-navy"
                  : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const { lang, setLang } = useLang();
  const location = useLocation();
  const t = content[lang];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location.pathname === "/";
  const isTransparent = !scrolled && !isMobileMenuOpen;
  const useWhiteText = isTransparent;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu scroll lock */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        scrolled && !isMobileMenuOpen
          ? "top-4 left-0 right-0 mx-auto max-w-[calc(100%-2rem)] rounded-2xl bg-white/60 border border-white/40 shadow-lg shadow-black/5 backdrop-blur-lg saturate-150"
          : isMobileMenuOpen
            ? "top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm"
            : "top-0 left-0 w-full bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ease-out ${scrolled ? "min-h-12" : "min-h-16"}`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform duration-300"
          >
            <img
              src={logo}
              alt={t.brand}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-14"} ${useWhiteText ? "brightness-0 invert" : ""}`}
            />
            <span className="sr-only">{t.brand}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {t.links.map((link) =>
              link.children ? (
                <DesktopDropdown
                  key={link.label}
                  label={link.label}
                  children={link.children}
                  scrolled={scrolled}
                  useWhiteText={useWhiteText}
                />
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      useWhiteText
                        ? isActive ? "text-white" : "text-white/70 hover:text-white"
                        : isActive
                          ? "text-navy font-semibold underline decoration-orange-500 decoration-2 underline-offset-8"
                          : "text-gray-600 hover:text-navy"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/espace-adherent"
              className={`hidden rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 md:inline-flex ${
                useWhiteText 
                  ? "bg-white text-navy hover:bg-white/90" 
                  : "bg-navy text-white hover:bg-navy-light"
              }`}
            >
              {t.adherent}
            </Link>

            <div className={`hidden h-5 w-px md:block ${useWhiteText ? "bg-white/20" : "bg-gray-200"}`} />

            <div className={`hidden items-center gap-3 rounded-full border px-3 py-1.5 sm:inline-flex transition-colors duration-300 ${
              isTransparent ? "border-gray-200/20 bg-black/5" : (useWhiteText ? "border-white/20 bg-white/10" : "border-gray-200/70 bg-white")
            }`}>
              <span
                className={`text-xs font-bold transition-colors ${
                  lang === "fr" 
                    ? (useWhiteText ? "text-white" : "text-navy") 
                    : (useWhiteText ? "text-white/40" : "text-gray-400")
                }`}
              >
                FR
              </span>
              <Switch
                checked={lang === "ar"}
                onCheckedChange={(checked) => setLang(checked ? "ar" : "fr")}
                size="sm"
                aria-label={t.languageLabel}
              />
              <span
                className={`text-xs font-bold transition-colors ${
                  lang === "ar" 
                    ? (useWhiteText ? "text-white" : "text-navy") 
                    : (useWhiteText ? "text-white/40" : "text-gray-400")
                }`}
              >
                AR
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className={`inline-flex rounded-lg border p-2 transition-all duration-300 lg:hidden ${
                useWhiteText 
                  ? "border-white/20 text-white hover:bg-white/10" 
                  : "border-gray-200/70 text-gray-700 hover:text-navy hover:bg-gray-50"
              }`}
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              <span
                className={`block transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
            isMobileMenuOpen
              ? "max-h-[560px] pb-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="grid gap-1 rounded-xl border border-gray-200/70 bg-white p-2 shadow-sm shadow-black/5">
            {t.links.map((link) =>
              link.children ? (
                <MobileDropdown
                  key={link.label}
                  label={link.label}
                  children={link.children}
                  onNavigate={closeMobileMenu}
                />
              ) : (
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
              )
            )}

            <Link
              to="/espace-adherent"
              onClick={closeMobileMenu}
              className="mt-2 rounded-lg bg-navy px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light"
            >
              {t.adherent}
            </Link>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200/70 bg-gray-50/50 p-3">
              <span className="text-sm font-medium text-gray-700">
                {t.languageLabel}
              </span>
              <div className="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm border border-gray-100">
                <span
                  className={`text-xs font-bold transition-colors ${
                    lang === "fr" ? "text-navy" : "text-gray-400"
                  }`}
                >
                  FR
                </span>
                <Switch
                  checked={lang === "ar"}
                  onCheckedChange={(checked) => setLang(checked ? "ar" : "fr")}
                  size="sm"
                  aria-label={t.languageLabel}
                />
                <span
                  className={`text-xs font-bold transition-colors ${
                    lang === "ar" ? "text-navy" : "text-gray-400"
                  }`}
                >
                  AR
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import { motion } from "framer-motion";
import { Mail, Globe, MessageCircle, Share2, Info, Send, MapPin, Phone } from "lucide-react";
import logo from "../../../public/logo.png";

const content = {
  fr: {
    brand: "AOS Emploi",
    tagline: "Association des Oeuvres Sociales du personnel du Ministère de l'Emploi.",
    newsletter: {
      title: "Newsletter",
      subtitle: "Restez informé des dernières actualités et services.",
      placeholder: "Votre email",
      button: "S'abonner",
      success: "Merci pour votre inscription !",
    },
    menu: [
      {
        title: "Association",
        links: [
          { to: "/about/statuts", label: "À propos" },
          { to: "/services", label: "Services" },
          { to: "/actualites", label: "Actualités" },
          { to: "/about/bureau", label: "Bureau Dirigeant" },
        ],
      },
      {
        title: "Accès Rapide",
        links: [
          { to: "/contact", label: "Contact" },
          { to: "/espace-adherent", label: "Espace Adhérent" },
          { to: "/services", label: "Prestations" },
        ],
      },
    ],
    contact: {
      title: "Coordonnées",
      address: "Ministère de l'Emploi, Chellah, Rabat",
      phone: "+212 631 840 091",
      email: "contact@aosemploi.com",
    },
    copyright: "Tous droits réservés.",
    bottomLinks: [
      { to: "/contact", label: "Confidentialité" },
      { to: "/about/statuts", label: "Mentions institutionnelles" },
    ],
  },
  ar: {
    brand: "AOS التشغيل",
    tagline: "جمعية الأعمال الاجتماعية لموظفي وزارة التشغيل.",
    newsletter: {
      title: "النشرة الإخبارية",
      subtitle: "ابق على اطلاع بآخر الأخبار والخدمات.",
      placeholder: "بريدك الإلكتروني",
      button: "اشتراك",
      success: "شكراً لاهتمامكم!",
    },
    menu: [
      {
        title: "الجمعية",
        links: [
          { to: "/about/statuts", label: "من نحن" },
          { to: "/services", label: "الخدمات" },
          { to: "/actualites", label: "الأخبار" },
          { to: "/about/bureau", label: "المكتب المسير" },
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
    ],
    contact: {
      title: "التواصل",
      address: "وزارة التشغيل، شلاه، الرباط",
      phone: "+212 631 840 091",
      email: "contact@aosemploi.com",
    },
    copyright: "جميع الحقوق محفوظة.",
    bottomLinks: [
      { to: "/contact", label: "الخصوصية" },
      { to: "/about/statuts", label: "معلومات مؤسساتية" },
    ],
  },
};

function Footer() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = content[lang];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white">
      {/* Background decoration */}
      <div className="absolute -start-24 -top-24 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />
      <div className="absolute -end-24 bottom-0 h-64 w-64 rounded-full bg-navy-light/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 lg:grid-cols-12"
        >
          {/* Brand and Newsletter */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 group transition-transform duration-300">
              <div className="relative">
                <img src={logo} alt={t.brand} className="h-14 w-auto brightness-0 invert group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-2xl font-bold tracking-tight">{t.brand}</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">{t.tagline}</p>
            
            {/* Newsletter Section */}
            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-4">
                {t.newsletter.title}
              </h4>
              <p className="text-sm text-gray-400 mb-4">{t.newsletter.subtitle}</p>
              <form className="relative max-w-sm group" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  className="w-full bg-navy/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  className="absolute end-1.5 top-1.5 bottom-1.5 bg-brand-orange text-white px-4 rounded-lg text-sm font-bold hover:bg-navy-light transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">{t.newsletter.button}</span>
                  <Send size={14} className={isArabic ? "rotate-180" : ""} />
                </button>
              </form>
            </div>
          </div>

          {/* Menus */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {t.menu.map((section) => (
              <motion.div key={section.title} variants={itemVariants}>
                <h3 className="text-base font-bold mb-6 text-white">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={`${section.title}-${link.label}`}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-400 transition-all duration-300 hover:text-brand-orange flex items-center gap-2 group"
                      >
                        <span className="h-px w-0 bg-brand-orange transition-all duration-300 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info & Social */}
            <motion.div variants={itemVariants}>
              <h3 className="text-base font-bold mb-6 text-white">{t.contact.title}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{t.contact.address}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={18} className="text-brand-orange shrink-0" />
                  <span dir="ltr">{t.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail size={18} className="text-brand-orange shrink-0" />
                  <a href={`mailto:${t.contact.email}`} className="hover:text-brand-orange transition-colors">
                    {t.contact.email}
                  </a>
                </li>
              </ul>
              
              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                {[
                  { icon: Globe, href: "#" },
                  { icon: MessageCircle, href: "#" },
                  { icon: Share2, href: "#" },
                  { icon: Info, href: "#" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors duration-300 border border-white/10"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {t.brand}. {t.copyright}</p>
          <div className="flex gap-8">
            {t.bottomLinks.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-white transition-colors underline underline-offset-4 decoration-gray-700">
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

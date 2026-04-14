import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import { MapPin, Phone, Clock } from "lucide-react";

const content = {
  fr: {
    title: "Contactez-nous",
    subtitle: "Nous sommes heureux de répondre à toutes vos questions.",
    formTitle: "Formulaire de contact",
    nameLabel: "Nom",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    messageLabel: "Message",
    submitButton: "Envoyer",
    contactInfo: "Informations de contact",
    address: "Adresse",
    addressValue: "Ministère de l'Emploi, Chellah, Rabat, Maroc",
    phone: "Téléphone",
    phoneValue: "0631840091",
    hours: "Heures de bureau",
    hoursValue: "Lundi - Vendredi: 8h30 - 17h00",
  },
  ar: {
    title: "اتصل بنا",
    subtitle: "نحن سعداء بالإجابة على جميع أسئلتك.",
    formTitle: "نموذج الاتصال",
    nameLabel: "الاسم",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف",
    messageLabel: "الرسالة",
    submitButton: "إرسال",
    contactInfo: "معلومات الاتصال",
    address: "العنوان",
    addressValue: "وزارة التشغيل، شلاح، الرباط، المغرب",
    phone: "الهاتف",
    phoneValue: "0631840091",
    hours: "ساعات العمل",
    hoursValue: "الاثنين - الجمعة: 8:30 - 17:00",
  },
};

function ContactPage() {
  const { lang } = useLang();
  const t = content[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log("[v0] Form submitted");
  };

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="bg-gray-soft py-16">
        <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className={`text-4xl text-navy md:text-5xl ${lang === "ar" ? "font-semibold" : "font-bold"}`}>
            {t.title}
          </h1>
          <p className="mt-4 text-base text-gray-600">{t.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className={`text-2xl text-navy mb-8 ${lang === "ar" ? "font-semibold" : "font-bold"}`}>
                {t.formTitle}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-transparent transition-all"
                    placeholder={t.nameLabel}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-transparent transition-all"
                    placeholder={t.emailLabel}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-transparent transition-all"
                    placeholder={t.phoneLabel}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-transparent transition-all resize-none"
                    placeholder={t.messageLabel}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white px-5 py-3 rounded-lg font-semibold transition-colors duration-150 hover:bg-navy-light"
                >
                  {t.submitButton}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className={`text-2xl text-navy mb-8 ${lang === "ar" ? "font-semibold" : "font-bold"}`}>
                {t.contactInfo}
              </h2>
              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-navy flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.address}</h3>
                    <p className="text-gray-600">{t.addressValue}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-navy flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.phone}</h3>
                    <a
                      href="tel:+212631840091"
                      className="text-navy hover:text-navy-light transition-colors"
                    >
                      {t.phoneValue}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-navy flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.hours}</h3>
                    <p className="text-gray-600">{t.hoursValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default ContactPage;

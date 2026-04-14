import PageWrapper from "../components/layout/PageWrapper";
import { useLang } from "../context/LangContext";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const content = {
  fr: {
    title: "Contactez-nous",
    subtitle: "Nous sommes heureux de répondre à toutes vos questions.",
    nameLabel: "Nom complet",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    subjectLabel: "Sujet",
    messageLabel: "Message",
    submitButton: "Envoyer le message",
    submittingButton: "Envoi en cours...",
    contactInfo: "Nos coordonnées",
    address: "Adresse",
    addressValue: "Ministère de l'Emploi, Chellah, Rabat, Maroc",
    phone: "Téléphone",
    phoneValue: "+212 631 840 091",
    hours: "Heures de bureau",
    hoursValue: "Lundi - Vendredi: 8h30 - 17h00",
    successMessage: "Message envoyé avec succès!",
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
  },
  ar: {
    title: "اتصل بنا",
    subtitle: "نحن سعداء بالإجابة على جميع أسئلتك.",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف",
    subjectLabel: "الموضوع",
    messageLabel: "الرسالة",
    submitButton: "إرسال الرسالة",
    submittingButton: "...جاري الإرسال",
    contactInfo: "معلومات الاتصال",
    address: "العنوان",
    addressValue: "وزارة التشغيل، شلاه، الرباط، المغرب",
    phone: "الهاتف",
    phoneValue: "+212 631 840 091",
    hours: "ساعات العمل",
    hoursValue: "الاثنين - الجمعة: 8:30 - 17:00",
    successMessage: "!تم إرسال الرسالة بنجاح",
    errorMessage: ".حدث خطأ. يرجى المحاولة مرة أخرى",
  },
};

function ContactPage() {
  const { lang } = useLang();
  const t = content[lang];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Integrate WordPress API when backend is ready
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(t.successMessage);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const inputBaseClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all";

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="bg-gray-soft py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl text-navy ${
              lang === "ar" ? "font-semibold" : "font-bold"
            }`}
          >
            {t.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputBaseClass}
                      placeholder={t.nameLabel}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputBaseClass}
                      placeholder={t.emailLabel}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputBaseClass}
                      placeholder={t.phoneLabel}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-white mb-2"
                    >
                      {t.subjectLabel}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputBaseClass}
                      placeholder={t.subjectLabel}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-white mb-2"
                  >
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    className={`${inputBaseClass} resize-none`}
                    placeholder={t.messageLabel}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-navy text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-150 hover:bg-navy-light disabled:opacity-50 disabled:cursor-not-allowed border"
                >
                  {isSubmitting ? t.submittingButton : t.submitButton}
                </button>
              </form>
            </div>

            {/* Contact Information - Takes 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-gray-soft rounded-2xl p-6 md:p-8 space-y-8">
                <h2
                  className={`text-xl text-navy mb-6 ${
                    lang === "ar" ? "font-semibold" : "font-bold"
                  }`}
                >
                  {t.contactInfo}
                </h2>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {t.address}
                    </h3>
                    <p className="text-sm text-gray-600">{t.addressValue}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {t.phone}
                    </h3>
                    <a
                      href={`tel:${t.phoneValue.replace(/\s/g, "")}`}
                      className="text-sm text-navy hover:text-navy-light transition-colors"
                    >
                      {t.phoneValue}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:contact@aosemploi.com"
                      className="text-sm text-navy hover:text-navy-light transition-colors"
                    >
                      contact@aosemploi.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {t.hours}
                    </h3>
                    <p className="text-sm text-gray-600">{t.hoursValue}</p>
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

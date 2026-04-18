import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, Phone, Briefcase, Send, CheckCircle } from "lucide-react";
import { registerAdherent } from "../../services/authAPI";
import { useLang } from "../../context/LangContext";
import Field from "./Field";
import { authContent } from "./authContent";

const successVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white py-2.5 ps-9 pe-4 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-150 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";

function RegisterForm() {
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const t = authContent[lang];

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await registerAdherent(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(err.message ?? t.registerFallbackError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        variants={successVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4 py-6 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle size={32} />
        </div>
        <div>
          <p className={`text-lg text-navy ${isArabic ? "font-semibold" : "font-bold"}`}>
            {t.registerSuccessTitle}
          </p>
          <p className="mt-2 max-w-sm text-sm text-gray-500">{t.registerSuccessSub}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <Field label={t.registerNom} icon={User} error={errors.nom?.message}>
        <input
          type="text"
          className={inputClass}
          placeholder={t.registerNom}
          {...register("nom", { required: t.registerErrors.nomRequired })}
        />
      </Field>

      <Field label={t.registerEmail} icon={Mail} error={errors.email?.message}>
        <input
          type="email"
          className={inputClass}
          placeholder={t.registerEmailPlaceholder}
          {...register("email", {
            required: t.registerErrors.emailRequired,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t.registerErrors.emailInvalid,
            },
          })}
        />
      </Field>

      <Field label={t.registerTelephone} icon={Phone}>
        <input
          type="tel"
          className={inputClass}
          placeholder="+212 6XX XXX XXX"
          {...register("telephone")}
        />
      </Field>

      <Field label={t.registerLieu} icon={Briefcase} error={errors.lieu_travail?.message}>
        <input
          type="text"
          className={inputClass}
          placeholder={t.registerLieu}
          {...register("lieu_travail", { required: t.registerErrors.lieuRequired })}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {t.registerSubmitting}
          </>
        ) : (
          <>
            <Send size={16} />
            {t.registerSubmit}
          </>
        )}
      </button>
    </form>
  );
}

export default RegisterForm;
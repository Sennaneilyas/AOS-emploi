import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Mail, KeyRound, LogIn, Eye, EyeOff } from "lucide-react";
import { loginAdherent } from "../../services/authAPI";
import useAuth from "../../hooks/useAuth";
import { useLang } from "../../context/LangContext";
import Field from "./Field";
import { authContent } from "./authContent";

const inputBase =
  "w-full rounded-lg border border-gray-200 bg-white py-2.5 ps-9 text-sm text-gray-900 placeholder-gray-400 transition-colors duration-150 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy";

function LoginForm() {
  const { lang } = useLang();
  const t = authContent[lang];

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const redirectTo = location.state?.from?.pathname ?? "/espace-adherent";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsPending(false);
    try {
      const { token, user } = await loginAdherent(data);
      login(user, token);
      toast.success(t.loginWelcome(user.nom));
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.status === 403) {
        setIsPending(true);
      } else {
        toast.error(err.message ?? t.loginFallbackError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <Field label={t.loginEmail} icon={Mail} error={errors.email?.message}>
        <input
          type="email"
          autoComplete="off"
          className={inputBase + " pe-4"}
          placeholder="prenom.nom@emploi.gov.ma"
          {...register("email", {
            required: t.loginErrors.emailRequired,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t.loginErrors.emailInvalid,
            },
          })}
        />
      </Field>

      <Field
        label={t.loginKey}
        icon={KeyRound}
        error={errors.unique_key?.message}
        hint={t.loginKeyHint}
      >
        <input
          type={showKey ? "text" : "password"}
          autoComplete="new-password"
          className={inputBase + " pe-10"}
          placeholder=""
          {...register("unique_key", { required: t.loginErrors.keyRequired })}
        />
        <button
          type="button"
          onClick={() => setShowKey((v) => !v)}
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 transition-colors hover:text-navy"
          aria-label={showKey ? t.loginKeyHide : t.loginKeyShow}
        >
          {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </Field>

      {isPending && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t.loginPendingMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {t.loginSubmitting}
          </>
        ) : (
          <>
            <LogIn size={16} />
            {t.loginSubmit}
          </>
        )}
      </button>

      {import.meta.env.DEV && (
        <div className="rounded-lg border border-navy/10 bg-navy/5 px-4 py-3 text-xs text-navy/70">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-navy/40" />
            <strong className="font-semibold text-navy/90 uppercase tracking-wider text-[10px]">Mock Access</strong>
          </div>
          <p>Email: <code className="font-mono text-navy">ilyas@ministere.gov.ma</code></p>
          <p>Key: <code className="font-mono text-navy">AOS-2026-K7X3-M9QP</code></p>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
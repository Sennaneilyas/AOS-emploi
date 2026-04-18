import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../context/LangContext";
import useAuth from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import PageWrapper from "../components/layout/PageWrapper";
import { authContent } from "../components/auth/authContent";

const tabContentVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -24 : 24,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export default function AuthPage() {
  const { lang } = useLang();
  const t = authContent[lang];

  const { isAuthenticated, checking } = useAuth();
  const navigate = useNavigate();

  // 0 = login, 1 = register
  const [[tab, direction], setTab] = useState([0, 0]);

  // Already logged in → redirect to dashboard
  useEffect(() => {
    if (!checking && isAuthenticated) {
      navigate("/espace-adherent", { replace: true });
    }
  }, [isAuthenticated, checking, navigate]);

  const switchTab = (newTab) => {
    if (newTab === tab) return;
    setTab([newTab, newTab - tab]);
  };

  // Token verification in progress
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-soft">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    );
  }

  return (
    <PageWrapper>
      {/* Header Section */}
      <section className="bg-navy pt-32 pb-16 md:pt-32 md:pb-24 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            key={tab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl md:text-4xl ${lang === "ar" ? "font-semibold" : "font-bold"}`}
          >
            {tab === 0 ? t.loginTab : t.registerTab}
          </motion.h1>
          <p className="mt-4 text-sm text-white/60 max-w-md mx-auto">
            {t.tagline}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-soft pt-8 pb-24 md:pt-12">
        <div className="mx-auto w-full max-w-md px-4 sm:px-6">
          <div className="relative z-10">
            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-navy/[0.03]">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/30">
                {[t.loginTab, t.registerTab].map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => switchTab(i)}
                    className={`relative flex-1 py-4 text-sm font-semibold transition-all duration-200 ${tab === i
                      ? "text-navy bg-white"
                      : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                      }`}
                  >
                    {label}
                    {tab === i && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute bottom-0 start-0 end-0 h-0.5 bg-navy"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Form area */}
              <div className="overflow-hidden p-6 md:p-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={tab}
                    custom={direction}
                    variants={tabContentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {tab === 0 ? <LoginForm /> : <RegisterForm />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom switch link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              {tab === 0 ? (
                <>
                  {t.noAccount}{" "}
                  <button
                    type="button"
                    onClick={() => switchTab(1)}
                    className="font-bold text-navy hover:text-orange-500 transition-colors underline underline-offset-4"
                  >
                    {t.registerTab}
                  </button>
                </>
              ) : (
                <>
                  {t.hasAccount}{" "}
                  <button
                    type="button"
                    onClick={() => switchTab(0)}
                    className="font-bold text-navy hover:text-orange-500 transition-colors underline underline-offset-4"
                  >
                    {t.loginTab}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
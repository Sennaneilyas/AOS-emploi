"use client";

import { Logout01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useState } from "react";
import { useLang } from "../../context/LangContext";

const LogoutButton = ({ onLogout }) => {
  const { lang } = useLang();
  const [isConfirming, setIsConfirming] = useState(false);
  const [count, setCount] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);

  const t = {
    fr: { logout: "Déconnexion", cancel: "Annuler" },
    ar: { logout: "تسجيل الخروج", cancel: "إلغاء" }
  }[lang];

  // Configure splitting logic based on language
  const isAr = lang === "ar";
  const separator = isAr ? " " : "";
  const delayMultiplier = isAr ? 0.05 : 0.005; // Slightly longer delay for whole words

  useEffect(() => {
    if (!isConfirming) return;
    if (count === 0) {
      onLogout();
      return;
    }

    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isConfirming, count, onLogout]);

  const handleClick = (newState) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsConfirming(newState);
    if (newState) setCount(5);

    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div className="flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {!isConfirming ? (
          <motion.button
            key="logout"
            layoutId="logoutButton"
            onClick={() => handleClick(true)}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: isAnimating ? "none" : "auto" }}
            initial={{
              backgroundColor: "#F4F6F9",
              filter: "blur(1px)",
              opacity: 1,
            }}
            animate={{
              backgroundColor: "#1B2A4A",
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{
              backgroundColor: "#F4F6F9",
              filter: "blur(1px)",
              opacity: 0,
            }}
            className="text-white px-6 py-3 rounded-full flex items-center gap-2 justify-center overflow-hidden border border-transparent shadow-sm"
            transition={{
              layout: { duration: 0.4, ease: [0.77, 0, 0.175, 1] },
              backgroundColor: { duration: 0.4, ease: "easeInOut" },
              filter: { duration: 0.1, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <HugeiconsIcon icon={Logout01Icon} className="h-4 w-4 text-white" />
            <motion.span
              layoutId="buttonText"
              className="flex font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              dir={isAr ? "rtl" : "ltr"}
            >
              {t.logout.split(separator).map((part, i) => (
                <motion.span
                  key={`logout-${i}`}
                  initial={{ y: 20, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: 0.3,
                    delay: i * delayMultiplier,
                    ease: [0.785, 0.135, 0.15, 0.86],
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {part}{isAr ? " " : ""}
                </motion.span>
              ))}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            key="cancel"
            layoutId="logoutButton"
            onClick={() => handleClick(false)}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: isAnimating ? "none" : "auto" }}
            initial={{
              backgroundColor: "#1B2A4A",
              filter: "blur(1px)",
              opacity: 0,
            }}
            animate={{
              backgroundColor: "#FFEDF1",
              filter: "blur(0px)",
              opacity: 1,
            }}
            exit={{
              backgroundColor: "#1B2A4A",
              filter: "blur(1px)",
              opacity: 0,
            }}
            className="px-4 py-3 rounded-full flex items-center gap-3 overflow-hidden shadow-sm"
            transition={{
              layout: { duration: 0.4, ease: [0.77, 0, 0.175, 1] },
              backgroundColor: { duration: 0.4, ease: "easeInOut" },
              filter: { duration: 0.2, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeIn" },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="bg-[#FE322A] p-1.5 rounded-full flex items-center justify-center shrink-0"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4 text-white" />
            </motion.div>

            <motion.span
              layoutId="buttonText"
              className="text-[#FE322A] font-bold flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              dir={isAr ? "rtl" : "ltr"}
            >
              {t.cancel.split(separator).map((part, i) => (
                <motion.span
                  key={`cancel-${i}`}
                  initial={{ y: 20, opacity: 0, scale: 0.3 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: 0.3,
                    delay: i * delayMultiplier,
                    ease: [0.785, 0.135, 0.15, 0.86],
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {part}{isAr ? " " : ""}
                </motion.span>
              ))}
            </motion.span>

            <motion.div
              className="bg-[#FE322A] text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center justify-center relative overflow-hidden shrink-0 min-w-[28px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={count}
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.8,
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.8,
                  }}
                  transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LogoutButton;
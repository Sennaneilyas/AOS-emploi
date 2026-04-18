import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../context/LangContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PageWrapper({ children }) {
  const { lang } = useLang();

  return (
    <div className="min-h-screen bg-navy text-gray-900">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0, x: lang === "ar" ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: lang === "ar" ? -10 : 10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default PageWrapper;

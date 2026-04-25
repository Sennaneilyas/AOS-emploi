import React, { useState } from "react";
import { useLang } from "../../context/LangContext";
import useAuth from "../../hooks/useAuth";
import { dashboardContent } from "./dashboardContent";
import { ColorChangeCards } from "../ui/color-change-card";
import { CheckCircle2, ChevronLeft, Calendar as CalendarIcon, Users, MapPin, FileText, Banknote } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const DemandesSection = () => {
  const { lang } = useLang();
  const { user } = useAuth();
  const t = dashboardContent[lang].demandes;
  
  const [selectedType, setSelectedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [history, setHistory] = useState([
    {
      id: "REQ-001",
      date: "2023-11-15",
      type: t.types.vacation.title,
      status: "approved"
    }
  ]);

  const cardsData = [
    {
      id: "aid",
      heading: t.types.aid.title,
      description: t.types.aid.desc,
      imgSrc: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "loan",
      heading: t.types.loan.title,
      description: t.types.loan.desc,
      imgSrc: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "vacation",
      heading: t.types.vacation.title,
      description: t.types.vacation.desc,
      imgSrc: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800",
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect to backend API
    /*
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await api.post('/api/demandes', {
        userId: user.id,
        type: selectedType,
        ...data
      });
      // Handle success
    } catch (error) {
      // Handle error
    }
    */

    // Mock successful submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t.successMsg);
      
      // Add to mock history
      const newRequest = {
        id: `REQ-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toISOString().split('T')[0],
        type: t.types[selectedType].title,
        status: "pending"
      };
      
      setHistory([newRequest, ...history]);
      setSelectedType(null); // Go back to cards
    }, 1500);
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-navy">{t.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{t.description}</p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedType ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ColorChangeCards cards={cardsData} onCardClick={setSelectedType} lang={lang} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setSelectedType(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-500 rtl:rotate-180" />
              </button>
              <div>
                <h3 className="text-xl font-bold text-navy">{t.types[selectedType].title}</h3>
                <p className="text-sm text-gray-500">{t.formTitle}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Read-only Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {dashboardContent[lang].profile.fields.nom}
                  </label>
                  <p className="text-gray-900 font-medium">{user?.nom}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    {dashboardContent[lang].profile.fields.unique_key}
                  </label>
                  <p className="text-gray-900 font-medium">{user?.unique_key || "AOS-XXXX-YYYY"}</p>
                </div>
              </div>

              {/* Dynamic Fields based on Request Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {selectedType === 'aid' && (
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.rib} *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="rib"
                        required 
                        placeholder="24 chiffres"
                        className="block w-full ps-10 pe-3 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>
                )}

                {selectedType === 'loan' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.amount} *</label>
                      <input 
                        type="number" 
                        name="amount"
                        required 
                        min="1000"
                        step="500"
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.reason} *</label>
                      <select 
                        name="reason"
                        required
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      >
                        <option value="">Sélectionner un motif</option>
                        <option value="medical">Frais médicaux</option>
                        <option value="school">Frais de scolarité</option>
                        <option value="other">Autre urgence</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedType === 'vacation' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.destination} *</label>
                      <select 
                        name="destination"
                        required
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      >
                        <option value="">Sélectionner un centre</option>
                        <option value="marrakech">Complexe Marrakech</option>
                        <option value="agadir">Résidence Agadir</option>
                        <option value="tanger">Club Tanger</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.persons} *</label>
                      <input 
                        type="number" 
                        name="persons"
                        min="1"
                        max="6"
                        required 
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.startDate} *</label>
                      <input 
                        type="date" 
                        name="startDate"
                        required 
                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t.fields.endDate} *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                          type="date" 
                          name="endDate"
                          required 
                          className="block w-full ps-10 pe-3 py-3 border border-gray-200 rounded-xl focus:ring-brand-orange focus:border-brand-orange transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Declaration Checkbox */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                <input 
                  type="checkbox" 
                  required
                  id="declaration"
                  className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                />
                <label htmlFor="declaration" className="text-sm text-gray-600 cursor-pointer">
                  {t.fields.declaration}
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-orange text-white font-medium rounded-xl hover:bg-[#e05a1d] focus:ring-4 focus:ring-brand-orange/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                  {t.submitBtn}
                </button>
              </div>

            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Table */}
      <div className="mt-12 pt-12 border-t border-gray-100">
        <h3 className="text-lg font-bold text-navy mb-6">{t.historyTitle}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-start">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-xl font-semibold">{t.tableHeaders.id}</th>
                <th scope="col" className="px-6 py-4 font-semibold">{t.tableHeaders.date}</th>
                <th scope="col" className="px-6 py-4 font-semibold">{t.tableHeaders.type}</th>
                <th scope="col" className="px-6 py-4 rounded-tr-xl font-semibold">{t.tableHeaders.status}</th>
              </tr>
            </thead>
            <tbody>
              {history.map((req, index) => (
                <tr key={req.id} className={`bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index === history.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-6 py-4 font-medium text-navy">{req.id}</td>
                  <td className="px-6 py-4 text-gray-500">{req.date}</td>
                  <td className="px-6 py-4 text-gray-900">{req.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[req.status]}`}>
                      {t.status[req.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucune demande pour le moment.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DemandesSection;

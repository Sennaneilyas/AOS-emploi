import React from "react";
import { useLang } from "../../context/LangContext";
import useAuth from "../../hooks/useAuth";
import { dashboardContent, sidebarItems } from "./dashboardContent";
import { cn } from "../../lib/utils";
import { LogOut } from "lucide-react";

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const { lang } = useLang();
  const { logout } = useAuth();
  const t = dashboardContent[lang].sidebar;
  const logoutLabel = lang === 'ar' ? 'تسجيل الخروج' : 'Déconnexion';

  return (
    <div className="flex h-full flex-col bg-white border-e border-gray-100">
      <nav className="flex-1 space-y-1 px-4 py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-navy text-white shadow-lg shadow-navy/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-navy"
              )}
            >
              <Icon
                className={cn(
                  "me-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive ? "text-brand-orange" : "text-gray-400 group-hover:text-navy"
                )}
                aria-hidden="true"
              />
              {t[item.labelKey]}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
        >
          <LogOut className="me-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {logoutLabel}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;

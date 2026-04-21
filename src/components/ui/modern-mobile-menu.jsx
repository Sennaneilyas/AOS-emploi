import React, { useRef, useEffect, useMemo } from 'react';
import { LayoutDashboard, User, FileText, Bell, Settings, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useLang } from '../../context/LangContext';

/**
 * InteractiveMenu Component
 * A modern, interactive bottom bar for mobile navigation.
 */

const defaultItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Alertes', icon: Bell },
    { id: 'settings', label: 'Paramètres', icon: Settings },
];

const InteractiveMenu = ({ items, accentColor, activeTab, onTabChange }) => {
  const { logout } = useAuth();
  const { lang } = useLang();
  
  const finalItems = useMemo(() => {
     const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
     return isValid ? items : defaultItems;
  }, [items]);

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeIndex = finalItems.findIndex(item => item.id === activeTab);
      if (activeIndex === -1) return;

      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];

      if (activeItemElement && activeTextElement) {
        const textWidth = activeTextElement.offsetWidth;
        activeItemElement.style.setProperty('--lineWidth', `${textWidth}px`);
      }
    };

    setLineWidth();

    window.addEventListener('resize', setLineWidth);
    return () => {
      window.removeEventListener('resize', setLineWidth);
    };
  }, [activeTab, finalItems]);

  const navStyle = useMemo(() => {
      return { '--component-active-color': accentColor || '#F26522' };
  }, [accentColor]); 

  return (
    <nav
      className="menu-bottom"
      role="navigation"
      style={navStyle}
    >
      {finalItems.map((item, index) => {
        const isActive = activeTab === item.id;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            className={`menu-bottom__item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ '--lineWidth': '0px' }} 
          >
            <div className="menu-bottom__icon">
              <IconComponent className="icon" />
            </div>
            <strong
              className={`menu-bottom__text ${isActive ? 'active' : ''}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              {item.label}
            </strong>
          </button>
        );
      })}
      
      {/* Logout button at the end of the bottom menu */}
      <button
        className="menu-bottom__item text-red-500"
        onClick={logout}
      >
        <div className="menu-bottom__icon">
          <LogOut className="icon" />
        </div>
        <strong className="menu-bottom__text">
          {lang === 'ar' ? 'خروج' : 'Exit'}
        </strong>
      </button>
    </nav>
  );
};

export { InteractiveMenu };

import React from 'react';
import { Home, BarChart2, MessageCircle, Settings, Book } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: 'Ana Sayfa' },
    { view: AppView.STATS, icon: BarChart2, label: 'Takip' },
    { view: AppView.PRAYERS, icon: Book, label: 'Dualar' },
    { view: AppView.AI_CHAT, icon: MessageCircle, label: 'Asistan' },
    { view: AppView.SETTINGS, icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-safe pt-2 px-2 flex justify-between items-center z-50 h-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => onChangeView(item.view)}
            className={`flex flex-col items-center gap-1 min-w-[3.5rem] flex-1 transition-colors duration-200 ${
              isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

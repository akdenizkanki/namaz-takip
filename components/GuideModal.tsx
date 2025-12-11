import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { PrayerGuide } from '../data/prayerGuides';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: PrayerGuide | null;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, guide }) => {
  if (!isOpen || !guide) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-emerald-600 p-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={24} className="text-emerald-100" />
            <div>
                <h3 className="font-bold text-lg">{guide.title}</h3>
                <p className="text-xs text-emerald-100 opacity-90">{guide.rekat}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-emerald-700/50 rounded-full hover:bg-emerald-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {guide.steps.map((step, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2 sticky top-0 bg-slate-50 pb-2 border-b border-slate-100">
                  <span className="flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                    {index + 1}
                  </span>
                  <h4 className="font-semibold text-slate-800">{step.title}</h4>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-2 whitespace-pre-line">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800 text-center">
            Daha detaylı bilgi için Asistan sekmesinden yapay zekaya sorabilirsiniz.
          </div>
        </div>
      </div>
    </div>
  );
};

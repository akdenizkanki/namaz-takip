import React from 'react';
import { CheckCircle, Circle, Clock, Bell, BellOff, BookOpen } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  trName: string;
  time: string;
  completed: boolean;
  alarmEnabled: boolean;
  onToggle: () => void;
  onToggleAlarm: (e: React.MouseEvent) => void;
  onShowInfo: (e: React.MouseEvent) => void;
  isNext: boolean;
  warningText?: string;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({ 
  name, trName, time, completed, alarmEnabled, onToggle, onToggleAlarm, onShowInfo, isNext, warningText 
}) => {
  return (
    <div 
      onClick={onToggle}
      className={`relative flex items-center justify-between p-4 mb-3 rounded-2xl transition-all duration-300 border cursor-pointer select-none
        ${isNext ? 'bg-emerald-50 border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'bg-white border-gray-100 shadow-sm'}
        ${completed ? 'opacity-70 bg-gray-50' : ''}
      `}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className={`p-2 rounded-full hidden xs:block ${isNext ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
            <Clock size={20} />
        </div>
        <div>
          <h3 className={`font-semibold text-lg flex items-center gap-2 ${isNext ? 'text-emerald-900' : 'text-slate-700'}`}>
            {trName}
          </h3>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium ${isNext ? 'text-emerald-600' : 'text-slate-400'}`}>
              {time}
            </p>
            {warningText && (
               <span className="text-[10px] text-orange-500 font-bold bg-orange-50 px-1.5 py-0.5 rounded">
                 {warningText}
               </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onShowInfo}
          className="p-2 rounded-full transition-colors bg-blue-50 text-blue-500 hover:bg-blue-100 mr-1"
          title="Nasıl Kılınır?"
        >
          <BookOpen size={18} />
        </button>

        <button
          onClick={onToggleAlarm}
          className={`p-2 rounded-full transition-colors ${
            alarmEnabled 
              ? 'bg-amber-100 text-amber-600' 
              : 'bg-transparent text-slate-300 hover:text-slate-400'
          }`}
        >
          {alarmEnabled ? <Bell size={18} /> : <BellOff size={18} />}
        </button>

        <div className="pl-1">
            {completed ? (
              <CheckCircle className="text-emerald-500 fill-emerald-50" size={28} />
            ) : (
              <Circle className="text-gray-300" size={28} />
            )}
        </div>
      </div>

      {isNext && !completed && (
        <div className="absolute -top-2 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          SIRADAKİ
        </div>
      )}
    </div>
  );
};

import React, { useMemo } from 'react';
import { DailyRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, XCircle, Clock, CalendarDays } from 'lucide-react';

interface StatsViewProps {
  history: Record<string, DailyRecord>;
  nextPrayer: string | null; // Needed to determine if a prayer time has passed today
}

export const StatsView: React.FC<StatsViewProps> = ({ history, nextPrayer }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Helper to determine status of a specific prayer
  const getPrayerStatus = (dateStr: string, prayerKey: string, isCompleted: boolean) => {
    // 1. If completed, always green
    if (isCompleted) return 'completed';

    // 2. If it's a past date and not completed, it's missed (Red)
    if (dateStr < todayStr) return 'missed';

    // 3. If it's today
    if (dateStr === todayStr) {
      // Map nextPrayer to an order index
      const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const currentNextIndex = nextPrayer ? prayerOrder.indexOf(nextPrayer) : -1;
      const targetIndex = prayerOrder.indexOf(prayerKey.charAt(0).toUpperCase() + prayerKey.slice(1));

      // If nextPrayer is null (end of day) or target index is before next prayer index, it's passed
      // Exception: If nextPrayer is Fajr (meaning next day's Fajr), then all of today is passed.
      // Ideally nextPrayer logic from App needs to be robust. 
      // Simplified Logic: 
      // If target prayer comes BEFORE the "nextPrayer", then its time has passed.
      
      // If we are currently waiting for 'Asr', then 'Fajr' and 'Dhuhr' are passed.
      if (currentNextIndex !== -1 && targetIndex < currentNextIndex) {
        return 'missed';
      }
      
      // If next prayer is Fajr (for tomorrow), then all of today's prayers (that are unchecked) are missed
      if (nextPrayer === 'Fajr' && new Date().getHours() > 4) { // Simple check to ensure it's late night
         return 'missed';
      }

      return 'upcoming';
    }

    // Future dates (shouldn't happen in history usually but safe fallback)
    return 'upcoming';
  };

  const processedData = useMemo(() => {
    const days = [];
    const today = new Date();
    
    // Get last 7 days
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const record = history[dateStr];
      
      // Prayer Data
      const p = record?.prayers || { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
      
      const dayData = {
        dateStr: dateStr,
        dayName: i === 0 ? 'Bugün' : i === 1 ? 'Dün' : d.toLocaleDateString('tr-TR', { weekday: 'long' }),
        shortDay: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
        prayers: [
          { key: 'fajr', label: 'Sabah', status: getPrayerStatus(dateStr, 'fajr', p.fajr) },
          { key: 'dhuhr', label: 'Öğle', status: getPrayerStatus(dateStr, 'dhuhr', p.dhuhr) },
          { key: 'asr', label: 'İkindi', status: getPrayerStatus(dateStr, 'asr', p.asr) },
          { key: 'maghrib', label: 'Akşam', status: getPrayerStatus(dateStr, 'maghrib', p.maghrib) },
          { key: 'isha', label: 'Yatsı', status: getPrayerStatus(dateStr, 'isha', p.isha) },
        ],
        totalCompleted: 0
      };

      dayData.totalCompleted = Object.values(p).filter(Boolean).length;
      days.push(dayData);
    }
    return days; // Returns Today first, so we might want to reverse for chart
  }, [history, nextPrayer]);

  // For Chart (Reverse so oldest is left)
  const chartData = [...processedData].reverse().map(d => ({
    day: d.shortDay,
    completed: d.totalCompleted
  }));

  const totalPrayersAllTime = Object.values(history).reduce((acc: number, curr: DailyRecord) => {
    return acc + Object.values(curr.prayers).filter(Boolean).length;
  }, 0);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 animate-fade-in overflow-y-auto">
      <div className="p-6 space-y-6 pb-24">
        
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Toplam Kılınan</p>
             <p className="text-4xl font-black text-emerald-600">{totalPrayersAllTime}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Haftalık Oran</p>
             <p className="text-4xl font-black text-blue-500">
               {Math.round((chartData.reduce((a,b)=>a+b.completed,0) / 35) * 100)}%
             </p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarDays size={18} className="text-emerald-500"/> Son 7 Gün Performansı
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
              <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
              />
              <Bar dataKey="completed" radius={[6, 6, 6, 6]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.completed === 5 ? '#10b981' : '#cbd5e1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 px-1">Detaylı Çizelge</h3>
          {processedData.map((day, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">{day.dayName}</span>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
                  {day.dateStr}
                </span>
              </div>
              
              <div className="flex justify-between items-center gap-2">
                {day.prayers.map((prayer) => (
                  <div key={prayer.key} className="flex flex-col items-center gap-1 flex-1">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        prayer.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                        prayer.status === 'missed' ? 'bg-red-50 text-red-500' :
                        'bg-slate-50 text-slate-300'
                      }`}
                      title={`${prayer.label}: ${prayer.status === 'completed' ? 'Kılındı' : prayer.status === 'missed' ? 'Kılınmadı' : 'Bekliyor'}`}
                    >
                      {prayer.status === 'completed' && <CheckCircle2 size={20} />}
                      {prayer.status === 'missed' && <XCircle size={20} />}
                      {prayer.status === 'upcoming' && <Clock size={20} />}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{prayer.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

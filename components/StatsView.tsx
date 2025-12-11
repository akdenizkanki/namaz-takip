import React, { useMemo, useState } from 'react';
import { DailyRecord, KazaCounts } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, XCircle, Clock, CalendarDays, Calculator, Minus, Plus, AlertCircle } from 'lucide-react';

interface StatsViewProps {
  history: Record<string, DailyRecord>;
  nextPrayer: string | null;
  kazaCounts?: KazaCounts; // Optional to not break strict mode immediately
  onUpdateKaza?: (newCounts: KazaCounts) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ history, nextPrayer, kazaCounts, onUpdateKaza }) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'kaza'>('weekly');
  const todayStr = new Date().toISOString().split('T')[0];

  // Helper to determine status of a specific prayer
  const getPrayerStatus = (dateStr: string, prayerKey: string, isCompleted: boolean) => {
    if (isCompleted) return 'completed';
    if (dateStr < todayStr) return 'missed';
    if (dateStr === todayStr) {
      const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const currentNextIndex = nextPrayer ? prayerOrder.indexOf(nextPrayer) : -1;
      const targetIndex = prayerOrder.indexOf(prayerKey.charAt(0).toUpperCase() + prayerKey.slice(1));

      if (currentNextIndex !== -1 && targetIndex < currentNextIndex) {
        return 'missed';
      }
      if (nextPrayer === 'Fajr' && new Date().getHours() > 4) {
         return 'missed';
      }
      return 'upcoming';
    }
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
    return days;
  }, [history, nextPrayer]);

  const chartData = [...processedData].reverse().map(d => ({
    day: d.shortDay,
    completed: d.totalCompleted
  }));

  const totalPrayersAllTime = Object.values(history).reduce((acc: number, curr: DailyRecord) => {
    return acc + Object.values(curr.prayers).filter(Boolean).length;
  }, 0);

  // --- KAZA LOGIC ---
  const [birthYear, setBirthYear] = useState('');
  const [pubertyAge, setPubertyAge] = useState('');

  const calculateKaza = () => {
    if (!birthYear || !pubertyAge) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }
    const year = parseInt(birthYear);
    const age = parseInt(pubertyAge);
    
    if (isNaN(year) || isNaN(age)) return;

    const currentYear = new Date().getFullYear();
    const missedYears = currentYear - (year + age);

    if (missedYears < 0) {
      alert("Ergenlik yaşı doğum yılından sonra gelmelidir.");
      return;
    }

    // Rough calculation: 365 days * missedYears
    const totalDays = missedYears * 365; // Keeping it simple (leap years ignored for simplicity)
    
    const newCounts: KazaCounts = {
      fajr: totalDays,
      dhuhr: totalDays,
      asr: totalDays,
      maghrib: totalDays,
      isha: totalDays,
      vitr: totalDays
    };

    if (onUpdateKaza) onUpdateKaza(newCounts);
  };

  const updateKazaCount = (key: keyof KazaCounts, delta: number) => {
    if (!kazaCounts || !onUpdateKaza) return;
    const newCounts = { ...kazaCounts, [key]: Math.max(0, kazaCounts[key] + delta) };
    onUpdateKaza(newCounts);
  };

  const hasActiveKaza = kazaCounts && Object.values(kazaCounts).some((v) => (v as number) > 0);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 animate-fade-in overflow-y-auto">
      {/* Tabs */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab('weekly')}
             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'weekly' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
           >
             Haftalık Özet
           </button>
           <button 
             onClick={() => setActiveTab('kaza')}
             className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'kaza' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
           >
             Kaza Takibi
           </button>
        </div>
      </div>

      {activeTab === 'weekly' ? (
        <div className="p-6 space-y-6 pb-24">
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

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CalendarDays size={18} className="text-emerald-500"/> Son 7 Gün Performansı
            </h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="completed" radius={[6, 6, 6, 6]} barSize={20}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.completed === 5 ? '#10b981' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${prayer.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : prayer.status === 'missed' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-300'}`}>
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
      ) : (
        <div className="p-6 pb-24 animate-fade-in">
           {!hasActiveKaza ? (
             <div className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-100 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Calculator size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Kaza Namazı Hesapla</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Hiç namaz kılmadığınız varsayılarak, ergenlik yaşınızdan bugüne kadar geçen süre hesaplanır.
                </p>
                
                <div className="space-y-4 text-left">
                   <div>
                     <label className="text-xs font-bold text-slate-700 ml-1">Doğum Yılınız</label>
                     <input 
                        type="number" 
                        placeholder="Örn: 1990" 
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                     />
                   </div>
                   <div>
                     <label className="text-xs font-bold text-slate-700 ml-1">Ergenlik Yaşınız</label>
                     <input 
                        type="number" 
                        placeholder="Örn: 12" 
                        value={pubertyAge}
                        onChange={(e) => setPubertyAge(e.target.value)}
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                     />
                   </div>
                   
                   <div className="bg-amber-50 p-3 rounded-lg flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700">Bu işlem mevcut kaza sayılarınızı sıfırlar ve yeniden hesaplar.</p>
                   </div>

                   <button 
                     onClick={calculateKaza}
                     className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
                   >
                     Hesapla ve Başla
                   </button>
                </div>
             </div>
           ) : (
             <div className="space-y-4">
               <div className="bg-emerald-600 p-4 rounded-2xl text-white shadow-lg mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">Kaza Listeniz</h3>
                    <p className="text-emerald-100 text-xs">Vakit namazlarınızı kıldıkça buradan düşebilirsiniz.</p>
                  </div>
                  <button 
                    onClick={() => {
                        if(window.confirm("Kaza sayılarını sıfırlayıp yeniden hesaplamak istiyor musunuz?")) {
                            onUpdateKaza && onUpdateKaza({fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, vitr: 0});
                        }
                    }}
                    className="p-2 bg-emerald-700/50 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                     <Calculator size={18} />
                  </button>
               </div>

               <div className="grid grid-cols-1 gap-3">
                 {[
                   { key: 'fajr', label: 'Sabah Namazı' },
                   { key: 'dhuhr', label: 'Öğle Namazı' },
                   { key: 'asr', label: 'İkindi Namazı' },
                   { key: 'maghrib', label: 'Akşam Namazı' },
                   { key: 'isha', label: 'Yatsı Namazı' },
                   { key: 'vitr', label: 'Vitir Namazı' },
                 ].map((item) => (
                    <div key={item.key} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                       <div>
                          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                          <p className="text-2xl font-black text-slate-800 tabular-nums">
                            {kazaCounts ? kazaCounts[item.key as keyof KazaCounts] : 0}
                          </p>
                       </div>
                       <div className="flex items-center gap-2">
                          <button 
                             onClick={() => updateKazaCount(item.key as keyof KazaCounts, -1)}
                             className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 hover:bg-emerald-100 active:scale-95 transition-all font-medium text-sm"
                          >
                             <CheckCircle2 size={16} />
                             Kıldım
                          </button>
                          <button 
                             onClick={() => updateKazaCount(item.key as keyof KazaCounts, 1)}
                             className="p-2 bg-slate-50 text-slate-400 rounded-lg border border-slate-100 hover:bg-slate-100 hover:text-slate-600 active:scale-95 transition-all"
                             title="Borç Ekle"
                          >
                             <Plus size={18} />
                          </button>
                       </div>
                    </div>
                 ))}
               </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};
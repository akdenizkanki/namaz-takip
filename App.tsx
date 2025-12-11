import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Moon, Volume2, Zap, ZapOff, AlertTriangle, X } from 'lucide-react';
import { AppView, DailyRecord, PrayerTimes, LocationData, AlarmSettings, KazaCounts } from './types';
import { getPrayerTimes, getHijriDate } from './services/prayerService';
import { prayerGuides, PrayerGuide } from './data/prayerGuides';
import { PrayerCard } from './components/PrayerCard';
import { BottomNav } from './components/BottomNav';
import { StatsView } from './components/StatsView';
import { AIView } from './components/AIView';
import { GuideModal } from './components/GuideModal';
import { PrayersView } from './components/PrayersView';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<string>("");
  const [history, setHistory] = useState<Record<string, DailyRecord>>({});
  const [alarms, setAlarms] = useState<AlarmSettings>({
    fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false
  });
  const [kazaCounts, setKazaCounts] = useState<KazaCounts>({
    fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, vitr: 0
  });
  
  // Notification permission state
  const [permission, setPermission] = useState<NotificationPermission>('default');
  
  // Wake Lock State
  const [wakeLock, setWakeLock] = useState<any>(null);
  const [isWakeLockActive, setIsWakeLockActive] = useState(false);

  // Guide Modal State
  const [activeGuide, setActiveGuide] = useState<PrayerGuide | null>(null);

  // Alarm Warning Modal
  const [showAlarmWarning, setShowAlarmWarning] = useState(false);

  // Initialize date string for today
  const todayStr = new Date().toISOString().split('T')[0];

  // Sound Player Helper
  const playAlarmSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4 note
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

        osc.start();
        osc.stop(ctx.currentTime + 1);
    } catch (e) {
        console.error("Audio playback failed", e);
    }
  };

  const sendNotification = (title: string, body: string) => {
      // If we have permission and it's supported
      if (permission === 'granted') {
          try {
             new Notification(title, { body, icon: 'https://cdn-icons-png.flaticon.com/512/3655/3655163.png' });
          } catch (e) {
             console.log('Notification failed', e);
          }
      }
      // Always play sound
      playAlarmSound();
  };

  // Wake Lock Functionality
  const toggleWakeLock = async () => {
    if ('wakeLock' in navigator) {
      if (!isWakeLockActive) {
        try {
          // @ts-ignore - Navigator types might not include wakeLock in all envs yet
          const lock = await navigator.wakeLock.request('screen');
          setWakeLock(lock);
          setIsWakeLockActive(true);
          
          lock.addEventListener('release', () => {
            setIsWakeLockActive(false);
            setWakeLock(null);
          });
        } catch (err) {
          console.error(`${err} - Wake Lock failed`);
          alert("Ekran açık tutma özelliği bu tarayıcıda desteklenmiyor veya engellendi.");
        }
      } else {
        if (wakeLock) {
          wakeLock.release();
          setWakeLock(null);
          setIsWakeLockActive(false);
        }
      }
    } else {
      alert("Tarayıcınız 'Ekranı Açık Tut' özelliğini desteklemiyor.");
    }
  };

  // Re-acquire wake lock on visibility change (if it was active)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isWakeLockActive) {
        // Try to re-request
        try {
           // @ts-ignore
           const lock = await navigator.wakeLock.request('screen');
           setWakeLock(lock);
        } catch(e) {
           console.log("Re-lock failed", e);
           setIsWakeLockActive(false); // Reset if failed
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isWakeLockActive]);

  useEffect(() => {
    // Load data from localStorage
    const savedHistory = localStorage.getItem('prayerHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedAlarms = localStorage.getItem('alarmSettings');
    if (savedAlarms) setAlarms(JSON.parse(savedAlarms));

    const savedKaza = localStorage.getItem('kazaCounts');
    if (savedKaza) setKazaCounts(JSON.parse(savedKaza));

    // Check Notification Permission
    if ('Notification' in window) {
        setPermission(Notification.permission);
    }

    // Get Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location error", error);
          setLocation({
            latitude: 41.0082,
            longitude: 28.9784,
            city: "İstanbul (Varsayılan)"
          });
        }
      );
    } else {
       setLocation({
            latitude: 41.0082,
            longitude: 28.9784,
            city: "İstanbul (Varsayılan)"
       });
    }
  }, []);

  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        setLoading(true);
        const times = await getPrayerTimes(location.latitude, location.longitude);
        const hijri = await getHijriDate(location.latitude, location.longitude);
        setPrayerTimes(times);
        setHijriDate(hijri);
        setLoading(false);
      };
      fetchData();
    }
  }, [location]);

  // Alarm Logic Interval
  useEffect(() => {
    if (!prayerTimes) return;

    const checkAlarms = setInterval(() => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const parseTime = (timeStr: string) => {
            const [h, m] = timeStr.split(':').map(Number);
            return h * 60 + m;
        };

        const isTriggerTime = (targetMinutes: number) => {
             return currentTime === targetMinutes;
        };
        
        // Define Logic: 30 mins before next prayer (except Isha)
        const sunriseMin = parseTime(prayerTimes.Sunrise);
        if (alarms.fajr && isTriggerTime(sunriseMin - 30)) {
            sendNotification("Sabah Namazı Vakti Çıkıyor!", "Güneşin doğmasına 30 dakika kaldı.");
        }

        const asrMin = parseTime(prayerTimes.Asr);
        if (alarms.dhuhr && isTriggerTime(asrMin - 30)) {
            sendNotification("Öğle Namazı Vakti Çıkıyor!", "İkindi ezanına 30 dakika kaldı.");
        }

        const maghribMin = parseTime(prayerTimes.Maghrib);
        if (alarms.asr && isTriggerTime(maghribMin - 30)) {
            sendNotification("İkindi Namazı Vakti Çıkıyor!", "Akşam ezanına 30 dakika kaldı.");
        }

        const ishaMin = parseTime(prayerTimes.Isha);
        if (alarms.maghrib && isTriggerTime(ishaMin - 30)) {
            sendNotification("Akşam Namazı Vakti Çıkıyor!", "Yatsı ezanına 30 dakika kaldı.");
        }

        // Isha Alarm: At exact time
        if (alarms.isha && isTriggerTime(ishaMin)) {
            sendNotification("Yatsı Ezanı", "Yatsı namazı vakti girdi.");
        }

    }, 60000); // Check every minute

    return () => clearInterval(checkAlarms);
  }, [prayerTimes, alarms, permission]);

  const togglePrayer = (prayerKey: string) => {
    setHistory(prev => {
      const currentDayRecord = prev[todayStr] || {
        date: todayStr,
        prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false }
      };

      const updatedRecord = {
        ...currentDayRecord,
        prayers: {
          ...currentDayRecord.prayers,
          [prayerKey]: !currentDayRecord.prayers[prayerKey as keyof typeof currentDayRecord.prayers]
        }
      };

      const newHistory = { ...prev, [todayStr]: updatedRecord };
      localStorage.setItem('prayerHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const toggleAlarm = (e: React.MouseEvent, prayerKey: keyof AlarmSettings) => {
      e.stopPropagation();
      
      if (permission === 'default') {
          Notification.requestPermission().then(res => setPermission(res));
      }

      setAlarms(prev => {
          const newState = !prev[prayerKey];
          // If turning ON an alarm, and warning hasn't been shown, show it
          if (newState && !localStorage.getItem('alarmWarningShown')) {
            setShowAlarmWarning(true);
            localStorage.setItem('alarmWarningShown', 'true');
          }

          const newAlarms = { ...prev, [prayerKey]: newState };
          localStorage.setItem('alarmSettings', JSON.stringify(newAlarms));
          return newAlarms;
      });
  };

  const updateKazaCounts = (newCounts: KazaCounts) => {
    setKazaCounts(newCounts);
    localStorage.setItem('kazaCounts', JSON.stringify(newCounts));
  };

  const handleShowGuide = (e: React.MouseEvent, prayerKey: string) => {
    e.stopPropagation();
    const guide = prayerGuides[prayerKey];
    if (guide) {
      setActiveGuide(guide);
    }
  };

  const getNextPrayer = (): string | null => {
    if (!prayerTimes) return null;
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (currentTime < prayerTimes.Fajr) return 'Fajr';
    if (currentTime < prayerTimes.Dhuhr) return 'Dhuhr';
    if (currentTime < prayerTimes.Asr) return 'Asr';
    if (currentTime < prayerTimes.Maghrib) return 'Maghrib';
    if (currentTime < prayerTimes.Isha) return 'Isha';
    return 'Fajr'; // Next day
  };

  const nextPrayer = getNextPrayer();
  const currentDayData = history[todayStr]?.prayers || { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };

  const renderHome = () => {
    if (loading || !prayerTimes) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
          <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
          <p className="text-slate-500">Vakitler Yükleniyor...</p>
        </div>
      );
    }

    return (
      <div className="pb-24 animate-fade-in">
        {/* Header Card */}
        <div className="bg-emerald-600 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
             <Moon size={150} />
          </div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-emerald-100 text-sm font-medium mb-1">{hijriDate}</p>
              <h1 className="text-2xl font-bold">Bugün</h1>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div className="flex items-center gap-1 bg-emerald-700/50 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                <MapPin size={12} />
                <span>{location?.city || "Konum Alındı"}</span>
              </div>
              
              <button 
                onClick={toggleWakeLock}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs backdrop-blur-sm transition-colors border ${
                  isWakeLockActive 
                    ? 'bg-amber-400 border-amber-400 text-amber-900 font-bold animate-pulse' 
                    : 'bg-emerald-700/50 border-transparent text-emerald-100'
                }`}
              >
                {isWakeLockActive ? <Zap size={12} fill="currentColor" /> : <ZapOff size={12} />}
                <span>{isWakeLockActive ? 'Uyanık Mod' : 'Uyku Modu'}</span>
              </button>
            </div>
          </div>

          <div className="relative z-10">
             <p className="text-emerald-100 text-sm mb-1">Sıradaki Vakit</p>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                    {nextPrayer && prayerTimes[nextPrayer]}
                </span>
                <span className="text-lg text-emerald-200">
                    {nextPrayer === 'Fajr' ? 'İmsak' : 
                     nextPrayer === 'Dhuhr' ? 'Öğle' : 
                     nextPrayer === 'Asr' ? 'İkindi' : 
                     nextPrayer === 'Maghrib' ? 'Akşam' : 'Yatsı'}
                </span>
             </div>
          </div>
        </div>

        {/* Permission Banner */}
        {permission === 'default' && (
             <div 
                onClick={() => Notification.requestPermission().then(res => setPermission(res))}
                className="mx-5 -mt-6 mb-2 relative z-20 bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-3 cursor-pointer shadow-sm"
             >
                <div className="bg-amber-100 p-2 rounded-full text-amber-600"><Volume2 size={16} /></div>
                <div>
                    <p className="text-xs font-bold text-amber-800">Bildirimlere İzin Ver</p>
                    <p className="text-[10px] text-amber-600">Vakit çıkmadan uyarı alabilmek için tıklayın.</p>
                </div>
             </div>
        )}

        {/* Prayer List */}
        <div className={`px-5 relative z-20 space-y-3 ${permission === 'default' ? 'mt-0' : '-mt-8'}`}>
          <PrayerCard 
            name="Fajr" trName="İmsak / Sabah" time={prayerTimes.Fajr} 
            completed={currentDayData.fajr} onToggle={() => togglePrayer('fajr')} isNext={nextPrayer === 'Fajr'} 
            alarmEnabled={alarms.fajr} onToggleAlarm={(e) => toggleAlarm(e, 'fajr')}
            onShowInfo={(e) => handleShowGuide(e, 'Fajr')}
            warningText={alarms.fajr ? "Güneşten 30dk önce" : ""}
          />
           <PrayerCard 
            name="Dhuhr" trName="Öğle" time={prayerTimes.Dhuhr} 
            completed={currentDayData.dhuhr} onToggle={() => togglePrayer('dhuhr')} isNext={nextPrayer === 'Dhuhr'} 
            alarmEnabled={alarms.dhuhr} onToggleAlarm={(e) => toggleAlarm(e, 'dhuhr')}
            onShowInfo={(e) => handleShowGuide(e, 'Dhuhr')}
            warningText={alarms.dhuhr ? "İkindiden 30dk önce" : ""}
          />
           <PrayerCard 
            name="Asr" trName="İkindi" time={prayerTimes.Asr} 
            completed={currentDayData.asr} onToggle={() => togglePrayer('asr')} isNext={nextPrayer === 'Asr'} 
            alarmEnabled={alarms.asr} onToggleAlarm={(e) => toggleAlarm(e, 'asr')}
            onShowInfo={(e) => handleShowGuide(e, 'Asr')}
            warningText={alarms.asr ? "Akşamdan 30dk önce" : ""}
          />
           <PrayerCard 
            name="Maghrib" trName="Akşam" time={prayerTimes.Maghrib} 
            completed={currentDayData.maghrib} onToggle={() => togglePrayer('maghrib')} isNext={nextPrayer === 'Maghrib'} 
            alarmEnabled={alarms.maghrib} onToggleAlarm={(e) => toggleAlarm(e, 'maghrib')}
            onShowInfo={(e) => handleShowGuide(e, 'Maghrib')}
            warningText={alarms.maghrib ? "Yatsıdan 30dk önce" : ""}
          />
           <PrayerCard 
            name="Isha" trName="Yatsı" time={prayerTimes.Isha} 
            completed={currentDayData.isha} onToggle={() => togglePrayer('isha')} isNext={nextPrayer === 'Isha'} 
            alarmEnabled={alarms.isha} onToggleAlarm={(e) => toggleAlarm(e, 'isha')}
            onShowInfo={(e) => handleShowGuide(e, 'Isha')}
            warningText={alarms.isha ? "Vaktinde" : ""}
          />
        </div>
      </div>
    );
  };

  const renderSettings = () => (
      <div className="p-6 flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
          <div className="bg-slate-100 p-4 rounded-full">
              <SettingsIcon size={48} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Ayarlar</h2>
          
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm w-full max-w-xs text-left space-y-3">
             <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-sm text-slate-600">Konum</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${location ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {location ? 'Aktif' : 'Pasif'}
                </span>
             </div>
             <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-sm text-slate-600">Bildirimler</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${permission === 'granted' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {permission === 'granted' ? 'İzin Verildi' : 'İzin Gerekli'}
                </span>
             </div>
             <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-sm text-slate-600">Ekranı Açık Tut</span>
                    <span className="text-[10px] text-slate-400">Alarm için gereklidir</span>
                </div>
                <button 
                  onClick={toggleWakeLock}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isWakeLockActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isWakeLockActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
             </div>
          </div>

          <button 
            onClick={() => {
                if(window.confirm('Tüm verileri silmek istediğinize emin misiniz?')) {
                    localStorage.clear();
                    window.location.reload();
                }
            }}
            className="text-red-500 text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
          >
              Verileri Sıfırla
          </button>
      </div>
  )
  
  const SettingsIcon = ({size, className}: {size: number, className?: string}) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        {view === AppView.HOME && renderHome()}
        {view === AppView.STATS && <StatsView history={history} nextPrayer={nextPrayer} kazaCounts={kazaCounts} onUpdateKaza={updateKazaCounts} />}
        {view === AppView.PRAYERS && <PrayersView />}
        {view === AppView.AI_CHAT && <AIView />}
        {view === AppView.SETTINGS && renderSettings()}
        
        {/* Guide Modal */}
        <GuideModal 
          isOpen={!!activeGuide} 
          onClose={() => setActiveGuide(null)} 
          guide={activeGuide} 
        />
        
        {/* Alarm Warning Modal */}
        {showAlarmWarning && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-6 animate-fade-in">
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAlarmWarning(false)}></div>
             <div className="bg-white rounded-2xl shadow-xl p-5 relative z-10 max-w-xs text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                   <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Önemli Hatırlatma</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                   Bu bir web uygulaması olduğu için, telefonunuz kilitlendiğinde bildirimler susabilir.
                   <br/><br/>
                   Alarmın kesin çalması için lütfen <span className="font-bold text-emerald-600">"Uyanık Mod"</span>u (Şimşek İkonu) açın ve uygulamayı açık bırakın.
                </p>
                <button 
                  onClick={() => setShowAlarmWarning(false)}
                  className="w-full bg-emerald-600 text-white font-semibold py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                   Anladım, Teşekkürler
                </button>
             </div>
          </div>
        )}

        <BottomNav currentView={view} onChangeView={setView} />
      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';
import { religiousTexts } from '../data/prayersData';

export const PrayersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SURE' | 'DUA'>('SURE');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredTexts = religiousTexts.filter(item => item.category === activeTab);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10 sticky top-0">
         <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Book className="text-emerald-500" />
            Sureler ve Dualar
         </h2>
         
         {/* Tabs */}
         <div className="flex mt-4 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => { setActiveTab('SURE'); setExpandedIndex(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'SURE' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Namaz Sureleri
            </button>
            <button 
              onClick={() => { setActiveTab('DUA'); setExpandedIndex(null); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'DUA' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Namaz Duaları
            </button>
         </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
         {filteredTexts.map((text, index) => (
           <div 
             key={index}
             className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
           >
             <button 
                onClick={() => toggleExpand(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors"
             >
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeTab === 'SURE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {index + 1}
                   </div>
                   <span className="font-semibold text-slate-700">{text.title}</span>
                </div>
                {expandedIndex === index ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
             </button>
             
             {expandedIndex === index && (
                <div className="p-4 pt-0 bg-slate-50/50 border-t border-slate-50">
                   <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mt-3 font-medium">
                      {text.content}
                   </p>
                </div>
             )}
           </div>
         ))}
      </div>
    </div>
  );
};
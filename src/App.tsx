/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, ExternalLink } from 'lucide-react';
import { MONTHS, FORTUNES, ADSTERRA_DIRECT_LINK } from './constants';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [fortune, setFortune] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleMonthClick = (monthName: string) => {
    setSelectedMonth(monthName);
    setLoading(true);
    setFortune(null);

    // Simulate loading destiny
    setTimeout(() => {
      setLoading(false);
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(randomFortune);
      
      // Open Adsterra link in new tab
      window.open(ADSTERRA_DIRECT_LINK, '_blank');
    }, 2000);
  };

  const handleShare = () => {
    const text = "ඔයාගේ උපන් මාසය අනුව අද දවසේ වාසනාව බලන්න! 🔮✨ මෙතනින් බලන්න: " + window.location.href;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background Elements */}
      <div className="stars" />
      <div className="glow-orb" />

      {/* Header Section */}
      <header className="text-center mb-10 z-10 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glowing-title"
        >
          ඔයාගේ උපන් මාසය අනුව වාසනාව බලන්න
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sub-headline"
        >
          ඔබේ උපන් මාසය තෝරා අද දවසේ වාසනාව පරීක්ෂා කරන්න.
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl z-10">
        <AnimatePresence mode="wait">
          {!loading && !fortune ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
            >
              {MONTHS.map((month, index) => (
                <motion.button
                  key={month.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMonthClick(month.name)}
                  className="month-card"
                >
                  <div className="month-icon">{month.id.toString().padStart(2, '0')}</div>
                  <span className="text-lg font-semibold tracking-wider">{month.name}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="result-overlay"
            >
              <div className="spinner" />
              <p className="sub-headline animate-pulse">Loading your destiny...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="month-card p-12 max-w-2xl mx-auto border-neon-cyan/50 bg-neon-cyan/5"
            >
              <h3 className="text-neon-cyan mb-4 uppercase tracking-[0.2em] text-sm font-bold">{selectedMonth} මාසයේ උපන් ඔබට,</h3>
              <p className="text-3xl md:text-4xl font-bold mb-10 leading-tight text-white">
                {fortune}
              </p>
              <button 
                onClick={() => { setFortune(null); setSelectedMonth(null); }}
                className="px-10 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-sm font-bold uppercase tracking-widest"
              >
                නැවත උත්සාහ කරන්න
              </button>
              
              <div className="mt-10 p-5 bg-neon-cyan/10 rounded-2xl border border-neon-cyan/20">
                <p className="text-sm text-neon-cyan flex items-center justify-center gap-2 font-medium">
                  <ExternalLink className="w-4 h-4" />
                  ඔබේ සම්පූර්ණ වාසනාව නව ටැබ් එකකින් විවෘත විය.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Share Button */}
      <div className="whatsapp-float" onClick={handleShare}>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </div>
    </div>
  );
}

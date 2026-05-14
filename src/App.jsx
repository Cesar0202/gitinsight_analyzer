import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGitProfile } from './hooks/useGitProfile';
import { Header } from './components/layout/Header';
import { SearchHero } from './components/analyzer/SearchHero';
import { ProfileSection } from './components/analyzer/ProfileSection';
import { MetricsSection } from './components/analyzer/MetricsSection';
import { Share2, FileText } from 'lucide-react';

const App = () => {
  const { 
    loading, userData, repos, stats, error, 
    platform, analyzeProfile, reset 
  } = useGitProfile();

  // Soporte para enlaces compartibles (Hash routing simple)
  useEffect(() => {
    const hash = window.location.hash.replace('#/', '');
    if (hash && !userData) {
      analyzeProfile(hash);
    }
  }, []);

  // Actualizar el hash cuando cambia el usuario
  useEffect(() => {
    if (userData) {
      window.location.hash = `#/${userData.login}`;
    } else {
      window.location.hash = '';
    }
  }, [userData]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado al portapapeles!');
  };

  const handleExport = () => {
    const originalTitle = document.title;
    if (userData) {
      document.title = `GitInsight - ${userData.name || userData.login}`;
    }
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  return (
    <div className="h-screen flex flex-col relative bg-editorial-bg overflow-hidden">
      <Header platform={platform} />

      <main className={`flex-grow container mx-auto px-24 pt-0 relative z-10 no-scrollbar ${userData ? 'overflow-y-auto' : 'flex items-center justify-center'}`}>
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!userData ? (
              <SearchHero 
                key="search"
                onSearch={analyzeProfile} 
                loading={loading} 
                error={error} 
              />
            ) : (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 py-6"
              >
                {/* Cabecera de acciones del Dashboard */}
                <div className="flex justify-between items-center mb-4 no-print">
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 text-editorial-gray hover:text-black transition-colors group font-bold uppercase text-[10px] tracking-widest"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform text-lg">←</span> Volver a buscar
                  </button>

                  <div className="flex gap-4">
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-black/[0.05] rounded-full text-[10px] font-black uppercase tracking-widest text-editorial-gray hover:bg-black hover:text-white transition-all"
                    >
                      <Share2 className="w-3 h-3" /> Compartir
                    </button>
                    <button 
                      onClick={handleExport}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-all"
                    >
                      <FileText className="w-3 h-3" /> Exportar PDF
                    </button>
                  </div>
                </div>

                <ProfileSection 
                  userData={userData} 
                  stats={stats} 
                  platform={platform} 
                />

                <MetricsSection 
                  stats={stats} 
                  repos={repos} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-6 border-t border-black/[0.03] text-center flex-shrink-0 no-print">
        <p className="text-[10px] uppercase font-black tracking-[0.3em] text-editorial-gray">
          Developed by Cesar@Huriarte — 2026
        </p>
      </footer>
    </div>
  );
};

export default App;

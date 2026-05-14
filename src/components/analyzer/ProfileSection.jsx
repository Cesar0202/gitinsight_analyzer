import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const ProfileSection = ({ userData, stats, platform }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
      {/* Tarjeta de Perfil Editorial */}
      <div className="md:col-span-8 bg-white rounded-3xl p-8 border border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img 
          src={userData.avatar_url} 
          className="w-36 h-36 rounded-3xl shadow-xl" 
          alt="avatar" 
        />
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
            <h2 className="text-4xl font-black tracking-tightest leading-none text-editorial-black">{userData.name || userData.login}</h2>
            <div className="px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-black uppercase tracking-widest text-editorial-gray">
              {platform}
            </div>
          </div>
          <p className="text-lg text-editorial-gray font-medium tracking-tight mb-6 leading-snug max-w-lg">
            "{userData.bio || 'Desarrollador profesional y arquitecto de software.'}"
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-10 mt-6 border-t border-black/[0.05] pt-8">
            <StatItem value={userData.followers} label="Seguidores" />
            <StatItem value={stats.totalStars} label="Estrellas" />
            <StatItem value={stats.totalForks} label="Forks" />
          </div>
        </div>
      </div>

      {/* Widget de Índice Técnico (Score) */}
      <div className="md:col-span-4 bg-black text-white rounded-3xl p-8 flex flex-col justify-between items-center text-center">
        <span className="text-white/30 font-black uppercase tracking-[0.2em] text-[9px]">Índice Técnico</span>
        <div className="flex items-baseline gap-1">
          <span className="text-[7rem] font-black leading-none tracking-tightest">{stats.activityScore}</span>
          <span className="text-2xl font-bold opacity-30 tracking-tight">/100</span>
        </div>
        <div className="text-[11px] font-bold opacity-40 uppercase tracking-widest">
          Rango: {stats.activityScore > 80 ? 'Maestro' : 'Senior'}
        </div>
      </div>

      {/* Sección de Síntesis Generada por IA */}
      <div className="md:col-span-12 py-8 px-4">
        <div className="flex items-center gap-3 mb-10 px-4">
          <Zap className="w-5 h-5 text-editorial-black" fill="black" />
          <h3 className="text-3xl font-black uppercase tracking-tightest text-editorial-black">Síntesis de IA</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {stats.insights.slice(0, 6).map((insight, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-l-3 border-editorial-black pl-6"
            >
              <p className="text-base font-semibold leading-relaxed text-editorial-gray tracking-tight">
                {insight}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }) => (
  <div className="text-left">
    <div className="text-2xl font-black leading-none mb-1 text-editorial-black">{value}</div>
    <div className="text-[9px] uppercase font-black tracking-widest text-editorial-gray">{label}</div>
  </div>
);

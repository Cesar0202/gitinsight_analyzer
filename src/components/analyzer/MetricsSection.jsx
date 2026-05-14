import React from 'react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar 
} from 'recharts';
import { ExternalLink, Layers } from 'lucide-react';

export const MetricsSection = ({ stats, repos }) => {
  // Paleta de colores pastel para las etiquetas del stack
  const COLORS = [
    'bg-accent-lavender', 'bg-accent-mint', 'bg-accent-beige', 
    'bg-pink-50', 'bg-blue-50', 'bg-orange-50',
    'bg-indigo-50', 'bg-emerald-50', 'bg-slate-100',
    'bg-yellow-50', 'bg-rose-50', 'bg-cyan-50'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-6">
      {/* Visualización de Habilidades (Gráfico de Radar) */}
      <div className="md:col-span-6 bg-white rounded-3xl p-8 border border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <h3 className="text-2xl font-black mb-8 tracking-tightest text-editorial-black">Arquitectura de Habilidades</h3>
        <div className="h-[240px] md:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.radarData}>
              <PolarGrid stroke="#f1f5f9" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#000000', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
              <Radar
                name="Habilidades"
                dataKey="A"
                stroke="#000000"
                fill="#000000"
                fillOpacity={0.05}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stack Tecnológico Dinámico (Tags expansivos) */}
      <div className="md:col-span-6 bg-white rounded-3xl p-8 border border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black tracking-tightest text-editorial-black">Stack Tecnológico</h3>
          <Layers className="w-5 h-5 text-editorial-gray" />
        </div>
        <div className="flex flex-wrap gap-2 content-start">
          {stats.langData.map((tech, index) => (
            <div 
              key={tech.name}
              className={`flex-grow px-5 py-3 rounded-2xl border border-black/[0.02] flex items-center justify-center gap-2 transition-all hover:brightness-95 hover:scale-[1.02] ${COLORS[index % COLORS.length]}`}
            >
              <span className="text-[14px] font-black text-editorial-black tracking-tight text-center">{tech.name}</span>
            </div>
          ))}
          {stats.langData.length === 0 && (
            <p className="text-editorial-gray text-sm font-medium italic">No se detectó stack público.</p>
          )}
        </div>
      </div>

      {/* Galería de Proyectos Destacados */}
      <div className="md:col-span-12 py-10 px-4">
        <h3 className="text-3xl font-black uppercase tracking-tightest mb-10 px-4 text-editorial-black">Proyectos Seleccionados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.slice(0, 3).map((repo) => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-black/[0.04] hover:border-black/20 rounded-3xl p-8 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-lg italic">
                  {repo.name[0].toUpperCase()}
                </div>
                <ExternalLink className="w-4 h-4 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-2xl font-black tracking-tightest mb-3 leading-none text-editorial-black">{repo.name}</h4>
              <p className="text-base text-editorial-gray font-medium leading-snug line-clamp-2 mb-8">{repo.description || 'Solución de software profesional.'}</p>
              <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest text-editorial-gray border-t border-black/[0.05] pt-6">
                <span>{repo.stargazers_count} Estrellas</span>
                <span>{repo.forks_count} Forks</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

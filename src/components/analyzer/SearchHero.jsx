import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

export const SearchHero = ({ onSearch, loading, error }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onSearch(username.trim());
  };

  return (
    <div className="flex flex-col items-center pt-2 pb-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center w-full"
      >
        <span className="text-[10px] uppercase font-black tracking-[0.4em] text-editorial-muted mb-6 block">
          Beta 1.0 — Technical Intelligence
        </span>
        
        <h1 className="heading-hero text-editorial-black mb-12 lowercase">
          repo<br />
          <span className="text-black/20">analyzer</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-editorial-gray max-w-2xl mx-auto mb-12 font-medium tracking-tightest leading-snug px-6">
          Analizador técnico de perfiles GitHub y GitLab en segundos.
        </p>
        
        {/* Formulario de búsqueda minimalista */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto px-4 sm:px-6 group mb-8 flex flex-col sm:block gap-3">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Usuario de GitHub..." 
              className="input-minimal shadow-xl w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={loading}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 btn-solid items-center gap-2 py-3 px-6 scale-90"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Analizar</>}
            </button>
          </div>
          
          {/* Botón visible solo en móvil (stackeado) */}
          <button 
            type="submit" 
            disabled={loading}
            className="flex sm:hidden btn-solid items-center justify-center gap-2 w-full py-4 shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analizar perfil
              </>
            )}
          </button>
        </form>

        {/* Manejo de errores de la API */}
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-500 font-bold uppercase text-[10px] tracking-widest"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

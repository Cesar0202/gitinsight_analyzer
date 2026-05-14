import React from 'react';

export const Header = () => {
  return (
    <header className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
      <div className="flex items-center gap-3">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-2 h-2 bg-editorial-black rounded-full" />
          <div className="w-2 h-2 bg-editorial-black/20 rounded-full" />
          <div className="w-2 h-2 bg-editorial-black/20 rounded-full" />
          <div className="w-2 h-2 bg-editorial-black rounded-full" />
        </div>
        <span className="text-xl font-black tracking-tightest text-editorial-black uppercase">gitinsight</span>
      </div>
      {/* Navegación eliminada para un diseño ultra-minimalista */}
    </header>
  );
};

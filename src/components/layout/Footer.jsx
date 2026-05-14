import React from 'react';
import { Github, Gitlab } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="container mx-auto px-6 py-12 border-t border-white/5 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/50">
        <div className="flex items-center gap-3">
          <Github className="w-5 h-5" />
          <Gitlab className="w-5 h-5" />
          <span className="text-sm">Multi-platform Analysis Engine</span>
        </div>
        <div className="flex gap-8 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
        <div className="text-sm">
          © 2026 GitInsight Analyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

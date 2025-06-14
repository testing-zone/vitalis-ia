import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t-2 border-vitalis-gold/20 dark:border-gray-600 px-4 py-6 mt-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold dark:text-yellow-400 dark:fill-yellow-400" />
          <span className="text-vitalis-brown dark:text-white font-medium">Hecho con amor para tu bienestar</span>
          <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold dark:text-yellow-400 dark:fill-yellow-400" />
        </div>
        <p className="text-sm text-vitalis-brown/70 dark:text-gray-300">
          VitalisIA © 2024 - Tu compañero de bienestar universitario
        </p>
      </div>
    </footer>
  );
};

export default Footer;

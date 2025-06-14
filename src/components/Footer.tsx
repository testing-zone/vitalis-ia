
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-vitalis-gold/20 px-4 py-6 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold" />
          <span className="text-vitalis-brown font-medium">Hecho con amor para tu bienestar</span>
          <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold" />
        </div>
        <p className="text-sm text-vitalis-brown/70">
          VitalisIA © 2024 - Tu compañero de bienestar universitario
        </p>
      </div>
    </footer>
  );
};

export default Footer;

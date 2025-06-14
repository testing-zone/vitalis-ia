import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-white border-b-2 border-vitalis-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={handleLogoClick}
          >
            <img 
              src="/lovable-uploads/4e3febb6-c9a1-4006-b0a9-8f196c792c60.png"
              alt="VitalisIA Capibara Logo"
              className="w-10 h-10 rounded-full object-contain bg-white shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-vitalis-brown">VitalisIA</h1>
              <p className="text-xs text-vitalis-green">Tu compañero de bienestar</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

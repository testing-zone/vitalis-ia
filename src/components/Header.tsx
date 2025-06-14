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
            <div className="w-10 h-10 bg-gradient-to-r from-vitalis-gold to-vitalis-green rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-vitalis-brown">VitalisIA</h1>
              <p className="text-xs text-vitalis-green">Tu compañero de bienestar</p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Bell className="w-5 h-5 text-vitalis-brown" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Settings className="w-5 h-5 text-vitalis-brown" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <User className="w-5 h-5 text-vitalis-brown" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

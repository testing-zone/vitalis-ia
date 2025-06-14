import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b-2 border-vitalis-gold/20 px-4 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/4e3febb6-c9a1-4006-b0a9-8f196c792c60.png" 
            alt="VitalisIA" 
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold text-vitalis-brown">VitalisIA</h1>
        </Link>
        
        <div className="flex items-center gap-3">
          <Link to="/notifications">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full ${location.pathname === '/notifications' ? 'bg-vitalis-gold/10' : ''}`}
            >
              <Bell className="w-5 h-5 text-vitalis-brown" />
            </Button>
          </Link>
          <Link to="/settings">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full ${location.pathname === '/settings' ? 'bg-vitalis-gold/10' : ''}`}
            >
              <Settings className="w-5 h-5 text-vitalis-brown" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full ${location.pathname === '/profile' ? 'bg-vitalis-gold/10' : ''}`}
            >
              <User className="w-5 h-5 text-vitalis-brown" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

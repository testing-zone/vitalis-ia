import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Map, 
  MessageCircle, 
  User, 
  Users, 
  Home, 
  Trophy, 
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ChatModal from './ChatModal';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenJourneyMap: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onOpenJourneyMap }) => {
  const location = useLocation();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  
  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { 
      icon: Map, 
      label: 'Journey Map', 
      path: '#journey', 
      active: false, 
      action: 'openJourneyMap'
    },
    { 
      icon: MessageCircle, 
      label: 'Chat IA', 
      path: '#chat', 
      active: false, 
      action: 'openChat'
    },
    { icon: User, label: 'Perfil', path: '/profile', active: location.pathname === '/profile' },
    { icon: Users, label: 'Amigos', path: '/contacts', active: location.pathname === '/contacts' },
    { icon: Trophy, label: 'Logros', path: '#achievements', active: false, action: 'scroll' }
  ];

  const handleNavigationClick = (item: any) => {
    if (item.action === 'openChat') {
      setChatModalOpen(true);
    } else if (item.action === 'openJourneyMap') {
      onOpenJourneyMap();
    } else if (item.action === 'scroll') {
      // Scroll to section logic
      console.log(`Scrolling to ${item.label}`);
    }
    
    if (window.innerWidth < 768) onToggle();
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 md:hidden bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-full w-12 h-12"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Desktop toggle button */}
      <Button
        onClick={onToggle}
        className={`fixed top-4 z-50 hidden md:block bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-full w-10 h-10 transition-all duration-300 ${
          isOpen ? 'left-72' : 'left-4'
        }`}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-white border-r-2 border-vitalis-gold/20 shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-vitalis-gold/20">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/4e3febb6-c9a1-4006-b0a9-8f196c792c60.png" 
                alt="VitalisIA" 
                className="w-8 h-8"
              />
              <h2 className="text-xl font-bold text-vitalis-brown">VitalisIA</h2>
            </div>
            <p className="text-sm text-vitalis-brown/60 mt-1">Tu compañero de bienestar</p>
          </div>

          <ScrollArea className="flex-1">
            {/* Navigation */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-vitalis-brown/60 mb-3 uppercase tracking-wide">
                Navegación
              </h3>
              <div className="space-y-2">
                {navigationItems.map((item, index) => (
                  item.path.startsWith('#') ? (
                    <button
                      key={index}
                      onClick={() => handleNavigationClick(item)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left
                        ${item.active 
                          ? 'bg-vitalis-gold text-white shadow-md' 
                          : 'text-vitalis-brown hover:bg-vitalis-gold/10'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      to={item.path}
                      className={`
                        flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                        ${item.active 
                          ? 'bg-vitalis-gold text-white shadow-md' 
                          : 'text-vitalis-brown hover:bg-vitalis-gold/10'
                        }
                      `}
                      onClick={() => {
                        if (window.innerWidth < 768) onToggle();
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Journey Progress Summary */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-vitalis-brown/60 mb-3 uppercase tracking-wide">
                Progress Summary
              </h3>
              <Card className="p-4 bg-gradient-to-r from-vitalis-green/10 to-vitalis-gold/10 border-2 border-vitalis-gold/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-vitalis-brown">Journey Actual</h4>
                  <Calendar className="w-5 h-5 text-vitalis-gold" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-vitalis-brown/70">Completadas</span>
                    <span className="font-medium text-vitalis-brown">2/6</span>
                  </div>
                  <div className="w-full bg-vitalis-gold/20 rounded-full h-2">
                    <div 
                      className="bg-vitalis-gold rounded-full h-2 transition-all duration-500"
                      style={{ width: '33%' }}
                    />
                  </div>
                  <p className="text-xs text-vitalis-brown/60">
                    ¡Sigue así! Haz click en Journey Map para ver tu ruta completa.
                  </p>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-vitalis-brown/60 mb-3 uppercase tracking-wide">
                Estadísticas Rápidas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-vitalis-gold/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span className="text-sm font-medium text-vitalis-brown">Racha</span>
                  </div>
                  <span className="text-sm font-bold text-vitalis-gold">2 días</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-vitalis-gold/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⭐</span>
                    <span className="text-sm font-medium text-vitalis-brown">XP Total</span>
                  </div>
                  <span className="text-sm font-bold text-vitalis-gold">125</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-vitalis-gold/20">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <span className="text-sm font-medium text-vitalis-brown">Nivel</span>
                  </div>
                  <span className="text-sm font-bold text-vitalis-gold">12</span>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal 
        isOpen={chatModalOpen} 
        onClose={() => setChatModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar; 
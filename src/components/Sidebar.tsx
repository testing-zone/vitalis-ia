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
  X,
  Stethoscope
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ChatModal from './ChatModal';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenJourneyMap: () => void;
  onChatStateChange?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onOpenJourneyMap, onChatStateChange }) => {
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
    { icon: Stethoscope, label: 'Consultorio', path: '/consultorio', active: location.pathname === '/consultorio' }
  ];

  const handleNavigationClick = (item: any) => {
    if (item.action === 'openChat') {
      handleChatModalChange(true);
    } else if (item.action === 'openJourneyMap') {
      onOpenJourneyMap();
    }
    
    if (window.innerWidth < 768) onToggle();
  };

  const handleChatModalChange = (isOpen: boolean) => {
    setChatModalOpen(isOpen);
    onChatStateChange?.(isOpen);
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
        fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 border-r-2 border-vitalis-gold/20 dark:border-gray-600 shadow-xl z-50 transition-colors duration-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-vitalis-gold/20 dark:border-gray-600">
            <Link 
              to="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
              onClick={() => {
                if (window.innerWidth < 768) onToggle();
              }}
            >
              <img 
                src="/img/leaf.png"
                alt="VitalisIA Capibara Logo"
                className="w-10 h-10 rounded-full object-contain bg-white shadow-lg"
              />
              <h2 className="text-xl font-bold text-vitalis-brown dark:text-white">VitalisIA</h2>
            </Link>
            <p className="text-sm text-vitalis-brown/60 dark:text-gray-300 mt-1">Tu compañero de bienestar</p>
          </div>

          <ScrollArea className="flex-1">
            {/* Navigation */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-vitalis-brown/60 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Navegación
              </h3>
              <div className="space-y-2">
                {navigationItems.map((item, index) => (
                  item.path.startsWith('#') ? (
                    <button
                      key={index}
                      onClick={() => handleNavigationClick(item)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left
                        ${item.active 
                          ? 'bg-vitalis-gold text-white shadow-xl shadow-vitalis-gold/30 transform scale-105 border-2 border-vitalis-gold-dark' 
                          : 'text-vitalis-brown dark:text-gray-200 hover:bg-vitalis-gold/10 dark:hover:bg-gray-700 hover:shadow-md hover:transform hover:scale-102 border-2 border-transparent'
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
                        flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                        ${item.active 
                          ? 'bg-vitalis-gold text-white shadow-xl shadow-vitalis-gold/30 transform scale-105 border-2 border-vitalis-gold-dark' 
                          : 'text-vitalis-brown dark:text-gray-200 hover:bg-vitalis-gold/10 dark:hover:bg-gray-700 hover:shadow-md hover:transform hover:scale-102 border-2 border-transparent'
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
              <h3 className="text-sm font-semibold text-vitalis-brown/60 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Progress Summary
              </h3>
              <Card className="p-4 bg-gradient-to-r from-vitalis-green/10 to-vitalis-gold/10 dark:from-gray-700/50 dark:to-gray-600/50 border-2 border-vitalis-gold/20 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-vitalis-brown dark:text-white">Journey Actual</h4>
                  <Calendar className="w-5 h-5 text-vitalis-gold dark:text-yellow-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-vitalis-brown/70 dark:text-gray-300">Completadas</span>
                    <span className="font-medium text-vitalis-brown dark:text-white">2/6</span>
                  </div>
                  <div className="w-full bg-vitalis-gold/20 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-vitalis-gold dark:bg-yellow-400 rounded-full h-2 transition-all duration-500"
                      style={{ width: '33%' }}
                    />
                  </div>
                  <p className="text-xs text-vitalis-brown/60 dark:text-gray-400">
                    ¡Sigue así! Haz click en Journey Map para ver tu ruta completa.
                  </p>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal 
        isOpen={chatModalOpen} 
        onClose={() => handleChatModalChange(false)}
      />
    </>
  );
};

export default Sidebar; 
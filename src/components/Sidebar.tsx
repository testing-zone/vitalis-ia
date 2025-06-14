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
  CheckCircle,
  Lock,
  Star,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ChatModal from './ChatModal';

interface Activity {
  id: number;
  title: string;
  icon: string;
  completed: boolean;
  locked: boolean;
  xp: number;
  day: number;
}

interface Sidebar {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<Sidebar> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  
  // Datos simulados del journey map
  const journeyData: Activity[] = [
    { id: 1, title: 'Check-in matutino', icon: '🌅', completed: true, locked: false, xp: 50, day: 1 },
    { id: 2, title: 'Respiración consciente', icon: '🫁', completed: true, locked: false, xp: 75, day: 1 },
    { id: 3, title: 'Ejercicio suave', icon: '🧘‍♀️', completed: false, locked: false, xp: 100, day: 2 },
    { id: 4, title: 'Diario de gratitud', icon: '📝', completed: false, locked: false, xp: 60, day: 2 },
    { id: 5, title: 'Conexión social', icon: '👥', completed: false, locked: true, xp: 80, day: 3 },
    { id: 6, title: 'Meditación guiada', icon: '🧠', completed: false, locked: true, xp: 120, day: 3 },
    { id: 7, title: 'Reflexión semanal', icon: '🤔', completed: false, locked: true, xp: 150, day: 4 },
    { id: 8, title: 'Actividad física', icon: '🏃‍♂️', completed: false, locked: true, xp: 100, day: 4 },
    { id: 9, title: 'Práctica de mindfulness', icon: '🍃', completed: false, locked: true, xp: 90, day: 5 },
    { id: 10, title: 'Check-in vespertino', icon: '🌙', completed: false, locked: true, xp: 50, day: 5 }
  ];

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { icon: Map, label: 'Journey Map', path: '#journey', active: false, action: 'scroll' },
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

  const handleActivityClick = (activity: Activity) => {
    if (!activity.locked) {
      console.log(`Iniciando actividad: ${activity.title}`);
      // Aquí podrías abrir un modal o navegar a la actividad
    }
  };

  const handleNavigationClick = (item: any) => {
    if (item.action === 'openChat') {
      setChatModalOpen(true);
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

            {/* Journey Map */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-vitalis-brown/60 uppercase tracking-wide">
                  Journey Map
                </h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={selectedWeek === 1 ? "default" : "outline"}
                    className="h-8 px-3 text-xs rounded-lg"
                    onClick={() => setSelectedWeek(1)}
                  >
                    Sem 1
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedWeek === 2 ? "default" : "outline"}
                    className="h-8 px-3 text-xs rounded-lg"
                    onClick={() => setSelectedWeek(2)}
                  >
                    Sem 2
                  </Button>
                </div>
              </div>

              {/* Journey Path */}
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-vitalis-gold via-vitalis-green to-vitalis-gold/20" />
                
                <div className="space-y-4">
                  {journeyData.slice(0, 7).map((activity, index) => (
                    <div key={activity.id} className="relative flex items-center gap-4">
                      {/* Activity Node */}
                      <div className={`
                        relative w-12 h-12 rounded-full border-4 flex items-center justify-center text-lg z-10
                        ${activity.completed 
                          ? 'bg-vitalis-green border-vitalis-green text-white' 
                          : activity.locked 
                            ? 'bg-gray-200 border-gray-300 text-gray-400'
                            : 'bg-white border-vitalis-gold text-vitalis-gold animate-pulse-glow'
                        }
                      `}>
                        {activity.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : activity.locked ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <span>{activity.icon}</span>
                        )}
                        
                        {/* XP Badge */}
                        {!activity.locked && (
                          <div className="absolute -top-1 -right-1 bg-vitalis-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {activity.xp}
                          </div>
                        )}
                      </div>

                      {/* Activity Info */}
                      <Card 
                        className={`
                          p-3 flex-1 border-2 cursor-pointer transition-all duration-200
                          ${activity.completed 
                            ? 'border-vitalis-green/20 bg-vitalis-green/5' 
                            : activity.locked 
                              ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                              : 'border-vitalis-gold/20 hover:border-vitalis-gold hover:shadow-md'
                          }
                        `}
                        onClick={() => handleActivityClick(activity)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`font-medium text-sm ${
                              activity.locked ? 'text-gray-400' : 'text-vitalis-brown'
                            }`}>
                              {activity.title}
                            </h4>
                            <p className="text-xs text-vitalis-brown/50">
                              Día {activity.day} • {activity.xp} XP
                            </p>
                          </div>
                          {activity.completed && (
                            <Star className="w-4 h-4 text-vitalis-gold fill-current" />
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="p-4">
              <Card className="p-4 bg-gradient-to-r from-vitalis-green/10 to-vitalis-gold/10 border-2 border-vitalis-gold/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-vitalis-brown">Progreso Semanal</h4>
                  <Calendar className="w-5 h-5 text-vitalis-gold" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-vitalis-brown/70">Completadas</span>
                    <span className="font-medium text-vitalis-brown">2/10</span>
                  </div>
                  <div className="w-full bg-vitalis-gold/20 rounded-full h-2">
                    <div 
                      className="bg-vitalis-gold rounded-full h-2 transition-all duration-500"
                      style={{ width: '20%' }}
                    />
                  </div>
                  <p className="text-xs text-vitalis-brown/60">
                    ¡Sigue así! Cada paso cuenta.
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
        onClose={() => setChatModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar; 
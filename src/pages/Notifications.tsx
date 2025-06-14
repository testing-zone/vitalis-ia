
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, X, Trophy, Heart, MessageCircle, Calendar } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: '¡Nuevo logro desbloqueado!',
      message: 'Has completado 7 días consecutivos. ¡Increíble racha!',
      time: '2 min',
      read: false,
      icon: Trophy
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Hora de tu check-in emocional',
      message: '¿Cómo te sientes hoy? Registra tu estado de ánimo.',
      time: '15 min',
      read: false,
      icon: Heart
    },
    {
      id: 3,
      type: 'social',
      title: 'Ana comentó en tu progreso',
      message: '"¡Wow, qué progreso tan increíble! Sigue así 💪"',
      time: '1 h',
      read: true,
      icon: MessageCircle
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Meditación de la tarde',
      message: 'Tu sesión de mindfulness de 10 minutos te está esperando.',
      time: '2 h',
      read: true,
      icon: Calendar
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Nivel 12 alcanzado',
      message: 'Has subido de nivel. ¡Nuevas funciones desbloqueadas!',
      time: '1 día',
      read: true,
      icon: Trophy
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-vitalis-gold/10 text-vitalis-gold border-vitalis-gold/20';
      case 'reminder': return 'bg-vitalis-green/10 text-vitalis-green border-vitalis-green/20';
      case 'social': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-vitalis-brown mb-2">Notificaciones</h1>
            <p className="text-vitalis-brown/70">
              {unreadCount > 0 ? `Tienes ${unreadCount} notificaciones sin leer` : 'Todas las notificaciones están al día'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-2xl"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Marcar todas como leídas
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="p-12 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg text-center">
            <Bell className="w-16 h-16 text-vitalis-gold/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-vitalis-brown mb-2">No hay notificaciones</h3>
            <p className="text-vitalis-brown/70">Te avisaremos cuando tengas algo nuevo</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card 
                  key={notification.id} 
                  className={`p-4 bg-white rounded-2xl border-2 shadow-lg transition-all duration-200 ${
                    notification.read 
                      ? 'border-gray-200 opacity-75' 
                      : 'border-vitalis-gold/20 hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl border-2 ${getTypeColor(notification.type)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-vitalis-brown">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-vitalis-gold rounded-full" />
                        )}
                      </div>
                      <p className="text-vitalis-brown/70 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-vitalis-brown/50">{notification.time}</span>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="text-vitalis-green hover:bg-vitalis-green/10"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Notifications;

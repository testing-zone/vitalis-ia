
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, MessageCircle, UserPlus, Trophy, Heart } from 'lucide-react';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts] = useState([
    {
      id: 1,
      name: 'Ana Martínez',
      university: 'Universidad Nacional',
      level: 15,
      streak: 14,
      status: 'online',
      lastActivity: 'Completó una meditación hace 2h',
      avatar: '🧘‍♀️',
      modules: ['MindTrack', 'SoulBoost']
    },
    {
      id: 2,
      name: 'Carlos López',
      university: 'Universidad Nacional',
      level: 8,
      streak: 5,
      status: 'offline',
      lastActivity: 'Registró ejercicio ayer',
      avatar: '🏃‍♂️',
      modules: ['BodySync', 'MindTrack']
    },
    {
      id: 3,
      name: 'María García',
      university: 'Universidad Central',
      level: 20,
      streak: 28,
      status: 'online',
      lastActivity: 'Alcanzó nuevo logro hace 1h',
      avatar: '🌟',
      modules: ['SoulBoost', 'SocialHarmony']
    },
    {
      id: 4,
      name: 'Diego Ruiz',
      university: 'Universidad Nacional',
      level: 11,
      streak: 9,
      status: 'away',
      lastActivity: 'Check-in emocional hace 3h',
      avatar: '😊',
      modules: ['MindTrack', 'SocialHarmony']
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'MindTrack': return '🧠';
      case 'BodySync': return '🌱';
      case 'SoulBoost': return '🍃';
      case 'SocialHarmony': return '🤝';
      default: return '⭐';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-vitalis-brown mb-2">Mis Contactos</h1>
          <p className="text-vitalis-brown/70">Conecta con otros estudiantes en su camino al bienestar</p>
        </div>

        {/* Search and Add */}
        <Card className="p-4 bg-white rounded-2xl border-2 border-vitalis-gold/20 shadow-lg">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-vitalis-brown/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Buscar contactos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-2 border-vitalis-gold/20"
              />
            </div>
            <Button className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-xl">
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white rounded-2xl border-2 border-vitalis-gold/20 shadow-lg text-center">
            <Users className="w-8 h-8 text-vitalis-gold mx-auto mb-2" />
            <div className="text-xl font-bold text-vitalis-brown">{contacts.length}</div>
            <div className="text-sm text-vitalis-brown/70">Contactos</div>
          </Card>
          
          <Card className="p-4 bg-white rounded-2xl border-2 border-vitalis-green/20 shadow-lg text-center">
            <div className="text-2xl mb-2">🟢</div>
            <div className="text-xl font-bold text-vitalis-brown">
              {contacts.filter(c => c.status === 'online').length}
            </div>
            <div className="text-sm text-vitalis-brown/70">En línea</div>
          </Card>
          
          <Card className="p-4 bg-white rounded-2xl border-2 border-vitalis-gold/20 shadow-lg text-center">
            <Trophy className="w-8 h-8 text-vitalis-gold mx-auto mb-2" />
            <div className="text-xl font-bold text-vitalis-brown">
              {Math.round(contacts.reduce((acc, c) => acc + c.level, 0) / contacts.length)}
            </div>
            <div className="text-sm text-vitalis-brown/70">Level promedio</div>
          </Card>
          
          <Card className="p-4 bg-white rounded-2xl border-2 border-vitalis-green/20 shadow-lg text-center">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-xl font-bold text-vitalis-brown">
              {Math.round(contacts.reduce((acc, c) => acc + c.streak, 0) / contacts.length)}
            </div>
            <div className="text-sm text-vitalis-brown/70">Racha promedio</div>
          </Card>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-vitalis-gold/20 rounded-2xl flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-vitalis-brown text-lg">{contact.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      Nivel {contact.level}
                    </Badge>
                  </div>
                  <p className="text-vitalis-brown/70 text-sm mb-2">{contact.university}</p>
                  <p className="text-vitalis-brown/60 text-xs mb-3">{contact.lastActivity}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-sm">
                      <span>🔥</span>
                      <span className="text-vitalis-brown/70">{contact.streak} días</span>
                    </div>
                    <div className="flex gap-1">
                      {contact.modules.map((module, index) => (
                        <span key={index} className="text-sm" title={module}>
                          {getModuleIcon(module)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-vitalis-green hover:bg-vitalis-green-dark text-white rounded-xl">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Mensaje
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl border-2 border-vitalis-gold/20 hover:bg-vitalis-gold/10">
                      <Heart className="w-4 h-4 mr-1" />
                      Motivar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <Card className="p-12 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg text-center">
            <Users className="w-16 h-16 text-vitalis-gold/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-vitalis-brown mb-2">No se encontraron contactos</h3>
            <p className="text-vitalis-brown/70">Intenta con otro término de búsqueda</p>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Contacts;

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Search, 
  UserPlus, 
  Trophy, 
  Heart, 
  ArrowLeft, 
  Sparkles, 
  Gift, 
  Star,
  MessageCircle,
  Smile,
  ThumbsUp,
  Coffee,
  Flower2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('friends');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [gratitudeMessage, setGratitudeMessage] = useState('');

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
      modules: ['MindTrack', 'SoulBoost'],
      friendship: 'Compañera de meditación',
      gratitude: 'Siempre me inspira con su dedicación al mindfulness'
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
      modules: ['BodySync', 'MindTrack'],
      friendship: 'Compañero de ejercicio',
      gratitude: 'Me motiva a mantenerme activo y saludable'
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
      modules: ['SoulBoost', 'SocialHarmony'],
      friendship: 'Mentora de bienestar',
      gratitude: 'Su sabiduría y experiencia me guían en mi crecimiento personal'
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
      modules: ['MindTrack', 'SocialHarmony'],
      friendship: 'Amigo del alma',
      gratitude: 'Siempre está ahí cuando necesito apoyo emocional'
    }
  ]);

  const sidebarItems = [
    { id: 'friends', label: 'Mis Amigos', icon: Users },
    { id: 'celebrations', label: 'Celebraciones', icon: Gift },
    { id: 'support', label: 'Apoyo Mutuo', icon: ThumbsUp },
    { id: 'memories', label: 'Recuerdos', icon: Star }
  ];

  const motivationTemplates = [
    "¡Eres increíble! Tu dedicación al bienestar me inspira todos los días. 🌟",
    "Admiro mucho tu constancia y determinación. ¡Sigue brillando! ✨",
    "Tu energía positiva ilumina mi día. Gracias por ser tan especial. 💖",
    "Eres una persona extraordinaria y estoy agradecido/a por nuestra amistad. 🌸",
    "Tu fortaleza y perseverancia son admirables. ¡Eres un ejemplo a seguir! 🦋"
  ];

  const gratitudeTemplates = [
    "Estoy agradecido/a por tu amistad porque siempre me apoyas en mis metas de bienestar.",
    "Valoro nuestra conexión porque me ayudas a ser una mejor versión de mí mismo/a.",
    "Tu presencia en mi vida hace que cada día sea más brillante y significativo.",
    "Aprecio cómo celebras mis logros y me animas en los momentos difíciles.",
    "Nuestra amistad es un regalo que atesoro profundamente en mi corazón."
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-400';
      case 'away': return 'bg-amber-400';
      case 'offline': return 'bg-rose-300';
      default: return 'bg-rose-300';
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

  const sendMotivation = (friendId: number, message: string) => {
    console.log(`Enviando motivación a ${friendId}: ${message}`);
    // Aquí iría la lógica para enviar la motivación
    setMotivationMessage('');
    setSelectedFriend(null);
  };

  const sendGratitude = (friendId: number, message: string) => {
    console.log(`Enviando gratitud a ${friendId}: ${message}`);
    // Aquí iría la lógica para enviar la gratitud
    setGratitudeMessage('');
    setSelectedFriend(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'friends':
        return (
          <div className="space-y-6">
            {/* Search and Add */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 shadow-lg">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-rose-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    placeholder="Buscar amigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-xl border-2 border-rose-200/50 bg-white/50 focus:border-rose-300"
                  />
                </div>
                <Button className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl shadow-lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Agregar Amigo
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 shadow-lg text-center">
                <Users className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-rose-700">{contacts.length}</div>
                <div className="text-sm text-rose-500">Amigos</div>
              </Card>
              
              <Card className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-emerald-200/50 shadow-lg text-center">
                <div className="text-2xl mb-2">🟢</div>
                <div className="text-xl font-bold text-emerald-700">
                  {contacts.filter(c => c.status === 'online').length}
                </div>
                <div className="text-sm text-emerald-600">En línea</div>
              </Card>
              
              <Card className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-amber-200/50 shadow-lg text-center">
                <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-amber-700">
                  {Math.round(contacts.reduce((acc, c) => acc + c.level, 0) / contacts.length)}
                </div>
                <div className="text-sm text-amber-600">Nivel promedio</div>
              </Card>
              
              <Card className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-orange-200/50 shadow-lg text-center">
                <div className="text-2xl mb-2">🔥</div>
                <div className="text-xl font-bold text-orange-700">
                  {Math.round(contacts.reduce((acc, c) => acc + c.streak, 0) / contacts.length)}
                </div>
                <div className="text-sm text-orange-600">Racha promedio</div>
              </Card>
            </div>

            {/* Friends List */}
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                        {contact.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white shadow-sm`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-rose-800 text-lg">{contact.name}</h3>
                        <Badge className="text-xs bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-rose-200">
                          Nivel {contact.level}
                        </Badge>
                      </div>
                      <p className="text-rose-600 text-sm mb-1">{contact.university}</p>
                      <p className="text-rose-500 text-xs mb-2 italic">"{contact.friendship}"</p>
                      <p className="text-rose-400 text-xs mb-3">{contact.lastActivity}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 text-sm">
                          <span>🔥</span>
                          <span className="text-rose-600">{contact.streak} días</span>
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
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl shadow-md"
                          onClick={() => {
                            setSelectedFriend(contact);
                            setActiveSection('gratitude');
                          }}
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Agradecer
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl shadow-md"
                          onClick={() => {
                            setSelectedFriend(contact);
                            setActiveSection('motivation');
                          }}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Motivar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="rounded-xl border-2 border-rose-200 hover:bg-rose-50 text-rose-600"
                        >
                          <Smile className="w-4 h-4 mr-1" />
                          Celebrar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'gratitude':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-rose-500" />
                <div>
                  <h2 className="text-2xl font-bold text-rose-800">Expresar Gratitud</h2>
                  <p className="text-rose-600">Comparte por qué aprecias a tus amigos</p>
                </div>
              </div>

              {selectedFriend && (
                <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-200 to-pink-200 rounded-xl flex items-center justify-center text-xl">
                      {selectedFriend.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-rose-800">{selectedFriend.name}</h3>
                      <p className="text-rose-600 text-sm italic">"{selectedFriend.gratitude}"</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-rose-700 mb-2">
                    Mensaje de gratitud personalizado
                  </label>
                  <Textarea
                    placeholder="Escribe por qué estás agradecido/a por esta amistad..."
                    value={gratitudeMessage}
                    onChange={(e) => setGratitudeMessage(e.target.value)}
                    className="rounded-xl border-2 border-rose-200 bg-white/50 focus:border-rose-300 min-h-[120px]"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-rose-700 mb-3">O elige una plantilla:</p>
                  <div className="grid gap-2">
                    {gratitudeTemplates.map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left p-3 h-auto rounded-xl border-rose-200 hover:bg-rose-50 text-rose-700"
                        onClick={() => setGratitudeMessage(template)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{template}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => selectedFriend && sendGratitude(selectedFriend.id, gratitudeMessage)}
                    disabled={!gratitudeMessage.trim()}
                    className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl shadow-lg"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Enviar Gratitud
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setGratitudeMessage('');
                      setSelectedFriend(null);
                      setActiveSection('friends');
                    }}
                    className="rounded-xl border-rose-200 text-rose-600"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'motivation':
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-amber-200/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-amber-500" />
                <div>
                  <h2 className="text-2xl font-bold text-amber-800">Enviar Motivación</h2>
                  <p className="text-amber-600">Inspira y anima a tus amigos</p>
                </div>
              </div>

              {selectedFriend && (
                <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl flex items-center justify-center text-xl">
                      {selectedFriend.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-800">{selectedFriend.name}</h3>
                      <p className="text-amber-600 text-sm">Nivel {selectedFriend.level} • {selectedFriend.streak} días de racha</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2">
                    Mensaje motivacional personalizado
                  </label>
                  <Textarea
                    placeholder="Escribe un mensaje que inspire y motive a tu amigo/a..."
                    value={motivationMessage}
                    onChange={(e) => setMotivationMessage(e.target.value)}
                    className="rounded-xl border-2 border-amber-200 bg-white/50 focus:border-amber-300 min-h-[120px]"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-amber-700 mb-3">O elige una plantilla motivacional:</p>
                  <div className="grid gap-2">
                    {motivationTemplates.map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left p-3 h-auto rounded-xl border-amber-200 hover:bg-amber-50 text-amber-700"
                        onClick={() => setMotivationMessage(template)}
                      >
                        <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{template}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => selectedFriend && sendMotivation(selectedFriend.id, motivationMessage)}
                    disabled={!motivationMessage.trim()}
                    className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enviar Motivación
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMotivationMessage('');
                      setSelectedFriend(null);
                      setActiveSection('friends');
                    }}
                    className="rounded-xl border-amber-200 text-amber-600"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'celebrations':
        return (
          <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-purple-200/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-2xl font-bold text-purple-800">Celebraciones</h2>
                <p className="text-purple-600">Celebra los logros de tus amigos</p>
              </div>
            </div>
            <div className="text-center py-12">
              <Flower2 className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-700 mb-2">Próximamente</h3>
              <p className="text-purple-500">Esta sección estará disponible pronto</p>
            </div>
          </Card>
        );

      case 'support':
        return (
          <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-blue-200/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <ThumbsUp className="w-8 h-8 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold text-blue-800">Apoyo Mutuo</h2>
                <p className="text-blue-600">Crea grupos de apoyo y accountability</p>
              </div>
            </div>
            <div className="text-center py-12">
              <Coffee className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-700 mb-2">Próximamente</h3>
              <p className="text-blue-500">Esta sección estará disponible pronto</p>
            </div>
          </Card>
        );

      case 'memories':
        return (
          <Card className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-indigo-200/50 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-indigo-500" />
              <div>
                <h2 className="text-2xl font-bold text-indigo-800">Recuerdos Compartidos</h2>
                <p className="text-indigo-600">Guarda momentos especiales con tus amigos</p>
              </div>
            </div>
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-indigo-700 mb-2">Próximamente</h3>
              <p className="text-indigo-500">Esta sección estará disponible pronto</p>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
      <Header />
      
      <div className="flex">
        {/* Static Sidebar */}
        <div className="w-80 min-h-screen bg-white/80 backdrop-blur-sm border-r border-rose-200/50 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-rose-800 mb-2">Mis Conexiones</h2>
                <p className="text-rose-600">Cultiva relaciones significativas</p>
              </div>
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-full w-10 h-10 p-0 shadow-lg"
                title="Volver al inicio"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-xl shadow-rose-300/30 transform scale-105 border-2 border-rose-300'
                      : 'text-rose-700 hover:bg-rose-100/50 hover:shadow-md hover:transform hover:scale-102 border-2 border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contacts;

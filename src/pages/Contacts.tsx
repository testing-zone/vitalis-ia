import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Flower2,
  Filter,
  Plus,
  Calendar,
  MapPin,
  MoreHorizontal,
  Send,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('friends');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [motivationMessage, setMotivationMessage] = useState('');
  const [gratitudeMessage, setGratitudeMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => {}}
      />
      
      <div className="md:ml-80 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-1">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-vitalis-gold dark:text-yellow-400" />
                  <h1 className="text-3xl font-bold text-vitalis-brown dark:text-white">Mis Conexiones</h1>
                </div>
                <p className="text-vitalis-brown/70 dark:text-gray-300">Cultiva relaciones significativas con tu comunidad de bienestar</p>
              </div>
              <div className="hidden md:block justify-self-end">
                <img 
                  src="/img/hugging.png" 
                  alt="Huggy mascot" 
                  className="w-[300px] h-[300px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="flex w-full mb-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600 p-3 gap-2">
              <TabsTrigger 
                value="friends" 
                className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 min-h-[48px] text-center flex items-center justify-center text-vitalis-brown dark:text-gray-200"
              >
                <Users className="w-4 h-4 mr-2" />
                Mis Amigos
              </TabsTrigger>
              <TabsTrigger 
                value="celebrations" 
                className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 min-h-[48px] text-center flex items-center justify-center text-vitalis-brown dark:text-gray-200"
              >
                <Gift className="w-4 h-4 mr-2" />
                Celebraciones
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 min-h-[48px] text-center flex items-center justify-center text-vitalis-brown dark:text-gray-200"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Apoyo Mutuo
              </TabsTrigger>
              <TabsTrigger 
                value="memories" 
                className="flex-1 rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 text-sm font-medium py-4 px-6 min-h-[48px] text-center flex items-center justify-center text-vitalis-brown dark:text-gray-200"
              >
                <Star className="w-4 h-4 mr-2" />
                Recuerdos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="space-y-6">
              {/* Search and Add */}
              <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 dark:border-gray-600 shadow-lg">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-rose-400 dark:text-pink-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      placeholder="Buscar amigos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-xl border-2 border-rose-200/50 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:border-rose-300 dark:focus:border-pink-400 text-vitalis-brown dark:text-white"
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
                <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 dark:border-gray-600 shadow-lg text-center">
                  <Users className="w-8 h-8 text-rose-400 dark:text-pink-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-rose-700 dark:text-pink-300">{contacts.length}</div>
                  <div className="text-sm text-rose-500 dark:text-pink-400">Amigos</div>
                </Card>
                
                <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-emerald-200/50 dark:border-gray-600 shadow-lg text-center">
                  <div className="text-2xl mb-2">🟢</div>
                  <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    {contacts.filter(c => c.status === 'online').length}
                  </div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">En línea</div>
                </Card>
                
                <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-amber-200/50 dark:border-gray-600 shadow-lg text-center">
                  <Trophy className="w-8 h-8 text-amber-500 dark:text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-amber-700 dark:text-yellow-300">
                    {Math.round(contacts.reduce((acc, c) => acc + c.level, 0) / contacts.length)}
                  </div>
                  <div className="text-sm text-amber-600 dark:text-yellow-400">Nivel promedio</div>
                </Card>
                
                <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-orange-200/50 dark:border-gray-600 shadow-lg text-center">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-xl font-bold text-orange-700 dark:text-orange-300">
                    {Math.round(contacts.reduce((acc, c) => acc + c.streak, 0) / contacts.length)}
                  </div>
                  <div className="text-sm text-orange-600 dark:text-orange-400">Racha promedio</div>
                </Card>
              </div>

              {/* Friends List */}
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <Card key={contact.id} className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-gray-600 dark:to-gray-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                          {contact.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white dark:border-gray-800 shadow-sm`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-rose-800 dark:text-pink-300 text-lg">{contact.name}</h3>
                          <Badge className="text-xs bg-gradient-to-r from-rose-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 text-rose-700 dark:text-pink-300 border-rose-200 dark:border-gray-500">
                            Nivel {contact.level}
                          </Badge>
                        </div>
                        <p className="text-rose-600 dark:text-pink-400 text-sm mb-1">{contact.university}</p>
                        <p className="text-rose-500 dark:text-pink-400 text-xs mb-2 italic">"{contact.friendship}"</p>
                        <p className="text-rose-400 dark:text-gray-400 text-xs mb-3">{contact.lastActivity}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1 text-sm">
                            <span>🔥</span>
                            <span className="text-rose-600 dark:text-pink-400">{contact.streak} días</span>
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
                            className="rounded-xl border-2 border-rose-200 dark:border-gray-600 hover:bg-rose-50 dark:hover:bg-gray-700 text-rose-600 dark:text-pink-400"
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
            </TabsContent>

            <TabsContent value="gratitude" className="space-y-6">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-rose-200/50 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-rose-500 dark:text-pink-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-rose-800 dark:text-pink-300">Expresar Gratitud</h2>
                    <p className="text-rose-600 dark:text-pink-400">Comparte por qué aprecias a tus amigos</p>
                  </div>
                </div>

                {selectedFriend && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl border border-rose-200 dark:border-gray-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-gray-600 dark:to-gray-500 rounded-xl flex items-center justify-center text-xl">
                        {selectedFriend.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-rose-800 dark:text-pink-300">{selectedFriend.name}</h3>
                        <p className="text-rose-600 dark:text-pink-400 text-sm italic">"{selectedFriend.gratitude}"</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-rose-700 dark:text-pink-300 mb-2">
                      Mensaje de gratitud personalizado
                    </label>
                    <Textarea
                      placeholder="Escribe por qué estás agradecido/a por esta amistad..."
                      value={gratitudeMessage}
                      onChange={(e) => setGratitudeMessage(e.target.value)}
                      className="rounded-xl border-2 border-rose-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:border-rose-300 dark:focus:border-pink-400 min-h-[120px] text-vitalis-brown dark:text-white"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-rose-700 dark:text-pink-300 mb-3">O elige una plantilla:</p>
                    <div className="grid gap-2">
                      {gratitudeTemplates.map((template, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="text-left p-3 h-auto rounded-xl border-rose-200 dark:border-gray-600 hover:bg-rose-50 dark:hover:bg-gray-700 text-rose-700 dark:text-pink-300"
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
                      className="rounded-xl border-rose-200 dark:border-gray-600 text-rose-600 dark:text-pink-400"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="motivation" className="space-y-6">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-amber-200/50 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8 text-amber-500 dark:text-yellow-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-amber-800 dark:text-yellow-300">Enviar Motivación</h2>
                    <p className="text-amber-600 dark:text-yellow-400">Inspira y anima a tus amigos</p>
                  </div>
                </div>

                {selectedFriend && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl border border-amber-200 dark:border-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-gray-600 dark:to-gray-500 rounded-xl flex items-center justify-center text-xl">
                        {selectedFriend.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-amber-800 dark:text-yellow-300">{selectedFriend.name}</h3>
                        <p className="text-amber-600 dark:text-yellow-400 text-sm">Nivel {selectedFriend.level} • {selectedFriend.streak} días de racha</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-700 dark:text-yellow-300 mb-2">
                      Mensaje motivacional personalizado
                    </label>
                    <Textarea
                      placeholder="Escribe un mensaje que inspire y motive a tu amigo/a..."
                      value={motivationMessage}
                      onChange={(e) => setMotivationMessage(e.target.value)}
                      className="rounded-xl border-2 border-amber-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:border-amber-300 dark:focus:border-yellow-400 min-h-[120px] text-vitalis-brown dark:text-white"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-yellow-300 mb-3">O elige una plantilla motivacional:</p>
                    <div className="grid gap-2">
                      {motivationTemplates.map((template, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="text-left p-3 h-auto rounded-xl border-amber-200 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-gray-700 text-amber-700 dark:text-yellow-300"
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
                      className="rounded-xl border-amber-200 dark:border-gray-600 text-amber-600 dark:text-yellow-400"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="celebrations" className="space-y-6">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-purple-200/50 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Gift className="w-8 h-8 text-purple-500 dark:text-purple-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300">Celebraciones</h2>
                    <p className="text-purple-600 dark:text-purple-400">Celebra los logros de tus amigos</p>
                  </div>
                </div>
                <div className="text-center py-12">
                  <Flower2 className="w-16 h-16 text-purple-300 dark:text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-2">Próximamente</h3>
                  <p className="text-purple-500 dark:text-purple-400">Esta sección estará disponible pronto</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-blue-200/50 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <ThumbsUp className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">Apoyo Mutuo</h2>
                    <p className="text-blue-600 dark:text-blue-400">Crea grupos de apoyo y accountability</p>
                  </div>
                </div>
                <div className="text-center py-12">
                  <Coffee className="w-16 h-16 text-blue-300 dark:text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Próximamente</h3>
                  <p className="text-blue-500 dark:text-blue-400">Esta sección estará disponible pronto</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="memories" className="space-y-6">
              <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-indigo-200/50 dark:border-gray-600 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">Recuerdos Compartidos</h2>
                    <p className="text-indigo-600 dark:text-indigo-400">Guarda momentos especiales con tus amigos</p>
                  </div>
                </div>
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-indigo-300 dark:text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">Próximamente</h3>
                  <p className="text-indigo-500 dark:text-indigo-400">Esta sección estará disponible pronto</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Contacts;

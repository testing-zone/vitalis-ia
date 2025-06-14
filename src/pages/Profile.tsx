import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trophy, Target, Calendar, Star, User, Settings, Shield, Bell, Palette, HelpCircle, BookOpen, Plus, Save, Trash2, Archive, ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, MapPin, Zap, Users, Heart, TrendingUp, Camera, MessageCircle, Share2, MoreHorizontal, ArrowUpRight, X, Award, Flame, CheckCircle } from 'lucide-react';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const [books, setBooks] = useState([
    { id: 1, title: 'Mi Diario Personal', content: 'Hoy fue un día increíble...', lastModified: new Date(), archived: false },
    { id: 2, title: 'Reflexiones de Vida', content: 'La vida es como un río...', lastModified: new Date(), archived: false }
  ]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [isCreatingBook, setIsCreatingBook] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@universidad.edu',
    university: 'Universidad Nacional',
    career: 'Ingeniería de Sistemas',
    semester: '6to Semestre'
  });

  const stats = [
    { label: 'Días consecutivos', value: 21, icon: '🔥' },
    { label: 'XP Total', value: 2340, icon: '⭐' },
    { label: 'Nivel actual', value: 12, icon: '🏆' },
    { label: 'Actividades completadas', value: 287, icon: '✅' }
  ];

  const achievements = [
    { name: 'Primera Semana', description: '7 días consecutivos', rarity: 'común', unlocked: true, icon: '🌟', position: { x: 20, y: 30 } },
    { name: 'Meditador', description: '50 sesiones completadas', rarity: 'raro', unlocked: true, icon: '🧘‍♂️', position: { x: 40, y: 50 } },
    { name: 'Atleta Mental', description: 'Nivel 10 alcanzado', rarity: 'épico', unlocked: true, icon: '🏆', position: { x: 60, y: 35 } },
    { name: 'Maestro Zen', description: '100 días de mindfulness', rarity: 'legendario', unlocked: false, icon: '🍃', position: { x: 80, y: 45 } },
    { name: 'Escritor', description: 'Crear 10 memorias', rarity: 'raro', unlocked: false, icon: '📝', position: { x: 30, y: 70 } },
    { name: 'Sabio', description: 'Completar todos los módulos', rarity: 'legendario', unlocked: false, icon: '🦉', position: { x: 70, y: 65 } }
  ];

  const sidebarItems = [
    { id: 'profile', label: 'Mi Perfil', icon: User },
    { id: 'achievements', label: 'Logros', icon: Trophy },
    { id: 'memories', label: 'Memorias', icon: BookOpen },
    { id: 'progress', label: 'Progreso', icon: Target },
    { id: 'settings', label: 'Configuración', icon: Settings },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'appearance', label: 'Apariencia', icon: Palette },
    { id: 'help', label: 'Ayuda', icon: HelpCircle }
  ];

  const createNewBook = () => {
    setIsCreatingBook(true);
    setSelectedBook(null);
    setBookTitle('');
    setBookContent('');
  };

  const saveBook = () => {
    if (!bookTitle.trim()) return;
    
    if (selectedBook) {
      // Update existing book
      setBooks(books.map(book => 
        book.id === selectedBook.id 
          ? { ...book, title: bookTitle, content: bookContent, lastModified: new Date() }
          : book
      ));
    } else {
      // Create new book
      const newBook = {
        id: Date.now(),
        title: bookTitle,
        content: bookContent,
        lastModified: new Date(),
        archived: false
      };
      setBooks([...books, newBook]);
    }
    
    setIsCreatingBook(false);
    setSelectedBook(null);
    setBookTitle('');
    setBookContent('');
  };

  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(null);
      setBookTitle('');
      setBookContent('');
    }
  };

  const archiveBook = (bookId) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, archived: !book.archived } : book
    ));
  };

  const openBook = (book) => {
    setSelectedBook(book);
    setBookTitle(book.title);
    setBookContent(book.content);
    setIsCreatingBook(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="p-8 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-vitalis-gold/20 rounded-full flex items-center justify-center text-4xl">
                  🦫
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input 
                        value={userInfo.name} 
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        className="text-xl font-bold"
                      />
                      <Input 
                        value={userInfo.email} 
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      />
                      <Input 
                        value={userInfo.university} 
                        onChange={(e) => setUserInfo({...userInfo, university: e.target.value})}
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-vitalis-brown mb-2">{userInfo.name}</h1>
                      <p className="text-vitalis-brown/70 mb-1">{userInfo.email}</p>
                      <p className="text-vitalis-brown/70 mb-1">{userInfo.university}</p>
                      <p className="text-vitalis-brown/70">{userInfo.career} - {userInfo.semester}</p>
                    </>
                  )}
                </div>
                
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-2xl"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Guardar' : 'Editar'}
                </Button>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 bg-white rounded-2xl border-2 border-vitalis-gold/20 shadow-lg text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-vitalis-brown">{stat.value}</div>
                  <div className="text-sm text-vitalis-brown/70">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Mapa de Logros</h2>
            
            {/* Achievement Map */}
            <div className="relative w-full h-96 bg-gradient-to-b from-orange-200 via-yellow-100 to-blue-200 rounded-2xl overflow-hidden mb-6">
              {/* Sun */}
              <div className="absolute top-4 right-8 w-16 h-16 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center text-2xl">
                ☀️
              </div>
              
              {/* Clouds */}
              <div className="absolute top-8 left-12 w-12 h-8 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-12 left-16 w-8 h-6 bg-white rounded-full opacity-70"></div>
              <div className="absolute top-6 left-1/2 w-10 h-6 bg-white rounded-full opacity-70"></div>
              
              {/* Achievement Nodes */}
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    achievement.unlocked 
                      ? 'cursor-pointer hover:scale-110' 
                      : 'opacity-50'
                  } transition-all duration-300`}
                  style={{ 
                    left: `${achievement.position.x}%`, 
                    top: `${achievement.position.y}%` 
                  }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 ${
                    achievement.unlocked
                      ? achievement.rarity === 'legendario' 
                        ? 'bg-purple-500 border-purple-300'
                        : achievement.rarity === 'épico'
                        ? 'bg-orange-500 border-orange-300'
                        : achievement.rarity === 'raro'
                        ? 'bg-blue-500 border-blue-300'
                        : 'bg-green-500 border-green-300'
                      : 'bg-gray-400 border-gray-300'
                  }`}>
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  
                  {/* Achievement Info Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                      <div className="font-bold">{achievement.name}</div>
                      <div>{achievement.description}</div>
                      <div className="text-yellow-300">{achievement.rarity}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Path connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 20% 30% Q 30% 40% 40% 50%"
                  stroke="#7FA650"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="opacity-60"
                />
                <path
                  d="M 40% 50% Q 50% 42% 60% 35%"
                  stroke="#7FA650"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="opacity-60"
                />
                <path
                  d="M 60% 35% Q 65% 50% 70% 65%"
                  stroke="#7FA650"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="opacity-60"
                />
                <path
                  d="M 40% 50% Q 35% 60% 30% 70%"
                  stroke="#7FA650"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                  className="opacity-60"
                />
              </svg>
            </div>

            {/* Achievement List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-2xl border-2 ${
                    achievement.unlocked 
                      ? 'bg-vitalis-gold/10 border-vitalis-gold/30' 
                      : 'bg-gray-100 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.unlocked ? achievement.icon : '🔒'}</span>
                      <h3 className="font-bold text-vitalis-brown">{achievement.name}</h3>
                    </div>
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-vitalis-brown/70">{achievement.description}</p>
                </div>
              ))}
            </div>
          </Card>
        );

      case 'memories':
        return (
          <div className="space-y-6">
            {/* Header with Create Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-vitalis-brown">Mis Memorias</h2>
              <Button 
                onClick={createNewBook}
                className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white rounded-2xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva Memoria
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Books List */}
              <div className="lg:col-span-1">
                <Card className="p-4 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                  <h3 className="text-lg font-bold text-vitalis-brown mb-4">Mis Libros</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {books.filter(book => !book.archived).map((book) => (
                      <div
                        key={book.id}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedBook?.id === book.id
                            ? 'bg-vitalis-gold/20 border-2 border-vitalis-gold/50'
                            : 'bg-vitalis-gold/5 hover:bg-vitalis-gold/10'
                        }`}
                        onClick={() => openBook(book)}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-vitalis-gold" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-vitalis-brown truncate">{book.title}</h4>
                            <p className="text-xs text-vitalis-brown/60">
                              {book.lastModified.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Editor */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                  {(selectedBook || isCreatingBook) ? (
                    <div className="space-y-4">
                      {/* Editor Header */}
                      <div className="flex items-center justify-between">
                        <Input
                          value={bookTitle}
                          onChange={(e) => setBookTitle(e.target.value)}
                          placeholder="Título de tu memoria..."
                          className="text-xl font-bold border-none p-0 focus:ring-0"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={saveBook}
                            className="bg-vitalis-green hover:bg-vitalis-green-dark text-white rounded-xl"
                            size="sm"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Guardar
                          </Button>
                          {selectedBook && (
                            <>
                              <Button
                                onClick={() => archiveBook(selectedBook.id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                                size="sm"
                              >
                                <Archive className="w-4 h-4 mr-1" />
                                Archivar
                              </Button>
                              <Button
                                onClick={() => deleteBook(selectedBook.id)}
                                className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                                size="sm"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Eliminar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Editor Content */}
                      <Textarea
                        value={bookContent}
                        onChange={(e) => setBookContent(e.target.value)}
                        placeholder="Comienza a escribir tu memoria aquí..."
                        className="min-h-96 resize-none border-vitalis-gold/30 focus:border-vitalis-gold"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <BookOpen className="w-16 h-16 text-vitalis-gold/50 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-vitalis-brown mb-2">Selecciona una memoria</h3>
                      <p className="text-vitalis-brown/70">Elige un libro existente o crea uno nuevo para comenzar a escribir</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Archived Books */}
            {books.some(book => book.archived) && (
              <Card className="p-4 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
                <h3 className="text-lg font-bold text-vitalis-brown mb-4">Archivados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {books.filter(book => book.archived).map((book) => (
                    <div
                      key={book.id}
                      className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => openBook(book)}
                    >
                      <div className="flex items-center gap-3">
                        <Archive className="w-5 h-5 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-700 truncate">{book.title}</h4>
                          <p className="text-xs text-gray-500">
                            {book.lastModified.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        );

      case 'progress':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Progreso por Módulo</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-vitalis-brown font-medium">🧠 MindTrack</span>
                  <span className="text-vitalis-brown/70">75%</span>
                </div>
                <Progress value={75} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-vitalis-brown font-medium">🌱 BodySync</span>
                  <span className="text-vitalis-brown/70">60%</span>
                </div>
                <Progress value={60} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-vitalis-brown font-medium">🍃 SoulBoost</span>
                  <span className="text-vitalis-brown/70">85%</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-vitalis-brown font-medium">🤝 SocialHarmony</span>
                  <span className="text-vitalis-brown/70">55%</span>
                </div>
                <Progress value={55} className="h-3" />
              </div>
            </div>
          </Card>
        );

      case 'settings':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Configuración General</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-vitalis-brown mb-3">Idioma</h3>
                <select className="w-full p-3 border border-vitalis-gold/30 rounded-xl bg-white">
                  <option>Español</option>
                  <option>English</option>
                  <option>Français</option>
                </select>
              </div>
              <div>
                <h3 className="text-lg font-medium text-vitalis-brown mb-3">Zona Horaria</h3>
                <select className="w-full p-3 border border-vitalis-gold/30 rounded-xl bg-white">
                  <option>GMT-5 (Colombia)</option>
                  <option>GMT-6 (México)</option>
                  <option>GMT-3 (Argentina)</option>
                </select>
              </div>
            </div>
          </Card>
        );

      case 'privacy':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Configuración de Privacidad</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-vitalis-gold/10 rounded-xl">
                <div>
                  <h3 className="font-medium text-vitalis-brown">Perfil público</h3>
                  <p className="text-sm text-vitalis-brown/70">Permite que otros usuarios vean tu perfil</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between p-4 bg-vitalis-gold/10 rounded-xl">
                <div>
                  <h3 className="font-medium text-vitalis-brown">Compartir progreso</h3>
                  <p className="text-sm text-vitalis-brown/70">Comparte tu progreso con amigos</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </Card>
        );

      case 'notifications':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Notificaciones</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-vitalis-gold/10 rounded-xl">
                <div>
                  <h3 className="font-medium text-vitalis-brown">Recordatorios diarios</h3>
                  <p className="text-sm text-vitalis-brown/70">Recibe recordatorios para completar actividades</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-vitalis-gold/10 rounded-xl">
                <div>
                  <h3 className="font-medium text-vitalis-brown">Logros desbloqueados</h3>
                  <p className="text-sm text-vitalis-brown/70">Notificaciones cuando desbloquees logros</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </Card>
        );

      case 'appearance':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Apariencia</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-vitalis-brown mb-3">Tema</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-vitalis-gold/30 rounded-xl cursor-pointer hover:bg-vitalis-gold/10">
                    <div className="w-full h-20 bg-gradient-to-br from-vitalis-cream to-white rounded-lg mb-2"></div>
                    <p className="text-center text-vitalis-brown">Claro</p>
                  </div>
                  <div className="p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                    <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-2"></div>
                    <p className="text-center text-vitalis-brown">Oscuro</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      case 'help':
        return (
          <Card className="p-6 bg-white rounded-3xl border-2 border-vitalis-gold/20 shadow-lg">
            <h2 className="text-xl font-bold text-vitalis-brown mb-6">Centro de Ayuda</h2>
            <div className="space-y-4">
              <div className="p-4 bg-vitalis-gold/10 rounded-xl">
                <h3 className="font-medium text-vitalis-brown mb-2">¿Cómo funciona VitalisIA?</h3>
                <p className="text-sm text-vitalis-brown/70">Aprende los conceptos básicos de la plataforma</p>
              </div>
              <div className="p-4 bg-vitalis-gold/10 rounded-xl">
                <h3 className="font-medium text-vitalis-brown mb-2">Preguntas frecuentes</h3>
                <p className="text-sm text-vitalis-brown/70">Encuentra respuestas a las dudas más comunes</p>
              </div>
              <div className="p-4 bg-vitalis-gold/10 rounded-xl">
                <h3 className="font-medium text-vitalis-brown mb-2">Contactar soporte</h3>
                <p className="text-sm text-vitalis-brown/70">¿Necesitas ayuda personalizada?</p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => {}}
      />
      
      <div className="md:ml-80 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;

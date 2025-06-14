import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import GenderSpecificInsights from '@/components/GenderSpecificInsights';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trophy, Target, Calendar, Star, User, Settings, Shield, Bell, Palette, HelpCircle, BookOpen, Plus, Save, Trash2, Archive, ArrowLeft, FileText, LogOut, Moon, Sun, Heart, Activity, TrendingUp, BarChart3, Brain, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, MapPin, Users, MessageCircle, Share2, MoreHorizontal, ArrowUpRight, X, Award, Flame, CheckCircle } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';
import { useUserActivity } from '@/hooks/useUserActivity';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState('overview');
  const [selectedGenderView, setSelectedGenderView] = useState('hombre'); // New state for manual gender view control
  const { theme, setTheme } = useTheme(); // Add theme context
  const navigate = useNavigate();
  const [books, setBooks] = useState([
    { id: 1, title: 'Mi Diario Personal', content: 'Hoy fue un día increíble...', lastModified: new Date(), archived: false },
    { id: 2, title: 'Reflexiones de Vida', content: 'La vida es como un río...', lastModified: new Date(), archived: false }
  ]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const { achievements, loading: achievementsLoading } = useAchievements();
  const { activities, loading: activitiesLoading } = useUserActivity();

  const [userInfo, setUserInfo] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@universidad.edu',
    university: 'Universidad Nacional',
    career: 'Ingeniería de Sistemas',
    semester: '6to Semestre',
    gender: 'hombre',
    age: 25
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserProfile = localStorage.getItem('userProfile');
    if (savedUserProfile) {
      const userData = JSON.parse(savedUserProfile);
      setUserInfo({
        name: userData.name || 'Usuario',
        email: userData.email || 'usuario@email.com',
        university: userData.university || 'Universidad',
        career: userData.career || 'Carrera',
        semester: userData.semester || 'Semestre',
        gender: userData.gender || 'hombre',
        age: parseInt(userData.age) || 25
      });
    }
  }, []);

  // Menstrual cycle data for women
  const [menstrualData, setMenstrualData] = useState({
    lastPeriod: '2024-01-15',
    cycleLength: 28,
    currentPhase: 'follicular',
    daysUntilNext: 12,
    symptoms: ['Energía alta', 'Buen humor', 'Concentración']
  });

  const stats = [
    { label: 'Días consecutivos', value: 21, icon: '🔥' },
    { label: 'XP Total', value: 2340, icon: '⭐' },
    { label: 'Nivel actual', value: 12, icon: '🏆' },
    { label: 'Actividades completadas', value: 287, icon: '✅' }
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

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  const getMenstrualPhaseInfo = (phase: string) => {
    const phases = {
      menstrual: {
        name: 'Menstrual',
        icon: '🌙',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        description: 'Tiempo de descanso y reflexión',
        tips: ['Descansa más', 'Hidrátate bien', 'Ejercicio suave']
      },
      follicular: {
        name: 'Folicular',
        icon: '🌱',
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        description: 'Energía en aumento',
        tips: ['Planifica proyectos', 'Ejercicio intenso', 'Socializa']
      },
      ovulatory: {
        name: 'Ovulatoria',
        icon: '🌟',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        description: 'Pico de energía y creatividad',
        tips: ['Máximo rendimiento', 'Comunicación', 'Creatividad']
      },
      luteal: {
        name: 'Lútea',
        icon: '🍂',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        description: 'Tiempo de organización',
        tips: ['Organiza tareas', 'Autocuidado', 'Reflexión']
      }
    };
    return phases[phase] || phases.follicular;
  };

  const getGenderSpecificMetrics = () => {
    if (selectedGenderView === 'mujer') {
      return (
        <div className="space-y-6">
          {/* Menstrual Cycle Tracking */}
          <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-6 h-6 text-pink-600" />
              <h3 className="text-xl font-bold text-pink-800">Seguimiento del Ciclo</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-700">{menstrualData.daysUntilNext}</div>
                <div className="text-sm text-pink-600">Días hasta el próximo período</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-700">{menstrualData.cycleLength}</div>
                <div className="text-sm text-pink-600">Duración del ciclo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">{getMenstrualPhaseInfo(menstrualData.currentPhase).icon}</div>
                <div className="text-sm text-pink-600">Fase actual</div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${getMenstrualPhaseInfo(menstrualData.currentPhase).bg} ${getMenstrualPhaseInfo(menstrualData.currentPhase).border} border`}>
              <h4 className={`font-semibold ${getMenstrualPhaseInfo(menstrualData.currentPhase).color} mb-2`}>
                Fase {getMenstrualPhaseInfo(menstrualData.currentPhase).name}
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                {getMenstrualPhaseInfo(menstrualData.currentPhase).description}
              </p>
              <div className="flex flex-wrap gap-2">
                {getMenstrualPhaseInfo(menstrualData.currentPhase).tips.map((tip, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tip}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Hormonal Wellness Chart */}
          <Card className="p-6 bg-white border-2 border-pink-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-pink-600" />
              <h3 className="text-xl font-bold text-pink-800">Bienestar Hormonal</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-pink-50 rounded-xl">
                <div className="text-lg font-bold text-pink-700">85%</div>
                <div className="text-xs text-pink-600">Energía</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-lg font-bold text-purple-700">78%</div>
                <div className="text-xs text-purple-600">Estado de ánimo</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-lg font-bold text-blue-700">92%</div>
                <div className="text-xs text-blue-600">Calidad del sueño</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-lg font-bold text-green-700">88%</div>
                <div className="text-xs text-green-600">Concentración</div>
              </div>
            </div>
          </Card>
        </div>
      );
    } else if (selectedGenderView === 'hombre') {
      return (
        <div className="space-y-6">
          {/* Testosterone and Energy Tracking */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">Energía y Vitalidad</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-lg font-bold text-blue-700">92%</div>
                <div className="text-xs text-blue-600">Energía matutina</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-lg font-bold text-green-700">88%</div>
                <div className="text-xs text-green-600">Rendimiento físico</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-lg font-bold text-purple-700">85%</div>
                <div className="text-xs text-purple-600">Concentración</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <div className="text-lg font-bold text-orange-700">90%</div>
                <div className="text-xs text-orange-600">Calidad del sueño</div>
              </div>
            </div>
          </Card>

          {/* Stress and Recovery */}
          <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">Estrés y Recuperación</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-700">Nivel de estrés</span>
                  <span className="text-blue-700">Bajo (25%)</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-700">Recuperación</span>
                  <span className="text-green-700">Excelente (90%)</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          {/* General Wellness Tracking */}
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-800">Bienestar General</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-lg font-bold text-purple-700">87%</div>
                <div className="text-xs text-purple-600">Bienestar mental</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-lg font-bold text-blue-700">82%</div>
                <div className="text-xs text-blue-600">Energía física</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-lg font-bold text-green-700">90%</div>
                <div className="text-xs text-green-600">Equilibrio emocional</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-xl">
                <div className="text-lg font-bold text-orange-700">85%</div>
                <div className="text-xs text-orange-600">Satisfacción personal</div>
              </div>
            </div>
          </Card>

          {/* Personalized Insights */}
          <Card className="p-6 bg-white border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-800">Insights Personalizados</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Patrón detectado:</strong> Tu energía es más alta los martes y jueves.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Recomendación:</strong> Programa actividades importantes en estos días.
                </p>
              </div>
            </div>
          </Card>
        </div>
      );
    }
  };

  const getGenderSpecificChartOptions = () => {
    if (selectedGenderView === 'mujer') {
      return [
        { id: 'overview', label: 'Resumen General', icon: BarChart3 },
        { id: 'hormonal', label: 'Ciclo Hormonal', icon: Moon },
        { id: 'mood', label: 'Estado de Ánimo', icon: Heart },
        { id: 'energy', label: 'Niveles de Energía', icon: Zap },
        { id: 'sleep', label: 'Calidad del Sueño', icon: Moon }
      ];
    } else if (selectedGenderView === 'hombre') {
      return [
        { id: 'overview', label: 'Resumen General', icon: BarChart3 },
        { id: 'testosterone', label: 'Energía Diaria', icon: Zap },
        { id: 'performance', label: 'Rendimiento Físico', icon: Activity },
        { id: 'stress', label: 'Manejo del Estrés', icon: Heart },
        { id: 'recovery', label: 'Recuperación', icon: Moon }
      ];
    } else {
      return [
        { id: 'overview', label: 'Resumen General', icon: BarChart3 },
        { id: 'wellness', label: 'Bienestar Integral', icon: Star },
        { id: 'balance', label: 'Equilibrio Personal', icon: Heart },
        { id: 'mindfulness', label: 'Mindfulness', icon: Brain },
        { id: 'growth', label: 'Crecimiento Personal', icon: TrendingUp }
      ];
    }
  };

  const renderSelectedChart = () => {
    if (selectedGenderView === 'mujer') {
      switch (selectedChart) {
        case 'overview':
          return getGenderSpecificMetrics();
        case 'hormonal':
          return renderHormonalChart();
        case 'mood':
          return renderMoodChart();
        case 'energy':
          return renderEnergyChart();
        case 'sleep':
          return renderSleepChart();
        default:
          return getGenderSpecificMetrics();
      }
    } else if (selectedGenderView === 'hombre') {
      switch (selectedChart) {
        case 'overview':
          return getGenderSpecificMetrics();
        case 'testosterone':
          return renderTestosteroneChart();
        case 'performance':
          return renderPerformanceChart();
        case 'stress':
          return renderStressChart();
        case 'recovery':
          return renderRecoveryChart();
        default:
          return getGenderSpecificMetrics();
      }
    } else {
      switch (selectedChart) {
        case 'overview':
          return getGenderSpecificMetrics();
        case 'wellness':
          return renderWellnessChart();
        case 'balance':
          return renderBalanceChart();
        case 'mindfulness':
          return renderMindfulnessChart();
        case 'growth':
          return renderGrowthChart();
        default:
          return getGenderSpecificMetrics();
      }
    }
  };

  // Chart rendering functions for women
  const renderHormonalChart = () => (
    <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-6 h-6 text-pink-600" />
        <h3 className="text-xl font-bold text-pink-800">Análisis del Ciclo Hormonal</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-pink-700 mb-4">Fases del Ciclo (Últimos 3 meses)</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium">🌙 Menstrual</span>
              <span className="text-sm text-red-600">5 días promedio</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">🌱 Folicular</span>
              <span className="text-sm text-green-600">7 días promedio</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium">🌟 Ovulatoria</span>
              <span className="text-sm text-yellow-600">3 días promedio</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium">🍂 Lútea</span>
              <span className="text-sm text-orange-600">13 días promedio</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-pink-700 mb-4">Síntomas por Fase</h4>
          <div className="space-y-3">
            <div className="p-3 bg-pink-50 rounded-lg">
              <div className="text-sm font-medium text-pink-800 mb-2">Síntomas más frecuentes:</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">Fatiga</Badge>
                <Badge variant="secondary" className="text-xs">Cambios de humor</Badge>
                <Badge variant="secondary" className="text-xs">Antojos</Badge>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-2">Días de mayor energía:</div>
              <div className="text-sm text-blue-700">Días 8-14 del ciclo</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderMoodChart = () => (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-purple-800">Análisis del Estado de Ánimo</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-3xl mb-2">😊</div>
          <div className="text-lg font-bold text-green-700">65%</div>
          <div className="text-sm text-green-600">Días positivos</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-xl">
          <div className="text-3xl mb-2">😐</div>
          <div className="text-lg font-bold text-yellow-700">25%</div>
          <div className="text-sm text-yellow-600">Días neutrales</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-xl">
          <div className="text-3xl mb-2">😔</div>
          <div className="text-lg font-bold text-red-700">10%</div>
          <div className="text-sm text-red-600">Días difíciles</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-purple-700">Estabilidad emocional</span>
            <span className="text-purple-700">Buena (78%)</span>
          </div>
          <Progress value={78} className="h-3" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-700">Manejo del estrés</span>
            <span className="text-blue-700">Excelente (85%)</span>
          </div>
          <Progress value={85} className="h-3" />
        </div>
      </div>
    </Card>
  );

  const renderEnergyChart = () => (
    <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold text-yellow-800">Niveles de Energía</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-yellow-700 mb-4">Energía por hora del día</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-sm">6:00 - 9:00</span>
              <div className="flex items-center gap-2">
                <Progress value={60} className="w-20 h-2" />
                <span className="text-xs">60%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-sm">9:00 - 12:00</span>
              <div className="flex items-center gap-2">
                <Progress value={90} className="w-20 h-2" />
                <span className="text-xs">90%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-sm">12:00 - 15:00</span>
              <div className="flex items-center gap-2">
                <Progress value={75} className="w-20 h-2" />
                <span className="text-xs">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
              <span className="text-sm">15:00 - 18:00</span>
              <div className="flex items-center gap-2">
                <Progress value={85} className="w-20 h-2" />
                <span className="text-xs">85%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
              <span className="text-sm">18:00 - 21:00</span>
              <div className="flex items-center gap-2">
                <Progress value={45} className="w-20 h-2" />
                <span className="text-xs">45%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-yellow-700 mb-4">Factores que afectan tu energía</h4>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">✅ Factores positivos</div>
              <div className="text-xs text-green-700 mt-1">Ejercicio matutino, 8h de sueño, desayuno saludable</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-red-800">⚠️ Factores negativos</div>
              <div className="text-xs text-red-700 mt-1">Poco sueño, estrés laboral, comidas pesadas</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderSleepChart = () => (
    <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-indigo-800">Análisis del Sueño</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-indigo-50 rounded-xl">
          <div className="text-2xl font-bold text-indigo-700">7.5h</div>
          <div className="text-sm text-indigo-600">Promedio de sueño</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-700">85%</div>
          <div className="text-sm text-green-600">Calidad del sueño</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-700">23:15</div>
          <div className="text-sm text-blue-600">Hora promedio de dormir</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-indigo-700 mb-3">Patrones de sueño por fase del ciclo</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-red-800">🌙 Menstrual</div>
              <div className="text-xs text-red-700">8.2h promedio - Sueño más profundo</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">🌱 Folicular</div>
              <div className="text-xs text-green-700">7.1h promedio - Despertar temprano</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">🌟 Ovulatoria</div>
              <div className="text-xs text-yellow-700">7.3h promedio - Sueño ligero</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800">🍂 Lútea</div>
              <div className="text-xs text-orange-700">7.8h promedio - Interrupciones</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  // Chart rendering functions for men
  const renderTestosteroneChart = () => (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-blue-800">Energía Diaria</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-blue-700 mb-4">Picos de energía por hora</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-sm">6:00 - 10:00</span>
              <div className="flex items-center gap-2">
                <Progress value={95} className="w-20 h-2" />
                <span className="text-xs">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-sm">10:00 - 14:00</span>
              <div className="flex items-center gap-2">
                <Progress value={80} className="w-20 h-2" />
                <span className="text-xs">80%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-sm">14:00 - 18:00</span>
              <div className="flex items-center gap-2">
                <Progress value={70} className="w-20 h-2" />
                <span className="text-xs">70%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
              <span className="text-sm">18:00 - 22:00</span>
              <div className="flex items-center gap-2">
                <Progress value={60} className="w-20 h-2" />
                <span className="text-xs">60%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-blue-700 mb-4">Factores de optimización</h4>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">🌅 Rutina matutina</div>
              <div className="text-xs text-green-700 mt-1">Ejercicio temprano maximiza testosterona</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">💪 Entrenamiento de fuerza</div>
              <div className="text-xs text-blue-700 mt-1">3-4 veces por semana para mantener niveles</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium text-purple-800">😴 Sueño de calidad</div>
              <div className="text-xs text-purple-700 mt-1">7-9 horas para recuperación hormonal</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderPerformanceChart = () => (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-bold text-green-800">Rendimiento Físico</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-700">92%</div>
          <div className="text-sm text-green-600">Fuerza</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-700">88%</div>
          <div className="text-sm text-blue-600">Resistencia</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-700">85%</div>
          <div className="text-sm text-purple-600">Flexibilidad</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-green-700">Progreso semanal</span>
            <span className="text-green-700">+5%</span>
          </div>
          <Progress value={85} className="h-3" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-700">Consistencia de entrenamientos</span>
            <span className="text-blue-700">90%</span>
          </div>
          <Progress value={90} className="h-3" />
        </div>
      </div>
    </Card>
  );

  const renderStressChart = () => (
    <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-orange-800">Manejo del Estrés</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-orange-700 mb-4">Niveles de estrés por día</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-sm">Lunes</span>
              <div className="flex items-center gap-2">
                <Progress value={30} className="w-20 h-2" />
                <span className="text-xs">Bajo</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-sm">Martes</span>
              <div className="flex items-center gap-2">
                <Progress value={60} className="w-20 h-2" />
                <span className="text-xs">Medio</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-sm">Miércoles</span>
              <div className="flex items-center gap-2">
                <Progress value={25} className="w-20 h-2" />
                <span className="text-xs">Bajo</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
              <span className="text-sm">Jueves</span>
              <div className="flex items-center gap-2">
                <Progress value={75} className="w-20 h-2" />
                <span className="text-xs">Alto</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-sm">Viernes</span>
              <div className="flex items-center gap-2">
                <Progress value={40} className="w-20 h-2" />
                <span className="text-xs">Medio</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-orange-700 mb-4">Técnicas de manejo</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">🧘 Respiración profunda</div>
              <div className="text-xs text-blue-700 mt-1">5 minutos diarios - 85% efectividad</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">🏃 Ejercicio cardiovascular</div>
              <div className="text-xs text-green-700 mt-1">30 min, 3x semana - 90% efectividad</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium text-purple-800">🎵 Música relajante</div>
              <div className="text-xs text-purple-700 mt-1">Durante trabajo - 70% efectividad</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderRecoveryChart = () => (
    <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-indigo-800">Recuperación</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-indigo-50 rounded-xl">
          <div className="text-2xl font-bold text-indigo-700">8.2h</div>
          <div className="text-sm text-indigo-600">Sueño promedio</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-700">90%</div>
          <div className="text-sm text-green-600">Calidad de recuperación</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-700">2</div>
          <div className="text-sm text-blue-600">Días de descanso/semana</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-indigo-700 mb-3">Indicadores de recuperación</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">💓 Frecuencia cardíaca en reposo</div>
              <div className="text-xs text-green-700">58 bpm - Excelente</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">🏃 Variabilidad cardíaca</div>
              <div className="text-xs text-blue-700">45ms - Muy buena</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium text-purple-800">😴 Sueño profundo</div>
              <div className="text-xs text-purple-700">22% del total - Óptimo</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800">🔋 Nivel de energía</div>
              <div className="text-xs text-orange-700">8.5/10 - Excelente</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  // Chart rendering functions for non-binary users
  const renderWellnessChart = () => (
    <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-purple-800">Bienestar Integral</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-700">87%</div>
          <div className="text-sm text-purple-600">Mental</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-700">82%</div>
          <div className="text-sm text-blue-600">Físico</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-700">90%</div>
          <div className="text-sm text-green-600">Emocional</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-xl">
          <div className="text-2xl font-bold text-orange-700">85%</div>
          <div className="text-sm text-orange-600">Social</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-purple-700">Bienestar general</span>
            <span className="text-purple-700">86%</span>
          </div>
          <Progress value={86} className="h-3" />
        </div>
      </div>
    </Card>
  );

  const renderBalanceChart = () => (
    <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-teal-600" />
        <h3 className="text-xl font-bold text-teal-800">Equilibrio Personal</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-teal-700 mb-4">Áreas de vida</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">🎯 Propósito personal</span>
              <span className="text-sm text-green-600">85%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">💼 Vida profesional</span>
              <span className="text-sm text-blue-600">78%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium">👥 Relaciones</span>
              <span className="text-sm text-purple-600">92%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium">🌱 Crecimiento</span>
              <span className="text-sm text-orange-600">88%</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-teal-700 mb-4">Estrategias de equilibrio</h4>
          <div className="space-y-3">
            <div className="p-3 bg-teal-50 rounded-lg">
              <div className="text-sm font-medium text-teal-800">⚖️ Límites saludables</div>
              <div className="text-xs text-teal-700 mt-1">Establecer horarios de trabajo y descanso</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">🎨 Expresión creativa</div>
              <div className="text-xs text-blue-700 mt-1">Tiempo dedicado a pasiones personales</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-green-800">🤝 Conexión social</div>
              <div className="text-xs text-green-700 mt-1">Mantener relaciones significativas</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderMindfulnessChart = () => (
    <Card className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold text-emerald-800">Mindfulness</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-emerald-50 rounded-xl">
          <div className="text-2xl font-bold text-emerald-700">15</div>
          <div className="text-sm text-emerald-600">Días consecutivos</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-700">12min</div>
          <div className="text-sm text-blue-600">Promedio diario</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-700">88%</div>
          <div className="text-sm text-purple-600">Consistencia</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-emerald-700 mb-3">Prácticas favoritas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="text-sm font-medium text-emerald-800">🧘 Meditación guiada</div>
              <div className="text-xs text-emerald-700">40% del tiempo</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-800">🌬️ Respiración consciente</div>
              <div className="text-xs text-blue-700">35% del tiempo</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-sm font-medium text-purple-800">🚶 Caminata mindful</div>
              <div className="text-xs text-purple-700">15% del tiempo</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-sm font-medium text-orange-800">📝 Journaling</div>
              <div className="text-xs text-orange-700">10% del tiempo</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderGrowthChart = () => (
    <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-bold text-amber-800">Crecimiento Personal</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-amber-700 mb-4">Metas alcanzadas</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">✅ Hábito de lectura</span>
              <span className="text-sm text-green-600">Completado</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">🎯 Ejercicio regular</span>
              <span className="text-sm text-blue-600">En progreso</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium">🧘 Práctica mindfulness</span>
              <span className="text-sm text-purple-600">Completado</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium">🌱 Desarrollo emocional</span>
              <span className="text-sm text-orange-600">En progreso</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-amber-700 mb-4">Áreas de enfoque</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-700">Autoconocimiento</span>
                <span className="text-amber-700">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-700">Habilidades sociales</span>
                <span className="text-blue-700">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-700">Resiliencia</span>
                <span className="text-green-700">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-700">Creatividad</span>
                <span className="text-purple-700">70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const sidebarItems = [
    { id: 'profile', label: 'Mi Perfil', icon: User },
    { id: 'analytics', label: 'Análisis', icon: BarChart3 },
    { id: 'achievements', label: 'Logros', icon: Trophy },
    { id: 'memories', label: 'Memorias', icon: BookOpen },
    { id: 'progress', label: 'Progreso', icon: Target },
    { id: 'settings', label: 'Configuración', icon: Settings },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'appearance', label: 'Apariencia', icon: Palette },
    { id: 'help', label: 'Ayuda', icon: HelpCircle }
  ];

  // Calcular XP total ganado
  const totalXP = activities
    .filter(activity => activity.activity_type === 'achievement_earned')
    .reduce((sum, activity) => sum + (activity.metadata?.xp_earned || 0), 0);

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-vitalis-gold/20 dark:border-gray-600 shadow-lg transition-colors duration-200">
              <div className="flex flex-wrap gap-2">
                {sidebarItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-vitalis-gold text-white shadow-lg transform scale-105'
                          : 'bg-white/60 dark:bg-gray-700/60 text-vitalis-brown dark:text-gray-200 hover:bg-vitalis-gold/20 dark:hover:bg-gray-600 border border-vitalis-gold/30 dark:border-gray-500'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 text-vitalis-brown">Logros</h2>
                <div className="space-y-4">
                  {achievementsLoading ? (
                    <p>Cargando logros...</p>
                  ) : (
                    achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                        <img 
                          src={achievement.icon_url} 
                          alt={achievement.name}
                          className="w-12 h-12"
                        />
                        <div>
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          <Badge className="mt-2">+{achievement.xp_reward} XP</Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 text-vitalis-brown">Estadísticas</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>XP Total</span>
                    <span className="font-bold">{totalXP}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Actividades Completadas</span>
                    <span className="font-bold">{activities.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Logros Desbloqueados</span>
                    <span className="font-bold">
                      {activities.filter(a => a.activity_type === 'achievement_earned').length}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      // Agrega más casos según sea necesario
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-vitalis-brown mb-8">Perfil</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;

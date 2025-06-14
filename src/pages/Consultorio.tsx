import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import {
  Stethoscope,
  User,
  Star,
  Clock,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Heart,
  Award,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  X,
  ChevronDown,
  Users,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Therapist {
  id: number;
  name: string;
  specialty: string;
  gender: 'Masculino' | 'Femenino';
  age: number;
  experience: number;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  price: number;
  availability: string[];
  languages: string[];
  certifications: string[];
  reviewsData: Array<{
    id: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const Consultorio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('todos');
  const [genderFilter, setGenderFilter] = useState('todos');
  const [ageFilter, setAgeFilter] = useState('todos');
  const [nextAppointment, setNextAppointment] = useState<Date>(new Date('2024-12-20T15:30:00'));
  const [showCalendar, setShowCalendar] = useState(false);
  const [countdownTime, setCountdownTime] = useState('');

  // Datos de estadísticas personales
  const [userStats] = useState({
    totalConsultations: 12,
    currentStreak: 4,
    favoriteTherapists: ['Dr. María González', 'Lic. Carlos Mendoza'],
    nextAppointmentTherapist: 'Dr. María González',
    completedSessions: 8,
    pendingSessions: 2
  });

  // Lista de terapeutas
  const [therapists] = useState<Therapist[]>([
    {
      id: 1,
      name: 'Dr. María González',
      specialty: 'Ansiedad y Estrés',
      gender: 'Femenino',
      age: 42,
      experience: 15,
      rating: 4.9,
      reviews: 124,
      description: 'Especialista en terapia cognitivo-conductual con enfoque en ansiedad y trastornos del estado de ánimo. Amplia experiencia trabajando con jóvenes adultos.',
      location: 'Madrid, España',
      price: 80,
      availability: ['Lunes', 'Miércoles', 'Viernes'],
      languages: ['Español', 'Inglés'],
      certifications: ['Colegio Oficial de Psicólogos', 'Certificación en TCC'],
      reviewsData: [
        { id: 1, author: 'Ana M.', rating: 5, comment: 'Excelente profesional, me ayudó mucho con mi ansiedad.', date: '2024-11-15' },
        { id: 2, author: 'Luis R.', rating: 5, comment: 'Muy empática y profesional. Recomendada 100%.', date: '2024-11-10' }
      ]
    },
    {
      id: 2,
      name: 'Lic. Carlos Mendoza',
      specialty: 'Depresión',
      gender: 'Masculino',
      age: 38,
      experience: 12,
      rating: 4.8,
      reviews: 89,
      description: 'Psicólogo clínico especializado en terapia humanista y tratamiento de la depresión. Enfoque cálido y centrado en la persona.',
      location: 'Barcelona, España',
      price: 75,
      availability: ['Martes', 'Jueves', 'Sábado'],
      languages: ['Español', 'Catalán'],
      certifications: ['Máster en Psicología Clínica', 'Especialista en Terapia Humanista'],
      reviewsData: [
        { id: 1, author: 'Sofia L.', rating: 5, comment: 'Me ayudó a superar una época muy difícil. Muy recomendable.', date: '2024-11-12' },
        { id: 2, author: 'Miguel A.', rating: 4, comment: 'Buen profesional, se nota su experiencia.', date: '2024-11-08' }
      ]
    },
    {
      id: 3,
      name: 'Dra. Elena Ruiz',
      specialty: 'Terapia de Pareja',
      gender: 'Femenino',
      age: 45,
      experience: 18,
      rating: 4.9,
      reviews: 156,
      description: 'Especialista en terapia de pareja y terapia familiar sistémica. Ayuda a resolver conflictos y mejorar la comunicación.',
      location: 'Valencia, España',
      price: 90,
      availability: ['Lunes', 'Martes', 'Jueves'],
      languages: ['Español', 'Francés'],
      certifications: ['Especialista en Terapia Familiar', 'Máster en Terapia de Pareja'],
      reviewsData: [
        { id: 1, author: 'Carmen y José', rating: 5, comment: 'Salvó nuestra relación. Muy profesional y efectiva.', date: '2024-11-14' }
      ]
    },
    {
      id: 4,
      name: 'Dr. Alejandro Torres',
      specialty: 'Adicciones',
      gender: 'Masculino',
      age: 52,
      experience: 22,
      rating: 4.7,
      reviews: 203,
      description: 'Psiquiatra especializado en adicciones y trastornos duales. Enfoque integral combinando terapia y tratamiento médico.',
      location: 'Sevilla, España',
      price: 100,
      availability: ['Miércoles', 'Viernes', 'Sábado'],
      languages: ['Español', 'Inglés', 'Portugués'],
      certifications: ['Especialista en Psiquiatría', 'Certificación en Adicciones'],
      reviewsData: [
        { id: 1, author: 'Roberto M.', rating: 5, comment: 'Me ayudó a recuperar mi vida. Eternamente agradecido.', date: '2024-11-13' }
      ]
    },
    {
      id: 5,
      name: 'Lic. Patricia Vega',
      specialty: 'Trastornos Alimentarios',
      gender: 'Femenino',
      age: 35,
      experience: 10,
      rating: 4.8,
      reviews: 67,
      description: 'Psicóloga especializada en trastornos de la conducta alimentaria. Enfoque multidisciplinario y tratamiento integral.',
      location: 'Bilbao, España',
      price: 70,
      availability: ['Lunes', 'Miércoles', 'Viernes'],
      languages: ['Español', 'Euskera'],
      certifications: ['Especialista en TCA', 'Certificación en Nutrición Psicológica'],
      reviewsData: [
        { id: 1, author: 'Laura S.', rating: 5, comment: 'Me ayudó a tener una relación sana con la comida.', date: '2024-11-11' }
      ]
    },
    {
      id: 6,
      name: 'Dr. Fernando López',
      specialty: 'Trauma y TEPT',
      gender: 'Masculino',
      age: 48,
      experience: 20,
      rating: 4.9,
      reviews: 145,
      description: 'Especialista en trauma y trastorno de estrés postraumático. Utiliza EMDR y otras técnicas especializadas.',
      location: 'Zaragoza, España',
      price: 85,
      availability: ['Martes', 'Jueves', 'Viernes'],
      languages: ['Español', 'Inglés'],
      certifications: ['Certificación EMDR', 'Especialista en Trauma'],
      reviewsData: [
        { id: 1, author: 'Andrea P.', rating: 5, comment: 'Profesional excepcional. Me ayudó a superar mi trauma.', date: '2024-11-09' }
      ]
    },
    {
      id: 7,
      name: 'Lic. Raquel Moreno',
      specialty: 'Terapia Infantil',
      gender: 'Femenino',
      age: 29,
      experience: 7,
      rating: 4.7,
      reviews: 43,
      description: 'Psicóloga especializada en terapia infantil y adolescente. Utiliza técnicas lúdicas y adaptadas a cada edad.',
      location: 'Málaga, España',
      price: 65,
      availability: ['Lunes', 'Martes', 'Miércoles'],
      languages: ['Español'],
      certifications: ['Especialista en Psicología Infantil', 'Certificación en Terapia Lúdica'],
      reviewsData: [
        { id: 1, author: 'María (madre)', rating: 5, comment: 'Mi hijo conectó muy bien con ella. Excelente con niños.', date: '2024-11-07' }
      ]
    },
    {
      id: 8,
      name: 'Dr. Joaquín Herrera',
      specialty: 'Trastornos del Sueño',
      gender: 'Masculino',
      age: 41,
      experience: 14,
      rating: 4.6,
      reviews: 78,
      description: 'Especialista en trastornos del sueño y cronobiología. Combina terapia conductual con higiene del sueño.',
      location: 'Granada, España',
      price: 75,
      availability: ['Martes', 'Jueves', 'Sábado'],
      languages: ['Español', 'Italiano'],
      certifications: ['Especialista en Medicina del Sueño', 'Certificación en Cronobiología'],
      reviewsData: [
        { id: 1, author: 'Pedro G.', rating: 4, comment: 'Me ayudó mucho con mi insomnio. Muy profesional.', date: '2024-11-06' }
      ]
    },
    {
      id: 9,
      name: 'Dra. Isabel Navarro',
      specialty: 'Trastorno Bipolar',
      gender: 'Femenino',
      age: 50,
      experience: 25,
      rating: 4.9,
      reviews: 189,
      description: 'Psiquiatra con amplia experiencia en trastornos del estado de ánimo, especialmente trastorno bipolar.',
      location: 'Murcia, España',
      price: 95,
      availability: ['Lunes', 'Miércoles', 'Viernes'],
      languages: ['Español', 'Francés', 'Inglés'],
      certifications: ['Especialista en Psiquiatría', 'Máster en Trastornos Bipolares'],
      reviewsData: [
        { id: 1, author: 'Antonio R.', rating: 5, comment: 'Excelente doctora. Me ayudó a estabilizar mi estado de ánimo.', date: '2024-11-05' }
      ]
    },
    {
      id: 10,
      name: 'Lic. Cristina Jiménez',
      specialty: 'Mindfulness y Meditación',
      gender: 'Femenino',
      age: 33,
      experience: 8,
      rating: 4.8,
      reviews: 95,
      description: 'Especialista en mindfulness, meditación y técnicas de relajación. Enfoque holístico del bienestar mental.',
      location: 'Santander, España',
      price: 60,
      availability: ['Lunes', 'Martes', 'Jueves', 'Sábado'],
      languages: ['Español', 'Inglés'],
      certifications: ['Instructora Certificada de Mindfulness', 'Especialista en Técnicas de Relajación'],
      reviewsData: [
        { id: 1, author: 'Elena M.', rating: 5, comment: 'Sus técnicas de mindfulness cambiaron mi vida. Muy recomendable.', date: '2024-11-04' }
      ]
    }
  ]);

  // Countdown para próxima cita
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const appointmentTime = nextAppointment.getTime();
      const difference = appointmentTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setCountdownTime(`${days}d ${hours}h ${minutes}m`);
      } else {
        setCountdownTime('¡Es hora de tu cita!');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [nextAppointment]);

  // Filtrar terapeutas
  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'todos' || therapist.specialty === specialtyFilter;
    const matchesGender = genderFilter === 'todos' || therapist.gender === genderFilter;
    const matchesAge = ageFilter === 'todos' || 
                      (ageFilter === 'joven' && therapist.age < 35) ||
                      (ageFilter === 'medio' && therapist.age >= 35 && therapist.age <= 50) ||
                      (ageFilter === 'senior' && therapist.age > 50);
    
    return matchesSearch && matchesSpecialty && matchesGender && matchesAge;
  });

  const specialties = [...new Set(therapists.map(t => t.specialty))];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const newAppointment = new Date(date);
      newAppointment.setHours(nextAppointment.getHours());
      newAppointment.setMinutes(nextAppointment.getMinutes());
      setNextAppointment(newAppointment);
      setShowCalendar(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => {}}
      />
      
      <div className="md:ml-80 transition-all duration-300 flex-1 flex flex-col">
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto py-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="w-8 h-8 text-vitalis-gold dark:text-yellow-400" />
                <h1 className="text-3xl font-bold text-vitalis-brown dark:text-white">Consultorio Virtual</h1>
              </div>
              <p className="text-vitalis-brown/70 dark:text-gray-300">Conecta con profesionales de la salud mental</p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600 p-1 shadow-lg">
                <TabsTrigger 
                  value="dashboard" 
                  className="rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 font-medium"
                >
                  Mi Consultorio
                </TabsTrigger>
                <TabsTrigger 
                  value="search" 
                  className="rounded-2xl data-[state=active]:bg-vitalis-gold data-[state=active]:text-white transition-all duration-300 font-medium"
                >
                  Buscar Terapeutas
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                {/* Próxima Cita */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Próxima Cita</h3>
                    </div>
                    <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                          Reagendar
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={nextAppointment}
                          onSelect={handleDateSelect}
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-blue-700 dark:text-blue-300 mb-2">
                        <strong>Terapeuta:</strong> {userStats.nextAppointmentTherapist}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 mb-2">
                        <strong>Fecha:</strong> {format(nextAppointment, 'PPP', { locale: es })}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400">
                        <strong>Hora:</strong> {format(nextAppointment, 'HH:mm')}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                        {countdownTime}
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">hasta tu próxima sesión</p>
                    </div>
                  </div>
                </Card>

                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
                    <Users className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-800 dark:text-green-200">{userStats.totalConsultations}</div>
                    <p className="text-green-600 dark:text-green-400 text-sm">Consultas Totales</p>
                  </Card>

                  <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-2 border-purple-200 dark:border-purple-700">
                    <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">{userStats.currentStreak}</div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm">Semanas Seguidas</p>
                  </Card>

                  <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-200 dark:border-orange-700">
                    <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">{userStats.completedSessions}</div>
                    <p className="text-orange-600 dark:text-orange-400 text-sm">Sesiones Completadas</p>
                  </Card>

                  <Card className="p-6 text-center bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-2 border-pink-200 dark:border-pink-700">
                    <Clock className="w-8 h-8 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-pink-800 dark:text-pink-200">{userStats.pendingSessions}</div>
                    <p className="text-pink-600 dark:text-pink-400 text-sm">Sesiones Pendientes</p>
                  </Card>
                </div>

                {/* Terapeutas Favoritos */}
                <Card className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-vitalis-brown dark:text-white">Terapeutas Favoritos</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userStats.favoriteTherapists.map((therapist, index) => {
                      const therapistData = therapists.find(t => t.name === therapist);
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-vitalis-cream/30 dark:bg-gray-700/30 rounded-xl">
                          <div className="w-12 h-12 bg-vitalis-gold/20 dark:bg-yellow-600/20 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-vitalis-gold dark:text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-vitalis-brown dark:text-white">{therapist}</h4>
                            <p className="text-sm text-vitalis-brown/70 dark:text-gray-300">
                              {therapistData?.specialty || 'Especialista'}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-vitalis-brown/70 dark:text-gray-300">
                                {therapistData?.rating || '4.9'}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-vitalis-gold hover:bg-vitalis-gold-dark text-white"
                            onClick={() => setSelectedTherapist(therapistData || null)}
                          >
                            Ver Perfil
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              {/* Search Tab */}
              <TabsContent value="search" className="space-y-6">
                {/* Filtros de Búsqueda */}
                <Card className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Search className="w-6 h-6 text-vitalis-gold dark:text-yellow-400" />
                    <h3 className="text-xl font-bold text-vitalis-brown dark:text-white">Buscar Terapeutas</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-vitalis-brown dark:text-gray-300 mb-2">
                        Buscar por nombre
                      </label>
                      <Input
                        placeholder="Nombre del terapeuta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-vitalis-gold/30 focus:border-vitalis-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-vitalis-brown dark:text-gray-300 mb-2">
                        Especialidad
                      </label>
                      <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                        <SelectTrigger className="border-vitalis-gold/30 focus:border-vitalis-gold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todas las especialidades</SelectItem>
                          {specialties.map(specialty => (
                            <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-vitalis-brown dark:text-gray-300 mb-2">
                        Género
                      </label>
                      <Select value={genderFilter} onValueChange={setGenderFilter}>
                        <SelectTrigger className="border-vitalis-gold/30 focus:border-vitalis-gold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="Femenino">Femenino</SelectItem>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-vitalis-brown dark:text-gray-300 mb-2">
                        Rango de Edad
                      </label>
                      <Select value={ageFilter} onValueChange={setAgeFilter}>
                        <SelectTrigger className="border-vitalis-gold/30 focus:border-vitalis-gold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todas las edades</SelectItem>
                          <SelectItem value="joven">Joven (&lt; 35 años)</SelectItem>
                          <SelectItem value="medio">Medio (35-50 años)</SelectItem>
                          <SelectItem value="senior">Senior (&gt; 50 años)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>

                {/* Lista de Terapeutas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTherapists.map(therapist => (
                    <Card 
                      key={therapist.id} 
                      className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-vitalis-gold dark:hover:border-yellow-400"
                      onClick={() => setSelectedTherapist(therapist)}
                    >
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-vitalis-gold/20 dark:bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-8 h-8 text-vitalis-gold dark:text-yellow-400" />
                        </div>
                        <h3 className="text-lg font-bold text-vitalis-brown dark:text-white">{therapist.name}</h3>
                        <p className="text-vitalis-gold dark:text-yellow-400 font-medium">{therapist.specialty}</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-vitalis-brown/70 dark:text-gray-300">Experiencia:</span>
                          <span className="text-vitalis-brown dark:text-white font-medium">{therapist.experience} años</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-vitalis-brown/70 dark:text-gray-300">Ubicación:</span>
                          <span className="text-vitalis-brown dark:text-white">{therapist.location.split(',')[0]}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-vitalis-brown/70 dark:text-gray-300">Precio:</span>
                          <span className="text-vitalis-brown dark:text-white font-medium">€{therapist.price}/sesión</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-vitalis-brown dark:text-white">{therapist.rating}</span>
                          <span className="text-vitalis-brown/70 dark:text-gray-300 text-sm">({therapist.reviews})</span>
                        </div>
                        
                        <Badge variant="secondary" className="bg-vitalis-green/20 text-vitalis-green dark:bg-green-600/20 dark:text-green-400">
                          {therapist.gender}
                        </Badge>
                      </div>

                      <Button 
                        className="w-full bg-vitalis-gold hover:bg-vitalis-gold-dark text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTherapist(therapist);
                        }}
                      >
                        Ver Perfil Completo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Card>
                  ))}
                </div>

                {filteredTherapists.length === 0 && (
                  <Card className="p-8 text-center bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      No se encontraron terapeutas
                    </h3>
                    <p className="text-gray-400 dark:text-gray-500">
                      Intenta ajustar los filtros de búsqueda
                    </p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>

      {/* Modal de Perfil del Terapeuta */}
      {selectedTherapist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-vitalis-gold/20 dark:bg-yellow-600/20 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-vitalis-gold dark:text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-vitalis-brown dark:text-white">{selectedTherapist.name}</h2>
                    <p className="text-vitalis-gold dark:text-yellow-400 font-medium text-lg">{selectedTherapist.specialty}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-medium">{selectedTherapist.rating}</span>
                        <span className="text-gray-600 dark:text-gray-400">({selectedTherapist.reviews} reseñas)</span>
                      </div>
                      <Badge className="bg-vitalis-green/20 text-vitalis-green dark:bg-green-600/20 dark:text-green-400">
                        {selectedTherapist.experience} años exp.
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedTherapist(null)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-vitalis-brown dark:text-white mb-3">Descripción</h3>
                    <p className="text-vitalis-brown/70 dark:text-gray-300 leading-relaxed">
                      {selectedTherapist.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vitalis-brown dark:text-white mb-3">Información</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-vitalis-gold dark:text-yellow-400" />
                        <span className="text-vitalis-brown dark:text-white">{selectedTherapist.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-vitalis-gold dark:text-yellow-400" />
                        <span className="text-vitalis-brown dark:text-white">{selectedTherapist.gender}, {selectedTherapist.age} años</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-vitalis-gold dark:text-yellow-400" />
                        <span className="text-vitalis-brown dark:text-white">€{selectedTherapist.price} por sesión</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vitalis-brown dark:text-white mb-3">Disponibilidad</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTherapist.availability.map(day => (
                        <Badge key={day} variant="outline" className="border-vitalis-gold text-vitalis-gold dark:border-yellow-400 dark:text-yellow-400">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vitalis-brown dark:text-white mb-3">Idiomas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTherapist.languages.map(lang => (
                        <Badge key={lang} className="bg-vitalis-green/20 text-vitalis-green dark:bg-green-600/20 dark:text-green-400">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-vitalis-brown dark:text-white mb-3">Certificaciones</h3>
                    <div className="space-y-2">
                      {selectedTherapist.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-vitalis-gold dark:text-yellow-400" />
                          <span className="text-vitalis-brown dark:text-white text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-vitalis-brown dark:text-white mb-3">Reseñas Recientes</h3>
                    <ScrollArea className="h-64">
                      <div className="space-y-4">
                        {selectedTherapist.reviewsData.map(review => (
                          <div key={review.id} className="p-4 bg-vitalis-cream/30 dark:bg-gray-700/30 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-vitalis-brown dark:text-white">{review.author}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-vitalis-brown/70 dark:text-gray-300 text-sm mb-2">{review.comment}</p>
                            <span className="text-xs text-vitalis-brown/50 dark:text-gray-400">{review.date}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-vitalis-gold/20 dark:border-gray-600">
                <Button 
                  className="flex-1 bg-vitalis-gold hover:bg-vitalis-gold-dark text-white"
                  onClick={() => {
                    // Aquí iría la lógica para agendar cita
                    alert('Funcionalidad de agendar cita próximamente');
                  }}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Agendar Cita
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-vitalis-gold text-vitalis-gold hover:bg-vitalis-gold/10 dark:border-yellow-400 dark:text-yellow-400"
                  onClick={() => {
                    // Aquí iría la lógica para contactar
                    alert('Funcionalidad de contacto próximamente');
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Consultorio; 
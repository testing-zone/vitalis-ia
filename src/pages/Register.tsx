import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Heart, Sparkles, User, Calendar, GraduationCap, MapPin } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    university: '',
    career: '',
    semester: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    
    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      // Guardar datos del usuario en localStorage para uso posterior
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/');
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStep1Valid = formData.name && formData.email && formData.password && formData.confirmPassword;
  const isStep2Valid = formData.gender && formData.age && formData.university;

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-gold/10 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo y bienvenida */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src="/img/leaf.png" 
                alt="VitalisIA Leaf" 
                className="w-20 h-20 animate-float"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-vitalis-gold animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-vitalis-brown mb-2">
            ¡Únete a VitalisIA!
          </h1>
          <p className="text-vitalis-brown/70 text-lg">
            Comienza tu viaje hacia el bienestar personalizado 🌱
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 1 ? 'bg-vitalis-gold text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-vitalis-gold' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 2 ? 'bg-vitalis-gold text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Tarjeta de registro */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-vitalis-gold/20 rounded-3xl shadow-xl">
          <form onSubmit={handleRegister} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-vitalis-brown mb-2">Información básica</h2>
                  <p className="text-vitalis-brown/70 text-sm">Cuéntanos sobre ti</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-vitalis-brown font-medium">
                    Nombre completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vitalis-brown/60" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre completo"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-vitalis-brown font-medium">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-vitalis-brown font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vitalis-brown/60 hover:text-vitalis-brown"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-vitalis-brown font-medium">
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vitalis-brown/60 hover:text-vitalis-brown"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep1Valid}
                  className="w-full h-12 bg-vitalis-green hover:bg-vitalis-green-dark text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105"
                >
                  Continuar
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-vitalis-brown mb-2">Personalización</h2>
                  <p className="text-vitalis-brown/70 text-sm">Para brindarte la mejor experiencia</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-vitalis-brown font-medium">
                    Género
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90">
                      <SelectValue placeholder="Selecciona tu género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mujer">
                        <div className="flex items-center gap-2">
                          <span>👩</span>
                          <span>Mujer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hombre">
                        <div className="flex items-center gap-2">
                          <span>👨</span>
                          <span>Hombre</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="no-binario">
                        <div className="flex items-center gap-2">
                          <span>🌈</span>
                          <span>No binario</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-vitalis-brown/60 mt-1">
                    Esto nos ayuda a personalizar tu experiencia de bienestar
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-vitalis-brown font-medium">
                    Edad
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vitalis-brown/60" />
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Tu edad"
                      min="16"
                      max="100"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university" className="text-vitalis-brown font-medium">
                    Universidad
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vitalis-brown/60" />
                    <Input
                      id="university"
                      type="text"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      placeholder="Nombre de tu universidad"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90 pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="career" className="text-vitalis-brown font-medium">
                      Carrera
                    </Label>
                    <Input
                      id="career"
                      type="text"
                      value={formData.career}
                      onChange={(e) => handleInputChange('career', e.target.value)}
                      placeholder="Tu carrera"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-vitalis-brown font-medium">
                      Semestre
                    </Label>
                    <Input
                      id="semester"
                      type="text"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      placeholder="Ej: 5to"
                      className="h-12 rounded-2xl border-2 border-vitalis-gold/30 focus:border-vitalis-gold bg-white/90"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 h-12 rounded-2xl border-2 border-vitalis-gold/30 text-vitalis-brown hover:bg-vitalis-gold/10"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isStep2Valid || isLoading}
                    className="flex-1 h-12 bg-vitalis-green hover:bg-vitalis-green-dark text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creando cuenta...</span>
                      </div>
                    ) : (
                      'Crear cuenta'
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-vitalis-brown/70">
              ¿Ya tienes cuenta?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-vitalis-green hover:text-vitalis-green-dark font-medium underline"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </Card>

        {/* Mensaje motivacional */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-vitalis-brown/80">
            <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold" />
            <span className="text-sm">Tu bienestar personalizado te espera</span>
            <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 
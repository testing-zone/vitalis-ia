import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Heart, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-gold/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y bienvenida */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img 
                src="/lovable-uploads/4e3febb6-c9a1-4006-b0a9-8f196c792c60.png" 
                alt="VitalisIA Capybara" 
                className="w-20 h-20 animate-float"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-vitalis-gold animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-vitalis-brown mb-2">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-vitalis-brown/70 text-lg">
            Tu compañero de bienestar te está esperando 🌱
          </p>
        </div>

        {/* Tarjeta de login */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-vitalis-gold/20 rounded-3xl shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-vitalis-brown font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-vitalis-brown/70 cursor-pointer">
                <input type="checkbox" className="rounded border-vitalis-gold/30" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="text-vitalis-green hover:text-vitalis-green-dark font-medium">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-vitalis-green hover:bg-vitalis-green-dark text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-vitalis-brown/70">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="text-vitalis-green hover:text-vitalis-green-dark font-medium underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </Card>

        {/* Mensaje motivacional */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-vitalis-brown/80">
            <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold" />
            <span className="text-sm">Tu bienestar es nuestra prioridad</span>
            <Heart className="w-4 h-4 text-vitalis-gold fill-vitalis-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

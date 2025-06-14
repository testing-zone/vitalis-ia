import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitalis-cream via-white to-vitalis-green-light/10">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenJourneyMap={() => {}}
      />
      
      <div className="md:ml-80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-vitalis-brown mb-6">Panel de Administración</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-vitalis-gold">1,234</div>
              <div className="text-vitalis-brown/70 mt-2">Usuarios registrados</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-vitalis-gold">8,765</div>
              <div className="text-vitalis-brown/70 mt-2">Sesiones totales</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-vitalis-gold">97%</div>
              <div className="text-vitalis-brown/70 mt-2">Retención semanal</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-vitalis-gold">12</div>
              <div className="text-vitalis-brown/70 mt-2">Reportes recibidos</div>
            </Card>
          </div>

          {/* Gráficas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-2 text-vitalis-brown">Crecimiento de usuarios</h2>
              <div className="h-56 flex items-center justify-center text-vitalis-brown/50">[Gráfico de línea de usuarios]</div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-2 text-vitalis-brown">Actividad diaria</h2>
              <div className="h-56 flex items-center justify-center text-vitalis-brown/50">[Gráfico de barras de actividad]</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-2 text-vitalis-brown">Retención de usuarios</h2>
              <div className="h-40 flex items-center justify-center text-vitalis-brown/50">[Gráfico de doughnut de retención]</div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-2 text-vitalis-brown">Distribución de roles</h2>
              <div className="h-40 flex items-center justify-center text-vitalis-brown/50">[Gráfico de pie de roles]</div>
            </Card>
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-2 text-vitalis-brown">Salud del sistema</h2>
              <div className="h-40 flex flex-col items-center justify-center text-vitalis-brown/50">
                <div>[Indicador de uptime]</div>
                <div>[Indicador de errores]</div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="usuarios" className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="usuarios">Usuarios recientes</TabsTrigger>
              <TabsTrigger value="actividad">Top usuarios activos</TabsTrigger>
            </TabsList>
            <TabsContent value="usuarios">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 text-vitalis-brown">Usuarios recientes</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="text-vitalis-gold">
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Rol</th>
                        <th className="py-2 px-4">Fecha registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">Ana López</td>
                        <td className="py-2 px-4">ana@email.com</td>
                        <td className="py-2 px-4">Usuario</td>
                        <td className="py-2 px-4">2024-06-01</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Carlos Ruiz</td>
                        <td className="py-2 px-4">carlos@email.com</td>
                        <td className="py-2 px-4">Admin</td>
                        <td className="py-2 px-4">2024-05-30</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">María Pérez</td>
                        <td className="py-2 px-4">maria@email.com</td>
                        <td className="py-2 px-4">Usuario</td>
                        <td className="py-2 px-4">2024-05-28</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="actividad">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 text-vitalis-brown">Top usuarios más activos</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead>
                      <tr className="text-vitalis-gold">
                        <th className="py-2 px-4">Nombre</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Sesiones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">Ana López</td>
                        <td className="py-2 px-4">ana@email.com</td>
                        <td className="py-2 px-4">120</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">Carlos Ruiz</td>
                        <td className="py-2 px-4">carlos@email.com</td>
                        <td className="py-2 px-4">110</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">María Pérez</td>
                        <td className="py-2 px-4">maria@email.com</td>
                        <td className="py-2 px-4">105</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Módulo de reportes recientes */}
          <div className="mt-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-vitalis-brown">Reportes recientes</h2>
              <ul className="divide-y divide-vitalis-gold/20">
                <li className="py-2 flex justify-between items-center">
                  <span className="text-vitalis-brown">Problema con el registro</span>
                  <span className="text-xs text-vitalis-gold">2024-06-01</span>
                </li>
                <li className="py-2 flex justify-between items-center">
                  <span className="text-vitalis-brown">Error en módulo de hábitos</span>
                  <span className="text-xs text-vitalis-gold">2024-05-30</span>
                </li>
                <li className="py-2 flex justify-between items-center">
                  <span className="text-vitalis-brown">Sugerencia: agregar más videos</span>
                  <span className="text-xs text-vitalis-gold">2024-05-28</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard; 
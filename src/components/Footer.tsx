import React from 'react';

const groupMembers = [
  'Mateo Silva',
  'Juan Jose Diaz',
  'Sara Cardona',
  'Ana Cardona',
  'Sara Mejia',
  'Jennifer Castro',
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-vitalis-gold/40 px-4 py-10 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        {/* Logo e info */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <img
            src="/lovable-uploads/ChatGPT_Image_Jun_14__2025__03_34_01_AM-removebg-preview (1).png"
            alt="VitalisIA Capibara Logo"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div>
            <h2 className="text-2xl font-bold text-vitalis-brown mb-1">VitalisIA</h2>
            <p className="text-vitalis-brown/80 text-sm">Tu compañero de bienestar universitario</p>
            <p className="text-xs text-vitalis-brown/60">© 2024 VitalisIA</p>
          </div>
        </div>
        {/* Integrantes */}
        <div className="flex flex-col items-center md:items-start flex-1">
          <h3 className="text-lg font-semibold text-vitalis-brown mb-2">Equipo de desarrollo</h3>
          <ul className="pl-0 text-vitalis-brown text-sm space-y-1">
            {groupMembers.map((name) => (
              <li key={name} className="flex items-center gap-2 justify-center md:justify-start">
                <span className="p-0 text-vitalis-gold">•</span> {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

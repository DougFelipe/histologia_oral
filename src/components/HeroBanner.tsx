import React from 'react';
import { BookOpen, Image, Users, Award, ArrowRight, Play } from 'lucide-react';
import logo from '../data/LOGO.png'; // ✅ Caminho relativo correto

interface HeroBannerProps {
  onNavigate: (view: string) => void;
}

export default function HeroBanner({ onNavigate }: HeroBannerProps) {
  const stats = [
    { label: 'Tópicos', value: '12', icon: BookOpen },
    { label: 'Imagens', value: '200+', icon: Image },
    { label: 'Estruturas', value: '150+', icon: Award },
    { label: 'Usuários', value: '1k+', icon: Users },
  ];

  return (
    <div className="relative bg-white text-red-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
        <div className="flex flex-col items-center text-center">

          {/* ✅ Imagem do Atlas (logo) acima do título */}
          <img
            src={logo}
            alt="Logo do Atlas"
            className="w-36 sm:w-44 lg:w-52 h-auto drop-shadow-md"
          />

          {/* ✅ Título centralizado e elegante */}
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-red-800 tracking-tight drop-shadow-sm">
            Atlas Virtual de Histologia Oral
          </h1>

          {/* ✅ Estatísticas do projeto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-red-100/20 rounded-lg border border-red-100 shadow-sm">
                  <Icon className="h-8 w-8 text-red-800 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-900">{stat.value}</div>
                  <div className="text-sm text-rose-800">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* ✅ Botões de ação */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const themesSection = document.getElementById('themes-section');
                if (themesSection) {
                  themesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-colors shadow-lg flex items-center justify-center"
            >
              <Play className="h-4 w-4 mr-2" />
              Começar Exploração
            </button>
            <button
              onClick={() => onNavigate('guide')}
              className="px-8 py-3 border-2 border-red-800 text-red-800 font-semibold rounded-lg hover:bg-red-800 hover:text-white transition-colors flex items-center justify-center"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Modo de Usar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

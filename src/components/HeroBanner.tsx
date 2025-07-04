import React from 'react';
import { BookOpen, Image, Users, Award, ArrowRight, Play } from 'lucide-react';

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
    <div className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-800/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Atlas Virtual de
            <span className="block text-amber-200">Histologia Oral</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore estruturas histológicas da cavidade oral com imagens de alta qualidade, 
            legendas interativas e comparações detalhadas para o aprendizado médico.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Icon className="h-8 w-8 text-amber-200 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-amber-100">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const themesSection = document.getElementById('themes-section');
                if (themesSection) {
                  themesSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3 bg-white text-amber-800 font-semibold rounded-lg hover:bg-amber-50 transition-colors shadow-lg flex items-center justify-center"
            >
              <Play className="h-4 w-4 mr-2" />
              Começar Exploração
            </button>
            <button 
              onClick={() => onNavigate('guide')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-amber-800 transition-colors flex items-center justify-center"
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

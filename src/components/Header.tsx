import React from 'react';
import {
  Search,
  Menu,
  Book,
  HelpCircle,
  Globe,
  Users,
  Settings,
  Map
} from 'lucide-react';

import logo from '../data/LOGO.png'; // ✅ Caminho relativo correto

import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode | string;
  onViewChange: (view: ViewMode | string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function Header({
  currentView,
  onViewChange,
  searchTerm,
  onSearchChange
}: HeaderProps) {
  const isCMSEnabled = import.meta.env.VITE_ENABLE_CMS === 'true';

  const navItems = [
    { id: 'guide', label: 'Modo de Usar', icon: HelpCircle },
    { id: 'glossary', label: 'Glossário', icon: Book },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'sitemap', label: 'Mapa do Site', icon: Map },
    ...(isCMSEnabled ? [{ id: 'cms', label: 'CMS', icon: Settings }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ✅ Logo com nome ajustado */}
          <button
            onClick={() => onViewChange('grid')}
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            <img
              src={logo}
              alt="Logo do Atlas"
              className="w-10 h-10 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-red-800 leading-none">Atlas Virtual</h1>
              <p className="text-xs text-red-800 leading-none">Histologia Oral</p>
            </div>
          </button>

          {/* Navegação (desktop) */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-gray-700 hover:text-amber-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.id === 'cms' && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      DEV
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Campo de busca */}
          <div className="flex items-center">
            {currentView === 'grid' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="Buscar estruturas..."
                  aria-label="Buscar estruturas histológicas"
                />
              </div>
            )}
          </div>

          {/* Menu hambúrguer (mobile) */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Aviso de desenvolvimento */}
      {isCMSEnabled && import.meta.env.DEV && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-yellow-800">
              <strong>Modo Desenvolvimento:</strong> CMS administrativo ativo.
              Este painel não estará disponível em produção.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

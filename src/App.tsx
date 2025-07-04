import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ThemeGrid from './components/ThemeGrid';
import ThemeView from './components/ThemeView';
import ComparisonView from './components/ComparisonView';
import GuideView from './components/GuideView';
import GlossaryView from './components/GlossaryView';
import TeamView from './components/TeamView';
import SitemapView from './components/SitemapView';
import CMSDashboard from './components/cms/CMSDashboard';
import SEOHead from './components/SEOHead';
import { cmsService } from './services/cmsService';
import { ViewMode, FilterCategory, Theme, GlossaryTerm, TeamMember } from './types';
import { Settings } from 'lucide-react';
import logo from '../../data/LOGO.png';


function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('Todos');
  
  // Check if CMS is enabled via environment variable
  const isCMSEnabled = import.meta.env.VITE_ENABLE_CMS === 'true';
  
  // Dynamic data from CMS (includes both static and custom themes)
  const [themes, setThemes] = useState<Theme[]>([]);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Load all data from CMS
    loadCMSData();
    
    // Listen for CMS data updates
    const handleDataUpdate = (event: any) => {
      console.log('CMS data updated event received:', event.detail);
      loadCMSData();
    };
    
    window.addEventListener('cms-data-updated', handleDataUpdate);
    return () => window.removeEventListener('cms-data-updated', handleDataUpdate);
  }, []);

  const loadCMSData = () => {
    console.log('Loading CMS data...');
    
    // Get all themes from CMS (includes static + custom)
    const allThemes = cmsService.getAllThemes();
    console.log('All themes loaded:', allThemes.length);
    setThemes(allThemes);

    // Get glossary and team data
    const glossary = cmsService.getGlossaryTerms();
    const team = cmsService.getTeamMembers();
    
    setGlossaryTerms(glossary);
    setTeamMembers(team);
    
    console.log('Data loaded:', {
      themes: allThemes.length,
      glossary: glossary.length,
      team: team.length
    });
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentView('theme');
  };

  const handleBackToGrid = () => {
    setSelectedTheme(null);
    setCurrentView('grid');
  };

  const handleViewChange = (view: ViewMode | string) => {
    // Handle sitemap as special case
    if (view === 'sitemap') {
      setCurrentView('sitemap' as ViewMode);
      return;
    }

    // Block CMS access if not enabled in environment
    if (view === 'cms' && !isCMSEnabled) {
      console.warn('CMS access blocked: not enabled in current environment');
      alert('CMS não está disponível neste ambiente. Acesso restrito ao modo de desenvolvimento.');
      return;
    }

    setCurrentView(view as ViewMode);
    if (view === 'grid') {
      setSelectedTheme(null);
      // Reload data when returning to grid
      loadCMSData();
    }
  };

  const handleNavigate = (view: string) => {
    if (view === 'guide') {
      setCurrentView('guide');
    }
  };

  const handleLogout = () => {
    setCurrentView('grid');
    loadCMSData(); // Refresh data after logout
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'theme':
        return selectedTheme ? (
          <ThemeView theme={selectedTheme} onBack={handleBackToGrid} />
        ) : null;
      
      case 'comparison':
        return <ComparisonView themes={themes} onBack={handleBackToGrid} />;
      
      case 'guide':
        return <GuideView onBack={handleBackToGrid} />;
      
      case 'glossary':
        return <GlossaryView terms={glossaryTerms} onBack={handleBackToGrid} />;
      
      case 'team':
        return <TeamView members={teamMembers} onBack={handleBackToGrid} />;
      
      case 'sitemap':
        return (
          <SitemapView 
            themes={themes}
            glossaryTerms={glossaryTerms}
            teamMembers={teamMembers}
            onBack={handleBackToGrid}
            onThemeSelect={handleThemeSelect}
            onViewChange={handleViewChange}
          />
        );
      
      case 'cms':
        // Double-check CMS access
        if (!isCMSEnabled) {
          return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
                <p className="text-gray-600 mb-4">
                  O CMS não está disponível neste ambiente. 
                  Acesso permitido apenas em modo de desenvolvimento.
                </p>
                <button
                  onClick={() => setCurrentView('grid')}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                >
                  Voltar ao Atlas
                </button>
              </div>
            </div>
          );
        }
        
        // Direct access to CMS Dashboard (no login required)
        return <CMSDashboard onLogout={handleLogout} />;
      
      default:
        return (
          <>
            <SEOHead />
            <HeroBanner onNavigate={handleNavigate} />
            <ThemeGrid
              themes={themes}
              searchTerm={searchTerm}
              selectedFilter={selectedFilter}
              onThemeSelect={handleThemeSelect}
              onFilterChange={setSelectedFilter}
            />
          </>
        );
    }
  };

  // Don't render header and footer for CMS views
  if (currentView === 'cms') {
    return <div className="min-h-screen bg-gray-50">{renderCurrentView()}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="fade-in">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Atlas Virtual de Histologia Oral</h3>
              <p className="text-gray-300 mb-4">
                Plataforma educacional interativa para o estudo de estruturas histológicas da cavidade oral, 
                desenvolvida por especialistas em histologia e tecnologia educacional.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleViewChange('team')}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Nossa Equipe
                </button>
                <button 
                  onClick={() => handleViewChange('guide')}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Modo de Usar
                </button>
                <button 
                  onClick={() => handleViewChange('sitemap')}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Mapa do Site
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-300">
                <li>{themes.length} Temas Disponíveis</li>
                <li>200+ Imagens Histológicas</li>
                <li>Legendas Interativas</li>
                <li>
                  <button 
                    onClick={() => handleViewChange('comparison')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Modo Comparação
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button 
                    onClick={() => handleViewChange('guide')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Modo de Usar
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleViewChange('glossary')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Glossário de Termos
                  </button>
                </li>
                <li>Atualizações Constantes</li>
                <li>Interface Responsiva</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Atlas Virtual de Histologia Oral. Desenvolvido para fins educacionais.</p>
            <p className="mt-2 text-sm">
              Projeto desenvolvido com React, TypeScript e Tailwind CSS
              {isCMSEnabled && import.meta.env.DEV && (
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                  Modo Desenvolvimento - CMS Ativo
                </span>
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

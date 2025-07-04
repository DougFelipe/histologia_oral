import React from 'react';
import { ArrowLeft, ExternalLink, BookOpen, Users, FileText, HelpCircle } from 'lucide-react';
import { Theme, GlossaryTerm, TeamMember } from '../types';
import SEOHead from './SEOHead';

interface SitemapViewProps {
  themes: Theme[];
  glossaryTerms: GlossaryTerm[];
  teamMembers: TeamMember[];
  onBack: () => void;
  onThemeSelect: (theme: Theme) => void;
  onViewChange: (view: string) => void;
}

export default function SitemapView({ 
  themes, 
  glossaryTerms, 
  teamMembers, 
  onBack, 
  onThemeSelect, 
  onViewChange 
}: SitemapViewProps) {
  const completeThemes = themes.filter(theme => theme.status === 'complete');
  const developmentThemes = themes.filter(theme => theme.status === 'development');

  // SEO data for sitemap
  const seoTitle = "Mapa do Site - Atlas Virtual de Histologia Oral";
  const seoDescription = `Navegue por todo o conteúdo do Atlas Virtual: ${completeThemes.length} temas completos, ${glossaryTerms.length} termos no glossário e ${teamMembers.length} membros da equipe.`;
  const seoKeywords = "mapa do site, navegação atlas histologia, temas histologia oral, conteúdo educacional";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Mapa do Site - Atlas Virtual de Histologia Oral",
    "description": seoDescription,
    "url": "https://atlas-histologia-oral.com/sitemap",
    "hasPart": [
      {
        "@type": "WebPageElement",
        "name": "Temas de Histologia",
        "description": `${completeThemes.length} temas completos de histologia oral`,
        "url": "https://atlas-histologia-oral.com/#themes"
      },
      {
        "@type": "WebPageElement", 
        "name": "Glossário",
        "description": `${glossaryTerms.length} termos técnicos definidos`,
        "url": "https://atlas-histologia-oral.com/glossary"
      },
      {
        "@type": "WebPageElement",
        "name": "Equipe",
        "description": `${teamMembers.length} especialistas em histologia oral`,
        "url": "https://atlas-histologia-oral.com/team"
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url="https://atlas-histologia-oral.com/sitemap"
        type="website"
        structuredData={structuredData}
      />
      
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>

        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mapa do Site</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navegue por todo o conteúdo disponível no Atlas Virtual de Histologia Oral. 
            Encontre rapidamente temas, definições e informações sobre nossa equipe.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Sections */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <header className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Seções Principais</h2>
            </header>
            
            <nav className="space-y-3">
              <button
                onClick={() => onViewChange('grid')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-gray-900">Página Inicial</div>
                  <div className="text-sm text-gray-600">Grid de temas e navegação principal</div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button
                onClick={() => onViewChange('glossary')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-gray-900">Glossário</div>
                  <div className="text-sm text-gray-600">{glossaryTerms.length} termos técnicos definidos</div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button
                onClick={() => onViewChange('team')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-gray-900">Equipe</div>
                  <div className="text-sm text-gray-600">{teamMembers.length} especialistas em histologia oral</div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button
                onClick={() => onViewChange('guide')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <div className="font-medium text-gray-900">Modo de Usar</div>
                  <div className="text-sm text-gray-600">Guia de navegação e funcionalidades</div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
            </nav>
          </section>

          {/* Statistics */}
          <section className="bg-white rounded-xl shadow-lg p-6">
            <header className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Estatísticas do Conteúdo</h2>
            </header>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{completeThemes.length}</div>
                <div className="text-sm text-gray-600">Temas Completos</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{developmentThemes.length}</div>
                <div className="text-sm text-gray-600">Em Desenvolvimento</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{glossaryTerms.length}</div>
                <div className="text-sm text-gray-600">Termos no Glossário</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{teamMembers.length}</div>
                <div className="text-sm text-gray-600">Membros da Equipe</div>
              </div>
            </div>
          </section>
        </div>

        {/* Complete Themes */}
        <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <header className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Temas Completos ({completeThemes.length})</h2>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completeThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeSelect(theme)}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-start">
                  <img
                    src={theme.image}
                    alt={`Miniatura de ${theme.name}`}
                    className="w-16 h-16 object-cover rounded-lg mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{theme.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{theme.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                        {theme.category}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {theme.subtopics.length} subtópicos
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Development Themes */}
        {developmentThemes.length > 0 && (
          <section className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <header className="flex items-center mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <HelpCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Em Desenvolvimento ({developmentThemes.length})</h2>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {developmentThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-start">
                    <img
                      src={theme.image}
                      alt={`Miniatura de ${theme.name} (em desenvolvimento)`}
                      className="w-16 h-16 object-cover rounded-lg mr-3 flex-shrink-0 opacity-60"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{theme.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{theme.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {theme.category}
                        </span>
                        <span className="text-xs text-yellow-600 ml-2">
                          Em breve
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-8 text-center text-gray-500">
          <p className="text-sm">
            Última atualização: {new Date().toLocaleDateString('pt-BR')} • 
            Total de {themes.length} temas catalogados
          </p>
        </footer>
      </article>
    </>
  );
}
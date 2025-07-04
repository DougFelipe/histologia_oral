import React, { useState } from 'react';
import { Theme, ThemeViewMode, Subtopic } from '../types';
import { ArrowLeft, BookOpen, Eye, Grid3X3, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import InteractiveLegend from './InteractiveLegend';
import ImageZoomModal from './ImageZoomModal';
import SEOHead, { generateThemeStructuredData } from './SEOHead';

interface ThemeViewProps {
  theme: Theme;
  onBack: () => void;
}

export default function ThemeView({ theme, onBack }: ThemeViewProps) {
  const [viewMode, setViewMode] = useState<ThemeViewMode>('pagination');
  const [currentSubtopic, setCurrentSubtopic] = useState(0);
  const [isHeaderImageZoomed, setIsHeaderImageZoomed] = useState(false);

  // SEO data for this theme
  const seoTitle = `${theme.name} - Atlas Virtual de Histologia Oral`;
  const seoDescription = `${theme.description} Explore estruturas histológicas detalhadas com imagens interativas e legendas explicativas.`;
  const seoKeywords = `${theme.name.toLowerCase()}, histologia oral, ${theme.category.toLowerCase()}, estruturas histológicas, anatomia microscópica, educação médica`;
  const seoUrl = `https://atlas-histologia-oral.com/theme/${theme.id}`;
  const structuredData = generateThemeStructuredData(theme);

  if (theme.status === 'development') {
    return (
      <>
        <SEOHead
          title={`${theme.name} (Em Desenvolvimento) - Atlas Virtual de Histologia Oral`}
          description={`${theme.description} Este tema está em desenvolvimento e será disponibilizado em breve.`}
          keywords={seoKeywords}
          url={seoUrl}
          type="article"
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={onBack}
            className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Temas
          </button>

          <article className="text-center py-16">
            <header className="mb-8">
              <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-amber-100 mb-8">
                <BookOpen className="h-16 w-16 text-amber-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{theme.name}</h1>
              <p className="text-xl text-gray-600 mb-8">Tema em desenvolvimento</p>
            </header>
            
            <section className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-amber-800">
                O conteúdo completo para este tema ainda está sendo elaborado. 
                Em breve estará disponível com imagens histológicas detalhadas, 
                legendas interativas e descrições completas das estruturas.
              </p>
            </section>
          </article>
        </div>
      </>
    );
  }

  const nextSubtopic = () => {
    setCurrentSubtopic((prev) => (prev + 1) % theme.subtopics.length);
  };

  const prevSubtopic = () => {
    setCurrentSubtopic((prev) => (prev - 1 + theme.subtopics.length) % theme.subtopics.length);
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        image={theme.image}
        url={seoUrl}
        type="article"
        theme={theme}
        structuredData={structuredData}
      />
      
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-amber-600 hover:text-amber-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Temas
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('pagination')}
                className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'pagination'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3X3 className="h-4 w-4 mr-1" />
                Páginas
              </button>
              <button
                onClick={() => setViewMode('scroll')}
                className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'scroll'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="h-4 w-4 mr-1" />
                Rolagem
              </button>
            </div>
          </div>
        </div>

        {/* Theme Header */}
        <header className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80 group">
            <img
              src={theme.image}
              alt={`Imagem histológica de ${theme.name} - ${theme.description}`}
              className="w-full h-full object-cover cursor-pointer"
            />
            
            {/* Zoom button for header image */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setIsHeaderImageZoomed(true)}
                className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                title="Ampliar imagem"
                aria-label={`Ampliar imagem de ${theme.name}`}
              >
                <ZoomIn className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{theme.name}</h1>
              <p className="text-lg text-gray-200">{theme.description}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <span className="bg-white/20 px-2 py-1 rounded">{theme.category}</span>
                <span className="bg-white/20 px-2 py-1 rounded">{theme.subtopics.length} subtópicos</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        {viewMode === 'pagination' ? (
          <section className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Subtopic Navigation */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {theme.subtopics[currentSubtopic]?.title}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {currentSubtopic + 1} de {theme.subtopics.length}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevSubtopic}
                      disabled={theme.subtopics.length <= 1}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Subtópico anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={nextSubtopic}
                      disabled={theme.subtopics.length <= 1}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Próximo subtópico"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtopic Content */}
            <div className="p-6">
              {theme.subtopics[currentSubtopic] && (
                <SubtopicContent subtopic={theme.subtopics[currentSubtopic]} themeName={theme.name} />
              )}
            </div>
          </section>
        ) : (
          <div className="space-y-8">
            {theme.subtopics.map((subtopic, index) => (
              <section key={subtopic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{subtopic.title}</h2>
                  <SubtopicContent subtopic={subtopic} themeName={theme.name} />
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Header Image Zoom Modal */}
        <ImageZoomModal
          isOpen={isHeaderImageZoomed}
          imageUrl={theme.image}
          imageAlt={`Imagem histológica de ${theme.name} - ${theme.description}`}
          onClose={() => setIsHeaderImageZoomed(false)}
        />
      </article>
    </>
  );
}

function SubtopicContent({ subtopic, themeName }: { subtopic: Subtopic; themeName: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <p className="text-gray-700 leading-relaxed text-lg">{subtopic.content}</p>
        
        {/* Structured content for better SEO */}
        {subtopic.structures && subtopic.structures.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Estruturas Identificadas:</h3>
            <dl className="space-y-2">
              {subtopic.structures.map((structure) => (
                <div key={structure.id} className="border-l-4 border-amber-500 pl-4">
                  <dt className="font-medium text-gray-900">{structure.name}</dt>
                  <dd className="text-gray-600 text-sm mt-1">{structure.description}</dd>
                  <dd className="text-amber-700 text-sm italic">Função: {structure.function}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
      
      <div>
        {subtopic.image && (
          <InteractiveLegend
            image={subtopic.image}
            structures={subtopic.structures || []}
            imageAlt={`${subtopic.title} - ${themeName} - Imagem histológica com estruturas identificadas`}
          />
        )}
      </div>
    </div>
  );
}
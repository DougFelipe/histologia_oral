import React, { useState } from 'react';
import { ArrowLeft, Search, BookOpen } from 'lucide-react';
import { GlossaryTerm } from '../types';
import SEOHead, { generateGlossaryStructuredData } from './SEOHead';

interface GlossaryViewProps {
  terms: GlossaryTerm[];
  onBack: () => void;
}

export default function GlossaryView({ terms, onBack }: GlossaryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(terms.map(term => term.category)))];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.term.charAt(0).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, GlossaryTerm[]>);

  // SEO data for glossary
  const seoTitle = "Glossário de Histologia Oral - Definições e Termos Técnicos";
  const seoDescription = `Glossário completo com ${terms.length} termos técnicos de histologia oral. Definições detalhadas de epitélio estratificado, queratinização, lâmina própria e outras estruturas histológicas.`;
  const seoKeywords = "glossário histologia oral, termos técnicos, definições médicas, epitélio estratificado, queratinização, lâmina própria, cementócitos, desmossomas";
  const structuredData = generateGlossaryStructuredData(terms);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url="https://atlas-histologia-oral.com/glossary"
        type="article"
        structuredData={structuredData}
      />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>

        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Glossário de Histologia Oral</h1>
          <p className="text-lg text-gray-600">
            Definições de {terms.length} termos técnicos em histologia oral para estudantes e profissionais da área médica e odontológica
          </p>
        </header>

        {/* Search and Filter */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Buscar termos..."
                aria-label="Buscar termos no glossário"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                aria-label="Filtrar por categoria"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Terms List */}
        <div className="space-y-6">
          {Object.keys(groupedTerms).sort().map(letter => (
            <section key={letter} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <header className="bg-amber-50 px-6 py-3 border-b border-amber-100">
                <h2 className="text-xl font-bold text-amber-800">{letter}</h2>
              </header>
              <div className="p-6">
                <dl className="space-y-4">
                  {groupedTerms[letter].map((term, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                        <dt className="text-lg font-semibold text-gray-900">{term.term}</dt>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1 sm:mt-0">
                          {term.category}
                        </span>
                      </div>
                      <dd className="text-gray-700 leading-relaxed">{term.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum termo encontrado com os filtros aplicados.</p>
          </div>
        )}

        {/* Stats */}
        <footer className="mt-8 text-center text-gray-500">
          <p>
            Mostrando {filteredTerms.length} de {terms.length} termos
          </p>
        </footer>
      </article>
    </>
  );
}
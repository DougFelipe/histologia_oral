import React, { useState } from 'react';
import { Theme } from '../types';
import { ArrowLeft, RotateCcw, ZoomIn } from 'lucide-react';

interface ComparisonViewProps {
  themes: Theme[];
  onBack: () => void;
}

export default function ComparisonView({ themes, onBack }: ComparisonViewProps) {
  const [selectedTheme1, setSelectedTheme1] = useState<Theme | null>(null);
  const [selectedTheme2, setSelectedTheme2] = useState<Theme | null>(null);

  const availableThemes = themes.filter(theme => theme.status === 'complete');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-amber-600 hover:text-amber-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Comparação de Estruturas</h1>
        
        <button
          onClick={() => {
            setSelectedTheme1(null);
            setSelectedTheme2(null);
          }}
          className="flex items-center text-gray-600 hover:text-gray-700"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Limpar
        </button>
      </div>

      {/* Theme Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estrutura 1</h3>
          <select
            value={selectedTheme1?.id || ''}
            onChange={(e) => {
              const theme = availableThemes.find(t => t.id === e.target.value);
              setSelectedTheme1(theme || null);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Selecione uma estrutura...</option>
            {availableThemes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estrutura 2</h3>
          <select
            value={selectedTheme2?.id || ''}
            onChange={(e) => {
              const theme = availableThemes.find(t => t.id === e.target.value);
              setSelectedTheme2(theme || null);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Selecione uma estrutura...</option>
            {availableThemes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Display */}
      {selectedTheme1 && selectedTheme2 && (
        <div className="comparison-container">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedTheme1.name}</h3>
              <p className="text-sm text-gray-600">{selectedTheme1.description}</p>
            </div>
            <div className="relative group">
              <img
                src={selectedTheme1.image}
                alt={selectedTheme1.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 rounded-full shadow-lg">
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-600">
                <strong>Categoria:</strong> {selectedTheme1.category}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Subtópicos:</strong> {selectedTheme1.subtopics.length}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedTheme2.name}</h3>
              <p className="text-sm text-gray-600">{selectedTheme2.description}</p>
            </div>
            <div className="relative group">
              <img
                src={selectedTheme2.image}
                alt={selectedTheme2.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 rounded-full shadow-lg">
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-600">
                <strong>Categoria:</strong> {selectedTheme2.category}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Subtópicos:</strong> {selectedTheme2.subtopics.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Analysis */}
      {selectedTheme1 && selectedTheme2 && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Análise Comparativa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Semelhanças</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {selectedTheme1.category === selectedTheme2.category && (
                  <li>• Ambas pertencem à categoria: {selectedTheme1.category}</li>
                )}
                <li>• Estruturas da cavidade oral</li>
                <li>• Origem ectodérmica</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Diferenças</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {selectedTheme1.category !== selectedTheme2.category && (
                  <li>• Categorias diferentes: {selectedTheme1.category} vs {selectedTheme2.category}</li>
                )}
                <li>• Localização anatômica distinta</li>
                <li>• Funções especializadas diferentes</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {(!selectedTheme1 || !selectedTheme2) && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Selecione duas estruturas para iniciar a comparação
          </p>
        </div>
      )}
    </div>
  );
}
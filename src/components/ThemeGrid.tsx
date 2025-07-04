import React from 'react';
import { Theme, FilterCategory } from '../types';
import { Clock, CheckCircle } from 'lucide-react';

interface ThemeGridProps {
  themes: Theme[];
  searchTerm: string;
  selectedFilter: FilterCategory;
  onThemeSelect: (theme: Theme) => void;
  onFilterChange: (filter: FilterCategory) => void;
}

export default function ThemeGrid({ 
  themes, 
  searchTerm, 
  selectedFilter, 
  onThemeSelect, 
  onFilterChange 
}: ThemeGridProps) {
  const filters: FilterCategory[] = ['Todos', 'Tecido Mole', 'Tecido Duro', 'Embrionário', 'Adulto', 'Patológico'];

  const filteredThemes = themes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'Todos' || theme.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div id="themes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explorar Temas</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredThemes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => onThemeSelect(theme)}
            className="theme-card bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer overflow-hidden border border-gray-200"
          >
            <div className="relative">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                {theme.status === 'complete' ? (
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="bg-amber-500 text-white p-1 rounded-full">
                    <Clock className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{theme.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{theme.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {theme.category}
                </span>
                
                <div className="text-xs text-gray-500">
                  {theme.status === 'complete' ? (
                    `${theme.subtopics.length} tópicos`
                  ) : (
                    'Em desenvolvimento'
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredThemes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum tema encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}
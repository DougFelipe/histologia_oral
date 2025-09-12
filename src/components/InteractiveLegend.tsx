import React, { useState } from 'react';
import { Structure } from '../types';
import { Info, ZoomIn } from 'lucide-react';
import ImageZoomModal from './ImageZoomModal';

interface InteractiveLegendProps {
  image: string;
  structures: Structure[];
  imageAlt?: string;
}

export default function InteractiveLegend({ image, structures, imageAlt = "Imagem histológica com estruturas identificadas" }: InteractiveLegendProps) {
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  return (
    <div className="relative">
      <div className="relative group">
        <img
          src={image}
          alt={imageAlt}
          className="w-full rounded-lg shadow-md cursor-pointer"
        />
        
        {/* Zoom button overlay */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => setIsZoomModalOpen(true)}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
            title="Ampliar imagem"
            aria-label="Ampliar imagem histológica"
          >
            <ZoomIn className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        
        {/* Interactive markers 
        {structures.map((structure) => (
          <button
            key={structure.id}
            onClick={() => setSelectedStructure(structure)}
            className="interactive-marker"
            style={{
              left: `${structure.x}%`,
              top: `${structure.y}%`,
            }}
            title={structure.name}
            aria-label={`Estrutura: ${structure.name} - ${structure.description}`}
          />
        ))}*/}
        
        {/* Overlay for selected structure */}
        {selectedStructure && (
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 m-4 shadow-xl max-w-sm">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{selectedStructure.name}</h3>
                <button
                  onClick={() => setSelectedStructure(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                  aria-label="Fechar detalhes da estrutura"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-700 text-sm mb-2">{selectedStructure.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Info className="h-3 w-3 mr-1" />
                <span>{selectedStructure.function}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Legend list 
      {structures.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Estruturas Identificadas:</h4>
          <ul className="space-y-1">
            {structures.map((structure) => (
              <li key={structure.id}>
                <button
                  onClick={() => setSelectedStructure(structure)}
                  className="flex items-center text-sm text-gray-700 hover:text-amber-600 w-full text-left transition-colors"
                  aria-label={`Ver detalhes de ${structure.name}`}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                  {structure.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}*/}

      {/* Zoom Modal */}
      <ImageZoomModal
        isOpen={isZoomModalOpen}
        imageUrl={image}
        imageAlt={imageAlt}
        onClose={() => setIsZoomModalOpen(false)}
      />
    </div>
  );
}

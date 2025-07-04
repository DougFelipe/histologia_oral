import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, Eye } from 'lucide-react';
import { Theme, Subtopic, Structure } from '../../types';
import { cmsService } from '../../services/cmsService';

interface CMSThemeFormProps {
  theme?: Theme | null;
  onClose: () => void;
}

export default function CMSThemeForm({ theme, onClose }: CMSThemeFormProps) {
  const [formData, setFormData] = useState<Partial<Theme>>({
    name: '',
    description: '',
    category: 'Tecido Mole',
    status: 'development',
    image: '',
    subtopics: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    if (theme) {
      setFormData(theme);
      setPreviewImage(theme.image);
    }
  }, [theme]);

  const handleInputChange = (field: keyof Theme, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const imageUrl = await cmsService.uploadImage(file);
        setFormData(prev => ({ ...prev, image: imageUrl }));
        setPreviewImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      setIsLoading(false);
    }
  };

  const addSubtopic = () => {
    const newSubtopic: Subtopic = {
      id: `subtopic-${Date.now()}`,
      title: '',
      content: '',
      structures: []
    };
    setFormData(prev => ({
      ...prev,
      subtopics: [...(prev.subtopics || []), newSubtopic]
    }));
  };

  const updateSubtopic = (index: number, field: keyof Subtopic, value: any) => {
    const updatedSubtopics = [...(formData.subtopics || [])];
    updatedSubtopics[index] = { ...updatedSubtopics[index], [field]: value };
    setFormData(prev => ({ ...prev, subtopics: updatedSubtopics }));
  };

  const removeSubtopic = (index: number) => {
    const updatedSubtopics = [...(formData.subtopics || [])];
    updatedSubtopics.splice(index, 1);
    setFormData(prev => ({ ...prev, subtopics: updatedSubtopics }));
  };

  const addStructure = (subtopicIndex: number) => {
    const newStructure: Structure = {
      id: `structure-${Date.now()}`,
      name: '',
      description: '',
      function: '',
      x: 50,
      y: 50
    };
    const updatedSubtopics = [...(formData.subtopics || [])];
    updatedSubtopics[subtopicIndex].structures = [
      ...(updatedSubtopics[subtopicIndex].structures || []),
      newStructure
    ];
    setFormData(prev => ({ ...prev, subtopics: updatedSubtopics }));
  };

  const updateStructure = (subtopicIndex: number, structureIndex: number, field: keyof Structure, value: any) => {
    const updatedSubtopics = [...(formData.subtopics || [])];
    const structures = [...(updatedSubtopics[subtopicIndex].structures || [])];
    structures[structureIndex] = { ...structures[structureIndex], [field]: value };
    updatedSubtopics[subtopicIndex].structures = structures;
    setFormData(prev => ({ ...prev, subtopics: updatedSubtopics }));
  };

  const removeStructure = (subtopicIndex: number, structureIndex: number) => {
    const updatedSubtopics = [...(formData.subtopics || [])];
    const structures = [...(updatedSubtopics[subtopicIndex].structures || [])];
    structures.splice(structureIndex, 1);
    updatedSubtopics[subtopicIndex].structures = structures;
    setFormData(prev => ({ ...prev, subtopics: updatedSubtopics }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Submitting theme data:', formData);
      
      if (theme) {
        cmsService.updateTheme(theme.id, formData);
        console.log('Theme updated successfully');
      } else {
        const newTheme = cmsService.createTheme(formData as Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>);
        console.log('Theme created successfully:', newTheme);
      }
      
      // Debug: Check if data was saved
      cmsService.debugData();
      
      onClose();
    } catch (error) {
      console.error('Error saving theme:', error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {theme ? 'Editar Tema' : 'Novo Tema'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Tema *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
                placeholder="Ex: Epitélio Gengival"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="Tecido Mole">Tecido Mole</option>
                <option value="Tecido Duro">Tecido Duro</option>
                <option value="Embrionário">Embrionário</option>
                <option value="Adulto">Adulto</option>
                <option value="Patológico">Patológico</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
              placeholder="Descrição detalhada do tema histológico..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status || ''}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="development">Em Desenvolvimento</option>
                <option value="complete">Completo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagem Principal *
              </label>
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Imagem
                </label>
                {previewImage && (
                  <button
                    type="button"
                    onClick={() => window.open(previewImage, '_blank')}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          {/* Subtopics */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Subtópicos</h3>
              <button
                type="button"
                onClick={addSubtopic}
                className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar Subtópico
              </button>
            </div>

            {formData.subtopics?.map((subtopic, subtopicIndex) => (
              <div key={subtopic.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Subtópico {subtopicIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeSubtopic(subtopicIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Título do subtópico *"
                    value={subtopic.title}
                    onChange={(e) => updateSubtopic(subtopicIndex, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />

                  <textarea
                    placeholder="Conteúdo do subtópico *"
                    value={subtopic.content}
                    onChange={(e) => updateSubtopic(subtopicIndex, 'content', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />

                  <input
                    type="url"
                    placeholder="URL da imagem do subtópico (opcional)"
                    value={subtopic.image || ''}
                    onChange={(e) => updateSubtopic(subtopicIndex, 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />

                  {/* Structures */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Estruturas Interativas</span>
                      <button
                        type="button"
                        onClick={() => addStructure(subtopicIndex)}
                        className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        <Plus className="h-3 w-3 mr-1 inline" />
                        Estrutura
                      </button>
                    </div>

                    {subtopic.structures?.map((structure, structureIndex) => (
                      <div key={structure.id} className="bg-gray-50 p-3 rounded mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-600">
                            Estrutura {structureIndex + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeStructure(subtopicIndex, structureIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <input
                            type="text"
                            placeholder="Nome da estrutura *"
                            value={structure.name}
                            onChange={(e) => updateStructure(subtopicIndex, structureIndex, 'name', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Função *"
                            value={structure.function}
                            onChange={(e) => updateStructure(subtopicIndex, structureIndex, 'function', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Posição X (%)"
                            min="0"
                            max="100"
                            value={structure.x}
                            onChange={(e) => updateStructure(subtopicIndex, structureIndex, 'x', Number(e.target.value))}
                            className="px-2 py-1 border border-gray-300 rounded"
                            required
                          />
                          <input
                            type="number"
                            placeholder="Posição Y (%)"
                            min="0"
                            max="100"
                            value={structure.y}
                            onChange={(e) => updateStructure(subtopicIndex, structureIndex, 'y', Number(e.target.value))}
                            className="px-2 py-1 border border-gray-300 rounded"
                            required
                          />
                          <textarea
                            placeholder="Descrição da estrutura *"
                            value={structure.description}
                            onChange={(e) => updateStructure(subtopicIndex, structureIndex, 'description', e.target.value)}
                            rows={2}
                            className="col-span-2 px-2 py-1 border border-gray-300 rounded text-xs"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {(!formData.subtopics || formData.subtopics.length === 0) && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-4">Nenhum subtópico adicionado ainda</p>
                <button
                  type="button"
                  onClick={addSubtopic}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Adicionar Primeiro Subtópico
                </button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : (theme ? 'Atualizar' : 'Criar')} Tema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
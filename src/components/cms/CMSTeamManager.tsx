import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Eye } from 'lucide-react';
import { TeamMember } from '../../types';
import { cmsService } from '../../services/cmsService';

export default function CMSTeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    photo: '',
    formation: '',
    contribution: '',
    specialization: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    setMembers(cmsService.getTeamMembers());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingMember) {
        cmsService.updateTeamMember(editingMember.id, formData);
      } else {
        const newMember = {
          ...formData,
          id: `member-${Date.now()}`
        };
        cmsService.createTeamMember(newMember);
      }
      resetForm();
      loadMembers();
    } catch (error) {
      console.error('Error saving member:', error);
    }
    
    setIsLoading(false);
  };

  const handleEdit = (member: TeamMember) => {
    setFormData(member);
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      cmsService.deleteTeamMember(id);
      loadMembers();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const imageUrl = await cmsService.uploadImage(file);
        setFormData(prev => ({ ...prev, photo: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      photo: '',
      formation: '',
      contribution: '',
      specialization: ''
    });
    setEditingMember(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Equipe</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Membro
        </button>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.formation}</p>
              {member.specialization && (
                <p className="text-xs text-amber-600 mb-3">{member.specialization}</p>
              )}
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{member.contribution}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum membro cadastrado</h3>
          <p className="text-gray-600 mb-4">Comece adicionando os membros da sua equipe.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
          >
            Adicionar Primeiro Membro
          </button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingMember ? 'Editar Membro' : 'Novo Membro'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto
                </label>
                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Foto
                  </label>
                  {formData.photo && (
                    <button
                      type="button"
                      onClick={() => window.open(formData.photo, '_blank')}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {formData.photo && (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formação Acadêmica
                </label>
                <input
                  type="text"
                  value={formData.formation}
                  onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: PhD em Histologia - USP"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialização (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.specialization || ''}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: Histologia Oral e Patologia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribuição no Projeto
                </label>
                <textarea
                  value={formData.contribution}
                  onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Descreva a contribuição deste membro no projeto..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                >
                  {isLoading ? 'Salvando...' : (editingMember ? 'Atualizar' : 'Criar')} Membro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
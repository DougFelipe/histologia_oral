import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Copy,
  Download,
  Upload,
  RotateCcw,
  Shield,
  Package,
  Save,
  CheckCircle,
  AlertCircle,
  HardDrive
} from 'lucide-react';
import { CMSSection, Theme } from '../../types';
import { cmsService } from '../../services/cmsService';
import CMSThemeForm from './CMSThemeForm';
import CMSGlossaryManager from './CMSGlossaryManager';
import CMSTeamManager from './CMSTeamManager';

interface CMSDashboardProps {
  onLogout: () => void;
}

export default function CMSDashboard({ onLogout }: CMSDashboardProps) {
  const [activeSection, setActiveSection] = useState<CMSSection>('dashboard');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [showThemeForm, setShowThemeForm] = useState(false);
  const [statistics, setStatistics] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | 'loading' | null; message: string }>({ type: null, message: '' });

  // Check if CMS write is enabled
  const isCMSWriteEnabled = import.meta.env.VITE_ENABLE_CMS_WRITE === 'true';

  useEffect(() => {
    loadData();
    
    // Listen for data updates
    const handleDataUpdate = () => {
      console.log('Dashboard received data update event');
      loadData();
    };
    
    window.addEventListener('cms-data-updated', handleDataUpdate);
    return () => window.removeEventListener('cms-data-updated', handleDataUpdate);
  }, []);

  const loadData = () => {
    const cmsThemes = cmsService.getThemes();
    const stats = cmsService.getStatistics();
    
    console.log('Dashboard loading themes:', cmsThemes.length);
    setThemes(cmsThemes);
    setStatistics(stats);
  };

  const handleDeleteTheme = (id: string) => {
    const theme = themes.find(t => t.id === id);
    
    if (theme?.isStatic) {
      alert('Não é possível excluir temas originais do sistema. Você pode duplicá-los para criar versões editáveis.');
      return;
    }
    
    if (window.confirm('Tem certeza que deseja excluir este tema?')) {
      cmsService.deleteTheme(id);
      loadData();
    }
  };

  const handleEditTheme = (theme: Theme) => {
    setEditingTheme(theme);
    setShowThemeForm(true);
  };

  const handleDuplicateTheme = (theme: Theme) => {
    const duplicated = cmsService.duplicateTheme(theme.id);
    if (duplicated) {
      loadData();
      alert(`Tema "${duplicated.name}" criado com sucesso! Agora você pode editá-lo.`);
    }
  };

  const handleCloseThemeForm = () => {
    setShowThemeForm(false);
    setEditingTheme(null);
    loadData();
  };

  const handleRefreshData = () => {
    console.log('Refreshing data manually...');
    loadData();
    window.dispatchEvent(new CustomEvent('cms-data-updated'));
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os dados para o padrão? Esta ação não pode ser desfeita.')) {
      if (cmsService.resetToDefaults()) {
        loadData();
        alert('Dados resetados com sucesso!');
      }
    }
  };

  const handleDownloadBackup = () => {
    try {
      cmsService.downloadBackup();
      alert('Backup iniciado! O download deve começar automaticamente.');
    } catch (error) {
      console.error('Error downloading backup:', error);
      alert('Erro ao gerar backup. Verifique o console para mais detalhes.');
    }
  };

  const handleSaveToProject = async () => {
    setSaveStatus({ type: 'loading', message: 'Preparando dados para salvamento...' });
    
    try {
      const result = await cmsService.saveToProject();
      
      if (result.success) {
        setSaveStatus({ 
          type: 'success', 
          message: `✅ ${result.message} (${result.data?.themes || 0} temas, ${result.data?.glossary || 0} termos, ${result.data?.team || 0} membros)`
        });
        
        // Show additional instructions
        setTimeout(() => {
          alert(`Arquivo baixado com sucesso!\n\nPróximos passos:\n1. Salve o arquivo "cms-export.json" na raiz do projeto\n2. Execute no terminal: npm run cms:save\n3. Execute: npm run lint (para validar)\n4. Faça commit das mudanças no Git`);
        }, 1000);
      } else {
        setSaveStatus({ type: 'error', message: `❌ ${result.message}` });
      }
    } catch (error) {
      setSaveStatus({ type: 'error', message: `❌ Erro inesperado: ${error.message}` });
    }
    
    // Clear status after 10 seconds
    setTimeout(() => {
      setSaveStatus({ type: null, message: '' });
    }, 10000);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result as string;
          if (cmsService.importData(data)) {
            loadData();
            alert('Dados importados com sucesso!');
          } else {
            alert('Erro ao importar dados. Verifique o formato do arquivo.');
          }
        } catch (error) {
          console.error('Import error:', error);
          alert('Erro ao ler o arquivo. Verifique se é um arquivo JSON válido.');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  const sidebarItems = [
    { id: 'dashboard' as CMSSection, label: 'Dashboard', icon: BarChart3 },
    { id: 'themes' as CMSSection, label: 'Temas', icon: BookOpen },
   // { id: 'glossary' as CMSSection, label: 'Glossário', icon: FileText },
   // { id: 'team' as CMSSection, label: 'Equipe', icon: Users },
    { id: 'settings' as CMSSection, label: 'Configurações', icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Development Mode Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-yellow-600 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Modo de Desenvolvimento</h3>
            <p className="text-sm text-yellow-700 mt-1">
              CMS ativo para desenvolvimento. Este painel não estará disponível em produção.
              Acesso direto sem autenticação habilitado.
            </p>
          </div>
        </div>
      </div>

      {/* CMS Write Status */}
      {isCMSWriteEnabled ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <HardDrive className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Salvamento no Projeto Habilitado</h3>
              <p className="text-sm text-green-700 mt-1">
                VITE_ENABLE_CMS_WRITE=true - Você pode salvar alterações como arquivos reais no projeto.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Salvamento no Projeto Desabilitado</h3>
              <p className="text-sm text-blue-700 mt-1">
                Para salvar alterações como arquivos reais, configure VITE_ENABLE_CMS_WRITE=true
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save Status */}
      {saveStatus.type && (
        <div className={`border rounded-xl p-4 ${
          saveStatus.type === 'success' ? 'bg-green-50 border-green-200' :
          saveStatus.type === 'error' ? 'bg-red-50 border-red-200' :
          'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center">
            {saveStatus.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mr-2" />}
            {saveStatus.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 mr-2" />}
            {saveStatus.type === 'loading' && <RefreshCw className="h-5 w-5 text-blue-600 mr-2 animate-spin" />}
            <p className={`text-sm ${
              saveStatus.type === 'success' ? 'text-green-800' :
              saveStatus.type === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {saveStatus.message}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <div className="flex space-x-2">
          {isCMSWriteEnabled && (
            <button
              onClick={handleSaveToProject}
              disabled={saveStatus.type === 'loading'}
              className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar no Projeto
            </button>
          )}
          <button
            onClick={handleDownloadBackup}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Package className="h-4 w-4 mr-2" />
            Backup
          </button>
          <button
            onClick={handleRefreshData}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Temas</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.totalThemes || 0}</p>
            </div>
            <BookOpen className="h-8 w-8 text-amber-600" />
          </div>
         {/*} <div className="mt-2 text-xs text-gray-500">
            {statistics.staticThemes || 0} originais + {statistics.customThemes || 0} personalizados
          </div> */}
        </div> 
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Temas Completos</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.completeThemes || 0}</p>
            </div>
            <Eye className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Desenvolvimento</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.developmentThemes || 0}</p>
            </div>
            <Settings className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Termos no Glossário</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.glossaryTerms || 0}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <button
        onClick={() => {
          setActiveSection('themes');
          setShowThemeForm(true);
        }}
        className="flex-1 flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors"
          >
        <Plus className="h-5 w-5 mr-2 text-gray-500" />
        <span className="text-gray-700">Novo Tema</span>
          </button>
          <button
        onClick={handleDownloadBackup}
        className="flex-1 flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
        <Package className="h-5 w-5 mr-2 text-gray-500" />
        <span className="text-gray-700">Fazer Backup</span>
          </button>
        </div>
      </div>

      {/* Persistent Save Section */}
      {isCMSWriteEnabled && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">💾 Salvamento Persistente</h3>
          <p className="text-purple-800 mb-4">
            Transforme suas alterações do CMS em arquivos reais do projeto. Isso permite versionamento via Git e deploy em produção.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleSaveToProject}
              disabled={saveStatus.type === 'loading'}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveStatus.type === 'loading' ? 'Salvando...' : 'Salvar no Projeto'}
            </button>
            <button
              onClick={() => alert('Instruções:\n1. Clique em "Salvar no Projeto"\n2. Baixe o arquivo cms-export.json\n3. Execute: npm run cms:save\n4. Execute: npm run lint\n5. Faça commit no Git')}
              className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Instruções
            </button>
          </div>
          <div className="mt-4 text-sm text-purple-700">
            <strong>Dados para salvar:</strong> {statistics.customThemes || 0} Temas
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Temas Recentes</h3>
        <div className="space-y-3">
          {themes.slice(0, 5).map((theme) => (
            <div key={theme.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <img src={theme.image} alt={theme.name} className="w-10 h-10 rounded object-cover mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{theme.name}</p>
                  <p className="text-sm text-gray-500">
                    {theme.isStatic ? 'Tema Original' : 'Tema Personalizado'} • {theme.category}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTheme(theme)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                {theme.isStatic && (
                  <button
                    onClick={() => handleDuplicateTheme(theme)}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                    title="Duplicar tema"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThemes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Temas ({themes.length})</h2>
        <div className="flex space-x-2">
          {isCMSWriteEnabled && (
            <button
              onClick={handleSaveToProject}
              disabled={saveStatus.type === 'loading'}
              className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar no Projeto
            </button>
          )}
          <button
            onClick={handleRefreshData}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </button>
          <button
            onClick={() => setShowThemeForm(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Tema
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button className="pb-2 px-1 border-b-2 border-amber-500 text-amber-600 font-medium">
          Todos ({themes.length})
        </button>
        {/*<button className="pb-2 px-1 text-gray-500 hover:text-gray-700">
          Originais ({statistics.staticThemes || 0})
        </button>
        <button className="pb-2 px-1 text-gray-500 hover:text-gray-700">
          Personalizados ({statistics.customThemes || 0})
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div key={theme.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-48 object-cover"
              />
              {theme.isStatic && (
                <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Original
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{theme.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  theme.status === 'complete' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {theme.status === 'complete' ? 'Completo' : 'Desenvolvimento'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{theme.category}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{theme.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                Subtópicos: {theme.subtopics?.length || 0}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTheme(theme)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  {theme.isStatic ? 'Ver' : 'Editar'}
                </button>
                {theme.isStatic ? (
                  <button
                    onClick={() => handleDuplicateTheme(theme)}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                    title="Duplicar para editar"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicar
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteTheme(theme.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {themes.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum tema encontrado</h3>
          <p className="text-gray-600 mb-4">Os temas originais devem ser carregados automaticamente.</p>
          <button
            onClick={handleRefreshData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 mr-2"
          >
            Recarregar Dados
          </button>
          <button
            onClick={() => setShowThemeForm(true)}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700"
          >
            Criar Primeiro Tema
          </button>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações do Sistema</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Modo de Desenvolvimento</h3>
          <p className="text-blue-800 text-sm mb-3">
            O CMS está rodando em modo de desenvolvimento com acesso direto (sem autenticação).
            Em produção, este painel será automaticamente desabilitado.
          </p>
          <div className="text-xs text-blue-700">
            <strong>Variável de ambiente:</strong> VITE_ENABLE_CMS=true
          </div>
        </div>

        {/* CMS Write Status */}
        <div className={`border rounded-lg p-4 ${
          isCMSWriteEnabled ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
        }`}>
          <h3 className={`text-lg font-medium mb-2 ${
            isCMSWriteEnabled ? 'text-green-900' : 'text-orange-900'
          }`}>
            Salvamento no Projeto
          </h3>
          <p className={`text-sm mb-3 ${
            isCMSWriteEnabled ? 'text-green-800' : 'text-orange-800'
          }`}>
            {isCMSWriteEnabled 
              ? 'Habilitado - Você pode salvar alterações como arquivos reais no projeto.'
              : 'Desabilitado - Configure VITE_ENABLE_CMS_WRITE=true para habilitar.'
            }
          </p>
          <div className={`text-xs ${
            isCMSWriteEnabled ? 'text-green-700' : 'text-orange-700'
          }`}>
            <strong>Variável de ambiente:</strong> VITE_ENABLE_CMS_WRITE={isCMSWriteEnabled ? 'true' : 'false'}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Backup e Restauração</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadBackup}
              className="flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Exportar Backup Completo
            </button>
            
            <label className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Upload className="h-5 w-5 mr-2" />
              Importar Dados
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportData}
              />
            </label>
          </div>
          
          {isCMSWriteEnabled && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Salvamento Persistente</h4>
              <p className="text-sm text-purple-800 mb-3">
                Salve suas alterações como arquivos reais no projeto para versionamento e deploy.
              </p>
              <button
                onClick={handleSaveToProject}
                disabled={saveStatus.type === 'loading'}
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveStatus.type === 'loading' ? 'Salvando...' : 'Salvar no Projeto'}
              </button>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Informações do Backup</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Formato:</strong> JSON estruturado com metadados</li>
              <li>• <strong>Conteúdo:</strong> Temas, glossário, equipe e configurações</li>
              <li>• <strong>Nomenclatura:</strong> atlas-cms-backup-YYYY-MM-DD.json</li>
              <li>• <strong>Compatibilidade:</strong> Importação automática com validação</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Manutenção</h3>
          <div className="flex space-x-4">
            <button
              onClick={handleRefreshData}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar Dados
            </button>
            
            <button
              onClick={() => cmsService.debugData()}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Debug Console
            </button>
            
            <button
              onClick={handleResetToDefaults}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar para Padrão
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estatísticas Detalhadas</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Total de Temas:</span> {statistics.totalThemes || 0}
              </div>
              <div>
                <span className="font-medium">Temas Originais:</span> {statistics.staticThemes || 0}
              </div>
              <div>
                <span className="font-medium">Temas Personalizados:</span> {statistics.customThemes || 0}
              </div>
              <div>
                <span className="font-medium">Temas Completos:</span> {statistics.completeThemes || 0}
              </div>
              <div>
                <span className="font-medium">Em Desenvolvimento:</span> {statistics.developmentThemes || 0}
              </div>
              <div>
                <span className="font-medium">Termos no Glossário:</span> {statistics.glossaryTerms || 0}
              </div>
              <div>
                <span className="font-medium">Membros da Equipe:</span> {statistics.teamMembers || 0}
              </div>
              <div>
                <span className="font-medium">Ambiente:</span> {import.meta.env.MODE}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="text-amber-800 font-medium mb-2">⚠️ Aviso Importante</h4>
          <p className="text-amber-700 text-sm">
            Este CMS utiliza LocalStorage para persistência de dados. Em um ambiente de produção real,
            recomenda-se a implementação de um banco de dados dedicado e sistema de autenticação robusto.
            Use a funcionalidade "Salvar no Projeto" para persistência real via arquivos.
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'themes':
        return renderThemes();
      case 'glossary':
        return <CMSGlossaryManager />;
      case 'team':
        return <CMSTeamManager />;
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">CMS Atlas</h1>
          <p className="text-sm text-gray-600">Painel Administrativo</p>
          <div className="mt-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
            Modo Desenvolvimento
          </div>
          {isCMSWriteEnabled && (
            <div className="mt-1 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
              Salvamento Habilitado
            </div>
          )}
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeSection === item.id ? 'bg-amber-50 text-amber-700 border-r-2 border-amber-600' : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Voltar ao Atlas
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>

      {/* Theme Form Modal */}
      {showThemeForm && (
        <CMSThemeForm
          theme={editingTheme}
          onClose={handleCloseThemeForm}
        />
      )}
    </div>
  );
}

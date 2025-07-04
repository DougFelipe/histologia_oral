import { Theme, GlossaryTerm, TeamMember, CMSData } from '../types';
import { themes as staticThemes, glossaryTerms as staticGlossaryTerms, teamMembers as staticTeamMembers } from '../data/themes';

const CMS_STORAGE_KEY = 'atlas-cms-data';

// Simplified initial data without authentication
const initialCMSData: CMSData = {
  themes: [],
  glossaryTerms: [],
  teamMembers: [],
  users: [] // Keep for future use but not required
};

class CMSService {
  private data: CMSData;

  constructor() {
    this.data = this.loadData();
    this.initializeWithStaticData();
  }

  private loadData(): CMSData {
    const stored = localStorage.getItem(CMS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error loading CMS data:', error);
      }
    }
    return initialCMSData;
  }

  private initializeWithStaticData(): void {
    // Check if we need to initialize with static data
    const hasInitialized = localStorage.getItem('cms-initialized');
    
    if (!hasInitialized) {
      console.log('Initializing CMS with static data...');
      
      // Convert static themes to CMS format with editable flag
      const cmsThemes = staticThemes.map(theme => ({
        ...theme,
        id: `static-${theme.id}`,
        isStatic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      // Add static data to CMS
      this.data.themes = [...this.data.themes, ...cmsThemes];
      this.data.glossaryTerms = [...this.data.glossaryTerms, ...staticGlossaryTerms];
      this.data.teamMembers = [...this.data.teamMembers, ...staticTeamMembers];
      
      this.saveData();
      localStorage.setItem('cms-initialized', 'true');
      
      console.log('CMS initialized with static data:', {
        themes: this.data.themes.length,
        glossary: this.data.glossaryTerms.length,
        team: this.data.teamMembers.length
      });
    }
  }

  private saveData(): void {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(this.data));
    window.dispatchEvent(new CustomEvent('cms-data-updated', { 
      detail: { 
        themes: this.data.themes,
        glossaryTerms: this.data.glossaryTerms,
        teamMembers: this.data.teamMembers,
        timestamp: new Date().toISOString()
      }
    }));
  }

  // Simplified authentication - no longer required
  isAuthenticated(): boolean {
    // Always return true in development mode when CMS is enabled
    return import.meta.env.VITE_ENABLE_CMS === 'true';
  }

  logout(): void {
    // No-op since no authentication is required
    console.log('CMS logout - no authentication required in development mode');
  }

  getCurrentUser(): any {
    // Return mock user for compatibility
    return {
      userId: 'dev-user',
      username: 'developer',
      role: 'admin',
      loginTime: new Date().toISOString()
    };
  }

  // Theme management
  getThemes(): Theme[] {
    this.data = this.loadData();
    return this.data.themes;
  }

  getAllThemes(): Theme[] {
    // Return both static and CMS themes for the main site
    const cmsThemes = this.getThemes();
    return cmsThemes;
  }

  createTheme(theme: Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>): Theme {
    const newTheme: Theme = {
      ...theme,
      id: `cms-theme-${Date.now()}`,
      isStatic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Ensure subtopics have proper structure
    if (newTheme.subtopics) {
      newTheme.subtopics = newTheme.subtopics.map(subtopic => ({
        ...subtopic,
        id: subtopic.id || `subtopic-${Date.now()}-${Math.random()}`,
        structures: subtopic.structures || []
      }));
    }
    
    this.data.themes.push(newTheme);
    this.saveData();
    
    console.log('Theme created:', newTheme);
    return newTheme;
  }

  updateTheme(id: string, updates: Partial<Theme>): Theme | null {
    const index = this.data.themes.findIndex(t => t.id === id);
    if (index !== -1) {
      // Don't allow editing static themes structure, only status and basic info
      const isStatic = this.data.themes[index].isStatic;
      
      if (isStatic) {
        // Only allow certain fields to be updated for static themes
        const allowedUpdates = {
          status: updates.status,
          description: updates.description,
          updatedAt: new Date().toISOString()
        };
        this.data.themes[index] = {
          ...this.data.themes[index],
          ...allowedUpdates
        };
      } else {
        this.data.themes[index] = {
          ...this.data.themes[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      
      this.saveData();
      return this.data.themes[index];
    }
    return null;
  }

  deleteTheme(id: string): boolean {
    const theme = this.data.themes.find(t => t.id === id);
    
    // Prevent deletion of static themes
    if (theme?.isStatic) {
      console.warn('Cannot delete static theme:', id);
      return false;
    }
    
    const index = this.data.themes.findIndex(t => t.id === id);
    if (index !== -1) {
      this.data.themes.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  duplicateTheme(id: string): Theme | null {
    const originalTheme = this.data.themes.find(t => t.id === id);
    if (originalTheme) {
      const duplicatedTheme = {
        ...originalTheme,
        id: `cms-theme-${Date.now()}`,
        name: `${originalTheme.name} (Cópia)`,
        isStatic: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.data.themes.push(duplicatedTheme);
      this.saveData();
      return duplicatedTheme;
    }
    return null;
  }

  // Glossary management
  getGlossaryTerms(): GlossaryTerm[] {
    this.data = this.loadData();
    return this.data.glossaryTerms;
  }

  createGlossaryTerm(term: GlossaryTerm): GlossaryTerm {
    this.data.glossaryTerms.push(term);
    this.saveData();
    return term;
  }

  updateGlossaryTerm(index: number, term: GlossaryTerm): GlossaryTerm | null {
    if (index >= 0 && index < this.data.glossaryTerms.length) {
      this.data.glossaryTerms[index] = term;
      this.saveData();
      return term;
    }
    return null;
  }

  deleteGlossaryTerm(index: number): boolean {
    if (index >= 0 && index < this.data.glossaryTerms.length) {
      this.data.glossaryTerms.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Team management
  getTeamMembers(): TeamMember[] {
    this.data = this.loadData();
    return this.data.teamMembers;
  }

  createTeamMember(member: TeamMember): TeamMember {
    this.data.teamMembers.push(member);
    this.saveData();
    return member;
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
    const index = this.data.teamMembers.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.teamMembers[index] = { ...this.data.teamMembers[index], ...updates };
      this.saveData();
      return this.data.teamMembers[index];
    }
    return null;
  }

  deleteTeamMember(id: string): boolean {
    const index = this.data.teamMembers.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.teamMembers.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  // Statistics
  getStatistics() {
    const themes = this.getThemes();
    const completeThemes = themes.filter(t => t.status === 'complete');
    const developmentThemes = themes.filter(t => t.status === 'development');
    const staticThemes = themes.filter(t => t.isStatic);
    const customThemes = themes.filter(t => !t.isStatic);

    return {
      totalThemes: themes.length,
      completeThemes: completeThemes.length,
      developmentThemes: developmentThemes.length,
      staticThemes: staticThemes.length,
      customThemes: customThemes.length,
      glossaryTerms: this.data.glossaryTerms.length,
      teamMembers: this.data.teamMembers.length
    };
  }

  // Image upload simulation
  uploadImage(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // Bulk operations
  resetToDefaults(): boolean {
    try {
      localStorage.removeItem(CMS_STORAGE_KEY);
      localStorage.removeItem('cms-initialized');
      this.data = initialCMSData;
      this.initializeWithStaticData();
      return true;
    } catch (error) {
      console.error('Error resetting to defaults:', error);
      return false;
    }
  }

  // NEW: Save to project functionality
  async saveToProject(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      // Check if CMS write is enabled
      const writeEnabled = import.meta.env.VITE_ENABLE_CMS_WRITE === 'true';
      if (!writeEnabled) {
        return {
          success: false,
          message: 'Salvamento no projeto não está habilitado. Configure VITE_ENABLE_CMS_WRITE=true'
        };
      }

      // Validate data before saving
      const validation = this.validateDataForSave();
      if (!validation.valid) {
        return {
          success: false,
          message: `Dados inválidos: ${validation.errors.join(', ')}`
        };
      }

      // Prepare data for export
      const exportData = this.prepareDataForProject();
      
      // Create a downloadable file for the user to save as cms-export.json
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cms-export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return {
        success: true,
        message: 'Arquivo cms-export.json baixado! Execute "npm run cms:save" no terminal para sincronizar com o projeto.',
        data: {
          themes: exportData.themes.filter(t => !t.isStatic).length,
          glossary: exportData.glossaryTerms.length,
          team: exportData.teamMembers.length
        }
      };
    } catch (error) {
      console.error('Error saving to project:', error);
      return {
        success: false,
        message: `Erro ao salvar: ${error.message}`
      };
    }
  }

  private validateDataForSave(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Validate themes
    const customThemes = this.data.themes.filter(t => !t.isStatic);
    customThemes.forEach(theme => {
      if (!theme.name || !theme.description) {
        errors.push(`Tema "${theme.id}" está incompleto (nome ou descrição ausente)`);
      }
      
      if (!theme.subtopics || theme.subtopics.length === 0) {
        errors.push(`Tema "${theme.name}" não possui subtópicos`);
      }
      
      theme.subtopics?.forEach((subtopic, index) => {
        if (!subtopic.title || !subtopic.content) {
          errors.push(`Subtópico ${index + 1} do tema "${theme.name}" está incompleto`);
        }
      });
    });

    // Validate required fields
    if (customThemes.length === 0) {
      errors.push('Nenhum tema personalizado para salvar');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private prepareDataForProject(): CMSData {
    return {
      metadata: {
        version: '1.0',
        exportDate: new Date().toISOString(),
        generator: 'Atlas Virtual CMS',
        totalThemes: this.data.themes.length,
        customThemes: this.data.themes.filter(t => !t.isStatic).length
      },
      themes: this.data.themes,
      glossaryTerms: this.data.glossaryTerms,
      teamMembers: this.data.teamMembers,
      users: []
    };
  }

  // Advanced backup system
  exportDataAsZip(): Promise<Blob> {
    return new Promise((resolve) => {
      const timestamp = new Date().toISOString().split('T')[0];
      const metadata = {
        version: "1.0",
        exportDate: new Date().toISOString(),
        totalThemes: this.data.themes.length,
        totalGlossary: this.data.glossaryTerms.length,
        totalTeam: this.data.teamMembers.length,
        generator: "Atlas Virtual CMS"
      };

      // Create structured data
      const exportData = {
        metadata,
        themes: this.data.themes,
        glossaryTerms: this.data.glossaryTerms,
        teamMembers: this.data.teamMembers
      };

      // For now, create a JSON blob (in a real implementation, this would be a ZIP)
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      resolve(blob);
    });
  }

  downloadBackup(): void {
    this.exportDataAsZip().then(blob => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `atlas-cms-backup-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Export/Import functionality
  exportData(): string {
    const metadata = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      totalThemes: this.data.themes.length,
      totalGlossary: this.data.glossaryTerms.length,
      totalTeam: this.data.teamMembers.length
    };

    return JSON.stringify({
      metadata,
      ...this.data
    }, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const importedData = JSON.parse(jsonData);
      
      // Validate structure
      if (importedData.themes && importedData.glossaryTerms && importedData.teamMembers) {
        // Preserve metadata if present
        const { metadata, ...dataToImport } = importedData;
        
        this.data = { ...this.data, ...dataToImport };
        this.saveData();
        
        console.log('Data imported successfully:', {
          metadata,
          themes: this.data.themes.length,
          glossary: this.data.glossaryTerms.length,
          team: this.data.teamMembers.length
        });
        
        return true;
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
    return false;
  }

  // Debug method
  debugData(): void {
    console.log('=== CMS Debug Information ===');
    console.log('CMS Data:', this.data);
    console.log('Statistics:', this.getStatistics());
    console.log('LocalStorage data:', localStorage.getItem(CMS_STORAGE_KEY));
    console.log('CMS Enabled:', import.meta.env.VITE_ENABLE_CMS);
    console.log('CMS Write Enabled:', import.meta.env.VITE_ENABLE_CMS_WRITE);
    console.log('Initialized:', localStorage.getItem('cms-initialized'));
    console.log('Environment:', import.meta.env.MODE);
    console.log('==============================');
  }
}

export const cmsService = new CMSService();
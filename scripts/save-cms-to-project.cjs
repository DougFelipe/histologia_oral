const fs = require('fs');
const path = require('path');

/**
 * Script para salvar dados do CMS como arquivos reais no projeto
 * Uso: npm run cms:save
 */

class CMSProjectSaver {
  constructor() {
    this.projectRoot = process.cwd();
    this.themesDir = path.join(this.projectRoot, 'src', 'themes');
    this.dataDir = path.join(this.projectRoot, 'src', 'data');
    this.cmsDataFile = path.join(this.projectRoot, 'cms-export.json');
  }

  async saveCMSToProject() {
    try {
      console.log('🚀 Iniciando sincronização CMS → Projeto...');
      
      // Verificar se arquivo de export existe
      if (!fs.existsSync(this.cmsDataFile)) {
        console.error('❌ Arquivo cms-export.json não encontrado!');
        console.log('💡 Execute o export do CMS primeiro:');
        console.log('   1. Acesse o CMS');
        console.log('   2. Vá em Configurações');
        console.log('   3. Clique em "Exportar Backup"');
        console.log('   4. Salve como "cms-export.json" na raiz do projeto');
        return false;
      }

      // Carregar dados do CMS
      const cmsData = JSON.parse(fs.readFileSync(this.cmsDataFile, 'utf8'));
      console.log('📊 Dados do CMS carregados:', {
        themes: cmsData.themes?.length || 0,
        glossary: cmsData.glossaryTerms?.length || 0,
        team: cmsData.teamMembers?.length || 0
      });

      // Processar temas personalizados
      const customThemes = cmsData.themes?.filter(theme => !theme.isStatic) || [];
      console.log(`📝 Processando ${customThemes.length} temas personalizados...`);

      for (const theme of customThemes) {
        await this.saveThemeToProject(theme);
      }

      // Atualizar arquivos centrais
      await this.updateGlossaryFile(cmsData.glossaryTerms || []);
      await this.updateTeamFile(cmsData.teamMembers || []);
      await this.updateThemesIndex(customThemes);

      console.log('✅ Sincronização concluída com sucesso!');
      console.log('📁 Arquivos criados/atualizados:');
      customThemes.forEach(theme => {
        console.log(`   - src/themes/${this.sanitizeId(theme.id)}/data.ts`);
      });
      console.log('   - src/data/themes.ts (atualizado)');
      console.log('   - src/data/glossary.ts (atualizado)');
      console.log('   - src/data/team.ts (atualizado)');

      // Limpar arquivo temporário
      fs.unlinkSync(this.cmsDataFile);
      console.log('🧹 Arquivo temporário removido');

      return true;
    } catch (error) {
      console.error('❌ Erro durante a sincronização:', error.message);
      return false;
    }
  }

  async saveThemeToProject(theme) {
    const sanitizedId = this.sanitizeId(theme.id);
    const themeDir = path.join(this.themesDir, sanitizedId);
    
    // Criar diretório do tema
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
      console.log(`📁 Diretório criado: ${sanitizedId}/`);
    }

    // Limpar dados do tema (remover campos específicos do CMS)
    const cleanTheme = {
      id: sanitizedId,
      name: theme.name,
      status: theme.status,
      image: theme.image,
      description: theme.description,
      category: theme.category,
      subtopics: theme.subtopics?.map(subtopic => ({
        id: subtopic.id,
        title: subtopic.title,
        content: subtopic.content,
        image: subtopic.image,
        structures: subtopic.structures?.map(structure => ({
          id: structure.id,
          name: structure.name,
          description: structure.description,
          function: structure.function,
          x: structure.x,
          y: structure.y
        })) || []
      })) || []
    };

    // Gerar conteúdo do arquivo
    const fileContent = this.generateThemeFileContent(cleanTheme);
    const filePath = path.join(themeDir, 'data.ts');
    
    fs.writeFileSync(filePath, fileContent);
    console.log(`✅ Tema salvo: ${sanitizedId}`);
  }

  generateThemeFileContent(theme) {
    return `import { Theme } from '../../types';

export const ${this.toCamelCase(theme.id)}Theme: Theme = ${JSON.stringify(theme, null, 2)};
`;
  }

  async updateThemesIndex(customThemes) {
    const indexPath = path.join(this.dataDir, 'themes.ts');
    
    // Ler arquivo atual
    let currentContent = '';
    if (fs.existsSync(indexPath)) {
      currentContent = fs.readFileSync(indexPath, 'utf8');
    }

    // Gerar imports para temas personalizados
    const customImports = customThemes.map(theme => {
      const sanitizedId = this.sanitizeId(theme.id);
      const camelCaseId = this.toCamelCase(sanitizedId);
      return `import { ${camelCaseId}Theme } from '../themes/${sanitizedId}/data';`;
    }).join('\n');

    // Gerar array de temas implementados
    const existingThemes = ['palatoTheme', 'linguaTheme', 'cementoTheme'];
    const customThemeNames = customThemes.map(theme => 
      this.toCamelCase(this.sanitizeId(theme.id)) + 'Theme'
    );
    const allThemes = [...existingThemes, ...customThemeNames];

    const newContent = `import { Theme, GlossaryTerm, TeamMember } from '../types';
import { palatoTheme } from '../themes/palato/data';
import { linguaTheme } from '../themes/lingua/data';
import { cementoTheme } from '../themes/cemento/data';
${customImports}

// Temas completos implementados
const implementedThemes = [${allThemes.join(', ')}];

// Temas em desenvolvimento (placeholders)
const developmentThemes: Theme[] = [
  {
    id: 'gengiva',
    name: 'Gengiva',
    status: 'development',
    image: 'https://images.pexels.com/photos/4386322/pexels-photo-4386322.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Tecido gengival queratinizado com características específicas de proteção.',
    category: 'Tecido Mole',
    subtopics: []
  },
  // ... outros temas em desenvolvimento
];

export const themes: Theme[] = [...implementedThemes, ...developmentThemes];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Epitélio Estratificado',
    definition: 'Epitélio composto por múltiplas camadas celulares sobrepostas, conferindo proteção mecânica contra agressões externas.',
    category: 'Tecidos Básicos'
  },
  // ... outros termos
];

export const teamMembers: TeamMember[] = [
  {
    id: 'dr-silva',
    name: 'Dr. Carlos Eduardo Silva',
    photo: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
    formation: 'PhD em Histologia e Embriologia - USP',
    contribution: 'Coordenação geral do projeto e desenvolvimento do conteúdo científico dos temas de tecidos moles.',
    specialization: 'Histologia Oral e Patologia'
  },
  // ... outros membros
];
`;

    fs.writeFileSync(indexPath, newContent);
    console.log('✅ Arquivo themes.ts atualizado');
  }

  async updateGlossaryFile(glossaryTerms) {
    const glossaryPath = path.join(this.dataDir, 'glossary.ts');
    
    const content = `import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = ${JSON.stringify(glossaryTerms, null, 2)};
`;

    fs.writeFileSync(glossaryPath, content);
    console.log('✅ Arquivo glossary.ts atualizado');
  }

  async updateTeamFile(teamMembers) {
    const teamPath = path.join(this.dataDir, 'team.ts');
    
    const content = `import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = ${JSON.stringify(teamMembers, null, 2)};
`;

    fs.writeFileSync(teamPath, content);
    console.log('✅ Arquivo team.ts atualizado');
  }

  sanitizeId(id) {
    // Remove prefixos do CMS e sanitiza o ID
    return id.replace(/^(cms-theme-|static-)/g, '')
             .toLowerCase()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-+/g, '-')
             .replace(/^-|-$/g, '');
  }

  toCamelCase(str) {
    const sanitized = str.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
    const camel = sanitized.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
    return /^[a-zA-Z]/.test(camel) ? camel : 'theme' + camel;
  }

}

// Executar se chamado diretamente
if (require.main === module) {
  const saver = new CMSProjectSaver();
  saver.saveCMSToProject().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = CMSProjectSaver;

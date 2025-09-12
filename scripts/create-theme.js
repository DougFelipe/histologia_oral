#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para criar estrutura de novo tema
 * Uso: node create-theme.js [nome-do-tema] [categoria] [descricao]
 * 
 * Exemplo: node create-theme.js "osso-alveolar" "Tecido Duro" "Tecido ósseo especializado"
 */

class ThemeCreator {
  constructor() {
    this.projectRoot = process.cwd();
    this.themesDir = path.join(this.projectRoot, 'src', 'themes');
  }

  async createTheme(themeName, category = 'Tecido Mole', description = '') {
    try {
      console.log(`🚀 Criando novo tema: ${themeName}`);
      
      // Sanitizar nome do tema para ID
      const themeId = this.sanitizeThemeId(themeName);
      const themeDir = path.join(this.themesDir, themeId);
      
      // Verificar se tema já existe
      if (fs.existsSync(themeDir)) {
        console.error(`❌ Tema '${themeId}' já existe!`);
        return false;
      }

      // Criar estrutura de diretórios
      this.createDirectoryStructure(themeDir);
      
      // Criar arquivos do tema
      this.createDataFile(themeDir, themeId, themeName, category, description);
      this.createReadmeFile(themeDir, themeName, themeId);
      this.createImagePlaceholders(themeDir, themeId);
      
      // Atualizar arquivo principal de temas
      this.updateMainThemesFile(themeId, themeName);
      
      console.log('✅ Tema criado com sucesso!');
      console.log(`📁 Diretório: src/themes/${themeId}/`);
      console.log('📝 Próximos passos:');
      console.log('   1. Adicione as imagens na pasta images/');
      console.log('   2. Atualize os imports no arquivo data.ts');
      console.log('   3. Ajuste as coordenadas das estruturas');
      console.log('   4. Execute: npm run cms:validate');
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao criar tema:', error.message);
      return false;
    }
  }

  sanitizeThemeId(themeName) {
    return themeName
      .toLowerCase()
      .replace(/[áàâãä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  createDirectoryStructure(themeDir) {
    fs.mkdirSync(themeDir, { recursive: true });
    fs.mkdirSync(path.join(themeDir, 'images'), { recursive: true });
  }

  createDataFile(themeDir, themeId, themeName, category, description) {
    const template = this.generateDataTemplate(themeId, themeName, category, description);
    fs.writeFileSync(path.join(themeDir, 'data.ts'), template);
  }

  generateDataTemplate(themeId, themeName, category, description) {
    const capitalizedId = themeId.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^([a-z])/, (g) => g.toUpperCase());
    
    return `import { Theme } from '../../types';

// Imports das imagens locais - Adicione suas imagens na pasta images/
// Por enquanto, usando o logo como placeholder
import logo from '../../data/LOGO.png';

// Quando você tiver as imagens reais, descomente e ajuste estas linhas:
// import ${themeId.replace(/-/g, '')}PrincipalImg from './images/${themeId}-principal.jpg';
// import subtopico1Img from './images/${themeId}-subtopico-1.jpg';
// import subtopico2Img from './images/${themeId}-subtopico-2.jpg';

export const ${themeId.replace(/-/g, '')}Theme: Theme = {
  id: '${themeId}',
  name: '${themeName}',
  status: 'complete',
  image: logo, // Substitua pela imagem principal quando disponível
  description: '${description || `Estruturas histológicas de ${themeName.toLowerCase()} com características específicas.`}',
  category: '${category}',
  subtopics: [
    {
      id: '${themeId}-subtopico-1',
      title: 'Primeiro Subtópico',
      content: 'Descrição detalhada do primeiro subtópico de ${themeName.toLowerCase()}. Substitua este texto pelo conteúdo real do subtópico, incluindo características histológicas, funções e relevância clínica.',
      image: logo, // Substitua por: subtopico1Img
      structures: [
        {
          id: 'estrutura-1',
          name: 'Primeira Estrutura',
          description: 'Descrição da primeira estrutura histológica',
          function: 'Função biológica da estrutura',
          x: 30,
          y: 40
        },
        {
          id: 'estrutura-2',
          name: 'Segunda Estrutura',
          description: 'Descrição da segunda estrutura histológica',
          function: 'Função biológica da estrutura',
          x: 60,
          y: 70
        }
      ]
    },
    {
      id: '${themeId}-subtopico-2',
      title: 'Segundo Subtópico',
      content: 'Descrição detalhada do segundo subtópico de ${themeName.toLowerCase()}. Adicione informações específicas sobre as características microscópicas e sua importância funcional.',
      image: logo, // Substitua por: subtopico2Img
      structures: [
        {
          id: 'estrutura-3',
          name: 'Terceira Estrutura',
          description: 'Descrição da terceira estrutura histológica',
          function: 'Função biológica da estrutura',
          x: 45,
          y: 35
        }
      ]
    }
  ]
};
`;
  }

  createReadmeFile(themeDir, themeName, themeId) {
    const template = `# Tema: ${themeName}

## Estrutura de Arquivos

Este diretório contém os dados e imagens do tema ${themeName}.

### Organização das Imagens

- \`${themeId}-principal.jpg\` - Imagem principal do tema
- \`${themeId}-subtopico-1.jpg\` - Primeiro subtópico
- \`${themeId}-subtopico-2.jpg\` - Segundo subtópico

### Coordenadas das Estruturas

As coordenadas X,Y são definidas em porcentagem (0-100%) relativas ao canto superior esquerdo da imagem.

### Padrões de Nomenclatura

\`\`\`
${themeId}-[subtopico]-[resolucao].[extensao]
\`\`\`

### Resoluções Recomendadas

- Imagem principal: 1920x1080px (16:9)
- Subtópicos: 1200x800px (3:2)
- Detalhes: 800x600px (4:3)

### Lista de Tarefas

- [ ] Adicionar imagem principal
- [ ] Adicionar imagens dos subtópicos
- [ ] Definir coordenadas das estruturas
- [ ] Revisar conteúdo textual
- [ ] Testar renderização
- [ ] Validar com \`npm run cms:validate\`
`;

    fs.writeFileSync(path.join(themeDir, 'README.md'), template);
  }

  createImagePlaceholders(themeDir, themeId) {
    const imagesDir = path.join(themeDir, 'images');
    const placeholderFiles = [
      `${themeId}-principal.jpg`,
      `${themeId}-subtopico-1.jpg`,
      `${themeId}-subtopico-2.jpg`
    ];

    // Criar arquivo .gitkeep para manter a pasta no git
    fs.writeFileSync(path.join(imagesDir, '.gitkeep'), '# Pasta para imagens do tema\n\nAdicione aqui as imagens do tema seguindo o padrão de nomenclatura.');
    
    // Criar arquivo com lista de imagens esperadas
    const imagesList = placeholderFiles.join('\\n');
    fs.writeFileSync(path.join(imagesDir, 'IMAGES_NEEDED.txt'), `Imagens necessárias para este tema:\\n\\n${imagesList}\\n\\nFormatos aceitos: JPG, PNG, WebP\\nResolução mínima: 800x600px`);
  }

  updateMainThemesFile(themeId, themeName) {
    const themesFilePath = path.join(this.projectRoot, 'src', 'data', 'themes.ts');
    
    if (!fs.existsSync(themesFilePath)) {
      console.warn('⚠️  Arquivo themes.ts não encontrado. Atualize manualmente.');
      return;
    }

    const content = fs.readFileSync(themesFilePath, 'utf8');
    const variableName = `${themeId.replace(/-/g, '')}Theme`;
    
    // Adicionar import
    const importLine = `import { ${variableName} } from '../themes/${themeId}/data';`;
    const importRegex = /(import.*from.*themes.*data.*?;)/s;
    const lastImport = content.match(importRegex);
    
    if (lastImport) {
      const updatedContent = content.replace(
        lastImport[0], 
        lastImport[0] + '\\n' + importLine
      );
      
      // Adicionar ao array de temas implementados
      const implementedThemesRegex = /(const implementedThemes = \\[)(.*?)(\\];)/s;
      const finalContent = updatedContent.replace(
        implementedThemesRegex,
        `$1$2, ${variableName}$3`
      );
      
      fs.writeFileSync(themesFilePath, finalContent);
      console.log('✅ Arquivo themes.ts atualizado');
    } else {
      console.warn('⚠️  Não foi possível atualizar themes.ts automaticamente. Adicione manualmente:');
      console.log(`   Import: ${importLine}`);
      console.log(`   Array: adicione ${variableName} em implementedThemes`);
    }
  }
}

// Executar script se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node create-theme.js [nome-do-tema] [categoria] [descricao]');
    console.log('');
    console.log('Exemplos:');
    console.log('  node create-theme.js "Osso Alveolar"');
    console.log('  node create-theme.js "Dentina" "Tecido Duro" "Tecido mineralizado do dente"');
    process.exit(1);
  }

  const [themeName, category, description] = args;
  const creator = new ThemeCreator();
  
  creator.createTheme(themeName, category, description)
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Erro fatal:', error);
      process.exit(1);
    });
}

module.exports = ThemeCreator;

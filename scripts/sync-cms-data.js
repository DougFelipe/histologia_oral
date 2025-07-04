const fs = require('fs');
const path = require('path');

/**
 * Script para sincronizar dados entre CMS e projeto
 * Uso: npm run cms:sync
 */

class CMSDataSync {
  constructor() {
    this.projectRoot = process.cwd();
    this.dataDir = path.join(this.projectRoot, 'src', 'data');
    this.themesDir = path.join(this.projectRoot, 'src', 'themes');
  }

  async syncData() {
    console.log('🔄 Iniciando sincronização de dados...');
    
    try {
      // Verificar estrutura de diretórios
      this.ensureDirectoryStructure();
      
      // Validar arquivos existentes
      const validation = this.validateProjectStructure();
      if (!validation.valid) {
        console.error('❌ Estrutura do projeto inválida:', validation.errors);
        return false;
      }

      console.log('✅ Estrutura do projeto validada');
      console.log('📊 Estatísticas:');
      console.log(`   - Temas estáticos: ${validation.stats.staticThemes}`);
      console.log(`   - Temas personalizados: ${validation.stats.customThemes}`);
      console.log(`   - Total de arquivos: ${validation.stats.totalFiles}`);

      return true;
    } catch (error) {
      console.error('❌ Erro durante sincronização:', error.message);
      return false;
    }
  }

  ensureDirectoryStructure() {
    const dirs = [
      this.dataDir,
      this.themesDir,
      path.join(this.projectRoot, 'scripts')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Diretório criado: ${path.relative(this.projectRoot, dir)}`);
      }
    });
  }

  validateProjectStructure() {
    const errors = [];
    const stats = {
      staticThemes: 0,
      customThemes: 0,
      totalFiles: 0
    };

    // Verificar arquivos essenciais
    const essentialFiles = [
      'src/types/index.ts',
      'src/data/themes.ts'
    ];

    essentialFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (!fs.existsSync(filePath)) {
        errors.push(`Arquivo essencial não encontrado: ${file}`);
      } else {
        stats.totalFiles++;
      }
    });

    // Verificar temas estáticos
    const staticThemes = ['palato', 'lingua', 'cemento'];
    staticThemes.forEach(theme => {
      const themePath = path.join(this.themesDir, theme, 'data.ts');
      if (fs.existsSync(themePath)) {
        stats.staticThemes++;
        stats.totalFiles++;
      } else {
        errors.push(`Tema estático não encontrado: ${theme}`);
      }
    });

    // Contar temas personalizados
    if (fs.existsSync(this.themesDir)) {
      const themeDirs = fs.readdirSync(this.themesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      themeDirs.forEach(dir => {
        if (!staticThemes.includes(dir)) {
          const dataFile = path.join(this.themesDir, dir, 'data.ts');
          if (fs.existsSync(dataFile)) {
            stats.customThemes++;
            stats.totalFiles++;
          }
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      stats
    };
  }

  generateProjectReport() {
    const report = {
      timestamp: new Date().toISOString(),
      structure: this.validateProjectStructure(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        cwd: process.cwd()
      }
    };

    const reportPath = path.join(this.projectRoot, 'cms-project-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('📋 Relatório gerado:', reportPath);
    return report;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const sync = new CMSDataSync();
  sync.syncData().then(success => {
    if (success) {
      sync.generateProjectReport();
    }
    process.exit(success ? 0 : 1);
  });
}

module.exports = CMSDataSync;
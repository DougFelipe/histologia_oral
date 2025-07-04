const fs = require('fs');
const path = require('path');

/**
 * Script para validar dados do CMS e estrutura do projeto
 * Uso: npm run cms:validate
 */

class CMSDataValidator {
  constructor() {
    this.projectRoot = process.cwd();
    this.errors = [];
    this.warnings = [];
  }

  async validate() {
    console.log('🔍 Iniciando validação de dados do CMS...');
    
    try {
      this.validateTypeDefinitions();
      this.validateThemeStructure();
      this.validateDataIntegrity();
      this.validateFileNaming();
      
      this.printResults();
      
      return this.errors.length === 0;
    } catch (error) {
      console.error('❌ Erro durante validação:', error.message);
      return false;
    }
  }

  validateTypeDefinitions() {
    const typesFile = path.join(this.projectRoot, 'src', 'types', 'index.ts');
    
    if (!fs.existsSync(typesFile)) {
      this.errors.push('Arquivo de tipos não encontrado: src/types/index.ts');
      return;
    }

    const content = fs.readFileSync(typesFile, 'utf8');
    const requiredTypes = ['Theme', 'Subtopic', 'Structure', 'GlossaryTerm', 'TeamMember'];
    
    requiredTypes.forEach(type => {
      if (!content.includes(`interface ${type}`) && !content.includes(`type ${type}`)) {
        this.errors.push(`Tipo obrigatório não encontrado: ${type}`);
      }
    });
  }

  validateThemeStructure() {
    const themesDir = path.join(this.projectRoot, 'src', 'themes');
    
    if (!fs.existsSync(themesDir)) {
      this.errors.push('Diretório de temas não encontrado: src/themes');
      return;
    }

    const themeDirs = fs.readdirSync(themesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    themeDirs.forEach(themeDir => {
      const dataFile = path.join(themesDir, themeDir, 'data.ts');
      
      if (!fs.existsSync(dataFile)) {
        this.errors.push(`Arquivo de dados não encontrado: ${themeDir}/data.ts`);
        return;
      }

      try {
        const content = fs.readFileSync(dataFile, 'utf8');
        
        // Verificar estrutura básica
        if (!content.includes('export const') || !content.includes('Theme')) {
          this.errors.push(`Estrutura inválida em: ${themeDir}/data.ts`);
        }

        // Verificar import de tipos
        if (!content.includes("import { Theme }")) {
          this.warnings.push(`Import de tipos ausente em: ${themeDir}/data.ts`);
        }

      } catch (error) {
        this.errors.push(`Erro ao ler arquivo: ${themeDir}/data.ts - ${error.message}`);
      }
    });
  }

  validateDataIntegrity() {
    const dataFile = path.join(this.projectRoot, 'src', 'data', 'themes.ts');
    
    if (!fs.existsSync(dataFile)) {
      this.errors.push('Arquivo principal de dados não encontrado: src/data/themes.ts');
      return;
    }

    try {
      const content = fs.readFileSync(dataFile, 'utf8');
      
      // Verificar exports obrigatórios
      const requiredExports = ['themes', 'glossaryTerms', 'teamMembers'];
      requiredExports.forEach(exportName => {
        if (!content.includes(`export const ${exportName}`)) {
          this.errors.push(`Export obrigatório não encontrado: ${exportName}`);
        }
      });

      // Verificar imports de temas
      const staticThemes = ['palatoTheme', 'linguaTheme', 'cementoTheme'];
      staticThemes.forEach(theme => {
        if (!content.includes(theme)) {
          this.warnings.push(`Tema estático não importado: ${theme}`);
        }
      });

    } catch (error) {
      this.errors.push(`Erro ao validar dados: ${error.message}`);
    }
  }

  validateFileNaming() {
    const themesDir = path.join(this.projectRoot, 'src', 'themes');
    
    if (!fs.existsSync(themesDir)) return;

    const themeDirs = fs.readdirSync(themesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    themeDirs.forEach(dir => {
      // Verificar convenção de nomenclatura
      if (!/^[a-z0-9-]+$/.test(dir)) {
        this.warnings.push(`Nome de diretório não segue convenção: ${dir} (use apenas letras minúsculas, números e hífens)`);
      }

      // Verificar se nome é muito longo
      if (dir.length > 50) {
        this.warnings.push(`Nome de diretório muito longo: ${dir}`);
      }
    });
  }

  printResults() {
    console.log('\n📊 Resultados da Validação:');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ Todos os dados estão válidos!');
      return;
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ Erros encontrados (${this.errors.length}):`);
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Avisos (${this.warnings.length}):`);
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`);
      });
    }

    console.log('\n💡 Recomendações:');
    if (this.errors.length > 0) {
      console.log('   - Corrija os erros antes de fazer deploy');
      console.log('   - Execute npm run lint para verificar sintaxe');
    }
    if (this.warnings.length > 0) {
      console.log('   - Considere corrigir os avisos para melhor manutenibilidade');
    }
  }

  generateValidationReport() {
    const report = {
      timestamp: new Date().toISOString(),
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        totalErrors: this.errors.length,
        totalWarnings: this.warnings.length,
        status: this.errors.length === 0 ? 'VALID' : 'INVALID'
      }
    };

    const reportPath = path.join(this.projectRoot, 'cms-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📋 Relatório de validação salvo: ${reportPath}`);
    return report;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const validator = new CMSDataValidator();
  validator.validate().then(success => {
    validator.generateValidationReport();
    process.exit(success ? 0 : 1);
  });
}

module.exports = CMSDataValidator;
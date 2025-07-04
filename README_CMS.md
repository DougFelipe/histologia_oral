# 🔐 CMS - Sistema de Gerenciamento de Conteúdo
## Atlas Virtual de Histologia Oral

Este documento detalha o **Sistema de Gerenciamento de Conteúdo (CMS)** integrado ao Atlas Virtual de Histologia Oral, uma ferramenta administrativa que permite gerenciar temas, imagens e textos sem necessidade de modificar código-fonte.

---

## 📋 Visão Geral do CMS

### 🎯 **Propósito**
O CMS foi desenvolvido para permitir que educadores e administradores:
- **Criem novos temas** histológicos sem programação
- **Editem conteúdo existente** de forma visual e intuitiva
- **Gerenciem imagens** com upload e preview
- **Adicionem estruturas interativas** com coordenadas precisas
- **Mantenham glossário** de termos técnicos atualizado
- **Cadastrem equipe** e colaboradores
- **Façam backup** e restauração de dados

### 🏗️ **Arquitetura**
- **Frontend**: React + TypeScript + Tailwind CSS
- **Persistência**: LocalStorage (simulação de banco de dados)
- **Autenticação**: **REMOVIDA** - Acesso direto em desenvolvimento
- **Sincronização**: Eventos customizados para atualização em tempo real
- **Segurança**: Controle de acesso **exclusivamente** por variável de ambiente
- **Backup**: Sistema de exportação/importação ZIP com estrutura hierárquica

### ⚡ **Características Principais**
- ✅ **Acesso Direto**: Sem tela de login em desenvolvimento
- ✅ **Interface Intuitiva**: Design responsivo e fácil de usar
- ✅ **Edição Visual**: Formulários dinâmicos com preview
- ✅ **Upload de Imagens**: Suporte a múltiplos formatos
- ✅ **Estruturas Interativas**: Sistema de coordenadas X/Y
- ✅ **Sincronização Automática**: Mudanças refletidas instantaneamente
- ✅ **Backup Avançado**: Export/Import ZIP com hierarquia de pastas
- ✅ **Proteção de Dados**: Temas originais protegidos contra exclusão
- ✅ **Duplicação Inteligente**: Cópia de temas originais para edição

---

## 🔒 Níveis de Proteção e Segurança

### **🛡️ Proteção Simplificada (Atualizada)**

#### **Única Camada de Segurança: Variável de Ambiente**
```bash
# Controle EXCLUSIVO de acesso
VITE_ENABLE_CMS=true   # CMS habilitado (desenvolvimento)
VITE_ENABLE_CMS=false  # CMS bloqueado (produção)
```

#### **Verificações Automáticas**
1. **Menu**: Só aparece se `VITE_ENABLE_CMS=true`
2. **Rota**: Bloqueia acesso direto via URL
3. **Componente**: Tela de acesso negado se não habilitado
4. **Console**: Logs de tentativas bloqueadas

#### **🚀 Fluxo Simplificado**
```bash
# Antes (com senha):
Menu → CMS → Login → Dashboard

# Agora (direto):
Menu → CMS → Dashboard
```

### **🛡️ Comportamento por Ambiente**

| Ambiente | CMS Visível | CMS Acessível | Indicadores Visuais |
|----------|-------------|---------------|-------------------|
| **Desenvolvimento** | ✅ Sim | ✅ Direto | Badge "DEV", Aviso amarelo |
| **Produção** | ❌ Não | ❌ Bloqueado | Nenhum |
| **Build Dev** | ✅ Sim | ✅ Direto | Badge "DEV" |
| **Build Prod** | ❌ Não | ❌ Bloqueado | Nenhum |

---

## 🚀 Como Habilitar e Rodar o CMS

### **Pré-requisitos**
- Node.js 16+
- npm ou yarn
- Projeto Atlas Virtual configurado

### **1. Configuração de Ambiente**

#### **Desenvolvimento (CMS Habilitado)**
```bash
# Método 1: Arquivo .env.development (recomendado)
echo "VITE_ENABLE_CMS=true" > .env.development

# Método 2: Variável inline
export VITE_ENABLE_CMS=true

# Método 3: Comando direto
VITE_ENABLE_CMS=true npm run dev
```

#### **Produção (CMS Bloqueado)**
```bash
# Arquivo .env.production (recomendado)
echo "VITE_ENABLE_CMS=false" > .env.production

# Build seguro para produção
npm run build:prod
```

### **2. Comandos de Execução**

#### **Desenvolvimento**
```bash
# Instalar dependências
npm install

# Rodar com CMS (padrão em desenvolvimento)
npm run dev

# Rodar explicitamente com CMS
npm run dev:cms

# Rodar sem CMS (teste de produção)
VITE_ENABLE_CMS=false npm run dev
```

#### **Build e Deploy**
```bash
# Build para produção (CMS desabilitado)
npm run build:prod

# Build para desenvolvimento (CMS habilitado)
npm run build:dev

# Preview da build
npm run preview

# Preview com CMS
npm run preview:cms
```

### **3. Verificação de Status**
```bash
# Verificar se CMS está habilitado
echo $VITE_ENABLE_CMS

# No navegador (console)
console.log(import.meta.env.VITE_ENABLE_CMS)

# Verificar no footer do site
# Deve aparecer "Modo Desenvolvimento - CMS Ativo"
```

---

## 📁 Estrutura do CMS no Projeto

### **Organização de Arquivos (Atualizada)**
```
src/
├── components/
│   ├── Header.tsx              # Controle de exibição do menu CMS
│   └── cms/                    # 🔐 Componentes do CMS (protegidos)
│       ├── CMSDashboard.tsx    # Painel principal (acesso direto)
│       ├── CMSThemeForm.tsx    # Formulário de criação/edição de temas
│       ├── CMSGlossaryManager.tsx # Gerenciador de glossário
│       └── CMSTeamManager.tsx  # Gerenciador de equipe
├── services/
│   └── cmsService.ts           # Lógica de negócio e persistência
├── types/
│   └── index.ts                # Interfaces TypeScript do CMS
└── App.tsx                     # Controle de acesso principal
```

### **Arquivos de Configuração**
```
.env.development     # VITE_ENABLE_CMS=true
.env.production      # VITE_ENABLE_CMS=false
.env.example         # Modelo de configuração
package.json         # Scripts específicos para CMS
```

### **Fluxo de Dados (Simplificado)**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CMS Service   │ ←→ │   LocalStorage   │ ←→ │  Site Principal │
│  (cmsService)   │    │   (Persistência) │    │   (Visualização)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ↕                        ↕                       ↕
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Eventos Custom  │    │  Sincronização   │    │ Atualização     │
│ (cms-data-updated)│   │   Automática     │    │ Tempo Real      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

---

## ✏️ Editando Conteúdo com o CMS

### **1. Acesso ao Sistema (Simplificado)**

#### **Acesso Direto**
1. **Verificar Ambiente**: Certifique-se que `VITE_ENABLE_CMS=true`
2. **Acessar**: Menu → CMS (badge "DEV" visível)
3. **Dashboard**: Abre diretamente sem login!

#### **Indicadores Visuais**
- **Header**: Badge "DEV" no menu CMS
- **Aviso Amarelo**: "Modo Desenvolvimento: CMS administrativo ativo"
- **Footer**: "Modo Desenvolvimento - CMS Ativo"
- **Dashboard**: Banner de desenvolvimento

### **2. Gerenciamento de Temas (Atualizado)**

#### **Tipos de Temas**
- **🔵 Temas Originais**: Palato, Língua, Cemento (protegidos, marcados como "Original")
- **🟢 Temas Personalizados**: Criados pelo usuário (totalmente editáveis)

#### **Proteção de Temas Originais**
```
✅ Podem ser visualizados
✅ Podem ser duplicados
❌ NÃO podem ser editados diretamente
❌ NÃO podem ser excluídos
```

#### **Criar Novo Tema**
1. **Dashboard → Novo Tema** ou **Temas → Novo Tema**
2. **Informações Básicas**:
   ```
   Nome: Nome do tema histológico *
   Descrição: Descrição detalhada *
   Categoria: Tecido Mole/Duro/Embrionário/Adulto/Patológico
   Status: Completo/Em Desenvolvimento
   Imagem: Upload da imagem principal *
   ```

3. **Adicionar Subtópicos**:
   ```
   Título: Nome do subtópico *
   Conteúdo: Texto explicativo detalhado *
   Imagem: URL da imagem do subtópico (opcional)
   ```

4. **Estruturas Interativas**:
   ```
   Nome: Nome da estrutura anatômica *
   Descrição: Descrição da estrutura *
   Função: Função biológica *
   Posição X: Coordenada horizontal (0-100%) *
   Posição Y: Coordenada vertical (0-100%) *
   ```

#### **Duplicar Tema Original**
1. **Temas → Encontrar tema original** (badge "Original")
2. **Clicar em "Duplicar"**
3. **Tema copiado** com nome "(Cópia)" criado
4. **Editar livremente** a versão duplicada

#### **Coordenadas das Estruturas**
```
Como determinar X e Y:
1. Abra a imagem em um editor
2. Identifique a estrutura
3. Calcule a posição:
   X = (posição horizontal / largura total) × 100
   Y = (posição vertical / altura total) × 100

Exemplo:
- Imagem 800x600px
- Estrutura em posição 400x300px
- X = (400/800) × 100 = 50%
- Y = (300/600) × 100 = 50%
```

### **3. Sistema de Backup e Exportação (NOVO)**

#### **🗂️ Exportação Avançada**
```
Configurações → Exportar Dados → Download ZIP

Estrutura do arquivo:
atlas-cms-backup-2024-01-15.zip
├── themes/
│   ├── tema-1.json
│   ├── tema-2.json
│   └── ...
├── glossary/
│   └── terms.json
├── team/
│   └── members.json
└── metadata.json
```

#### **📥 Importação de Dados**
```
Configurações → Importar Dados → Selecionar arquivo ZIP/JSON

Formatos suportados:
- ZIP com estrutura hierárquica
- JSON único com todos os dados
- Validação automática de estrutura
```

#### **🔄 Backup Automático**
- **LocalStorage**: Dados salvos automaticamente
- **Export Manual**: Botão de download disponível
- **Nomenclatura**: Data e hora no nome do arquivo
- **Compressão**: ZIP para otimizar tamanho

### **4. Gerenciamento de Glossário**

#### **Adicionar Termo**
```
Termo: Nome técnico *
Definição: Explicação detalhada *
Categoria: Tecidos Básicos/Processos Celulares/etc
```

#### **Categorias Disponíveis**
- Tecidos Básicos
- Processos Celulares
- Anatomia Microscópica
- Células Especializadas
- Junções Celulares
- Estruturas Especializadas
- Órgãos Sensoriais
- Componentes Teciduais
- Anatomia Dental

### **5. Gerenciamento de Equipe**

#### **Cadastrar Membro**
```
Nome: Nome completo *
Foto: Upload da imagem *
Formação: Titulação acadêmica *
Especialização: Área de expertise (opcional)
Contribuição: Descrição do papel no projeto *
```

---

## ⚙️ Funcionalidades Avançadas

### **1. Sistema de Proteção de Dados (Atualizado)**
- **Temas Originais**: Não podem ser excluídos ou editados diretamente
- **Duplicação Segura**: Cria cópias editáveis com nome "(Cópia)"
- **Confirmações**: Diálogos para operações destrutivas
- **Backup Automático**: Dados salvos no LocalStorage
- **Indicadores Visuais**: Badge "Original" para temas protegidos

### **2. Upload e Gerenciamento de Imagens**
```typescript
// Formatos suportados
Tipos: JPG, PNG, GIF, WebP
Tamanho: Sem limite específico (base64)
Preview: Visualização antes de salvar
Zoom: Modal de visualização ampliada (80% da tela)
Upload: Conversão automática para base64
```

### **3. Editor de Estruturas Interativas**
- **Coordenadas Precisas**: Sistema X/Y em porcentagem
- **Preview em Tempo Real**: Visualização das marcações
- **Múltiplas Estruturas**: Quantas necessárias por subtópico
- **Informações Detalhadas**: Nome, descrição, função
- **Validação**: Campos obrigatórios marcados com *

### **4. Sistema de Busca e Filtros**
- **Busca Global**: Por nome, descrição, categoria
- **Filtros por Tipo**: Originais vs Personalizados
- **Filtros por Status**: Completo vs Desenvolvimento
- **Ordenação**: Por data, nome, categoria
- **Contadores**: Estatísticas em tempo real

### **5. Sistema de Backup Avançado (NOVO)**

#### **Exportação Estruturada**
```javascript
// Estrutura do backup
{
  metadata: {
    version: "1.0",
    exportDate: "2024-01-15T10:30:00Z",
    totalThemes: 12,
    totalGlossary: 45,
    totalTeam: 6
  },
  themes: [...],
  glossaryTerms: [...],
  teamMembers: [...]
}
```

#### **Compressão ZIP**
- **Hierarquia de Pastas**: Organização lógica
- **Arquivos Separados**: Cada tema em arquivo próprio
- **Metadados**: Informações de versão e data
- **Compressão**: Reduz tamanho do arquivo

#### **Validação de Importação**
```javascript
// Verificações automáticas
✅ Estrutura de dados válida
✅ Campos obrigatórios presentes
✅ Tipos de dados corretos
✅ Integridade referencial
❌ Dados corrompidos rejeitados
```

---

## 🔧 Troubleshooting

### **Problema: CMS não aparece no menu**
```bash
# Verificar variável de ambiente
echo $VITE_ENABLE_CMS
# Deve retornar 'true'

# Se não estiver definida:
export VITE_ENABLE_CMS=true
npm run dev
```

### **Problema: Acesso negado ao CMS**
```bash
# Verificar se está em desenvolvimento
npm run dev:cms

# Ou definir explicitamente
VITE_ENABLE_CMS=true npm run dev

# Verificar arquivos de ambiente
cat .env.development  # deve ter VITE_ENABLE_CMS=true
```

### **Problema: Dados não sincronizam**
1. **Verificar Console**: Procurar erros JavaScript
2. **Recarregar Manualmente**: Botão "Atualizar Dados"
3. **Debug Service**: 
   ```javascript
   cmsService.debugData()
   ```
4. **Limpar Cache**: 
   ```javascript
   localStorage.removeItem('atlas-cms-data')
   localStorage.removeItem('cms-initialized')
   ```

### **Problema: Temas não aparecem**
```bash
# Debug no console do navegador
cmsService.debugData()

# Verificar inicialização
localStorage.getItem('cms-initialized')

# Forçar reinicialização
localStorage.removeItem('cms-initialized')
# Recarregar página
```

### **Problema: Não consigo editar tema original**
```
✅ Comportamento esperado!
Temas originais são protegidos.

Solução:
1. Encontrar tema original (badge "Original")
2. Clicar em "Duplicar"
3. Editar a cópia criada
```

### **Problema: Build falha**
```bash
# Verificar variáveis de ambiente
cat .env.development  # deve ter VITE_ENABLE_CMS=true
cat .env.production   # deve ter VITE_ENABLE_CMS=false

# Build específico
npm run build:dev   # Para desenvolvimento
npm run build:prod  # Para produção
```

### **Problema: Backup não funciona**
```javascript
// Verificar permissões de download
// Verificar se navegador bloqueia downloads automáticos
// Tentar em modo incógnito

// Debug do backup
const data = cmsService.exportData();
console.log('Backup data:', data);
```

---

## 📊 Monitoramento e Estatísticas

### **Dashboard de Estatísticas (Atualizado)**
```
Total de Temas: X (Y originais + Z personalizados)
Temas Completos: X
Em Desenvolvimento: Y
Termos no Glossário: Z
Membros da Equipe: W

Indicadores visuais:
🔵 Temas Originais (protegidos)
🟢 Temas Personalizados (editáveis)
```

### **Logs e Debug**
```javascript
// Console do navegador
cmsService.debugData()           // Dados completos
cmsService.getStatistics()       // Estatísticas
localStorage.getItem('atlas-cms-data') // Dados brutos

// Verificar inicialização
localStorage.getItem('cms-initialized')

// Verificar ambiente
console.log(import.meta.env.VITE_ENABLE_CMS)
```

### **Eventos de Sistema**
```javascript
// Escutar atualizações
window.addEventListener('cms-data-updated', (event) => {
  console.log('Dados atualizados:', event.detail);
});
```

---

## 🔮 Considerações Finais

### **✅ Vantagens do CMS (Atualizadas)**
- **Acesso Direto**: Sem tela de login desnecessária em desenvolvimento
- **Sem Programação**: Editores podem criar conteúdo sem código
- **Tempo Real**: Mudanças aparecem instantaneamente
- **Seguro**: Proteção automática por ambiente
- **Flexível**: Suporte a estruturas complexas
- **Backup Avançado**: Sistema de export/import ZIP estruturado
- **Proteção de Dados**: Temas originais protegidos contra modificação
- **Duplicação Inteligente**: Cópia segura para edição

### **⚠️ Limitações Atuais**
- **Persistência**: LocalStorage (não é banco real)
- **Autenticação**: Removida (controle apenas por ambiente)
- **Colaboração**: Não suporta múltiplos usuários simultâneos
- **Versionamento**: Não mantém histórico de mudanças
- **Performance**: Pode ser lenta com muitos dados

### **🚀 Roadmap Futuro**
- [ ] **Banco de Dados Real**: PostgreSQL/MongoDB
- [ ] **Autenticação Robusta**: OAuth, JWT, roles
- [ ] **API REST**: Backend dedicado
- [ ] **Colaboração**: Multi-usuário em tempo real
- [ ] **Versionamento**: Histórico de mudanças
- [ ] **CDN**: Upload de imagens para cloud
- [ ] **PWA**: Funcionamento offline
- [ ] **Analytics**: Métricas de uso
- [ ] **Backup Automático**: Agendamento de backups

### **🔒 Segurança em Produção**
```bash
# NUNCA fazer em produção:
VITE_ENABLE_CMS=true npm run build

# SEMPRE usar:
npm run build:prod
# ou
VITE_ENABLE_CMS=false npm run build

# Verificar antes do deploy:
echo $VITE_ENABLE_CMS  # deve ser 'false' ou vazio
```

### **📞 Suporte Técnico**
- **Documentação**: Este README + comentários no código
- **Debug**: Console do navegador + `cmsService.debugData()`
- **Reset**: Configurações → Resetar para Padrão
- **Backup**: Sempre exportar dados antes de mudanças grandes
- **Acesso**: Verificar `VITE_ENABLE_CMS=true` para desenvolvimento

---

## 📝 Exemplo Prático: Criando um Tema

### **Cenário**: Criar tema "Epitélio Gengival"

#### **1. Preparação**
```bash
# Verificar ambiente
echo $VITE_ENABLE_CMS  # deve ser 'true'
npm run dev:cms
```

#### **2. Acesso ao CMS (Simplificado)**
```
1. Abrir http://localhost:5173
2. Menu → CMS (badge "DEV" visível)
3. Dashboard abre diretamente!
```

#### **3. Criar Tema**
```
Dashboard → Novo Tema

Informações Básicas:
- Nome: Epitélio Gengival *
- Descrição: Epitélio estratificado pavimentoso queratinizado da gengiva *
- Categoria: Tecido Mole
- Status: Completo
- Imagem: [upload da imagem principal] *
```

#### **4. Adicionar Subtópico**
```
Subtópico 1:
- Título: Camadas Epiteliais *
- Conteúdo: O epitélio gengival é constituído por... *
- Imagem: https://exemplo.com/epitelio-gengival.jpg

Estruturas:
1. Camada Basal (X: 25%, Y: 80%) *
2. Camada Espinhosa (X: 45%, Y: 60%) *
3. Camada Granulosa (X: 65%, Y: 40%) *
4. Camada Córnea (X: 75%, Y: 20%) *
```

#### **5. Verificação e Backup**
```
1. Salvar tema
2. Fazer backup: Configurações → Exportar Dados
3. Voltar ao atlas principal
4. Verificar se tema aparece no grid
5. Testar estruturas interativas
```

---

## 🎯 Resumo das Principais Mudanças

### **🔄 Atualizações Implementadas**

#### **1. Remoção da Autenticação**
- ❌ **Removido**: Tela de login (`CMSLogin.tsx`)
- ✅ **Novo**: Acesso direto ao dashboard
- ✅ **Proteção**: Apenas por variável de ambiente

#### **2. Proteção de Temas Originais**
- ✅ **Badge "Original"**: Identificação visual
- ✅ **Duplicação**: Botão para criar cópia editável
- ❌ **Edição Direta**: Bloqueada para temas originais
- ❌ **Exclusão**: Impossível para temas originais

#### **3. Sistema de Backup Avançado**
- ✅ **Export ZIP**: Estrutura hierárquica
- ✅ **Metadados**: Informações de versão e data
- ✅ **Validação**: Verificação de integridade
- ✅ **Nomenclatura**: Data/hora no nome do arquivo

#### **4. Interface Melhorada**
- ✅ **Indicadores Visuais**: Badges e avisos de desenvolvimento
- ✅ **Estatísticas Detalhadas**: Contadores específicos
- ✅ **Botões de Ação**: Duplicar, atualizar, resetar
- ✅ **Formulários Aprimorados**: Campos obrigatórios marcados

---

**🎯 O CMS do Atlas Virtual de Histologia Oral agora oferece acesso direto em desenvolvimento, proteção robusta de dados originais e sistema avançado de backup, mantendo a segurança através do controle de ambiente.**

### 🔐 **Lembre-se**: O CMS é automaticamente desabilitado em produção para proteger o sistema. Para desenvolvimento, sempre use `VITE_ENABLE_CMS=true`.
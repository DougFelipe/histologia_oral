# Atlas Virtual de Histologia Oral

Um atlas educacional interativo desenvolvido em React para o estudo de estruturas histológicas da cavidade oral. O projeto oferece uma experiência de aprendizado moderna com imagens de alta qualidade, legendas interativas, ferramentas de comparação e **sistema CMS integrado** para gerenciamento de conteúdo com **persistência real**.

## 🎯 Características Principais

- **Interface Responsiva**: Design otimizado para desktop, tablet e mobile
- **Navegação Intuitiva**: Sistema de abas e rolagem contínua
- **Legendas Interativas**: Clique nas estruturas para ver detalhes
- **Zoom de Imagens**: Modal de visualização em tela cheia
- **Modo Comparação**: Compare duas estruturas lado a lado
- **Busca Inteligente**: Filtros por categoria e busca por texto
- **Glossário Completo**: Definições de termos técnicos
- **Página da Equipe**: Conheça os especialistas por trás do projeto
- **🆕 CMS Integrado**: Sistema de gerenciamento de conteúdo completo
- **🔒 Segurança por Ambiente**: CMS restrito ao modo de desenvolvimento
- **💾 Persistência Real**: Sistema "Salvar no Projeto" para arquivos físicos
- **🔄 Sincronização Automática**: Scripts Node.js para manutenção
- **🚀 SEO Otimizado**: Estrutura semântica e dados estruturados para descoberta por IA
- **Arquitetura Modular**: Fácil manutenção e expansão

## 🚀 Tecnologias Utilizadas

- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **React Quill** para editor de texto rico
- **Vite** como bundler
- **LocalStorage** para persistência temporária
- **Node.js Scripts** para persistência real
- **Variáveis de ambiente** para controle de acesso
- **Schema.org** para dados estruturados
- **Arquitetura de componentes modulares**

## 🔧 Configuração do Ambiente

### Requisitos
- Node.js 16+
- npm ou yarn

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para controlar o acesso ao CMS e funcionalidades de persistência:

#### Arquivos de Configuração

1. **`.env.development`** (Desenvolvimento)
```env
VITE_ENABLE_CMS=true
VITE_ENABLE_CMS_WRITE=true
```

2. **`.env.production`** (Produção)
```env
VITE_ENABLE_CMS=false
VITE_ENABLE_CMS_WRITE=false
```

3. **`.env.example`** (Modelo)
```env
# Habilitar/Desabilitar CMS
# true = CMS acessível (recomendado apenas para desenvolvimento)
# false = CMS bloqueado (recomendado para produção)
VITE_ENABLE_CMS=true

# Habilitar/Desabilitar salvamento no projeto
# true = Permite salvar alterações como arquivos reais
# false = Apenas LocalStorage (recomendado para produção)
VITE_ENABLE_CMS_WRITE=true
```

### 🚀 Comandos de Desenvolvimento

#### Desenvolvimento (com CMS)
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento (CMS habilitado)
npm run dev
# ou explicitamente
npm run dev:cms

# Executar com CMS desabilitado
VITE_ENABLE_CMS=false npm run dev
```

#### Produção (sem CMS)
```bash
# Build para produção (CMS desabilitado)
npm run build
# ou explicitamente
npm run build:prod

# Build para desenvolvimento (CMS habilitado)
npm run build:dev

# Preview da build
npm run preview

# Preview com CMS habilitado
npm run preview:cms
```

#### 🆕 Comandos de Persistência CMS
```bash
# Salvar dados do CMS como arquivos reais no projeto
npm run cms:save

# Sincronizar estrutura do projeto
npm run cms:sync

# Validar dados e estrutura
npm run cms:validate

# Linting
npm run lint
```

## 🔍 Otimizações de SEO e GEO (Generative Engine Optimization)

### 📊 **Implementações para Descoberta por IA**

O projeto foi otimizado para ser facilmente descoberto e indexado por motores de busca tradicionais e sistemas de IA generativa como ChatGPT, Bard, Perplexity, etc.

#### **Meta Tags Avançadas**
- **Títulos dinâmicos** por página com palavras-chave relevantes
- **Descrições otimizadas** para cada seção (temas, glossário, equipe)
- **Open Graph** completo para compartilhamento social
- **Twitter Cards** para melhor apresentação
- **Meta tags geográficas** (Brasil, português)
- **Meta tags educacionais** (nível superior, área médica)

#### **Dados Estruturados (Schema.org)**
```json
{
  "@type": "MedicalWebPage",
  "educationalLevel": "HigherEducation",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": ["student", "teacher", "researcher"]
  },
  "about": {
    "@type": "MedicalSpecialty",
    "name": "Histologia Oral"
  }
}
```

#### **Estrutura Semântica HTML5**
- **`<article>`** para temas com headers estruturados
- **`<section>`** para subtópicos organizados
- **`<dl>`, `<dt>`, `<dd>`** para glossário semântico
- **Headings hierárquicos** (H1 → H6) consistentes
- **Alt text descritivo** para todas as imagens
- **ARIA labels** para acessibilidade e compreensão por IA

#### **Sitemap e Robots.txt**
- **Sitemap XML** com imagens e metadados
- **Robots.txt** otimizado para crawlers
- **Página pública de sitemap** para navegação
- **URLs canônicas** para evitar duplicação

### 🎯 **Benefícios para Descoberta por IA**

#### **Respostas Inteligentes**
- Quando alguém perguntar "o que é epitélio estratificado?", o atlas pode aparecer como fonte
- Definições do glossário estruturadas para extração automática
- Imagens histológicas com descrições detalhadas para busca visual

#### **Contexto Educacional**
- Marcação clara como conteúdo educacional de nível superior
- Audiência definida (estudantes de medicina/odontologia)
- Especialidade médica identificada (histologia oral)

#### **Estrutura de Conhecimento**
- Relacionamentos entre temas, estruturas e definições
- Hierarquia clara de informações (tema → subtópico → estrutura)
- Metadados de equipe com expertise identificada

### 📈 **Métricas de SEO Implementadas**

#### **Performance**
- **Lazy loading** de imagens
- **Preconnect** para recursos externos
- **Otimização** de meta tags dinâmicas

#### **Acessibilidade**
- **ARIA labels** completos
- **Alt text** descritivo
- **Navegação por teclado**
- **Contraste** adequado

#### **Indexação**
- **URLs semânticas** (/theme/palato, /glossary, /team)
- **Breadcrumbs** implícitos na navegação
- **Conteúdo único** por página
- **Tempo de carregamento** otimizado

### 🔗 **URLs Otimizadas**

```
https://atlas-histologia-oral.com/
https://atlas-histologia-oral.com/theme/palato
https://atlas-histologia-oral.com/theme/lingua
https://atlas-histologia-oral.com/theme/cemento
https://atlas-histologia-oral.com/glossary
https://atlas-histologia-oral.com/team
https://atlas-histologia-oral.com/guide
https://atlas-histologia-oral.com/sitemap
```

### 🤖 **Compatibilidade com IA Generativa**

#### **Extração de Conhecimento**
- **Definições estruturadas** no glossário
- **Descrições detalhadas** de estruturas histológicas
- **Contexto educacional** claro
- **Relacionamentos** entre conceitos

#### **Citação e Referência**
- **Metadados de autoria** da equipe
- **Data de publicação** e atualização
- **Licença educacional** clara
- **Fonte confiável** identificada

## 🔒 Segurança e Controle de Acesso

### Níveis de Proteção

1. **Variável de Ambiente**: `VITE_ENABLE_CMS`
2. **Verificação no Header**: Menu CMS só aparece se habilitado
3. **Verificação na Rota**: Bloqueia acesso direto via URL
4. **Indicadores Visuais**: Badge "DEV" e avisos de desenvolvimento
5. **🆕 Controle de Persistência**: `VITE_ENABLE_CMS_WRITE`

### Comportamento por Ambiente

| Ambiente | CMS Visível | CMS Acessível | Salvamento | Indicadores |
|----------|-------------|---------------|------------|-------------|
| **Desenvolvimento** | ✅ Sim | ✅ Sim | ✅ Habilitado | Badge "DEV", Aviso amarelo |
| **Produção** | ❌ Não | ❌ Não | ❌ Bloqueado | Nenhum |
| **Build Dev** | ✅ Sim | ✅ Sim | ✅ Habilitado | Badge "DEV" |
| **Build Prod** | ❌ Não | ❌ Não | ❌ Bloqueado | Nenhum |

## 🔐 Sistema CMS (Content Management System)

### ⚠️ **IMPORTANTE: Acesso Restrito**

O CMS é **automaticamente desabilitado em produção** por motivos de segurança. Para acessá-lo:

1. **Ambiente de Desenvolvimento**: CMS habilitado por padrão
2. **Variável de Ambiente**: `VITE_ENABLE_CMS=true`
3. **Indicador Visual**: Badge "DEV" no menu

### 🆕 Sistema de Persistência Real

#### **"Salvar no Projeto" - Nova Funcionalidade**

O CMS agora permite transformar alterações temporárias em arquivos reais do projeto:

```bash
# 1. Criar/editar conteúdo no CMS
CMS → Dashboard → Criar temas, glossário, equipe

# 2. Salvar no projeto
CMS → Dashboard → "Salvar no Projeto" → Download cms-export.json

# 3. Executar script de sincronização
npm run cms:save

# 4. Validar resultado
npm run cms:validate
npm run lint

# 5. Versionamento
git add .
git commit -m "Adiciona temas criados via CMS"
git push
```

#### **Vantagens da Persistência Real**
- ✅ **Versionamento**: Controlado pelo Git
- ✅ **Deploy**: Incluído no build de produção
- ✅ **Colaboração**: Compartilhamento via repositório
- ✅ **Backup**: Segurança via controle de versão
- ✅ **Validação**: TypeScript automático
- ✅ **Estrutura**: Organização em pastas
- ✅ **SEO**: Dados estruturados para indexação

## 📋 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação (controle CMS)
│   ├── HeroBanner.tsx  # Banner principal
│   ├── ThemeGrid.tsx   # Grid de temas
│   ├── ThemeView.tsx   # Visualização de temas (SEO otimizado)
│   ├── InteractiveLegend.tsx # Legendas interativas
│   ├── ImageZoomModal.tsx    # Modal de zoom para imagens
│   ├── ComparisonView.tsx    # Modo comparação
│   ├── GuideView.tsx   # Modo de usar
│   ├── GlossaryView.tsx # Glossário (dados estruturados)
│   ├── TeamView.tsx    # Página da equipe (schema.org/Person)
│   ├── SitemapView.tsx # 🆕 Página pública de sitemap
│   ├── SEOHead.tsx     # 🆕 Componente de SEO dinâmico
│   └── cms/            # Componentes do CMS (protegidos)
│       ├── CMSDashboard.tsx # Dashboard principal
│       ├── CMSThemeForm.tsx # Formulário de temas
│       ├── CMSGlossaryManager.tsx # Gerenciador de glossário
│       └── CMSTeamManager.tsx     # Gerenciador de equipe
├── services/           # Serviços
│   └── cmsService.ts   # Serviço de gerenciamento CMS
├── themes/             # Temas organizados por pastas
│   ├── palato/
│   │   └── data.ts     # Dados do tema palato
│   ├── lingua/
│   │   └── data.ts     # Dados do tema língua
│   ├── cemento/
│   │   └── data.ts     # Dados do tema cemento
│   └── [tema-personalizado]/  # Temas criados via CMS
│       └── data.ts     # Gerado automaticamente
├── data/
│   └── themes.ts       # Dados centralizados e glossário
├── types/
│   └── index.ts        # Definições TypeScript
├── scripts/            # Scripts de persistência
│   ├── save-cms-to-project.js  # Salva dados do CMS
│   ├── sync-cms-data.js        # Sincroniza estrutura
│   └── validate-cms-data.js    # Valida dados
└── App.tsx             # Componente principal (controle de acesso)

public/
├── sitemap.xml         # 🆕 Sitemap para motores de busca
├── robots.txt          # 🆕 Instruções para crawlers
├── site.webmanifest    # 🆕 Manifesto PWA
└── favicon files       # Ícones otimizados
```

## 🎨 Temas Disponíveis

### Completos (Originais)
- **Palato**: Epitélio estratificado, lâmina própria, glândulas palatinas
- **Língua**: Papilas linguais, músculo intrínseco, botões gustativos
- **Cemento**: Cemento acelular, celular e junção cemento-esmalte

### 🆕 Personalizados (Via CMS)
- Temas criados pelos usuários via CMS
- Podem ser salvos como arquivos reais no projeto
- Totalmente editáveis e customizáveis
- **SEO otimizado** com dados estruturados

### Em Desenvolvimento (Placeholders)
- Gengiva, Dentina, Esmalte, Polpa Dentária
- Ligamento Periodontal, Osso Alveolar
- Mucosa Bucal, Glândulas Salivares, Periodonto

## 🖼️ Sistema de Imagens Interativas

### Como Funciona
O sistema de legendas interativas permite que os usuários cliquem em pontos específicos das imagens histológicas para obter informações detalhadas sobre as estruturas.

### Implementação Técnica

#### 1. Estrutura de Dados
```typescript
interface Structure {
  id: string;           // Identificador único
  name: string;         // Nome da estrutura
  description: string;  // Descrição breve
  function: string;     // Função da estrutura
  x: number;           // Posição X em porcentagem (0-100)
  y: number;           // Posição Y em porcentagem (0-100)
}
```

#### 2. SEO para Imagens
- **Alt text descritivo** com contexto completo
- **Títulos informativos** para acessibilidade
- **ARIA labels** para estruturas interativas
- **Dados estruturados** para imagens no sitemap

### Como Adicionar Pontos Interativos

#### 1. Via CMS (Recomendado - Apenas Desenvolvimento)
1. **Habilitar CMS**: `VITE_ENABLE_CMS=true`
2. **Acessar**: CMS → Dashboard
3. **Editar/Criar**: Tema → Subtópicos → Estruturas
4. **Coordenadas**: X e Y (0-100%)
5. **🆕 Persistir**: "Salvar no Projeto" → `npm run cms:save`

#### 2. Via Código (Avançado)
```typescript
// Adicionar ao array de estruturas
structures: [
  {
    id: 'nova-estrutura',
    name: 'Nome da Estrutura',
    description: 'Descrição detalhada',
    function: 'Função específica',
    x: 45, // Posição horizontal em %
    y: 60  // Posição vertical em %
  }
]
```

## 📚 Como Adicionar Novos Temas

### 🆕 Método 1: Via CMS com Persistência (Recomendado)

#### **Pré-requisitos**
```bash
# Verificar se CMS está habilitado
echo $VITE_ENABLE_CMS        # deve retornar 'true'
echo $VITE_ENABLE_CMS_WRITE  # deve retornar 'true'

# Se não estiver, habilitar
export VITE_ENABLE_CMS=true
export VITE_ENABLE_CMS_WRITE=true
npm run dev
```

#### **Criar Tema Completamente Novo**
1. **Acessar o CMS**: Menu → CMS → Dashboard
2. **Dashboard**: Clique em "Novo Tema"
3. **Preencher os dados**:
   - Nome do tema *
   - Descrição * (otimizada para SEO)
   - Categoria
   - Status
   - Upload da imagem principal *
4. **Adicionar subtópicos**:
   - Título do subtópico *
   - Conteúdo detalhado *
   - URL da imagem (opcional)
5. **Configurar estruturas interativas**:
   - Nome da estrutura *
   - Função *
   - Descrição *
   - Coordenadas X e Y *
6. **Salvar**: Tema aparece automaticamente no site
7. **🆕 Persistir**: Clique em "Salvar no Projeto"
8. **🆕 Sincronizar**: Execute `npm run cms:save`
9. **🆕 Validar**: Execute `npm run cms:validate`
10. **🆕 Versionamento**: `git add . && git commit -m "Adiciona novo tema"`

## 🔄 Modos de Visualização

### Grid Principal
- Cartões com imagens dos temas
- Filtros por categoria
- Indicadores visuais de status
- **SEO otimizado** com dados estruturados

### Visualização de Tema
- **Modo Paginação**: Navega subtópico por subtópico
- **Modo Rolagem**: Visualização contínua
- **Zoom de Imagens**: Modal em tela cheia (80% viewport)
- **Estrutura semântica**: Article → Section → Headers
- **Dados estruturados**: Schema.org/MedicalWebPage

### Modo Comparação
- Seleção de duas estruturas
- Visualização lado a lado
- Análise comparativa automática

## 🎯 Filtros e Busca

### Categorias Disponíveis
- Todos, Tecido Mole, Tecido Duro
- Embrionário, Adulto, Patológico

### Busca Inteligente
- Busca por nome do tema
- Busca por descrição
- Busca por estruturas
- Resultados em tempo real
- **SEO friendly** com URLs semânticas

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px (1 coluna)
- **Tablet**: 768px - 1024px (2 colunas)
- **Desktop**: > 1024px (3-4 colunas)

### Componentes Adaptativos
- Grid flexível de temas
- Navegação otimizada para touch
- Imagens responsivas
- Modal de zoom adaptativo
- **Meta viewport** otimizada

## 🛠️ Funcionalidades do CMS

### ✅ **Implementadas e Funcionais**
- ✅ **Controle de Ambiente**: Restrito ao desenvolvimento
- ✅ **Dashboard**: Estatísticas e ações rápidas
- ✅ **Gerenciamento de Temas**: CRUD completo
- ✅ **Proteção de Dados**: Temas originais protegidos
- ✅ **Duplicação**: Cópia de temas para edição
- ✅ **Upload de Imagens**: Com preview
- ✅ **Estruturas Interativas**: Coordenadas X/Y
- ✅ **Sincronização**: Tempo real entre CMS e site
- ✅ **Persistência Temporária**: LocalStorage confiável
- ✅ **🆕 Persistência Real**: Sistema "Salvar no Projeto"
- ✅ **🆕 Scripts de Manutenção**: Validação e sincronização
- ✅ **Backup/Restore**: Export/Import JSON
- ✅ **Glossário**: Gerenciamento completo
- ✅ **Equipe**: Cadastro de membros
- ✅ **Responsivo**: Interface adaptativa
- ✅ **Segurança**: Bloqueio automático em produção
- ✅ **🆕 SEO Automático**: Dados estruturados gerados

## 🚀 Deploy e Ambientes

### Desenvolvimento Local
```bash
# CMS habilitado (padrão)
npm run dev

# CMS desabilitado
VITE_ENABLE_CMS=false npm run dev

# CMS com persistência
VITE_ENABLE_CMS=true VITE_ENABLE_CMS_WRITE=true npm run dev
```

### Build para Produção
```bash
# Build seguro (CMS desabilitado)
npm run build:prod

# Verificar build
npm run preview
```

### 🆕 Fluxo de Persistência
```bash
# 1. Desenvolvimento
npm run dev:cms

# 2. Criar conteúdo no CMS
# 3. Salvar no projeto
CMS → "Salvar no Projeto"

# 4. Sincronizar
npm run cms:save

# 5. Validar
npm run cms:validate
npm run lint

# 6. Versionamento
git add .
git commit -m "Adiciona conteúdo do CMS"
git push

# 7. Deploy
npm run build:prod
```

## 📈 Roadmap Futuro

### Próximas Funcionalidades
- [ ] Sistema de anotações do usuário
- [ ] Modo quiz/avaliação
- [ ] Exportação de imagens
- [ ] Zoom avançado com pan nas imagens
- [ ] Modo escuro
- [ ] Integração com sistemas de ensino
- [ ] 🆕 Autenticação real (OAuth, JWT)
- [ ] 🆕 Versionamento de conteúdo
- [ ] 🆕 Colaboração multi-usuário
- [ ] 🆕 API REST para CMS

### 🆕 Melhorias de SEO/GEO
- [ ] **Server-Side Rendering (SSR)** para melhor indexação
- [ ] **Prerendering** de páginas estáticas
- [ ] **AMP** para páginas móveis
- [ ] **Rich Snippets** para resultados de busca
- [ ] **FAQ Schema** para perguntas frequentes
- [ ] **Video Schema** para conteúdo multimídia

### Melhorias de Persistência
- [ ] Commit automático via Git hooks
- [ ] Sincronização em tempo real
- [ ] Backup automático agendado
- [ ] Versionamento de mudanças
- [ ] Rollback de alterações

## 🔧 Troubleshooting

### CMS Não Aparece
```bash
# Verificar variável de ambiente
echo $VITE_ENABLE_CMS

# Deve retornar 'true' para desenvolvimento
# Se não, definir:
export VITE_ENABLE_CMS=true
npm run dev
```

### 🆕 Salvamento no Projeto Não Funciona
```bash
# Verificar variável de persistência
echo $VITE_ENABLE_CMS_WRITE

# Deve retornar 'true' para habilitar
# Se não, definir:
export VITE_ENABLE_CMS_WRITE=true
npm run dev:cms
```

### 🆕 SEO Não Está Funcionando
```bash
# Verificar meta tags no navegador
# Inspecionar elemento → <head>

# Verificar dados estruturados
# Google Rich Results Test
# Schema.org Validator

# Verificar sitemap
curl https://seu-dominio.com/sitemap.xml
```

### Dados Não Sincronizam
```bash
# Recarregar dados manualmente
# No CMS: Botão "Atualizar Dados"

# 🆕 Verificar arquivos persistidos
ls src/themes/*/data.ts
git status
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. **Configure ambiente**: `VITE_ENABLE_CMS=true VITE_ENABLE_CMS_WRITE=true`
4. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
5. **🆕 Use persistência**: Para dados importantes, use "Salvar no Projeto"
6. **🆕 Teste SEO**: Verificar meta tags e dados estruturados
7. Push para a branch (`git push origin feature/nova-feature`)
8. Abra um Pull Request

### Diretrizes para Contribuição
- **CMS**: Sempre testar com `VITE_ENABLE_CMS=true` e `false`
- **Persistência**: Testar `VITE_ENABLE_CMS_WRITE=true` e `false`
- **Segurança**: Nunca expor CMS em produção
- **SEO**: Verificar meta tags e dados estruturados
- **Testes**: Verificar ambos os ambientes
- **🆕 Scripts**: Executar `npm run cms:validate` antes de commit
- **Documentação**: Atualizar README se necessário

## 📄 Licença

Este projeto é desenvolvido para fins educacionais. Consulte o arquivo LICENSE para mais detalhes.

## 📞 Suporte

Para dúvidas sobre o uso ou desenvolvimento, consulte:
- Documentação inline no código
- Seção "Modo de Usar" na aplicação
- Página da "Equipe" para contatos
- **🆕 Mapa do Site** para navegação completa
- Issues do GitHub para reportar bugs
- **CMS integrado** para gerenciamento de conteúdo (apenas desenvolvimento)
- **Scripts de validação**: `npm run cms:validate` para diagnóstico

### Suporte Técnico CMS
- **Ambiente**: Verificar `VITE_ENABLE_CMS=true`
- **Persistência**: Verificar `VITE_ENABLE_CMS_WRITE=true`
- **Problemas**: Logs no console do navegador
- **Reset**: Botão "Resetar para Padrão" nas configurações
- **🆕 Validação**: `npm run cms:validate` para diagnóstico
- **🆕 Sincronização**: `npm run cms:sync` para estrutura

### 🆕 Suporte SEO/GEO
- **Meta Tags**: Verificar no DevTools → Elements → Head
- **Dados Estruturados**: Google Rich Results Test
- **Sitemap**: Verificar `/sitemap.xml` e `/sitemap`
- **Robots**: Verificar `/robots.txt`
- **Performance**: Lighthouse audit
- **Acessibilidade**: WAVE Web Accessibility Evaluator

---

**Atlas Virtual de Histologia Oral** - Transformando o ensino de histologia através da tecnologia, gestão inteligente de conteúdo e **otimização para descoberta por IA**, com segurança, controle de acesso por ambiente e **persistência real** via sistema "Salvar no Projeto".

### 🔒 **Nota de Segurança**
O CMS é automaticamente desabilitado em produção para proteger o sistema. Para desenvolvimento, use `VITE_ENABLE_CMS=true` e `VITE_ENABLE_CMS_WRITE=true`.

### 🆕 **Nova Funcionalidade: Persistência Real**
Agora você pode transformar suas criações do CMS em arquivos reais do projeto! Use "Salvar no Projeto" → `npm run cms:save` → Git commit para persistência completa.

### 🚀 **Nova Funcionalidade: SEO e GEO Otimizado**
O projeto agora está otimizado para descoberta por motores de busca e IA generativa, com dados estruturados, meta tags dinâmicas e sitemap completo para máxima visibilidade educacional.
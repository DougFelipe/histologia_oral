import { Theme, GlossaryTerm, TeamMember } from '../types';
import { palatoTheme } from '../themes/palato/data';
import { linguaTheme } from '../themes/lingua/data';
import { cementoTheme } from '../themes/cemento/data';
import { polpaDentinaTheme } from '../themes/polpa-dentina/data';  
import logo from '../data/LOGO.png'; // ajuste o caminho conforme a localização do arquivo



// Temas completos implementados
const implementedThemes = [palatoTheme, linguaTheme, cementoTheme, polpaDentinaTheme];

// Temas em desenvolvimento (placeholders)
const developmentThemes: Theme[] = [
  {
    id: 'dentina',
    name: 'Dentina',
    status: 'development',
    image: logo,
    description: 'Tecido mineralizado que forma o corpo do dente com túbulos dentinários.',
    category: 'Tecido Duro',
    subtopics: []
  },
  {
    id: 'esmalte',
    name: 'Esmalte',
    status: 'development',
    image: logo,
    description: 'Tecido mais mineralizado do corpo humano, formado por prismas de esmalte.',
    category: 'Tecido Duro',
    subtopics: []
  },
  {
    id: 'ligamento-periodontal',
    name: 'Ligamento Periodontal',
    status: 'development',
    image: logo,
    description: 'Tecido conjuntivo que une o cemento radicular ao osso alveolar.',
    category: 'Tecido Mole',
    subtopics: []
  },
  {
    id: 'osso-alveolar',
    name: 'Osso Alveolar',
    status: 'development',
    image: logo,
    description: 'Tecido ósseo especializado que suporta e ancora os dentes.',
    category: 'Tecido Duro',
    subtopics: []
  },
  {
    id: 'mucosa-bucal',
    name: 'Mucosa Bucal',
    status: 'development',
    image: logo,
    description: 'Mucosa de revestimento da cavidade oral com características específicas.',
    category: 'Tecido Mole',
    subtopics: []
  },
  {
    id: 'glandulas-salivares',
    name: 'Glândulas Salivares',
    status: 'development',
    image: logo,
    description: 'Glândulas exócrinas produtoras de saliva com diferentes tipos secretores.',
    category: 'Tecido Mole',
    subtopics: []
  },
  {
    id: 'periodonto',
    name: 'Periodonto',
    status: 'development',
    image: logo,
    description: 'Conjunto integrado de tecidos de suporte e sustentação do dente.',
    category: 'Tecido Mole',
    subtopics: []
  }
];

export const themes: Theme[] = [...implementedThemes, ...developmentThemes];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Epitélio Estratificado',
    definition: 'Epitélio composto por múltiplas camadas celulares sobrepostas, conferindo proteção mecânica contra agressões externas.',
    category: 'Tecidos Básicos'
  },
  {
    term: 'Queratinização',
    definition: 'Processo de deposição de queratina nas células epiteliais superficiais, conferindo resistência e impermeabilidade.',
    category: 'Processos Celulares'
  },
  {
    term: 'Lâmina Própria',
    definition: 'Camada de tecido conjuntivo subjacente ao epitélio das mucosas, responsável pelo suporte estrutural e nutricional.',
    category: 'Anatomia Microscópica'
  },
  {
    term: 'Cementócitos',
    definition: 'Células do cemento alojadas em lacunas (cementoplastos), responsáveis pela manutenção da matriz cementária.',
    category: 'Células Especializadas'
  },
  {
    term: 'Desmossomas',
    definition: 'Junções intercelulares especializadas que conferem adesão mecânica forte entre células epiteliais adjacentes.',
    category: 'Junções Celulares'
  },
  {
    term: 'Fibras de Sharpey',
    definition: 'Fibras colágenas do ligamento periodontal que se inserem perpendicularmente no cemento e osso alveolar.',
    category: 'Estruturas Especializadas'
  },
  {
    term: 'Papilas Conjuntivas',
    definition: 'Projeções da lâmina própria que se estendem no epitélio, aumentando a superfície de contato para nutrição.',
    category: 'Anatomia Microscópica'
  },
  {
    term: 'Botões Gustativos',
    definition: 'Órgãos sensoriais especializados na percepção do paladar, compostos por células gustativas e de suporte.',
    category: 'Órgãos Sensoriais'
  },
  {
    term: 'Matriz Extracelular',
    definition: 'Rede complexa de proteínas e polissacarídeos secretada pelas células, fornecendo suporte estrutural aos tecidos.',
    category: 'Componentes Teciduais'
  },
  {
    term: 'Junção Cemento-Esmalte',
    definition: 'Interface anatômica entre o esmalte coronário e o cemento radicular, localizada na linha cervical do dente.',
    category: 'Anatomia Dental'
  }
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
  {
    id: 'dra-santos',
    name: 'Dra. Maria Fernanda Santos',
    photo: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300',
    formation: 'Mestre em Odontologia - UNICAMP',
    contribution: 'Desenvolvimento do conteúdo de tecidos duros e revisão científica das descrições histológicas.',
    specialization: 'Dentística e Materiais Dentários'
  },
  {
    id: 'prof-oliveira',
    name: 'Prof. Dr. João Oliveira',
    photo: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
    formation: 'PhD em Periodontia - UFRJ',
    contribution: 'Consultoria em periodontia e desenvolvimento dos temas relacionados ao periodonto.',
    specialization: 'Periodontia e Implantodontia'
  },
  {
    id: 'dra-costa',
    name: 'Dra. Ana Paula Costa',
    photo: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=300',
    formation: 'Especialista em Patologia Oral - UFMG',
    contribution: 'Desenvolvimento do glossário de termos técnicos e validação do conteúdo educacional.',
    specialization: 'Patologia Oral e Estomatologia'
  },
  {
    id: 'dev-rodrigues',
    name: 'Lucas Rodrigues',
    photo: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300',
    formation: 'Engenheiro de Software - UFSC',
    contribution: 'Desenvolvimento da plataforma web, interface de usuário e funcionalidades interativas.',
    specialization: 'Desenvolvimento Web e UX/UI'
  },
  {
    id: 'design-almeida',
    name: 'Camila Almeida',
    photo: 'https://images.pexels.com/photos/5327592/pexels-photo-5327592.jpeg?auto=compress&cs=tinysrgb&w=300',
    formation: 'Designer Gráfico - ESPM',
    contribution: 'Design da interface, identidade visual e otimização da experiência do usuário.',
    specialization: 'Design Digital e Ilustração Científica'
  }
];

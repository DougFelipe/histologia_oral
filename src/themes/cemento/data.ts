import { Theme } from '../../types';

export const cementoTheme: Theme = {
  id: 'cemento',
  name: 'Cemento',
  status: 'complete',
  image: 'https://images.pexels.com/photos/4386364/pexels-photo-4386364.jpeg?auto=compress&cs=tinysrgb&w=400',
  description: 'Tecido mineralizado que recobre a superfície radicular e ancora as fibras do ligamento periodontal.',
  category: 'Tecido Duro',
  subtopics: [
    {
      id: 'cemento-acelular',
      title: 'Cemento Acelular (Primário)',
      content: 'O cemento acelular forma uma capa delgada (20-50 μm) sobre a superfície radicular, especialmente no terço cervical e médio da raiz. É constituído por matriz extracelular mineralizada (65% mineral, 23% orgânica, 12% água) sem a presença de células. A matriz orgânica é composta principalmente por colágeno tipo I (90%) e proteoglicanos. As fibras colágenas do ligamento periodontal (fibras de Sharpey) inserem-se perpendicularmente na superfície do cemento, proporcionando ancoragem firme. Este tipo de cemento é depositado lentamente e de forma contínua ao longo da vida.',
      image: 'https://images.pexels.com/photos/4386458/pexels-photo-4386458.jpeg?auto=compress&cs=tinysrgb&w=600',
      structures: [
        {
          id: 'fibras-sharpey',
          name: 'Fibras de Sharpey',
          description: 'Fibras colágenas do ligamento periodontal inseridas no cemento',
          function: 'Ancoragem do dente ao osso alveolar',
          x: 30,
          y: 60
        },
        {
          id: 'matriz-mineralizada',
          name: 'Matriz Mineralizada',
          description: 'Matriz extracelular calcificada sem células',
          function: 'Proteção da dentina radicular',
          x: 60,
          y: 40
        }
      ]
    },
    {
      id: 'cemento-celular',
      title: 'Cemento Celular (Secundário)',
      content: 'O cemento celular localiza-se predominantemente no terço apical da raiz e nas furças de dentes multirradiculares, apresentando maior espessura (100-200 μm) que o cemento acelular. Contém cementócitos alojados em lacunas (cementoplastos) conectadas por canalículos, similar ao tecido ósseo. Os cementócitos são responsáveis pela manutenção da matriz cementária. Este tipo de cemento é depositado mais rapidamente, especialmente em resposta a estímulos funcionais ou reparativos. A deposição contínua de cemento celular compensa o desgaste oclusal, mantendo a dimensão vertical de oclusão.',
      image: 'https://images.pexels.com/photos/4386393/pexels-photo-4386393.jpeg?auto=compress&cs=tinysrgb&w=600',
      structures: [
        {
          id: 'cementocitos',
          name: 'Cementócitos',
          description: 'Células do cemento alojadas em lacunas (cementoplastos)',
          function: 'Manutenção da matriz cementária',
          x: 45,
          y: 50
        },
        {
          id: 'canaliculos',
          name: 'Canalículos',
          description: 'Canais que conectam as lacunas dos cementócitos',
          function: 'Nutrição e comunicação celular',
          x: 65,
          y: 35
        }
      ]
    },
    {
      id: 'juncao-cemento-esmalte',
      title: 'Junção Cemento-Esmalte',
      content: 'A junção cemento-esmalte (JCE) é a interface entre o esmalte coronário e o cemento radicular, localizada ao nível da linha cervical do dente. Esta região apresenta três padrões morfológicos principais: em 60% dos casos o cemento recobre ligeiramente o esmalte, em 30% há encontro direto entre cemento e esmalte, e em 10% existe um pequeno gap com exposição dentinária. A JCE é uma região crítica para a saúde periodontal, pois representa o limite entre o meio oral e o ambiente periodontal. Alterações nesta região podem predispor à sensibilidade dentinária e problemas periodontais.',
      image: 'https://images.pexels.com/photos/4386340/pexels-photo-4386340.jpeg?auto=compress&cs=tinysrgb&w=600',
      structures: [
        {
          id: 'linha-cervical',
          name: 'Linha Cervical',
          description: 'Limite anatômico entre coroa e raiz',
          function: 'Demarcação morfológica do dente',
          x: 50,
          y: 30
        },
        {
          id: 'interface-cemento-esmalte',
          name: 'Interface Cemento-Esmalte',
          description: 'Zona de transição entre tecidos mineralizados',
          function: 'Vedação do ambiente periodontal',
          x: 40,
          y: 45
        }
      ]
    }
  ]
};
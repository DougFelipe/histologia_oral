import { Theme } from '../../types';
import logo from '../../data/LOGO.png';

export const cementoTheme: Theme = {
  id: 'cemento',
  name: 'Cemento',
  status: 'complete',
  image: logo,
  description: 'Tecido mineralizado que recobre a superfície radicular e ancora as fibras do ligamento periodontal.',
  category: 'Tecido Duro',
  subtopics: [
    {
      id: 'cemento-acelular',
      title: 'Cemento Acelular (Primário)',
      content: 'O cemento acelular forma uma capa delgada (20-50 μm) sobre a superfície radicular, especialmente no terço cervical e médio da raiz. [...]',
      image: logo,
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
      content: 'O cemento celular localiza-se predominantemente no terço apical da raiz e nas furças de dentes multirradiculares, apresentando maior espessura [...].',
      image: logo,
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
      content: 'A junção cemento-esmalte (JCE) é a interface entre o esmalte coronário e o cemento radicular, localizada ao nível da linha cervical do dente [...].',
      image: logo,
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

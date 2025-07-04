import { Theme } from '../../types';
import logo from '../../data/LOGO.png';

export const palatoTheme: Theme = {
  id: 'palato',
  name: 'Palato',
  status: 'complete',
  image: logo,
  description: 'Tecido epitelial do palato duro com camadas bem definidas e estruturas especializadas.',
  category: 'Tecido Mole',
  subtopics: [
    {
      id: 'epitelio-estratificado',
      title: 'Epitélio Estratificado Pavimentoso Queratinizado',
      content: 'O epitélio estratificado pavimentoso queratinizado do palato duro é constituído por múltiplas camadas celulares que conferem proteção mecânica à cavidade oral. [...]',
      image: logo,
      structures: [
        {
          id: 'camada-basal',
          name: 'Camada Basal',
          description: 'Células cuboidais com núcleos grandes e basófilos',
          function: 'Regeneração e renovação epitelial contínua',
          x: 10,
          y: 80
        },
        {
          id: 'camada-espinhosa',
          name: 'Camada Espinhosa',
          description: 'Células poligonais com desmossomas proeminentes',
          function: 'Resistência mecânica e coesão tecidual',
          x: 45,
          y: 60
        },
        {
          id: 'camada-granulosa',
          name: 'Camada Granulosa',
          description: 'Células achatadas com grânulos de querato-hialina',
          function: 'Síntese de precursores da queratina',
          x: 65,
          y: 40
        },
        {
          id: 'camada-cornea',
          name: 'Camada Córnea',
          description: 'Células mortas queratinizadas sem núcleo',
          function: 'Proteção contra agressões mecânicas',
          x: 75,
          y: 20
        }
      ]
    },
    {
      id: 'lamina-propria',
      title: 'Lâmina Própria',
      content: 'A lâmina própria do palato é constituída por tecido conjuntivo denso não modelado [...]',
      image: logo,
      structures: [
        {
          id: 'regiao-papilar',
          name: 'Região Papilar',
          description: 'Tecido conjuntivo frouxo com papilas',
          function: 'Nutrição epitelial e ancoragem',
          x: 30,
          y: 70
        },
        {
          id: 'regiao-reticular',
          name: 'Região Reticular',
          description: 'Tecido conjuntivo denso não modelado',
          function: 'Suporte estrutural e resistência',
          x: 50,
          y: 85
        }
      ]
    },
    {
      id: 'glandulas-palatinas',
      title: 'Glândulas Palatinas',
      content: 'As glândulas palatinas são glândulas exócrinas tubuloacinares compostas, [...]',
      image: logo,
      structures: [
        {
          id: 'acinos-mucosos',
          name: 'Ácinos Mucosos',
          description: 'Células secretoras de mucina com citoplasma claro',
          function: 'Produção de muco para lubrificação',
          x: 40,
          y: 60
        },
        {
          id: 'ductos-excretores',
          name: 'Ductos Excretores',
          description: 'Ductos revestidos por epitélio estratificado',
          function: 'Condução da secreção à superfície',
          x: 70,
          y: 45
        }
      ]
    }
  ]
};

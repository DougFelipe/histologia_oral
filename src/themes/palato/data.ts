import { Theme } from '../../types';

export const palatoTheme: Theme = {
  id: 'palato',
  name: 'Palato',
  status: 'complete',
  image: 'https://images.pexels.com/photos/4386477/pexels-photo-4386477.jpeg?auto=compress&cs=tinysrgb&w=400',
  description: 'Tecido epitelial do palato duro com camadas bem definidas e estruturas especializadas.',
  category: 'Tecido Mole',
  subtopics: [
    {
      id: 'epitelio-estratificado',
      title: 'Epitélio Estratificado Pavimentoso Queratinizado',
      content: 'O epitélio estratificado pavimentoso queratinizado do palato duro é constituído por múltiplas camadas celulares que conferem proteção mecânica à cavidade oral. As células basais são cuboidais e apresentam intensa atividade mitótica, sendo responsáveis pela renovação constante do epitélio. A camada espinhosa apresenta células poligonais unidas por desmossomas, conferindo resistência mecânica. A camada granulosa contém grânulos de querato-hialina, precursores da queratina. A camada córnea superficial é composta por células mortas queratinizadas que descamam continuamente.',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600',
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
      content: 'A lâmina própria do palato é constituída por tecido conjuntivo denso não modelado, rico em fibras colágenas tipo I e fibras elásticas. Esta camada apresenta duas regiões distintas: a região papilar (superficial), que se projeta no epitélio formando as papilas conjuntivas, e a região reticular (profunda), mais densa e organizada. A lâmina própria contém vasos sanguíneos, vasos linfáticos, terminações nervosas e células do sistema imunológico. As papilas conjuntivas aumentam a superfície de contato entre epitélio e conjuntivo, facilitando a nutrição epitelial.',
      image: 'https://images.pexels.com/photos/4386330/pexels-photo-4386330.jpeg?auto=compress&cs=tinysrgb&w=600',
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
      content: 'As glândulas palatinas são glândulas exócrinas tubuloacinares compostas, predominantemente mucosas, localizadas na submucosa do palato duro e mole. Estas glândulas secretam mucina, uma glicoproteína que forma o muco, essencial para a lubrificação e proteção da mucosa oral. Os ácinos são compostos por células mucosas com citoplasma claro e núcleo basal achatado. Os ductos excretores são revestidos por epitélio estratificado e se abrem na superfície da mucosa palatina. A secreção é controlada pelo sistema nervoso autônomo parassimpático.',
      image: 'https://images.pexels.com/photos/4386435/pexels-photo-4386435.jpeg?auto=compress&cs=tinysrgb&w=600',
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

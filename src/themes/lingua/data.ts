import { Theme } from '../../types';

export const linguaTheme: Theme = {
  id: 'lingua',
  name: 'Língua',
  status: 'complete',
  image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=400',
  description: 'Órgão muscular especializado com papilas gustativas e estruturas sensoriais complexas.',
  category: 'Tecido Mole',
  subtopics: [
    {
      id: 'papilas-linguais',
      title: 'Papilas Linguais',
      content: 'As papilas linguais são projeções da mucosa lingual especializadas em diferentes funções. As papilas filiformes são as mais numerosas, cônicas e queratinizadas, conferindo aspereza à língua para auxiliar na preensão e manipulação dos alimentos. As papilas fungiformes têm formato de cogumelo e contêm botões gustativos. As papilas circunvaladas, em número de 7 a 12, são as maiores e estão dispostas em V na parte posterior da língua, contendo numerosos botões gustativos. As papilas foliadas localizam-se nas bordas laterais da língua.',
      image: 'https://images.pexels.com/photos/4386451/pexels-photo-4386451.jpeg?auto=compress&cs=tinysrgb&w=600',
      structures: [
        {
          id: 'papilas-filiformes',
          name: 'Papilas Filiformes',
          description: 'Papilas cônicas queratinizadas mais numerosas',
          function: 'Preensão e manipulação de alimentos',
          x: 35,
          y: 40
        },
        {
          id: 'papilas-fungiformes',
          name: 'Papilas Fungiformes',
          description: 'Papilas em formato de cogumelo com botões gustativos',
          function: 'Percepção gustativa',
          x: 60,
          y: 30
        }
      ]
    },
    {
      id: 'musculo-intrinseco',
      title: 'Músculo Intrínseco',
      content: 'O músculo intrínseco da língua é composto por fibras musculares estriadas esqueléticas orientadas em três direções principais: longitudinal (superior e inferior), transversal e vertical. Esta organização tridimensional única permite os movimentos complexos e precisos da língua necessários para a fala, deglutição e manipulação dos alimentos. As fibras longitudinais superiores encurtam a língua, as inferiores a deprimem, as transversais a estreitam e as verticais a achatam. Entre os feixes musculares encontram-se vasos sanguíneos, nervos e tecido conjuntivo de suporte.',
      image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=600',
      structures: [
        {
          id: 'fibras-longitudinais',
          name: 'Fibras Longitudinais',
          description: 'Fibras musculares orientadas no sentido ântero-posterior',
          function: 'Encurtamento e depressão da língua',
          x: 45,
          y: 50
        },
        {
          id: 'fibras-transversais',
          name: 'Fibras Transversais',
          description: 'Fibras musculares orientadas lateralmente',
          function: 'Estreitamento da língua',
          x: 25,
          y: 70
        }
      ]
    },
    {
      id: 'botoes-gustativos',
      title: 'Botões Gustativos',
      content: 'Os botões gustativos são órgãos sensoriais especializados na percepção do paladar, localizados principalmente nas papilas fungiformes, circunvaladas e foliadas. Cada botão gustativo contém 50-100 células sensoriais alongadas que se estendem da membrana basal até um poro gustativo na superfície. As células gustativas são renovadas continuamente a cada 7-10 dias. As células de suporte mantêm a estrutura do botão, enquanto as células basais servem como células-tronco. Os cinco sabores básicos (doce, salgado, azedo, amargo e umami) são detectados por diferentes tipos de receptores.',
      image: 'https://images.pexels.com/photos/4386320/pexels-photo-4386320.jpeg?auto=compress&cs=tinysrgb&w=600',
      structures: [
        {
          id: 'celulas-gustativas',
          name: 'Células Gustativas',
          description: 'Células sensoriais alongadas com microvilosidades',
          function: 'Detecção de estímulos gustativos',
          x: 50,
          y: 40
        },
        {
          id: 'poro-gustativo',
          name: 'Poro Gustativo',
          description: 'Abertura na superfície do botão gustativo',
          function: 'Entrada de substâncias químicas',
          x: 50,
          y: 20
        }
      ]
    }
  ]
};
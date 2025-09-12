import { Theme } from '../../types'

import imagem1 from './images/1.png'
import imagem3 from './images/3.png'
import imagem5 from './images/5.png'

export const polpaDentinaTheme: Theme = {
  id: 'polpa-dentina',
  name: 'Polpa-Dentina',
  status: 'complete',
  image: imagem1,
  description: 'Lorem ipsum dolor sit amet.',
  category: 'Tecido Duro',
  subtopics: [
    {
      id: 'polpa-dental',
      title: '🇧🇷 Polpa Dental\n🇬🇧 Dental Pulp\n🇪🇸 Pulpa Dental',
      content: 'Lorem ipsum dolor sit amet.',
      image: imagem3,
      structures: [
        {
          id: 'camada-granulosa-tomes',
          name: '1 - 🇧🇷 Camada granular de Tomes\n🇬🇧 Tome\'s granular layer\n🇪🇸 Capa granular de Tomes',
          description: 'Lorem ipsum dolor sit amet.',
          function: 'Lorem ipsum dolor sit amet.',
          x: undefined,
          y: undefined
        },
        {
          id: 'tubulos-dentinarios',
          name: '2 - 🇧🇷 Túbulos dentinários\n🇬🇧 Dentinal tubules\n🇪🇸 Túbulos dentinarios',
          description: 'Lorem ipsum dolor sit amet.',
          function: 'Lorem ipsum dolor sit amet.',
          x: undefined,
          y: undefined
        }
      ]
    },
    {
      id: 'dentina',
      title: '🇧🇷 Dentina\n🇬🇧 Dentin\n🇪🇸 Dentina',
      content: 'Lorem ipsum dolor sit amet.',
      image: imagem5,
      structures: [
        {
          id: 'dentina-interglobular',
          name: '1 - 🇧🇷 Dentina Interglobular\n🇬🇧 Interglobular Dentin\n🇪🇸 Dentina Interglobular',
          description: 'Lorem ipsum dolor sit amet.',
          function: 'Lorem ipsum dolor sit amet.',
          x: undefined,
          y: undefined
        },
        {
          id: 'dentina-globular',
          name: '2 - 🇧🇷 Dentina Globular\n🇬🇧 Globular Dentin\n🇪🇸 Dentina Globular',
          description: 'Lorem ipsum dolor sit amet.',
          function: 'Lorem ipsum dolor sit amet.',
          x: undefined,
          y: undefined
        }
      ]
    }
  ]
}

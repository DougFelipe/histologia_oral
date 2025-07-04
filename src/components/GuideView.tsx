import React from 'react';
import { ArrowLeft, MousePointer, Search, Eye, Grid3X3, Layers } from 'lucide-react';

interface GuideViewProps {
  onBack: () => void;
}

export default function GuideView({ onBack }: GuideViewProps) {
  const features = [
    {
      icon: Grid3X3,
      title: 'Explorar Temas',
      description: 'Navegue pelos 12 temas disponíveis usando o grid interativo na página inicial.',
      steps: [
        'Clique em qualquer card de tema para explorar',
        'Use os filtros para encontrar tipos específicos de tecido',
        'Temas completos têm ícone verde, em desenvolvimento têm ícone amarelo'
      ]
    },
    {
      icon: MousePointer,
      title: 'Legendas Interativas',
      description: 'Clique nos pontos azuis nas imagens para ver detalhes das estruturas.',
      steps: [
        'Localize os pontos azuis nas imagens histológicas',
        'Clique em qualquer ponto para ver informações detalhadas',
        'Use a lista de estruturas abaixo da imagem para navegação rápida'
      ]
    },
    {
      icon: Eye,
      title: 'Modos de Visualização',
      description: 'Escolha entre visualização por páginas ou rolagem contínua.',
      steps: [
        'Use o botão "Páginas" para navegar subtópico por subtópico',
        'Use o botão "Rolagem" para ver todos os subtópicos em sequência',
        'Navegue com as setas ou role a página conforme preferir'
      ]
    },
    {
      icon: Layers,
      title: 'Comparação de Estruturas',
      description: 'Compare duas estruturas lado a lado para identificar diferenças.',
      steps: [
        'Selecione duas estruturas nos menus dropdown',
        'Visualize as imagens lado a lado',
        'Leia a análise comparativa gerada automaticamente'
      ]
    },
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Use a barra de busca para encontrar estruturas específicas.',
      steps: [
        'Digite o nome da estrutura ou termo histológico',
        'Os resultados são filtrados em tempo real',
        'Combine busca com filtros para resultados mais precisos'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </button>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Modo de Usar</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Aprenda a navegar e aproveitar ao máximo todos os recursos do Atlas Virtual de Histologia Oral.
        </p>
      </div>

      <div className="space-y-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 text-sm font-medium rounded-full flex items-center justify-center mr-3 mt-0.5">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">Dicas Importantes</h3>
        <ul className="text-amber-700 space-y-1">
          <li>• Use o modo de comparação para estudar diferenças entre tecidos normais e patológicos</li>
          <li>• Explore todas as legendas interativas para compreender completamente cada estrutura</li>
          <li>• Consulte o glossário sempre que encontrar termos desconhecidos</li>
          <li>• O conteúdo é constantemente atualizado - verifique periodicamente por novos temas</li>
        </ul>
      </div>
    </div>
  );
}
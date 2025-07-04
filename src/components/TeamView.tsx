import React from 'react';
import { ArrowLeft, GraduationCap, Award, Mail } from 'lucide-react';
import { TeamMember } from '../types';
import SEOHead, { generateTeamStructuredData } from './SEOHead';

interface TeamViewProps {
  members: TeamMember[];
  onBack: () => void;
}

export default function TeamView({ members, onBack }: TeamViewProps) {
  // SEO data for team page
  const seoTitle = "Equipe - Atlas Virtual de Histologia Oral";
  const seoDescription = `Conheça a equipe multidisciplinar de ${members.length} especialistas em histologia oral e tecnologia educacional responsável pelo desenvolvimento do Atlas Virtual.`;
  const seoKeywords = "equipe atlas histologia, especialistas histologia oral, educação médica, desenvolvimento educacional, tecnologia educacional";
  const structuredData = generateTeamStructuredData(members);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url="https://atlas-histologia-oral.com/team"
        type="article"
        structuredData={structuredData}
      />
      
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>

        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossa Equipe</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça os {members.length} profissionais dedicados que tornaram este atlas uma realidade, 
            combinando expertise científica e tecnológica para criar uma ferramenta educacional de excelência.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <article key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={member.photo}
                  alt={`Foto de ${member.name} - ${member.formation}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              <div className="p-6">
                <header className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h2>
                  
                  <div className="flex items-start mb-3">
                    <GraduationCap className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{member.formation}</p>
                  </div>

                  {member.specialization && (
                    <div className="flex items-start mb-3">
                      <Award className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{member.specialization}</p>
                    </div>
                  )}
                </header>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Contribuição</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.contribution}</p>
                </div>

                <footer className="mt-4 pt-4 border-t border-gray-100">
                  <button className="flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium">
                    <Mail className="h-4 w-4 mr-1" />
                    Contato
                  </button>
                </footer>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-amber-800 mb-2">Sobre a Equipe</h2>
          <p className="text-amber-700 leading-relaxed">
            Este projeto surgiu como uma iniciativa de extensão universitária vinculada à Universidade Federal do Rio Grande do Norte (UFRN), 
            reunindo docentes, discentes e profissionais das áreas de Histologia, Odontologia, Biomedicina e Engenharia de Software. 
            A proposta visa integrar conhecimento científico com recursos interativos, promovendo um ambiente de aprendizagem acessível e de alta qualidade. 
          </p>
        </section>


        <section className="mt-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-amber-600">{members.length}</div>
              <div className="text-sm text-gray-600">Especialistas</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-amber-600">4</div>
              <div className="text-sm text-gray-600">Áreas de Expertise</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-amber-600">12</div>
              <div className="text-sm text-gray-600">Temas Planejados</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-amber-600">2+</div>
              <div className="text-sm text-gray-600">Anos de Desenvolvimento</div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

import React from 'react';
import { Theme, GlossaryTerm, TeamMember } from '../types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  theme?: Theme;
  structuredData?: any;
}

export default function SEOHead({
  title = "Atlas Virtual de Histologia Oral - Estudo Interativo de Estruturas Histológicas",
  description = "Atlas educacional interativo para estudo de histologia oral com imagens de alta qualidade, legendas interativas e comparações detalhadas.",
  keywords = "histologia oral, atlas virtual, educação médica, odontologia, epitélio estratificado",
  image = "https://images.pexels.com/photos/4386477/pexels-photo-4386477.jpeg?auto=compress&cs=tinysrgb&w=1200",
  url = "https://atlas-histologia-oral.com",
  type = "website",
  theme,
  structuredData
}: SEOHeadProps) {
  
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    
    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'dynamic-structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
  }, [title, description, keywords, image, url, type, structuredData]);
  
  return null; // This component doesn't render anything
}

// Helper functions for generating structured data
export const generateThemeStructuredData = (theme: Theme) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": `${theme.name} - Atlas Virtual de Histologia Oral`,
  "description": theme.description,
  "url": `https://atlas-histologia-oral.com/theme/${theme.id}`,
  "inLanguage": "pt-BR",
  "isAccessibleForFree": true,
  "educationalLevel": "HigherEducation",
  "about": {
    "@type": "MedicalCondition",
    "name": theme.name,
    "description": theme.description,
    "bodyLocation": "Cavidade Oral"
  },
  "mainEntity": {
    "@type": "LearningResource",
    "name": theme.name,
    "description": theme.description,
    "educationalUse": "instruction",
    "interactivityType": "active",
    "learningResourceType": "interactive content",
    "teaches": theme.subtopics.map(subtopic => subtopic.title),
    "image": {
      "@type": "ImageObject",
      "url": theme.image,
      "caption": `Imagem histológica de ${theme.name}`,
      "description": theme.description
    }
  },
  "hasPart": theme.subtopics.map(subtopic => ({
    "@type": "Article",
    "name": subtopic.title,
    "description": subtopic.content.substring(0, 200) + "...",
    "image": subtopic.image || theme.image
  }))
});

export const generateGlossaryStructuredData = (terms: GlossaryTerm[]) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Glossário de Histologia Oral",
  "description": "Definições de termos técnicos em histologia oral para estudantes e profissionais da área médica e odontológica",
  "url": "https://atlas-histologia-oral.com/glossary",
  "inLanguage": "pt-BR",
  "hasDefinedTerm": terms.map(term => ({
    "@type": "DefinedTerm",
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": term.category
    }
  }))
});

export const generateTeamStructuredData = (members: TeamMember[]) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Equipe Atlas Virtual de Histologia Oral",
  "description": "Equipe multidisciplinar de especialistas em histologia oral e tecnologia educacional",
  "url": "https://atlas-histologia-oral.com/team",
  "member": members.map(member => ({
    "@type": "Person",
    "name": member.name,
    "image": member.photo,
    "description": member.contribution,
    "jobTitle": member.formation,
    "knowsAbout": member.specialization || "Histologia Oral",
    "affiliation": {
      "@type": "Organization",
      "name": "Atlas Virtual de Histologia Oral"
    }
  }))
});
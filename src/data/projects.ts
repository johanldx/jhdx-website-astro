export const projects = [
  {
    id: 'unschema-graph',
    name: 'unschema-graph',
    featured: true,
    description: {
      en: 'Type-safe utilities for building and managing Schema.org JSON-LD graphs in Astro.',
      fr: 'Des outils typés pour construire et gérer des graphes Schema.org en JSON-LD avec Astro.',
    },
    longDescription: {
      en: 'Designed to make structured data easier to compose, reuse and maintain across modern static websites.',
      fr: 'Le projet vise à rendre les données structurées plus simples à composer, réutiliser et maintenir dans des sites statiques modernes.',
    },
    tags: ['TypeScript', 'Astro', 'Schema.org', 'JSON-LD'],
    links: {
      docs: 'https://unschema-graph.jhdx.dev/',
      github: 'https://github.com/johanldx/unschema-graph',
      npm: 'https://www.npmjs.com/package/@unschema-graph/astro',
    },
    repository: 'johanldx/unschema-graph',
    packageName: '@unschema-graph/astro',
    fallback: { stars: null, version: '0.10.0', releaseDate: null },
  },
] as const;

export type Project = (typeof projects)[number];

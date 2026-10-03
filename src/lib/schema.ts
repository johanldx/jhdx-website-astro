import {
  BreadcrumbList,
  ItemList,
  Person,
  ProfilePage,
  WebSite,
} from '@unschema-graph/astro';
import type { CollectionEntry } from 'astro:content';
import { socials } from '../data/socials';
import type { Lang } from '../data/site';
import { site } from '../data/site';
import { notePath } from './i18n';

export function baseEntities(lang: Lang) {
  const person = Person({
    '@id': '/#person',
    name: 'Johan Ledoux',
    givenName: 'Johan',
    familyName: 'Ledoux',
    jobTitle: 'Fullstack Product Engineer',
    url: '/',
    image: 'https://github.com/johanldx.png',
    sameAs: socials.map((social) => social.href),
  });
  const website = WebSite({
    '@id': '/#website',
    name: 'Johan Ledoux',
    url: '/',
    description: site.description[lang],
    inLanguage: lang,
    publisher: '/#person',
  });
  return { person, website };
}

export function homeSchema(lang: Lang) {
  const { person, website } = baseEntities(lang);
  const path = lang === 'fr' ? '/fr/' : '/';
  const profilePage = ProfilePage({
    '@id': `${path}#profile`,
    url: path,
    name: lang === 'fr' ? 'Johan Ledoux — Profil' : 'Johan Ledoux — Profile',
    description: site.description[lang],
    inLanguage: lang,
    mainEntity: '/#person',
  });
  const software = {
    '@type': 'SoftwareSourceCode',
    '@id': '/#unschema-graph',
    name: 'unschema-graph',
    description:
      lang === 'fr'
        ? 'Des outils typés pour construire et gérer des graphes Schema.org en JSON-LD avec Astro.'
        : 'Type-safe utilities for building and managing Schema.org JSON-LD graphs in Astro.',
    codeRepository: 'https://github.com/johanldx/unschema-graph',
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'Astro',
    author: { '@id': '/#person' },
    license: 'https://github.com/johanldx/unschema-graph/blob/main/LICENSE',
    url: 'https://unschema-graph.jhdx.dev/',
  };
  return [person, website, profilePage, software];
}

export function noteSchema(note: CollectionEntry<'notes'>) {
  const { person, website } = baseEntities(note.data.lang);
  const path = notePath(note);
  const isFr = note.data.lang === 'fr';
  const article = {
    '@type': 'BlogPosting',
    '@id': `${path}#article`,
    headline: note.data.title,
    description: note.data.description,
    datePublished: note.data.publishedAt.toISOString(),
    dateModified: (note.data.updatedAt ?? note.data.publishedAt).toISOString(),
    inLanguage: note.data.lang,
    author: { '@id': '/#person' },
    isPartOf: { '@id': '/#website' },
    mainEntityOfPage: path,
    keywords: note.data.tags,
  };
  const breadcrumbs = BreadcrumbList({
    '@id': `${path}#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isFr ? 'Accueil' : 'Home',
        item: isFr ? '/fr/' : '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Notes',
        item: isFr ? '/fr/notes/' : '/notes/',
      },
      { '@type': 'ListItem', position: 3, name: note.data.title, item: path },
    ],
  });
  return [person, website, article, breadcrumbs];
}

export function notesIndexSchema(
  lang: Lang,
  notes: CollectionEntry<'notes'>[],
) {
  const { person, website } = baseEntities(lang);
  const isFr = lang === 'fr';
  const path = isFr ? '/fr/notes/' : '/notes/';
  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${path}#collection`,
    url: path,
    name: isFr ? 'Notes — Johan Ledoux' : 'Notes — Johan Ledoux',
    description: site.description[lang],
    inLanguage: lang,
    isPartOf: { '@id': '/#website' },
    mainEntity: { '@id': `${path}#notes-list` },
    breadcrumb: { '@id': `${path}#breadcrumbs` },
  };
  const breadcrumbs = BreadcrumbList({
    '@id': `${path}#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isFr ? 'Accueil' : 'Home',
        item: isFr ? '/fr/' : '/',
      },
      { '@type': 'ListItem', position: 2, name: 'Notes', item: path },
    ],
  });
  const itemList = ItemList({
    '@id': `${path}#notes-list`,
    name: isFr ? 'Notes et articles' : 'Notes and articles',
    numberOfItems: notes.length,
    itemListElement: notes.map((note, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: note.data.title,
      url: notePath(note),
    })),
  });
  return [person, website, collectionPage, breadcrumbs, itemList];
}

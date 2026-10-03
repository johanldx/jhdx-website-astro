import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../data/site';

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function noteSlug(note: CollectionEntry<'notes'>) {
  const suffix = `.${note.data.lang}`;
  if (!note.id.endsWith(suffix)) {
    throw new Error(
      `Note ${note.id} must have the .${note.data.lang} filename suffix`,
    );
  }
  return note.id.slice(0, -suffix.length);
}

export function notePath(note: CollectionEntry<'notes'>) {
  return note.data.lang === 'fr'
    ? `/fr/notes/${noteSlug(note)}/`
    : `/notes/${noteSlug(note)}/`;
}

export function findTranslation(
  note: CollectionEntry<'notes'>,
  notes: CollectionEntry<'notes'>[],
) {
  if (!note.data.translationKey) return undefined;
  return notes.find(
    (candidate) =>
      candidate.data.translationKey === note.data.translationKey &&
      candidate.data.lang !== note.data.lang,
  );
}

export function isPublished(note: CollectionEntry<'notes'>) {
  return import.meta.env.DEV || !note.data.draft;
}

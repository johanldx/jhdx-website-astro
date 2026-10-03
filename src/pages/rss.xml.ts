import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { isPublished, notePath } from '../lib/i18n';
export async function GET(context: { site?: URL }) {
  const notes = (await getCollection('notes', isPublished)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
  return rss({
    title: 'Johan Ledoux — Notes',
    description: site.description.en,
    site: context.site ?? new URL(site.url),
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishedAt,
      link: notePath(note),
      categories: note.data.tags,
    })),
    customData: '<language>en-fr</language>',
  });
}

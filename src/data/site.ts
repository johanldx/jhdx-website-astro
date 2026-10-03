export const site = {
  name: 'Johan Ledoux',
  url: 'https://jhdx.dev',
  defaultLang: 'en',
  description: {
    en: 'Fullstack Product Engineer building software products, developer tools and infrastructure.',
    fr: "Fullstack Product Engineer spécialisé dans la conception de logiciels, d'outils pour développeurs et d'infrastructures.",
  },
} as const;

export type Lang = keyof typeof site.description;

export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/* ---------- Dictionary shape ---------- */

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
    locale: string;
  };
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    cta: string;
    availableForProjects: string;
  };
  hero: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    label: string;
    subText: string;
    scroll: string;
  };
  marquee: string[];
  services: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    items: {
      num: string;
      title: string;
      desc: string;
      tags: string[];
    }[];
  };
  work: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    projects: {
      id: string;
      title: string;
      category: string;
      year: string;
      desc: string;
    }[];
    footer: string;
  };
  contact: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    fullName: string;
    email: string;
    phone: string;
    projectBrief: string;
    placeholder: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
    required: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      messageRequired: string;
    };
    sendMessage: string;
    sending: string;
    successTitle: string;
    successSub: string;
    sendAnother: string;
    emailLabel: string;
    responseTime: string;
    responseValue: string;
    dataLabel: string;
    dataText: string;
    errorDefault: string;
    errorNetwork: string;
    qa: {
      label: string;
      items: {
        q: string;
        a: string;
      }[];
    };
  };
  footer: {
    ctaLabel: string;
    ctaHeadingLine1: string;
    ctaHeadingLine2: string;
    ctaBtn: string;
    navLabel: string;
    socialLabel: string;
    copyright: string;
    tagline: string;
  };
  servicesPage: {
    title: string;
    description: string;
    heroTitle1: string;
    heroTitle2: string;
    intro1: string;
    intro2: string;
    highlight: string;
    cards: {
      number: string;
      title: string;
      desc: string;
      tags: string[];
    }[];
    manifesto: {
      title: string;
      text: string;
    };
  };
  aboutPage: {
    title: string;
    description: string;
    heading: string;
    p1: string;
    p2: string;
  };
  contactPage: {
    title: string;
    description: string;
  };
}

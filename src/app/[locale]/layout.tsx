import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import Noise from '@/components/Noise';
import Cursor from '@/components/Cursor';
import { getDictionary, locales, isRtl, type Locale } from '@/i18n';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    metadataBase: new URL('https://viffey.com'),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: ['Digital Agency Morocco', 'Web Design Morocco', 'Creative Agency Casablanca', 'Brand Strategy', 'Web Development', 'Viffey', 'SEO Morocco', 'Premium Design Agency'],
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `https://viffey.com/${locale}`,
      siteName: 'Viffey',
      locale: dict.meta.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.twitterTitle,
      description: dict.meta.twitterDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      languages: {
        en: '/en',
        fr: '/fr',
        ar: '/ar',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body style={{ fontFamily: 'var(--font-body)' }}>
        <Noise />
        <Cursor />
        {children}
      </body>
    </html>
  );
}

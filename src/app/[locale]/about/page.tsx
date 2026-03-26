import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getDictionary, type Locale } from '@/i18n';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.aboutPage.title,
    description: dict.aboutPage.description,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <Nav dict={dict} locale={locale} />
      <div style={{ padding: 'clamp(10rem, 20vh, 15rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 10vh, 8rem)', maxWidth: '1440px', margin: '0 auto', minHeight: '65vh' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {dict.aboutPage.heading}
        </h1>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(240, 237, 232, 0.6)', lineHeight: 1.8, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>{dict.aboutPage.p1}</p>
          <p>{dict.aboutPage.p2}</p>
        </div>
      </div>
      <Footer dict={dict} locale={locale} />
    </main>
  );
}

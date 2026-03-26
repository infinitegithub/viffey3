import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
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
    title: dict.contactPage.title,
    description: dict.contactPage.description,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <Nav dict={dict} locale={locale} />
      <div style={{ paddingTop: 'clamp(6rem, 12vh, 10rem)', minHeight: '70vh' }}>
        <Contact dict={dict} />
      </div>
      <Footer dict={dict} locale={locale} />
    </main>
  );
}

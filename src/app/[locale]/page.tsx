import Nav       from '@/components/Nav';
import Hero      from '@/components/Hero';
import Marquee   from '@/components/Marquee';
import Services  from '@/components/Services';
import Work      from '@/components/Work';
import Contact   from '@/components/Contact';
import Footer    from '@/components/Footer';
import { getDictionary, type Locale } from '@/i18n';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <Nav dict={dict} locale={locale} />
      <Hero dict={dict} />
      <Marquee dict={dict} />
      <Services dict={dict} />
      <Work dict={dict} />
      <Contact dict={dict} hideQA={true} />
      <Footer dict={dict} locale={locale} />
    </main>
  );
}

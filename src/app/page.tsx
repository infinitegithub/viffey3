import Nav       from '@/components/Nav';
import Hero      from '@/components/Hero';
import Marquee   from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import Services  from '@/components/Services';
import Work      from '@/components/Work';
import Contact   from '@/components/Contact';
import Footer    from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}

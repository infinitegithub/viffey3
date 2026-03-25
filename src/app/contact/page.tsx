import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Contact — Viffey',
  description: 'Get in touch to start building your bespoke digital platform.',
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      {/* Page Layout Wrapper */}
      <div style={{ paddingTop: 'clamp(6rem, 12vh, 10rem)', minHeight: '70vh' }}>
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

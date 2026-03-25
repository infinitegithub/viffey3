import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Services — Viffey',
  description: 'Our 3 core services carefully curated for modern businesses.',
};

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      {/* Page Layout Wrapper */}
      <div style={{ padding: 'clamp(10rem, 20vh, 15rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 10vh, 8rem)', maxWidth: '1440px', margin: '0 auto', minHeight: '65vh' }}>
         <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
             Our Services.
         </h1>
         <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(240, 237, 232, 0.6)', lineHeight: 1.8, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
                [The homepage gives a fantastic high-level overview. This dedicated Services page (src/app/services/page.tsx) is where you drop your complex processes, tech stacks, and in-depth methodologies.]
            </p>
            <p>
                [Consider breaking this section out into Web Design, Branding, and Development with comprehensive deliverable lists for each phase to convert higher-ticket clients.]
            </p>
         </div>
      </div>
      <Footer />
    </main>
  );
}
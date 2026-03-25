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
                We offer comprehensive solutions to help you succeed online:
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <li>
                <strong style={{ color: 'var(--white)', display: 'block', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Online Presence</strong>
                Whether it is a high-converting landing page, a full-fledged store, or whatever your idea is, we can help bring it to life.
              </li>
              <li>
                <strong style={{ color: 'var(--white)', display: 'block', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Hosting & Setup</strong>
                We handle the technical heavy lifting. We can host your platform remotely on our robust infrastructure or help you set it up locally.
              </li>
              <li>
                <strong style={{ color: 'var(--white)', display: 'block', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Automations & AI</strong>
                Enhance your business with cutting-edge AI and automations. We build custom solutions, automated workflows, and even specialized trading bots.
              </li>
            </ul>
         </div>
      </div>
      <Footer />
    </main>
  );
}

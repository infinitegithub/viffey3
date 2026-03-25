import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Manifesto — Viffey',
  description: 'Most agencies chase trends. We study what lasts.',
};

export default function ManifestoPage() {
  return (
    <main>
      <Nav />
      {/* Page Layout Wrapper */}
      <div style={{ padding: 'clamp(10rem, 20vh, 15rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 10vh, 8rem)', maxWidth: '1440px', margin: '0 auto', minHeight: '65vh' }}>
         <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
             The Manifesto.
         </h1>
         <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(240, 237, 232, 0.6)', lineHeight: 1.8, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
                <strong>Most agencies chase trends. We study what lasts. Then we make it move.</strong>
            </p>
            <p>
                [The manifesto establishes authority. Use this space inside src/app/manifesto/page.tsx to define exactly what Viffey stands against and what it fights for. Expand on your 7+ Years of craft and philosophies.]
            </p>
            <p>
                [This template is inherently bound to your digital agency aesthetics. Add H2 subheaders, images, or longer paragraphs here.]
            </p>
         </div>
      </div>
      <Footer />
    </main>
  );
}
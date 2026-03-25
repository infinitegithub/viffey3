import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us — Viffey',
  description: 'Learn more about Viffey, our team, and our engineering philosophy.',
};

export default function AboutPage() {
  return (
    <main>
      <Nav />
      {/* Page Layout Wrapper */}
      <div style={{ padding: 'clamp(10rem, 20vh, 15rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 10vh, 8rem)', maxWidth: '1440px', margin: '0 auto', minHeight: '65vh' }}>
         <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
             About Viffey.
         </h1>
         <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(240, 237, 232, 0.6)', lineHeight: 1.8, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
                [Your expanded About Us story goes here, this is a dedicated placeholder. You can describe your origin story, your core team, and your broader strategy.]
            </p>
            <p>
                [This page inherits the exact premium noise profiles, fonts, cursor, and global styles as the front page. Simply edit this file explicitly in src/app/about/page.tsx to build out the Viffey story.]
            </p>
         </div>
      </div>
      <Footer />
    </main>
  );
}
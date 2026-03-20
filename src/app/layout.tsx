import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Noise from '@/components/Noise';
import Cursor from '@/components/Cursor';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Viffey — Digital Agency',
  description: 'We design and build digital experiences that move. Web, Branding, Strategy.',
  openGraph: {
    title: 'Viffey — Digital Agency',
    description: 'We design and build digital experiences that move.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-display: ${cormorantGaramond.style.fontFamily}, Georgia, serif;
            --font-body: ${spaceGrotesk.style.fontFamily}, system-ui, sans-serif;
          }
        `}} />
        <Noise />
        <Cursor />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Noise from '@/components/Noise';
import Cursor from '@/components/Cursor';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://viffey.com'),
  title: 'Viffey — Leading Digital Agency in Morocco',
  description: 'Viffey is a premium digital agency in Morocco specializing in web design, branding, and development. We build extraordinary experiences that move.',
  keywords: ['Digital Agency Morocco', 'Web Design Morocco', 'Creative Agency Casablanca', 'Brand Strategy', 'Web Development', 'Viffey', 'SEO Morocco', 'Premium Design Agency'],
  openGraph: {
    title: 'Viffey — Premium Digital Agency in Morocco',
    description: 'We design and build digital experiences that move. Specializing in Web, Branding, and Strategy.',
    url: 'https://viffey.com',
    siteName: 'Viffey',
    locale: 'en_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viffey — Premium Digital Agency in Morocco',
    description: 'We design and build digital experiences that move.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body style={{ fontFamily: 'var(--font-body)' }}>
        <Noise />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
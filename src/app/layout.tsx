import type { Metadata } from 'next';
import './globals.css';
import Noise from '@/components/Noise';
import Cursor from '@/components/Cursor';

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
      <body>
        <Noise />
        <Cursor />
        {children}
      </body>
    </html>
  );
}

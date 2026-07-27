import { Inter, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

// Using Plus_Jakarta_Sans / Satoshi for geometric high-impact headings
export const satoshi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-satoshi',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

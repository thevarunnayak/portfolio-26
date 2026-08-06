import { Inter, Geist_Mono, Plus_Jakarta_Sans, Bitter, Fascinate } from 'next/font/google';

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

export const satoshi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-satoshi',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const bitter = Bitter({
  subsets: ['latin'],
  variable: '--font-bitter',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const fascinate = Fascinate({
  subsets: ['latin'],
  variable: '--font-fascinate',
  weight: '400',
  display: 'swap',
});

import type { Metadata, Viewport } from 'next';
import { satoshi, inter, geistMono, bitter, fascinate } from '@/lib/fonts';
import { siteConfig } from '@/content/site';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { CursorProvider } from '@/features/cursor/cursor-context';
import { CustomCursor } from '@/features/cursor/custom-cursor';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://varunnayak.com'),
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: `${siteConfig.role} & ${siteConfig.subRole}. ${siteConfig.tagline}`,
  icons: {
    apple: [{ url: '/images/prof.jpg', sizes: '800x800', type: 'image/jpeg' }],
  },
  keywords: [
    'Software Engineer',
    'Angular',
    'React',
    'Next.js 16',
    'React Native',
    'TypeScript',
    'Design Systems',
    'Varun Nayak'
  ],
  authors: [{ name: siteConfig.name, url: 'https://github.com/thevarunnayak' }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://varunnayak.com',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    creator: '@varunnayak',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${inter.variable} ${geistMono.variable} ${bitter.variable} ${fascinate.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/images/prof.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider>
          <SmoothScrollProvider>
            <CursorProvider>
              <CustomCursor />
              {children}
            </CursorProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { satoshi, inter, geistMono } from '@/lib/fonts';
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
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: `${siteConfig.role} & ${siteConfig.subRole}. ${siteConfig.tagline}`,
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
  authors: [{ name: siteConfig.name, url: 'https://github.com/varunnayak' }],
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
      className={`${satoshi.variable} ${inter.variable} ${geistMono.variable}`}
    >
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

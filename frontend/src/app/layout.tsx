import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'FloraVita | Bağırsak Sağlığı Uzmanı',
    template: '%s | FloraVita',
  },
  description:
    'FloraVita ile bağırsak sağlığınızı doğal yollarla destekleyin. Probiyotik, prebiyotik ve sindirim enzymleri ile sağlıklı bir yaşam.',
  keywords: [
    'probiyotik',
    'prebiyotik',
    'bağırsak sağlığı',
    'sindirim',
    'mikrobiyota',
    'gut health',
    'FloraVita',
  ],
  authors: [{ name: 'FloraVita' }],
  creator: 'FloraVita',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'FloraVita',
    title: 'FloraVita | Bağırsak Sağlığı Uzmanı',
    description: 'FloraVita ile bağırsak sağlığınızı doğal yollarla destekleyin.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#2C3E35',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#4A7C59', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}

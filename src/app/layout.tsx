// File: src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Energy Dashboard - Smart Energy Management',
    template: '%s | Energy Dashboard'
  },
  description: 'Comprehensive energy monitoring and management system with real-time analytics, detailed reporting, and administrative controls.',
  keywords: ['energy', 'dashboard', 'monitoring', 'analytics', 'management', 'real-time'],
  authors: [{ name: 'Energy Dashboard Team' }],
  creator: 'Energy Management Solutions',
  publisher: 'Energy Dashboard',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {/* Main App Content */}
        <div id="main-content">
          {children}
        </div>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            // Prevent flash of unstyled content
                            document.documentElement.classList.add('js-enabled');
                            
                            // Simple error boundary for development
                            window.addEventListener('error', function(e) {
                                console.error('Global error:', e.error);
                            });
                            
                            window.addEventListener('unhandledrejection', function(e) {
                                console.error('Unhandled promise rejection:', e.reason);
                            });
                        `
          }}
        />
      </body>
    </html>
  )
}
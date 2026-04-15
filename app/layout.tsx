import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { ThemeProvider } from '@/context/ThemeContext'

export const metadata: Metadata = {
  title: 'Luxe Haven - Premium Luxury Hotel',
  description: 'Experience unparalleled luxury at Luxe Haven. Premium accommodations, world-class amenities, and exceptional service.',
  keywords: 'luxury hotel, premium accommodation, spa, fine dining, resort',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" data-scroll-behavior="smooth">
      <body className="bg-luxury-dark text-white transition-colors">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
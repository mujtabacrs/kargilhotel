import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { ThemeProvider } from '@/context/ThemeContext'
import SmoothScroll from '@/components/ui/SmoothScroll'

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className="bg-luxury-dark text-white transition-colors antialiased">
        <ThemeProvider>
          <SmoothScroll>
            <ClientLayout>{children}</ClientLayout>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-luxury-dark text-gray-900 dark:text-white transition-colors">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
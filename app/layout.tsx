import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    <html lang="en">
      <body className="bg-white dark:bg-luxury-dark text-gray-900 dark:text-white transition-colors">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
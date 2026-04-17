'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="relative" style={{ position: 'relative' }}>{children}</main>
      <Footer />
    </>
  )
}
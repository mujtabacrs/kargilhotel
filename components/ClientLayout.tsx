'use client'

import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Only access theme after component is mounted
  const themeContext = mounted ? useTheme() : null
  const theme = themeContext?.theme || 'dark'
  const toggleTheme = themeContext?.toggleTheme || (() => {})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book Now', href: '/booking', isButton: true },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-luxury-charcoal/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-serif font-bold text-gradient"
            >
              Luxe Haven
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  item.isButton
                    ? 'btn-luxury text-sm'
                    : 'text-gray-800 dark:text-white hover:text-luxury-gold transition-colors duration-300 font-medium'
                }
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-luxury-charcoal flex items-center justify-center text-gray-800 dark:text-luxury-gold hover:bg-gray-300 dark:hover:bg-luxury-gold/20 transition-all duration-300 border-2 border-gray-300 dark:border-luxury-gold/30"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Theme Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-luxury-charcoal flex items-center justify-center text-gray-800 dark:text-luxury-gold border-2 border-gray-300 dark:border-luxury-gold/30"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              </motion.button>
            )}

            <button
              className="text-gray-800 dark:text-white hover:text-luxury-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-luxury-charcoal/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block ${
                    item.isButton
                      ? 'btn-luxury text-center'
                      : 'text-gray-800 dark:text-white hover:text-luxury-gold transition-colors duration-300 font-medium'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
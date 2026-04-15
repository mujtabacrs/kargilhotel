'use client'

import { motion } from 'framer-motion'
import DNAHelixGallery from '@/components/gallery/DNAHelixGallery'

export default function Gallery() {
  // Gallery images data
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Ocean View Suite',
      category: 'Rooms'
    },
    {
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Infinity Pool',
      category: 'Amenities'
    },
    {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Spa Sanctuary',
      category: 'Wellness'
    },
    {
      src: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Gourmet Restaurant',
      category: 'Dining'
    },
    {
      src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Private Beach',
      category: 'Outdoor'
    },
    {
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Luxury Lobby',
      category: 'Interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Presidential Suite',
      category: 'Rooms'
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Fine Dining',
      category: 'Dining'
    },
    {
      src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Wellness Center',
      category: 'Wellness'
    },
    {
      src: 'https://images.unsplash.com/photo-1551524164-6cf2ac531400?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Mountain Adventures',
      category: 'Outdoor'
    },
    {
      src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Event Spaces',
      category: 'Events'
    },
    {
      src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Grand Ballroom',
      category: 'Events'
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Hero Section */}
      <section className="relative py-24 text-center bg-gradient-to-b from-luxury-dark to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient mb-6">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-4">
              Experience our luxury resort through an immersive 3D journey
            </p>
            <p className="text-sm text-gray-400">
              Scroll to explore • Hover to interact • Click to view fullscreen
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </section>

      {/* DNA Helix Gallery */}
      <DNAHelixGallery images={galleryImages} />

      {/* Bottom Section */}
      <section className="relative py-16 bg-gradient-to-t from-luxury-dark to-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Book your stay and create unforgettable memories at Luxe Haven
            </p>
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-luxury inline-block text-lg px-12 py-4"
            >
              Book Your Stay
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const images = [
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

  const rotateLeft = () => {
    setRotation(rotation + 360 / images.length)
  }

  const rotateRight = () => {
    setRotation(rotation - 360 / images.length)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-luxury-dark">
      {/* Hero Section */}
      <section className="py-24 text-center bg-gray-50 dark:bg-luxury-charcoal">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient mb-6">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Immerse yourself in the visual splendor of Luxe Haven
          </p>
        </motion.div>
      </section>

      {/* Circular Carousel Gallery */}
      <section className="py-16 bg-gray-50 dark:bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            className="relative h-[700px] md:h-[800px] flex items-center justify-center"
          >
            {/* Circular Container */}
            <div className="relative w-full h-full max-w-5xl mx-auto">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                {images.map((image, index) => {
                  const angle = (index / images.length) * 360
                  const radius = 280 // Distance from center
                  const angleRad = (angle * Math.PI) / 180
                  const x = Math.sin(angleRad) * radius
                  const y = -Math.cos(angleRad) * radius
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="absolute top-1/2 left-1/2 cursor-pointer"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(-${rotation}deg)`,
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, zIndex: 10 }}
                        className="relative w-40 h-32 md:w-56 md:h-40 rounded-xl overflow-hidden glass shadow-2xl group border-2 border-gray-200 dark:border-gray-700"
                      >
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-serif font-semibold text-sm md:text-lg mb-1">
                            {image.title}
                          </h3>
                          <p className="text-luxury-gold text-xs md:text-sm">
                            {image.category}
                          </p>
                        </div>

                        {/* Border Glow */}
                        <div className="absolute inset-0 border-2 border-luxury-gold/0 group-hover:border-luxury-gold/70 rounded-xl transition-all duration-300" />
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Center Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 bg-white dark:bg-luxury-dark rounded-full flex items-center justify-center glass shadow-2xl border-4 border-luxury-gold/40">
                <span className="text-3xl md:text-4xl font-serif font-bold text-gradient">
                  LH
                </span>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-30">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={rotateLeft}
                className="w-14 h-14 bg-white dark:bg-luxury-charcoal rounded-full flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all duration-300 shadow-xl glass border-2 border-gray-200 dark:border-gray-700"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRotation(rotation + 360)}
                className="w-14 h-14 bg-luxury-gold rounded-full flex items-center justify-center text-white hover:bg-luxury-gold/80 transition-all duration-300 shadow-xl"
              >
                <RotateCw size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={rotateRight}
                className="w-14 h-14 bg-white dark:bg-luxury-charcoal rounded-full flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-white transition-all duration-300 shadow-xl glass border-2 border-gray-200 dark:border-gray-700"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Use the arrows to rotate the carousel • Click any image to view fullscreen
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {images.length} stunning images showcasing our luxury resort
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-serif font-semibold text-white mb-2">
                  {images[selectedImage].title}
                </h3>
                <p className="text-luxury-gold">
                  {images[selectedImage].category}
                </p>
              </div>

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/50 rounded-full px-4 py-2 text-white text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
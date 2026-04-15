'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X } from 'lucide-react'

const VideoTour = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section className="py-24 bg-white dark:bg-gradient-to-b dark:from-luxury-charcoal dark:to-luxury-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">
            Virtual Tour of Our Rooms
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Take a cinematic journey through our luxury accommodations and discover what makes us extraordinary
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video Thumbnail */}
          <div className="relative aspect-video rounded-2xl overflow-hidden glass group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
              }}
            />
            
            {/* Play Button */}
            <motion.button
              onClick={() => setIsVideoOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(212, 175, 55, 0.7)',
                    '0 0 0 20px rgba(212, 175, 55, 0)',
                    '0 0 0 0 rgba(212, 175, 55, 0)'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-24 h-24 bg-luxury-gold rounded-full flex items-center justify-center text-black group-hover:bg-white transition-colors duration-300"
              >
                <Play size={32} className="ml-1" fill="currentColor" />
              </motion.div>
            </motion.button>

            {/* Overlay Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                Experience Luxury Like Never Before
              </h3>
              <p className="text-gray-200">
                Watch our exclusive room tour and see why guests choose Luxe Haven
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 right-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-2 border-luxury-gold/30 rounded-full"
              />
            </div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              { title: '4K Quality', description: 'Crystal clear video tour' },
              { title: '360° Views', description: 'Complete room exploration' },
              { title: 'Interactive', description: 'Click to explore details' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -5 }}
                className="text-center p-6 glass rounded-xl"
              >
                <h4 className="text-lg font-semibold text-luxury-gold mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Video Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-luxury-dark flex items-center justify-center">
              <div className="text-center">
                <Play size={64} className="text-luxury-gold mx-auto mb-4" />
                <p className="text-white text-xl">Video Tour Coming Soon</p>
                <p className="text-gray-300 mt-2">Experience our luxury rooms in stunning detail</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default VideoTour
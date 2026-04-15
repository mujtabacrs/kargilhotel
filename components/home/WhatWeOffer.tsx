'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Waves, Utensils, Bed, Mountain, Sparkles } from 'lucide-react'

const WhatWeOffer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: Waves,
      title: 'Luxury Spa',
      description: 'Rejuvenate your senses with our world-class spa treatments and wellness programs.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Bed,
      title: 'Premium Suites',
      description: 'Elegantly appointed rooms with breathtaking views and luxury amenities.',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Savor exquisite cuisine crafted by our award-winning chefs.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Mountain,
      title: 'Adventure Sports',
      description: 'Experience thrilling activities from skiing to mountain climbing.',
      image: 'https://images.unsplash.com/photo-1551524164-6cf2ac531400?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Sparkles,
      title: 'Exclusive Events',
      description: 'Host unforgettable celebrations in our stunning event spaces.',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-24 bg-white dark:bg-gradient-to-b dark:from-luxury-dark dark:to-luxury-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6"
          >
            What We Offer
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover a world of luxury amenities and experiences designed to exceed your expectations
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl glass cursor-pointer shadow-lg"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-80 flex flex-col justify-end">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-luxury-gold/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-luxury-gold/50 transition-colors duration-300"
                >
                  <service.icon size={28} className="text-luxury-gold" />
                </motion.div>
                
                <h3 className="text-2xl font-serif font-semibold text-white mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-200 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhatWeOffer
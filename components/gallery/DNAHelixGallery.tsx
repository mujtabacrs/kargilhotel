'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  src: string
  title: string
  category: string
}

interface DNAHelixGalleryProps {
  images: GalleryImage[]
}

const DNAHelixGallery = ({ images }: DNAHelixGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 40,
    restDelta: 0.001
  })

  // Transform scroll to rotation (multiply for more rotations)
  const helixRotation = useTransform(smoothProgress, [0, 1], [0, 360]) // 1 full rotation

  // Mouse movement parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Calculate helix position for each image
  const getHelixPosition = (index: number, totalImages: number, rotation: number, strand: number) => {
    const angleStep = 360 / (totalImages / 2) // Divide by 2 since we have 2 strands
    const baseAngle = index * angleStep
    const strandOffset = strand * 180 // Second strand offset by 180 degrees
    const angle = (baseAngle + strandOffset + rotation) % 360
    const angleRad = (angle * Math.PI) / 180

    // Helix parameters - responsive
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const radius = isMobile ? 180 : 280 // Smaller radius on mobile
    const verticalSpacing = isMobile ? 80 : 100 // Tighter spacing on mobile
    
    // Calculate 3D position
    const x = Math.cos(angleRad) * radius
    const z = Math.sin(angleRad) * radius
    const y = (index * verticalSpacing) - ((totalImages / 2) * verticalSpacing / 2)

    // Calculate distance from viewer (for scaling and opacity)
    // Items with positive z are closer to viewer
    const normalizedZ = (z + radius) / (radius * 2) // 0 to 1, where 1 is closest
    const scale = 0.6 + (normalizedZ * 0.6) // Scale from 0.6 to 1.2
    const opacity = 0.4 + (normalizedZ * 0.6) // Opacity from 0.4 to 1
    const blur = (1 - normalizedZ) * 3 // Blur from 3px to 0px

    return { x, y, z, scale, opacity, blur }
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
    <>
      {/* Main Gallery Container */}
      <div
        ref={containerRef}
        className="relative h-[200vh] bg-gradient-to-b from-black via-luxury-dark to-black overflow-hidden"
      >
        {/* Particle Background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-luxury-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Light Streaks */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-luxury-gold to-transparent" />
        </div>

        {/* 3D Helix Container - Sticky */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-4">
          <div
            className="relative w-full max-w-6xl h-full"
            style={{
              perspective: '1500px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                rotateY: mousePosition.x * 8,
                rotateX: -mousePosition.y * 8,
              }}
            >
              {/* DNA Helix - Two Strands */}
              {images.map((image, index) => {
                // Determine which strand (0 or 1)
                const strand = index % 2
                const strandIndex = Math.floor(index / 2)

                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <motion.div
                      style={{
                        x: useTransform(helixRotation, (rotation) => {
                          const pos = getHelixPosition(strandIndex, images.length, rotation, strand)
                          return pos.x
                        }),
                        y: useTransform(helixRotation, (rotation) => {
                          const pos = getHelixPosition(strandIndex, images.length, rotation, strand)
                          return pos.y
                        }),
                        z: useTransform(helixRotation, (rotation) => {
                          const pos = getHelixPosition(strandIndex, images.length, rotation, strand)
                          return pos.z
                        }),
                        scale: useTransform(helixRotation, (rotation) => {
                          const pos = getHelixPosition(strandIndex, images.length, rotation, strand)
                          return pos.scale
                        }),
                        opacity: useTransform(helixRotation, (rotation) => {
                          const pos = getHelixPosition(strandIndex, images.length, rotation, strand)
                          return pos.opacity
                        }),
                      }}
                      onClick={() => setSelectedImage(index)}
                      whileHover={{
                        scale: 1.2,
                        zIndex: 50,
                        transition: { duration: 0.3 }
                      }}
                      className="relative"
                    >
                      <motion.div
                        className="relative w-32 h-24 sm:w-40 sm:h-32 md:w-56 md:h-40 rounded-xl overflow-hidden glass-dark shadow-2xl group border-2 border-white/10"
                        style={{
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        {/* Image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 160px, 224px"
                          />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-serif font-semibold text-xs sm:text-sm md:text-base mb-1">
                            {image.title}
                          </h3>
                          <p className="text-luxury-gold text-xs">
                            {image.category}
                          </p>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 border-2 border-luxury-gold/0 group-hover:border-luxury-gold/70 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              })}

            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/60 pointer-events-none z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs sm:text-sm mb-2">Scroll to explore the helix</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full mx-auto flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

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
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full h-[70vh]">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  priority
                />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-4 bg-black/50 rounded-full px-4 py-2 text-white text-sm backdrop-blur-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DNAHelixGallery
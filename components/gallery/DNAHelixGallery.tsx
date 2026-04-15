'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
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
  const [scrollLocked, setScrollLocked] = useState(false)
  const [rotationProgress, setRotationProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Set mounted state and check mobile
  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Smooth spring animation for scroll - increased smoothness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform scroll to rotation
  const helixRotation = useTransform(smoothProgress, [0, 1], [0, 360])

  // Track rotation progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      setRotationProgress(latest)
      
      // Lock scroll when gallery rotation is in progress (between 1% and 99%)
      if (latest >= 0.01 && latest <= 0.99) {
        setScrollLocked(true)
      } else {
        setScrollLocked(false)
      }
    })

    return () => unsubscribe()
  }, [smoothProgress])

  // Scroll lock effect
  useEffect(() => {
    if (!containerRef.current) return

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const isAtTop = rect.top <= 0
      const isAtBottom = rect.bottom >= window.innerHeight

      // Check if we're in the gallery section
      if (isAtTop && !isAtBottom) {
        // We're in the gallery section
        const progress = rotationProgress

        // Lock scroll if rotation is not complete (between 1% and 99%)
        if (progress >= 0.01 && progress <= 0.99) {
          e.preventDefault()
          
          // Manually scroll the window to animate the gallery with smoother motion
          const scrollAmount = e.deltaY * 0.3
          window.scrollBy({
            top: scrollAmount,
            behavior: 'auto'
          })
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [rotationProgress])

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
    const angleStep = 360 / (totalImages / 2)
    const baseAngle = index * angleStep
    const strandOffset = strand * 180
    const angle = (baseAngle + strandOffset + rotation) % 360
    const angleRad = (angle * Math.PI) / 180

    // Helix parameters - use state instead of window check
    const radius = isMobile ? 140 : 280
    const verticalSpacing = isMobile ? 70 : 100
    
    // Calculate 3D position
    const x = Math.cos(angleRad) * radius
    const z = Math.sin(angleRad) * radius
    const y = (index * verticalSpacing) - ((totalImages / 2) * verticalSpacing / 2)

    // Calculate distance from viewer
    const normalizedZ = (z + radius) / (radius * 2)
    const scale = 0.6 + (normalizedZ * 0.6)
    const opacity = 0.4 + (normalizedZ * 0.6)
    const blur = (1 - normalizedZ) * 3

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
        className="relative h-[300vh] bg-gradient-to-b from-black via-luxury-dark to-black overflow-hidden"
      >
        {/* Particle Background */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          {mounted && [...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-luxury-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              } as any}
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
            className="relative w-full max-w-6xl h-full mx-auto"
            style={{
              perspective: '1500px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d' as const,
                rotateY: mousePosition.x * 5,
                rotateX: -mousePosition.y * 5,
              } as any}
            >
              {/* DNA Helix - Two Strands */}
              {images.map((image, index) => {
                const strand = index % 2
                const strandIndex = Math.floor(index / 2)

                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d' as const,
                      left: '50%',
                      top: '50%',
                    } as any}
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
                        translateX: '-50%',
                        translateY: '-50%',
                      } as any}
                      onClick={() => setSelectedImage(index)}
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.3 }
                      }}
                      className="relative z-0 hover:z-50"
                    >
                      <motion.div
                        className="relative w-32 h-24 sm:w-40 sm:h-32 md:w-56 md:h-40 rounded-xl overflow-hidden glass-dark shadow-2xl group border-2 border-white/10"
                        style={{
                          transformStyle: 'preserve-3d' as const,
                          backfaceVisibility: 'hidden' as const,
                        } as any}
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
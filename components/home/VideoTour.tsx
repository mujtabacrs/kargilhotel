'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, X } from 'lucide-react'

const VideoTour = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Animation transforms
  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="relative py-40 border-t border-white/5 bg-background-start-rgb overflow-hidden">
      
      {/* Integrative SVG Path */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          <motion.path 
            d="M-40,100 C200,300 400,-100 720,400 C1040,900 1240,500 1480,700" 
            stroke="var(--c-gold)" 
            strokeWidth="1"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <motion.div 
          style={{ opacity }}
          className="text-center mb-24 max-w-2xl"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.5em] text-foreground-rgb/40 mb-6 block">
            The Perspective
          </span>
          <h2 className="font-editorial text-4xl md:text-7xl text-foreground-rgb leading-[0.9] mb-8">
            Experience the <br /> <span className="italic ml-8 text-c-gold">Origin</span>
          </h2>
          <p className="text-xs md:text-sm text-foreground-rgb/60 uppercase tracking-widest leading-relaxed">
            A cinematic journey through our architectural <br /> presence and internal geometry.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.35, 0.35, 0, 1] }}
          className="relative w-full max-w-5xl group cursor-pointer"
          onClick={() => setIsVideoOpen(true)}
        >
          {/* Arch Masked Video Preview */}
          <div className="relative aspect-video arch-mask overflow-hidden bg-c-black">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: [0.35, 0, 0, 1] }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Video Preview"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700">
                <Play size={24} className="text-white ml-1 fill-white" />
              </div>
            </div>

            {/* Text Detail */}
            <div className="absolute bottom-12 left-12">
              <span className="font-editorial text-2xl text-white italic opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                Begin Tour
              </span>
            </div>
          </div>
        </motion.div>

        {/* Technical Footer Detail */}
        <div className="mt-20 flex flex-col md:flex-row gap-12 text-[0.5rem] uppercase tracking-[0.4em] text-foreground-rgb/30">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-foreground-rgb/10" />
            <span>4K Optical Resolution</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-foreground-rgb/10" />
            <span>Spatial Audio Presence</span>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-c-black/95 p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>
            <div className="w-full h-full bg-stone-900 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-px bg-c-gold/30 mx-auto mb-8" />
                <h4 className="font-editorial text-4xl text-white mb-4">Origin Cinematics</h4>
                <p className="text-[0.6rem] uppercase tracking-widest text-white/40">The content is currently being processed by our studio.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    </section>
  )
}

export default VideoTour
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Animation transforms based on Obsidian Assembly logic
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 600]) // Sinks DOWN deeper
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 3.5]) // Zooms IN larger
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.5]) // Deep landscape zoom
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]) // Moves AWAY (Scales Down)
  const titleOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]) // Sharp fade-out at the end
  const welcomeOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) // Sequential fade-in
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  
  // Complex Clip Path calculation inspired by the reference CSS
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      'inset(20% 30% 0% 30% round 15vw 15vw 0 0)',
      'inset(0% 0% 0% 0% round 0vw 0vw 0 0)'
    ]
  )

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#12141a] transition-colors duration-1000">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Sharp Revealing Image Layer */}
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ 
            clipPath,
            scale: imageScale
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-20" />
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
            alt="Luxe Haven Architectural Reveal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated Decorative Path */}
        <svg 
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-20"
          viewBox="0 0 1440 1080" 
          preserveAspectRatio="none"
        >
          <motion.path 
            fill="none" 
            stroke="url(#hero-path-gradient)" 
            strokeWidth="1" 
            d="M0,905.7C291,1634.7,657.7-336.8,214,245.7-110,671.2,233,23.1,802,9.8c195.6-4.6,555,182.9,328,583.1-62.6,110.4-140.3-92.5,310-86.1" 
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="hero-path-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--c-gold)" />
              <stop offset="0.5" stopColor="#c6a76a" />
              <stop offset="1" stopColor="var(--c-gold)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Typography Overlay */}
        <div className="relative z-30 w-full h-full px-6 md:px-20 flex flex-col justify-between py-20 pointer-events-none">
          
          {/* Top Detail */}
          <div className="text-center">
            <span className="uppercase tracking-[0.5em] text-[0.6rem] text-white/40">
              Imagine Possible
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full h-full relative">
            
            {/* Left Block */}
            <motion.div 
               style={{ opacity: contentOpacity }}
               className="max-w-[15rem] text-left hidden md:block absolute left-0 top-1/2 -translate-y-1/2"
            >
              <p className="text-[0.65rem] uppercase tracking-widest leading-relaxed text-white/70">
                Luxe Haven spaces are physical items formed within specific places.
              </p>
            </motion.div>

            {/* Right Block */}
            <motion.div 
               style={{ opacity: contentOpacity }}
               className="max-w-[15rem] text-right hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
            >
              <p className="text-[0.65rem] uppercase tracking-widest leading-relaxed text-white/70">
                Their form results from context, material, and use at the point of origin.
              </p>
            </motion.div>

            {/* Massive Bottom title spanning the base */}
            <div className="absolute bottom-[-5vh] left-1/2 -translate-x-1/2 w-[120vw] flex justify-center">
              <motion.h1 
                style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
                className="font-editorial text-[15vw] md:text-[18vw] text-white leading-none whitespace-nowrap opacity-90 drop-shadow-2xl"
              >
                Luxe Haven
              </motion.h1>
            </div>

            {/* Secondary Welcome Text (Reveals as Hero completes) - Fancy Staggered Reveal */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none">
              
              {/* Line 1: Welcome */}
              <motion.div 
                style={{ opacity: welcomeOpacity }}
                className="flex flex-wrap justify-center gap-[0.1em] mb-4"
              >
                {"Welcome".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                    whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.05, duration: 0.8, ease: [0.35, 0.35, 0, 1] }}
                    className="font-editorial text-4xl md:text-6xl text-white italic tracking-widest"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Line 2: Luxe Haven */}
              <motion.div 
                style={{ opacity: welcomeOpacity }}
                className="flex flex-wrap justify-center gap-[0.1em]"
              >
                {"Luxe Haven".split("").map((char, i) => (
                   <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                    whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ delay: 0.4 + (i * 0.05), duration: 0.8, ease: [0.35, 0.35, 0, 1] }}
                    className="font-editorial text-5xl md:text-8xl text-c-gold italic tracking-widest"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>

            </div>

          </div>

          {/* Mobile Text (Fallback) */}
          <div className="md:hidden text-center mt-auto">
             <p className="text-[0.6rem] uppercase tracking-widest text-white/60">
               Speculative Hospitality
             </p>
          </div>
        </div>

        {/* Call to Action (Floating) */}
        <motion.div 
          className="absolute bottom-10 right-10 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/booking">
            <button className="btn-luxury px-6 py-2 text-[0.6rem]">
              AVAILABILITY
            </button>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .group-scroll-reveal {
          opacity: calc(var(--progress) * 2);
        }
      `}</style>
    </section>
  )
}

export default HeroSection
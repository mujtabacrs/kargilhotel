'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const Testimonials = () => {
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Travel Blogger',
      text: 'Luxe Haven exceeded every expectation. The attention to detail, the breathtaking views, and the impeccable service made our anniversary truly unforgettable. This is luxury redefined.',
      alignment: 'left'
    },
    {
      name: 'Michael Chen',
      role: 'Business Executive',
      text: 'As someone who travels frequently for business, I can confidently say Luxe Haven sets the gold standard. The spa treatments and fine dining are world-class.',
      alignment: 'right'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Fashion Designer',
      text: 'Every corner of this resort is Instagram-worthy, but more importantly, it feels like home. The staff anticipated our every need. Pure perfection.',
      alignment: 'left'
    },
    {
      name: 'David Thompson',
      role: 'Photographer',
      text: 'The architecture and design are stunning. As a photographer, I was captivated by every detail. The sunset views from our suite were absolutely magical.',
      alignment: 'right'
    },
  ]

  return (
    <section className="relative py-40 bg-background-start-rgb overflow-hidden">
      
      {/* Decorative Architectural Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground-rgb/5 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-32">
          <span className="text-[0.6rem] uppercase tracking-[0.5em] text-foreground-rgb/40 mb-6 block">
            Testimonials
          </span>
          <h2 className="font-editorial text-4xl md:text-7xl text-foreground-rgb leading-none">
            Guest <span className="italic">Experiences</span>
          </h2>
        </div>

        <div className="space-y-40">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i}
              className={`flex flex-col ${
                testimonial.alignment === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-12 md:gap-24`}
            >
              {/* Quote Block */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.35, 0.35, 0, 1] }}
                className="flex-1 max-w-xl"
              >
                <div className="relative">
                  <span className="absolute -top-12 -left-8 font-editorial text-8xl text-c-gold opacity-10 select-none">
                    &ldquo;
                  </span>
                  <blockquote className="font-editorial text-2xl md:text-4xl text-foreground-rgb leading-tight mb-12">
                    {testimonial.text}
                  </blockquote>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-c-gold" />
                  <div>
                    <h4 className="text-[0.7rem] uppercase tracking-[0.3em] font-bold text-foreground-rgb">
                      {testimonial.name}
                    </h4>
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-foreground-rgb/40">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Distant Architectural Marker */}
              <div className="hidden md:flex flex-1 justify-center pointer-events-none">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="w-2 h-2 rounded-full bg-c-gold/20 relative"
                >
                   <div className="absolute inset-x-[-2vw] top-1/2 h-px bg-c-gold/10" />
                </motion.div>
              </div>

            </div>
          ))}
        </div>

        {/* Closing Focal Point */}
        <div className="mt-40 flex flex-col items-center">
          <div className="w-px h-24 bg-gradient-to-b from-foreground-rgb/10 to-transparent mb-12" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[0.6rem] uppercase tracking-[0.5em] text-foreground-rgb/30"
          >
            Authentic Narratives from origin
          </motion.p>
        </div>

      </div>
    </section>
  )
}

export default Testimonials
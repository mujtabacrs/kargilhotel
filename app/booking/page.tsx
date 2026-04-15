'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Users, Bed, Wifi, Car, Coffee, Star, Check } from 'lucide-react'

export default function Booking() {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'deluxe'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Suite',
      price: 450,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Ocean View', 'King Bed', 'Private Balcony', 'Marble Bathroom'],
      amenities: [Wifi, Coffee, Car]
    },
    {
      id: 'premium',
      name: 'Premium Suite',
      price: 650,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Panoramic View', 'King Bed', 'Living Area', 'Jacuzzi', 'Butler Service'],
      amenities: [Wifi, Coffee, Car]
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Penthouse Level', 'Master Bedroom', 'Private Dining', 'Personal Chef', 'Helicopter Access'],
      amenities: [Wifi, Coffee, Car]
    }
  ]

  const selectedRoom = roomTypes.find(room => room.id === bookingData.roomType)
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((new Date(bookingData.checkOut).getTime() - new Date(bookingData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsSubmitting(false)
    alert('Booking confirmed! We will send you a confirmation email shortly.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    })
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
            Book Your Stay
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Reserve your luxury experience at Luxe Haven
          </p>
        </motion.div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white dark:bg-luxury-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Booking Form */}
            <div className="lg:col-span-2">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className="glass rounded-3xl p-8 md:p-12"
              >
                <h2 className="text-3xl font-serif font-bold text-gradient mb-8">
                  Reservation Details
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-luxury-gold font-medium mb-2">
                        <Calendar size={18} className="inline mr-2" />
                        Check-in Date
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-luxury-gold focus:bg-white/15 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-luxury-gold font-medium mb-2">
                        <Calendar size={18} className="inline mr-2" />
                        Check-out Date
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleChange}
                        required
                        min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-luxury-gold focus:bg-white/15 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-luxury-gold font-medium mb-2">
                      <Users size={18} className="inline mr-2" />
                      Number of Guests
                    </label>
                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-luxury-gold focus:bg-white/15 transition-all duration-300"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num} className="bg-luxury-charcoal">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </motion.select>
                  </div>

                  {/* Room Selection */}
                  <div>
                    <label className="block text-luxury-gold font-medium mb-4">
                      <Bed size={18} className="inline mr-2" />
                      Select Room Type
                    </label>
                    <div className="space-y-4">
                      {roomTypes.map((room) => (
                        <motion.label
                          key={room.id}
                          whileHover={{ scale: 1.02 }}
                          className={`block cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                            bookingData.roomType === room.id
                              ? 'border-luxury-gold bg-luxury-gold/10'
                              : 'border-white/20 bg-white/5 hover:border-white/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="roomType"
                            value={room.id}
                            checked={bookingData.roomType === room.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="p-6 flex items-center space-x-6">
                            <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-serif font-semibold text-white">
                                  {room.name}
                                </h3>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-luxury-gold">
                                    ${room.price}
                                  </div>
                                  <div className="text-sm text-gray-400">per night</div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {room.features.map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                              <div className="flex space-x-4">
                                {room.amenities.map((Amenity, idx) => (
                                  <Amenity key={idx} size={16} className="text-luxury-gold" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !bookingData.checkIn || !bookingData.checkOut}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-luxury text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Processing Reservation...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>Reserve Now</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass rounded-3xl p-8 sticky top-24"
              >
                <h3 className="text-2xl font-serif font-bold text-gradient mb-6">
                  Booking Summary
                </h3>

                {selectedRoom && (
                  <div className="space-y-6">
                    {/* Room Details */}
                    <div className="border-b border-white/20 pb-6">
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                        <img
                          src={selectedRoom.image}
                          alt={selectedRoom.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {selectedRoom.name}
                      </h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Price per night</span>
                        <span className="text-luxury-gold font-semibold">
                          ${selectedRoom.price}
                        </span>
                      </div>
                    </div>

                    {/* Stay Details */}
                    {bookingData.checkIn && bookingData.checkOut && (
                      <div className="border-b border-white/20 pb-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Check-in</span>
                          <span className="text-white">
                            {new Date(bookingData.checkIn).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Check-out</span>
                          <span className="text-white">
                            {new Date(bookingData.checkOut).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Nights</span>
                          <span className="text-white">{nights}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Guests</span>
                          <span className="text-white">{bookingData.guests}</span>
                        </div>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    {nights > 0 && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">
                            ${selectedRoom.price} × {nights} nights
                          </span>
                          <span className="text-white">${subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Taxes & fees</span>
                          <span className="text-white">${taxes.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-white/20 pt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold text-white">Total</span>
                            <span className="text-2xl font-bold text-luxury-gold">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Amenities Included */}
                    <div className="border-t border-white/20 pt-6">
                      <h5 className="text-sm font-semibold text-luxury-gold mb-3">
                        Included Amenities
                      </h5>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Check size={14} className="text-luxury-gold" />
                          <span>Complimentary WiFi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check size={14} className="text-luxury-gold" />
                          <span>24/7 Room Service</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check size={14} className="text-luxury-gold" />
                          <span>Spa Access</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check size={14} className="text-luxury-gold" />
                          <span>Valet Parking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, Award, ArrowRight, GraduationCap, Star, Clock, ChevronLeft, ChevronRight, AlertTriangle, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '../../services'

interface HeroSlide {
  id?: number
  _id?: string
  imageUrl: string
  title: string
  subtitle: string
  description: string
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch hero slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { contentAPI } = await import('../../services');
        const data = await contentAPI.heroSlides.getAll();
        if (data.length > 0) {
          // Map API data to component structure
          const mappedSlides = data.map((slide: any, index: number) => ({
            id: index + 1,
            _id: slide._id,
            imageUrl: slide.imageUrl,
            title: slide.title,
            subtitle: slide.subtitle,
            description: slide.description
          }));
          setSlides(mappedSlides);
        } else {
          setError('No hero slides found. Please add slides from the admin panel.');
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error);
        setError('Unable to connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchSlides()
  }, [])

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    if (slides.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const features = [
    {
      icon: GraduationCap,
      title: "Expert Faculty",
      description: "World-class educators with industry experience and academic excellence",
      color: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700",
      iconColor: "text-blue-600"
    },
    {
      icon: BookOpen,
      title: "Modern Curriculum",
      description: "Industry-relevant programs with cutting-edge technology and methodologies",
      color: "bg-gradient-to-br from-green-50 to-green-100 text-green-700",
      iconColor: "text-green-600"
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description: "25+ years of academic excellence with outstanding graduate success rates",
      color: "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700",
      iconColor: "text-yellow-600"
    }
  ]

  const stats = [
    { number: "95%", label: "Graduation Rate", icon: GraduationCap },
    { number: "10,000+", label: "Alumni throught pakistan", icon: Users },
    { number: "200+", label: "Expert Faculty", icon: BookOpen },
    { number: "5+", label: "Programs Offered", icon: Award }
  ]

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg text-primary-700 font-medium">Loading hero slides...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <AlertTriangle className="w-20 h-20 mx-auto mb-6 text-blue-200" />
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Welcome to <span className="text-blue-200">HIMS College</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                {error}
              </p>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link href="/apply" className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Apply Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Link>
              <Link href="/about" className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-800 font-semibold rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105">
                Learn More
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">Welcome to <span className="text-blue-200">HIMS College</span></h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">Please add hero slides from the admin panel to showcase your content</p>
            <Link href="/admin" className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Admin Panel
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden">
      {/* Main Hero Slider */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={getImageUrl(slides[currentSlide].imageUrl)}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,%3Csvg width="1200" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="1200" height="600" fill="%23374151"/%3E%3Ctext x="600" y="300" text-anchor="middle" fill="white" font-size="32"%3EHero Image%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm"
              >
                <Star className="w-4 h-4 inline mr-2" />
                Excellence in Education Since 1995
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="block">{slides[currentSlide].title}</span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4 text-blue-100 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-blue-50 opacity-90">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Link href="/apply" className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-blue-200/80 text-blue-100 hover:bg-blue-200 hover:text-blue-900 font-semibold rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-400 shadow-lg shadow-blue-400/50' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Features & Stats Section */}
      <div className="relative bg-white py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary-100 to-blue-100"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Why Choose HIMS College
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Excellence in Every <span className="text-primary-600">Aspect</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover what makes HIMS College the preferred choice for students seeking quality education and promising careers.
              </p>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Stats */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Our Success in Numbers</h3>
              <p className="text-xl text-primary-100">Achievements that speak for our commitment to excellence</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-200" />
                    <div className="text-4xl lg:text-5xl font-bold mb-2 text-blue-100">{stat.number}</div>
                    <div className="text-primary-100 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 
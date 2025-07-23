'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, Award, ArrowRight, GraduationCap, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSlide {
  id?: number
  _id?: string
  imageUrl: string
  title: string
  subtitle: string
  description: string
  ctaText?: string
  ctaLink?: string
  buttonText?: string
  buttonLink?: string
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch hero slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('https://hims-college-website-qnux.vercel.app/api/content/hero-slides')
        if (response.ok) {
          const data = await response.json()
          // Map API data to component structure
          const mappedSlides = data.map((slide: any, index: number) => ({
            id: index + 1,
            _id: slide._id,
            imageUrl: slide.imageUrl,
            title: slide.title,
            subtitle: slide.subtitle,
            description: slide.description,
            ctaText: slide.buttonText,
            ctaLink: slide.buttonLink,
            buttonText: slide.buttonText,
            buttonLink: slide.buttonLink
          }))
          setSlides(mappedSlides)
        } else {
          // Fallback to default slides if API fails
          setSlides([
            {
              id: 1,
              imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop",
              title: "Welcome to HIMS Degree College",
              subtitle: "Empowering Future Leaders Since 1995",
              description: "Your gateway to academic excellence, professional success, and personal growth. Join our community of learners and achievers.",
              ctaText: "Explore Programs",
              ctaLink: "/apply"
            },
            {
              id: 2,
              imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop",
              title: "State-of-the-Art Facilities",
              subtitle: "Modern Learning Environment",
              description: "Experience world-class facilities with cutting-edge technology and comfortable learning spaces designed for your success.",
              ctaText: "Take a Tour",
              ctaLink: "/about"
            },
            {
              id: 3,
              imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
              title: "Expert Faculty & Mentors",
              subtitle: "Learn from the Best",
              description: "Our distinguished faculty brings industry experience and academic excellence to every classroom, guiding you towards your dreams.",
              ctaText: "Meet Our Faculty",
              ctaLink: "/#teachers"
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error)
        // Fallback to default slides
        setSlides([
          {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop",
            title: "Welcome to HIMS Degree College",
            subtitle: "Empowering Future Leaders Since 1995",
            description: "Your gateway to academic excellence, professional success, and personal growth. Join our community of learners and achievers.",
            ctaText: "Explore Programs",
            ctaLink: "/apply"
          },
          {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop",
            title: "State-of-the-Art Facilities",
            subtitle: "Modern Learning Environment",
            description: "Experience world-class facilities with cutting-edge technology and comfortable learning spaces designed for your success.",
            ctaText: "Take a Tour",
            ctaLink: "/about"
          },
          {
            id: 3,
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
            title: "Expert Faculty & Mentors",
            subtitle: "Learn from the Best",
            description: "Our distinguished faculty brings industry experience and academic excellence to every classroom, guiding you towards your dreams.",
            ctaText: "Meet Our Faculty",
            ctaLink: "/#teachers"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
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
      description: "World-class educators with industry experience",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: BookOpen,
      title: "Modern Curriculum",
      description: "Industry-relevant programs and cutting-edge courses",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description: "25+ years of academic excellence and success",
      color: "bg-yellow-100 text-yellow-600"
    }
  ]

  const stats = [
    { number: "95%", label: "Graduation Rate" },
    { number: "10,000+", label: "Alumni Worldwide" },
    { number: "200+", label: "Expert Faculty" },
    { number: "50+", label: "Programs Offered" }
  ]

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return null
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Slider */}
      <div className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].imageUrl}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-2xl lg:text-3xl font-light mb-6 text-yellow-300">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply" className="btn-primary text-lg px-8 py-4">
                  Apply Now
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Link>
                <Link href={slides[currentSlide].ctaLink || slides[currentSlide].buttonLink || "#"} className="btn-secondary text-lg px-8 py-4">
                  {slides[currentSlide].ctaText || slides[currentSlide].buttonText || "Learn More"}
                  <ArrowRight className="w-6 h-6 ml-2" />
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* College Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
                  <Star className="w-4 h-4 mr-2" />
                  #1 College in the Region
                </span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to <span className="gradient-text">HIMS Degree College</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At HIMS Degree College, we are committed to providing exceptional education that nurtures 
                intellectual growth, fosters innovation, and develops character. Our mission is to prepare 
                students for successful careers and meaningful contributions to society.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/apply" className="btn-primary">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`w-10 h-10 ${feature.color} rounded-full flex items-center justify-center`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Next Intake</div>
                    <div className="text-xs text-gray-600">September 2024</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 bg-primary-600 rounded-xl p-4 shadow-lg text-white"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-xs">Years of Excellence</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default HeroSection 
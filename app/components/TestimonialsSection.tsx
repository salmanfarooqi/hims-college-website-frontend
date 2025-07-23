'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Ahmed Khan",
      program: "FSC Pre-Medical",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      quote: "HIMS Degree College provided me with the perfect foundation for my medical career. The faculty's dedication and support were incredible. I'm now studying at a top medical university.",
      rating: 5,
      achievement: "Admitted to Medical College"
    },
    {
      name: "Fatima Ali",
      program: "FSC Engineering",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      quote: "The engineering program at HIMS prepared me excellently for university. The practical labs and expert guidance made all the difference in my academic journey.",
      rating: 5,
      achievement: "Gold Medal in Physics"
    },
    {
      name: "Usman Hassan",
      program: "ICS Computer Science",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      quote: "The computer science program at HIMS gave me the skills and confidence to pursue my passion for technology. I'm now working at a leading tech company.",
      rating: 5,
      achievement: "Software Engineer"
    },
    {
      name: "Ayesha Malik",
      program: "FSC Pre-Medical",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      quote: "The supportive environment and excellent teaching methods at HIMS helped me achieve my dreams. The teachers truly care about student success.",
      rating: 5,
      achievement: "Merit Position Achieved"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our successful graduates about their experience at HIMS Degree College 
            and how it shaped their future.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="relative inline-block">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-primary-600 font-semibold">
                  {testimonials[currentTestimonial].program}
                </p>
                <div className="flex justify-center lg:justify-start mt-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="mt-2 text-sm text-green-600 font-semibold">
                  {testimonials[currentTestimonial].achievement}
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Success Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8"
        >
          {[
            { number: "95%", label: "Student Satisfaction" },
            { number: "90%", label: "University Admission Rate" },
            { number: "85%", label: "Employment Rate" },
            { number: "100%", label: "Parent Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection 
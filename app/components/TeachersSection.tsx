'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'


interface Teacher {
  id: number
  name: string
  position: string
  expertise: string
  imageUrl: string
  rating: number
  description: string
}

const TeachersSection = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('https://hims-college-website-qnux.vercel.app/api/content/teachers')
        if (response.ok) {
          const data = await response.json()
          setTeachers(data)
        } else {
          // Fallback to default teachers if API fails
          setTeachers([
            {
              id: 1,
              name: "Dr. Sarah Johnson",
              position: "Dean of Engineering",
              imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
              expertise: "Computer Science",
              rating: 4.9,
              description: "Leading expert in artificial intelligence and machine learning with 15+ years of experience."
            },
            {
              id: 2,
              name: "Prof. Michael Chen",
              position: "Head of Business School",
              imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
              expertise: "Business Administration",
              rating: 4.8,
              description: "Former Fortune 500 executive with expertise in strategic management and entrepreneurship."
            },
            {
              id: 3,
              name: "Dr. Emily Rodriguez",
              position: "Director of Arts",
              imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
              expertise: "Fine Arts",
              rating: 4.9,
              description: "Internationally acclaimed artist and curator with exhibitions in major galleries worldwide."
            },
            {
              id: 4,
              name: "Prof. David Thompson",
              position: "Dean of Sciences",
              imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
              expertise: "Physics",
              rating: 4.7,
              description: "Nobel Prize nominee for groundbreaking research in quantum mechanics and particle physics."
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching teachers:', error)
        // Fallback to default teachers
        setTeachers([
          {
            id: 1,
            name: "Dr. Sarah Johnson",
            position: "Dean of Engineering",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            expertise: "Computer Science",
            rating: 4.9,
            description: "Leading expert in artificial intelligence and machine learning with 15+ years of experience."
          },
          {
            id: 2,
            name: "Prof. Michael Chen",
            position: "Head of Business School",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            expertise: "Business Administration",
            rating: 4.8,
            description: "Former Fortune 500 executive with expertise in strategic management and entrepreneurship."
          },
          {
            id: 3,
            name: "Dr. Emily Rodriguez",
            position: "Director of Arts",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            expertise: "Fine Arts",
            rating: 4.9,
            description: "Internationally acclaimed artist and curator with exhibitions in major galleries worldwide."
          },
          {
            id: 4,
            name: "Prof. David Thompson",
            position: "Dean of Sciences",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            expertise: "Physics",
            rating: 4.7,
            description: "Nobel Prize nominee for groundbreaking research in quantum mechanics and particle physics."
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  if (loading) {
    return (
      <section id="teachers" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading teachers...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="teachers" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="gradient-text">Expert Faculty</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our distinguished faculty members are industry leaders, researchers, and passionate educators 
            dedicated to nurturing the next generation of innovators and leaders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative">
                <img 
                  src={teacher.imageUrl} 
                  alt={teacher.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{teacher.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-primary-600 font-semibold mb-2">{teacher.position}</p>
                <p className="text-gray-600 text-sm mb-3">{teacher.expertise}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{teacher.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeachersSection 
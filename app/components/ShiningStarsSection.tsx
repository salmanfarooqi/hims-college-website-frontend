'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Award, Trophy, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { getImageUrl } from '../../services'
import Image from 'next/image'

interface Student {
  id: number
  name: string
  program: string
  imageUrl: string
  achievement: string
  gpa: string
  quote: string
  awards: string[]
}

const ShiningStarsSection = () => {
  const [shiningStars, setShiningStars] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { contentAPI } = await import('../../services');
        const data = await contentAPI.students.getAll();
        setShiningStars(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        // Fallback to default students
        setShiningStars([
          {
            id: 1,
            name: "Ahmed Khan",
            program: "FSC Pre-Medical",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            achievement: "Top 1% in Medical Entry Test",
            gpa: "3.95",
            quote: "HIMS Degree College provided me with the perfect foundation for my medical career. The faculty's dedication and support were incredible.",
            awards: ["Academic Excellence", "Leadership Award", "Community Service"]
          },
          {
            id: 2,
            name: "Fatima Ali",
            program: "FSC Engineering",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            achievement: "Gold Medal in Physics Olympiad",
            gpa: "3.98",
            quote: "The engineering program at HIMS prepared me excellently for university. The practical labs and expert guidance made all the difference.",
            awards: ["Physics Excellence", "Innovation Award", "Research Grant"]
          },
          {
            id: 3,
            name: "Usman Hassan",
            program: "ICS Computer Science",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            achievement: "National Coding Champion",
            gpa: "3.92",
            quote: "The computer science program at HIMS gave me the skills and confidence to pursue my passion for technology and innovation.",
            awards: ["Programming Excellence", "Innovation Award", "Tech Leadership"]
          },
          {
            id: 4,
            name: "Ayesha Malik",
            program: "FSC Pre-Medical",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            achievement: "Merit Position in Medical College",
            gpa: "3.96",
            quote: "The supportive environment and excellent teaching methods at HIMS helped me achieve my dreams of becoming a doctor.",
            awards: ["Academic Excellence", "Merit Scholarship", "Community Service"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [])

  const achievements = [
    { number: "5+", label: "Merit Positions", icon: Trophy },
    { number: "100+", label: "Awards Won", icon: Award },
    { number: "95%", label: "Success Rate", icon: ChevronLeft },
    { number: "1000+", label: "Success Stories", icon: Star }
  ]

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading shining stars...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Shining Stars</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our exceptional students who have achieved remarkable success and continue to inspire 
            the next generation of learners with their dedication and achievements.
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <div key={achievement.label} className="text-center">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <div className="flex justify-center mb-2 md:mb-3">
                  <achievement.icon className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{achievement.number}</div>
                <div className="text-xs md:text-sm text-gray-600">{achievement.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Student Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shiningStars.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative">
                <img 
                  src={getImageUrl(student.imageUrl)} 
                  alt={student.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg width="400" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="400" fill="%2310B981"/%3E%3Ctext x="200" y="200" text-anchor="middle" fill="white" font-size="24"%3ESTUDENT%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-4 right-4 bg-yellow-400 rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-white fill-current" />
                  <span className="text-sm font-semibold text-white">Star</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg px-3 py-2">
                  <div className="text-sm font-semibold text-gray-900">{student.program}</div>
                  <div className="text-xs text-gray-600">GPA: {student.gpa}</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{student.achievement}</p>
                
                <div className="mb-4">
                  <Quote className="w-4 h-4 text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm italic leading-relaxed">"{student.quote}"</p>
                </div>
                
                <div className="space-y-1">
                  {student.awards.map((award, awardIndex) => (
                    <div key={awardIndex} className="flex items-center space-x-2">
                      <Award className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShiningStarsSection 
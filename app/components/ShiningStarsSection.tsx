'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Award, Trophy, ChevronLeft, ChevronRight, Quote, GraduationCap, Target, Users, TrendingUp } from 'lucide-react'
import { getImageUrl } from '../../services'
import Image from 'next/image'

interface Student {
  id: number
  firstName: string,
  lastName: string
  imageUrl: string
  year: string
  profession: string
  institute: string
  program: string
}

const ShiningStarsSection = () => {
  const [shiningStars, setShiningStars] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [availableYears, setAvailableYears] = useState<string[]>([])

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { contentAPI } = await import('../../services');
        const data = await contentAPI.students.getAll(selectedYear);
        // Map API data to include new fields with defaults
        const mappedData = data.map((student: any) => ({
          ...student,
          completeDetail: student.completeDetail || '',
          institute: student.institute || ''
        }));
        setShiningStars(mappedData);
      } catch (error) {
        console.error('Error fetching students:', error);
        // Fallback to default students
        setShiningStars([
       
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedYear])

  // Fetch available years
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const { contentAPI } = await import('../../services');
        const years = await contentAPI.students.getYears();
        setAvailableYears(years);
      } catch (error) {
        console.error('Error fetching years:', error);
        setAvailableYears(['2023', '2022', '2021']);
      }
    };

    fetchYears();
  }, [])

  const achievements = [
    { number: "5+", label: "Merit Positions", icon: Trophy, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { number: "100+", label: "Awards Won", icon: Award, color: "text-purple-600", bgColor: "bg-purple-100" },
    { number: "95%", label: "Success Rate", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100" },
    { number: "1000+", label: "Success Stories", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" }
  ]

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-6 py-3 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold mb-6 shadow-sm">
            Student Achievements
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Our <span className="gradient-text">Shining Stars</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <div className={`w-16 h-16 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Year Filter */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 px-4">Filter by Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-primary-600 focus:outline-none focus:ring-0"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </motion.div> */}

        {/* Student Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shiningStars.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3">
                {/* Student Image */}
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img 
                    src={getImageUrl(student.imageUrl)} 
                    alt={student.firstName}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg width="400" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="400" fill="%2310B981"/%3E%3Ctext x="200" y="200" text-anchor="middle" fill="white" font-size="24"%3ESTUDENT%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  
                  {/* Year Badge */}
                  {/* <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="text-sm font-bold text-gray-900">{student.year}</div>
                  </div> */}

                  {/* Profession Badge */}
                  <div className="absolute bottom-4 right-4 bg-primary-600/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="text-sm font-bold text-white">{student.profession}</div>
                  </div>
                </div>
                
                {/* Student Info */}
                <div className="p-6">
                  {/* Name with Icon */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {student.firstName+" " + student.lastName}
                      </h3>
                    </div>
                  </div>

                  {/* Year with Icon */}
                  {/* <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <Target className="w-3 h-3 text-green-600" />
                      </div>
                      <p className="text-green-700 font-semibold text-sm">
                        Year: {student.year}
                      </p>
                    </div>
                  </div> */}

                  {/* Program with Icon */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-3 h-3 text-blue-600" />
                      </div>
                      <p className="text-blue-700 font-semibold text-sm">
                        {student.profession}
                      </p>
                    </div>
                  </div>

                  {/* Institute */}
                  {student.institute && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-3 h-3 text-gray-600" />
                        </div>
                        <p className="text-gray-700 font-medium text-sm">
                           {student.institute}
                        </p>
                      </div>
                    </div>
                  )}
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
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Mail, Phone, Award, BookOpen, Users } from 'lucide-react'
import { getImageUrl } from '../../services'

// Base64 encoded SVG placeholder for teachers on homepage
const teacherPlaceholder = 'data:image/svg+xml;base64,' + btoa(`
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad1)"/>
  <circle cx="200" cy="160" r="60" fill="#FFFFFF" opacity="0.3"/>
  <path d="M200 240 Q140 240 120 290 L120 400 L280 400 L280 290 Q260 240 200 240" fill="#FFFFFF" opacity="0.3"/>
  <text x="200" y="350" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="20" font-weight="bold">TEACHER</text>
</svg>
`);

interface Teacher {
  _id: string
  id: string
  name: string
  position: string
  imageUrl: string
  expertise: string
  rating: number
  description: string
  email?: string
  phone?: string
  department?: string
  qualifications?: string
  experience?: string
  isActive?: boolean
}

const TeachersSection = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const teachersPerPage = 3

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { contentAPI } = await import('../../services');
        const data = await contentAPI.teachers.getAll();
        const mappedTeachers = data.map((teacher: any) => ({
          ...teacher,
          id: teacher._id || teacher.id,
          _id: teacher._id || teacher.id
        }));
        setTeachers(mappedTeachers);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
        // Fallback to default teachers if API fails
        setTeachers([
          {
            _id: '1',
            id: '1',
            name: "Dr. Sarah Johnson",
            position: "Dean of Engineering",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            expertise: "Computer Science & AI",
            rating: 4.9,
            description: "Leading expert in artificial intelligence and machine learning with 15+ years of experience in both academia and industry.",
            email: "sarah.johnson@hims.edu",
            department: "Engineering",
            qualifications: "PhD Computer Science, MIT",
            experience: "15+ years"
          },
          {
            _id: '2',
            id: '2',
            name: "Prof. Michael Chen",
            position: "Head of Business School",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            expertise: "Business Administration",
            rating: 4.8,
            description: "Former Fortune 500 executive with expertise in strategic management and entrepreneurship.",
            email: "michael.chen@hims.edu",
            department: "Business",
            qualifications: "MBA Harvard, CPA",
            experience: "20+ years"
          },
          {
            _id: '3',
            id: '3',
            name: "Dr. Emily Rodriguez",
            position: "Director of Arts",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            expertise: "Fine Arts & Design",
            rating: 4.9,
            description: "Internationally acclaimed artist and curator with exhibitions in major galleries worldwide.",
            email: "emily.rodriguez@hims.edu",
            department: "Arts",
            qualifications: "MFA Yale, PhD Art History",
            experience: "12+ years"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const totalPages = Math.ceil(teachers.length / teachersPerPage);
  const currentTeachers = teachers.slice(
    currentPage * teachersPerPage,
    (currentPage + 1) * teachersPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (loading) {
    return (
      <section id="teachers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading our expert teachers...</p>
          </div>
        </div>
      </section>
    );
  }

  if (teachers.length === 0) {
    return (
      <section id="teachers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Users className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expert <span className="gradient-text">Teachers</span>
            </h2>
            <p className="text-xl text-gray-600">Our expert teachers will be featured here soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            Meet Our Faculty
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Expert <span className="gradient-text">Teachers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn from industry professionals and academic experts who are passionate about your success and dedicated to excellence in education.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentTeachers.map((teacher, index) => (
            <motion.div
              key={teacher._id || teacher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                {/* Teacher Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getImageUrl(teacher.imageUrl) || teacherPlaceholder}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = teacherPlaceholder;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{teacher.rating}</span>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-primary-600 font-semibold text-sm mb-2">
                      {teacher.position}
                    </p>
                    
                    {/* Department Badge */}
                    <div className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {teacher.department || teacher.expertise}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {teacher.description}
                  </p>

                  {/* Qualifications & Experience */}
                  <div className="space-y-2 mb-4">
                    {teacher.qualifications && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Award className="w-3 h-3 mr-2 text-primary-500" />
                        <span className="truncate">{teacher.qualifications}</span>
                      </div>
                    )}
                    {teacher.experience && (
                      <div className="flex items-center text-xs text-gray-500">
                        <BookOpen className="w-3 h-3 mr-2 text-primary-500" />
                        <span>{teacher.experience} experience</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {teacher.email && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Mail className="w-3 h-3 mr-1" />
                        <span className="truncate">{teacher.email}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(teacher.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation & Stats */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={prevPage}
                className="p-3 rounded-full bg-white shadow-md text-primary-600 hover:bg-primary-50 hover:shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPage 
                        ? 'bg-primary-600 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-3 rounded-full bg-white shadow-md text-primary-600 hover:bg-primary-50 hover:shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600">
                Featuring <span className="font-bold text-primary-600">{teachers.length}</span> expert teachers
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeachersSection; 
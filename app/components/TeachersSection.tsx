'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Users, GraduationCap, User } from 'lucide-react'
import { getImageUrl } from '../../services'
import { getDefaultProfileImageUrl } from '../../components/DefaultProfileImage'

interface Teacher {
  _id: string
  id: string
  name: string
  position: string
  imageUrl: string
  expertise: string
  rating: number
  department?: string
  education?: string
  isActive?: boolean
}

const TeachersSection = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const teachersPerPage = 3
  const [refreshKey, setRefreshKey] = useState(0) // Add refresh key for cache busting

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { contentAPI } = await import('../../services');
        // Add cache busting parameter to force fresh data
        const data = await contentAPI.teachers.getAll();
        console.log('📥 Fetched teachers data:', data);
        const mappedTeachers = data.map((teacher: any) => ({
          _id: teacher._id || teacher.id,
          id: teacher._id || teacher.id,
          name: teacher.name,
          position: teacher.position,
          imageUrl: teacher.imageUrl,
          expertise: teacher.expertise,
          rating: teacher.rating || 5,
          department: teacher.department,
          education: teacher.education,
          isActive: teacher.isActive !== false
        }));
        console.log('🔄 Mapped teachers data:', mappedTeachers);
        setTeachers(mappedTeachers.filter((t: Teacher) => t.isActive));
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
        // Fallback to default teachers if API fails
        setTeachers([
          {
            _id: '1',
            id: '1',
            name: "Dr. Sarah Johnson",
            position: "Dean of Engineering",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face&q=80",
            expertise: "Computer Science",
            rating: 4.9,
            department: "Engineering",
            education: "PhD in Computer Science, MIT",
            isActive: true
          },
          {
            _id: '2',
            id: '2',
            name: "Prof. Michael Chen",
            position: "Head of Business",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face&q=80",
            expertise: "Business Administration",
            rating: 4.8,
            department: "Business",
            education: "MBA, Harvard University",
            isActive: true
          },
          {
            _id: '3',
            id: '3',
            name: "Dr. Emily Rodriguez",
            position: "Director of Arts",
            imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face&q=80",
            expertise: "Fine Arts",
            rating: 4.9,
            department: "Arts",
            education: "PhD in Art History, Oxford University",
            isActive: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Add a function to force refresh teachers data
  const forceRefreshTeachers = () => {
    setLoading(true);
    setTimeout(() => {
      const fetchTeachers = async () => {
        try {
          const { contentAPI } = await import('../../services');
          const data = await contentAPI.teachers.getAll();
          console.log('🔄 Force refreshed teachers data:', data);
          const mappedTeachers = data.map((teacher: any) => ({
            _id: teacher._id || teacher.id,
            id: teacher._id || teacher.id,
            name: teacher.name,
            position: teacher.position,
            imageUrl: teacher.imageUrl,
            expertise: teacher.expertise,
            rating: teacher.rating || 5,
            department: teacher.department,
            education: teacher.education,
            isActive: teacher.isActive !== false
          }));
          setTeachers(mappedTeachers.filter((t: Teacher) => t.isActive));
        } catch (error) {
          console.error('Force refresh failed:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchTeachers();
    }, 1000); // 1 second delay to ensure cache is cleared
  };

  // Listen for storage events to refresh when admin updates teachers
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'teachersUpdated') {
        console.log('🔄 Teachers updated, refreshing data...');
        setRefreshKey(prev => prev + 1); // Force re-render with new cache key
        forceRefreshTeachers();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
      <section id="teachers" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
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
      <section id="teachers" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Users className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Our Expert <span className="gradient-text">Teachers</span>
            </h2>
            <p className="text-xl text-gray-600">Our expert teachers will be featured here soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-6 shadow-sm">
            Meet Our Faculty
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Our Expert <span className="gradient-text">Teachers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Learn from industry professionals and academic experts who are passionate about your success.
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
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    key={`${teacher._id}-${teacher.imageUrl}-${refreshKey}-${Date.now()}`}
                    src={`${getImageUrl(teacher.imageUrl, true)}?t=${Date.now()}` || getDefaultProfileImageUrl(teacher.name, 'teacher')}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getDefaultProfileImageUrl(teacher.name, 'teacher');
                    }}
                    loading="lazy"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-1 shadow-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-gray-900">{teacher.rating}</span>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="p-6">
                  {/* Name with Icon */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {teacher.name}
                    </h3>
                  </div>

                  {/* Position with Icon */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-blue-600 font-semibold text-lg">
                      {teacher.position}
                    </p>
                  </div>

                  {/* Department */}
                  <div className="mb-3">
                    <div className="inline-block bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {teacher.department || teacher.expertise}
                    </div>
                  </div>

                  {/* Education */}
                  {teacher.education && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 font-medium">Education:</p>
                      <p className="text-sm text-gray-700">{teacher.education}</p>
                    </div>
                  )}
                  
                  {/* Star Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(teacher.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {teacher.rating}/5
                    </span>
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
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-6">
              <button
                onClick={prevPage}
                className="p-4 rounded-full bg-white shadow-lg text-primary-600 hover:bg-primary-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              
              <div className="flex space-x-3">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentPage 
                        ? 'bg-primary-600 shadow-lg scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-4 rounded-full bg-white shadow-lg text-primary-600 hover:bg-primary-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-700 font-semibold">
                Featuring <span className="font-bold text-primary-600 text-2xl">{teachers.length}</span> expert teachers
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeachersSection;
'use client'

import { motion } from 'framer-motion'
import { Wifi, BookOpen, Users, Monitor, Microscope, GraduationCap, Library, Globe } from 'lucide-react'
import Image from 'next/image'

const FacilitiesSection = () => {
  const facilities = [
    {
      icon: Library,
      title: "Modern Library",
      description: "Extensive collection of books, digital resources, and study spaces",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop"
    },
    {
      icon: Microscope,
      title: "Science Labs",
      description: "State-of-the-art laboratories for practical experiments and research",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop"
    },
    {
      icon: Monitor,
      title: "Computer Labs",
      description: "Advanced computer facilities with latest software and technology",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
    },
    {
      icon: Wifi,
      title: "Wi-Fi Campus",
      description: "High-speed internet connectivity throughout the campus",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
    },
    {
      icon: Users,
      title: "Student Center",
      description: "Recreation areas, cafeterias, and student activity spaces",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      icon: Globe,
      title: "International Programs",
      description: "Exchange programs and international partnerships",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
    }
  ]

  const campusStats = [
    { number: "5+", label: "Classrooms" },
    { number: "15+", label: "Laboratories" },
    { number: "5+", label: "Computer Labs" },
    { number: "100%", label: "Wi-Fi Coverage" }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            World-Class <span className="gradient-text">Facilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience learning in modern, well-equipped facilities designed to enhance your educational journey 
            and prepare you for future success.
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
                  <facility.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Campus Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Campus <span className="text-yellow-300">Infrastructure</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {campusStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FacilitiesSection 
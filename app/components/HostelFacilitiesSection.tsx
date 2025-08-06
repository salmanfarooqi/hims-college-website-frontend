'use client'

import { motion } from 'framer-motion'
import { Bed, Wifi, Utensils, Shield, Users, Car, BookOpen, Heart } from 'lucide-react'
import Image from 'next/image'

const HostelFacilitiesSection = () => {
  const hostelFeatures = [
    {
      icon: Bed,
      title: "Comfortable Accommodation",
      description: "Well-furnished rooms with modern amenities, comfortable beds, and study desks",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop"
    },
    {
      icon: Wifi,
      title: "High-Speed Internet",
      description: "24/7 high-speed Wi-Fi connectivity for academic and personal use",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
    },
    {
      icon: Utensils,
      title: "Quality Dining",
      description: "Nutritious and delicious meals served three times daily in our modern dining hall",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop"
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Round-the-clock security personnel and CCTV surveillance for student safety",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
    },
    {
      icon: Users,
      title: "Community Living",
      description: "Foster friendships and build lasting relationships in our supportive community",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
    },
    {
      icon: BookOpen,
      title: "Study Areas",
      description: "Quiet study rooms and common areas perfect for group study sessions",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop"
    }
  ]

  const hostelStats = [
    { number: "200+", label: "Students Capacity" },
    { number: "24/7", label: "Security" },
    { number: "3x", label: "Daily Meals" },
    { number: "100%", label: "Wi-Fi Coverage" }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Modern <span className="gradient-text">Hostel Facilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience comfortable and secure accommodation with modern amenities designed to make your 
            stay away from home as pleasant and productive as possible.
          </p>
        </motion.div>

        {/* Hostel Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hostelFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hostel Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Hostel <span className="text-yellow-300">Highlights</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {hostelStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
     
      </div>
    </section>
  )
}

export default HostelFacilitiesSection 
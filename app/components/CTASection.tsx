'use client'

import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, Users, Award } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Expert Faculty",
      description: "Learn from experienced educators and industry professionals"
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Join a diverse community of learners and achievers"
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "25+ years of academic excellence and student success"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-yellow-300">Journey?</span>
          </h2>
          <p className="text-xl lg:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
            Join thousands of successful students who have transformed their lives through quality education at HIMS Degree College.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/apply" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/about" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm text-center"
            >
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-primary-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "95%", label: "Graduation Rate" },
            { number: "10,000+", label: "Alumni Worldwide" },
            { number: "200+", label: "Expert Faculty" },
            { number: "5+", label: "Programs Offered" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-yellow-300 mb-2">{stat.number}</div>
              <div className="text-primary-100 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection 
'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Clock, Award, ArrowRight, GraduationCap, Microscope, Cpu, Wrench } from 'lucide-react'
import Image from 'next/image'

const ProgramsSection = () => {
  const programs = [
    {
      name: "FSC Pre-Medical",
      duration: "2 Years",
      seats: "120",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      description: "Foundation course for medical studies with comprehensive biology, chemistry, and physics curriculum. Prepares students for medical school admission.",
      subjects: ["Biology", "Chemistry", "Physics", "English"],
      icon: Microscope,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      career: "Medical School, MBBs, Dentistry, Pharmacy, Nursing"
    },
    {
      name: "FSC Engineering",
      duration: "2 Years",
      seats: "150",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      description: "Foundation course for engineering studies with mathematics, physics, and chemistry. Prepares students for various engineering disciplines.",
      subjects: ["Mathematics", "Physics", "Chemistry", "English"],
      icon: Wrench,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      career: "Mechanical, Electrical, Civil, Computer Engineering"
    },
    {
      name: "ICS Computer Science",
      duration: "2 Years",
      seats: "100",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      description: "Intermediate in Computer Science with programming, mathematics, and computer studies. Foundation for computer science and IT careers.",
      subjects: ["Computer Science", "Mathematics", "Physics", "English", "Statistics"],
      icon: Cpu,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      career: "Software Development, IT, Data Science, AI"
    }
  ]

  

  const stats = [
    { number: "95%", label: "Employment Rate", icon: Award },
    { number: "50+", label: "Industry Partners", icon: Users },
    { number: "10+", label: "Years Experience", icon: Clock },
    { number: "1000+", label: "Graduates", icon: GraduationCap }
  ]

  return (
    <section id="programs" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="gradient-text">Academic Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of 2-year foundation programs designed to prepare you for 
            successful careers in medicine, engineering, and technology. Each program combines theoretical knowledge with practical experience.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative h-48">
                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-80`}></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{program.name}</h3>
                  <p className="text-sm opacity-90">{program.duration} Program</p>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2">
                  <program.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{program.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject) => (
                      <span key={subject} className={`px-3 py-1 rounded-full text-sm ${program.bgColor} ${program.textColor}`}>
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Career Paths:</h4>
                  <p className="text-sm text-gray-600">{program.career}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Available Seats:</span> {program.seats}
                  </div>
                  <div className={`w-10 h-10 ${program.bgColor} rounded-full flex items-center justify-center`}>
                    <program.icon className={`w-5 h-5 ${program.textColor}`} />
                  </div>
                </div>

                <button className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${program.color} text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Program Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 shadow-lg mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Program <span className="gradient-text">Features</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "2-Year Duration", description: "Comprehensive foundation programs", icon: Clock },
              { title: "Practical Training", description: "Hands-on experience and labs", icon: BookOpen },
              { title: "Expert Faculty", description: "Experienced teachers and mentors", icon: Users },
              { title: "Career Guidance", description: "Professional career counseling", icon: Award }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Program <span className="text-yellow-300">Success</span>
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
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

export default ProgramsSection 
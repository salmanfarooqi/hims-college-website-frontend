'use client'

import { motion } from 'framer-motion'
import { Star, Users, BookOpen } from 'lucide-react'

const AboutSection = () => {
  const stats = [
    { number: "95%", label: "Graduation Rate" },
    { number: "5+", label: "Programs Offered" },
    { number: "20+", label: "Expert Faculty" },
    { number: "10K+", label: "Alumni Worldwide" }
  ]

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="gradient-text">HIMS Degree College</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The Hilal Institute of Modern Sciences (HIMS) is one of the pioneers of quality  education in the private sector at Peshawar. The credit for its foundation goes to a  group of enthusiasts and intellectuals who felt,the dire need of an institution  imparting quality education in Khyber Pakhtunkhwa. The aim of HIMS is to impart  standard education alongwith positive character building of the students. The  institute also aims at inculcating the lslamic values of life in them through a broad-  based and well-planned programme of physical,mental and academic training.The  authority considers each student as member of college family and endeavors to  bring his unique qualities to his maximum advantage. Thus,our total attention is  centered on students,where the college authority takes it as challenge to develop  requisite inside the students and bring all his potentialities to lime light. The college  has really come upto the expectation of the public and has shown brilliant resultsìn  F.Sc examination in BISE Peshawar. Every Year a Number of HIMSAIN get  Admission in Medical Colleges and Engineering Universities.
            </p>
           
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Excellence</h4>
                    <p className="text-primary-100">Striving for the highest standards in everything we do</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community</h4>
                    <p className="text-primary-100">Building a supportive and inclusive learning environment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-1">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Innovation</h4>
                    <p className="text-primary-100">Embracing new ideas and cutting-edge technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 
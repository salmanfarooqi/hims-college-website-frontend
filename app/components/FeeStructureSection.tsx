'use client'

import { motion } from 'framer-motion'
import { Check, DollarSign, BookOpen, GraduationCap, Users, Clock } from 'lucide-react'

const FeeStructureSection = () => {
  const programs = [
    {
      name: "FSC Pre-Engineering",
      duration: "2 Years",
      firstYear: "PKR 62000",
      secondYear: "PKR 55,000",
      total: "PKR 117,000",
      features: [
        "Advanced mathematics and physics",
        "Engineering fundamentals",
        "Practical laboratory work",
        "University preparation"
      ]
    },
    {
      name: "FSC Pre-Medical",
      duration: "2 Years",
      firstYear: "PKR 62000",
      secondYear: "PKR 55,000",
      total: "PKR 117,000",
      features: [
        "Biology and chemistry focus",
        "Medical field preparation",
        "Laboratory experiments",
        "Healthcare career foundation"
      ]
    },
    {
      name: "FSC Pre-Computer Science",
      duration: "2 Years",
      firstYear: "PKR 62000",
      secondYear: "PKR 55,000",
      total: "PKR 117,000",
      features: [
        "Computer programming basics",
        "Information technology",
        "Digital skills development",
        "Tech industry preparation"
      ]
    }
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
            <span className="gradient-text">Fee Structure</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in providing quality education at affordable rates. Our fee structure 
            ensures you know exactly what you're paying for.
          </p>
        </motion.div>

        {/* Programs Fee Structure */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{program.name}</h3>
                    <p className="text-sm text-gray-600">Duration: {program.duration}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">1st Year:</span>
                    <span className="text-lg font-bold text-blue-600">{program.firstYear}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">2nd Year:</span>
                    <span className="text-lg font-bold text-blue-600">{program.secondYear}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">{program.total}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Program Features:</h4>
                {program.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeeStructureSection 
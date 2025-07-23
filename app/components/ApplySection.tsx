'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Award, ArrowRight } from 'lucide-react'

const ApplySection = () => {
  return (
    <section id="apply" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-yellow-300">Journey</span>?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Join thousands of students who have transformed their lives through education at Excellence College. 
            Take the first step towards your future today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Application Deadline</h3>
            <p className="text-primary-100">Applications are accepted year-round with rolling admissions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quick Process</h3>
            <p className="text-primary-100">Complete your application in just 15 minutes online</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Financial Aid</h3>
            <p className="text-primary-100">Over 80% of students receive financial assistance</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Your Application
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ApplySection 
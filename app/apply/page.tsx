'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Award, ArrowRight, CheckCircle, FileText, GraduationCap, DollarSign } from 'lucide-react'
import ApplicationForm from '../components/ApplicationForm'

const ApplyPage = () => {
  const applicationSteps = [
    {
      step: "01",
      title: "Submit Application",
      description: "Complete the online application form with your personal and academic information",
      icon: FileText
    },
    {
      step: "02",
      title: "Upload Documents",
      description: "Submit required documents including transcripts, test scores, and recommendations",
      icon: FileText
    },
    {
      step: "03",
      title: "Pay Application Fee",
      description: "Submit the non-refundable application fee of $50",
      icon: DollarSign
    },
    {
      step: "04",
      title: "Interview",
      description: "Schedule and complete an interview with our admissions team",
      icon: GraduationCap
    },
    {
      step: "05",
      title: "Receive Decision",
      description: "Get notified of your admission decision within 2-3 weeks",
      icon: CheckCircle
    }
  ]

  const requirements = [
    "Completed application form",
    "Official high school transcripts",
    "Standardized test scores (SAT/ACT)",
    "Two letters of recommendation",
    "Personal statement or essay",
    "Application fee ($50)",
    "Proof of English proficiency (for international students)"
  ]

  const programs = [
    {
      name: "FSC Pre-Medical",
      duration: "2 Years",
      seats: "120",
      requirements: "Biology, Chemistry, Physics",
      description: "Foundation course for medical studies with comprehensive science curriculum"
    },
    {
      name: "Engineering",
      duration: "4 Years",
      seats: "200",
      requirements: "Mathematics, Physics, Chemistry",
      description: "Various engineering disciplines with modern curriculum and practical training"
    },
    {
      name: "Computer Science",
      duration: "4 Years",
      seats: "150",
      requirements: "Mathematics, Computer Science",
      description: "Cutting-edge computer science program with industry partnerships"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Apply to <span className="text-yellow-300">HIMS Degree College</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Take the first step towards your future. Our streamlined application process 
              makes it easy to join our community of learners and achievers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Application <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to complete your application and join our community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {applicationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {step.step}
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of academic programs designed for your success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 card-hover"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{program.name}</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Seats:</span>
                    <span className="font-semibold">{program.seats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Requirements:</span>
                    <span className="font-semibold text-sm">{program.requirements}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                <button className="btn-primary w-full">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Application <span className="gradient-text">Requirements</span>
            </h2>
            <p className="text-xl text-gray-600">
              Ensure you have all the necessary documents ready before starting your application.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <motion.div
                  key={requirement}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Your <span className="gradient-text">Application</span>
            </h2>
            <p className="text-xl text-gray-600">
              Complete the form below to begin your application process.
            </p>
          </motion.div>

          <ApplicationForm />
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Important <span className="text-yellow-300">Dates</span>
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Mark these important dates in your calendar for the upcoming academic year.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Application Deadline", date: "March 15, 2024", icon: Calendar },
              { title: "Interview Period", date: "March 20 - April 10", icon: Clock },
              { title: "Decision Release", date: "April 15, 2024", icon: Award }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm text-center"
              >
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-primary-100">{item.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ApplyPage 
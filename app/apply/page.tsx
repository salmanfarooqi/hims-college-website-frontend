'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Award, ArrowRight, CheckCircle, FileText, GraduationCap, DollarSign, CreditCard } from 'lucide-react'
import ApplicationForm from '../components/ApplicationForm'

const ApplyPage = () => {
  const applicationSteps = [
    {
      step: "01",
      title: "Complete Application",
      description: "Fill out the online application form with your personal and academic information",
      icon: FileText
    },
    {
      step: "02",
      title: "Pay Application Fee",
      description: "Pay Rs. 200 application fee via EasyPaisa and upload transaction receipt",
      icon: CreditCard
    },
    {
      step: "03",
      title: "Submit Documents",
      description: "Upload required transaction receipt and provide transaction ID",
      icon: FileText
    },
    {
      step: "04",
      title: "Application Review",
      description: "Our admissions team will review your application and documents",
      icon: GraduationCap
    },
    {
      step: "05",
      title: "Receive Decision",
      description: "Get notified of your admission decision within 1-2 weeks",
      icon: CheckCircle
    }
  ]

  const requirements = [
    "Completed application form",
    "Application fee payment (Rs. 200)",
    "EasyPaisa transaction receipt",
    "Valid transaction ID",
    "Previous academic records",
    "Personal and contact information",
    "Father's name and family details"
  ]

  const programs = [
    {
      name: "FSC Pre-Medical",
      duration: "2 Years",
      seats: "120",
      requirements: "Biology, Chemistry, Physics, Mathematics",
      description: "Foundation course for medical studies with comprehensive science curriculum and practical training"
    },
    {
      name: "FSC Pre-Engineering",
      duration: "2 Years",
      seats: "100",
      requirements: "Mathematics, Physics, Chemistry",
      description: "Engineering foundation program with focus on core subjects and practical applications"
    },
    {
      name: "Computer Science",
      duration: "2 Years",
      seats: "80",
      requirements: "Mathematics, Computer Science, Physics",
      description: "Modern computer science program with programming, software development, and technology training"
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
            <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm inline-block">
              <p className="text-lg font-semibold">Application Fee: <span className="text-yellow-300">Rs. 200</span></p>
              <p className="text-sm text-primary-100">Pay via EasyPaisa • Non-refundable</p>
            </div>
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
              Choose from our comprehensive 2-year programs designed for your academic success.
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
                className="bg-gray-50 rounded-xl p-6 card-hover border-2 border-gray-100 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                  <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                    {program.duration}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Seats:</span>
                    <span className="font-semibold text-primary-600">{program.seats}</span>
                  </div>
                  <div className="border-t pt-3">
                    <span className="text-gray-600 text-sm font-medium">Core Subjects:</span>
                    <p className="text-sm text-gray-800 mt-1">{program.requirements}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Payment <span className="gradient-text">Information</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simple and secure payment process via EasyPaisa.
            </p>
          </motion.div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-primary-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Application Fee</h3>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <p className="text-3xl font-bold text-primary-800">Rs. 200</p>
                  <p className="text-sm text-primary-600">One-time application fee</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Non-refundable fee
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Required for all programs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Includes application processing
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                </div>
                                 <div className="bg-green-50 rounded-lg p-4 mb-4">
                   <p className="font-semibold text-green-800">EasyPaisa Account</p>
                   <p className="text-lg font-mono text-green-700">0300-1234567</p>
                   <p className="text-sm text-green-600">Available 24/7</p>
                 </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">1</span>
                    <span className="text-gray-600">Send Rs. 200 to our EasyPaisa account</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">2</span>
                    <span className="text-gray-600">Take screenshot of transaction receipt</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded mr-2 mt-0.5">3</span>
                    <span className="text-gray-600">Upload receipt and enter transaction ID in form</span>
                  </div>
                </div>
              </div>
            </div>
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
              Make sure you have everything ready before starting your application.
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
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{requirement}</span>
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
              { title: "Document Review", date: "March 20 - April 5", icon: Clock },
              { title: "Admission Results", date: "April 10, 2024", icon: Award }
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
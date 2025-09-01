'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Award, ArrowRight, CheckCircle, FileText, GraduationCap, DollarSign, CreditCard } from 'lucide-react'
import ApplicationForm from '../components/ApplicationForm'
import Footer from '../components/Footer'

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
      description: "Pay Rs. 500 application fee via EasyPaisa and upload transaction receipt",
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
    "Completed application form with personal details",
    "Application fee payment (Rs. 500)",
    "DMC of Metric result card",
    "Passport size photograph",
    "Father's CNIC copy",
    "Migration certificate (if applicable)",
    "EasyPaisa transaction receipt",
    "Valid transaction ID"
  ]

  const programs = [
    {
      name: "FSC Pre-Medical",
      duration: "2 Years",
      seats: "120",
      requirements: "Biology, Chemistry, Physics, Mathematics",
      description: "Foundation course for medical studies with comprehensive science curriculum and practical training",
      class: "1st Year & 2nd Year"
    },
    {
      name: "FSC Pre-Engineering",
      duration: "2 Years",
      seats: "100",
      requirements: "Mathematics, Physics, Chemistry",
      description: "Engineering foundation program with focus on core subjects and practical applications",
      class: "1st Year & 2nd Year"
    },
    {
      name: "FSC Pre-Computer Science",
      duration: "2 Years",
      seats: "80",
      requirements: "Mathematics, Computer Science, Physics",
      description: "Modern computer science program with programming, software development, and technology training",
      class: "1st Year & 2nd Year"
    },
    {
      name: "Arts",
      duration: "2 Years",
      seats: "60",
      requirements: "English, Urdu, Islamic Studies, Pakistan Studies",
      description: "Comprehensive arts program focusing on humanities, languages, and social sciences",
      class: "1st Year & 2nd Year"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Application Form only */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Start Your <span className="gradient-text">Application</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2">
              Complete the form below to begin your application process.
            </p>
          </motion.div>

          <ApplicationForm />
        </div>
      </section>
    <Footer/>
    </div>
  )
}

export default ApplyPage 
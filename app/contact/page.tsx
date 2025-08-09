'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, Building } from 'lucide-react'
import Link from 'next/link'
import Footer from '../components/Footer'

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['0915243868', '03005928890'],
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['himscollege06@gmail.com', ],
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['HIMS Degree College ', 'Peshawar ,Kpk , Pakistan'],
      color: 'text-purple-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Mon - Sat: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      color: 'text-orange-600'
    }
  ]

  const departments = [
    {
      name: 'Admissions Office',
      email: 'himscollege06@gmail.com',
      phone: '03159877044 ',
      description: 'Application inquiries, enrollment, and student services'
    },
    {
      name: 'Academic Affairs',
      email: 'himscollege06@gmail.com',
      phone: '03229053724',
      description: 'Curriculum, courses, and academic programs'
    },
    {
      name: 'Student Support',
      email: 'himscollege06@gmail.com',
      phone: '03229053724',
      description: 'Student counseling, guidance, and general support'
    },
    {
      name: 'Finance Office',
      email: 'himscollege06@gmail.com',
      phone: '03139559818',
      description: 'Fee payments, scholarships, and financial aid'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Contact <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">HIMS College</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help you with any questions about our programs, admissions process, or campus life. Reach out to us today!
            </p>
          </motion.div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 mb-4`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="Your first name"
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="+92 (xxx) xxx-xxxx"
                    />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300">
                    <option>General Inquiry</option>
                    <option>Admissions Information</option>
                    <option>Academic Programs</option>
                    <option>Campus Visit</option>
                    <option>Financial Aid</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                    placeholder="Please share your questions or comments..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Departments & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Departments */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mr-4">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Departments</h2>
                    <p className="text-gray-600">Direct contact to specific departments</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={dept.name} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300">
                      <h3 className="font-bold text-gray-900 mb-1">{dept.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm">
                        <div className="flex items-center text-blue-600">
                          <Mail className="w-4 h-4 mr-1" />
                          <a href={`mailto:${dept.email}`} className="hover:underline">{dept.email}</a>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Phone className="w-4 h-4 mr-1" />
                          <a href={`tel:${dept.phone}`} className="hover:underline">{dept.phone}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/apply" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Apply for Admission
                  </Link>
                  <Link href="/#track" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Track Application Status
                  </Link>
                  <Link href="/#programs" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    View Academic Programs
                  </Link>
                  <Link href="/#facilities" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Campus Tour & Facilities
                  </Link>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  Find Us
                </h3>
                <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">HIMS College Campus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default ContactPage 
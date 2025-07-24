'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  BookOpen, 
  ArrowRight, 
  RefreshCw, 
  Download,
  Bell,
  MessageSquare,
  Info
} from 'lucide-react'

interface ApplicationStatus {
  id: number
  firstName: string
  lastName: string
  email: string
  program: string
  status: 'pending' | 'reviewed' | 'approved' | 'rejected'
  applicationDate: string
  notes?: string
}

const ApplicationTracker = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [application, setApplication] = useState<ApplicationStatus | null>(null)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    setError('')
    setApplication(null)

    try {
      const { applicationsAPI } = await import('../../services');
      const data = await applicationsAPI.getStatusByEmail(email);
      setApplication(data);
    } catch (error: any) {
      setError(error.message || 'Application not found. Please check your email address and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          accent: 'bg-emerald-500'
        }
      case 'rejected':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          accent: 'bg-red-500'
        }
      case 'reviewed':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          accent: 'bg-amber-500'
        }
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          accent: 'bg-blue-500'
        }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-emerald-600" />
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-600" />
      case 'reviewed':
        return <Eye className="w-6 h-6 text-amber-600" />
      default:
        return <Clock className="w-6 h-6 text-blue-600" />
    }
  }

  const getProgressSteps = (status: string) => {
    const steps = [
      { name: 'Application Submitted', status: 'completed' },
      { name: 'Under Review', status: status === 'pending' ? 'current' : 'completed' },
      { name: 'Decision Made', status: status === 'reviewed' ? 'current' : status === 'approved' || status === 'rejected' ? 'completed' : 'pending' },
      { name: 'Final Result', status: status === 'approved' || status === 'rejected' ? 'completed' : 'pending' }
    ]
    return steps
  }

  return (
    <section id="track" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-8 shadow-lg"
          >
            <FileText className="w-5 h-5 mr-2" />
            Advanced Application Status Portal
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Track Your 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
              Academic Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience real-time application tracking with detailed progress updates, 
            personalized feedback, and seamless communication with our admissions team.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            {[
              { number: '24/7', label: 'Tracking Available' },
              { number: '< 2hrs', label: 'Update Response' },
              { number: '98%', label: 'Accuracy Rate' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 lg:p-12 mb-10"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Enter Your Application Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-inner"
                    placeholder="student@example.com"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">Secure Search</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Use the same email address you provided during application submission
                </p>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading || !email.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                    Searching Application Database...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6 mr-3" />
                    Track My Application Status
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="p-3 bg-red-100 rounded-full mr-4">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800 mb-2">Application Not Found</h3>
                    <p className="text-red-700 text-sm mb-3">{error}</p>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setError('')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Try Again
                      </button>
                      <button className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Application Status Display */}
        <AnimatePresence>
          {application && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
            >
              {/* Status Header */}
              <div className={`${getStatusColor(application.status).bg} ${getStatusColor(application.status).border} border-b-2 p-8`}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className={`p-4 ${getStatusColor(application.status).accent} rounded-2xl shadow-xl`}>
                      {getStatusIcon(application.status)}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-1">Application Found!</h3>
                      <p className={`${getStatusColor(application.status).text} font-semibold text-xl capitalize flex items-center`}>
                        Status: {application.status}
                        <span className="ml-2 w-2 h-2 bg-current rounded-full animate-pulse"></span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 shadow-lg hover:shadow-xl rounded-xl font-medium transition-all duration-200">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold text-gray-900">Application Progress</h4>
                    <div className="text-sm text-gray-600">
                      {getProgressSteps(application.status).filter(step => step.status === 'completed').length} of {getProgressSteps(application.status).length} steps completed
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {getProgressSteps(application.status).map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                          step.status === 'completed' 
                            ? 'bg-emerald-50 border-emerald-200' 
                            : step.status === 'current'
                            ? `${getStatusColor(application.status).bg} ${getStatusColor(application.status).border}`
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            step.status === 'completed' 
                              ? 'bg-emerald-500 text-white' 
                              : step.status === 'current'
                              ? `${getStatusColor(application.status).accent} text-white`
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {step.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-xs font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {step.name}
                          </div>
                        </div>
                        
                        {step.status === 'current' && (
                          <div className="absolute -top-1 -right-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Personal Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Personal Information
                    </h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Full Name', value: `${application.firstName} ${application.lastName}`, icon: User },
                        { label: 'Email', value: application.email, icon: Mail },
                        { label: 'Program', value: application.program, icon: BookOpen },
                        { label: 'Applied', value: new Date(application.applicationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }), icon: Calendar }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <item.icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-600 text-sm">{item.label}:</span>
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">{item.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Status Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Status Details
                    </h4>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl ${getStatusColor(application.status).bg} ${getStatusColor(application.status).border} border`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-700">Current Status:</span>
                          <span className={`${getStatusColor(application.status).text} font-bold capitalize flex items-center`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-2">{application.status}</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div 
                            className={`h-2 rounded-full ${getStatusColor(application.status).accent} transition-all duration-1000`}
                            style={{ 
                              width: `${
                                application.status === 'pending' ? '25%' :
                                application.status === 'reviewed' ? '75%' :
                                application.status === 'approved' || application.status === 'rejected' ? '100%' : '0%'
                              }` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                          <div className="text-lg font-bold text-blue-600">
                            {Math.floor((Date.now() - new Date(application.applicationDate).getTime()) / (1000 * 60 * 60 * 24))}
                          </div>
                          <div className="text-xs text-gray-600">Days Since Applied</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
                          <div className="text-lg font-bold text-green-600">98%</div>
                          <div className="text-xs text-gray-600">Processing Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                {application.notes && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                      Message from Admissions Team
                    </h4>
                    <div className="bg-white/80 rounded-xl p-4 border border-blue-100">
                      <p className="text-gray-700 italic leading-relaxed">"{application.notes}"</p>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-emerald-600" />
                    Need Assistance?
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                      +92 (xxx) xxx-xxxx
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                      admissions@hims.edu.pk
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                      HIMS Campus, City
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ApplicationTracker 
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react'

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
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/applications/status/${encodeURIComponent(email)}`)
      
      if (response.ok) {
        const data = await response.json()
        setApplication(data)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Application not found')
      }
    } catch (error) {
      setError('Failed to fetch application status. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'reviewed':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5" />
      case 'rejected':
        return <XCircle className="w-5 h-5" />
      case 'reviewed':
        return <Eye className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  return (
    <section id="track" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your <span className="gradient-text">Application</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your email address to check the status of your application and view any remarks from our admissions team.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter the email you used for application"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track Application
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Application Status */}
        {application && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Application Status</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                <span className="ml-2 capitalize">{application.status}</span>
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Applicant Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {application.firstName} {application.lastName}</p>
                  <p><span className="font-medium">Email:</span> {application.email}</p>
                  <p><span className="font-medium">Program:</span> {application.program}</p>
                  <p><span className="font-medium">Application Date:</span> {new Date(application.applicationDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Status Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Current Status:</span> <span className="capitalize">{application.status}</span></p>
                  <p><span className="font-medium">Last Updated:</span> {new Date(application.applicationDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {application.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Remarks from Admissions Team</h4>
                <p className="text-gray-700 italic">"{application.notes}"</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <div className="text-sm text-blue-800">
                {application.status === 'pending' && (
                  <p>Your application is under review. We will contact you within 2-3 weeks with our decision.</p>
                )}
                {application.status === 'reviewed' && (
                  <p>Your application has been reviewed. You will receive a final decision shortly.</p>
                )}
                {application.status === 'approved' && (
                  <p>Congratulations! Your application has been approved. Please check your email for next steps.</p>
                )}
                {application.status === 'rejected' && (
                  <p>We regret to inform you that your application was not approved. Please contact us for more information.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ApplicationTracker 
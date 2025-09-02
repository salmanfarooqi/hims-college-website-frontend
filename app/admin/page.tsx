'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  EyeOff,
  Edit, 
  Search,
  Filter,
  Download,
  LogOut,
  TrendingUp,
  Calendar,
  ImageIcon,
  Archive,
  Loader,
  X,
  CreditCard,
  Receipt,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Info
} from 'lucide-react'
import { API_BASE_URL } from '../../services'

interface Application {
  _id: string
  firstName: string
  lastName: string
  fatherName: string
  email?: string
  phone?: string
  guardianPhone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  class: string
  group: string
  address: string
  // New simplified education fields
  metricYear?: string
  metricRollNumber?: string
  metricMarks?: string
  metricSchool?: string
  // Legacy nested structure (for backward compatibility)
  education?: {
    metric: {
      year: string
      rollNumber: string
      marks: string
      school: string
    }
  }
  documents: {
    dmcMetric: string
    passportPhoto: string
    fatherCNIC: string
    migrationCertificate?: string
  }
  paymentAmount: string
  easypaisaNumber: string
  transactionId: string
  transactionReceipt: string
  status: 'pending' | 'approved' | 'rejected'
  applicationDate: string
  createdAt: string
  updatedAt: string
  notes?: string
}

interface Statistics {
  total: number
  pending: number
  approved: number
  rejected: number
  totalPayments?: number
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalPayments: 0
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Check authentication and load data
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
      fetchApplications()
      fetchStatistics()
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError(null)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { adminAPI } = await import('../../services')
      const data = await adminAPI.login(email, password)
      console.log('✅ Login successful - setting token:', data.token ? 'Present' : 'Missing')
      localStorage.setItem('adminToken', data.token)
      setIsAuthenticated(true)
      fetchApplications()
      fetchStatistics()
      console.log('🔄 Reloading page to update layout...')
      // Force a page refresh to ensure the layout re-renders with the new auth state
      window.location.reload()
    } catch (error: any) {
      console.error('Login failed:', error)
      setLoginError(error.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const { applicationsAPI } = await import('../../services')
      const data = await applicationsAPI.getAll()
      // Handle different API response formats
      const applicationsArray = Array.isArray(data) ? data : (data.applications || [])
      setApplications(applicationsArray)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setApplications([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const { applicationsAPI } = await import('../../services')
      const data = await applicationsAPI.getStatistics()
      setStatistics(data)
    } catch (error) {
      console.error('Failed to fetch statistics:', error)
    }
  }

  const updateApplicationStatus = async (id: string, status: string, notes?: string) => {
    try {
      const { applicationsAPI } = await import('../../services')
      await applicationsAPI.updateStatus(id, status, notes)
      fetchApplications()
      fetchStatistics()
      setShowModal(false)
      setSelectedApplication(null)
    } catch (error: any) {
      console.error('Update failed:', error)
      alert(error.message || 'Update failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle
      case 'rejected': return XCircle
      default: return Clock
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email && app.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      app.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    
    return matchesSearch && matchesStatus
  })



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Sign in to access the admin dashboard</p>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
            >
              <p className="text-red-600 text-sm">{loginError}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                disabled={isLoggingIn}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                placeholder="test@gmail.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  disabled={isLoggingIn}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoggingIn}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to HIMS College Admin Dashboard</p>
      </div>
      
      {/* Statistics */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.approved}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.rejected}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {statistics.totalPayments || 0}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, group, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={fetchApplications}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>



      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Applications ({filteredApplications.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group & Education
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((application) => {
                const StatusIcon = getStatusIcon(application.status)
                return (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-bold text-sm">
                            {application.firstName[0]}{application.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {application.firstName} {application.lastName}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {application.gender} • DOB: {new Date(application.dateOfBirth).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" />
                          <span className="truncate">{application.email || 'Not provided'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {application.phone || 'Not provided'}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          Guardian: {application.guardianPhone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                          <span className="truncate">{application.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{application.group}</div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center mb-1">
                            <GraduationCap className="w-3 h-3 mr-1" />
                            Class: {application.class}
                          </div>
                          <div>Group: {application.group}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-2 text-green-600" />
                          <span className="text-sm font-semibold text-green-600">Rs. {application.paymentAmount}</span>
                        </div>
                        <div className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                          {application.transactionId}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedApplication(application)
                              setShowModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-700 text-xs font-medium flex items-center"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for viewing/editing applications */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
          <div className="relative top-4 sm:top-8 lg:top-20 mx-auto p-4 sm:p-6 border w-full max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Personal Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedApplication.firstName} {selectedApplication.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gender</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Group</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.group}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Class</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.class}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Address Information</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Home Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>

                {/* Education Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Education Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Metric Year</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.metricYear || selectedApplication.education?.metric?.year || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.metricRollNumber || selectedApplication.education?.metric?.rollNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Marks</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.metricMarks || selectedApplication.education?.metric?.marks || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">School</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.metricSchool || selectedApplication.education?.metric?.school || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount Paid</label>
                      <p className="mt-1 text-sm font-bold text-green-600">Rs. {selectedApplication.paymentAmount}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">EasyPaisa Number</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.easypaisaNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                      <p className="mt-1 text-sm font-mono text-gray-900">{selectedApplication.transactionId}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700">Transaction Receipt</label>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">
                        {selectedApplication.transactionReceipt ? (
                          <span className="text-green-600 font-medium">✓ Receipt uploaded</span>
                        ) : (
                          <span className="text-red-600 font-medium">✗ Receipt not uploaded</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Documents Section - Improved Width and Style */}
                {selectedApplication.documents && (
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-slate-200 shadow-lg">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center text-lg">
                      <FileText className="w-6 h-6 mr-3 text-blue-600" />
                      Application Documents
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {/* DMC of Metric */}
                      {selectedApplication.documents.dmcMetric && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">📚</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 text-base">DMC of Metric</h5>
                                <p className="text-green-600 text-sm font-medium">✓ Uploaded</p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(selectedApplication.documents.dmcMetric.startsWith('http') ? selectedApplication.documents.dmcMetric : `https://hims-college-backend.vercel.app/${selectedApplication.documents.dmcMetric}`, '_blank')}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              View Document
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Passport Photo */}
                      {selectedApplication.documents.passportPhoto && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">🖼️</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 text-base">Passport Photo</h5>
                                <p className="text-green-600 text-sm font-medium">✓ Uploaded</p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(selectedApplication.documents.passportPhoto.startsWith('http') ? selectedApplication.documents.passportPhoto : `https://hims-college-backend.vercel.app/${selectedApplication.documents.passportPhoto}`, '_blank')}
                              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              View Photo
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Father's CNIC */}
                      {selectedApplication.documents.fatherCNIC && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">🆔</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 text-base">Father's CNIC</h5>
                                <p className="text-green-600 text-sm font-medium">✓ Uploaded</p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(selectedApplication.documents.fatherCNIC.startsWith('http') ? selectedApplication.documents.fatherCNIC : `https://hims-college-backend.vercel.app/${selectedApplication.documents.fatherCNIC}`, '_blank')}
                              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              View CNIC
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Migration Certificate */}
                      {/* {selectedApplication.documents.migrationCertificate && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">📝</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 text-base">Migration Certificate</h5>
                                <p className="text-green-600 text-sm font-medium">✓ Uploaded</p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(selectedApplication.documents.migrationCertificate.startsWith('http') ? selectedApplication.documents.migrationCertificate : `https://hims-college-backend.vercel.app/${selectedApplication.documents.migrationCertificate}`, '_blank')}
                              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              View Certificate
                            </button>
                          </div>
                        </div>
                      )} */}

                      {/* Transaction Receipt */}
                      {selectedApplication.transactionReceipt && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mr-4">
                                <span className="text-xl">🧾</span>
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 text-base">Transaction Receipt</h5>
                                <p className="text-green-600 text-sm font-medium">✓ Uploaded</p>
                              </div>
                            </div>
                            <button
                              onClick={() => window.open(selectedApplication.transactionReceipt.startsWith('http') ? selectedApplication.transactionReceipt : `https://hims-college-backend.vercel.app/${selectedApplication.transactionReceipt}`, '_blank')}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              View Receipt
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'approved')}
                      className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'rejected')}
                      className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'pending')}
                      className="px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm sm:text-base"
                    >
                      Mark as Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard 
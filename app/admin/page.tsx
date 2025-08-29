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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
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
              
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
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
                  <h4 className="font-semibold text-gray-900 mb-3">Address Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Home Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedApplication.address}</p>
                    </div>
                  </div>
                </div>

                {/* Education Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Education Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
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
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                    Payment Information
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
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
                    {selectedApplication.transactionReceipt && (
                      <div className="mt-2">
                        <a 
                          href={selectedApplication.transactionReceipt.startsWith('http') ? selectedApplication.transactionReceipt : `${API_BASE_URL}/${selectedApplication.transactionReceipt}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                          <Receipt className="w-4 h-4 mr-2" />
                          View Receipt
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Documents
                  </h4>
                  
                  {/* Academic Documents */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Academic Documents
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">📚 DMC of Metric</label>
                        {selectedApplication.documents?.dmcMetric ? (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <a 
                                href={selectedApplication.documents.dmcMetric.startsWith('http') ? selectedApplication.documents.dmcMetric : `https://hims-college-backend.vercel.app/${selectedApplication.documents.dmcMetric}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                View Document
                              </a>
                              <button
                                onClick={() => {
                                  if (selectedApplication.documents?.dmcMetric) {
                                    const url = selectedApplication.documents.dmcMetric.startsWith('http') 
                                      ? selectedApplication.documents.dmcMetric 
                                      : `https://hims-college-backend.vercel.app/${selectedApplication.documents.dmcMetric}`;
                                    window.open(url, '_blank');
                                  }
                                }}
                                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </button>
                            </div>
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              {selectedApplication.documents.dmcMetric.includes('cloudinary.com') ? '☁️ Cloudinary Link' : '📁 Uploaded File'}
                            </div>
                          </div>
                        ) : (
                          <div className="text-red-600 font-medium flex items-center">
                            <XCircle className="w-4 h-4 mr-2" />
                            Not uploaded
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">📝 Migration Certificate</label>
                        {selectedApplication.documents?.migrationCertificate ? (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <a 
                                href={selectedApplication.documents.migrationCertificate.startsWith('http') ? selectedApplication.documents.migrationCertificate : `https://hims-college-backend.vercel.app/${selectedApplication.documents.migrationCertificate}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                View Certificate
                              </a>
                              <button
                                onClick={() => {
                                  if (selectedApplication.documents?.migrationCertificate) {
                                    const url = selectedApplication.documents.migrationCertificate.startsWith('http') 
                                      ? selectedApplication.documents.migrationCertificate 
                                      : `https://hims-college-backend.vercel.app/${selectedApplication.documents.migrationCertificate}`;
                                    window.open(url, '_blank');
                                  }
                                }}
                                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </button>
                            </div>
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              {selectedApplication.documents.migrationCertificate.includes('cloudinary.com') ? '☁️ Cloudinary Link' : '📁 Uploaded File'}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-600 font-medium flex items-center">
                            <span className="text-yellow-600 mr-2">📝</span>
                            Optional - Not uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Documents */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Personal Documents
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">🖼️ Passport Photo</label>
                        {selectedApplication.documents?.passportPhoto ? (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <a 
                                href={selectedApplication.documents.passportPhoto.startsWith('http') ? selectedApplication.documents.passportPhoto : `https://hims-college-backend.vercel.app/${selectedApplication.documents.passportPhoto}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                              >
                                <User className="w-4 h-4 mr-2" />
                                View Photo
                              </a>
                              <button
                                onClick={() => {
                                  if (selectedApplication.documents?.passportPhoto) {
                                    const url = selectedApplication.documents.passportPhoto.startsWith('http') 
                                      ? selectedApplication.documents.passportPhoto 
                                      : `https://hims-college-backend.vercel.app/${selectedApplication.documents.passportPhoto}`;
                                    window.open(url, '_blank');
                                  }
                                }}
                                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </button>
                            </div>
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              {selectedApplication.documents.passportPhoto.includes('cloudinary.com') ? '☁️ Cloudinary Link' : '📁 Uploaded File'}
                            </div>
                          </div>
                        ) : (
                          <div className="text-red-600 font-medium flex items-center">
                            <XCircle className="w-4 h-4 mr-2" />
                            Not uploaded
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">🆔 Father's CNIC</label>
                        {selectedApplication.documents?.fatherCNIC ? (
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <a 
                                href={selectedApplication.documents.fatherCNIC.startsWith('http') ? selectedApplication.documents.fatherCNIC : `https://hims-college-backend.vercel.app/${selectedApplication.documents.fatherCNIC}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-colors"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                View CNIC
                              </a>
                              <button
                                onClick={() => {
                                  if (selectedApplication.documents?.fatherCNIC) {
                                    const url = selectedApplication.documents.fatherCNIC.startsWith('http') 
                                      ? selectedApplication.documents.fatherCNIC 
                                      : `https://hims-college-backend.vercel.app/${selectedApplication.documents.fatherCNIC}`;
                                    window.open(url, '_blank');
                                  }
                                }}
                                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </button>
                            </div>
                            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              {selectedApplication.documents.fatherCNIC.includes('cloudinary.com') ? '☁️ Cloudinary Link' : '📁 Uploaded File'}
                            </div>
                          </div>
                        ) : (
                          <div className="text-red-600 font-medium flex items-center">
                            <XCircle className="w-4 h-4 mr-2" />
                            Not uploaded
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'approved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'pending')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
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
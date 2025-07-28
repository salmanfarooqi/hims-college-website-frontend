'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit, 
  Search,
  Filter,
  Download,
  Eye,
  X,
  CreditCard,
  Receipt,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  GraduationCap,
  RefreshCw
} from 'lucide-react'

interface Application {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: string
  city: string
  state: string
  zipCode: string
  program: string
  previousSchool: string
  previousGrade: string
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

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [programFilter, setProgramFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://hims-college-backend.vercel.app/api/applications?limit=100', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Applications data:', data)
        const applicationsArray = Array.isArray(data) ? data : (data.applications || [])
        setApplications(applicationsArray)
      } else {
        console.error('Failed to fetch applications:', response.statusText)
        setApplications([])
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setApplications([])
    } finally {
      setIsLoading(false)
    }
  }

  const updateApplicationStatus = async (id: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`https://hims-college-backend.vercel.app/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, notes })
      })

      if (response.ok) {
        fetchApplications()
        setShowModal(false)
        setSelectedApplication(null)
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      console.error('Update failed:', error)
      alert('Update failed')
    }
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
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesProgram = programFilter === 'all' || app.program === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Applications</h1>
        <p className="text-gray-600">Manage and review all student applications</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={fetchApplications}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Applications ({filteredApplications.length})
          </h2>
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
                  Program & Academic
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
                  <tr key={application._id} className="hover:bg-gray-50 transition-colors">
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
                          <span className="truncate">{application.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" />
                          {application.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                          <span className="truncate">{application.city}, {application.state}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{application.program}</div>
                        <div className="text-xs text-gray-500">
                          <div className="flex items-center mb-1">
                            <GraduationCap className="w-3 h-3 mr-1" />
                            {application.previousSchool}
                          </div>
                          <div>Grade: {application.previousGrade}</div>
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
                          <select
                            value={application.status}
                            onChange={(e) => updateApplicationStatus(application._id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
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
                          {application.transactionReceipt && (
                            <a 
                              href={`https://hims-college-backend.vercel.app/${application.transactionReceipt}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center"
                            >
                              <Receipt className="w-3 h-3 mr-1" />
                              Receipt
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Detailed Application Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Application Details - {selectedApplication.firstName} {selectedApplication.lastName}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.firstName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <p className="mt-1 text-sm text-gray-900 capitalize">{selectedApplication.gender}</p>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Address Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Complete Address</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedApplication.address}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.city}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">State/Province</label>
                          <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.state}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                          <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.zipCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Academic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Program Applied For</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.program}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Previous Grade/Result</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.previousGrade}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Previous School/Institution</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedApplication.previousSchool}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Payment Information */}
                  <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                    <h4 className="font-bold text-yellow-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Application Fee</label>
                          <p className="mt-1 text-lg font-bold text-green-600">Rs. {selectedApplication.paymentAmount}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                          <p className="mt-1 text-sm text-gray-900 font-medium">EasyPaisa</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Student's EasyPaisa Number</label>
                        <p className="mt-1 text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded border">
                          {selectedApplication.easypaisaNumber}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                        <p className="mt-1 text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded border">
                          {selectedApplication.transactionId}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Transaction Receipt</label>
                        {selectedApplication.transactionReceipt ? (
                          <div className="mt-2">
                            <a 
                              href={`https://hims-college-backend.vercel.app/${selectedApplication.transactionReceipt}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                              <Receipt className="w-4 h-4 mr-2" />
                              View Receipt
                            </a>
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-red-600">No receipt uploaded</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Application Status */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Application Status
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Status</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)} mt-1`}>
                          {(() => {
                            const StatusIcon = getStatusIcon(selectedApplication.status);
                            return <StatusIcon className="w-4 h-4 mr-1" />;
                          })()}
                          {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Application Submitted</label>
                          <p className="mt-1 text-sm text-gray-900">
                            {new Date(selectedApplication.createdAt).toLocaleDateString()} at{' '}
                            {new Date(selectedApplication.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                          <p className="mt-1 text-sm text-gray-900">
                            {new Date(selectedApplication.updatedAt).toLocaleDateString()} at{' '}
                            {new Date(selectedApplication.updatedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      {selectedApplication.notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Notes</label>
                          <p className="mt-1 text-sm text-gray-900 bg-white p-3 rounded border">
                            {selectedApplication.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Update Actions */}
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Update Application Status</h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication._id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication._id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication._id, 'pending')}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Mark as Pending
                      </button>
                    </div>
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

export default ApplicationsPage 
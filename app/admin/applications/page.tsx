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
  RefreshCw,
  Info
} from 'lucide-react'

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

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [groupFilter, setGroupFilter] = useState('all')
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

  // Helper function to get education data consistently
  const getEducationData = (application: Application) => {
    return {
      year: application.metricYear || application.education?.metric?.year || 'Not provided',
      rollNumber: application.metricRollNumber || application.education?.metric?.rollNumber || 'Not provided',
      marks: application.metricMarks || application.education?.metric?.marks || 'Not provided',
      school: application.metricSchool || application.education?.metric?.school || 'Not provided'
    };
  };

  // Helper function to check document completion status
  const getDocumentStatus = (application: Application) => {
    const requiredDocs = [
      application.documents.dmcMetric,
      application.documents.passportPhoto,
      application.documents.fatherCNIC,
      application.transactionReceipt
    ];
    
    const uploadedDocs = requiredDocs.filter(doc => doc).length;
    const totalRequired = requiredDocs.length;
    
    return {
      uploaded: uploadedDocs,
      total: totalRequired,
      percentage: Math.round((uploadedDocs / totalRequired) * 100),
      isComplete: uploadedDocs === totalRequired
    };
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.email && app.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      app.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone && app.phone.includes(searchTerm)) ||
      app.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesGroup = groupFilter === 'all' || app.group === groupFilter
    
    return matchesSearch && matchesStatus && matchesGroup
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
                placeholder="Search by name, email, phone, group, or transaction ID..."
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
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Groups</option>
              <option value="FSC Pre-Medical">FSC Pre-Medical</option>
              <option value="FSC Pre-Engineering">FSC Pre-Engineering</option>
              <option value="FSC Pre-Computer Science">FSC Pre-Computer Science</option>
              <option value="Arts">Arts</option>
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
                  Student Name
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
                         
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4">
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
                    </td> */}
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
                        
                        {/* Document Status Indicator */}
                        <div className="mt-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">Docs:</span>
                            <div className="flex space-x-1">
                              <span className={`w-2 h-2 rounded-full ${application.documents.dmcMetric ? 'bg-green-500' : 'bg-red-500'}`} title="DMC"></span>
                              <span className={`w-2 h-2 rounded-full ${application.documents.passportPhoto ? 'bg-green-500' : 'bg-red-500'}`} title="Photo"></span>
                              <span className={`w-2 h-2 rounded-full ${application.documents.fatherCNIC ? 'bg-green-500' : 'bg-red-500'}`} title="CNIC"></span>
                              <span className={`w-2 h-2 rounded-full ${application.transactionReceipt ? 'bg-green-500' : 'bg-red-500'}`} title="Receipt"></span>
                            </div>
                            <span className="text-xs text-gray-400">
                              ({[application.documents.dmcMetric, application.documents.passportPhoto, application.documents.fatherCNIC, application.transactionReceipt].filter(Boolean).length}/4)
                            </span>
                          </div>
                        </div>
                        
                        {/* Education Summary */}
                        <div className="mt-2 text-xs text-gray-500">
                          <div className="flex items-center">
                            <span className="mr-1">📚</span>
                            <span>
                              {application.metricYear || application.education?.metric?.year || 'No year'} • 
                              {application.metricMarks || application.education?.metric?.marks || 'No marks'} • 
                              {application.metricSchool || application.education?.metric?.school || 'No school'}
                            </span>
                          </div>
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
                              href={application.transactionReceipt.startsWith('http') ? application.transactionReceipt : `https://hims-college-backend.vercel.app/${application.transactionReceipt}`}
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

              {/* Quick Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Quick Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Class:</span>
                    <span className="ml-2 text-gray-900">{selectedApplication.class}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Group:</span>
                    <span className="ml-2 text-gray-900">{selectedApplication.group}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Fee:</span>
                    <span className="ml-2 text-green-600 font-bold">Rs. {selectedApplication.paymentAmount}</span>
                  </div>
                </div>
              </div>

              {/* Education Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6 border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Education Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Metric Year:</span>
                    <span className="ml-2 text-gray-900 font-medium">{getEducationData(selectedApplication).year}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Roll Number:</span>
                    <span className="ml-2 text-gray-900 font-medium">{getEducationData(selectedApplication).rollNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Marks:</span>
                    <span className="ml-2 text-gray-900 font-medium">{getEducationData(selectedApplication).marks}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">School:</span>
                    <span className="ml-2 text-gray-900 font-medium">{getEducationData(selectedApplication).school}</span>
                  </div>
                </div>
              </div>

              {/* Document Status Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6 border border-green-200">
                <h4 className="font-bold text-green-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Document Status
                </h4>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Documents Uploaded: {getDocumentStatus(selectedApplication).uploaded}/{getDocumentStatus(selectedApplication).total}
                    </span>
                    <span className={`text-sm font-bold ${getDocumentStatus(selectedApplication).isComplete ? 'text-green-600' : 'text-orange-600'}`}>
                      {getDocumentStatus(selectedApplication).percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        getDocumentStatus(selectedApplication).isComplete ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${getDocumentStatus(selectedApplication).percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${selectedApplication.documents.dmcMetric ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium text-gray-700">DMC:</span>
                    <span className="ml-1 text-gray-900">{selectedApplication.documents.dmcMetric ? '✅' : '❌'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${selectedApplication.documents.passportPhoto ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium text-gray-700">Photo:</span>
                    <span className="ml-1 text-gray-900">{selectedApplication.documents.passportPhoto ? '✅' : '❌'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${selectedApplication.documents.fatherCNIC ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium text-gray-700">CNIC:</span>
                    <span className="ml-1 text-gray-900">{selectedApplication.documents.fatherCNIC ? '✅' : '❌'}</span>
                  </div>
                  {/* <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${selectedApplication.documents.migrationCertificate ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <span className="font-medium text-gray-700">Migration:</span>
                    <span className="ml-1 text-gray-900">{selectedApplication.documents.migrationCertificate ? '✅' : '📝'}</span>
                  </div> */}
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${selectedApplication.transactionReceipt ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium text-gray-700">Receipt:</span>
                    <span className="ml-1 text-gray-900">{selectedApplication.transactionReceipt ? '✅' : '❌'}</span>
                  </div>
                </div>

                {/* Warning for missing documents */}
                {!getDocumentStatus(selectedApplication).isComplete && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-yellow-600 mr-2">⚠️</span>
                      <span className="text-sm text-yellow-800 font-medium">
                        {getDocumentStatus(selectedApplication).total - getDocumentStatus(selectedApplication).uploaded} required document(s) missing. 
                        Please ensure all required documents are uploaded before approval.
                      </span>
                    </div>
                  </div>
                )}
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
                        <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.fatherName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Personal Mobile</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedApplication.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Guardian Phone</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.guardianPhone}</p>
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
                        <label className="block text-sm font-medium text-gray-700">Home Address</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedApplication.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Academic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Class</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.class}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Group</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApplication.group}</p>
                      </div>
                    </div>
                  </div>

                  {/* Education Information */}
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-900 mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Education Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Metric Year</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{getEducationData(selectedApplication).year}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{getEducationData(selectedApplication).rollNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Marks</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{getEducationData(selectedApplication).marks}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">School</label>
                        <p className="mt-1 text-sm text-gray-900 font-medium">{getEducationData(selectedApplication).school}</p>
                      </div>
                    </div>
                  </div>



                  {/* Documents Section - Improved Width and Style */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200 shadow-lg">
                    <h4 className="font-bold text-slate-900 mb-8 flex items-center text-xl">
                      <FileText className="w-7 h-7 mr-4 text-blue-600" />
                      Application Documents
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {/* DMC of Metric */}
                      {selectedApplication.documents?.dmcMetric && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4">
                              <span className="text-2xl">📚</span>
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 text-base">DMC of Metric</h5>
                              <p className="text-green-600 text-sm font-medium">✓ Uploaded</p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(selectedApplication.documents.dmcMetric.startsWith('http') ? selectedApplication.documents.dmcMetric : `https://hims-college-backend.vercel.app/${selectedApplication.documents.dmcMetric}`, '_blank')}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            View Document
                          </button>
                        </div>
                      )}

                      {/* Passport Photo */}
                      {selectedApplication.documents?.passportPhoto && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xl">🖼️</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 text-sm">Passport Photo</h5>
                              <p className="text-green-600 text-xs font-medium">✓ Uploaded</p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(selectedApplication.documents.passportPhoto.startsWith('http') ? selectedApplication.documents.passportPhoto : `https://hims-college-backend.vercel.app/${selectedApplication.documents.passportPhoto}`, '_blank')}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors shadow-sm"
                          >
                            View Photo
                          </button>
                        </div>
                      )}

                      {/* Father's CNIC */}
                      {selectedApplication.documents?.fatherCNIC && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xl">🆔</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 text-sm">Father's CNIC</h5>
                              <p className="text-green-600 text-xs font-medium">✓ Uploaded</p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(selectedApplication.documents.fatherCNIC.startsWith('http') ? selectedApplication.documents.fatherCNIC : `https://hims-college-backend.vercel.app/${selectedApplication.documents.fatherCNIC}`, '_blank')}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-colors shadow-sm"
                          >
                            View CNIC
                          </button>
                        </div>
                      )}

                      {/* Migration Certificate */}
                      {/* {selectedApplication.documents?.migrationCertificate && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xl">📝</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 text-sm">Migration Certificate</h5>
                              <p className="text-green-600 text-xs font-medium">✓ Uploaded</p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(selectedApplication.documents.migrationCertificate.startsWith('http') ? selectedApplication.documents.migrationCertificate : `https://hims-college-backend.vercel.app/${selectedApplication.documents.migrationCertificate}`, '_blank')}
                            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors shadow-sm"
                          >
                            View Certificate
                          </button>
                        </div>
                      )} */}

                      {/* Transaction Receipt */}
                      {selectedApplication.transactionReceipt && (
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-xl">🧾</span>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 text-sm">Transaction Receipt</h5>
                              <p className="text-green-600 text-xs font-medium">✓ Uploaded</p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(selectedApplication.transactionReceipt.startsWith('http') ? selectedApplication.transactionReceipt : `https://hims-college-backend.vercel.app/${selectedApplication.transactionReceipt}`, '_blank')}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors shadow-sm"
                          >
                            View Receipt
                          </button>
                        </div>
                      )}
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
                    
                    {/* Document completion warning */}
                    {!getDocumentStatus(selectedApplication).isComplete && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-red-600 mr-2">🚫</span>
                          <span className="text-sm text-red-800 font-medium">
                            Cannot approve application - {getDocumentStatus(selectedApplication).total - getDocumentStatus(selectedApplication).uploaded} required document(s) missing
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication._id, 'approved')}
                        disabled={!getDocumentStatus(selectedApplication).isComplete}
                        className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                          getDocumentStatus(selectedApplication).isComplete
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
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
                    
                    {/* Document completion info */}
                    <div className="mt-4 text-sm text-gray-600">
                      <span className="font-medium">Document Status:</span> {getDocumentStatus(selectedApplication).uploaded}/{getDocumentStatus(selectedApplication).total} complete
                      {getDocumentStatus(selectedApplication).isComplete && (
                        <span className="ml-2 text-green-600 font-medium">✅ Ready for approval</span>
                      )}
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
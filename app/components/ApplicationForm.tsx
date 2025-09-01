'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload, Loader2, CreditCard, Receipt, User, GraduationCap } from 'lucide-react'
import { toast } from 'react-toastify'
import { applicationsAPI } from '../../services'

interface ApplicationData {
  name: string
  fatherName: string
  phone: string
  guardianPhone: string
  dateOfBirth: string
  gender: string
  class: string
  group: string
  address: string
  metricYear: string
  metricRollNumber: string
  metricMarks: string
  metricSchool: string
  easypaisaNumber: string
  transactionId: string
}

const ApplicationForm = () => {
  const isValidPkPhone = (value: string) => /^(?:\+92|0)3\d{9}$/.test(value.trim())

  const [formData, setFormData] = useState<ApplicationData>({
    name: '',
    fatherName: '',
    phone: '',
    guardianPhone: '',
    dateOfBirth: '',
    gender: '',
    class: '',
    group: '',
    address: '',
    metricYear: '',
    metricRollNumber: '',
    metricMarks: '',
    metricSchool: '',
    easypaisaNumber: '',
    transactionId: ''
  })

  const [documents, setDocuments] = useState({
    dmcMetric: null as File | null,
    passportPhoto: null as File | null,
    fatherCNIC: null as File | null,
    migrationCertificate: null as File | null,
    transactionReceipt: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDocumentChange = (field: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    const requiredFields = [
      'name', 'fatherName', 'guardianPhone',
      'dateOfBirth', 'gender', 'class', 'group', 'address',
      'metricYear', 'metricRollNumber', 'metricMarks', 'metricSchool',
      'easypaisaNumber', 'transactionId'
    ]

    for (const field of requiredFields) {
      if (!formData[field as keyof ApplicationData] || formData[field as keyof ApplicationData].trim() === '') {
        const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase()
        toast.error(`Please fill in ${fieldName}`)
        setIsSubmitting(false)
        return
      }
    }

    // Validate Pakistani phone numbers
    if (formData.phone && !isValidPkPhone(formData.phone)) {
      toast.error('Enter a valid Pakistani personal mobile (e.g., 03xxxxxxxxx or +923xxxxxxxxx)')
      setIsSubmitting(false)
      return
    }
    if (!isValidPkPhone(formData.guardianPhone)) {
      toast.error('Enter a valid Pakistani guardian phone (e.g., 03xxxxxxxxx or +923xxxxxxxxx)')
      setIsSubmitting(false)
      return
    }
    if (!isValidPkPhone(formData.easypaisaNumber)) {
      toast.error('Enter a valid Easypaisa number (e.g., 03xxxxxxxxx or +923xxxxxxxxx)')
      setIsSubmitting(false)
      return
    }

    // Validate required documents
    const requiredDocuments = ['dmcMetric', 'passportPhoto', 'fatherCNIC', 'transactionReceipt']
    for (const doc of requiredDocuments) {
      if (!documents[doc as keyof typeof documents]) {
        toast.error(`Please upload ${doc.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        setIsSubmitting(false)
        return
      }
    }

    try {
      const formDataToSend = new FormData()

      // Split name into first and last name
      const nameParts = (formData.name || '').trim().split(/\s+/)
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      // Debug: Log form data being sent
      console.log('📋 Form data being sent:', {
        firstName,
        lastName,
        fatherName: formData.fatherName,
        phone: formData.phone,
        guardianPhone: formData.guardianPhone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        class: formData.class,
        group: formData.group,
        address: formData.address,
        education: {
          metric: {
            year: formData.metricYear,
            rollNumber: formData.metricRollNumber,
            marks: formData.metricMarks,
            school: formData.metricSchool
          }
        },
        easypaisaNumber: formData.easypaisaNumber,
        transactionId: formData.transactionId
      })

      // Debug: Log individual education field values
      console.log('🎓 Education field values:', {
        metricYear: formData.metricYear,
        metricRollNumber: formData.metricRollNumber,
        metricMarks: formData.metricMarks,
        metricSchool: formData.metricSchool
      })

      // Debug: Log FormData contents
      console.log('📤 FormData entries:')
      const entries = Array.from(formDataToSend.entries())
      entries.forEach(([key, value]) => {
        console.log(`${key}: ${value}`)
      })

      // Append mapped fields
      formDataToSend.append('firstName', firstName)
      formDataToSend.append('lastName', lastName)
      formDataToSend.append('fatherName', formData.fatherName)
      if (formData.phone) formDataToSend.append('phone', formData.phone)
      formDataToSend.append('guardianPhone', formData.guardianPhone)
      formDataToSend.append('dateOfBirth', formData.dateOfBirth)
      formDataToSend.append('gender', formData.gender)
      formDataToSend.append('class', formData.class)
      formDataToSend.append('group', formData.group)
      formDataToSend.append('address', formData.address)
      // city/state/zip removed per requirement
      formDataToSend.append('metricYear', formData.metricYear)
      formDataToSend.append('metricRollNumber', formData.metricRollNumber)
      formDataToSend.append('metricMarks', formData.metricMarks)
      formDataToSend.append('metricSchool', formData.metricSchool)
      formDataToSend.append('easypaisaNumber', formData.easypaisaNumber)
      formDataToSend.append('transactionId', formData.transactionId)

      // Append documents
      Object.entries(documents).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file)
        }
      })

      const result = await applicationsAPI.submit(formDataToSend)
      
      toast.success('🎉 Application submitted successfully! We\'ll review your application and get back to you within 2-3 business days.')
      
      // Reset form
      setFormData({
        name: '',
        fatherName: '',
        phone: '',
        guardianPhone: '',
        dateOfBirth: '',
        gender: '',
        class: '',
        group: '',
        address: '',
        metricYear: '',
        metricRollNumber: '',
        metricMarks: '',
        metricSchool: '',
        easypaisaNumber: '',
        transactionId: ''
      })
      setDocuments({
        dmcMetric: null,
        passportPhoto: null,
        fatherCNIC: null,
        migrationCertificate: null,
        transactionReceipt: null
      })
      
      // Reset file inputs
      const fileInputs = ['dmc-metric', 'passport-photo', 'father-cnic', 'migration-certificate', 'receipt-upload']
      fileInputs.forEach(id => {
        const input = document.getElementById(id) as HTMLInputElement
        if (input) input.value = ''
      })
    } catch (error: any) {
      console.error('Submission error:', error)
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        toast.error('Connection failed. Please check if you\'re connected to the internet and try again.')
      } else if (error.message?.includes('CORS')) {
        toast.error('API access blocked. Please contact support.')
      } else if (error.message?.includes('HTTP')) {
        toast.error(`Server error: ${error.message}. Please try again later.`)
      } else {
        toast.error(error.message || 'Failed to submit application. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 mx-2 sm:mx-0"
    >
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 sm:p-6 border border-primary-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="Enter your father's name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Mobile</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="03xxxxxxxxx (Optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Guardian Phone Number *</label>
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="03xxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 sm:p-6 border border-green-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-green-900">Academic Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Class *</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-base"
              >
                <option value="">Select class</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Group *</label>
              <select
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-base"
              >
                <option value="">Select a group</option>
                <option value="FSC Pre-Medical">FSC Pre-Medical</option>
                <option value="FSC Pre-Engineering">FSC Pre-Engineering</option>
                <option value="FSC Pre-Computer Science">FSC Pre-Computer Science</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900">Address Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="Enter your complete home address"
              />
            </div>
          </div>
        </div>

        {/* Education Information */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6 border border-purple-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-purple-900">Education Information</h3>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-purple-300">
            <h4 className="font-bold text-purple-900 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Metric Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year *</label>
                <input
                  type="text"
                  name="metricYear"
                  value={formData.metricYear}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="e.g., 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number *</label>
                <input
                  type="text"
                  name="metricRollNumber"
                  value={formData.metricRollNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter roll number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marks *</label>
                <input
                  type="text"
                  name="metricMarks"
                  value={formData.metricMarks}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="e.g., 850/1100 or 85%"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">School *</label>
                <input
                  type="text"
                  name="metricSchool"
                  value={formData.metricSchool}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  placeholder="Enter school name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Documents Upload */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">5</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900">Documents Upload</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* DMC of Metric */}
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 sm:p-6 text-center bg-white">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-700 mb-2 font-medium text-sm sm:text-base">DMC of Metric *</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Upload your metric result card</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleDocumentChange('dmcMetric', e.target.files?.[0] || null)}
                required
                className="hidden"
                id="dmc-metric"
              />
              <label
                htmlFor="dmc-metric"
                className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </label>
              {documents.dmcMetric && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-700 font-medium">Selected: {documents.dmcMetric.name}</p>
                </div>
              )}
            </div>

            {/* Passport Photo */}
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 sm:p-6 text-center bg-white">
              <User className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-700 mb-2 font-medium text-sm sm:text-base">Passport Size Photo *</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Upload your recent photo</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleDocumentChange('passportPhoto', e.target.files?.[0] || null)}
                required
                className="hidden"
                id="passport-photo"
              />
              <label
                htmlFor="passport-photo"
                className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Photo
              </label>
              {documents.passportPhoto && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-700 font-medium">Selected: {documents.passportPhoto.name}</p>
                </div>
              )}
            </div>

            {/* Father CNIC */}
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 sm:p-6 text-center bg-white">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-700 mb-2 font-medium text-sm sm:text-base">Father CNIC *</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Upload father's CNIC copy</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleDocumentChange('fatherCNIC', e.target.files?.[0] || null)}
                required
                className="hidden"
                id="father-cnic"
              />
              <label
                htmlFor="father-cnic"
                className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </label>
              {documents.fatherCNIC && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-700 font-medium">Selected: {documents.fatherCNIC.name}</p>
                </div>
              )}
            </div>

            {/* Migration Certificate (Optional) */}
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 sm:p-6 text-center bg-white">
              <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-700 mb-2 font-medium text-sm sm:text-base">Migration Certificate (optional)</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Optional - if applicable</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleDocumentChange('migrationCertificate', e.target.files?.[0] || null)}
                className="hidden"
                id="migration-certificate"
              />
              <label
                htmlFor="migration-certificate"
                className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </label>
              {documents.migrationCertificate && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-700 font-medium">Selected: {documents.migrationCertificate.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Fee Payment */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">6</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900">Application Fee Payment</h3>
          </div>
          
          {/* Payment Instructions */}
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-300">
            <div className="flex items-start mb-4">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Payment Instructions</h4>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <p><strong>Application Fee:</strong> <span className="text-xl sm:text-2xl font-bold text-blue-600">PKR 200</span></p>
                  <p><strong>Payment Method:</strong> Easypaisa</p>
                  <p><strong>Account Number:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded">03005928890</span></p>
                  <p><strong>Account Title:</strong> Nasir Ahmad Khan</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <h5 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">How to Pay:</h5>
              <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-blue-700">
                <li>Send PKR 200 to the above Easypaisa number</li>
                <li>Take a screenshot of the transaction receipt</li>
                <li>Fill the transaction details below</li>
                <li>Upload the receipt image</li>
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Easypaisa Number *</label>
              <input
                type="tel"
                name="easypaisaNumber"
                value={formData.easypaisaNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="03xxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction ID *</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base"
                placeholder="Enter transaction ID from receipt"
              />
            </div>
          </div>
        </div>

        {/* Transaction Receipt Upload */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">7</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900">Transaction Receipt</h3>
          </div>
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 sm:p-8 text-center bg-white">
            <Receipt className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-700 mb-2 font-medium text-sm sm:text-base">Upload Transaction Receipt *</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleDocumentChange('transactionReceipt', e.target.files?.[0] || null)}
              required
              className="hidden"
              id="receipt-upload"
            />
            <label
              htmlFor="receipt-upload"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
            >
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Choose Receipt File
            </label>
            {documents.transactionReceipt && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-700 font-medium">Selected file:</p>
                <p className="text-xs sm:text-sm text-blue-600">{documents.transactionReceipt.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 sm:pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Submit Application
              </>
            )}
          </button>
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
            By submitting this application, you agree to our terms and conditions.
          </p>
        </div>
      </form>
    </motion.div>
  )
}

export default ApplicationForm 
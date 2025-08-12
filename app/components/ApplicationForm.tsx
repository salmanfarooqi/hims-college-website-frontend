'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload, Loader2, CreditCard, Receipt } from 'lucide-react'
import { toast } from 'react-toastify'
import { applicationsAPI } from '../../services'

interface ApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  zipCode: string
  program: string
  previousSchool: string
  previousGrade: string
  transactionId: string
  easypaisaNumber: string
}

const ApplicationForm = () => {
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    program: '',
    previousSchool: '',
    previousGrade: '',
    transactionId: '',
    easypaisaNumber: ''
  })

  const [transactionReceipt, setTransactionReceipt] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Debug function to test API connectivity
  const testApiConnection = async () => {
    try {
      const { applicationsAPI } = await import('../../services')
      console.log('Testing API connection to applications endpoint')
      
      // Create a test FormData object
      const testFormData = new FormData()
      testFormData.append('firstName', 'Test')
      testFormData.append('lastName', 'User')
      testFormData.append('email', 'test@example.com')
      
      const response = await applicationsAPI.submit(testFormData)
      console.log('API Response:', response)
      toast.success('API connection successful!')
    } catch (error) {
      console.error('API connection failed:', error)
      toast.error(`API connection failed: ${error}`)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTransactionReceipt(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.dateOfBirth || !formData.gender || !formData.address || !formData.city || 
        !formData.state || !formData.zipCode || !formData.program || !formData.previousSchool || 
        !formData.previousGrade || !formData.easypaisaNumber || !formData.transactionId) {
      toast.error('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    if (!transactionReceipt) {
      toast.error('Please upload your transaction receipt')
      setIsSubmitting(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })

      // Append transaction receipt
      if (transactionReceipt) {
        formDataToSend.append('transactionReceipt', transactionReceipt)
      }

      const result = await applicationsAPI.submit(formDataToSend)
      
      toast.success('🎉 Application submitted successfully! We\'ll review your application and get back to you within 2-3 business days.')
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        program: '',
        previousSchool: '',
        previousGrade: '',
        transactionId: '',
        easypaisaNumber: ''
      })
      setTransactionReceipt(null)
      
      // Reset file input
      const fileInput = document.getElementById('receipt-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error: any) {
      console.error('Submission error:', error)
      
      // Handle different types of errors
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
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
     

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-primary-900">Personal Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-blue-900">Address Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your complete address"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Province/State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Punjab, Sindh"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter postal code"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-green-900">Academic Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Program of Interest *</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select a program</option>
                <option value="FSC Pre-Medical">FSC Pre-Medical (2 Years)</option>
                <option value="FSC Pre-Engineering">FSC Pre-Engineering (2 Years)</option>
                <option value="Computer Science">Computer Science (2 Years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Previous School/College *</label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your previous institution"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Grade/Result *</label>
              <input
                type="text"
                name="previousGrade"
                value={formData.previousGrade}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your grade/percentage/CGPA"
              />
            </div>
          </div>
        </div>

        {/* Application Fee Payment */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <h3 className="text-xl font-bold text-yellow-900">Application Fee Payment</h3>
          </div>
          
          {/* Payment Instructions */}
          <div className="bg-white rounded-xl p-6 mb-6 border border-yellow-300">
            <div className="flex items-start mb-4">
              <CreditCard className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Payment Instructions</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Application Fee:</strong> <span className="text-2xl font-bold text-yellow-600">PKR 500</span></p>
                  <p><strong>Payment Method:</strong> Easypaisa</p>
                  <p><strong>Account Number:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded">03001234567</span></p>
                  <p><strong>Account Title:</strong> Nasir Ahmad Khan </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-800 mb-2">How to Pay:</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
                <li>Send PKR 500 to the above Easypaisa number</li>
                <li>Take a screenshot of the transaction receipt</li>
                <li>Fill the transaction details below</li>
                <li>Upload the receipt image</li>
              </ol>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Easypaisa Number *</label>
              <input
                type="tel"
                name="easypaisaNumber"
                value={formData.easypaisaNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter transaction ID from receipt"
              />
            </div>
          </div>
        </div>

        {/* Transaction Receipt Upload */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">5</span>
            </div>
            <h3 className="text-xl font-bold text-purple-900">Transaction Receipt</h3>
          </div>
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center bg-white">
            <Receipt className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-700 mb-2 font-medium">Upload Transaction Receipt *</p>
            <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG, PDF (Max size: 5MB)</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleReceiptChange}
              required
              className="hidden"
              id="receipt-upload"
            />
            <label
              htmlFor="receipt-upload"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 cursor-pointer transition-colors duration-200"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose Receipt File
            </label>
            {transactionReceipt && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700 font-medium">Selected file:</p>
                <p className="text-sm text-purple-600">{transactionReceipt.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <FileText className="w-6 h-6 mr-3" />
                Submit Application
              </>
            )}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            By submitting this application, you agree to our terms and conditions.
          </p>
        </div>
      </form>
    </motion.div>
  )
}

export default ApplicationForm 
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  Upload,
  Save,
  X,
  Star,
  RefreshCw
} from 'lucide-react'
import { toast } from 'react-toastify'
import { getImageUrl } from '../../../services'

interface Teacher {
  id: string
  name: string
  position: string
  expertise: string
  imageUrl?: string
  rating: number
  description: string
  order: number
  isActive: boolean
}

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Teacher | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [refreshKey, setRefreshKey] = useState(0) // Add refresh key for force refresh

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      setIsLoading(true)
      const { contentAPI } = await import('../../../services')
      
      // Add cache busting parameter
      const timestamp = Date.now()
      console.log('🔄 Fetching teachers with cache busting:', timestamp)
      
      // Use admin endpoint to get ALL teachers (not just active ones)
      const data = await contentAPI.teachers.getAllAdmin()
      console.log('📥 Fetched teachers data:', data)
      
      // Map the data to ensure we have both _id and id
      const mappedData = data.map((teacher: any) => ({
        ...teacher,
        id: teacher._id || teacher.id || 'unknown',
        _id: teacher._id || teacher.id || 'unknown'
      }))
      console.log('🔄 Mapped teachers data:', mappedData)
      setTeachers(mappedData)
      
      // Update refresh key to force re-render
      setRefreshKey(prev => prev + 1)
      
    } catch (error) {
      console.error('Failed to fetch teachers:', error)
      // Show error to user
      toast.error('Failed to fetch teachers. Please try refreshing the page.')
    } finally {
      setIsLoading(false)
    }
  }

  // Force refresh function
  const forceRefresh = () => {
    setRefreshKey(prev => prev + 1)
    // Clear browser cache for images
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }
    // Force reload after a short delay
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const resetImageState = () => {
    setSelectedImage(null)
    setPreviewUrl('')
    setIsUploading(false)
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      setIsUploading(true)
      let imageUrl = editingItem?.imageUrl || ''

      // Upload image to backend if a new image is selected
      if (selectedImage) {
        try {
          const { contentAPI } = await import('../../../services')
          const uploadResult = await contentAPI.uploadImage(selectedImage, 'hims-college/teachers')
          imageUrl = uploadResult.imageUrl
          console.log('✅ Teacher image uploaded to backend:', imageUrl)
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError)
          throw new Error('Image upload failed. Please try again.')
        }
      }

      // Prepare teacher data with essential fields only
      const teacherData = {
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        expertise: formData.get('expertise') as string,
        rating: parseFloat(formData.get('rating') as string) || 5,
        order: parseInt(formData.get('order') as string) || 1,
        isActive: true, // Default to active
        imageUrl: imageUrl || undefined // Only include if not empty
      }

      console.log('📤 Sending teacher data to API:', teacherData)
      console.log('🖼️ Image URL being sent:', imageUrl)

      const { contentAPI } = await import('../../../services')
      
      if (editingItem) {
        await contentAPI.teachers.updateWithData(editingItem.id, teacherData)
        toast.success('Teacher updated successfully!')
      } else {
        await contentAPI.teachers.createWithData(teacherData)
        toast.success('Teacher created successfully!')
      }
      
      // Clear any cached data and refresh
      setRefreshKey(prev => prev + 1)
      
      // Force refresh with cache busting
      setTimeout(async () => {
        try {
          await fetchTeachers()
          // Trigger storage event to refresh other components
          localStorage.setItem('teachersUpdated', Date.now().toString())
          // Force browser cache refresh for images
          if ('caches' in window) {
            caches.keys().then(names => {
              names.forEach(name => {
                caches.delete(name)
              })
            })
          }
        } catch (error) {
          console.error('Error refreshing teachers:', error)
          // Fallback to page reload if fetch fails
          window.location.reload()
        }
      }, 500)
      setShowModal(false)
      setEditingItem(null)
      resetImageState()
    } catch (error: any) {
      console.error('Save failed:', error)
      toast.error(error.message || 'Save failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    // Use toast for confirmation instead of confirm
    const confirmDelete = () => {
      toast.dismiss()
      performDelete(id)
    }

    const cancelDelete = () => {
      toast.dismiss()
    }

    toast.warn(
      <div className="flex flex-col space-y-3">
        <p>Are you sure you want to delete this teacher?</p>
        <div className="flex space-x-2">
          <button
            onClick={confirmDelete}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={cancelDelete}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      }
    )
  }

  const performDelete = async (id: string) => {
    try {
      const { contentAPI } = await import('../../../services')
      await contentAPI.teachers.delete(id)
      toast.success('Teacher deleted successfully!')
      fetchTeachers()
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Delete failed')
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { contentAPI } = await import('../../../services')
      await contentAPI.teachers.updateWithData(id, { isActive: !isActive })
      toast.success(`Teacher ${!isActive ? 'activated' : 'deactivated'} successfully!`)
      fetchTeachers()
    } catch (error) {
      console.error('Toggle failed:', error)
      toast.error('Failed to update teacher status')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teachers Management</h1>
            <p className="text-gray-600">Manage your faculty members and their profiles</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={forceRefresh}
              className="btn-secondary flex items-center space-x-2 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Force Refresh</span>
            </button>
            <button
              onClick={() => {
                setEditingItem(null)
                setShowModal(true)
              }}
              className="btn-primary flex items-center space-x-2 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Teacher</span>
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{teachers.length}</div>
            <div className="text-sm text-gray-600">Total Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {teachers.filter(t => t.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {(teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length || 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {teachers.map((teacher) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-6">
              {/* Teacher Image */}
              <div className="relative">
                {teacher.imageUrl ? (
                  <img 
                    key={`${teacher.id}-${teacher.imageUrl}-${refreshKey}-${Date.now()}`}
                    src={getImageUrl(teacher.imageUrl, true)}
                    alt={teacher.name}
                    className="w-24 h-24 object-cover rounded-full shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full shadow-md flex items-center justify-center">
                    <span className="text-gray-500 text-lg font-semibold">
                      {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                )}
                {/* Status Indicator */}
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  teacher.isActive ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>

              {/* Teacher Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{teacher.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-600">{teacher.rating}</span>
                  </div>
                </div>
                <p className="text-lg text-primary-600 font-semibold mb-1">{teacher.position}</p>
                <p className="text-gray-600 mb-2">{teacher.expertise}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{teacher.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Order: {teacher.order}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    teacher.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {teacher.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(teacher.id, teacher.isActive)}
                  className={`p-3 rounded-lg transition-colors ${
                    teacher.isActive 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                  title={teacher.isActive ? 'Deactivate' : 'Activate'}
                >
                  {teacher.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => {
                    setEditingItem(teacher)
                    setShowModal(true)
                  }}
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit' : 'Add'} Teacher
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    name="name"
                    defaultValue={editingItem?.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Enter teacher's full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                  <input
                    name="position"
                    defaultValue={editingItem?.position}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="e.g., Professor, Lecturer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise/Department</label>
                  <input
                    name="expertise"
                    defaultValue={editingItem?.expertise}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1-5)</label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue={editingItem?.rating || 5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Order Field */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                <input
                  name="order"
                  type="number"
                  min="1"
                  defaultValue={editingItem?.order || 1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter display order (1, 2, 3...)"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Lower numbers will appear first in the list</p>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image (Optional)</label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                  <p className="text-sm text-gray-500">Leave empty if you don't want to upload an image. Teachers without images will show initials instead.</p>
                  
                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uploading image...</span>
                        <span className="text-primary-600 font-medium">Processing...</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}

                  {/* Image Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* New Image Preview */}
                    {previewUrl && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">New Image Preview:</p>
                        <div className="relative">
                          <img 
                            src={previewUrl}
                            alt="New preview" 
                            className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={resetImageState}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Current Image */}
                    {editingItem?.imageUrl && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Current Image:</p>
                        <img 
                          key={`current-${editingItem.id}-${Date.now()}-${Math.random()}`}
                          src={`${getImageUrl(editingItem.imageUrl, true)}?t=${Date.now()}`} 
                          alt="Current" 
                          className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingItem ? 'Update' : 'Add'} Teacher</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeachersPage
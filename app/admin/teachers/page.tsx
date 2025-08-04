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
  Star
} from 'lucide-react'
import { getImageUrl } from '../../../services'
import { uploadTeacherImage } from '../../../utils/imageUpload'
import { getDefaultProfileImageUrl } from '../../../components/DefaultProfileImage'

interface Teacher {
  id: string
  name: string
  position: string
  expertise: string
  imageUrl: string
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
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const { contentAPI } = await import('../../../services')
      const data = await contentAPI.teachers.getAllAdmin()
      // Map the data to ensure we have both _id and id
      const mappedData = data.map((teacher: any) => ({
        ...teacher,
        id: teacher._id || teacher.id || 'unknown',
        _id: teacher._id || teacher.id || 'unknown'
      }))
      setTeachers(mappedData)
    } catch (error) {
      console.error('Failed to fetch teachers:', error)
    } finally {
      setIsLoading(false)
    }
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
    setUploadProgress(0)
    setIsUploading(false)
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      setIsUploading(true)
      let imageUrl = editingItem?.imageUrl || ''

      // Upload image to Cloudinary if a new image is selected
      if (selectedImage) {
        const uploadResult = await uploadTeacherImage(selectedImage, (progress) => {
          setUploadProgress(progress)
        })

        if (uploadResult.success && uploadResult.imageUrl) {
          imageUrl = uploadResult.imageUrl
          console.log('✅ Teacher image uploaded to Cloudinary:', imageUrl)
        } else {
          throw new Error(uploadResult.error || 'Image upload failed')
        }
      }

      // Prepare teacher data
      const teacherData = {
        name: formData.get('name') as string,
        position: formData.get('position') as string,
        expertise: formData.get('expertise') as string,
        description: formData.get('description') as string,
        rating: parseFloat(formData.get('rating') as string) || 5,
        order: parseInt(formData.get('order') as string) || 0,
        isActive: formData.get('isActive') === 'true',
        imageUrl
      }

      const { contentAPI } = await import('../../../services')
      
      if (editingItem) {
        await contentAPI.teachers.updateWithData(editingItem.id, teacherData)
      } else {
        await contentAPI.teachers.createWithData(teacherData)
      }

      fetchTeachers()
      setShowModal(false)
      setEditingItem(null)
      resetImageState()
    } catch (error: any) {
      console.error('Save failed:', error)
      alert(error.message || 'Save failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-backend.vercel.app/api/content/admin/teachers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchTeachers()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed')
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-backend.vercel.app/api/content/admin/teachers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchTeachers()
      }
    } catch (error) {
      console.error('Toggle failed:', error)
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
                <img 
                  src={getImageUrl(teacher.imageUrl) || getDefaultProfileImageUrl(teacher.name, 'teacher')}
                  alt={teacher.name}
                  className="w-24 h-24 object-cover rounded-full shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getDefaultProfileImageUrl(teacher.name, 'teacher');
                  }}
                />
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

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Brief description about the teacher's expertise and experience..."
                />
              </div>

              {/* Order */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={editingItem?.order || 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                  
                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uploading to Cloudinary...</span>
                        <span className="text-primary-600 font-medium">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
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
                          src={getImageUrl(editingItem.imageUrl) || getDefaultProfileImageUrl(editingItem.name, 'teacher')} 
                          alt="Current" 
                          className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = getDefaultProfileImageUrl(editingItem.name, 'teacher');
                          }}
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
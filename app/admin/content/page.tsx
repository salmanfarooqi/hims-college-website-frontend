'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Upload, Star, Award } from 'lucide-react'
import { getImageUrl } from '../../../services'

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  imageUrl: string
  order: number
  isActive: boolean
}

interface Teacher {
  id: number
  name: string
  position: string
  expertise: string
  imageUrl: string
  rating: number
  description: string
  order: number
  isActive: boolean
}

interface Student {
  id: number
  name: string
  program: string
  imageUrl: string
  achievement: string
  gpa: string
  quote: string
  awards: string[]
  order: number
  isActive: boolean
}

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'teachers' | 'students'>('hero')
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
      fetchContent()
    } else {
      window.location.href = '/admin'
    }
  }, [])

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const headers = { 'Authorization': `Bearer ${token}` }

      // Fetch hero slides
      const heroResponse = await fetch('https://hims-college-backend.vercel.app/api/content/admin/hero-slides', { headers })
      if (heroResponse.ok) {
        const heroData = await heroResponse.json()
        setHeroSlides(heroData)
      }

      // Fetch teachers
      const teachersResponse = await fetch('https://hims-college-backend.vercel.app/api/content/admin/teachers', { headers })
      if (teachersResponse.ok) {
        const teachersData = await teachersResponse.json()
        setTeachers(teachersData)
      }

      // Fetch students
      const studentsResponse = await fetch('https://hims-college-backend.vercel.app/api/content/admin/students', { headers })
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json()
        setStudents(studentsData)
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://hims-college-backend.vercel.app/api/content/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        return data.url
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Image upload failed')
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async (type: string, data: any) => {
    try {
      const token = localStorage.getItem('adminToken')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      let url = ''
      let method = 'POST'

      if (type === 'hero') {
        url = 'https://hims-college-backend.vercel.app/api/content/admin/hero-slides'
        if (editingItem) {
          url += `/${editingItem.id}`
          method = 'PUT'
        }
      } else if (type === 'teacher') {
        url = 'https://hims-college-backend.vercel.app/api/content/admin/teachers'
        if (editingItem) {
          url += `/${editingItem.id}`
          method = 'PUT'
        }
      } else if (type === 'student') {
        url = 'https://hims-college-backend.vercel.app/api/content/admin/students'
        if (editingItem) {
          url += `/${editingItem.id}`
          method = 'PUT'
        }
      }

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(data)
      })

      if (response.ok) {
        fetchContent()
        setShowModal(false)
        setEditingItem(null)
      } else {
        alert('Failed to save')
      }
    } catch (error) {
      console.error('Save failed:', error)
      alert('Save failed')
    }
  }

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const headers = { 'Authorization': `Bearer ${token}` }

      let url = ''
      if (type === 'hero') {
        url = `https://hims-college-backend.vercel.app/api/content/admin/hero-slides/${id}`
      } else if (type === 'teacher') {
        url = `https://hims-college-backend.vercel.app/api/content/admin/teachers/${id}`
      } else if (type === 'student') {
        url = `https://hims-college-backend.vercel.app/api/content/admin/students/${id}`
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers
      })

      if (response.ok) {
        fetchContent()
      } else {
        alert('Failed to delete')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed')
    }
  }

  const toggleActive = async (type: string, id: number, isActive: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      let url = ''
      if (type === 'hero') {
        url = `https://hims-college-backend.vercel.app/api/content/admin/hero-slides/${id}`
      } else if (type === 'teacher') {
        url = `https://hims-college-backend.vercel.app/api/content/admin/teachers/${id}`
      } else if (type === 'student') {
        url = `https://hims-college-backend.vercel.app/api/content/admin/students/${id}`
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchContent()
      }
    } catch (error) {
      console.error('Toggle failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <button
              onClick={() => window.location.href = '/admin'}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('hero')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'hero'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Hero Slides
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'teachers'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Teachers
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'students'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Students
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === 'hero' && 'Hero Slides'}
                {activeTab === 'teachers' && 'Teachers'}
                {activeTab === 'students' && 'Students'}
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null)
                  setShowModal(true)
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'hero' && (
              <div className="grid gap-6">
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="border rounded-lg p-4 flex items-center space-x-4">
                    <img 
                      src={(() => {
                        const url = getImageUrl(slide.imageUrl);
                        console.log('Admin content page hero image URL:', url, 'for slide:', slide.title);
                        return url;
                      })()}
                      alt={slide.title} 
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.log('Admin content page hero image failed to load:', target.src);
                        target.src = 'data:image/svg+xml,%3Csvg width="64" height="64" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="64" height="64" fill="%233B82F6"/%3E%3Ctext x="32" y="32" text-anchor="middle" fill="white" font-size="8"%3ESLIDE%3C/text%3E%3C/svg%3E';
                      }}
                      onLoad={() => {
                        console.log('Admin content page hero image loaded successfully');
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{slide.title}</h3>
                      <p className="text-sm text-gray-600">{slide.subtitle}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleActive('hero', slide.id, slide.isActive)}
                        className={`p-2 rounded ${slide.isActive ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {slide.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingItem(slide)
                          setShowModal(true)
                        }}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('hero', slide.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="grid gap-6">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="border rounded-lg p-4 flex items-center space-x-4">
                    <img 
                      src={getImageUrl(teacher.imageUrl) || 'data:image/svg+xml,%3Csvg width="64" height="64" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="64" height="64" fill="%233B82F6"/%3E%3Ctext x="32" y="32" text-anchor="middle" fill="white" font-size="8"%3ETEACHER%3C/text%3E%3C/svg%3E'} 
                      alt={teacher.name} 
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg width="64" height="64" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="64" height="64" fill="%233B82F6"/%3E%3Ctext x="32" y="32" text-anchor="middle" fill="white" font-size="8"%3ETEACHER%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.position}</p>
                      <p className="text-sm text-gray-500">{teacher.expertise}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleActive('teacher', teacher.id, teacher.isActive)}
                        className={`p-2 rounded ${teacher.isActive ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {teacher.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingItem(teacher)
                          setShowModal(true)
                        }}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('teacher', teacher.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'students' && (
              <div className="grid gap-6">
                {students.map((student) => (
                  <div key={student.id} className="border rounded-lg p-4 flex items-center space-x-4">
                    <img 
                      src={(() => {
                        const url = getImageUrl(student.imageUrl);
                        console.log('Admin content page student image URL:', url, 'for student:', student.name);
                        return url;
                      })()}
                      alt={student.name} 
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.log('Admin content page student image failed to load:', target.src);
                        target.src = 'data:image/svg+xml,%3Csvg width="64" height="64" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="64" height="64" fill="%233B82F6"/%3E%3Ctext x="32" y="32" text-anchor="middle" fill="white" font-size="8"%3ESTUDENT%3C/text%3E%3C/svg%3E';
                      }}
                      onLoad={() => {
                        console.log('Admin content page student image loaded successfully');
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.program}</p>
                      <p className="text-sm text-gray-500">{student.achievement}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleActive('student', student.id, student.isActive)}
                        className={`p-2 rounded ${student.isActive ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        {student.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingItem(student)
                          setShowModal(true)
                        }}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('student', student.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for adding/editing */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Edit' : 'Add'} {activeTab === 'hero' ? 'Hero Slide' : activeTab === 'teachers' ? 'Teacher' : 'Student'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              const data = Object.fromEntries(formData)
              handleSave(activeTab, data)
            }}>
              {activeTab === 'hero' && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        name="title"
                        defaultValue={editingItem?.title}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <input
                        name="subtitle"
                        defaultValue={editingItem?.subtitle}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                      <input
                        name="ctaText"
                        defaultValue={editingItem?.ctaText}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                      <input
                        name="ctaLink"
                        defaultValue={editingItem?.ctaLink}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'teachers' && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        name="name"
                        defaultValue={editingItem?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <input
                        name="position"
                        defaultValue={editingItem?.position}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                      <input
                        name="expertise"
                        defaultValue={editingItem?.expertise}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <input
                        name="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        defaultValue={editingItem?.rating}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                </>
              )}

              {activeTab === 'students' && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        name="name"
                        defaultValue={editingItem?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                      <input
                        name="program"
                        defaultValue={editingItem?.program}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Achievement</label>
                      <input
                        name="achievement"
                        defaultValue={editingItem?.achievement}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                      <input
                        name="gpa"
                        defaultValue={editingItem?.gpa}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                    <textarea
                      name="quote"
                      defaultValue={editingItem?.quote}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Awards (comma-separated)</label>
                    <input
                      name="awards"
                      defaultValue={editingItem?.awards?.join(', ')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Academic Excellence, Leadership Award, Community Service"
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const url = await handleImageUpload(file)
                      if (url) {
                        // Update the form with the uploaded image URL
                        const hiddenInput = document.createElement('input')
                        hiddenInput.type = 'hidden'
                        hiddenInput.name = 'imageUrl'
                        hiddenInput.value = url
                        e.target.parentElement?.appendChild(hiddenInput)
                      }
                    }
                  }}
                />
                {editingItem?.imageUrl && (
                  <img 
                    src={getImageUrl(editingItem.imageUrl) || 'data:image/svg+xml,%3Csvg width="128" height="128" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="128" height="128" fill="%23374151"/%3E%3Ctext x="64" y="64" text-anchor="middle" fill="white" font-size="12"%3ECURRENT%3C/text%3E%3C/svg%3E'} 
                    alt="Current" 
                    className="w-32 h-32 object-cover mt-2 rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg width="128" height="128" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="128" height="128" fill="%23374151"/%3E%3Ctext x="64" y="64" text-anchor="middle" fill="white" font-size="12"%3ECURRENT%3C/text%3E%3C/svg%3E';
                    }}
                  />
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentManagement 
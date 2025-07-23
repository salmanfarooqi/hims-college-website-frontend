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

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Teacher | null>(null)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://hims-college-website-qnux.vercel.app/api/content/admin/teachers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setTeachers(data)
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error)
    } finally {
      setIsLoading(false)
    }
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const token = localStorage.getItem('adminToken')
      
      let url = 'https://hims-college-website-qnux.vercel.app/api/content/admin/teachers'
      let method = 'POST'

      if (editingItem) {
        url += `/${editingItem.id}`
        method = 'PUT'
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        fetchTeachers()
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

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/content/admin/teachers/${id}`, {
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

  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/content/admin/teachers/${id}`, {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <button
          onClick={() => {
            setEditingItem(null)
            setShowModal(true)
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Teacher</span>
        </button>
      </div>

      <div className="grid gap-6">
        {teachers.map((teacher) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-start space-x-4">
              <img 
                src={teacher.imageUrl} 
                alt={teacher.name}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{teacher.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-primary-600 font-semibold">{teacher.position}</p>
                <p className="text-sm text-gray-600">{teacher.expertise}</p>
                <p className="text-sm text-gray-500 mt-2">{teacher.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500">Order: {teacher.order}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(teacher.id, teacher.isActive)}
                  className={`p-2 rounded ${teacher.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  title={teacher.isActive ? 'Active' : 'Inactive'}
                >
                  {teacher.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setEditingItem(teacher)
                    setShowModal(true)
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Edit' : 'Add'} Teacher
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave}>
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={editingItem?.order || 0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {editingItem?.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Current image:</p>
                    <img src={editingItem.imageUrl} alt="Current" className="w-32 h-32 object-cover rounded" />
                  </div>
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
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
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
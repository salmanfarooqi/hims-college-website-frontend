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
  Award
} from 'lucide-react'

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

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<Student | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://hims-college-website-qnux.vercel.app/api/content/admin/students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      }
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setIsLoading(false)
    }
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    // Parse awards from comma-separated string
    const awards = formData.get('awards') as string
    if (awards) {
      formData.set('awards', JSON.stringify(awards.split(',').map(award => award.trim())))
    }

    try {
      const token = localStorage.getItem('adminToken')
      
      let url = 'https://hims-college-website-qnux.vercel.app/api/content/admin/students'
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
        fetchStudents()
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
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/content/admin/students/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchStudents()
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
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/content/admin/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchStudents()
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
        <h1 className="text-2xl font-bold text-gray-900">Students (Shining Stars)</h1>
        <button
          onClick={() => {
            setEditingItem(null)
            setShowModal(true)
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="grid gap-6">
        {students.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-start space-x-4">
              <img 
                src={student.imageUrl} 
                alt={student.name}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">Shining Star</span>
                  </div>
                </div>
                <p className="text-sm text-primary-600 font-semibold">{student.program}</p>
                <p className="text-sm text-gray-600">{student.achievement}</p>
                <p className="text-sm text-gray-500 mt-2">GPA: {student.gpa}</p>
                <p className="text-sm text-gray-500 italic mt-2">"{student.quote}"</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {student.awards?.map((award, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      <Award className="w-3 h-3 mr-1" />
                      {award}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500">Order: {student.order}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(student.id, student.isActive)}
                  className={`p-2 rounded ${student.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  title={student.isActive ? 'Active' : 'Inactive'}
                >
                  {student.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setEditingItem(student)
                    setShowModal(true)
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
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
                {editingItem ? 'Edit' : 'Add'} Student
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

export default StudentsPage 
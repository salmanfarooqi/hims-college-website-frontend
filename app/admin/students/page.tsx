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
import { getImageUrl } from '../../../services'

// Simple working base64 SVG placeholder for students
const studentPlaceholder = 'data:image/svg+xml,%3Csvg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="300" height="300" fill="%2310B981"/%3E%3Ccircle cx="150" cy="120" r="40" fill="white" opacity="0.8"/%3E%3Crect x="110" y="180" width="80" height="80" rx="40" fill="white" opacity="0.8"/%3E%3Ctext x="150" y="280" text-anchor="middle" fill="white" font-size="14" font-weight="bold"%3ESTUDENT%3C/text%3E%3C/svg%3E';

interface Student {
  _id: string
  id: string
  firstName: string
  lastName: string
  name: string
  imageUrl: string
  year: string
  profession: string
  institute: string
  order: number
  status: string
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
      const { contentAPI } = await import('../../../services');
      const data = await contentAPI.students.getAllAdmin();
      // Map the data to ensure we have both _id and id, and proper name fields
      const mappedData = data.map((student: any, index: number) => ({
        ...student,
        id: student._id || student.id || index.toString(),
        name: student.name || `${student.firstName} ${student.lastName}`,
        isActive: student.status === 'active'
      }));
      setStudents(mappedData);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setIsLoading(false);
    }
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const { contentAPI } = await import('../../../services');
      
      if (editingItem) {
        await contentAPI.students.update(editingItem.id, formData);
      } else {
        await contentAPI.students.create(formData);
      }

      fetchStudents();
      setShowModal(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error('Save failed:', error);
      alert(error.message || 'Save failed');
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-backend.vercel.app/api/content/admin/students/${id}`, {
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

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-backend.vercel.app/api/content/admin/students/${id}`, {
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
                src={(() => {
                  const url = getImageUrl(student.imageUrl);
                  console.log('Admin student image URL:', url, 'for student:', student.name);
                  return url;
                })()}
                alt={student.name}
                className="w-32 h-32 object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.log('Admin student image failed to load:', target.src);
                  target.src = 'data:image/svg+xml,%3Csvg width="300" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="300" height="300" fill="%2310B981"/%3E%3Ctext x="150" y="150" text-anchor="middle" fill="white" font-size="20"%3ESTUDENT%3C/text%3E%3C/svg%3E';
                }}
                onLoad={() => {
                  console.log('Admin student image loaded successfully');
                }}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">Shining Star</span>
                  </div>
                </div>
                {student.profession && (
                  <p className="text-sm text-gray-600 font-medium">{student.profession}</p>
                )}
                {student.year && (
                  <p className="text-sm text-gray-500">Year: {student.year}</p>
                )}
                {student.institute && (
                  <p className="text-sm text-gray-500">Institute: {student.institute}</p>
                )}
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
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    name="year"
                    type="text"
                    defaultValue={editingItem?.year}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., 2023"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                  <select
                    name="profession"
                    defaultValue={editingItem?.profession}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Profession</option>
                    <option value="MBBS Doctor">MBBS Doctor</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Civil Engineer">Civil Engineer</option>
                    <option value="Electrical Engineer">Electrical Engineer</option>
                    <option value="Mechanical Engineer">Mechanical Engineer</option>
                    <option value=" Engineer"> Engineer</option>
                    <option value="Army">Army</option>
                    <option value="AirForce">airfore</option>
                    <option value="Police">Police</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institute</label>
                  <input
                    name="institute"
                    defaultValue={editingItem?.institute}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Current workplace or institute"
                    required
                  />
                </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  name="year"
                  type="text"
                  defaultValue={editingItem?.year}
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
                    <img 
                      src={getImageUrl(editingItem.imageUrl) || 'data:image/svg+xml,%3Csvg width="300" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="300" height="300" fill="%2310B981"/%3E%3Ctext x="150" y="150" text-anchor="middle" fill="white" font-size="20"%3ECURRENT%3C/text%3E%3C/svg%3E'} 
                      alt="Current" 
                      className="w-32 h-32 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg width="300" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="300" height="300" fill="%2310B981"/%3E%3Ctext x="150" y="150" text-anchor="middle" fill="white" font-size="20"%3ECURRENT%3C/text%3E%3C/svg%3E';
                      }} 
                    />
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
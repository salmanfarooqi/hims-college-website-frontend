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
  X
} from 'lucide-react'

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  imageUrl: string
  ctaText: string
  ctaLink: string
  order: number
  isActive: boolean
}

const HeroSlidesPage = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<HeroSlide | null>(null)

  useEffect(() => {
    fetchHeroSlides()
  }, [])

  const fetchHeroSlides = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('https://hims-college-website-qnux.vercel.app/api/content/admin/hero-slides', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setHeroSlides(data)
      }
    } catch (error) {
      console.error('Failed to fetch hero slides:', error)
    } finally {
      setIsLoading(false)
    }
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const token = localStorage.getItem('adminToken')
      
      let url = 'https://hims-college-website-qnux.vercel.app/api/content/admin/hero-slides'
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
        fetchHeroSlides()
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
    if (!confirm('Are you sure you want to delete this hero slide?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/content/admin/hero-slides/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchHeroSlides()
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
      const response = await fetch(`https://hims-college-website-qnux.vercel.app/api/content/admin/hero-slides/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchHeroSlides()
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
        <h1 className="text-2xl font-bold text-gray-900">Hero Slides</h1>
        <button
          onClick={() => {
            setEditingItem(null)
            setShowModal(true)
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      <div className="grid gap-6">
        {heroSlides.map((slide) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <div className="flex items-start space-x-4">
              <img 
                src={slide.imageUrl} 
                alt={slide.title}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
                <p className="text-sm text-gray-600">{slide.subtitle}</p>
                <p className="text-sm text-gray-500 mt-1">{slide.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500">CTA: {slide.ctaText}</span>
                  <span className="text-xs text-gray-500">Link: {slide.ctaLink}</span>
                  <span className="text-xs text-gray-500">Order: {slide.order}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(slide.id, slide.isActive)}
                  className={`p-2 rounded ${slide.isActive ? 'text-green-600' : 'text-gray-400'}`}
                  title={slide.isActive ? 'Active' : 'Inactive'}
                >
                  {slide.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setEditingItem(slide)
                    setShowModal(true)
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
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
                {editingItem ? 'Edit' : 'Add'} Hero Slide
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave}>
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
                    <img src={editingItem.imageUrl} alt="Current" className="w-32 h-20 object-cover rounded" />
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

export default HeroSlidesPage 
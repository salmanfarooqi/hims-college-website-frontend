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
import { getImageUrl } from '../../../services'
import { uploadImageToCloudinary } from '../../../services/cloudinary'

interface HeroSlide {
  id: string
  _id?: string
  title: string
  subtitle: string
  description: string
  imageUrl: string
  order: number
  isActive: boolean
}

const HeroSlidesPage = () => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<HeroSlide | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [useCloudinaryUpload, setUseCloudinaryUpload] = useState(true)

  useEffect(() => {
    fetchHeroSlides()
  }, [])

  const fetchHeroSlides = async () => {
    try {
      const { contentAPI } = await import('../../../services')
      const data = await contentAPI.heroSlides.getAllAdmin()
      // Map the data to ensure we have both _id and id
      const mappedData = data.map((slide: any) => ({
        ...slide,
        id: slide._id || slide.id || 'unknown',
        _id: slide._id || slide.id || 'unknown'
      }))
      setHeroSlides(mappedData)
    } catch (error) {
      console.error('Failed to fetch hero slides:', error)
    } finally {
      setIsLoading(false)
    }
  }



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Reset states
    setIsUploading(false)
    setUploadProgress(0)
    setIsSaving(false)

    try {
      // Get form values
      const title = formData.get('title') as string
      const subtitle = formData.get('subtitle') as string
      const description = formData.get('description') as string
      const order = parseInt(formData.get('order') as string) || 0
      const isActive = formData.get('isActive') === 'true'
      const imageFile = formData.get('image') as File

      // Validate required fields
      if (!title || !subtitle || !description) {
        alert('Please fill in all required fields (Title, Subtitle, Description)')
        return
      }

      // Check if image is required for new slides
      if (!editingItem && (!imageFile || imageFile.size === 0)) {
        alert('Please select an image for the hero slide')
        return
      }

      // Prepare slide data
      let slideData = {
        title,
        subtitle,
        description,
        order,
        isActive,
        imageUrl: editingItem?.imageUrl || '' // Keep existing image URL if no new image
      }

      // Step 1: Upload image to Cloudinary if a new image is selected
      if (imageFile && imageFile.size > 0) {
        setIsUploading(true)
        
        if (useCloudinaryUpload) {
          console.log('Step 1: Uploading image to Cloudinary...')
          
          try {
            const uploadResult = await uploadImageToCloudinary(
              imageFile, 
              'hims-college/hero-slides',
              (progress) => setUploadProgress(progress)
            )
            slideData.imageUrl = uploadResult.secure_url
            console.log('✅ Image uploaded successfully:', uploadResult.secure_url)
          } catch (uploadError: any) {
            console.error('❌ Cloudinary upload failed:', uploadError)
            
            // Offer fallback to old method
            const useFallback = confirm(
              `Cloudinary upload failed: ${uploadError.message}\n\n` +
              'Would you like to try the old upload method instead? (This will upload through your backend)'
            )
            
            if (useFallback) {
              setUseCloudinaryUpload(false)
              console.log('Using fallback file upload method...')
              // Don't return - let it continue with the fallback method below
            } else {
              return
            }
          } finally {
            setIsUploading(false)
          }
        }
        
        // Fallback: Use old file upload method if Cloudinary failed or disabled
        if (!useCloudinaryUpload && imageFile && imageFile.size > 0) {
          setIsUploading(false) // We'll let the backend handle the upload
          console.log('Using legacy file upload method...')
          // The image will be uploaded by the backend - don't set imageUrl
          slideData.imageUrl = editingItem?.imageUrl || '' // Keep existing or empty
        }
      }

      // Step 2: Save hero slide data to backend
      setIsSaving(true)
      console.log('Step 2: Saving hero slide to backend...')
      
      const { contentAPI } = await import('../../../services')
      
      if (useCloudinaryUpload || !imageFile || imageFile.size === 0) {
        // Use new URL-based method (Cloudinary already uploaded, or no new image)
        console.log('🚀 Using URL-based API method')
        console.log('📤 Sending slide data:', slideData)
        
        if (editingItem) {
          console.log(`🟡 Updating hero slide ${editingItem.id}`)
          const result = await contentAPI.heroSlides.updateWithUrl(editingItem.id, slideData)
          console.log('✅ Hero slide updated successfully:', result)
        } else {
          console.log('🟢 Creating new hero slide')
          const result = await contentAPI.heroSlides.createWithUrl(slideData)
          console.log('✅ Hero slide created successfully:', result)
        }
      } else {
        // Use fallback FormData method (backend will handle upload)
        console.log('🚀 Using FormData fallback method')
        const fallbackFormData = new FormData()
        fallbackFormData.append('title', slideData.title)
        fallbackFormData.append('subtitle', slideData.subtitle)
        fallbackFormData.append('description', slideData.description)
        fallbackFormData.append('order', slideData.order.toString())
        fallbackFormData.append('isActive', slideData.isActive.toString())
        if (imageFile) fallbackFormData.append('image', imageFile)
        
        console.log('📤 Sending FormData with file:', imageFile ? imageFile.name : 'no file')
        
        if (editingItem) {
          console.log(`🟡 Updating hero slide ${editingItem.id} (FormData)`)
          const result = await contentAPI.heroSlides.update(editingItem.id, fallbackFormData)
          console.log('✅ Hero slide updated successfully (fallback method):', result)
        } else {
          console.log('🟢 Creating new hero slide (FormData)')
          const result = await contentAPI.heroSlides.create(fallbackFormData)
          console.log('✅ Hero slide created successfully (fallback method):', result)
        }
      }

      // Step 3: Refresh data and close modal
      await fetchHeroSlides()
      setShowModal(false)
      setEditingItem(null)
      
    } catch (error: any) {
      console.error('❌ Save failed:', error)
      alert(error.message || 'Failed to save hero slide')
    } finally {
      setIsUploading(false)
      setIsSaving(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero slide?')) return

    try {
      const { contentAPI } = await import('../../../services')
      await contentAPI.heroSlides.delete(id)
      fetchHeroSlides()
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed')
    }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const formData = new FormData()
      formData.append('isActive', (!isActive).toString())
      
      const { contentAPI } = await import('../../../services')
      await contentAPI.heroSlides.update(id, formData)
      fetchHeroSlides()
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
                src={(() => {
                  const url = getImageUrl(slide.imageUrl);
                  console.log('Admin hero slide image URL:', url, 'for slide:', slide.title);
                  return url;
                })()}
                alt={slide.title}
                className="w-32 h-20 object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  console.log('Admin hero slide image failed to load:', target.src);
                  target.src = 'data:image/svg+xml,%3Csvg width="128" height="80" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="128" height="80" fill="%233B82F6"/%3E%3Ctext x="64" y="40" text-anchor="middle" fill="white" font-size="10"%3ESLIDE%3C/text%3E%3C/svg%3E';
                }}
                onLoad={() => {
                  console.log('Admin hero slide image loaded successfully');
                }}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{slide.title}</h3>
                <p className="text-sm text-gray-600">{slide.subtitle}</p>
                <p className="text-sm text-gray-500 mt-1">{slide.description}</p>
                <div className="flex items-center space-x-4 mt-2">
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
                    disabled={isUploading || isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    name="subtitle"
                    defaultValue={editingItem?.subtitle}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                    disabled={isUploading || isSaving}
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
                  disabled={isUploading || isSaving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={editingItem?.order || 0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={isUploading || isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="isActive"
                    defaultValue={editingItem?.isActive !== false ? 'true' : 'false'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={isUploading || isSaving}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image {!editingItem && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Upload method:</span>
                    <button
                      type="button"
                      onClick={() => setUseCloudinaryUpload(!useCloudinaryUpload)}
                      className={`text-xs px-2 py-1 rounded ${
                        useCloudinaryUpload 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      disabled={isUploading || isSaving}
                    >
                      {useCloudinaryUpload ? 'Cloudinary' : 'Backend'}
                    </button>
                  </div>
                </div>
                <input
                  name="image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={isUploading || isSaving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {useCloudinaryUpload 
                    ? 'Cloudinary: Direct upload (faster). Formats: JPEG, PNG, GIF, WebP. Max: 5MB' 
                    : 'Backend: Upload through server. Formats: JPEG, PNG, GIF, WebP. Max: 5MB'
                  }
                </p>
                
                {/* Progress Indicator */}
                {isUploading && (
                  <div className="mt-3">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span className="text-sm text-blue-600">Uploading to Cloudinary...</span>
                      <span className="text-sm text-blue-600 font-medium">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {editingItem?.imageUrl && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Current image:</p>
                    <img 
                      src={getImageUrl(editingItem.imageUrl) || 'data:image/svg+xml,%3Csvg width="128" height="80" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="128" height="80" fill="%233B82F6"/%3E%3Ctext x="64" y="40" text-anchor="middle" fill="white" font-size="10"%3ECURRENT%3C/text%3E%3C/svg%3E'} 
                      alt="Current" 
                      className="w-32 h-20 object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg width="128" height="80" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="128" height="80" fill="%233B82F6"/%3E%3Ctext x="64" y="40" text-anchor="middle" fill="white" font-size="10"%3ECURRENT%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Save Status Indicator */}
              {isSaving && (
                <div className="mb-4 flex items-center space-x-2 text-green-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                  <span className="text-sm">Saving hero slide to backend...</span>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                  disabled={isUploading || isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading || isSaving}
                >
                  {isUploading || isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>
                        {isUploading ? 'Uploading...' : 'Saving...'}
                      </span>
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

export default HeroSlidesPage 
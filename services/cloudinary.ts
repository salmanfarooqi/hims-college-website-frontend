// Frontend Cloudinary Upload Configuration
// NOTE: Using unsigned uploads with preset for security
const CLOUDINARY_CLOUD_NAME = 'dwtru703l';
const CLOUDINARY_UPLOAD_PRESET = 'hims-college-unsigned'; // You'll need to create this preset in Cloudinary

// Upload progress callback type
export type UploadProgressCallback = (progress: number) => void;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

/**
 * Upload image directly to Cloudinary from frontend
 * @param file - The image file to upload
 * @param folder - Optional folder name (will be set in upload preset)
 * @param onProgress - Optional progress callback
 * @returns Promise with Cloudinary upload result
 */
export const uploadImageToCloudinary = async (
  file: File, 
  folder: string = 'hims-college/hero-slides',
  onProgress?: UploadProgressCallback
): Promise<CloudinaryUploadResult> => {
  try {
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPEG, PNG, GIF, and WebP images are allowed');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);
    
    // Add transformation parameters for optimization
    formData.append('quality', 'auto');
    formData.append('fetch_format', 'auto');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      
      // Provide specific error messages for common issues
      if (errorData.error?.message?.includes('Upload preset')) {
        throw new Error(`Upload preset '${CLOUDINARY_UPLOAD_PRESET}' not found. Please create it in your Cloudinary dashboard. See CLOUDINARY_SETUP.md for instructions.`);
      }
      if (errorData.error?.message?.includes('Invalid')) {
        throw new Error('Invalid upload configuration. Please check your Cloudinary settings.');
      }
      
      throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
    }

    const result = await response.json();
    
    // Call progress callback with 100%
    if (onProgress) onProgress(100);
    
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    if (error instanceof Error) {
      throw error; // Re-throw with original message
    }
    throw new Error('Failed to upload image to Cloudinary');
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of files to upload
 * @param folder - Optional folder name
 * @returns Promise with array of upload results
 */
export const uploadMultipleImages = async (
  files: File[], 
  folder?: string
): Promise<CloudinaryUploadResult[]> => {
  try {
    const uploadPromises = files.map(file => uploadImageToCloudinary(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

/**
 * Get optimized image URL from Cloudinary
 * @param publicId - The public ID of the image
 * @param transformations - Optional transformation parameters
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  publicId: string,
  transformations: string = 'q_auto,f_auto'
): string => {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}; 
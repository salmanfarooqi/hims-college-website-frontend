// Centralized Image Upload Utility
// This utility provides a consistent way to upload images to Cloudinary across the application

import { uploadImageToCloudinary, CloudinaryUploadResult } from '../services/cloudinary';

export interface ImageUploadOptions {
  folder?: string;
  maxSizeInMB?: number;
  allowedTypes?: string[];
  onProgress?: (progress: number) => void;
}

export interface ImageUploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  publicId?: string;
}

// Default configuration
const DEFAULT_OPTIONS: Required<ImageUploadOptions> = {
  folder: 'hims-college',
  maxSizeInMB: 10,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  onProgress: () => {}
};

/**
 * Upload a single image to Cloudinary with validation and error handling
 * @param file - The image file to upload
 * @param options - Upload configuration options
 * @returns Promise with upload result
 */
export const uploadImage = async (
  file: File,
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult> => {
  const config = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Validate file type
    if (!config.allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: `Invalid file type. Allowed types: ${config.allowedTypes.join(', ')}`
      };
    }

    // Validate file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > config.maxSizeInMB) {
      return {
        success: false,
        error: `File size (${fileSizeInMB.toFixed(2)}MB) exceeds maximum allowed size (${config.maxSizeInMB}MB)`
      };
    }

    // Upload to Cloudinary
    const result: CloudinaryUploadResult = await uploadImageToCloudinary(
      file,
      config.folder,
      config.onProgress
    );

    return {
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    };

  } catch (error) {
    console.error('Image upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of image files to upload
 * @param options - Upload configuration options
 * @returns Promise with array of upload results
 */
export const uploadMultipleImages = async (
  files: File[],
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult[]> => {
  const uploadPromises = files.map(file => uploadImage(file, options));
  return Promise.all(uploadPromises);
};

/**
 * Predefined upload configurations for different content types
 */
export const uploadConfigs = {
  heroSlides: {
    folder: 'hims-college/hero-slides',
    maxSizeInMB: 20,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  },
  teachers: {
    folder: 'hims-college/teachers',
    maxSizeInMB: 10,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  },
  students: {
    folder: 'hims-college/students',
    maxSizeInMB: 10,
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  },
  documents: {
    folder: 'hims-college/documents',
    maxSizeInMB: 50,
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
  }
};

/**
 * Helper function to upload teacher profile image
 */
export const uploadTeacherImage = (file: File, onProgress?: (progress: number) => void) => {
  return uploadImage(file, {
    ...uploadConfigs.teachers,
    onProgress
  });
};

/**
 * Helper function to upload student profile image
 */
export const uploadStudentImage = (file: File, onProgress?: (progress: number) => void) => {
  return uploadImage(file, {
    ...uploadConfigs.students,
    onProgress
  });
};

/**
 * Helper function to upload hero slide image
 */
export const uploadHeroSlideImage = (file: File, onProgress?: (progress: number) => void) => {
  return uploadImage(file, {
    ...uploadConfigs.heroSlides,
    onProgress
  });
};
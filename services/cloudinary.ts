// Frontend Cloudinary Upload Configuration
// Using your actual Cloudinary credentials
const CLOUDINARY_CLOUD_NAME = 'dwtru703l';
const CLOUDINARY_API_KEY = '964741116272599';
const CLOUDINARY_API_SECRET = 'QckGC-axVOaemElOzmt50-rDepA';

// Upload progress callback type
export type UploadProgressCallback = (progress: number) => void;

// Generate timestamp for signed uploads
const generateTimestamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

// Simple SHA-1 implementation for browsers that don't support Web Crypto API
const sha1 = (str: string): string => {
  // Simple SHA-1 hash implementation
  const rotateLeft = (n: number, s: number) => (n << s) | (n >>> (32 - s));
  
  const cvtHex = (val: number) => {
    let str = '';
    for (let i = 7; i >= 0; i--) {
      const v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  };
  
  const utf8Encode = (str: string) => {
    return unescape(encodeURIComponent(str));
  };
  
  const strToArray = (str: string) => {
    const arr: number[] = [];
    for (let i = 0; i < str.length; i++) {
      arr.push(str.charCodeAt(i));
    }
    return arr;
  };
  
  str = utf8Encode(str);
  const strBin = strToArray(str);
  const strLen = strBin.length;
  
  strBin[strLen >> 2] |= 0x80 << (24 - (strLen & 3) * 8);
  strBin[((strLen + 8) >> 6 << 4) + 15] = strLen << 3;
  
  const w: number[] = new Array(80);
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;
  
  for (let i = 0; i < strBin.length; i += 16) {
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    
    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = strBin[i + j] || 0;
      } else {
        w[j] = rotateLeft(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      
      const t = (rotateLeft(a, 5) + 
        (j < 20 ? (b & c) | (~b & d) : 
         j < 40 ? b ^ c ^ d : 
         j < 60 ? (b & c) | (b & d) | (c & d) : 
         b ^ c ^ d) + 
        e + w[j] + 
        (j < 20 ? 0x5a827999 : 
         j < 40 ? 0x6ed9eba1 : 
         j < 60 ? 0x8f1bbcdc : 
         0xca62c1d6)) & 0xffffffff;
      
      e = d; d = c; c = rotateLeft(b, 30); b = a; a = t;
    }
    
    h0 = (h0 + a) & 0xffffffff;
    h1 = (h1 + b) & 0xffffffff;
    h2 = (h2 + c) & 0xffffffff;
    h3 = (h3 + d) & 0xffffffff;
    h4 = (h4 + e) & 0xffffffff;
  }
  
  return cvtHex(h0) + cvtHex(h1) + cvtHex(h2) + cvtHex(h3) + cvtHex(h4);
};

// Generate signature for signed uploads
const generateSignature = async (params: Record<string, string>) => {
  // Sort parameters alphabetically and create string to sign
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  const stringToSign = `${sortedParams}${CLOUDINARY_API_SECRET}`;
  
  console.log('🔐 String to sign:', stringToSign);
  
  // Try Web Crypto API first (modern browsers)
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(stringToSign);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      console.log('🔐 Generated signature (Web Crypto):', signature);
      return signature;
    } catch (error) {
      console.warn('Web Crypto API failed, using fallback SHA-1');
    }
  }
  
  // Fallback to manual SHA-1 implementation
  const signature = sha1(stringToSign);
  console.log('🔐 Generated signature (fallback):', signature);
  return signature;
};

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

/**
 * Upload image using unsigned upload (simpler method)
 */
const uploadUnsigned = async (file: File, folder: string): Promise<CloudinaryUploadResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Use default preset
  formData.append('folder', folder);
  
  console.log('🔓 Trying unsigned upload with default preset');
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `Unsigned upload failed: ${response.status}`);
  }

  const result = await response.json();
  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
  };
};

/**
 * Upload image directly to Cloudinary from frontend
 * @param file - The image file to upload
 * @param folder - Optional folder name
 * @param onProgress - Optional progress callback
 * @returns Promise with Cloudinary upload result
 */
export const uploadImageToCloudinary = async (
  file: File, 
  folder: string = 'hims-college/hero-slides',
  onProgress?: UploadProgressCallback
): Promise<CloudinaryUploadResult> => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPEG, PNG, GIF, and WebP images are allowed');
    }

    // Try signed upload first
    try {
      console.log('📤 Attempting signed upload...');
      
      // Generate timestamp and signature for signed upload
      const timestamp = generateTimestamp();
      const params = {
        folder,
        timestamp: timestamp.toString()
      };
      
      const signature = await generateSignature(params);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', CLOUDINARY_API_KEY);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);

      console.log('🔐 Signed upload params:', {
        api_key: CLOUDINARY_API_KEY,
        timestamp,
        signature: signature.substring(0, 10) + '...',
        folder
      });

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log('❌ Signed upload failed:', errorData);
        throw new Error(errorData.error?.message || `Signed upload failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Signed upload successful!');
      
      // Call progress callback with 100%
      if (onProgress) onProgress(100);
      
      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      };

    } catch (signedError) {
      console.log('❌ Signed upload failed, trying unsigned upload...');
      console.log('Signed error:', signedError);
      
      // Fallback to unsigned upload
      try {
        const result = await uploadUnsigned(file, folder);
        console.log('✅ Unsigned upload successful!');
        
        // Call progress callback with 100%
        if (onProgress) onProgress(100);
        
        return result;
      } catch (unsignedError) {
        console.log('❌ Unsigned upload also failed:', unsignedError);
        throw new Error(`Both upload methods failed. Signed: ${signedError instanceof Error ? signedError.message : 'Unknown'}. Unsigned: ${unsignedError instanceof Error ? unsignedError.message : 'Unknown'}`);
             }
     }

  } catch (error) {
    console.error('❌ Upload to Cloudinary failed:', error);
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

/**
 * Test Cloudinary connection and credentials
 * @returns Promise with test result
 */
export const testCloudinaryConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Create a simple test blob (1x1 pixel PNG)
    const testBlob = new Blob([new Uint8Array([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
      0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xE2, 0x21, 0xBC, 0x33,
      0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ])], { type: 'image/png' });
    
    const testFile = new File([testBlob], 'test.png', { type: 'image/png' });
    
    await uploadImageToCloudinary(testFile, 'hims-college/test');
    
    return { success: true, message: 'Cloudinary connection successful!' };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Cloudinary connection failed' 
    };
  }
}; 
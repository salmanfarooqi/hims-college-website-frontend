// API Configuration - Direct URL configuration (no env dependency)
const API_BASE_URL = 'https://hims-college-backend.vercel.app';
// const API_BASE_URL = 'http://localhost:5000'; // Local development URL

// For production, change this to your production URL:
// const API_BASE_URL = 'https://your-production-api.com';

// Helper function to get full image URL
export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath; // External URLs (Unsplash, etc.)
  return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // If JSON parsing fails, use status-based messages
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid request data';
          break;
        case 401:
          errorMessage = 'Authentication required';
          break;
        case 403:
          errorMessage = 'Access forbidden';
          break;
        case 404:
          errorMessage = 'API endpoint not found';
          break;
        case 500:
          errorMessage = 'Server error occurred';
          break;
        default:
          errorMessage = 'Network error occurred';
      }
    }
    
    throw new Error(errorMessage);
  }
  return response.json();
};

// Applications API
export const applicationsAPI = {
  // Submit new application
  submit: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'POST',
      mode: 'cors', // Explicitly handle CORS
      body: formData // FormData object
    });
    return handleResponse(response);
  },

  // Get all applications
  getAll: async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/api/applications${query ? `?${query}` : ''}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  // Get application status by email
  getStatusByEmail: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/applications/status/${encodeURIComponent(email)}`);
    return handleResponse(response);
  },

  // Get application statistics
  getStatistics: async () => {
    const response = await fetch(`${API_BASE_URL}/api/applications/statistics`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },

  // Update application status
  updateStatus: async (id: string, status: string, notes?: string) => {
    const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    });
    return handleResponse(response);
  }
};

// Admin API
export const adminAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  // Get profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update profile
  updateProfile: async (name: string, email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, email })
    });
    return handleResponse(response);
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return handleResponse(response);
  }
};

// Content API (Teachers, Students, Hero Slides)
export const contentAPI = {
  // Hero Slides
  heroSlides: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/content/hero-slides`);
      return handleResponse(response);
    },
    getAllAdmin: async () => {
      const response = await fetch(`${API_BASE_URL}/api/content/admin/hero-slides`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },
    create: async (formData: FormData) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const response = await fetch(`${API_BASE_URL}/api/content/admin/hero-slides`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return handleResponse(response);
    },
    update: async (id: string, formData: FormData) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const response = await fetch(`${API_BASE_URL}/api/content/admin/hero-slides/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return handleResponse(response);
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/admin/hero-slides/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    }
  },

  // Teachers
  teachers: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/content/teachers`);
      return handleResponse(response);
    },
    getAllAdmin: async () => {
      const response = await fetch(`${API_BASE_URL}/api/content/admin/teachers`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },
    create: async (formData: FormData) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const response = await fetch(`${API_BASE_URL}/api/content/admin/teachers`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return handleResponse(response);
    },
    update: async (id: string, formData: FormData) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const response = await fetch(`${API_BASE_URL}/api/content/admin/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return handleResponse(response);
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/admin/teachers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    }
  },

  // Students
  students: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/content/students`);
      return handleResponse(response);
    },
    getAllAdmin: async () => {
      const response = await fetch(`${API_BASE_URL}/api/content/admin/students`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },
    create: async (formData: FormData) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const response = await fetch(`${API_BASE_URL}/api/content/admin/students`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return handleResponse(response);
    },
    update: async (id: string, formData: FormData) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
      const response = await fetch(`${API_BASE_URL}/api/content/admin/students/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      return handleResponse(response);
    },
    delete: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/api/content/admin/students/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    }
  },

  // Image upload
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    const response = await fetch(`${API_BASE_URL}/api/content/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    return handleResponse(response);
  }
};

// Teachers API (legacy support)
export const teachersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/api/teachers`);
    return handleResponse(response);
  },
  getAllAdmin: async () => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/admin/all`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },
  create: async (teacherData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/admin`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(teacherData)
    });
    return handleResponse(response);
  },
  update: async (id: string, teacherData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/admin/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(teacherData)
    });
    return handleResponse(response);
  },
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return handleResponse(response);
  }
};

// Export base URL for direct use if needed
export { API_BASE_URL }; 
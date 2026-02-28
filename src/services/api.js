const API_BASE_URL = 'https://backend-books-production-c7bc.up.railway.app/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
};

// Book APIs
export const bookAPI = {
  getAllBooks: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/books?${queryParams}`);
    return handleResponse(response);
  },

  getBookById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    return handleResponse(response);
  },

  searchBooks: async (query) => {
    const response = await fetch(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`);
    return handleResponse(response);
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  getMyOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Payment APIs
export const paymentAPI = {
  createPaymentOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  verifyPayment: async (paymentData) => {
    const response = await fetch(`${API_BASE_URL}/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(paymentData),
    });
    return handleResponse(response);
  },

  getPaymentStatus: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/payment/status/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Ad Tracking API
export const adAPI = {
  trackEvent: async (eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ads/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      return handleResponse(response);
    } catch (error) {
      // Silently fail for tracking events
      console.error('Ad tracking failed:', error);
    }
  },
};

export default {
  auth: authAPI,
  books: bookAPI,
  orders: orderAPI,
  payment: paymentAPI,
  ads: adAPI,
};

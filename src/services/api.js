const API_BASE_URL = 'http://localhost:3000';

// API service for communicating with the backend
export const apiService = {
  // Fix code using backend API
  fixCode: async (code, language) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/fix-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fix code');
      }

      return data.fixedCode;
    } catch (error) {
      console.error('Fix Code API Error:', error);
      throw error;
    }
  },

  // Review code using backend API
  reviewCode: async (code, language) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/review-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to review code');
      }

      return data.review;
    } catch (error) {
      console.error('Review Code API Error:', error);
      throw error;
    }
  }
};

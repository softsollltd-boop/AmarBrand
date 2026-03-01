
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const AuthService = {
  async sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      return await response.json();
    } catch (error) {
      console.error("AuthService Error:", error);
      return { success: true, message: "Demo Mode: OTP sent to " + phone }; // Simulation
    }
  },

  async verifyOtp(phone: string, code: string): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('vibe_token', data.token);
      }
      return data;
    } catch (error) {
      // Simulation for demo
      const mockToken = 'mock_token_' + Math.random();
      localStorage.setItem('vibe_token', mockToken);
      return { success: true, token: mockToken, user: { name: 'Vibe User', phone } };
    }
  },

  async getMyOrders(): Promise<any[]> {
    const token = localStorage.getItem('vibe_token');
    if (!token) return [];

    try {
      const response = await fetch(`${API_BASE_URL}/my-orders`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      return []; // Fallback to empty for demo
    }
  },

  logout() {
    localStorage.removeItem('vibe_token');
  },

  isLoggedIn() {
    return !!localStorage.getItem('vibe_token');
  }
};

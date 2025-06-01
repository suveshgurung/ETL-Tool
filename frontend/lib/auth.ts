const API_URL = "http://localhost:5000";

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  user?: User;
  access_token?: string;
  message?: string;
  error?: string;
}

class AuthService {
  async signup(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Signup failed');
      return data;
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Signup failed' };
    }
  }

  async signin(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Signin failed');
      return data;
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Signin failed' };
    }
  }

  async signout(token: string): Promise<{ message?: string; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/api/signout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Signout failed' };
    }
  }

  async getCurrentUser(token: string): Promise<{ user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get user');
      return data;
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Failed to get user' };
    }
  }
}

export const authService = new AuthService();

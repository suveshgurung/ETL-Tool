const API_URL = "http://localhost:5000"

export interface User {
  id: string;
  email : string;
}

export interface AuthResponse {

  user?: User
  access_token?: string
  message?: string
  error?: string
}


class AuthService {
  private token : string | null = null;

  constructor() {
    if (typeof Window !== 'undefined' ) {
      this.token = localStorage.getItem('auth_token')
    }
  }
  async signup (email : string, password : string) : Promise<AuthResponse> {
    try{
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password})
      });
      const data = await response.json();

      if  (!response.ok) {
        throw new Error(data.error)
      }
      return data;
    }
    catch(error) {
      return { error: error instanceof Error ? error.message : 'Signup failed' };
    }
    }

  async signin(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signin failed');
      }

      if (data.access_token) {
        this.token = data.access_token;
        localStorage.setItem('auth_token', data.access_token);
      }

      return data;
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Signin failed' };
    }
  }

  async signout(): Promise<{ message?: string; error?: string }> {
    try {
      if (!this.token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/api/signout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = await response.json();
      
      this.token = null;
      localStorage.removeItem('auth_token');

      return data;
    } catch (error) {
      this.token = null;
      localStorage.removeItem('auth_token');
      return { error: error instanceof Error ? error.message : 'Signout failed' };
    }
  }


  async getCurrentUser(): Promise<{ user?: User; error?: string }> {
    try {
      if (!this.token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/api/user`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get user');
      }

      return data;
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Failed to get user' };
    }
  }


  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }


  }
  




export const authService = new AuthService

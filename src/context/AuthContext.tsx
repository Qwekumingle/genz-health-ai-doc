// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (formData: RegisterFormData) => Promise<void>;
  signOut: () => Promise<void>;
}

interface RegisterFormData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  terms: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get('http://localhost:8000/accounts/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', (err as any).response?.data || err);
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:8000/accounts/login/', { email, password });
      const { access, refresh } = res.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      await fetchUser(access);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', (err as any).response?.data || err);
      throw err;
    }
  };

  const signUp = async (formData: RegisterFormData) => {
    try {
      await axios.post('http://localhost:8000/accounts/register/', formData);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', (err as any).response?.data || err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      if (refresh) {
        await axios.post(
          'http://localhost:8000/accounts/logout/',
          { refresh },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
      }
    } catch (err) {
      console.warn('Logout request failed (possibly expired token):', (err as any).response?.data || err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { notify } from '../utils/notify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from server on app start
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:3000/api/v1/users/me', {
          withCredentials: true,
        });

        setUser(res.data.doc);
        setError(null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://127.0.0.1:3000/api/v1/users/login',
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setUser(res.data.data.user); // { name, photo, role }
      notify('success', `welcome back ${res.data.data.user.name.split(' ')[0]}`);
      setError(null);
      if (res.data.status !== 'success') {
        return false;
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      notify('error', 'login failed!');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        'http://127.0.0.1:3000/api/v1/users/logout',
        {},
        {
          withCredentials: true,
        }
      );

      window.location.replace('/');
    } catch (err) {
      console.error('Logout request failed:', err.response.data.message);
      notify('error', 'failed to logout!');
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  // Update User
  const updateUser = async (data) => {
    try {
      const res = await axios.patch('http://127.0.0.1:3000/api/v1/users/updateMe', data, {
        withCredentials: true,
      });

      notify('success', 'user updated successfully');
      setUser(res.data.data.user);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

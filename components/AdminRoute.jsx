import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingModal from './LoadingModal';
import { useEffect } from 'react';

export default function AdminRoute({ children }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingModal />;
  }

  if (user && user.role === 'admin') {
    return children;
  }

  return null;
}

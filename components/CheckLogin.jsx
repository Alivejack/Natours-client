import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { notify } from '../utils/notify';
import LoadingModal from './LoadingModal';

export default function CheckLogin({ children }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      notify('error', 'you are not logged in !! ');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);
    }
  }, [user, loading, navigate]);

  if (loading) return <LoadingModal />;

  return user ? children : null;
}

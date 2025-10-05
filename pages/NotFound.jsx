import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);
  });

  return <div className="font-bold w-fit mx-auto mt-10 text-5xl"> 404 NotFound</div>;
}

import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSlice } from '../store/authSlice';

function Loading() {
  return <>Loading...</>;
}

export function AuthLayout({
  children,
  authentication = true,
}: PropsWithChildren<{ authentication?: boolean }>) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(authSlice.selectors.authenticated);

  useEffect(() => {
    if (authentication && authentication !== isAuthenticated) {
      navigate('/login');
    } else if (!authentication && authentication !== isAuthenticated) {
      navigate('/');
    }
    setLoading(false);
  }, [isAuthenticated, authentication, navigate]);

  return loading ? <Loading /> : <>{children}</>;
}

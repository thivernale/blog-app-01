import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

function Loading() {
  return <>Loading...</>;
}

export function AuthLayout({
  children,
  authentication = true,
}: PropsWithChildren<{ authentication?: boolean }>) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(({ auth }) => auth.authenticated);

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

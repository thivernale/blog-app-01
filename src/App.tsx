import './App.css';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { authService } from './appwrite/auth';
import { useAppDispatch } from './store/hooks';
import { login } from './store/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      }
    });
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col content-between justify-between">
      <div className="block w-full">
        <Header />
        <Outlet />
      </div>
      <div className="block w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;

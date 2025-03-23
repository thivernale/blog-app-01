import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { logout } from '../../store/authSlice';
import { authService } from '../../appwrite/auth';

export function LogoutButton() {
  const dispatch = useDispatch<Dispatch<ReturnType<typeof logout>>>();

  function handleLogout() {
    authService.logout().then(() => {
      dispatch(logout());
    });
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-block rounded-full px-6 py-2 duration-200 hover:bg-blue-100"
    >
      Logout
    </button>
  );
}

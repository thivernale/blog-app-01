import { logout } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { authService } from '../../appwrite/auth';

export function LogoutButton() {
  const dispatch = useAppDispatch();

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

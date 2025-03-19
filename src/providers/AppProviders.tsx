import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from '../contexts/UserContextProvider';
import { routes } from './routes';

export function AppProviders() {
  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

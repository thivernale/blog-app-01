import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from '../contexts/UserContextProvider.tsx';
import { routes } from './routes.tsx';

export function AppProviders() {

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

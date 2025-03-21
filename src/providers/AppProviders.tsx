import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { routes } from './Routes';

const router = createBrowserRouter(createRoutesFromElements(routes));

export function AppProviders() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

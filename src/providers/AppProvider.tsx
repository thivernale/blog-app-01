import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Layout } from '../Layout.tsx';
import { BackgroundWithColorToggles } from '../components/BackgroundWithColorToggles.tsx';
import { PasswordGenerator } from '../components/PasswordGenerator.tsx';
import { CurrencyConverter } from '../components/CurrencyConverter.tsx';
import App from '../App.tsx';
import { About } from '../components/About.tsx';
import { User } from '../components/User.tsx';
import { Github, githubInfoLoader } from '../components/Github.tsx';

export function AppProvider() {
  const routes = <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="background-color" element={<BackgroundWithColorToggles />} />
    <Route path="password-generator" element={<PasswordGenerator />} />
    <Route path="currency-converter" element={<CurrencyConverter />} />
    <Route path="about" element={<About />} />
    <Route path="user" element={<User />}>
      <Route path=":user" element={<User />} />
    </Route>
    <Route path="github" element={<Github />} loader={githubInfoLoader} />
    <Route path="*" element={<div>Not Found</div>} />
  </Route>;
  const router = createBrowserRouter(createRoutesFromElements(routes));
  return <RouterProvider router={router} />;
}

export const links: { path: string, label: string }[] = [
  { path: '', label: 'Home' },
  { path: 'background-color', label: 'Background Color Toggle' },
  { path: 'password-generator', label: 'Password Generator' },
  { path: 'currency-converter', label: 'Currency Converter' },
  { path: 'user/nemo', label: 'User' },
  { path: 'github', label: 'Github' },
];

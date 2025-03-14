import { Route } from 'react-router-dom';
import { Layout } from '../Layout';
import App from '../App';
import { Login } from '../components/Login';
import { BackgroundWithColorToggles } from '../components/BackgroundWithColorToggles';
import { PasswordGenerator } from '../components/PasswordGenerator';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { About } from '../components/About';
import { User } from '../components/User';
import { Github, githubInfoLoader } from '../components/Github';
import { TodoApp } from '../pages/todos/components/TodoApp';

export const routes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="login" element={<Login />} />
    <Route path="background-color" element={<BackgroundWithColorToggles />} />
    <Route path="password-generator" element={<PasswordGenerator />} />
    <Route path="currency-converter" element={<CurrencyConverter />} />
    <Route path="about" element={<About />} />
    <Route path="user" element={<User />}>
      <Route path=":user" element={<User />} />
    </Route>
    <Route path="github" element={<Github />} loader={githubInfoLoader} />
    <Route path="todos" element={<TodoApp />} />
    <Route path="*" element={<div>Not Found</div>} />
  </Route>
);

export const links: { path: string, label: string }[] = [
  { path: '', label: 'Home' },
  { path: 'background-color', label: 'Background Color Toggle' },
  { path: 'password-generator', label: 'Password Generator' },
  { path: 'currency-converter', label: 'Currency Converter' },
  { path: 'user/anonymous', label: 'User' },
  { path: 'github', label: 'Github' },
  { path: 'todos', label: 'Todos' },
];

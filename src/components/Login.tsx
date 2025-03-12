import { FormEvent, useEffect, useState } from 'react';
import { useUserContext } from '../contexts/UserContext.ts';
import { ThemeToggle } from './ThemeToggle.tsx';
import { ThemeProvider } from '../contexts/ThemeContext.ts';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUserContext();

  const [theme, setTheme] = useState<string | undefined>('light');
  useEffect(() => {
    const classList = document.querySelector('html')!.classList;
    classList.remove('light', 'dark');
    classList.add(theme as string);
  }, [theme]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser({ username, password });
  }

  return (
    <ThemeProvider value={[theme, setTheme]}>
      <div
        className="w-full flex flex-col gap-3 flex-wrap justify-center items-center dark:bg-gray-600 dark:text-white "
      >
        <div className="p-2 justify-end w-md flex flex-wrap">
          <ThemeToggle />
        </div>
        <h2 className="text-2xl mb-4">Login Form</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-3 border border-gray-300 dark:border-white justify-center items-center w-md"
        >
          <input
            type="text"
            className="outline-gray-300 dark:outline-white outline-1 p-2 w-1/2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            className="outline-gray-300 dark:outline-white outline-1 p-2 w-1/2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="outline-gray-300 dark:outline-white outline-1 p-2 w-1/2"
          >
            Submit
          </button>
        </form>
      </div>
    </ThemeProvider>
  );
}

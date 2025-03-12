import { FormEvent, useState } from 'react';
import { useUserContext } from '../contexts/UserContext.ts';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUserContext();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser({ username, password });
  }

  return (
    <div
      className="w-full flex flex-col gap-3 flex-wrap justify-center items-center"
    >
      <h2 className="text-2xl mb-4">Login Form</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 border border-white justify-center items-center w-md"
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
  );
}

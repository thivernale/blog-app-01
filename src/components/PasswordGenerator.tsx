import { useCallback, useEffect, useRef, useState } from 'react';

export function PasswordGenerator() {
  const [length, setLength] = useState<number>(8);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const generatePassword = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) {
      str += '0123456789';
    }
    if (includeCharacters) {
      str += '!@#$%^&*()_+';
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length + 1);
      generatedPassword += str.charAt(charIndex);
    }

    setPassword(generatedPassword);
  }, [length, includeNumbers, includeCharacters]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeCharacters, generatePassword]);

  const copyPasswordToClipboard = async () => {
    await window.navigator.clipboard.writeText(password);
    //passwordRef.current?.setSelectionRange(0, password.length, 'forward');
    passwordRef.current?.select();
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-xl mb-2 text-center text-white my-3">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg mb-4 overflow-hidden">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white"
          readOnly={true}
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          type="button"
          onClick={() => copyPasswordToClipboard()}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 active:bg-blue-300"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={40}
            value={length}
            name="length"
            className="cursor-pointer"
            onChange={(event) => setLength(parseInt(event.target.value))}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <label>
            <input
              type="checkbox"
              defaultChecked={includeNumbers}
              onChange={() => setIncludeNumbers((prevState) => !prevState)}
            />{' '}
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <label>
            <input
              type="checkbox"
              defaultChecked={includeCharacters}
              onChange={() => setIncludeCharacters((prevState) => !prevState)}
            />{' '}
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

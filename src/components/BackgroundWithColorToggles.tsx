import { useState } from 'react';

export function BackgroundWithColorToggles() {
  const [color, setColor] = useState<string>('teal');
  const colors: string[] = ['teal', 'orange', 'lavender', 'salmon', 'cyan'];

  return (
    <div
      className="w-full grow duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed top-28 flex flex-wrap justify-center inset-x-0 px-2">
        <div
          className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl"
        >
          {colors.map(buttonColor => (
            <button
              className={`${buttonColor === color ? 'outline-2 outline-offset-2 outline-gray-300' : 'outline-none'} px-4 py-1 rounded-full shadow-lg text-black capitalize`}
              style={{ backgroundColor: buttonColor }}
              onClick={() => setColor(buttonColor)}
              key={buttonColor}
            >
              {buttonColor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

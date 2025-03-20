import { createContext, useContext, useState } from 'react';

type ThemeContextType = ReturnType<typeof useState<string>>;

export const ThemeContext = createContext<ThemeContextType>([
  'light',
  () => {},
]);

export const ThemeProvider = ThemeContext.Provider;

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

import { createContext, useContext } from 'react';

export type User = {
  username?: string;
  password?: string;
} | null;

export type UserContextType = {
  user?: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export const useUserContext = () => {
  return useContext<UserContextType>(UserContext);
};

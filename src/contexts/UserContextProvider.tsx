import { User, UserContext } from './UserContext';
import { PropsWithChildren, useState } from 'react';

export function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

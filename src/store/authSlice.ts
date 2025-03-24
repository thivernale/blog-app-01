import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
  $id: string;
} | null;
export type AuthState = { authenticated: boolean; userData: UserData };

const initialState: AuthState = { authenticated: false, userData: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.authenticated = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.authenticated = false;
      state.userData = null;
    },
  },
  selectors: {
    authenticated: (state) => state.authenticated,
    userData: (state) => state.userData,
  },
});

export const { login, logout } = authSlice.actions;

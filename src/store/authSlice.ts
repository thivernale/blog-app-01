import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = { authenticated: boolean; userData: unknown };

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
  },
});

export const { login, logout } = authSlice.actions;

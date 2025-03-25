import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Models } from 'appwrite';

export type AuthState = {
  authenticated: boolean;
  userData: Models.User<Models.Preferences> | null;
};

const initialState: AuthState = { authenticated: false, userData: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<AuthState, 'authenticated'>>) => {
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

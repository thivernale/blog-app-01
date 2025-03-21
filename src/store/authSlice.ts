import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = { authenticated: boolean; userData: any };

const initialState: AuthState = { authenticated: false, userData: null };

export const authSlice = createSlice({
  name: 'authSlice',
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
});

export const { login, logout } = authSlice.actions;

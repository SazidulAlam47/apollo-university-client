import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface IUser {
    id: string;
    role: string;
    iat: number;
    exp: number;
}
export interface TAuthState {
    user: null | IUser;
    token: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TAuthState>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
                credentials: 'include',
            });
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;

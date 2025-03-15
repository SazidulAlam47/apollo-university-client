import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface TAuthState {
    user: null | object;
    token: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

// export const {  } = authSlice.actions

export default authSlice.reducer;

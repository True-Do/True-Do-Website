import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  initialState: {
    user: {},
  },
  name: 'auth',
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = {};
    },
  },
});

const authActions = authSlice.actions;
let authReducer = authSlice.reducer;
export { authActions, authReducer };
export default authSlice;

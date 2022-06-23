import { createSlice } from '@reduxjs/toolkit';
import { localStorageService } from '../../services';

const authSlice = createSlice({
  name: 'auth',
  initialState: { currentUser: null },
  reducers: {
    settedUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    loggedOut: (state) => {
      state.currentUser = null;
    },
  },
});

export default authSlice;

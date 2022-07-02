import { createSlice } from '@reduxjs/toolkit';

const adsSlice = createSlice({
  name: 'ads',
  initialState: { entities: null, loading: false },
  reducers: {
    requested: (state) => {
      state.entities = [];
      state.loading = true;
    },
    received: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    },
    failed: (state) => {
      state.loading = false;
    },
    created: (state) => {
      state.loading = false;
    },
  },
});

export default adsSlice;

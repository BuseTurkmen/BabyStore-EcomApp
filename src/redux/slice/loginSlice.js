import { createSlice } from '@reduxjs/toolkit';
const initialState = {user:''}
const loginSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    saveUser(state, action) {
      state.user = action.payload? {name:action.payload.name}:null
    },
  },
});

export const { saveUser} = loginSlice.actions;
export default loginSlice.reducer;
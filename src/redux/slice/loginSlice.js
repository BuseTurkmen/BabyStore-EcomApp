import { createSlice } from '@reduxjs/toolkit';
const initialState = {user:''}
const loginSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    saveUser(state, action) {
      state.user = {name:action.payload.name}
    },
  },
});

export const { saveUser} = loginSlice.actions;
export default loginSlice.reducer;
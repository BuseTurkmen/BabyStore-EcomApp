import { createSlice } from '@reduxjs/toolkit';

const loadCommentsFromLocalStorage = () => {
  const comments = localStorage.getItem('comments');
  return comments ? JSON.parse(comments) : {};
};

const saveCommentsToLocalStorage = (comments) => {
  localStorage.setItem('comments', JSON.stringify(comments));
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: loadCommentsFromLocalStorage(),
  reducers: {
    addComment(state, action) {
      const { productId, comment } = action.payload;
      if (!state[productId]) {
        state[productId] = [];
      }
      state[productId].push(comment);
      saveCommentsToLocalStorage(state); 
    },
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;


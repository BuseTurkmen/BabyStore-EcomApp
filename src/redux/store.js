import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/slice/productsReducer";
import commentsReducer from '../redux/slice/commentsSlice';
import userReducer from "../redux/slice/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
    user: userReducer,
  },
});

export default store;

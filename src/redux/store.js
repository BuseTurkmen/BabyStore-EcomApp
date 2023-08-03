import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/slice/productsReducer";
// import cartReducer from "./slice/cartSlice";
import commentsReducer from '../redux/slice/commentsSlice';
import userReducer from "../redux/slice/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    // cart: cartReducer,
    comments: commentsReducer,
    user: userReducer,
  },
});

export default store;

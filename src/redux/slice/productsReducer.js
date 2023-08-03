import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    addToFavorite(state, action) {
      state.favoriteItems.push(action.payload);
    },
  },
});

export const { setProducts, addToCart, addToFavorite } = productsSlice.actions;
export default productsSlice.reducer;

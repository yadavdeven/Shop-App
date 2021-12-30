import PRODUCTS from "../../data/dummy-data";
import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {},
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;

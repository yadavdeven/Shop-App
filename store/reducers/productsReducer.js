import PRODUCTS from "../../data/dummy-data";
import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    deleteProduct(state, action) {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload.id
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    },
    addProduct(state, action) {
      console.log(action.payload);
      state.userProducts.push(action.payload);
      state.availableProducts.push(action.payload);
    },
    updateProduct(state, action) {
      console.log(action.payload);
      const productIndexUser = state.userProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const productIndexAvailable = state.availableProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      console.log(productIndexUser);
      console.log(productIndexAvailable);
      const temp = {
        id: action.payload.id,
        ownerId: action.payload.ownerId,
        title: action.payload.title,
        imageUrl: action.payload.imageUrl,
        price: action.payload.price,
        description: action.payload.description,
      };
      state.userProducts[productIndexUser] = temp;
      state.availableProducts[productIndexAvailable] = temp;
    },
  },
});

export const { deleteProduct } = productsSlice.actions;
export const { addProduct } = productsSlice.actions;
export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;

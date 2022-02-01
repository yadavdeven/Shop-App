import PRODUCTS from "../../data/dummy-data";
import { createSlice } from "@reduxjs/toolkit";
const initialProductsState = {
  availableProducts: PRODUCTS,
  firebaseProducts: [],
  isLoading: false,
  // userProducts: firebaseProducts
  // ? firebaseProducts.filter((prod) => prod.ownerId === "u1")
  // : null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    getProductsFetch(state) {
      state.isLoading = true;
    },
    getProductsSuccess(state, action) {
      state.firebaseProducts = action.payload;
      state.isLoading = false;
    },

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
    deleteProductFetch(state) {
      state.isLoading = true;
    },

    productAddFetch(state) {
      state.isLoading = true;
    },
    productUpdateFetch(state) {
      state.isLoading = true;
    },
    addProduct(state, action) {
      console.log(action.payload);
      // state.userProducts.push(action.payload);
      // state.firebaseProducts.push(action.payload);
      // state.availableProducts = action.payload;
      state.isLoading = false;
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

export const { productUpdateFetch } = productsSlice.actions;
export const { productAddFetch } = productsSlice.actions;
export const { getProductsSuccess } = productsSlice.actions;
export const { getProductsFetch } = productsSlice.actions;
export const { deleteProduct } = productsSlice.actions;
export const { addProduct } = productsSlice.actions;
export const { updateProduct } = productsSlice.actions;
export const { deleteProductFetch } = productsSlice.actions;
export default productsSlice.reducer;

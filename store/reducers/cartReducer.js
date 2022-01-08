import { createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderReducer";
import { deleteProduct } from "./productsReducer";
const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      let index = state.items.findIndex((item) => item.id === addedProduct.id);

      if (index >= 0) {
        state.items[index].quantity = state.items[index].quantity + 1;
        state.items[index].sum = state.items[index].sum + prodPrice;
        console.log(state.items[index].quantity);
        state.totalAmount = state.totalAmount + prodPrice;
      } else {
        const temp = { ...addedProduct, sum: prodPrice, quantity: 1 };
        console.log(temp.quantity);
        state.totalAmount = state.totalAmount + prodPrice;
        state.items.push(temp);
      }
    },
    removeFromCart(state, action) {
      const removedProduct = action.payload;
      let index = state.items.findIndex(
        (item) => item.id === removedProduct.id
      );
      const prodQuantity = removedProduct.quantity;
      const prodPrice = removedProduct.price;
      console.log(prodQuantity);
      console.log(prodPrice);
      console.log(index);
      if (prodQuantity > 1) {
        state.totalAmount = state.totalAmount - prodPrice;
        state.items[index].quantity = state.items[index].quantity - 1;
      } else {
        state.totalAmount = state.totalAmount - prodPrice;
        state.items.splice(index, 1);
        console.log("entering");
      }
    },
  },
  extraReducers: {
    [addOrder]: (state) => {
      return initialCartState;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

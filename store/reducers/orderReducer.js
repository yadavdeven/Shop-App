import { createSlice } from "@reduxjs/toolkit";
const initialOrderState = {
  orders: [],
  firebaseOrders: [],
  isLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState: initialOrderState,
  reducers: {
    addOrder(state, action) {
      console.log("order reducer");
      console.log(state.orders);
      const items = action.payload.items;
      const amount = action.payload.amount;

      const temp = {
        id: new Date().toString(),
        items: items,
        amount: amount,
        date: new Date(),
        get readableDate() {
          return this.date.toLocaleDateString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      };
      console.log(temp);
      state.orders.push(temp);
    },

    orderProductsFetch(state) {
      state.isLoading = true;
    },
    ordersFetch(state) {
      state.isLoading = true;
    },
    getOrdersSuccess(state, action) {
      state.firebaseOrders = action.payload;
      state.isLoading = false;
    },
  },
});

export const { addOrder } = orderSlice.actions;
export const { orderProductsFetch } = orderSlice.actions;
export const { ordersFetch } = orderSlice.actions;
export const { getOrdersSuccess } = orderSlice.actions;
export default orderSlice.reducer;

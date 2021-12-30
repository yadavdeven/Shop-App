import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";
const initialOrderState = {
  orders: [],
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
      };
      console.log(temp);
      state.orders.push(temp);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;

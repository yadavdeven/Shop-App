import { combineReducers } from "redux";

import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;

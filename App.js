import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import ShopNavigator from "./navigation/ShopNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}

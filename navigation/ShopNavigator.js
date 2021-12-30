import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function ShopNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: "white",
      }}>
      <Stack.Screen
        name='ProductOverview'
        component={ProductOverviewScreen}
        options={{
          headerTitle: "All Products",
        }}
      />
      <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Orders' component={OrdersScreen} />
    </Stack.Navigator>
  );
}

export default ShopNavigator;

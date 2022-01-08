import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
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
      <Stack.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={{
          headerTitle: "Your Products",
        }}
      />
      <Stack.Screen
        name='EditProductScreen'
        component={EditProductScreen}
        options={({ route }) => ({
          headerTitle: route.params.productId ? "Edit Product" : "Add Product",
        })}
      />
    </Stack.Navigator>
  );
}

export default ShopNavigator;

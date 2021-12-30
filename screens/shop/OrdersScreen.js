import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
function OrdersScreen(props) {
  const orders = useSelector((state) => state.orders.orders);
  // console.log(orders[0].amount);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => {
        return (
          <View style={{ flex: 1 }}>
            <Text>{itemData.item.amount}</Text>
          </View>
        );
      }}
    />
  );
}

export default OrdersScreen;

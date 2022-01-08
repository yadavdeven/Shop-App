import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import OrderItem from "../../components/shop/OrderItem";
function OrdersScreen(props) {
  const orders = useSelector((state) => state.orders.orders);
  // console.log(orders[0].amount);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.amount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
}

export default OrdersScreen;

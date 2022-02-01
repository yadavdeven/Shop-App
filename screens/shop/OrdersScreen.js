import React, { useState, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import OrderItem from "../../components/shop/OrderItem";
import { ordersFetch } from "../../store/reducers/orderReducer";

import { useFocusEffect } from "@react-navigation/native";
function OrdersScreen(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  // const [showData, setShowData] = useState(false);
  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(ordersFetch());
  //     setShowData(true);

  //     return () => {
  //       setShowData(false);
  //     };
  //   }, [firebaseOrders])
  // );

  useEffect(() => {
    dispatch(
      ordersFetch({
        userId: userId,
      })
    );
  }, [dispatch]);

  const orders = useSelector((state) => state.orders.orders);
  const firebaseOrders = useSelector((state) => state.orders.firebaseOrders);
  console.log(firebaseOrders);

  return (
    <FlatList
      data={firebaseOrders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
}

export default OrdersScreen;

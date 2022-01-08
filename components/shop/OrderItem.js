import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
function OrderItem(props) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={{ marginTop: 18, marginBottom: 5 }}>
        <Button
          color={Colors.primary}
          title='Show Details'
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
        {showDetails && (
          <FlatList
            data={props.items}
            renderItem={(itemData) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemData}>
                  <Text style={styles.quantity}>{itemData.item.quantity} </Text>
                  <Text style={styles.mainText}>{itemData.item.title} : </Text>
                </Text>
                <View style={styles.itemData}>
                  <Text style={styles.mainText}>
                    ${itemData.item.sum.toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {
    fontSize: 18,
    color: "#888",
    fontWeight: "bold",
    marginLeft: 10,
  },
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontSize: 16,
  },
});

export default OrderItem;

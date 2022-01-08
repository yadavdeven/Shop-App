import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";

function ProductItem(props) {
  return (
    <View style={styles.product}>
      <View
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: "hidden",
        }}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          title={props.title1}
          onPress={props.onPress1}
          color={Colors.primary}
        />
        <Button
          title={props.title2}
          onPress={props.onPress2}
          color={Colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  details: {
    alignItems: "center",
    height: "20%",
  },
});

export default ProductItem;

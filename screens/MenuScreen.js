import * as React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";

function MenuScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 1, marginTop: "20%", marginLeft: "2%", width: "30%" }}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>Home</Text>
        </View>
        <View style={[styles.textContainer, { borderBottomWidth: 1 }]}>
          <Button title='Orders' onPress={props.onOrdersPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 5,
  },
  textContainer: {
    borderTopWidth: 1,
  },
});
export default MenuScreen;

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

function LoadingIndicator() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingIndicator;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
function CartCounter({
  count,
  handleAddToCart,
  handleRemoveFromCart,
  fullButton,
}) {
  const Counter = () => {
    if (count === 0) {
      if (fullButton) {
        return (
          <TouchableOpacity style={styles.btnPrimary} onPress={handleAddToCart}>
            <Text style={styles.counterTextTertiary}>Add To Cart</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={handleAddToCart}
          >
            <Text style={styles.counterTextSecondary}>+</Text>
          </TouchableOpacity>
        );
      }
    } else {
      return (
        <View style={styles.counterWrapper}>
          <TouchableOpacity
            style={styles.btnTertiary}
            onPress={handleRemoveFromCart}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{count}</Text>
          <TouchableOpacity
            style={styles.btnTertiary}
            onPress={handleAddToCart}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return Counter();
}

const styles = StyleSheet.create({
  container: {},
  btnPrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2A4BA0",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "#2A4BA0",
    borderWidth: 2,
  },
  btnSecondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A4BA0",
    color: "white",
    padding: 5,
    width: 30,
    borderRadius: 100,
    margin: 10,
  },
  btnTertiary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    color: "black",
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  counterWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    margin: 10,
  },
  counterText: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 10
  },
  counterTextSecondary: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  counterTextTertiary: {
    color: "#2A4BA0",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default CartCounter;

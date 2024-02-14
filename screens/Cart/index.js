// AllProductsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

import api from "../../api";
import { useSelector } from "react-redux";
import CartProduct from "../../components/CartProduct";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  // Filter out items with count less than or equal to 0
  const filteredCartItems = cartItems.filter((item) => item.count > 0);

  // Calculate total price based on the filtered cart items
  const total = filteredCartItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  useEffect(() => {
    if (filteredCartItems.length === 0) {
      navigation.navigate("All Products");
    }
  }, [filteredCartItems, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartProduct data={item} />}
      />
      <View style={styles.bottomSheet}>
        <View style={styles.flexBox}>
          <Text style={styles.txtOne}>Subtotal</Text>
          <Text style={styles.txtTwo}>${total}</Text>
        </View>
        <View style={styles.flexBox}>
          <Text style={styles.txtOne}>Total</Text>
          <Text style={styles.txtTwo}>${total}</Text>
        </View>
        <TouchableOpacity style={styles.buy}>
          <Text style={styles.buyTxt}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    // paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingBottom: 20,
  },
  flexBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  txtOne: {
    fontSize: 16,
    fontWeight: "300",
    color: "grey",
  },
  txtTwo: {
    fontSize: 16,
    fontWeight: "800",
    color: "black",
  },
  buy: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2A4BA0",
    backgroundColor: "#2A4BA0",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buyTxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default Cart;

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import CartCounter from "../CartCounter";

const CartProduct = ({ data }) => {
  const { id, title, images, price } = data;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === id);
  const [count, setCount] = useState(cartItem ? cartItem.count : 0);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, count: count + 1, data }));
    setCount(count + 1);
  };

  const handleRemoveFromCart = () => {
    if (count > 0) {
      dispatch(removeFromCart(id));
      setCount(count - 1);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: images[0] }} style={styles.thumbnail} />
        </View>
        <View style={styles.desc}>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.sellingPrice}>${price}</Text>
        </View>
        <CartCounter
          count={(cartItems.find((item) => item.id === id) || {}).count || 0}
          {...{ handleAddToCart, handleRemoveFromCart }}
          fullButton={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1
  },
  desc: {
    flexGrow: 1
  },
  imageWrapper: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  thumbnail: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4
  },
  sellingPrice: {
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
  },
 
});

export default CartProduct;

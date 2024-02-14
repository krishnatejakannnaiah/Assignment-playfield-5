// Product.js
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  addToFavourite,
  removeFavourite,
} from "../../redux/actions/cartActions";
import CartCounter from "../CartCounter";
import Favorite from "../Favorite";

const Product = React.memo(({ data, navigateToProductDetail }) => {
  const { id, title, images, price } = data;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === id);
  const [count, setCount] = useState(cartItem ? cartItem.count : 0);
  const favouriteItems = useSelector(
    (state) => state.favourites.favouriteItems
  );
  const isFavorite = favouriteItems.includes(id);

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

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(addToFavourite(id));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigateToProductDetail(id)}
        style={styles.imageWrapper}
      >
        <Image source={{ uri: images[0] }} style={styles.thumbnail} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToProductDetail(id)}>
        <Text style={styles.sellingPrice}>${price}</Text>
        <Text style={styles.name}>{title}</Text>
      </TouchableOpacity>

      <CartCounter
        count={(cartItems.find((item) => item.id === id) || {}).count || 0}
        {...{ handleAddToCart, handleRemoveFromCart }}
        fullButton={true}
      />
      <Favorite
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 4,
    width: "48%", // 2 products per row
    // alignItems: 'center',
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 4,
  },
  gapper: {
    width: 10,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    marginBottom: 8,
    resizeMode: "contain",
  },
  name: {
    fontSize: 12,
  },
  sellingPrice: {
    fontSize: 14,
    marginBottom: 6,
    color: "black",
    fontWeight: "800",
  },
  cartButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  addToCartButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 4,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  removeFromCartButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  removeFromCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Product;

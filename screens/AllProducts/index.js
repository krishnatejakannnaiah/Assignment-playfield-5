// AllProductsScreen.js
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import api from "../../api";
import Product from "../../components/Product";

const AllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get("/products");
      setProducts(response?.data?.products); // Assuming the API response is an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
      // Optionally display an error message to the user
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const navigateToProductDetail = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        removeClippedSubviews={true}
        initialNumToRender={12}
        maxToRenderPerBatch={6}
        renderItem={({ item }) => (
          <Product
            data={item}
            navigateToProductDetail={navigateToProductDetail}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllProducts;

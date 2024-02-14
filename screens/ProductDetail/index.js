// ProductDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Favorite from "../../components/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  removeFavourite,
  addToCart,
  removeFromCart,
} from "../../redux/actions/cartActions";
import api from "../../api";
import CartCounter from "../../components/CartCounter";

const { width: screenWidth } = Dimensions.get("window");

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const [activeSlide, setActiveSlide] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  var id = productId;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === id);
  const [count, setCount] = useState(cartItem ? cartItem.count : 0);

  const favouriteItems = useSelector(
    (state) => state.favourites.favouriteItems
  );
  const isFavorite = favouriteItems.includes(productId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavourite(productId));
    } else {
      dispatch(addToFavourite(productId));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: productId, count: count + 1, data: product }));
    setCount(count + 1);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
    setCount(count - 1);
  };

  useEffect(() => {
    if (productId) {
      setCount(cartItem ? cartItem.length : 0);
    }
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Favorite
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
      <Image
        source={{ uri: item }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const navigateToProductDetail = (productId) => {
    navigation.navigate("Cart", { productId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hdn}>{product?.title}</Text>
      <Text style={styles.hdn2}>{product?.brand}</Text>

      <View>
        <Carousel
          data={product?.images}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={product?.images?.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
        />
      </View>

      <View style={styles.flexBox}>
        <Text style={styles.price}>${product?.price}</Text>
        <View style={styles.pill}>
          <Text style={styles.discount}>
            ${product?.discountPercentage} OFF
          </Text>
        </View>
      </View>
      <CartCounter
        count={(cartItems.find((item) => item.id === id) || {}).count || 0}
        {...{ handleAddToCart, handleRemoveFromCart }}
        fullButton={true}
      />

      <TouchableOpacity onPress={() => {navigateToProductDetail()}} style={styles.buy}>
        <Text style={styles.buyTxt}>Buy now</Text>
      </TouchableOpacity>
      <View style={styles.gapper}>
        <Text style={styles.details}>Details</Text>
        <Text style={styles.detailsText}>{product?.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 10,
    padding: 10,
  },
  carouselItem: {
    borderRadius: 10,
    borderColor: "blue",
  },
  carouselImage: {
    width: screenWidth - 20,
    height: 320,
    resizeMode: "contain",
    borderRadius: 10,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
  },
  hdn: {
    fontWeight: "300",
    fontSize: 50,
  },
  hdn2: {
    fontWeight: "800",
    fontSize: 50,
    lineHeight: 62.55,
    marginBottom: 10,
  },
  flexBox: {
    display: "flex",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: "#2A4BA0",
    fontWeight: "900",
    fontSize: 20,
    marginRight: 12,
  },
  pill: {
    backgroundColor: "#2A4BA0",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  discount: {
    color: "#fff",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: "300",
    color: "grey",
  },
  gapper: {
    marginVertical: 20,
    marginBottom: 60
  },
  buy: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2A4BA0",
    backgroundColor: "#2A4BA0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buyTxt: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ProductDetail;

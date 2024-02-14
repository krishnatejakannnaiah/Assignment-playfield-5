import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AllProducts from "./screens/AllProducts";
import ProductDetail from "./screens/ProductDetail";
import Cart from "./screens/Cart";

import store from "./redux/store";
import { Provider } from "react-redux";

import { useFonts } from 'expo-font';


const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    ManropeRegular: require('./assets/fonts/Manrope-VariableFont_wght.ttf'),
    ManropeBold: require('./assets/fonts/Manrope-VariableFont_wght.ttf'),
    // Add other font variations as needed
  });

  if (!loaded) {
    return null; // Return a loading indicator or fallback if fonts are still loading
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AllProducts">
        <Stack.Screen name="All Products" component={AllProducts} options={{ title: 'All Products' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: '' }} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'Shopping Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

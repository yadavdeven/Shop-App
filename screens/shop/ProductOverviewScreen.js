import React, { useState, useRef, useCallback } from "react";
import { FlatList, StyleSheet, Button, Animated } from "react-native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { cartActions } from "../../store/reducers/cartReducer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import MenuScreen from "../MenuScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { getProductsFetch } from "../../store/reducers/productsReducer";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { logout } from "../../store/reducers/authReducer";
import { ordersFetch } from "../../store/reducers/orderReducer";
function ProductOverviewScreen({ navigation }, props) {
  console.log("product overviewscreen rendered");
  const dispatch = useDispatch();
  const [showData, setShowData] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  console.log(userId);

  useEffect(() => {
    console.log("inside product fetch from overview");
    dispatch(getProductsFetch());
    setShowData(true);
  }, []);

  const firebaseProducts = useSelector(
    (state) => state.products.firebaseProducts
  );
  // const products = useSelector((state) => state.products.availableProducts);
  // const cartItems = useSelector((state) => state.cart.items);
  const [showMenu, setShowMenu] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const offsetValue = useRef(new Animated.Value(0)).current;
  // console.log(cartItems);
  console.log(firebaseProducts);
  console.log(showData);

  function menuPress() {
    console.log("in menu press");
    setShowMenu((prevState) => {
      return !prevState;
    });
    console.log(showMenu);

    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.95,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 110,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Cart'
            iconName='md-cart'
            onPress={() => {
              dispatch(getProductsFetch());
              navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item iconName='menu' onPress={menuPress} />
        </HeaderButtons>
      ),
    });
  }, [navigation, showMenu]);

  if (showData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {showMenu ? (
          <MenuScreen
            onOrdersPress={() => {
              // console.log("order press");
              // dispatch(
              //   ordersFetch({
              //     userId: userId,
              //   })
              // );
              navigation.navigate("Orders");
            }}
            onAdminPress={() => {
              navigation.navigate("UserProducts");
            }}
            onLogoutPress={() => {
              dispatch(logout());
              navigation.navigate("Auth");
            }}
          />
        ) : null}

        <Animated.View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
            // backgroundColor: "white",
          }}>
          <FlatList
            data={firebaseProducts}
            renderItem={(itemData) => (
              <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                title1='View Details'
                title2='To Cart'
                onPress1={() => {
                  navigation.navigate("ProductDetail", {
                    productId: itemData.item.id,
                  });
                }}
                onPress2={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
              />
            )}
          />
        </Animated.View>
      </SafeAreaView>
    );
  } else {
    return <LoadingIndicator />;
  }
}

const styles = StyleSheet.create({});

export default ProductOverviewScreen;

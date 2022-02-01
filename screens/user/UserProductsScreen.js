import React, { useState, useCallback, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../store/reducers/productsReducer";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import {
  getProductsFetch,
  productUpdateFetch,
  deleteProductFetch,
} from "../../store/reducers/productsReducer";

function UserProductsScreen({ navigation }, props) {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.token);
  const [showData, setShowData] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  // const loadProducts = useFocusEffect(
  //   useCallback(() => {
  //     dispatch(getProductsFetch());
  //     setShowData(true);
  //     return () => {
  //       setShowData(false);
  //     };
  //   }, [firebaseProducts, dispatch])
  // );

  const loadProducts = useEffect(() => {
    dispatch(getProductsFetch());
    setShowData(true);
  }, [dispatch, loadProducts]);

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      // do something
      dispatch(getProductsFetch());
    });

    // return () => {
    //   willFocusSub.remove();
    // };
  }, [navigation, loadProducts]);
  const firebaseProducts = useSelector(
    (state) => state.products.firebaseProducts
  );
  const userProducts = firebaseProducts.filter(
    (prod) => prod.ownerId === userId
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Add'
            iconName='md-create'
            onPress={() => {
              navigation.navigate("EditProductScreen", {
                productId: null,
              });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (showData) {
    return (
      <FlatList
        data={userProducts}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            title1='Edit'
            title2='Delete'
            onPress2={
              () => {
                dispatch(
                  deleteProductFetch({
                    productId: itemData.item.id,
                    token: token,
                  })
                );
                {
                  loadProducts;
                }
              }
              // deleteHandler.bind(this, itemData.item)
            }
            onPress1={() => {
              navigation.navigate("EditProductScreen", {
                productId: itemData.item.id,
              });
            }}
          />
        )}
      />
    );
  } else {
    return <LoadingIndicator />;
  }
}

export default UserProductsScreen;

import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  console.log("user productscreen rendered");
  const dispatch = useDispatch();
  const [showData, setShowData] = useState(true);
  // const isLoading = useSelector((state) => state.products.isLoading);
  // const productsFetched = useSelector(
  //   (state) => state.products.productsFetched
  // );
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  // useEffect(() => {
  //   console.log("inside useEffect");
  //   dispatch(getProductsFetch());
  //   setShowData(true);
  // }, []);

  const firebaseProducts = useSelector(
    (state) => state.products.firebaseProducts
  );
  console.log(firebaseProducts);

  function getProducts(prods) {
    console.log("memo");
    return prods.filter((prod) => prods.ownerId === userId);
  }

  // const userProducts = useMemo(() => getProducts(firebaseProducts), []);
  const userProducts = firebaseProducts.filter(
    (prod) => prod.ownerId === userId
  );
  console.log(userProducts);

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

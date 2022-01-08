import React from "react";
import { FlatList, Alert } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../store/reducers/productsReducer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
function UserProductsScreen({ navigation }, props) {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

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

  // function deleteHandler(item) {
  //   console.log("in delete handler");
  //   console.log(item);
  //   Alert.alert("Are You Sure?, You want to delete this!", [
  //     { text: "No", style: "default" },
  //     {
  //       text: "Yes",
  //       style: "destructive",
  //       onPress: () => {
  //         dispatch(deleteProduct(item));
  //       },
  //     },
  //   ]);
  // }
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
              dispatch(deleteProduct(itemData.item));
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
}

export default UserProductsScreen;

import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import {
  addProduct,
  getProductsFetch,
  productAddFetch,
  productUpdateFetch,
} from "../../store/reducers/productsReducer";
import LoadingIndicator from "../../components/UI/LoadingIndicator";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

function formReducer(state, action) {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formisValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
}

function EditProductScreen({ navigation, route }) {
  const dispatch = useDispatch();
  console.log("edit productscreen rendered");
  const { productId } = route.params;
  const editedProduct = useSelector((state) =>
    state.products.firebaseProducts.find((product) => product.id === productId)
  );
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formisValid: editedProduct ? true : false,
  });

  function textChangeHandler(inputIndentifier, text) {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIndentifier,
    });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Save'
            iconName='md-checkmark'
            onPress={() => {
              dispatch(
                addProduct({
                  productData: {
                    id: "u1",
                    ownerId: "u1",
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description,
                  },
                  token: token,
                })
              );
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  // console.log(token);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={textChangeHandler.bind(this, "title")}
          />
          {!formState.inputValidities.title && (
            <Text>Please, enter a valid title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={textChangeHandler.bind(this, "imageUrl")}
          />
        </View>
        <View style={styles.formControl}>
          <Text>Price</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.price}
            autoFocus
            returnKeyType='next'
            keyboardType='decimal-pad'
            onChangeText={textChangeHandler.bind(this, "price")}
          />
        </View>
        <View style={styles.formControl}>
          <Text>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={textChangeHandler.bind(this, "description")}
          />
        </View>
        <View
          style={{ marginTop: 25, marginHorizontal: 100, borderRadius: 10 }}>
          <Button
            title={productId ? "Update Product" : "Add Product"}
            onPress={async () => {
              if (!formState.formisValid) {
                Alert.alert("Wrong Input!, Please check the errors!", [
                  { text: "Okay" },
                ]);
                return;
              }
              if (productId) {
                console.log("update section");
                dispatch(
                  productUpdateFetch({
                    id: productId,
                    ownerId: userId,
                    title: formState.inputValues.title,
                    imageUrl: formState.inputValues.imageUrl,
                    price: Number(formState.inputValues.price),
                    description: formState.inputValues.description,
                    token: token,
                  })
                );
                navigation.navigate("UserProducts");
              } else {
                dispatch(
                  productAddFetch({
                    productData: {
                      ownerId: userId,
                      title: formState.inputValues.title,
                      imageUrl: formState.inputValues.imageUrl,
                      price: Number(formState.inputValues.price),
                      description: formState.inputValues.description,
                    },
                    token: token,
                  })
                );
                // dispatch(getProductsFetch());
                navigation.navigate("UserProducts");
                // setTimeout(() => {
                //   navigation.navigate("UserProducts");
                // }, 1000);
                // navigation.navigate.goBack();
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
    marginBottom: 5,
  },
  label: {
    margin: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    margin: 5,
    marginBottom: 5,
  },
});

export default EditProductScreen;

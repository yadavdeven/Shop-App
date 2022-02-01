import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signUp, signIn } from "../../store/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

function AuthScreen({ navigation }, props) {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const response = useSelector((state) => state.auth.response);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formisValid: false,
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

  useEffect(() => {
    if (response) {
      navigation.navigate("ProductOverview");
    }
  }, [response]);

  function authHandler() {
    if (isSignUp) {
      dispatch(
        signUp({
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        })
      );
    } else {
      dispatch(
        signIn({
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        })
      );
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
      <View style={styles.formContainer}>
        <View style={styles.textInputContainer}>
          <Text style={{ fontSize: 20 }}>Email:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={textChangeHandler.bind(this, "email")}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Text style={{ fontSize: 20 }}>Password:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={textChangeHandler.bind(this, "password")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.buttonText} onPress={authHandler}>
              {isSignUp ? "Sign Up" : "Log-In"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              setIsSignUp((prevState) => !prevState);
            }}>
            <Text style={styles.buttonText}>{`Switch to ${
              isSignUp ? "Log-In" : "SignUp"
            }`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    // alignItems: "center",
    elevation: 5,
    marginVertical: 130,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    // textAlign: "center",
  },
  textInputContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    // padding: 5,
    // backgroundColor: "yellow",
    alignContent: "center",
    marginHorizontal: 50,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    // marginTop: 50,
    // marginLeft: 50,
    // elevation: 5,
    // backgroundColor: "yellow",
    alignContent: "center",
  },
  touchableOpacity: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "red",
    margin: 12,
    elevation: 2,
  },
  buttonText: {
    color: "red",
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  textInput: {
    borderBottomWidth: 2,
    // borderWidth: 2,
    borderBottomColor: "black",
    padding: 4,
    // margin: 20,
  },
});

export default AuthScreen;

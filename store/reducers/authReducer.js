import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialAuthState = {
  isLoading: false,
  token: null,
  userId: null,
  response: false,
};

function saveDataToStorage(token, userId, expirationDate) {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate,
    })
  );
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signUp(state) {
      state.isLoading = true;
    },
    signUpSuccess(state, action) {
      state.response = action.payload;
      state.isLoading = false;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    signIn(state) {
      state.isLoading = true;
    },
    logout(state) {
      return initialAuthState;
    },
    signInSuccess(state, action) {
      state.response = action.payload.registered;
      state.token = action.payload.idToken;
      state.userId = action.payload.localId;
      console.log(action.payload.expiresIn);
      const expirationDate = new Date(
        new Date().getTime() + parseInt(action.payload.expiresIn) * 1000
      );
      saveDataToStorage(
        state.token,
        state.userId,
        expirationDate.toISOString()
      );
      state.isLoading = false;
    },
    storeUserData(state, action) {
      console.log("in store data reducer");
      state.response = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      console.log(action.payload.userId);
    },
    signInFailed(state, action) {
      console.log("signin failed");
      // console.log(state.error);
      // state.error = action.payload;
      // console.log(state.error);
      state.isLoading = false;
      // errorAlert();
      Alert.alert("Error Occured!", `${action.payload}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    },
  },
});

export const { signUp } = authSlice.actions;
export const { signUpFetch } = authSlice.actions;
export const { signIn, signInSuccess, signInFailed, storeUserData, logout } =
  authSlice.actions;
export default authSlice.reducer;

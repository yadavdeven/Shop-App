import { all } from "redux-saga/effects";

import productsSaga from "./productsSaga";
import addProductSaga from "./addProductSaga";
import updateProductSaga from "./updateProductSaga";
import orderProductsSaga from "./orderProductSaga";
import ordersSaga from "./ordersSaga";
import signUpSaga from "./authSaga";
import signInSaga from "./signInSaga";

export default function* rootSaga() {
  yield all([
    productsSaga(),
    addProductSaga(),
    updateProductSaga(),
    orderProductsSaga(),
    ordersSaga(),
    signUpSaga(),
    signInSaga(),
  ]);
}

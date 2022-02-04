import { call, put, takeEvery } from "redux-saga/effects";
import { getProductsSuccess } from "../reducers/productsReducer";

function formatProducts(products) {
  const finalprods = [];
  for (const [k, v] of Object.entries(products)) {
    v["id"] = k;
    finalprods.push(v);
  }
  return finalprods;
}
function* productsFetch(params) {
  // console.log(params.payload);
  const products = yield call(() =>
    fetch("https://shop-app-2d9e0-default-rtdb.firebaseio.com/products.json", {
      method: "GET",
    })
  );
  // console.log(products);
  const formattedProducts = yield products.json();
  // const formattedProducts = formattedProd;
  // console.log(formattedProducts);
  const finalProducts = yield formatProducts(formattedProducts);
  console.log(finalProducts);
  yield put(getProductsSuccess(finalProducts));
}

function* productsSaga() {
  yield takeEvery("products/getProductsFetch", productsFetch);
}

export default productsSaga;

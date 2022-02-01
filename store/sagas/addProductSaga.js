import { useSelector } from "react-redux";
import { call, put, takeEvery } from "redux-saga/effects";
import { addProduct, productAddFetch } from "../reducers/productsReducer";

function* productAdd(params) {
  // const token = useSelector((state) => state.auth.token);
  // console.log(token);
  console.log(params.payload);
  console.log(params.payload.productData);
  console.log(params.payload.token);
  // console.log(params.payload.ownerId);
  const product = yield call(() => {
    fetch(
      "https://shop-app-2d9e0-default-rtdb.firebaseio.com/products.json?auth=" +
        params.payload.token,
      {
        method: params.payload.id ? "PATCH" : "POST",
        body: JSON.stringify(params.payload.productData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  });
  // const formattedProduct = yield product.json();
  // console.log(formattedProduct);
  // yield put(addProduct(product));
}

function* addProductSaga() {
  yield takeEvery("products/productAddFetch", productAdd);
}

export default addProductSaga;

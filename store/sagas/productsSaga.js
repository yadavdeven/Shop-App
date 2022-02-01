import { call, put, takeEvery } from "redux-saga/effects";
import { getProductsSuccess } from "../reducers/productsReducer";

function* productsFetch(params) {
  // console.log(params.payload);
  const products = yield call(() =>
    fetch("https://shop-app-2d9e0-default-rtdb.firebaseio.com/products.json", {
      method: "GET",
    })
  );
  // console.log(products);
  const formattedProd = yield products.json();
  const formattedProducts = formattedProd;
  const finalProducts = [];
  // console.log(formattedProducts);
  for (const [k, v] of Object.entries(formattedProducts)) {
    v["id"] = k;
    // console.log(v);
    // k["id"] = v;
    finalProducts.push(v);
  }
  // console.log(finalProducts);
  yield put(getProductsSuccess(finalProducts));
}

function* productsSaga() {
  yield takeEvery("products/getProductsFetch", productsFetch);
}

// function* productAdd(params) {
//   console.log(params.payload);

//   const product = yield call(() => {
//     fetch("https://shop-app-2d9e0-default-rtdb.firebaseio.com/products.json", {
//       method: "POST",
//       body: JSON.stringify(params.payload),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
//   });
// const formattedProduct = yield product.json();
//   console.log(formattedProduct);
//   yield put(addProduct(formattedProduct));
// }

// function* productsSaga() {
//   yield takeEvery("products/getProductsFetch", productsFetch);
// }

export default productsSaga;

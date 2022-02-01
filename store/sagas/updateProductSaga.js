import { call, put, takeEvery } from "redux-saga/effects";
import { addProduct, productAddFetch } from "../reducers/productsReducer";

function* productUpdate(params) {
  console.log("in update saga");
  console.log(params.payload);
  console.log(params.payload.id);
  console.log(params.payload.title);
  const product = yield call(() => {
    fetch(
      "https://shop-app-2d9e0-default-rtdb.firebaseio.com/products/" +
        params.payload.id +
        ".json?auth=" +
        params.payload.token,
      params.payload.title
        ? {
            method: "PUT",
            body: JSON.stringify({
              ownerId: "u1",
              title: params.payload.title,
              imageUrl: params.payload.imageUrl,
              price: params.payload.price,
              description: params.payload.description,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        : {
            method: "DELETE",
          }
    );
  });
  // const formattedProduct = yield product.json();
  // console.log(formattedProduct);
  // yield put(addProduct(product));
}

function* productDelete(params) {
  console.log("in delete saga");
  console.log(params.payload);
  console.log(params.payload.productId);
  yield call(() => {
    fetch(
      "https://shop-app-2d9e0-default-rtdb.firebaseio.com/products/" +
        params.payload.productId +
        ".json?auth=" +
        params.payload.token,
      {
        method: "DELETE",
      }
    );
  });
}

function* updateProductSaga() {
  yield takeEvery("products/productUpdateFetch", productUpdate);
  yield takeEvery("products/deleteProductFetch", productDelete);
}

export default updateProductSaga;

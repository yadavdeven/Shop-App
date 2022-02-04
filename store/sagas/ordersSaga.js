import { call, put, takeEvery } from "redux-saga/effects";
import { getProductsSuccess } from "../reducers/productsReducer";
import { getOrdersSuccess } from "../reducers/orderReducer";
function* orderFetch(params) {
  // console.log(params.payload);
  console.log("order fetching");
  const orders = yield call(() =>
    fetch(
      `https://shop-app-2d9e0-default-rtdb.firebaseio.com/orders/${params.payload.userId}.json`,
      {
        method: "GET",
      }
    )
  );
  const formattedOrders = yield orders.json();
  console.log(formattedOrders);
  const finalOrders = [];

  for (const [k, v] of Object.entries(formattedOrders)) {
    v["id"] = k;
    // console.log(v);
    // k["id"] = v;
    finalOrders.push(v);
  }
  // console.log(finalProducts);
  yield put(getOrdersSuccess(finalOrders));
}

function* ordersSaga() {
  yield takeEvery("orders/ordersFetch", orderFetch);
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

export default ordersSaga;

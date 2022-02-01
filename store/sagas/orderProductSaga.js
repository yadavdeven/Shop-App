import { call, put, takeEvery } from "redux-saga/effects";

function* orderProducts(params) {
  console.log("in orders saga");
  console.log(params.payload);
  //   const date = new Date();

  const order = yield call(() => {
    fetch(
      `https://shop-app-2d9e0-default-rtdb.firebaseio.com/orders/${params.payload.userId}.json?auth=${params.payload.token}`,
      {
        method: "POST",
        body: JSON.stringify({
          items: params.payload.items,
          totalAmount: params.payload.amount,
          date: new Date(),
          get readableDate() {
            return this.date.toLocaleDateString("en-EN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
        }),
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

function* orderProductsSaga() {
  yield takeEvery("orders/orderProductsFetch", orderProducts);
}

export default orderProductsSaga;

import { call, put, takeEvery } from "redux-saga/effects";
import { signInSuccess, signInFailed } from "../reducers/authReducer";

function* signIn(params) {
  console.log("in signIn saga");
  console.log(params.payload);
  // console.log()

  const response = yield call(() =>
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyCtHW91uiBdqQSyj156pO8RM6B4kcB5DZU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.payload.email,
          password: params.payload.password,
          returnSecureToken: true,
        }),
      }
    )
  );
  const formattedResponse = yield response.json();
  console.log(formattedResponse);

  if (!response.ok) {
    console.log(formattedResponse.error.message);
    yield put(signInFailed(formattedResponse.error.message));
    // throw new Error();
  } else {
    // console.log(formattedResponse);
    yield put(signInSuccess(formattedResponse));
  }

  // console.log(formattedResponse);
  // console.log(formattedResponse.error.message);
}

function* signInSaga() {
  yield takeEvery("auth/signIn", signIn);
}

export default signInSaga;

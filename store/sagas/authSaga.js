import { call, put, takeEvery } from "redux-saga/effects";
import { signUpSuccess } from "../reducers/authReducer";

function* signUp(params) {
  console.log("in signUp saga");
  console.log(params.payload);
  // console.log()
  const response = yield call(() =>
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCtHW91uiBdqQSyj156pO8RM6B4kcB5DZU",
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
  const formattedResponse = response.json();
  console.log(formattedResponse);
}

function* signUpSaga() {
  yield takeEvery("auth/signUp", signUp);
}

export default signUpSaga;

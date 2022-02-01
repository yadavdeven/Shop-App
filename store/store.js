import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

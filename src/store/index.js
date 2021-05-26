import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import RootReducer from "../reducers";

const DEFAULT_STATE = {
    data: {}
};

const middleware = [ReduxThunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    RootReducer,
    DEFAULT_STATE,
    composeEnhancers(applyMiddleware(...middleware))
);
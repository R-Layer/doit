import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { rootReducer } from "./redux/reducers/rootReducer";

import ConnectedApp from "./containers/ConnectedApp";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();

import React from "react";
import ReactDOM from 'react-dom';
import App from "./components/App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/rootReducer";
import "./style/desktop.scss";
import "./style/style.css";
import "./style/mobile.scss";

const store=createStore(rootReducer,applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
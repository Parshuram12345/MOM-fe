import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import MobileApp from "./MobileApp.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
store.subscribe(() => console.log(store.getState()));
const resolution = window.innerWidth;
const isMobile = resolution >= 320 && resolution <= 480;
ReactDOM.render(
  <Router basename="/mom">
    <Provider store={store}>
      {isMobile ? <MobileApp /> : <App />}
    </Provider>
  </Router>,
  document.getElementById("root")
);

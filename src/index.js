import React from "react"
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {store} from "./Redux/Store/Store.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx"
// import MobileApp from "./MobileApp.jsx";
store.subscribe(()=>console.log(store.getState()))
ReactDOM.render(
 <Router>
    <Provider store={store}>
        <App />
        {/* <MobileApp/> */}
     </Provider>
 </Router>
    , document.getElementById("root"))
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {store} from "./Redux/Store/Store.jsx"
import App from "./App.jsx"
store.subscribe(()=>console.log(store.getState()))
ReactDOM.render(
    <Provider store={store}>
        <App />
     </Provider>
    , document.getElementById("root"))
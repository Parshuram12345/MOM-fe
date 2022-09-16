import { combineReducers } from "redux";
// import auth from "./auth";
// import settings from "./settings";
// import project from './project';
import addToCartReducer from "../cart";
// import threedReducer from "../../Lms/Reducers/threedReducer";

const rootReducer = combineReducers({
//   auth,
//   settings,
//   project,
  addToCartReducer,
//   threedReducer
});
export default rootReducer;

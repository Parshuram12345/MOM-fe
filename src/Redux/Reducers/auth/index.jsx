import { REHYDRATE } from "redux-persist";
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  SUCCESS,
  REQUEST,
  FAIL,
} from "../Actions/actionTypes";

const initialState = {
  loading: false,
  isLoggedIn: false,
  isProfileComplete: false,
  accessToken: null,
  type: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN[REQUEST]:
    case REGISTER[REQUEST]:
      return {
        ...state,
        loading: true,
      };

    case LOGIN[SUCCESS]:
    case REGISTER[SUCCESS]:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        ...action?.data,
      };

    case REHYDRATE:
      return {
        ...state,
        isLoggedIn: action?.payload?.auth?.isLoggedIn || false,
        ...action?.payload?.auth,
      };

    case LOGIN[FAIL]:
    case REGISTER[FAIL]:
      return {
        ...state,
        loading: false,
      };

    case LOGOUT[SUCCESS]:
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;

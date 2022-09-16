import { REHYDRATE } from "redux-persist";
import { addProject } from "../Actions/actionTypes";

const initialState = [];

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADDPROJECT":
        action.payload.images = [];
        action.payload.featuredImage = "";
        state.splice(state.length, 0, action.payload);
        return state;
      case "DELETEPROJECT":
        if (state.length <= 1) {
          state = [];
          return state;
        }
        state.splice(action.payload, 1);
        return state;
      case "INSERTIMAGE":
        state[action.payload.index]["images"] = action.payload.images;
        return state;
      case "DELETEIMAGE":
        const imageId = state.payload.imageId
        console.log(imageId)
        state[action.payload.index]["images"] = action.payload.images;
        return state;
      case "SETFEATUREDIMAGE":
        state[action.payload.index].featuredImage = action.payload.image;
        return state;
      default:
        return state;
    }
}
export default projectReducer;
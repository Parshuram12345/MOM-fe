const initialState = {
  projPicsLoading: true,
  list: [],
  leads: [],
  projectList: [],
  leadsInCart: [],
  profileData: [],
  planInfo: null,
  allotedLeads: [],
  allotedLeadsWeb: [],
  loading: true,
  gstCompanyName: "",
  projectDetails: {},
  projectImages: [],
  tempProjectList: [],
  planInCart: [],
};

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROJPICS_LOADING_TRUE":
      return {
        ...state,
        projPicsLoading: true,
      };

    case "PROJPICS_LOADING_FALSE":
      return {
        ...state,
        projPicsLoading: false,
      };

    case "SET_GST_COMPANY":
      return {
        ...state,
        gstCompanyName: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        list: [action.payload],
      };

    case "GET_USER_PROJECTS":
      return {
        ...state,
        projectList: [action.payload],
      };

    case "BUY_LEAD":
      return {
        ...state,
        list: [action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        list: state.list.filter((curElem, index) => {
          return index !== action.payload;
        }),
      };

    case "ADD_GST_DETAILS":
      const compName = action.payload.companyName;
      const gstNumb = action.payload.gstNum;
      return {
        ...state,
        gstDetails: {
          companyName: compName,
          gstNumber: gstNumb,
        },
      };

    case "FETCH_LEADS":
      return {
        ...state,
        leads: [action.payload],
      };

    case "FETCH_LEADS_IN_CART":
      return {
        ...state,
        leadsInCart: [action.payload],
      };

    case "FETCH_PROFILE_DATA":
      return {
        ...state,
        profileData: [action.payload],
      };

    case "PROFILE_GET_SUCCESS":
      return {
        ...state,
        loading: action.payload,
      };

    case "FETCH_PLAN_INFO":
      return {
        ...state,
        planInfo: action.payload,
      };

    case "FETCH_ALLOTED_LEADS":
      return {
        ...state,
        allotedLeads: [action.payload],
      };
    case "FETCH_ALLOTED_LEADS_WEB":
      return {
        ...state,
        allotedLeadsWeb: [action.payload],
      };

    case "SET_PROJECT_DETAILS":
      return {
        ...state,
        projectDetails: {
          name: action.payload.name,
          city: action.payload.city,
        },
      };

    case "ADD_PROJECT_IMAGES":
      return {
        ...state,
        projectImages: action.payload.map((curElem) => {
          return curElem;
        }),
      };

    case "ADD_MORE_IMAGES":
      return {
        ...state,
        projectImages: [...state.projectImages, action.payload],
      };

    case "DELETE_PROJECT_IMAGES":
      return {
        ...state,
        projectImages: state.projectImages.filter((curElem) => {
          return !action.payload.includes(curElem.path);
        }),
      };

    case "ADD_PROJECT_TO_ARRAY":
      let a = 0;
      console.log(state);
      state.tempProjectList.forEach((curElem) => {
        if (curElem.name === action.payload.name) {
          a++;
        }
      });
      if (a === 0) {
        return {
          ...state,
          tempProjectList: [...state.tempProjectList, action.payload],
          projectImages: [],
        };
      }

    case "DELETE_PROJECT_FROM_TEMP":
      return {
        ...state,
        tempProjectList: state.tempProjectList.filter((curElem) => {
          return curElem.name !== action.payload;
        }),
      };

    case "EDIT_PROJECT_IMAGES":
      return {
        ...state,
        projectImages: [...action.payload.imageArray],
        projectDetails: {
          name: action.payload.name,
          city: action.payload.city,
        },
      };

    case "SAVE_EDITED_PROJECT_IMAGES":
      const index = state.tempProjectList.findIndex((curElem) => {
        return curElem.name === action.payload.name;
      });
      const newTemp = state.tempProjectList;
      newTemp[index].images = action.payload.imageArray;
      return {
        ...state,
        tempProjectList: newTemp,
      };

    case "CLEAN_TEMP_PROJECTS":
      return {
        ...state,
        tempProjectList: [],
      };

    case "GET_PLAN_IN_CART":
      return {
        ...state,
        planInCart: [action.payload],
      };

    default:
      return state;
  }
};
export default addToCartReducer;

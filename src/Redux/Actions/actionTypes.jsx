export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAIL = "FAIL";

export const createRequestTypes = (base) => {
  return [REQUEST, SUCCESS, FAIL].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

//auth action types
export const LOGIN = createRequestTypes("LOGIN");
export const REGISTER = createRequestTypes("REGISTER");
export const LOGOUT = createRequestTypes("LOGOUT");

export function addProject(project) {
  return {
    type: "ADDPROJECT",
    payload: project,
  };
}

export function deleteProject(index) {
  return {
    type: "DELETEPROJECT",
    payload: index,
  };
}

export function insertImage(index, images) {
  return {
    type: "INSERTIMAGE",
    payload: {
      index,
      images,
    },
  };
}

export function deleteImage(id, images) {
  return {
    type: "DELETEIMAGE",
    payload: {
      id,
      images,
    },
  };
}

export function setFeaturedImage(index, image) {
  return {
    type: "SETFEATUREDIMAGE",
    payload: {
      index,
      image,
    },
  };
}

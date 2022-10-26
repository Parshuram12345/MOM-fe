import axios from "axios";
import { getToken } from "../Constant/constants";

export const postReq = (url, payload, headers) => {
  return axios
    .post(url, payload, {
      headers: {
        Authorization: getToken(),
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const getReq = (url, headers) => {
  return axios
    .get(url, {
      headers: {
        Authorization: getToken(),
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const putReq = (url, payload, headers) => {
  return axios
    .put(url, payload, {
      headers: {
        Authorization: getToken(),
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const b2bPostReq = (url, payload, headers) => {
  return axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};

export const b2bPutReq = (url, payload, headers) => {
  return axios
    .put(url, payload, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...headers,
      },
    })
    .then((response) => response)
    .catch((error) => {
      return { error: error };
    });
};
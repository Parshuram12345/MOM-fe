import axios from "axios";

const BASE_URL = "https://pro-api.idesign.market/";

// add leads into cart and store into global state
export function addToCart(data) {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
}

// get buyable leads and store into global state
export function getLeads(leads) {
  return {
    type: "FETCH_LEADS",
    payload: leads,
  };
}

// buy a single lead and add into cart
export function buyLead(data) {
  return {
    type: "BUY_LEAD",
    payload: data,
  };
}

//store user projects data into global state
export function getUserProjects(projects) {
  return {
    type: "GET_USER_PROJECTS",
    payload: projects,
  };
}

// remove leads form cart(not getting used right now)
export function removeFromCart(id) {
  return {
    type: "REMOVE_FROM_CART",
    payload: id,
  };
}

//store leads into global state
export function getLeadsInCart(leadsInCart) {
  return {
    type: "FETCH_LEADS_IN_CART",
    payload: leadsInCart,
  };
}

//store profile data into global state
export function getProfileData(profileData) {
  return {
    type: "FETCH_PROFILE_DATA",
    payload: profileData,
  };
}

// thunk functions below this
export function fetchLeads(authTok, limit) {
  return async (dispatch, getState) => {
    const data = await axios.get(`${BASE_URL}api/listBuyLeads?apitoken=hWFfEkzkYE1X691J4qmcuZHAoet7Ds7ADhL&limit=${limit}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(getLeads(data));
  };
}

//get user projects data
export function fetchUserProjects(authTok) {
  return async (dispatch, getState) => {
    const projects = await axios.get(`${BASE_URL}user/projects`, { headers: { authorization: authTok } }).then((res) => { return res }).catch((err) => { return err });
    dispatch(getUserProjects(projects));
  };
}

//add, get and delete lead into and from the cart
export function addLeadsToCart(authTok, leadId) {
  return async (dispatch, getState) => {
    const cartAddedLeads = await axios({
      method: "post",
      url: `${BASE_URL}user/addLeadToCart`,
      headers: { authorization: authTok },
      data: { leadId: leadId },
    });
    dispatch(() => addToCart(cartAddedLeads));
    dispatch(fetchLeadsInCart(authTok));
  };
}

export function fetchLeadsInCart(authTok) {
  return async (dispatch, getState) => {
    await axios.get(`${BASE_URL}user/listLeadsInCart`, { headers: { authorization: authTok } }).then((response) => {
      // console.log(response)
      dispatch(getLeadsInCart(response));
    });
  };
}

export function deleteLeadFromCart(authTok, leadId) {
  return async (dispatch, getState) => {
    await axios({
      url: `${BASE_URL}user/deleteLeadInCart`,
      method: "put",
      headers: { authorization: authTok },
      data: { leadId: leadId },
    }).then((response) => {
      dispatch(fetchLeadsInCart(authTok));
    });
  };
}

//to get profile data

export function profileGetSuccess() {
  return {
    type: "PROFILE_GET_SUCCESS",
    payload: false,
  };
}

export function fetchProfileData(authTok) {
  return async (dispatch, getState) => {
    await axios.get(`${BASE_URL}user/profile`, { headers: { authorization: authTok } }).then((response) => {
      dispatch(profileGetSuccess());
      dispatch(getProfileData(response));
    });
  }
}

// to get information about premium plans
export function getPlanInfo(planInfo) {
  return {
    type: "FETCH_PLAN_INFO",
    payload: planInfo,
  };
}

export function fetchPremiumPlanInfo(planId) {
  return async (dispatch, getState) => {
    const planInfo = await axios.get(`${BASE_URL}user/plans`, { data: planId });
    dispatch(getPlanInfo(planInfo));
  };
}

//control premium plan addition and deletion
export function addPremiumPlanToCart(authTok, planId) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/addPlanToCart`,
      headers: { authorization: authTok },
      data: { planId: planId },
    }).then(() => {
      dispatch(fetchPremiumPlanInCart(authTok));
    }).catch((error) => {
      console.log(error)
    });
  };
}

export function deletePremiumPlanFromCart(authTok, planId) {
  return async (dispatch, getState) => {
    await axios({
      method: "put",
      url: `${BASE_URL}user/deletePlanIncart`,
      headers: { authorization: authTok },
      data: { planId: planId },
    });
    dispatch(fetchPremiumPlanInCart(authTok));
  };
}

export function getPlanInCart(planData) {
  return {
    type: "GET_PLAN_IN_CART",
    payload: planData
  }
}

export function fetchPremiumPlanInCart(authTok) {
  return async (dispatch, getState) => {
    await axios({
      method: "get",
      url: `${BASE_URL}user/listPlansInCart`,
      headers: { authorization: authTok }
    }).then((response) => {
      dispatch(getPlanInCart(response));
    }).catch((error) => {
      console.log(error);
    });
  }
}

// get alloted leads

export function getAllotedLeads(allotedLeads) {
  return {
    type: "FETCH_ALLOTED_LEADS",
    payload: allotedLeads,
  };
}

export function fetchAllotedLeads(authTok, leadStatus, pageNum) {
  return async (dispatch, getState) => {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}user/leads?type=${leadStatus}&pageNo=${pageNum}`,
      headers: { authorization: authTok },
    });
    dispatch(getAllotedLeads(response));
  };
}

export function getAllotedLeadsWeb(allotedLeads) {
  return {
    type: "FETCH_ALLOTED_LEADS_WEB",
    payload: allotedLeads,
  };
}

export function fetchAllotedLeadsWeb(authTok, leadStatus, pageNum) {
  return async (dispatch, getState) => {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}user/leads?type=${leadStatus}&pageNo=${pageNum}`,
      headers: { authorization: authTok },
    });
    dispatch(getAllotedLeadsWeb(response));
  };
}

// lead status handling under here
export function setLeadStatusAction(authTok, leadId, leadStatus, reLeadStatus, rePageNum) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/leadActions`,
      headers: { authorization: authTok },
      data: {
        leadId: leadId,
        leadStatus: leadStatus,
      },
    });
    dispatch(fetchAllotedLeads(authTok, reLeadStatus, rePageNum));
  };
}

export function setLeadStatusActionWeb(authTok, leadId, leadStatus, reLeadStatus, rePageNum) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/leadActions`,
      headers: { authorization: authTok },
      data: {
        leadId: leadId,
        leadStatus: leadStatus,
      },
    });
    dispatch(fetchAllotedLeadsWeb(authTok, reLeadStatus, rePageNum));
  };
}

// update profile data
export function updateProfileData(authTok, payload) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/updateProfile`,
      headers: { authorization: authTok },
      data: payload,
    });
    dispatch(fetchProfileData(authTok));
  };
}

// update gst details
export function setGstDetails(authTok, gstNum, company) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/addGSTDetails`,
      headers: { authorization: authTok },
      data: {
        gstNumber: gstNum,
        companyName: company,
      },
    });
    dispatch(fetchProfileData(authTok));
  };
}

//update about us
export function setAboutUs(authTok, aboutUs, toast) {
  return async (dispatch, getState) => {
    try {
      await axios({
        method: "post",
        url: `${BASE_URL}user/addEditAboutUs`,
        headers: { authorization: authTok },
        data: { aboutUs: aboutUs },
      });
      dispatch(fetchProfileData(authTok));
      if (toast) {
        toast.success("Saved");

      }
    } catch (error) {
      console.log(error)
      if (toast) {
        toast.error("Error");
      }

    }
  };
}

//add purchased lead to alloted leads
export function addPurchasedLeads(authTok, leadsArray, pricePaid, orderId, paymentId, signature) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/purchaseLeads`,
      headers: { authorization: authTok },
      data: {
        leadId: leadsArray,
        pricePaid: pricePaid,
        razorOrderId: orderId,
        razorPaymentId: paymentId,
        razorSignature: signature,
      },
    }).then(() => {
      window.location.href = "/order-placed"
    });
  };
}

export function deleteProjectFromProfile(authTok, projId) {
  return async (dispatch, getState) => {
    await axios({
      method: "post",
      url: `${BASE_URL}user/addEditProject`,
      headers: { authorization: authTok },
      data: {
        isDeleted: true,
        projectId: projId
      }
    })
    dispatch(fetchUserProjects(authTok))
  }
}

//gst company name data here
export function setCompanyName(companyName) {
  return {
    type: "SET_GST_COMPANY",
    payload: companyName
  }
}

//add project controls below this
export function setProjectDetailsRedux(name, city) {
  return {
    type: "SET_PROJECT_DETAILS",
    payload: {
      name, city
    }
  }
}

export function addProjectImages(imageArray) {
  return {
    type: "ADD_PROJECT_IMAGES",
    payload: imageArray
  }
}

export function addMoreProjectImages(images) {
  return {
    type: "ADD_MORE_IMAGES",
    payload: images
  }
}

export function deleteProjectImages(filePathArray) {
  return {
    type: "DELETE_PROJECT_IMAGES",
    payload: filePathArray
  }
}

export function addProjectToArray(projObj) {
  return {
    type: "ADD_PROJECT_TO_ARRAY",
    payload: projObj
  }
}
export function deleteProjectFromTempArr(name) {
  return {
    type: "DELETE_PROJECT_FROM_TEMP",
    payload: name
  }
}

export function editProjectImages(name, city, imageArray) {
  return {
    type: "EDIT_PROJECT_IMAGES",
    payload: { name, city, imageArray }
  }
}
export function saveEditedProjectImages(name, imageArray) {
  return {
    type: "SAVE_EDITED_PROJECT_IMAGES",
    payload: { name, imageArray }
  }
}

export function cleanTempProjectList() {
  return {
    type: "CLEAN_TEMP_PROJECTS",
  }
}

export function sendInvoice(authTok, planId, leadsArray) {
  if (planId === "") {
    return async (dispatch, getState) => {
      await axios({
        method: "post",
        url: `${BASE_URL}user/generateInvoice`,
        headers: { authorization: authTok },
        data: {
          leadId: leadsArray
        }
      })
    }
  } else {
    return async (dispatch, getState) => {
      await axios({
        method: "post",
        url: `${BASE_URL}user/generateInvoice`,
        headers: { authorization: authTok },
        data: {
          planId: planId,
          leadId: leadsArray
        }
      })
    }
  }
}


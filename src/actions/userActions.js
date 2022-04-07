import * as api from '../api';
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    ADD_TO_FAV_REQUEST,
    ADD_TO_FAV_SUCCESS,
    ADD_TO_FAV_FAIL,
    USER_FAVS_LIST_REQUEST,
    USER_FAVS_LIST_SUCCESS,
    USER_FAVS_LIST_FAIL,
    GET_MYJOBS_REQUEST,
    GET_MYJOBS_SUCCESS,
    GET_MYJOBS_FAIL,
    UPDATE_USER_CV_REQUEST,
    UPDATE_USER_CV_SUCCESS,
    UPDATE_USER_CV_FAIL,
    USER_WORKEXP_LIST_REQUEST,
    USER_WORKEXP_LIST_SUCCESS,
    USER_WORKEXP_LIST_FAIL,
    ADD_TO_WORKEXP_REQUEST,
    ADD_TO_WORKEXP_SUCCESS,
    ADD_TO_WORKEXP_FAIL,
    ADD_TO_EDU_REQUEST,
    ADD_TO_EDU_SUCCESS,
    ADD_TO_EDU_FAIL,
    USER_EDU_LIST_SUCCESS,
    USER_EDU_LIST_REQUEST,
    USER_EDU_LIST_FAIL,
    DELETE_WORKEXP_REQUEST,
    DELETE_WORKEXP_SUCCESS,
    DELETE_WORKEXP_FAIL,
    DELETE_EDU_REQUEST,
    DELETE_EDU_SUCCESS,
    DELETE_EDU_FAIL,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,
    GET_ISUSERPROFILEUPDATE_REQUEST,
    GET_ISUSERPROFILEUPDATE_SUCCESS,
    GET_ISUSERPROFILEUPDATE_FAIL,
  GET_JOBS_APPLIED_TO_REQUEST,
  GET_JOBS_APPLIED_TO_SUCCESS,
  GET_JOBS_APPLIED_TO_FAIL
  } from "../constants/actionTypes";

  
// Login and register, logout Functions
export const registerUser = (user) => async (dispatch) => {
  try {
    // Register request made
    dispatch({ type: USER_REGISTER_REQUEST });
    
    // Run the register API call & pass into the user
    const {data} = await api.registerUser(user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Setthe logged in user to the local storage.
    localStorage.setItem("userInfo", JSON.stringify(data));
    
  } catch (error) {
    // Register request failed
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const loginUser = (user) => async (dispatch) => {
  try {
    // Login request made
    dispatch({ type: USER_LOGIN_REQUEST });

    // Call the Login API call
    const { data } = await api.loginUser(user);

    // Login success
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    
    // Set the logged in user to the local storage
    localStorage.setItem("userInfo", JSON.stringify(data)); 
  } catch (error) {
    // Login fail
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  // Remove the current logged in user stored in the local storage
  localStorage.removeItem("userInfo");

  // Logout dispatched
  dispatch({ type: USER_LOGOUT });
};


// Get a user Function
export const getAUser = (id) => async (dispatch) => {
  try {
    
    // Get a user request made
    dispatch({ type: USER_GET_REQUEST });
    
    // Call the Get User API call & pass in the id of the current Interview
    const {data} = await api.getUser(id);

    // Get user success and send back the data
    dispatch({type: USER_GET_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: USER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// Get Liked Interviews, Work Exp, Education and My Jobs Function
export const getUserFavs = (uid) => async (dispatch) => {
  try {
    // Send the LIST REQUEST state
    dispatch({ type: USER_FAVS_LIST_REQUEST });
    // Send the API call
    const { data } = await api.getAllUserFavs(uid);
    // Send the LIST SUCCESS state and pass the interviews list
    dispatch({ type: USER_FAVS_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message); // Print the error
    // Send the LIST FAIL state and pass the error message
    dispatch({ type: USER_FAVS_LIST_FAIL, payload: error.message });
  }
};
export const getUserWorkExp = (uid) => async (dispatch) => {
  try {
    // Send the LIST REQUEST state
    dispatch({ type: USER_WORKEXP_LIST_REQUEST });
    // Send the API call
    const { data } = await api.getAllUserWorkExp(uid);
    // Send the LIST SUCCESS state and pass the interviews list
    dispatch({ type: USER_WORKEXP_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message); // Print the error
    // Send the LIST FAIL state and pass the error message
    dispatch({ type: USER_WORKEXP_LIST_FAIL, payload: error.message });
  }
};
export const getUserEducation = (uid) => async (dispatch) => {
  try {
    // Send the LIST REQUEST state
    dispatch({ type: USER_EDU_LIST_REQUEST });
    // Send the API call
    const { data } = await api.getAllUserEducation(uid);
    // Send the LIST SUCCESS state and pass the interviews list
    dispatch({ type: USER_EDU_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message); // Print the error
    // Send the LIST FAIL state and pass the error message
    dispatch({ type: USER_EDU_LIST_FAIL, payload: error.message });
  }
};
export const getAllMyJobs = (id) => async (dispatch) => {
  try {
    // Send the LIST REQUEST state
    dispatch({ type: GET_MYJOBS_REQUEST });

    // Send the API call
    const { data } = await api.getMyJobs(id);
    // Send the LIST SUCCESS state and pass the interviews list
    dispatch({ type: GET_MYJOBS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message); // Print the error
    // Send the LIST FAIL state and pass the error message
    dispatch({ type: GET_MYJOBS_FAIL, payload: error.message });
  }
};
export const getIsUserProfileUpdated = (id) => async (dispatch) => {
  try {
    // Send the LIST REQUEST state
    dispatch({ type: GET_ISUSERPROFILEUPDATE_REQUEST });

    console.log(id, "User Profile ACTION")

    // Send the API call
    const { data } = await api.getIsUsersProfileUpdated(id);
    // Send the LIST SUCCESS state and pass the interviews list
    dispatch({ type: GET_ISUSERPROFILEUPDATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message); // Print the error
    // Send the LIST FAIL state and pass the error message
    dispatch({ type: GET_ISUSERPROFILEUPDATE_FAIL, payload: error.message });
  }
};


// Add Work Exp, Education and Liked Interview
export const addUserWorkExp =
  (data) =>
  async (dispatch) => {
    try {
      // Send the CREATE REQUEST state
      dispatch({ type: ADD_TO_WORKEXP_REQUEST });
      console.log("ZXXXXXX", data);

      // Run the API call with the new Interview & the bearer token
      const { res } = await api.addToWorkExp(
         data
      );

      // Send the CREATE SUCCESS state and pass the data
      dispatch({ type: ADD_TO_WORKEXP_SUCCESS, payload: res });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      // Send the CREATE FAIL state and pass the error message
      dispatch({ type: ADD_TO_WORKEXP_FAIL, payload: message });
    }
  };
export const addUserEducation =
  (data) =>
  async (dispatch) => {
    try {
      // Send the CREATE REQUEST state
      dispatch({ type: ADD_TO_EDU_REQUEST });
      console.log("ZXXXXXX", data);

      // Run the API call with the new Interview & the bearer token
      const { res } = await api.addNewEducation(
         data
      );

      // Send the CREATE SUCCESS state and pass the data
      dispatch({ type: ADD_TO_EDU_SUCCESS, payload: res });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      // Send the CREATE FAIL state and pass the error message
      dispatch({ type: ADD_TO_EDU_FAIL, payload: message });
    }
  };
export const addIntToFavs =
  (data) =>
  async (dispatch) => {
    try {
      // Send the CREATE REQUEST state
      dispatch({ type: ADD_TO_FAV_REQUEST });
      console.log("ZXXXXXX", data);

      // Run the API call with the new Interview & the bearer token
      const { res } = await api.addToFavs(
         data
      );

      // Send the CREATE SUCCESS state and pass the data
      dispatch({ type: ADD_TO_FAV_SUCCESS, payload: res });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      // Send the CREATE FAIL state and pass the error message
      dispatch({ type: ADD_TO_FAV_FAIL, payload: message });
    }
  };


// Delete Work Exp, Education Function
export const deleteUserWorkExp =
  (data) =>
  async (dispatch) => {
    try {
      // Send the CREATE REQUEST state
      dispatch({ type: DELETE_WORKEXP_REQUEST });
      console.log("ZXXXXXX", data);

      // Run the API call with the new Interview & the bearer token
      const { res } = await api.deleteWorkExp(
         data
      );

      // Send the CREATE SUCCESS state and pass the data
      dispatch({ type: DELETE_WORKEXP_SUCCESS, payload: res });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      // Send the CREATE FAIL state and pass the error message
      dispatch({ type: DELETE_WORKEXP_FAIL, payload: message });
    }
  };
export const deleteUserEducation =
  (data) =>
  async (dispatch) => {
    try {
      // Send the CREATE REQUEST state
      dispatch({ type: DELETE_EDU_REQUEST });
      console.log("ZXXXXXX", data);

      // Run the API call with the new Interview & the bearer token
      const { res } = await api.deleteEducation(
         data
      );

      // Send the CREATE SUCCESS state and pass the data
      dispatch({ type: DELETE_EDU_SUCCESS, payload: res });
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      // Send the CREATE FAIL state and pass the error message
      dispatch({ type: DELETE_EDU_FAIL, payload: message });
    }
  };



// Update User CV Function
export const updateUsersCV =
  (_id, title, aboutMe, twitterUrl, githubUrl) =>
  async (dispatch) => {
    try {
      // Send the CREATE REQUEST state
      dispatch({ type: UPDATE_USER_CV_REQUEST });

      console.log(aboutMe, "CV - ACTION")

      // Run the API call with the new Interview & the bearer token
      const { data } = await api.updateUserCV(
        { _id, title, aboutMe, twitterUrl, githubUrl}
      );

      // Send the CREATE SUCCESS state and pass the data
      dispatch({ type: UPDATE_USER_CV_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save the logged in user to the local storage
    } catch (err) {
      const message =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      // Send the CREATE FAIL state and pass the error message
      dispatch({ type: UPDATE_USER_CV_FAIL, payload: message });
    }
  };




export const getAllJobsUserAppliedTo = (id) => async (dispatch) => {
  try {
    // Send the LIST REQUEST state
    dispatch({ type: GET_JOBS_APPLIED_TO_REQUEST });
    console.log(id, "getAllUsersThatApplied")
    // Send the API call
    const { data } = await api.getAllJobsAppliedTo(id);
    // Send the LIST SUCCESS state and pass the interviews list
    dispatch({ type: GET_JOBS_APPLIED_TO_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message); // Print the error
    // Send the LIST FAIL state and pass the error message
    dispatch({ type: GET_JOBS_APPLIED_TO_FAIL, payload: error.message });
  }
};

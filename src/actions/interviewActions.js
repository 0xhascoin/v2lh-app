import {
    INTERVIEW_LIST_FAIL,
    INTERVIEW_LIST_REQUEST,
    INTERVIEW_LIST_SUCCESS,
    INTERVIEW_GET_FAIL,
    INTERVIEW_GET_REQUEST,
    INTERVIEW_GET_SUCCESS,
    INTERVIEW_CREATE_REQUEST,
    INTERVIEW_CREATE_SUCCESS,
    INTERVIEW_CREATE_FAIL,
    ADD_TO_QUEUE_REQUEST,
    ADD_TO_QUEUE_SUCCESS,
    ADD_TO_QUEUE_FAIL,
    REMOVE_FROM_QUEUE_REQUEST,
    REMOVE_FROM_QUEUE_SUCCESS,
    REMOVE_FROM_QUEUE_FAIL,
    GET_QUEUE_REQUEST,
    GET_QUEUE_SUCCESS,
    GET_QUEUE_FAIL,
    USER_INTERVIEW_LIST_REQUEST,
    USER_INTERVIEW_LIST_SUCCESS,
    USER_INTERVIEW_LIST_FAIL,
    ADD_TO_APPLICATIONS_REQUEST,
    ADD_TO_APPLICATIONS_SUCCESS,
    ADD_TO_APPLICATIONS_FAIL,
    GET_APPLICATIONS_REQUEST,
    GET_APPLICATIONS_SUCCESS,
    GET_APPLICATIONS_FAIL,
    GET_ALL_USERS_THAT_APPLIED_SUCCESS,
    GET_ALL_USERS_THAT_APPLIED_REQUEST,
    GET_ALL_USERS_THAT_APPLIED_FAIL,
    HAS_USER_APPLIED_REQUEST,
    HAS_USER_APPLIED_SUCCESS,
    HAS_USER_APPLIED_FAIL
  } from "../constants/actionTypes";
  import * as api from "../api";
  
  
  
  // Get ALL the interviews in the DB
  export const getAllInterviews = () => async (dispatch) => {
    try {
      // Send the LIST REQUEST state
      dispatch({ type: INTERVIEW_LIST_REQUEST });
      console.log("getAllInterviews()")
  
      // Send the API call
      const { data } = await api.getAllInterviews();
      // Send the LIST SUCCESS state and pass the interviews list
      dispatch({ type: INTERVIEW_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message); // Print the error
      // Send the LIST FAIL state and pass the error message
      dispatch({ type: INTERVIEW_LIST_FAIL, payload: error.message });
    }
  };
  // Get ONE Interview using ID
  export const getOneInterview = (id) => async (dispatch) => {
    try {
      // Send the GET REQUEST state
      dispatch({ type: INTERVIEW_GET_REQUEST });
  
      // Run the API call with the passed ID
      const { data } = await api.getOneInterview(id);
      // Dispatch the State SUCCESS & send the payload
      dispatch({ type: INTERVIEW_GET_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message);
  
      // Send the GET REQUEST state
      dispatch({ type: INTERVIEW_GET_FAIL });
    }
  };
  
  
    // Get ALL the applications in this interview
  export const getJobApplications = (id) => async (dispatch) => {
    try {
      // Send the LIST REQUEST state
      dispatch({ type: GET_APPLICATIONS_REQUEST });
  
      // Send the API call
      const { data } = await api.getApplications(id);
      // Send the LIST SUCCESS state and pass the interviews list
      dispatch({ type: GET_APPLICATIONS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message); // Print the error
      // Send the LIST FAIL state and pass the error message
      dispatch({ type: GET_APPLICATIONS_FAIL, payload: error.message });
    }
  };
    // Get ALL the users in the queue
  export const getIntQueue = (id) => async (dispatch) => {
    try {
      // Send the LIST REQUEST state
      dispatch({ type: GET_QUEUE_REQUEST });
  
      // Send the API call
      const { data } = await api.getQueue(id);
      // Send the LIST SUCCESS state and pass the interviews list
      dispatch({ type: GET_QUEUE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message); // Print the error
      // Send the LIST FAIL state and pass the error message
      dispatch({ type: GET_QUEUE_FAIL, payload: error.message });
    }
  };
  
  
  // Create an interview using these fields
  export const addToApplications =
    (id, user) =>
    async (dispatch) => {
      try {
        // Send the CREATE REQUEST state
        dispatch({ type: ADD_TO_APPLICATIONS_REQUEST });
  
  
        // Run the API call with the new Interview & the bearer token
        const { data } = await api.addToApplications(
          id,
          {user}
        );
        
        console.log(user, "USER")
  
        // Send the CREATE SUCCESS state and pass the data
        dispatch({ type: ADD_TO_APPLICATIONS_SUCCESS, payload: data });
      } catch (err) {
        const message =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
  
        // Send the CREATE FAIL state and pass the error message
        dispatch({ type: ADD_TO_APPLICATIONS_FAIL, payload: message });
      }
    };
  // Create an interview using these fields
  export const createInterviewAction =
    (companyName, companyLogo, companyDescription, jobTitle, jobLength, jobLevel, jobDetails, currency, minSalary, personName, date, time) =>
    async (dispatch, getState) => {
      try {
        // Send the CREATE REQUEST state
        dispatch({ type: INTERVIEW_CREATE_REQUEST });
  
        // Get the state of the current user logged in
        const {
          userLogin: { userInfo },
        } = getState();
  
        // Protected backend route so you need to pass the Bearer Token
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        // Run the API call with the new Interview & the bearer token
        const { data } = await api.createInterview(
          { companyName, companyLogo, companyDescription, jobTitle, jobLength, jobLevel, jobDetails, currency, minSalary, personName, date, time },
          config
        );
  
        // Send the CREATE SUCCESS state and pass the data
        dispatch({ type: INTERVIEW_CREATE_SUCCESS, payload: data });
      } catch (err) {
        const message =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
  
        // Send the CREATE FAIL state and pass the error message
        dispatch({ type: INTERVIEW_CREATE_FAIL, payload: message });
      }
    };
  // Add user to queue
  export const addToQueue =
    (id, uid, name) =>
    async (dispatch) => {
      try {
        // Send the CREATE REQUEST state
        dispatch({ type: ADD_TO_QUEUE_REQUEST });
  
  
        // Run the API call with the new Interview & the bearer token
        const { data } = await api.addToQueue(
          id,
          { uid, name }
        );
  
        // Send the CREATE SUCCESS state and pass the data
        dispatch({ type: ADD_TO_QUEUE_SUCCESS, payload: data });
      } catch (err) {
        const message =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
  
        // Send the CREATE FAIL state and pass the error message
        dispatch({ type: ADD_TO_QUEUE_FAIL, payload: message });
      }
    };
  
  
  
  // Get ALL the interviews in the DB
  export const getAllUserInterviews = (id) => async (dispatch) => {
    try {
      // Send the LIST REQUEST state
      dispatch({ type: USER_INTERVIEW_LIST_REQUEST });
      console.log(id, "getAllUserInterviews")
      // Send the API call
      const { data } = await api.getAllUserInterviews(id);
      // Send the LIST SUCCESS state and pass the interviews list
      dispatch({ type: USER_INTERVIEW_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message); // Print the error
      // Send the LIST FAIL state and pass the error message
      dispatch({ type: USER_INTERVIEW_LIST_FAIL, payload: error.message });
    }
  };
  
  export const getAllUsersThatApplied = (id) => async (dispatch) => {
    try {
      // Send the LIST REQUEST state
      dispatch({ type: GET_ALL_USERS_THAT_APPLIED_REQUEST });
      console.log(id, "getAllUsersThatApplied")
      // Send the API call
      const { data } = await api.getAllUsersThatApplied(id);
      // Send the LIST SUCCESS state and pass the interviews list
      dispatch({ type: GET_ALL_USERS_THAT_APPLIED_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message); // Print the error
      // Send the LIST FAIL state and pass the error message
      dispatch({ type: GET_ALL_USERS_THAT_APPLIED_FAIL, payload: error.message });
    }
  };
  
  export const hasUserApplied = (id, userId) => async (dispatch) => {
    try {
      // Send the LIST REQUEST state
      dispatch({ type: HAS_USER_APPLIED_REQUEST });
      console.log("hasUserApplied()", userId)
  
      // Send the API call
      const { data } = await api.hasUserApplied(id, userId);
      // Send the LIST SUCCESS state and pass the interviews list
      dispatch({ type: HAS_USER_APPLIED_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.message); // Print the error
      // Send the LIST FAIL state and pass the error message
      dispatch({ type: HAS_USER_APPLIED_FAIL, payload: error.message });
    }
  };
  
  
  
  // Create an interview using these fields
  export const removeUserFromQueue =
    (id, uid) =>
    async (dispatch) => {
      try {
        // Send the CREATE REQUEST state
        dispatch({ type: REMOVE_FROM_QUEUE_REQUEST });
  
  
        // Run the API call with the new Interview & the bearer token
        const { data } = await api.removeFromQueue(
          id,
          { uid }
        );
  
        // Send the CREATE SUCCESS state and pass the data
        dispatch({ type: REMOVE_FROM_QUEUE_SUCCESS, payload: data });
      } catch (err) {
        const message =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
  
        // Send the CREATE FAIL state and pass the error message
        dispatch({ type: REMOVE_FROM_QUEUE_FAIL, payload: message });
      }
    };
  
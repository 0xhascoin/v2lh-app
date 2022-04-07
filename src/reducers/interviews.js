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
  
  // Interview LisT Reducer stored in Interviews Array
  export const interviewListReducer = (state = { interviews: [] }, action) => {
    switch (action.type) {
      case INTERVIEW_LIST_REQUEST:
        return { loading: true };
      case INTERVIEW_LIST_SUCCESS:
        return { loading: false, interviews: action.payload };
      case INTERVIEW_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  // Interview LisT Reducer stored in Interviews Array
  export const usersInterviewsListReducer = (state = { usersInterviews: [] }, action) => {
    switch (action.type) {
      case USER_INTERVIEW_LIST_REQUEST:
        return { loading: true };
      case USER_INTERVIEW_LIST_SUCCESS:
        return { loading: false, usersInterviews: action.payload };
      case USER_INTERVIEW_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  // One Interview Reducer stored in a Interview Array
  export const oneInterviewReducer = (state = { interview: [] }, action) => {
    switch (action.type) {
      case INTERVIEW_GET_REQUEST:
        return { loading: true };
      case INTERVIEW_GET_SUCCESS:
        return { loading: false, interview: action.payload };
      case INTERVIEW_GET_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };
  
  // Create Interview Reducer 
  export const interviewCreateReducer = (state = { }, action) => {
    switch (action.type) {
      case INTERVIEW_CREATE_REQUEST:
        return { loading: true };
      case INTERVIEW_CREATE_SUCCESS:
        return { loading: false, success: true };
      case INTERVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }
  
  // Add To Queue Reducer 
  export const addToQueueReducer = (state = { }, action) => {
    switch (action.type) {
      case ADD_TO_QUEUE_REQUEST:
        return { loading: true };
      case ADD_TO_QUEUE_SUCCESS:
        return { loading: false, success: true };
      case ADD_TO_QUEUE_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

  // Add To Applications Reducer 
  export const addToApplicationsReducer = (state = { }, action) => {
    switch (action.type) {
      case ADD_TO_APPLICATIONS_REQUEST:
        return { loading: true };
      case ADD_TO_APPLICATIONS_SUCCESS:
        return { loading: false, success: true };
      case ADD_TO_APPLICATIONS_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

  // Remove User from Queue Reducer 
  export const removeFromQueueReducer = (state = { }, action) => {
    switch (action.type) {
      case REMOVE_FROM_QUEUE_REQUEST:
        return { loading: true };
      case REMOVE_FROM_QUEUE_SUCCESS:
        return { loading: false, success: true };
      case REMOVE_FROM_QUEUE_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }
 
  
  // Interview LisT Reducer stored in Interviews Array
  export const getQueueReducer = (state = { queue: [] }, action) => {
    switch (action.type) {
      case GET_QUEUE_REQUEST:
        return { loading: true };
      case GET_QUEUE_SUCCESS:
        return { loading: false, queue: action.payload };
      case GET_QUEUE_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const getApplicationsReducer = (state = { applications: [] }, action) => {
    switch (action.type) {
      case GET_APPLICATIONS_REQUEST:
        return { loading: true };
      case GET_APPLICATIONS_SUCCESS:
        return { loading: false, applications: action.payload };
      case GET_APPLICATIONS_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const getUsersThatAppliedReducer = (state = { usersThatApplied: [] }, action) => {
    switch (action.type) {
      case GET_ALL_USERS_THAT_APPLIED_REQUEST:
        return { loading: true };
      case GET_ALL_USERS_THAT_APPLIED_SUCCESS:
        return { loading: false, usersThatApplied: action.payload };
      case GET_ALL_USERS_THAT_APPLIED_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const hasUserAppliedReducer = (state = { userApplied: [] }, action) => {
    switch (action.type) {
      case HAS_USER_APPLIED_REQUEST:
        return { loading: true };
      case HAS_USER_APPLIED_SUCCESS:
        return { loading: false, userApplied: action.payload };
      case HAS_USER_APPLIED_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };


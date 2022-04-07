import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    HOST_GET_REQUEST,
    HOST_GET_SUCCESS,
    HOST_GET_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    UPDATE_PROFILE_PHOTO_REQUEST,
    UPDATE_PROFILE_PHOTO_SUCCESS,
    UPDATE_PROFILE_PHOTO_FAIL,
    UPDATE_COMPANY_LOGO_REQUEST,
    UPDATE_COMPANY_LOGO_SUCCESS,
    UPDATE_COMPANY_LOGO_FAIL,
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
  
  
  // Register a new user Reducer
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: true, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Login a user that Exists Reducer
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: true, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };

  // Get a single user from DB 
  export const getHostReducer = (state = { host: [] }, action) => {
    switch (action.type) {
      case HOST_GET_REQUEST:
        return { loading: true };
      case HOST_GET_SUCCESS:
        return { loading: false, host: action.payload };
      case HOST_GET_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const getUserReducer = (state = { user: [] }, action) => {
    switch (action.type) {
      case USER_GET_REQUEST:
        return { loading: true };
      case USER_GET_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_GET_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };


    // Update Profile Photo Reducer 
    export const updateProfilePhotoReducer = (state = { }, action) => {
      switch (action.type) {
        case UPDATE_PROFILE_PHOTO_REQUEST:
          return { loading: true };
        case UPDATE_PROFILE_PHOTO_SUCCESS:
          return { loading: false, userInfo: action.payload};
        case UPDATE_PROFILE_PHOTO_FAIL:
          return { loading: false, error: action.payload };
        default:
            return state;
      }
    }

    // Update Company Logo Reducer 
    export const updateCompanyLogoReducer = (state = { }, action) => {
      switch (action.type) {
        case UPDATE_COMPANY_LOGO_REQUEST:
          return { loading: true };
        case UPDATE_COMPANY_LOGO_SUCCESS:
          return { loading: false, userInfo: action.payload};
        case UPDATE_COMPANY_LOGO_FAIL:
          return { loading: false, error: action.payload };
        default:
            return state;
      }
    }

  // Add To Favs Reducer 
  export const addToFavsReducer = (state = { }, action) => {
    switch (action.type) {
      case ADD_TO_FAV_REQUEST:
        return { loading: true };
      case ADD_TO_FAV_SUCCESS:
        return { loading: false, success: true };
      case ADD_TO_FAV_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

  export const addToWorkExpReducer = (state = { }, action) => {
    switch (action.type) {
      case ADD_TO_WORKEXP_REQUEST:
        return { loading: true };
      case ADD_TO_WORKEXP_SUCCESS:
        return { loading: false, success: true };
      case ADD_TO_WORKEXP_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

  export const deleteWorkExpReducer = (state = { }, action) => {
    switch (action.type) {
      case DELETE_WORKEXP_REQUEST:
        return { loading: true };
      case DELETE_WORKEXP_SUCCESS:
        return { loading: false, success: true };
      case DELETE_WORKEXP_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

  export const deleteEducationReducer = (state = { }, action) => {
    switch (action.type) {
      case DELETE_EDU_REQUEST:
        return { loading: true };
      case DELETE_EDU_SUCCESS:
        return { loading: false, success: true };
      case DELETE_EDU_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

  export const addToEducationReducer = (state = { }, action) => {
    switch (action.type) {
      case ADD_TO_EDU_REQUEST:
        return { loading: true };
      case ADD_TO_EDU_SUCCESS:
        return { loading: false, success: true };
      case ADD_TO_EDU_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  }

    // Interview LisT Reducer stored in Interviews Array
  export const usersFavsListReducer = (state = { interviews: [] }, action) => {
    switch (action.type) {
      case USER_FAVS_LIST_REQUEST:
        return { loading: true };
      case USER_FAVS_LIST_SUCCESS:
        return { loading: false, interviews: action.payload };
      case USER_FAVS_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const usersWorkExpReducer = (state = { workExp: [] }, action) => {
    switch (action.type) {
      case USER_WORKEXP_LIST_REQUEST:
        return { loading: true };
      case USER_WORKEXP_LIST_SUCCESS:
        return { loading: false, workExp: action.payload };
      case USER_WORKEXP_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const usersEducationReducer = (state = { education: [] }, action) => {
    switch (action.type) {
      case USER_EDU_LIST_REQUEST:
        return { loading: true };
      case USER_EDU_LIST_SUCCESS:
        return { loading: false, education: action.payload };
      case USER_EDU_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const getMyJobsReducer = (state = { myJobs: [] }, action) => {
    switch (action.type) {
      case GET_MYJOBS_REQUEST:
        return { loading: true };
      case GET_MYJOBS_SUCCESS:
        return { loading: false, myJobs: action.payload };
      case GET_MYJOBS_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

  export const getIsUserProfileUpdatedReducer = (state = { userProfileUpdated: [] }, action) => {
    switch (action.type) {
      case GET_ISUSERPROFILEUPDATE_REQUEST:
        return { loading: true };
      case GET_ISUSERPROFILEUPDATE_SUCCESS:
        return { loading: false, userProfileUpdated: action.payload };
      case GET_ISUSERPROFILEUPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };

      // Update Profile Photo Reducer 
    export const updateUserCVReducer = (state = { }, action) => {
      switch (action.type) {
        case UPDATE_USER_CV_REQUEST:
          return { loading: true };
        case UPDATE_USER_CV_SUCCESS:
          return { loading: false, userInfo: action.payload};
        case UPDATE_USER_CV_FAIL:
          return { loading: false, error: action.payload };
        default:
            return state;
      }
    }

export const getAllJobsAppliedToReducer = (state = { jobsAppliedTo: [] }, action) => {
    switch (action.type) {
      case GET_JOBS_APPLIED_TO_REQUEST:
        return { loading: true };
      case GET_JOBS_APPLIED_TO_SUCCESS:
        return { loading: false, jobsAppliedTo: action.payload };
      case GET_JOBS_APPLIED_TO_FAIL:
        return { loading: false, error: action.payload };
      default:
          return state;
    }
  };
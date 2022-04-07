import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
  getHostReducer,
  addToFavsReducer,
  usersFavsListReducer,
  updateProfilePhotoReducer,
  updateCompanyLogoReducer,
  getMyJobsReducer,
  updateUserCVReducer,
  usersWorkExpReducer,
  addToWorkExpReducer,
  addToEducationReducer,
  usersEducationReducer,
  deleteWorkExpReducer,
  deleteEducationReducer,
  getUserReducer,
  getIsUserProfileUpdatedReducer,
  getAllJobsAppliedToReducer
} from "./reducers/users";
import {
  interviewCreateReducer,
  interviewListReducer,
  oneInterviewReducer,
  addToQueueReducer,
  getQueueReducer,
  removeFromQueueReducer,
  usersInterviewsListReducer,
  addToApplicationsReducer,
  getApplicationsReducer,
  getUsersThatAppliedReducer,
  hasUserAppliedReducer
} from "./reducers/interviews";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  updateProfilePhoto: updateProfilePhotoReducer,
  updateCompanyLogo: updateCompanyLogoReducer,
  interviewCreate: interviewCreateReducer,
  interviewList: interviewListReducer,
  userInterviewList: usersInterviewsListReducer,
  oneInterview: oneInterviewReducer,
  roomHost: getHostReducer,
  getUser: getUserReducer,
  addToQueue: addToQueueReducer,
  addToFavs: addToFavsReducer,
  userFavsList: usersFavsListReducer,
  getQueue: getQueueReducer,
  removeFromQueue: removeFromQueueReducer,
  addToApplications: addToApplicationsReducer,
  getApplications: getApplicationsReducer,
  getMyJobs: getMyJobsReducer,
  updateUserCV: updateUserCVReducer,
  usersWorkExp: usersWorkExpReducer,
  addToWorkExp: addToWorkExpReducer,
  deleteWorkExp: deleteWorkExpReducer,
  deleteEducation: deleteEducationReducer,
  addToEducation: addToEducationReducer,
  usersEducation: usersEducationReducer,
  isUserProfileUpdated: getIsUserProfileUpdatedReducer,
  getUsersThatApplied: getUsersThatAppliedReducer,
  getAllJobsAppliedTo: getAllJobsAppliedToReducer,
  hasThisUserApplied: hasUserAppliedReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import axios from 'axios';

// URL OF THE BACKEND API
const url = 'https://v2lhbackend.herokuapp.com/api';
// const url = "http://localhost:3001/api";


/*
==== USER ROUTES ====
*/

// Login and register routes
export const registerUser = (newUser) => axios.post(`${url}/register`, newUser);
export const loginUser = (user) => axios.post(`${url}/login`, user);

// Get a user from the DB route
export const getUser = (id) => axios.get(`${url}/users/${id}`);

// Get Liked Interviews, Work Exp, Education and My Jobs
export const getAllUserFavs = (id) => axios.get(`${url}/get/likes/${id}`, );
export const getAllUserWorkExp = (id) => axios.get(`${url}/get/workexp/${id}`, );
export const getAllUserEducation = (id) => axios.get(`${url}/get/education/${id}`, );
export const getMyJobs = (id) => axios.get(`${url}/get/myjobs/${id}`, );
export const getIsUsersProfileUpdated = (id) => axios.get(`${url}/get/isprofileupdated/${id}`, );
export const getAllUserInterviews = (id) => axios.get(`${url}/interviews/get/user/${id}`, );
export const getAllUsersThatApplied = (id) => axios.get(`${url}/interviews/get/${id}/applications`, );
export const getAllJobsAppliedTo = (id) => axios.get(`${url}/get/${id}/applications`, );
export const hasUserApplied = (id, userId) => axios.get(`${url}/interviews/get/${id}/applied/${userId}`);

// Add Work Exp, Education and Liked Interview
export const addNewEducation = (data) => axios.patch(`${url}/add/education`, data);
export const addToFavs = (data) => axios.patch(`${url}/add/likes`, data);
export const addToWorkExp = (data) => axios.patch(`${url}/add/workexp`, data);

// Delete Work Exp, Education
export const deleteWorkExp = (data) => axios.patch(`${url}/delete/workexp`, data);
export const deleteEducation = (data) => axios.patch(`${url}/delete/education`, data);

// Update CV
export const updateUserCV = (_id, aboutMe, workExp, mySkills) => axios.patch(`${url}/update/cv`, _id, aboutMe, workExp, mySkills);


/*
=============================================================================================
*/


/*
==== INTERVIEW/JOB ROUTES ====
*/

// Get All Interviews, One Interview, Job Applications, Job Queue, 
export const getAllInterviews = () => axios.get(`${url}/interviews/get`);
export const getOneInterview = (id) => axios.get(`${url}/interviews/get/one/${id}`);
export const getApplications = (id) => axios.get(`${url}/interviews/get/applications/${id}`);
export const getQueue = (id) => axios.get(`${url}/interviews/get/q/${id}`);

// Add Application, Queue, Create Interview, 
export const addToQueue = (id, user) => axios.patch(`${url}/interviews/add/q/${id}`, user);
export const addToApplications = (id, user) => axios.patch(`${url}/interviews/add/${id}`, user);
export const createInterview = (interview, config) => axios.post(`${url}/interviews/create`, interview, config);

// Remove user from queue
export const removeFromQueue = (id, uid) => axios.patch(`${url}/interviews/delete/q/${id}`, uid);

/*
=============================================================================================
*/

// Update User Profile Photo
// export const updateProfilePhoto = (_id, profilePhoto) => axios.patch(`${url}/updateprofilephoto`, _id, profilePhoto);

// // Update User Profile Photo
// export const updateCompanyLogo = (_id, companyLogo) => axios.patch(`${url}/updatecompanylogo`, _id, companyLogo);
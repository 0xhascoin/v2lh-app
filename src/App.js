import React from 'react';
import './App.css';

import {BrowserRouter, Route} from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AboutUs from './pages/AboutUs/AboutUs';
import ViewJob from './pages/ViewJob/ViewJob';
import SavedJobs from './pages/SavedJobs/SavedJobs';

import CreateJob from './pages/CreateJob/CreateJob';
import MyJobs from './pages/MyJobs/MyJobs';
import ViewApplications from './pages/ViewApplications/ViewApplications';
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import Interviews from './pages/Interviews/Interviews';
import Lobby from './pages/Lobby/Lobby';
// import Room from './pages/Room/Room';
// import Room5 from './pages/Room/Room5';
import NewRoom from './pages/NewRoom/NewRoom';

function App() {
  return (
    <BrowserRouter>
      {/* <Header />  */}
      <main>
        <Route path='/' component={HomePage} exact/>
        <Route path='/login' component={Login} exact/>
        <Route path='/register' component={Register} exact/>
        <Route path='/about' component={AboutUs} exact/>
        <Route path='/jobs/:id' component={ViewJob} exact/>
        <Route path='/saved' component={SavedJobs} exact/>
        <Route path='/create' component={CreateJob} exact/>
        <Route path='/jobs/:id/applications' component={ViewApplications} exact/>
        <Route path='/myjobs' component={MyJobs} exact/>
        <Route path='/updateprofile' component={UpdateProfile} exact/>
        <Route path='/edit/account' component={EditProfile} exact/>
        <Route path='/interviews' component={Interviews} exact/>
        <Route path='/interview/:id' component={Lobby} exact/>
        <Route path='/interview/:interviewId/:hostId/:userId' component={NewRoom} exact/>
        {/* <Route path='/interview/:interviewId/:hostId/:userId/1' component={NewRoom} exact/> */}
      </main>
    </BrowserRouter>
  );
}

export default App;
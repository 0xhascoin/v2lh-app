import React, { useEffect, useState, useRef } from "react";
import "./lobby.scss";
import io from "socket.io-client";

import {
  getOneInterview,
  getAllUsersThatApplied,
} from "../../actions/interviewActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAUser } from "../../actions/userActions";


import Navbar from "../../components/Navbar/Navbar";
import Job from "../../components/FindJobs/Job/Job";


const socket = io.connect("http://localhost:3001/");
// const socket = io.connect("https://v2lhbackend.herokuapp.com/");

const Lobby = (props) => {
  const [interviewQueue, setInterviewQueue] = useState([]);
  const [showJoin, setShowJoin] = useState(true);
  const [currentCalling, setCurrentCalling] = useState("");
  const [link, setLink] = useState("");
  const [hostId, setHostId] = useState("");
  const [userSocketId, setUserSocketId] = useState("");
  const [userJoinedCall, setUserJoinedCall] = useState(false);
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview } = oneInterview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getUsersThatApplied = useSelector((state) => state.getUsersThatApplied);
  const { usersThatApplied } = getUsersThatApplied;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(getOneInterview(props.match.params.id));
    dispatch(getAllUsersThatApplied(id));

    id && socket.emit("loadQueue", { interviewId: id });

    console.log(interview, "interview");

    if(sessionStorage.getItem("refresh")) {
      sessionStorage.clear();
      window.location.reload();
    }

    if(sessionStorage.getItem("userEnded")) {
      sessionStorage.clear();
    }

  }, []);

  const joinQueue = () => {
    if (userInfo && id) {
      const user = {
        userId: userInfo?._id,
        interviewId: id,
        socketId: userSocketId,
      };
      socket.emit("joinInterviewQueue", user);
      setShowJoin(false);
    }
  };

  const leaveQueue = () => {
    if (userInfo && id) {
      const user = {
        userId: userInfo?._id,
        interviewId: id,
        socketId: userSocketId,
      };
      socket.emit("leaveInterviewQueue", user);
      setShowJoin(true);
    }
  };

  const callUser = (userId, socketId) => {
    // console.log(userId);
    if (userInfo?.userType.toLowerCase() == "employer") {
      let data = {
        userId,
        interviewId: id,
        hostId: userInfo?._id,
        link: `/interview/${id}/${userInfo?._id}/${userId}`,
        socketId: socketId,
      };
      socket.emit("callUser", data);
      // history.push(link);
    }
  };

  const removeUserFromQueue = (userId) => {
    if (userId && id) {
      // console.log("userId: " + userId);
      const user = {
        userId: userId,
        interviewId: id,
      };
      socket.emit("leaveInterviewQueue", user);
    }
  };

  const userJoinedCallHandler = () => {
    if (userInfo?.userType.toLowerCase() == "user") {
      const data = {
        calling: true,
        interviewId: id,
        userId: userInfo?._id,
      };
      const user = data;
      socket.emit("userJoinedCall", data);
      socket.emit("leaveInterviewQueue", user);
    }
  };



  useEffect(() => {
    socket.on("userJoinedInterviewQueue", (queue) => {
      // console.log("user joined queue: ", queue);
      // setInterviewQueue(queue);
      // console.log("User joined queue: ", interviewQueue);
    });
    socket.on("userLeftInterviewQueue", (queue) => {
      // console.log("Queue: ", queue);
      // setInterviewQueue(queue)
      // console.log("User left queue: ", interviewQueue);
    });

    socket.on("loadedInterviewQueue", (queue) => {
      // console.log("Loaded Queue: ", queue);
      setInterviewQueue(queue);
    });

    socket.on(
      "callingUser",
      ({ userId, interviewId, hostId, link, socketId }) => {
        setCurrentCalling(userId);
        setHostId(hostId);
        setLink(link);
        setUserSocketId(socketId);
      }
    );

    socket.on("userHasJoinedCall", ({ interviewId, calling }) => {
      setUserJoinedCall(true);
    });
  }, [socket]);

  // useEffect(() => {
  //   // socket.emit("loadQueue", {interviewId: id});
  // }, [leaveQueue, joinQueue]);

  return (
    <>
      <Navbar />
      <div className="job-container">
        {interview?.map((job) => (
          <Job
            eachJob={job}
            key={job?._id}
            page="saved"
            url={`/interview/${job._id}`}
          />
        ))}
      </div>
      <div className="status-container has-text-centered">
        {currentCalling == userInfo?._id ? (
          <>
            <p>Host is calling you</p>
            <div class="content-center">
              <Link class="pulse" to={link} onClick={userJoinedCallHandler}>
                <i class="fas fa-phone fa-2x"></i>
              </Link>
            </div>
          </>
        ) : (
          <>
            {hostId == userInfo?._id && !userJoinedCall ? (
              <>
                <h1>Calling user</h1>
              </>
            ) : (
              <></>
            )}
          </>
        )}
        <>
          {userJoinedCall && userInfo?._id == hostId && (
            <>
              <h1>User Joined Room, click to enter</h1>
              <Link className="button is-link" to={link}>
                Enter room
              </Link>
            </>
          )}
        </>
      </div>
      <div id="queue-container">
        <h1 className="has-text-centered queue-title">Queue</h1>
        {userInfo?.userType.toLowerCase() == "user" && (
          <>
            {showJoin ? (
              <button
                type="button"
                className="button is-primary is-fullwidth py-5"
                onClick={joinQueue}
              >
                Join
              </button>
            ) : (
              <button
                type="button"
                className="button is-danger is-fullwidth my-3 py-5"
                onClick={leaveQueue}
              >
                Leave
              </button>
            )}
          </>
        )}

        {interviewQueue?.map((application) => (
          <div className="application" key={application?._id}>
            <div className="columns application-row is-vcentered">
              <div className="column is-1 icon-col has-text-centered">
                <p>{application?.name.substring(0, 1)}</p>
                {/* {console.log(application?.socketId, "socketId")} */}
              </div>
              <div className="column text-col">
                <>
                  <p>{application?.name}</p>
                  <p className="socials">
                    <a
                      href={`http://twitter.com/${application?.userCV.twitterUrl}`}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={`http://github.com/${application?.userCV.githubUrl}`}
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </p>
                </>
              </div>
              {userInfo?.userType.toLowerCase() == "employer" && (
                <div className="column is-3 expand-col has-text-centered">
                  <button
                    className="button is-primary is-light"
                    type="button"
                    onClick={() =>
                      callUser(application._id, application.socketId)
                    }
                  >
                    <i class="fas fa-phone-alt"></i>
                  </button>
                    {application?.socketId}
                  <button
                    className="button is-danger is-light"
                    type="button"
                    onClick={() => removeUserFromQueue(application._id)}
                  >
                    <i class="fas fa-user-times"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Lobby;

import "./room4.scss";
import "./workExp.scss";
import "./edu.scss";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import RoomHeader from "./RoomHeader";
import WorkExp from "./WorkExp";
import Edu from "./Edu";
import { FiPhoneCall } from "react-icons/fi";
import { HiPhoneMissedCall } from "react-icons/hi";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { getAUser } from "../../actions/userActions";

// const socket = io.connect("http://localhost:3001");

const Room4 = (props) => {
  const userId = props.match.params.userId;
  const hostId = props.match.params.hostId;
  const interviewId = props.match.params.interviewId;

  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [guestsId, setGuestsId] = useState("");
  const [hostsId, setHostsId] = useState("");
  const [hostConnected, setHostConnected] = useState(false);
  const [guestConnected, setGuestConnected] = useState(false);
  const [startCall, setStartCall] = useState(false);
  const [loadingMyVideo, setLoadingMyVideo] = useState(true);

  const [callWaiting, setCallWaiting] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const oneInterview = useSelector((state) => state.oneInterview);
  const { interview } = oneInterview;

  const getUser = useSelector((state) => state.getUser);
  const { user, loading } = getUser;

  useEffect(() => {
    dispatch(getAUser(userId));
    console.log(user, "User");

    socket.on("callUserWebrtc2", ({ from, name: callerName, signal }) => {
      console.log(signal, "Signal Data");
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("callEndedWebrtc", () => {
      console.log("User disconnected");
      history.push("/interviews");
      //   window.location.reload();
    });

    socket.on("tellUsersCallHasEnded", () => {
      // window.location.reload();
      // connectionRef.current.destroy();
      console.log(connectionRef, "connectionRef");
      history.goBack();
    });
    if (userInfo?._id == hostId) {
      // Runs whenever the host connects to the room
      socket.emit("hostHasJoinedInterviewRoom", { room: interviewId });

      // Listen for your socket ID and set it to the state
      socket.on("sendHostHisId", (id) => {
        console.log(`Host ID: ${id}`);
        // Set hosts ID to HostsID
        setHostsId(id);
        setHostConnected(true);

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
          });

        console.log("Show Host His Camera");
      });

      // Request the guests ID
      socket.emit("hostIsRequestingGuestsId", { room: interviewId });

      // Receive the guests ID
      socket.on("hostReceiveGuestsId", ({ room, id }) => {
        console.log("Guests ID: ", id);
        console.log("Reload");
        // window.location.reload();
        setGuestsId(id);
      });
    } else if (userInfo?._id == userId) {
      // Runs whenever the guest connects to the room
      socket.emit("guestHasJoinedInterviewRoom", { room: interviewId });

      // Listen for your socket ID and set it to the state
      socket.on("sendGuestHisId", (id) => {
        console.log(`Guest ID: ${id}`);
        // Set hosts ID to HostsID
        setGuestsId(id);
        setGuestConnected(true);

        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
          });

        console.log("Show Guest His Camera");
      });

      // Send Guests ID to the HOST
      socket.on("sendGuestsIdToHost", () => {
        socket.emit("nowSendingHostGuestsId", { room: interviewId });
      });
    }
  }, []);

  const answerCallWebrtc = () => {
    setCallAccepted(true);

    console.log("ANSWER CALL");

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCallWebrtc", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUserWebrtc = (id) => {
    // console.log(`callUser(${id})`);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUserWebrtc", {
        userToCall: id,
        signalData: data,
        from: hostsId,
        name,
        room: interviewId,
      });
      setCallWaiting(true);
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAcceptedWebrtc", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      connectionRef.current = peer;
      setCallWaiting(false);
    });
  };

  const leaveCallWebrtc = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    socket.emit("callHasBeenEnded", { room: interviewId });
    // window.location.reload();
    history.goBack();
  };

  if(loading) return "Loading..."

  return (
    <div className="room-container">
      {console.log(user, "USER")}
      <div className="columns">
        <div className="column is-8">
          {interview?.map((int) => (
            <div id="header" className="columns is-vcentered">
              <img className="column is-2 logo-col" src={int.companyLogo} />
              <div className="column content-col">
                <h2 className="job-title">{int.jobTitle}</h2>
                <p className="company-details">
                  at <span className="company-name">{int.companyName}</span>
                </p>
              </div>
              {guestsId !== "" && (
                <div className="column call-col is-3 has-text-centered">
                  {hostsId !== "" && (
                    <>
                      {callAccepted && !callEnded ? (
                        <button
                          className="button is-danger mx-1 my-1"
                          onClick={leaveCallWebrtc}
                        >
                          <HiPhoneMissedCall />
                        </button>
                      ) : (
                        <>
                          {callWaiting ? (
                            <p className="tag is-info is-light">
                              Calling user ...
                            </p>
                          ) : (
                            <button
                              className="button is-primary mx-1 my-1"
                              onClick={() => callUserWebrtc(guestsId)}
                            >
                              Start call
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                  
                  {hostsId == "" && (
                    <>
                      {call.isReceivingCall && !callAccepted && (
                        <button
                          className="button is-primary mx-1 my-1"
                          onClick={answerCallWebrtc}
                        >
                          <FiPhoneCall />
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="video-wrapper">
            {!stream ? (
              <div className="my-video-loading">
                <div class="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <video
                className="my-video"
                playsInline
                ref={myVideo}
                autoPlay
                muted
              />
            )}
            {callAccepted && !callEnded && (
              <video
                className="guest-video"
                playsInline
                ref={userVideo}
                autoPlay
                muted
              />
            )}
          </div>
        </div>
        <div className="column cv-col">
          <div className="cv-container">
            <h1 className="cv-user-name">{user?.name}</h1>
            <div className="links-container">
              <p className="cv-github has-text-dark">
                <span className="icon small">
                  <AiFillGithub />
                </span>
                <span>Github</span>
              </p>
              <p className="cv-twitter has-text-info mx-2">
                <span className="icon small">
                  <AiOutlineTwitter />
                </span>
                <span>Twitter</span>
              </p>
            </div>
            <hr />
            <div className="cv-content">
              <h1 className="heading">About me</h1>
              <p className="subtitle">
                {user?.userCV?.aboutMe}
              </p>
            </div>
            <WorkExp user={user} />
            <Edu user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room4;

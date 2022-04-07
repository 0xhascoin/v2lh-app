import "./room5.scss";

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

import "./loader.scss";
import { BsCameraVideo } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { GrDocumentText } from "react-icons/gr";
import { GoGlobe } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";

const socket = io.connect("https://v2lhbackend.herokuapp.com/");
// const socket = io.connect("http://localhost:3001/");

const Room5 = (props) => {
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
    if (!userInfo) history.goBack();

    if (userInfo?.userType.toLowerCase() === "user" && userInfo?._id !== userId)
      history.goBack();
    if (
      userInfo?.userType.toLowerCase() === "employer" &&
      userInfo?._id !== hostId
    )
      history.goBack();

    if (userInfo?._id == userId) {
      window.onbeforeunload = function (e) {
        sessionStorage.setItem("userEnded", true);
      };
    }

    if (sessionStorage.getItem("userEnded")) {
      console.log("User ended");
      sessionStorage.clear();
      sessionStorage.setItem("refresh", true);
      history.push(`/interview/${interviewId}`);
    }

    dispatch(getAUser(userId));
    console.log(user, "User");

    socket.on("callUserWebrtc2", ({ from, name: callerName, signal }) => {
      console.log(signal, "Signal Data");
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("callEndedWebrtc", () => {
      console.log("User disconnected");
      if (
        history.location.pathname ==
        `/interview/${interviewId}/${hostId}/${userId}`
      ) {
        console.log(history.location, "Pathname");
        // history.push("/interviews");
        setCallEnded(true);
        // connectionRef.current.destroy();
        sessionStorage.setItem("refresh", true);
        history.push(`/interview/${interviewId}`);
        // alert("ENDED")
      }
      //   window.location.reload();
    });

    socket.on("tellUsersCallHasEnded", () => {
      // window.location.reload();
      // connectionRef.current.destroy();
      console.log(connectionRef, "connectionRef");
      // alert("CALL HAS ENDED");
      // history.goBack();
      sessionStorage.setItem("refresh", true);
      history.push(`/interview/${interviewId}`);
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

      socket.on("sendHostHisId", (id) => {
        console.log(`Host ID: ${id}`);
        // Set hosts ID to HostsID
        setHostConnected(true);
      });

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
    setCallWaiting(true);
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
    // history.goBack();
    sessionStorage.setItem("refresh", true);
    history.push(`/interview/${interviewId}`);
  };

  if (loading) return "Loading...";
  if (!hostConnected) return "Waiting for host to connect......";
  if (!guestsId) {
    sessionStorage.setItem("refresh", true);
    history.push(`/interview/${interviewId}`);
  }

  return (
    <>
      <div className="notification is-danger">
        {" "}
        PLEASE DO NOT REFRESH THIS PAGE
      </div>
      <div className="columns room">
        <div className="column video-col is-9">
          {callAccepted && !callEnded && (
            <video
              className="guest-video"
              playsInline
              ref={userVideo}
              autoPlay
              muted
            />
          )}
          {!callAccepted && (
            <div className="loading-my-video">
              <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {stream && (
            <video
              className="my-video"
              playsInline
              ref={myVideo}
              autoPlay
              muted
            />
          )}

          {guestsId !== "" && (
            <div className="control-bar">
              {hostsId !== "" && (
                <>
                  {callAccepted && !callEnded ? (
                    <button
                      className="button is-danger end-call"
                      onClick={leaveCallWebrtc}
                    >
                      <ImCross />
                      <span className="mx-2">End call</span>
                    </button>
                  ) : (
                    <>
                      {callWaiting ? (
                        <p className="tag is-info is-light">Calling user ...</p>
                      ) : (
                        <button className="button is-primary">
                          <BsCameraVideo />
                          <span
                            className="mx-2"
                            onClick={() => callUserWebrtc(guestsId)}
                          >
                            Start call
                          </span>
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
                      className="button is-warning"
                      onClick={answerCallWebrtc}
                    >
                      Answer call
                    </button>
                  )}
                  {!call.isReceivingCall && (
                    <p className="tag is-info is-light">
                      Waiting for host to connect ...
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="column" id="cv-col">
          <div className="cv-header">
            <GrDocumentText /> <span className="cv-header-title">CV</span>
          </div>
          <div className="cv-content">
            <h2 className="cv-name">{user?.name}</h2>
            <p className="cv-subtitle">
              <GoGlobe /> {user?.location}
            </p>
            <p className="cv-subtitle">
              <HiOutlineMail /> {user?.email}
            </p>
            <div className="cv-aboutme">{user?.userCV?.aboutMe}</div>
          </div>
          <WorkExp user={user} />
          <Edu user={user} />
        </div>
      </div>
    </>
  );
};

export default Room5;

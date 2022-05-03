import "./newRoom.scss";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { FiPhoneCall } from "react-icons/fi";
import { HiPhoneMissedCall } from "react-icons/hi";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { getAUser } from "../../actions/userActions";

import { BsCameraVideo } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { GrDocumentText } from "react-icons/gr";
import { BsFillFileTextFill } from "react-icons/bs";
import { GoGlobe } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";

import Navbar from "./Navbar/Navbar";
import WorkExp from "./WorkExp/WorkExp";
import Edu from "./Edu/Edu";

import Loader from "./Loaders/Loader";
import GuestLoader from "./Loaders/GuestLoader";

// const socket = io.connect("http://localhost:3001/");
const socket = io.connect("https://v2lhbackend.herokuapp.com/");


const NewRoom = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);
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
    <div className={darkTheme ? "app dark" : "app"}>
      <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <div className={darkTheme ? "columns room dark" : "columns room"}>
        <div className="column is-8 webcam-col">
          <div className="cam-container">
            {callAccepted && !callEnded && (
              <video
                className="guest-video"
                playsInline
                ref={userVideo}
                autoPlay
                muted
              />
            )}

            {!callAccepted && <GuestLoader />}

            {stream ? (
              <video
                className="my-video"
                playsInline
                ref={myVideo}
                autoPlay
                muted
              />
            ) : (
              <Loader />
            )}

            {guestsId !== "" && (
              <div className="call-options">
                {hostsId !== "" && (
                  <>
                    {callAccepted && !callEnded ? (
                      <button className="button is-danger" onClick={leaveCallWebrtc}>End Call</button>
                    ) : (
                      <>
                        {callWaiting ? (
                          <p className="tag is-info is-light">
                            Calling user ...
                          </p>
                        ) : (
                          <button className="button is-primary" onClick={() => callUserWebrtc(guestsId)}>
                            Start Call
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
                {hostsId == "" && (
                  <>
                    {call.isReceivingCall && !callAccepted && (
                      <button className="button is-primary is-light mx-2" onClick={answerCallWebrtc}>
                        Answer
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
        </div>
        <div className="column cv-col">
          <div className="cv-container">
            <div className="cv-header">
              <BsFillFileTextFill className="icon" />
              <span className="cv-header-title">CV</span>
            </div>
            <div className="cv-section">
              <div className="cv-content">
                <h2 className="cv-name">Hasan Elmi Hasan</h2>
                <p className="cv-subtitle">
                  <GoGlobe /> United Kingdom
                </p>
                <p className="cv-subtitle">
                  <HiOutlineMail /> hasanelmi678@gmail.com
                </p>
                <div className="cv-aboutme">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries
                </div>
              </div>
              <WorkExp darkTheme={darkTheme} />
              <Edu darkTheme={darkTheme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;

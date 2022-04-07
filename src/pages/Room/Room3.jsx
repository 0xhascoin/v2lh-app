import "./room3.scss";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");
const Room3 = (props) => {
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

  const [callWaiting, setCallWaiting] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
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
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="video-wrapper">
            {stream ? (
              <video
                className="my-video"
                playsInline
                ref={myVideo}
                autoPlay
                muted
              />
            ) : (
              <p>Loading</p>
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
          {guestsId !== "" && (
            <div className="call-options">
              {hostsId !== "" && (
                <>
                  {callAccepted && !callEnded ? (
                    <button
                      className="button is-danger"
                      onClick={leaveCallWebrtc}
                    >
                      End call
                    </button>
                  ) : (
                    
                    <>
                      {callWaiting ? (
                        <p>Wait for user .......</p>
                      ) : (
                        <button
                          className="button is-primary"
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
                      className="button is-info"
                      onClick={answerCallWebrtc}
                    >
                      Answer call
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="column is-3 cv">
          <button className="show-cv-button">Show CV</button>
          {/* CV Header */}
          <div className="cv-header">
            {/* Hide CV button */}
            <button className="hide-cv-button">
              Hide CV
              <i class="far fa-times-circle"></i>
            </button>
            {/* Name */}
            <h1 className="name">Hasan Elmi</h1>
            {/* Location */}
            <p className="tag is-info">
              <i class="fas fa-globe-europe"></i>
              United Kingdom
            </p>
            <br />
            {/* Skills */}
            <p className="tag is-info is-light my-3 react">React - 6 years.</p>
            <p className="tag is-warning is-light my-3 mx-2">
              Javascript - 8 years.
            </p>
          </div>
          <hr />
          {/* CV Content */}
          <div className="cv-content">
            <h1 className="heading">Why are you a good fit for this role?</h1>
            <p className="subtitle">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
              <br /> <br />
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            <h1 className="heading">Where did you last work, describe it.</h1>
            <p className="subtitle">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
              <br /> <br />
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room3;

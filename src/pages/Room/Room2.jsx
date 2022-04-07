import "./room.scss";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Peer from "simple-peer";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Room2 = (props) => {
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
      window.location.reload();
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
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAcceptedWebrtc", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      connectionRef.current = peer;
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
    <div className="wrapper">
      {guestsId !== "" && (
        <>
          <h1>Guests ID: {guestsId}</h1>
          <h1>Hosts ID: {hostsId}</h1>
        </>
      )}
      <div className="columns">
        {guestsId !== "" && (
          <div className="column video-col">

            {hostsId !== "" && (
              <div className="video-buttons">
                {callAccepted && !callEnded ? (
                  <button
                    className="button is-danger is-light"
                    onClick={leaveCallWebrtc}
                  >
                    Hang up
                  </button>
                ) : (
                  <button
                    className="button is-primary is-light"
                    onClick={() => callUserWebrtc(guestsId)}
                  >
                    Call
                  </button>
                )}
              </div>
            )}
            
            {hostsId == "" && (
              <>
                {call.isReceivingCall && !callAccepted && (
                  <div className="video-buttons">
                    <button
                      className="button is-warning is-light"
                      onClick={answerCallWebrtc}
                    >
                      Answer
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="video-wrapper">
              {stream && (
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
        )}
        <div className="column cv-col is-3"></div>
      </div>
    </div>
  );
};

export default Room2;

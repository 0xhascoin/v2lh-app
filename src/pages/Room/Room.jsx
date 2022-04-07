import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Peer from "simple-peer";

import VideoPlayer from "../../components/webrtc/VideoPlayer";
import Options from "../../components/webrtc/Options";
import Notifications from "../../components/webrtc/Notifications";

import { makeStyles } from "@material-ui/core/styles";
import { io } from "socket.io-client";

// const socket = io.connect("https://v2lhbackend.herokuapp.com/");

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const Room = (props) => {
  const classes = useStyles();
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

  // console.log(
  //   `User ID: ${userId}, \nHost ID: ${hostId}, \nInterview ID: ${interviewId}, \nLogged in ID: ${userInfo?._id}`
  // );

  // useEffect(() => {
  //   if (userInfo?._id != userId && userInfo?._id != hostId) {
  //     console.log("NOT USER OR HOST");
  //     history.push("/");
  //   }
  //   // console.log("COUNT");
  //   socket.emit("joinVideoCallRoom", { room: interviewId });

  //   if(userInfo?._id == hostId) socket.emit("getGuestId", { room: interviewId });

  //   socket.on("me", (id) => {
  //     setMe(id);
  //     console.log("SETTING ME NOW");

  //     if(userInfo?._id == hostId) {
  //       socket.emit('setHostId', {id, room: interviewId})
  //     }

  //     navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);
  //       // console.log(currentStream, "currentStream");
  //       // console.log(stream, "stream");
  //       myVideo.current.srcObject = currentStream;
  //     });

  //     if (userInfo?._id == userId) {
  //       // socket.emit('sendGuestsId', {guestId: id});
  //       socket.emit("sendMsg", {
  //         msg: "new message",
  //         room: interviewId,
  //         id: id,
  //       });
  //     }

  //     if (userInfo?._id == userId) {
  //       socket.on("requestGuestId", () => {
  //         console.log("Host is requesting your ID");
  //         socket.emit('sendHostMyId', {id: id, room: interviewId});
  //       });
  //     }
  //   });

  //   if (userInfo?._id == hostId) {

  //     // Host connected after Guest
  //     socket.on("getMsg", ({ msg, id }) => {
  //       // console.log(msg, "Message received")
  //       // console.log("Guests ID is: ", id);
  //       console.log(`My ID is1: ${me}`);
  //       setGuestsId(id);
  //       // callUserWebrtc(id);
  //     });

  //     // Guest connected before host
  //     socket.on('guestSentTheirId', ({id}) => {
  //       // console.log("GUEST SENT YOU THEIR ID", me);
  //       // console.log(`My ID is2: ${me}`);
  //       // setGuestsId(id);
  //       // callUserWebrtc(id);
  //     })

  //     socket.on('sendHostId', ({id}) => {
  //       console.log("FINALLY HOST ID IS: ", id);
  //       guestsId !== "" && console.log("FINALLY GUEST ID IS: ", guestsId);
  //       setHostsId(id);
  //     });
  //   }

  // }, []);

  useEffect(() => {
    socket.on("callUserWebrtc2", ({ from, name: callerName, signal }) => {
      console.log(signal, "Signal Data")
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on('callEndedWebrtc', () => {
      console.log("User disconnected")
      window.location.reload();
    })

    socket.on('tellUsersCallHasEnded', () => {
      // window.location.reload();
      // connectionRef.current.destroy();
      console.log(connectionRef, "connectionRef")
      history.goBack()
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
        console.log("Reload")
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
        room: interviewId
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
    socket.emit('callHasBeenEnded', {room: interviewId})
    // window.location.reload();
    history.goBack()
  };

  return (
    <div>
      <div className={classes.wrapper}>
        {guestsId !== "" && (
          <>
            <h1>Guests ID: {guestsId}</h1>
            <h1>Hosts ID: {hostsId}</h1>
          </>
        )}

        {guestsId !== "" && (
          <>
            <VideoPlayer
              call={call}
              callAccepted={callAccepted}
              myVideo={myVideo}
              userVideo={userVideo}
              stream={stream}
              name={name}
              setName={setName}
              callEnded={callEnded}
              me={hostConnected ? hostsId : guestsId}
              callUserWebrtc={callUserWebrtc}
              leaveCallWebrtc={leaveCallWebrtc}
              answerCallWebrtc={answerCallWebrtc}
            />
              <Options
                me={hostConnected ? hostsId : guestsId}
                callAccepted={callAccepted}
                name={name}
                setName={setName}
                callEnded={callEnded}
                leaveCallWebrtc={leaveCallWebrtc}
                callUserWebrtc={callUserWebrtc}
                guestsId={guestsId}
                hostsId={hostsId}
              >
                {/* <Notifications
                  answerCallWebrtc={answerCallWebrtc}
                  call={call}
                  callAccepted={callAccepted}
                /> */}
              </Options>
              {hostsId == "" && (
                <>
                {call.isReceivingCall && !callAccepted && (
                  <button className="button is-warning my-6" onClick={answerCallWebrtc}>Answer the call</button>
                )}
              </>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Room;

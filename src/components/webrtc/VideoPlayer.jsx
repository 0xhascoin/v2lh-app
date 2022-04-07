import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../../SocketContext";
import { Socket } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "1rem",
    margin: "1rem",
    backgroundColor: "rgba(255,255,255,0.4)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.2rem",
  },
}));

const VideoPlayer = ({
  call,
  callAccepted,
  myVideo,
  userVideo,
  stream,
  name,
  setName,
  callEnded,
  me,
  callUser,
  leaveCall,
  answerCall
}) => {
  const classes = useStyles();

  // console.log(stream, "Stream VideoPlayer");
  return (
    <Grid container className={classes.gridContainer}>
      {/* My Video */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              {name || ""}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {/* Users Video */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              {call.name || "name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;

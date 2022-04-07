import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";

import { SocketContext } from "../../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
    backgroundColor: "#d9afd9",
    backgroundImage: "linear-gradient(135deg, #d9afd9 0%, #97d9e1 100%)",
    color: "white",
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "1rem",
    backgroundColor: "rgba(255,255,255,0.4)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1rem",
  },
  endCall: {
    marginTop: 20,
    backgroundColor: "#d9afd9",
    backgroundImage:
      "linear-gradient(135deg, #FF512F 0%, #DD2476 51%, #FF512F 100%)",
  },
  callButton: {
    marginTop: 20,
    backgroundColor: "#d9afd9",
    backgroundImage:
      "linear-gradient(135deg, #1CD8D2 0%, #93EDC7 51%, #1CD8D2 100%)",
  },
}));

const Options = ({
  me,
  guestsId,
  callAccepted,
  name,
  setName,
  callEnded,
  hostsId,
  leaveCallWebrtc,
  callUserWebrtc,
  children,
}) => {
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();

  return (
    <>
      {hostsId !== "" && (
        <Container className={classes.container}>
          <Paper elevation={10} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container className={classes.gridContainer}>
                <Grid item xs={12} md={6} className={classes.padding}>
                  {callAccepted && !callEnded ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      startIcon={<PhoneDisabled fontSize="large" />}
                      onClick={leaveCallWebrtc}
                      className={classes.endCall}
                    >
                      Hang up
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Phone fontSize="large" />}
                      onClick={() => callUserWebrtc(guestsId)}
                      className={classes.callButton}
                    >
                      Start Call
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
            {children}
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Options;

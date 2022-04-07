import React, { useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from "../../SocketContext";


const Notifications = ({ answerCallWebrtc, call, callAccepted } ) => {
  // useEffect(() => {
  //   if(call.isReceivingCall && !callAccepted) {
  //     answerCallWebrtc();
  //   }
  // },[]);
  return (
    <>{call.isReceivingCall && !callAccepted && (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h1>{call.name} is calling</h1>
        <Button variant="contained" color="primary" onClick={answerCallWebrtc}>
          Answer
        </Button>
      </div>
    )}</>
  )
}

export default Notifications
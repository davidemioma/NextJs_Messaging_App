import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";
import classes from "./Message.module.css";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  return (
    <div
      className={
        user === userLoggedIn.email ? classes.sender : classes.reciever
      }
    >
      <div className={classes.message}>
        <p> {message.message}</p>

        {message?.timestamp && (
          <span className={classes.timestamp}>
            <Moment format={"LT"} date={message?.timestamp} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;

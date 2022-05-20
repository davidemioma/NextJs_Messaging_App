import React, { useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  addDoc,
  doc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { Avatar, IconButton } from "@mui/material";
import { openOverlay } from "../../store/store";
import { useDispatch } from "react-redux";
import { getRecipientsEmail } from "../../util/getReciepiantEmail";
import Message from "../message/Message";
import Moment from "react-moment";
import classes from "./Content.module.css";

const Content = ({ chat, messages }) => {
  const [text, setText] = useState("");

  const endOfMessageRef = useRef();

  const dispatch = useDispatch();

  const router = useRouter();

  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientsEmail(chat.users, user.email);

  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", recipientEmail))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const [messagesSnapshot] = useCollection(
    query(
      collection(db, "chats", router.query.id, "messages"),
      orderBy("timestamp", "asc")
    )
  );

  const sendMessage = async (e) => {
    e.preventDefault();

    //Update last seen
    await setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(collection(db, "chats", router.query.id, "messages"), {
      message: text,
      timestamp: serverTimestamp(),
      user: user.email,
      photoUrl: user.photoURL,
    });

    setText("");

    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.toggler}>
          <IconButton onClick={() => dispatch(openOverlay())}>
            <MenuIcon />
          </IconButton>
        </div>

        <div className={classes.recipient_info}>
          {recipient ? (
            <Avatar src={recipient.photoUrl} alt="" />
          ) : (
            <Avatar src={recipientEmail[0]} alt="" />
          )}

          <div>
            <h3>{recipientEmail}</h3>

            {recipientSnapshot ? (
              <p>
                Last Seen{" "}
                {recipient?.lastSeen?.toDate() ? (
                  <Moment fromNow date={recipient?.lastseen?.toDate()} />
                ) : (
                  "Unavailable"
                )}
              </p>
            ) : (
              <p>Loading last active...</p>
            )}
          </div>
        </div>

        <div className={classes.icons}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {messagesSnapshot ? (
        <div className={classes.message_container}>
          {messagesSnapshot?.docs.map((message) => (
            <Message
              key={message.id}
              user={message.data().user}
              message={{
                ...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime(),
              }}
            />
          ))}

          <div className={classes.end_of_message} ref={endOfMessageRef}></div>
        </div>
      ) : (
        <div className={classes.message_container}>
          {JSON.parse(messages).map((message) => (
            <Message key={message.id} user={message.user} message={message} />
          ))}

          <div className={classes.end_of_message} ref={endOfMessageRef}></div>
        </div>
      )}

      <form className={classes.input_container}>
        <InsertEmoticonIcon />

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" disabled={!text} hidden onClick={sendMessage}>
          Send Message
        </button>

        <MicIcon />
      </form>
    </div>
  );
};

export default Content;

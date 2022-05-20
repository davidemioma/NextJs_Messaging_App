import React from "react";
import { Avatar } from "@mui/material";
import { auth, db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "@firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRecipientsEmail } from "../../util/getReciepiantEmail";
import { useRouter } from "next/router";
import classes from "./Chat.module.css";

const Chat = ({ id, users }) => {
  const router = useRouter();

  const [user] = useAuthState(auth);

  const recipientEmail = getRecipientsEmail(users, user.email);

  const recipientEmailRef = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );

  const [recipientEmailSnapshot] = useCollection(recipientEmailRef);

  const recipient = recipientEmailSnapshot?.docs?.[0]?.data();

  return (
    <div
      className={classes.container}
      onClick={() => router.push(`/chat/${id}`)}
    >
      {recipient ? (
        <Avatar
          className={classes.user_avatar}
          src={recipient.photoUrl}
          alt=""
        />
      ) : (
        <Avatar
          className={classes.user_avatar}
          src={recipientEmail[0]}
          alt=""
        />
      )}

      <p>{recipientEmail}</p>
    </div>
  );
};

export default Chat;

import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, query, where } from "@firebase/firestore";
import classes from "./Sidebar.module.css";
import Chat from "../chat/Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const userChatRef = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );

  const [chatsSnapshot] = useCollection(userChatRef);

  //This is to check if the chat already exists
  const chatAlreadyExists = (reciepiantEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === reciepiantEmail)?.length > 0
    );

  //This is to create a new chat
  const createChat = async () => {
    const input = prompt(
      "Please enter the email of the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      await addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Avatar
          className={classes.avatar}
          src={user.photoURL}
          alt=""
          onClick={() => auth.signOut()}
        />

        <div className={classes.icon_container}>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.search_container}>
        <SearchIcon />

        <input
          className={classes.search_input}
          type="text"
          placeholder="Search in chats"
        />
      </div>

      <Button className={classes.sidebar_btn} onClick={createChat}>
        Start a new chat
      </Button>

      <div className={classes.chats}>
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

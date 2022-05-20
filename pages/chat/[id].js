import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { db, auth } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  doc,
} from "@firebase/firestore";
import DesktopLayout from "../../components/desktop-layout/DesktopLayout";
import Layout from "../../components/layout/Layout";
import MobileLayout from "../../components/mobile-layout/MobileLayout";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRecipientsEmail } from "../../util/getReciepiantEmail";

const Conversation = ({ messages, chat }) => {
  const [user] = useAuthState(auth);

  const overlay = useSelector((state) => state.overlay.overlayOpen);

  return (
    <div>
      <Head>
        <title>Chat with {getRecipientsEmail(chat.users, user.email)}</title>
      </Head>

      <Layout>
        {overlay && (
          <MobileLayout>
            <Sidebar />
          </MobileLayout>
        )}

        <DesktopLayout>
          <Sidebar />
        </DesktopLayout>

        <Content chat={chat} messages={messages} />
      </Layout>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const messageRef = await getDocs(
    query(
      collection(db, "chats", context.query.id, "messages"),
      orderBy("timestamp", "asc")
    )
  );

  const messages = messageRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));

  const chatRef = await getDoc(doc(db, "chats", context.query.id));

  const chat = {
    id: chatRef.id,
    ...chatRef.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
};

export default Conversation;

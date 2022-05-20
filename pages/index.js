import Head from "next/head";
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Sidebar />
    </div>
  );
};

export default Home;

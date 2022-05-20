import React from "react";
import { Button } from "@mui/material";
import Head from "next/head";
import { signInWithGoogle } from "../../firebase";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.container}>
      <Head>
        <title>Login</title>
      </Head>

      <div className={classes.login_container}>
        <img
          className={classes.logo}
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
        />

        <Button
          onClick={() => signInWithGoogle().catch(alert)}
          variant="outlined"
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;

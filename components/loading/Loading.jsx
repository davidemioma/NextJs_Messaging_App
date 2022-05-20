import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <img
          height={200}
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
        />

        <div className={classes.spinner}></div>
      </div>
    </div>
  );
};

export default Loading;

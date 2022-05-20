import React from "react";
import classes from "./DesktopLayout.module.css";

const DesktopLayout = ({ children }) => {
  return <div className={classes.layout}>{children}</div>;
};

export default DesktopLayout;

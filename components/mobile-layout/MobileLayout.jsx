import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeOverlay } from "../../store/store";
import classes from "./MobileLayout.module.css";

const MobileLayout = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={classes.backdrop}
        onClick={() => dispatch(closeOverlay())}
      ></div>

      <div className={classes.modal}>
        <div className={classes.icon_container}>
          <IconButton onClick={() => dispatch(closeOverlay())}>
            <CancelIcon />
          </IconButton>
        </div>

        {children}
      </div>
    </>
  );
};

export default MobileLayout;

import { configureStore } from "@reduxjs/toolkit";
import OverlaySlice from "./overlay-slice";

const store = configureStore({
  reducer: {
    overlay: OverlaySlice.reducer,
  },
});

export const { openOverlay, closeOverlay } = OverlaySlice.actions;

export default store;

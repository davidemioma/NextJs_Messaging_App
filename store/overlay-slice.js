import { createSlice } from "@reduxjs/toolkit";

const OverlaySlice = createSlice({
  name: "overlay",
  initialState: {
    overlayOpen: false,
  },
  reducers: {
    openOverlay(state) {
      state.overlayOpen = true;
    },

    closeOverlay(state) {
      state.overlayOpen = false;
    },
  },
});

export default OverlaySlice;

import storage from "store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agent: storage.get("agent"),
};

const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setAgent: (state, { payload }) => {
      state.agent = payload;
    },
  },
});

export const { setAgent } = slice.actions;
export default slice.reducer;

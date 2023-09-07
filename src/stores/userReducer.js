import storage from "store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: storage.get("token"),
  info: storage.get("info"),
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setInfo: (state, { payload }) => {
      state.info = payload;
    },
  },
});

export const { setToken, setInfo } = slice.actions;
export default slice.reducer;

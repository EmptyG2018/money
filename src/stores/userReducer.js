import storage from "store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: storage.get("token"),
  info: storage.get("info"),
};

const userSlice = createSlice({
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

export const { setToken, setInfo } = userSlice.actions;
export default userSlice.reducer;

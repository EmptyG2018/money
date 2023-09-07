import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import settingReducer from "./settingReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    setting: settingReducer,
  },
});

export default store;

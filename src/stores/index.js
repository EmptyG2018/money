import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import settingReducer from "./settingReducer";
import collectionReducer from "./collectionReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    setting: settingReducer,
    collection: collectionReducer,
  },
});

export default store;

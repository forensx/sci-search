import { configureStore } from "@reduxjs/toolkit";
import { searchReducer, sidebarReducer } from "../reducers/index";

const store = configureStore({
  reducer: {
    search: searchReducer,
    sidebar: sidebarReducer
  }
});

export default store;
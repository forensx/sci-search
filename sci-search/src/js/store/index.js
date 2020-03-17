import { configureStore } from "@reduxjs/toolkit";
import { searchReducer, sidebarReducer } from "../reducers/index";
import { applyMiddleware } from 'redux';
import { logger } from 'redux-logger';


const store = configureStore({
  reducer: {
    search: searchReducer,
    sidebar: sidebarReducer
  }
});

export default store;
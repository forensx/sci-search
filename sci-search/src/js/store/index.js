import { configureStore } from "@reduxjs/toolkit";
import { searchReducer, sidebarReducer } from "../reducers/index";
import { applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchReducer,
    sidebar: sidebarReducer,
    applyMiddleware(sagaMiddleware, logger)
  }
});

sagaMiddleware.run(rootSaga);

export default store;
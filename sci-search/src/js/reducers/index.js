import { combineReducers } from "redux";
import {
  SELECT_QUERY,
  REQUEST_PAPERS,
  INVALIDATE_PAPERS,
  RECEIVE_PAPERS
} from "../actions";

function selectedQuery(state = "reactjs", action) {
  switch (action.type) {
    case SELECT_QUERY:
      return action.query;
    default:
      return state;
  }
}

function papers(
  state = {
    isFetching: false,
    didInvalidate: false,
    papers: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_PAPERS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PAPERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        papers: action.papers,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function papersByquery(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_PAPERS:
    case RECEIVE_PAPERS:
    case REQUEST_PAPERS:
      return Object.assign({}, state, {
        [action.query]: papers(state[action.query], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  papersByquery,
  selectedQuery
});

export default rootReducer;
